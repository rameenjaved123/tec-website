/**
 * recover-uppercase-files.mjs
 *
 * Some legacy entries have FULLY UPPERCASE wp-content URLs
 * (e.g. HTTPS://TRENTEDUCATION.CO.UK/ENROL/WP-CONTENT/.../CV-JIAHE-LI3.301.PDF).
 * The directory path is actually lowercase on the server, but the FILENAME
 * keeps mixed case — so neither the uppercase nor a naive lowercase URL works.
 *
 * This script lowercases the scheme/host/directory, then probes a set of
 * filename-case candidates against the server. The first one that returns 200
 * is downloaded, uploaded to S3, and the DynamoDB entry is patched.
 *
 * Run: TOKEN="..." node scripts/recover-uppercase-files.mjs [--dry-run]
 */

import path from 'path';

const DRY_RUN = process.argv.includes('--dry-run');
const TOKEN   = process.env.TOKEN || '';
if (!TOKEN) { console.error('❌  No TOKEN set.'); process.exit(1); }

const API     = 'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com';
const GET_URL = `${API}/get-submissions`;
const UPD_URL = `${API}/update-submission`;
const S3_URL  = `${API}/get-upload-url`;

const isWpUrl = (v) => typeof v === 'string' && /wp-content/i.test(v);

// ── Build candidate filename casings ─────────────────────────
function filenameCandidates(stem, ext) {
  const segTitle = (seg) =>
    /^[A-Za-z]{2,4}$/.test(seg)             // short all-letter chunk (CV, CNIC) → keep upper
      ? seg.toUpperCase()
      : seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase();

  const stems = new Set([
    stem,                                                  // as-is (upper)
    stem.toLowerCase(),                                    // all lower
    stem.split('-').map(segTitle).join('-'),              // smart title-case
    stem.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join('-'), // plain title
  ]);
  const exts = new Set([ext.toLowerCase(), ext, ext.toUpperCase()]);

  const out = [];
  for (const s of stems) for (const e of exts) out.push(`${s}${e}`);
  return out;
}

// Lowercase scheme + host + directory, keep the filename to swap
function normalizeDir(url) {
  const i = url.lastIndexOf('/');
  const dir  = url.slice(0, i + 1).toLowerCase(); // scheme+host+dirs → lower
  const file = decodeURIComponent(url.slice(i + 1));
  const ext  = path.extname(file);
  const stem = file.slice(0, file.length - ext.length);
  return { dir, stem, ext };
}

async function findWorkingUrl(originalUrl) {
  const { dir, stem, ext } = normalizeDir(originalUrl);
  for (const fname of filenameCandidates(stem, ext)) {
    const candidate = dir + encodeURIComponent(fname).replace(/%2F/g, '/');
    try {
      const res = await fetch(candidate);
      if (res.ok && !(res.headers.get('content-type') || '').includes('text/html')) {
        return { url: candidate, res };
      }
    } catch { /* try next */ }
  }
  return null;
}

async function getPresignedUpload(fileName, fileType, folder) {
  const res = await fetch(S3_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileType, folder }),
  });
  if (!res.ok) throw new Error(`Presigned URL failed: ${res.status}`);
  return res.json();
}

async function patchEntry(id, updates) {
  const res = await fetch(UPD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
    body: JSON.stringify({ id, ...updates }),
  });
  if (!res.ok) throw new Error(`Update failed: ${res.status}`);
}

async function getAllEntries() {
  let all = [], nk = null;
  do {
    const u = new URL(GET_URL); u.searchParams.set('limit', '500');
    if (nk) u.searchParams.set('startKey', nk);
    const r = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
    const d = await r.json();
    all = all.concat(d.items || []); nk = d.nextKey || null;
  } while (nk);
  return all;
}

async function main() {
  console.log(DRY_RUN ? '🔍  DRY RUN\n' : '🚀  LIVE RUN\n');
  const entries = await getAllEntries();
  const toFix = entries.filter(e => Object.values(e).some(isWpUrl));
  console.log(`Entries with wp-content URLs (any case): ${toFix.length}\n`);

  let recovered = 0, lost = 0;

  for (const entry of toFix) {
    const name = `${entry.firstName || ''} ${entry.lastName || ''}`.trim() || entry.id;
    const updates = {};

    for (const [field, raw] of Object.entries(entry)) {
      if (!isWpUrl(raw)) continue;
      const parts = String(raw).split(',').map(u => u.trim()).filter(Boolean);
      const newParts = [];
      let changed = false;

      for (const url of parts) {
        if (!isWpUrl(url)) { newParts.push(url); continue; }

        const found = await findWorkingUrl(url);
        if (!found) {
          console.log(`  ❌  ${name} | ${field}: no working URL found`);
          newParts.push(url); lost++;
          continue;
        }

        if (DRY_RUN) {
          console.log(`  ✅  ${name} | ${field}: would migrate ${found.url.split('/').pop()}`);
          newParts.push(url); changed = false;
          continue;
        }

        const buffer = await found.res.arrayBuffer();
        const ctype  = (found.res.headers.get('content-type') || 'application/octet-stream').split(';')[0];
        const fname  = decodeURIComponent(found.url.split('/').pop());
        const safe   = fname.replace(/[^a-zA-Z0-9._-]/g, '_');
        const folder = `migrated/${(entry.formType || 'misc').replace(/\s+/g, '-').toLowerCase()}`;
        const { uploadUrl, fileKey } = await getPresignedUpload(safe, ctype, folder);
        const up = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': ctype }, body: buffer });
        if (!up.ok) { console.log(`  ❌  ${name} | ${field}: S3 upload failed`); newParts.push(url); lost++; continue; }

        console.log(`  ✅  ${name} | ${field}: ${fname} → ${fileKey}`);
        newParts.push(fileKey); changed = true; recovered++;
      }

      if (changed) updates[field] = newParts.join(', ');
    }

    if (!DRY_RUN && Object.keys(updates).length) {
      await patchEntry(entry.id, updates);
      console.log(`  💾  ${name}: DynamoDB updated`);
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅  Recovered files: ${recovered}`);
  if (lost > 0) console.log(`❌  Unrecoverable:   ${lost}`);
}

main().catch(e => { console.error('💥', e); process.exit(1); });
