/**
 * migrate-application-files-from-csv.mjs
 *
 * The original Application Form import only brought TEXT fields into DynamoDB
 * — every file column was dropped. This script reads the fresh Gravity Forms
 * CSV at /Users/mac/Downloads/Application Form.csv, matches each row to its
 * DynamoDB entry by row position (the import created ids `imported-app-…-N`),
 * downloads any wp-content file URLs, uploads them to S3, and writes a FULL
 * entry back to DynamoDB so we work safely on either Lambda version.
 *
 * Usage:  TOKEN="..." node scripts/migrate-application-files-from-csv.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';

const DRY_RUN = process.argv.includes('--dry-run');
const TOKEN   = process.env.TOKEN || '';
if (!TOKEN) { console.error('❌  No TOKEN set.'); process.exit(1); }

const CSV_PATH = '/Users/mac/Downloads/Application Form.csv';
const API      = 'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com';
const GET_URL  = `${API}/get-submissions`;
const UPD_URL  = `${API}/update-submission`;
const S3_URL   = `${API}/get-upload-url`;
const BUCKET   = 'tec-form-uploads';
const REGION   = 'us-east-1';

// CSV column INDEXES for the 10 file columns (positional — names contain newlines etc.)
const FILE_COLUMNS = [
  { col: 48, field: 'passportFileUrl',       name: 'Passport / National ID' },
  { col: 49, field: 'idBackFileUrl',         name: 'ID Back Picture' },
  { col: 50, field: 'qualificationsFileUrl', name: 'Qualification / P60' },
  { col: 51, field: 'certificatesFileUrl',   name: 'Certificates / Transcripts' },
  { col: 52, field: 'proofOfAddressUrl',     name: 'Proof of Address' },
  { col: 53, field: 'proofOfAddress2Url',    name: 'Proof of Address (2nd)' },
  { col: 54, field: 'rightToStudyUrl',       name: 'Right to Study' },
  { col: 55, field: 'ninFileUrl',            name: 'NIN file' },
  { col: 56, field: 'cvFileUrl',             name: 'CV' },
  { col: 57, field: 'workReferenceUrl',      name: 'Work Reference' },
];

const ENTRY_ID_IDX   = 61;
const ENTRY_DATE_IDX = 62;
const FIRST_NAME_IDX = 1;
const SURNAME_IDX    = 3;

// ── CSV parser ───────────────────────────────────────────────
function parseCSV(raw) {
  raw = raw.replace(/^﻿/, '');
  const rows = []; let row = [], cur = '', q = false;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (q) {
      if (c === '"' && raw[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else {
      if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else if (c !== '\r') cur += c;
    }
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

// ── API helpers ──────────────────────────────────────────────
async function getAllEntries() {
  let all = [], nk = null;
  do {
    const u = new URL(GET_URL); u.searchParams.set('limit', '500');
    if (nk) u.searchParams.set('startKey', nk);
    const r = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!r.ok) throw new Error(`GET ${r.status}`);
    const d = await r.json();
    all = all.concat(d.items || []); nk = d.nextKey || null;
  } while (nk);
  return all;
}

// Build candidate filename casings (the WP server keeps mixed-case filenames
// even when the directory path is lowercase; pure upper/lower both 404).
function filenameCandidates(stem, ext) {
  const segTitle = (s) =>
    /^[A-Za-z]{2,4}$/.test(s) ? s.toUpperCase()
    : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  const stems = new Set([
    stem,
    stem.toLowerCase(),
    stem.toUpperCase(),
    stem.split('-').map(segTitle).join('-'),
    stem.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join('-'),
  ]);
  const exts = new Set([ext, ext.toLowerCase(), ext.toUpperCase()]);
  const out = [];
  for (const s of stems) for (const e of exts) out.push(`${s}${e}`);
  return out;
}

async function downloadFile(url) {
  // Direct attempt first
  let res = await fetch(url);
  if (res.ok && !(res.headers.get('content-type') || '').includes('text/html')) {
    const buffer = await res.arrayBuffer();
    const contentType = (res.headers.get('content-type') || 'application/octet-stream').split(';')[0];
    return { buffer, contentType };
  }

  // Fallback: lowercase scheme+host+dir, probe filename-case candidates
  const i = url.lastIndexOf('/');
  const dir  = url.slice(0, i + 1).toLowerCase();
  const file = decodeURIComponent(url.slice(i + 1));
  const m    = file.match(/\.([^.]+)$/);
  const stem = m ? file.slice(0, file.length - m[0].length) : file;
  const ext  = m ? m[0] : '';
  for (const fname of filenameCandidates(stem, ext)) {
    const candidate = dir + encodeURIComponent(fname).replace(/%2F/g, '/');
    try {
      const r = await fetch(candidate);
      if (r.ok && !(r.headers.get('content-type') || '').includes('text/html')) {
        const buffer = await r.arrayBuffer();
        const contentType = (r.headers.get('content-type') || 'application/octet-stream').split(';')[0];
        return { buffer, contentType };
      }
    } catch { /* try next */ }
  }
  throw new Error(`Download 404 (all case variants)`);
}

