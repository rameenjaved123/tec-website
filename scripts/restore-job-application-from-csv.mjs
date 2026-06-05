/**
 * restore-job-application-from-csv.mjs
 *
 * Rebuilds the 62 wiped Job Application entries using the Gravity Forms CSV
 * export at /Users/mac/Downloads/job-application-2026-05-31.csv .
 *
 * Match strategy:
 *   1. Strong key — original CV filename (embedded in the migrated S3 key for
 *      each wiped record) matched against the CSV's "CV" URL filename.
 *   2. If a filename matches multiple CSV rows (duplicates), pick the row whose
 *      Entry Date is closest to the timestamp embedded in the wiped id (for
 *      UUIDs we use the timestamp from the S3 key — first numeric prefix).
 *
 * Output:
 *   For each match, write a full entry to DynamoDB containing all CSV fields
 *   mapped to our internal columnMap keys, PLUS the migrated S3 file keys we
 *   preserved in scripts/wiped-file-keys-manifest.json.
 *
 * Usage:
 *   TOKEN="..." node scripts/restore-job-application-from-csv.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const DRY_RUN = process.argv.includes('--dry-run');
const TOKEN   = process.env.TOKEN || '';
if (!TOKEN) { console.error('❌  No TOKEN set.'); process.exit(1); }

const CSV_PATH = '/Users/mac/Downloads/job-application-2026-05-31.csv';
const API     = 'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com';
const UPD_URL = `${API}/update-submission`;

// ── CSV column name → internal field name ─────────────────────
// (mirrors FORM_REGISTRY['Job Application'].columnMap from src/config/forms.js)
const CSV_TO_INTERNAL = {
  'Job Title':                                         'jobTitle',
  'Name (Title)':                                      'title',
  'Name (First Name)':                                 'firstName',
  'Name (Middle)':                                     'middleName',
  'Name (Surname)':                                    'lastName',
  'Gender':                                            'gender',
  'Date of birth':                                     'dob',
  'Mobile':                                            'mobile',
  'Email':                                             'email',
  'Emergency Contact':                                 'emergencyContact',
  'First Line of Address':                             'addressLine1',
  'Second Line of Address':                            'addressLine2',
  'City':                                              'city',
  'Country':                                           'country',
  'Postal Code':                                       'postCode',
  'Country of birth':                                  'countryOfBirth',
  'Nationality':                                       'nationality',
  'Qualifications':                                    'qualifications',
  'Ethnicity':                                         'ethnicity',
  'Visa Status':                                       'visaStatus',
  'Preferred Working Location':                        'siteLocation',
  'Disclose any disability/medical condition':         'disability',
  'If other\n please give details':                    'disabilityDetails',
  'Do you have any spent/unspent criminal conviction?':'criminalConviction',
  'If yes\n please give details':                      'convictionDetails',
};

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

function cvFilenameOf(url) {
  if (!url) return '';
  const tail = String(url).split(/[\\\/]/).pop().split('?')[0];
  return decodeURIComponent(tail).toLowerCase();
}

// Pull the leading timestamp from a migrated key like
// "migrated/job-application/1780616699190-FOO.pdf"
function migrationTimestamp(key) {
  const tail = String(key || '').split('/').pop();
  const m = tail.match(/^(\d+)-/);
  return m ? Number(m[1]) : 0;
}

function parseEntryDate(s) {
  // CSV format: "2026-04-24 13:30:12"
  if (!s) return 0;
  return Date.parse(s.replace(' ', 'T') + 'Z');
}

async function patchEntry(item) {
  const r = await fetch(UPD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(item),
  });
  if (!r.ok) throw new Error(`Update ${r.status}: ${await r.text()}`);
}

function main() {
  console.log(DRY_RUN ? '🔍  DRY RUN\n' : '🚀  LIVE RUN\n');

  // 1. Parse CSV
  const csv = parseCSV(fs.readFileSync(CSV_PATH, 'utf8'));
  const header = csv[0].map(h => h.trim());
  const data   = csv.slice(1).filter(r => r.length > 1);
  const idx = name => header.findIndex(h => h === name);

  const csvRows = data.map(r => {
    const obj = {};
    header.forEach((h, i) => { obj[h] = r[i] ?? ''; });
    return obj;
  });
  console.log(`CSV rows: ${csvRows.length}`);

  // 2. Index CSV by CV filename (lowercase)
  const byCvName = new Map();
  for (const row of csvRows) {
    const fname = cvFilenameOf(row['CV']);
    if (!fname) continue;
    if (!byCvName.has(fname)) byCvName.set(fname, []);
    byCvName.get(fname).push(row);
  }

  // 3. Load wiped manifest, take only job-application ones
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/wiped-file-keys-manifest.json'), 'utf8'));
  const wiped = manifest.filter(e => (e.cvFileUrl || '').startsWith('migrated/job-application/'));
  console.log(`Wiped Job Applications to restore: ${wiped.length}\n`);

  return { wiped, byCvName };
}

(async () => {
  const { wiped, byCvName } = main();

  let restored = 0, ambiguousResolved = 0, unmatched = 0;
  for (const w of wiped) {
    // Embedded filename in migrated key looks like "1780616699190-Original-Name.pdf"
    const tail   = (w.cvFileUrl || '').split('/').pop();
    const stripped = tail.replace(/^\d+-/, '').toLowerCase();
    const candidates = byCvName.get(stripped) || [];

    let csvRow = null;
    if (candidates.length === 1) {
      csvRow = candidates[0];
    } else if (candidates.length > 1) {
      // Tiebreak by Entry Date closest to migration timestamp
      const mts = migrationTimestamp(w.cvFileUrl);
      candidates.sort((a, b) =>
        Math.abs(parseEntryDate(a['Entry Date']) - mts)
        - Math.abs(parseEntryDate(b['Entry Date']) - mts)
      );
      csvRow = candidates[0];
      ambiguousResolved++;
    }

    if (!csvRow) {
      console.log(`  ❌  ${w.id}: no CSV match for "${stripped}"`);
      unmatched++;
      continue;
    }

    // Build the full DynamoDB entry
    const item = {
      id: w.id,
      formType: 'Job Application',
      status: 'reviewed', // these are restored historical entries
    };
    for (const [csvCol, internal] of Object.entries(CSV_TO_INTERNAL)) {
      const v = csvRow[csvCol];
      if (v !== '' && v !== undefined) item[internal] = v;
    }
    // Convert Entry Date "YYYY-MM-DD HH:MM:SS" → ISO
    const ed = csvRow['Entry Date'];
    if (ed) item.submittedAt = new Date(ed.replace(' ', 'T') + 'Z').toISOString();

    // Preserve migrated file keys
    for (const [k, v] of Object.entries(w)) {
      if (k !== 'id' && k.toLowerCase().endsWith('url') && v) item[k] = v;
    }

    if (DRY_RUN) {
      console.log(`  ✅  ${item.firstName || ''} ${item.lastName || ''} | ${item.email || ''} | ${item.submittedAt || ''}`);
    } else {
      await patchEntry(item);
      console.log(`  💾  ${item.firstName || ''} ${item.lastName || ''} (${item.email || ''})`);
    }
    restored++;
  }

  console.log(`\n${'─'.repeat(56)}`);
  console.log(`✅  Restored: ${restored}${ambiguousResolved ? ` (${ambiguousResolved} via tiebreak)` : ''}`);
  if (unmatched) console.log(`❌  Unmatched: ${unmatched}`);
})().catch(e => { console.error('💥', e); process.exit(1); });
