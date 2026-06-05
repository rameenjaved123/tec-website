/**
 * restore-wiped-entries.mjs
 *
 * CONTEXT / WHAT WENT WRONG
 * ────────────────────────
 * The deployed /update-submission Lambda used PutCommand (full REPLACE), not a
 * merge. The migration scripts sent partial bodies like { id, cvFileUrl }, so
 * DynamoDB replaced each touched entry with ONLY { id, cvFileUrl } — wiping
 * formType, name, date, email, etc. Those entries now show as a blank form
 * category with "Invalid Date" and "?" names.
 *
 * THIS SCRIPT
 * ───────────
 * Rebuilds wiped entries from the original import JSONs (public/*.json), while
 * PRESERVING any migrated S3 file keys already on the live (stripped) record —
 * so we keep the good file migration and restore everything else.
 *
 * Entries whose id is NOT in any import JSON are real form submissions that were
 * only ever in DynamoDB; those can't be rebuilt from the repo and need a
 * DynamoDB Point-in-Time-Recovery restore. The script lists them.
 *
 * Run: TOKEN="..." node scripts/restore-wiped-entries.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const DRY_RUN = process.argv.includes('--dry-run');
const TOKEN   = process.env.TOKEN || '';
if (!TOKEN) { console.error('❌  No TOKEN set.'); process.exit(1); }

const API     = 'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com';
const GET_URL = `${API}/get-submissions`;
const UPD_URL = `${API}/update-submission`;

const FILE_FIELD = (k) => k.toLowerCase().endsWith('url') && k.toLowerCase() !== 'sheetsurl';

// ── Build id → original entry map from all import JSONs ──────
function loadImportMap() {
  const files = ['tec-import.json', 'tec-applications-import.json', 'tec-partnerships-import.json'];
  const map = new Map();
  for (const f of files) {
    const p = path.join(ROOT, 'public', f);
    if (!fs.existsSync(p)) continue;
    const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
    const arr = Array.isArray(raw) ? raw : (raw.items || raw.submissions || Object.values(raw)[0] || []);
    for (const e of arr) if (e && e.id) map.set(e.id, e);
    console.log(`  loaded ${arr.length} from ${f}`);
  }
  return map;
}

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

async function saveFull(item) {
  // Full-item write (safe even on the old replace-Lambda, since we send everything)
  const r = await fetch(UPD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(item),
  });
  if (!r.ok) throw new Error(`Update ${r.status}`);
}

async function main() {
  console.log(DRY_RUN ? '🔍  DRY RUN\n' : '🚀  LIVE RUN\n');

  console.log('Loading import data…');
  const importMap = loadImportMap();
  console.log(`  total import records: ${importMap.size}\n`);

  console.log('Fetching live DB…');
  const live = await getAllEntries();
  // EXACT wipe signature: the PutCommand replace left ONLY { id, ...fileUrlFields }.
  // So a wiped entry has no formType and every non-id key ends in "url".
  const stripped = live.filter(e => {
    if (e.formType) return false;
    const keys = Object.keys(e).filter(k => k !== 'id');
    return keys.length > 0 && keys.every(k => k.toLowerCase().endsWith('url'));
  });
  console.log(`  live entries: ${live.length}`);
  console.log(`  truly wiped (only id + file fields): ${stripped.length}\n`);

  let restored = 0;
  const unrecoverable = [];

  for (const cur of stripped) {
    const orig = importMap.get(cur.id);
    if (!orig) { unrecoverable.push(cur); continue; }

    // Preserve any migrated file keys that live on the stripped record
    const fileFields = {};
    for (const [k, v] of Object.entries(cur)) {
      if (k !== 'id' && FILE_FIELD(k) && v) fileFields[k] = v;
    }

    const merged = { ...orig, ...fileFields, id: cur.id };

    if (DRY_RUN) {
      console.log(`  ✅  would restore ${cur.id} → ${merged.firstName} ${merged.lastName} (${merged.formType})${Object.keys(fileFields).length ? '  [keeps '+Object.keys(fileFields).join(',')+']' : ''}`);
    } else {
      await saveFull(merged);
      console.log(`  💾  restored ${merged.firstName} ${merged.lastName} (${merged.formType})`);
    }
    restored++;
  }

  console.log(`\n${'─'.repeat(56)}`);
  console.log(`✅  Restorable from import JSON: ${restored}`);
  console.log(`⚠️  NOT in import JSON (need DynamoDB PITR): ${unrecoverable.length}`);
  if (unrecoverable.length) {
    console.log('\nUnrecoverable ids (real submissions only in DynamoDB):');
    unrecoverable.forEach(e => console.log(`   ${e.id}  ${JSON.stringify(Object.keys(e))}`));
  }
}

main().catch(e => { console.error('💥', e); process.exit(1); });