async function getPresignedUpload(fileName, fileType, folder) {
  const r = await fetch(S3_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileType, folder }),
  });
  if (!r.ok) throw new Error(`Presign ${r.status}`);
  return r.json();
}

async function uploadToS3(uploadUrl, buffer, contentType) {
  const r = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: buffer,
  });
  if (!r.ok) throw new Error(`S3 PUT ${r.status}`);
}

async function putFullEntry(item) {
  const r = await fetch(UPD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(item),
  });
  if (!r.ok) throw new Error(`Update ${r.status}: ${await r.text()}`);
}

const guessExt = (url) => {
  const m = (url.split('?')[0].match(/\.([a-z0-9]{2,5})$/i) || [])[1] || 'bin';
  return m.toLowerCase();
};

// ── Main ─────────────────────────────────────────────────────
(async () => {
  console.log(DRY_RUN ? '🔍  DRY RUN\n' : '🚀  LIVE RUN\n');

  const csv  = parseCSV(fs.readFileSync(CSV_PATH, 'utf8'));
  const data = csv.slice(1).filter(r => r.length > 1);
  console.log(`CSV data rows: ${data.length}`);

  // Live DB index: lookup application entries by id
  const live = await getAllEntries();
  const liveById = new Map(live.map(e => [e.id, e]));
  // Also index imported-app entries by their row-index suffix
  // (id pattern: "imported-app-<timestamp>-<rowIdx>")
  const importedAppByIdx = new Map();
  for (const e of live) {
    const m = (e.id || '').match(/^imported-app-\d+-(\d+)$/);
    if (m) importedAppByIdx.set(Number(m[1]), e);
  }
  console.log(`Live DynamoDB entries: ${live.length} (imported-app indexed: ${importedAppByIdx.size})\n`);

  let touchedEntries = 0;
  let migratedFiles  = 0;
  let failedFiles    = 0;
  let missingEntries = 0;

  for (let i = 0; i < data.length; i++) {
    const row = data[i];

    // Direct row-index → imported-app entry (any timestamp suffix)
    let existing = importedAppByIdx.get(i);
    if (!existing) {
      // Last-resort: name + email fallback
      const csvName  = (row[SURNAME_IDX] || '').trim().toLowerCase();
      const csvEmail = (row[8] || '').trim().toLowerCase();
      existing = live.find(e =>
        e.formType === 'Application Form' &&
        (e.lastName || '').toLowerCase() === csvName &&
        (e.email || '').toLowerCase() === csvEmail
      );
      if (!existing) { missingEntries++; continue; }
    }

    const name = `${row[FIRST_NAME_IDX]} ${row[SURNAME_IDX]}`.trim() || existing.id;
    const newFileFields = {};

    for (const { col, field, name: fname } of FILE_COLUMNS) {
      const raw = (row[col] || '').trim();
      if (!raw) continue;
      // Field already migrated? Skip.
      if (existing[field]) continue;

      // May be comma-separated multiple URLs
      const urls = raw.split(',').map(u => u.trim()).filter(u => u && /^https?:\/\//i.test(u));
      const migratedParts = [];

      for (const url of urls) {
        if (DRY_RUN) {
          migratedParts.push('(would migrate) ' + url.split('/').pop());
          continue;
        }
        try {
          const { buffer, contentType } = await downloadFile(url);
          const origName = decodeURIComponent(url.split('/').pop().split('?')[0]);
          const safeName = origName.replace(/[^a-zA-Z0-9._-]/g, '_') || `file.${guessExt(url)}`;
          const folder   = `migrated/application-form/${field.replace(/Url$/,'').replace(/([A-Z])/g,'-$1').toLowerCase().replace(/^-/,'')}`;
          const { uploadUrl, fileKey } = await getPresignedUpload(safeName, contentType, folder);
          await uploadToS3(uploadUrl, buffer, contentType);
          migratedParts.push(fileKey);
          migratedFiles++;
        } catch (err) {
          console.error(`  ❌  ${name} | ${fname}: ${err.message}  (${url.slice(0,80)}…)`);
          failedFiles++;
        }
      }

      if (migratedParts.length) {
        newFileFields[field] = migratedParts.join(', ');
      }
    }

    if (Object.keys(newFileFields).length === 0) continue;

    if (DRY_RUN) {
      console.log(`  ✅  ${name} (${existing.id}): would add ${Object.keys(newFileFields).join(', ')}`);
    } else {
      // Send FULL existing entry merged with new file keys — safe on either Lambda.
      const merged = { ...existing, ...newFileFields };
      try {
        await putFullEntry(merged);
        console.log(`  💾  ${name} → ${Object.keys(newFileFields).join(', ')}`);
        touchedEntries++;
      } catch (err) {
        console.error(`  ❌  Patch failed for ${existing.id}: ${err.message}`);
      }
    }
  }

  console.log(`\n${'─'.repeat(56)}`);
  console.log(`📊  Touched entries:  ${touchedEntries}`);
  console.log(`✅  Migrated files:   ${migratedFiles}`);
  if (failedFiles)    console.log(`❌  Failed downloads: ${failedFiles}`);
  if (missingEntries) console.log(`⚠️  CSV rows w/o DynamoDB match: ${missingEntries}`);
})().catch(e => { console.error('💥', e); process.exit(1); });
