/**
 * reconcile-after-pitr.mjs
 *
 * Run this AFTER you have restored a DynamoDB Point-in-Time-Recovery copy of the
 * table to a NEW table name (from before the data was wiped).
 *
 * It reads the original records for the 75 wiped ids (listed in
 * scripts/wiped-file-keys-manifest.json) from the RESTORED table, merges in the
 * migrated S3 file keys we saved in the manifest, and writes the full records
 * back into the LIVE table — so each entry gets its real form data back AND
 * keeps the new S3 file links.
 *
 * Prereqs:
 *   - AWS credentials configured (env vars / aws configure / SSO) with
 *     dynamodb:Scan on the restored table and dynamodb:PutItem on the live table.
 *   - npm i @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb   (run once)
 *
 * Usage:
 *   RESTORED_TABLE="tec-form-submissions-restore-2026xxxx" \
 *   node scripts/reconcile-after-pitr.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, BatchGetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DRY_RUN        = process.argv.includes('--dry-run');
const REGION         = process.env.AWS_REGION || 'us-east-1';
const LIVE_TABLE     = process.env.LIVE_TABLE || 'tec-form-submissions';
const RESTORED_TABLE = process.env.RESTORED_TABLE || '';

if (!RESTORED_TABLE) {
  console.error('❌  Set RESTORED_TABLE to the name of your PITR-restored table.');
  console.error('    e.g. RESTORED_TABLE="tec-form-submissions-restore-20260605" node scripts/reconcile-after-pitr.mjs --dry-run');
  process.exit(1);
}

const doc = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }));

const FILE_FIELD = (k) => k.toLowerCase().endsWith('url') && k.toLowerCase() !== 'sheetsurl';

async function main() {
  console.log(DRY_RUN ? '🔍  DRY RUN\n' : '🚀  LIVE RUN\n');
  console.log(`Restored table: ${RESTORED_TABLE}`);
  console.log(`Live table:     ${LIVE_TABLE}\n`);

  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'wiped-file-keys-manifest.json'), 'utf8'));
  const byId = new Map(manifest.map(m => [m.id, m]));
  const ids  = manifest.map(m => ({ id: m.id }));
  console.log(`Wiped entries to reconcile: ${ids.length}\n`);

  // BatchGet in chunks of 100 from the restored table
  const originals = new Map();
  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100);
    const res = await doc.send(new BatchGetCommand({
      RequestItems: { [RESTORED_TABLE]: { Keys: chunk } },
    }));
    (res.Responses?.[RESTORED_TABLE] || []).forEach(item => originals.set(item.id, item));
  }
  console.log(`Found ${originals.size} originals in restored table.\n`);

  let restored = 0, missing = 0;
  for (const { id } of ids) {
    const orig = originals.get(id);
    if (!orig) { console.log(`  ⚠️  ${id}: not found in restored table`); missing++; continue; }

    // Preserve migrated file keys from the manifest (the good migration result)
    const fileKeys = {};
    for (const [k, v] of Object.entries(byId.get(id))) {
      if (k !== 'id' && FILE_FIELD(k) && v) fileKeys[k] = v;
    }
    const merged = { ...orig, ...fileKeys, id };

    if (DRY_RUN) {
      console.log(`  ✅  ${id} → ${merged.firstName || ''} ${merged.lastName || ''} (${merged.formType})  keeps[${Object.keys(fileKeys).join(',')}]`);
    } else {
      await doc.send(new PutCommand({ TableName: LIVE_TABLE, Item: merged }));
      console.log(`  💾  ${merged.firstName || ''} ${merged.lastName || ''} (${merged.formType})`);
    }
    restored++;
  }

  console.log(`\n${'─'.repeat(56)}`);
  console.log(`✅  Reconciled: ${restored}`);
  if (missing) console.log(`⚠️  Missing in restored table: ${missing}`);
}

main().catch(e => { console.error('💥', e); process.exit(1); });
