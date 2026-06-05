/**
 * restore-international-from-csv.mjs
 *
 * Rebuilds the 13 wiped International Application entries from the Gravity Forms
 * CSV at /Users/mac/Downloads/international-student-application-form-2026-05-31.csv .
 *
 * Match strategy:
 *   Wiped DynamoDB id is "intl-legacy-<EntryId>", the CSV has "Entry Id" → direct
 *   match. We also preserve the migrated S3 file keys for each wiped entry.
 *
 * Note: the CSV reuses column NAMES for qualification 1 vs 2 ("Qualification Type"
 * appears twice, etc.), so we map fields by their column INDEX (positional) rather
 * than by header text.
 *
 * Usage:  TOKEN="..." node scripts/restore-international-from-csv.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const DRY_RUN = process.argv.includes('--dry-run');
const TOKEN   = process.env.TOKEN || '';
if (!TOKEN) { console.error('❌  No TOKEN set.'); process.exit(1); }

const CSV_PATH = '/Users/mac/Downloads/international-student-application-form-2026-05-31.csv';
const API     = 'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com';
const UPD_URL = `${API}/update-submission`;

// Column index → internal field name (matches FORM_REGISTRY['International Application'].columnMap)
// indexes are 0-based after parsing the CSV (no implicit ID column).
const INDEX_MAP = {
  0:  'title',
  1:  'firstName',
  2:  'middleName',
  3:  'lastName',
  // 4: suffix — skip
  5:  'gender',
  6:  'dob',
  7:  'mobile',
  8:  'email',
  9:  'emergencyContact',
  10: 'addressLine1',
  11: 'addressLine2',
  12: 'city',
  13: 'country',
  14: 'postCode',
  15: 'countryOfBirth',
  16: 'countryOfPermanentResidence',
  17: 'nationality',
  18: 'ethnicity',
  19: 'ukCitizen',
  20: 'requiresVisa',
  21: 'passportNumber',
  22: 'passportPlaceOfIssue',
  23: 'passportIssuedDate',
  24: 'passportExpiryDate',
  25: 'visaRefused',
  // ── Qualification 1 ──
  26: 'qual1Type',
  27: 'qual1OtherDetails',
  28: 'qual1Subject',
  29: 'qual1Grade',
  30: 'qual1DateAchieved',
  31: 'qual1Institution',
  // ── Qualification 2 ──
  32: 'qual2Type',
  33: 'qual2OtherDetails',
  34: 'qual2Subject',
  35: 'qual2Grade',
  36: 'qual2YearAchieved',
  37: 'qual2MonthAchieved',
  38: 'qual2Institution',
  // ── Course / employment ──
  39: 'course',
  40: 'startDate',
  41: 'studyCentre',
  42: 'employmentStatus',
  43: 'employerName',
  44: 'dateOfEmployment',
  45: 'lengthOfEmployment',
  46: 'lengthOfUnemployment',
  47: 'disability',
  48: 'disabilityDetails',
  49: 'criminalConviction',
  50: 'criminalConvictionDetails',
  51: 'hearAbout',
  52: 'referralName',
  // 53-58 are file URLs handled separately, see FILE_COLS below.
  // 59-62: Other / Consent / Text / Description — skip
  // 63: Created By — skip
  // 64: Entry Id → derives the wiped id
  // 65: Entry Date → submittedAt
};

// File-URL column indexes (these often contain comma-separated lists in the CSV)
const FILE_COLS = {
  53: 'passportFileUrl',
  54: 'qualificationsFileUrl',
  55: 'cvFileUrl',
  56: 'experienceLetterUrl',
  57: 'personalStatementUrl',
};

const ENTRY_ID_IDX   = 63;
const ENTRY_DATE_IDX = 64;

function parseCSV(raw) {
  raw = raw.replace(/^﻿/, '');
  const rows = [];
  let row = [], cur = '', q = false;
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

async function patchEntry(item) {
  const r = await fetch(UPD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(item),
  });
  if (!r.ok) throw new Error(`Update ${r.status}: ${await r.text()}`);
}

(async () => {
  console.log(DRY_RUN ? '🔍  DRY RUN\n' : '🚀  LIVE RUN\n');

  const rows = parseCSV(fs.readFileSync(CSV_PATH, 'utf8'));
  const header = rows[0];
  const data = rows.slice(1).filter(r => r.length > 1 && (r[ENTRY_ID_IDX] || '').trim());
  console.log(`CSV header columns: ${header.length} | data rows: ${data.length}\n`);

  // Load wiped manifest, take only the intl-legacy ones
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/wiped-file-keys-manifest.json'), 'utf8'));
  const wiped = manifest.filter(e => /^intl-legacy-/.test(e.id));
  const wantIds = new Set(wiped.map(w => w.id));
  const wipedById = new Map(wiped.map(w => [w.id, w]));
  console.log(`Wiped International entries to restore: ${wiped.length}\n`);

  let restored = 0, missing = 0;
  const seenIds = new Set();
  for (const row of data) {
    const entryId = row[ENTRY_ID_IDX].trim();
    const id = `intl-legacy-${entryId}`;
    if (!wantIds.has(id) || seenIds.has(id)) continue;
    seenIds.add(id);

    const wipedRow = wipedById.get(id);

    const item = {
      id,
      formType: 'International Application',
      status: 'reviewed',
    };
    for (const [colStr, field] of Object.entries(INDEX_MAP)) {
      const v = (row[Number(colStr)] || '').trim();
      if (v) item[field] = v;
    }
    // Entry Date → ISO
    const ed = (row[ENTRY_DATE_IDX] || '').trim();
    if (ed) item.submittedAt = new Date(ed.replace(' ', 'T') + 'Z').toISOString();

    // Preserve migrated S3 file keys from the wiped record (these are the GOOD ones).
    // We do NOT use CSV file URLs because those are the OLD wp-content URLs we replaced.
    for (const [k, v] of Object.entries(wipedRow)) {
      if (k !== 'id' && k.toLowerCase().endsWith('url') && v) item[k] = v;
    }

    if (DRY_RUN) {
      const keeps = Object.values(FILE_COLS).filter(f => item[f]);
      console.log(`  ✅  ${id} → ${item.firstName || ''} ${item.lastName || ''} | ${item.email || ''}  [keeps ${keeps.join(',')}]`);
    } else {
      await patchEntry(item);
      console.log(`  💾  ${item.firstName || ''} ${item.lastName || ''} (${item.email || ''})`);
    }
    restored++;
  }

  const notFoundIds = [...wantIds].filter(id => !seenIds.has(id));
  if (notFoundIds.length) {
    console.log(`\n⚠️  ${notFoundIds.length} wiped ids NOT in the CSV:`);
    notFoundIds.forEach(id => console.log(`   ${id}`));
    missing = notFoundIds.length;
  }

  console.log(`\n${'─'.repeat(56)}`);
  console.log(`✅  Restored: ${restored}`);
  if (missing) console.log(`❌  Missing in CSV: ${missing}`);
})().catch(e => { console.error('💥', e); process.exit(1); });
