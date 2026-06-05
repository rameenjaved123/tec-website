/**
 * migrate-wp-files-to-s3.mjs
 *
 * Finds every DynamoDB entry that has a wp-content file URL,
 * downloads the file, re-uploads it to S3, then patches the
 * DynamoDB entry with the new S3 fileKey.
 *
 * Run:  node scripts/migrate-wp-files-to-s3.mjs
 * Or:   node scripts/migrate-wp-files-to-s3.mjs --dry-run
 */

import path from 'path';

const DRY_RUN = process.argv.includes('--dry-run');

// ── Auth token ───────────────────────────────────────────────
// Get your token while logged into the admin dashboard:
//   1. Open DevTools → Console
//   2. Run: copy((await import('/src/utils/cognitoAuth.js')).getIdToken && (await (await import('/src/utils/cognitoAuth.js')).getIdToken()))
//   OR simpler — paste this in the console and copy the output:
//   (async()=>{const {getCurrentSession}=await import('/src/utils/cognitoAuth.js');const s=await getCurrentSession();console.log(s?.idToken)})()
//   3. Then run: TOKEN="paste-token-here" node scripts/migrate-wp-files-to-s3.mjs --dry-run
const TOKEN = process.env.TOKEN || '';
if (!TOKEN) {
  console.error('❌  No TOKEN set.\n');
  console.error('Get your Cognito ID token from the browser console while logged into /admin:');
  console.error('  Open DevTools → Console and run:');
  console.error('  Object.entries(localStorage).filter(([k])=>k.includes("idToken")).map(([,v])=>v)[0]');
  console.error('\nThen run:  TOKEN="<paste token here>" node scripts/migrate-wp-files-to-s3.mjs --dry-run\n');
  process.exit(1);
}

// ── API endpoints (match src/config/forms.js) ────────────────
const API       = 'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com';
const GET_URL   = `${API}/get-submissions`;
const UPD_URL   = `${API}/update-submission`;
const S3_URL    = `${API}/get-upload-url`;
const BUCKET    = 'tec-form-uploads';
const REGION    = 'us-east-1';

// ── Detect file fields dynamically ───────────────────────────
// Any string field containing a wp-content URL is a candidate.
// We scan ALL fields rather than a hardcoded list so nothing is missed.
const FILE_FIELDS = null; // null = scan all fields

// ── Helpers ──────────────────────────────────────────────────
const isWpUrl = (v) =>
  typeof v === 'string' && v.includes('wp-content');

const isS3Key = (v) =>
  typeof v === 'string' && !v.startsWith('http') && v.length > 0;

const guessContentType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    '.pdf':  'application/pdf',
    '.doc':  'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png':  'image/png',
    '.gif':  'image/gif',
    '.txt':  'text/plain',
    '.csv':  'text/csv',
  };
  return map[ext] || 'application/octet-stream';
};

// ── Step 1: fetch ALL entries (paginated) ───────────────────
async function getAllEntries() {
  console.log('📥  Fetching all DynamoDB entries (paginated)…');
  let allItems = [];
  let nextKey  = null;
  let page     = 1;

  do {
    const url = new URL(GET_URL);
    url.searchParams.set('limit', '500');
    if (nextKey) url.searchParams.set('startKey', nextKey);

    const res = await fetch(url.toString(), {
      headers: { 'Authorization': `Bearer ${TOKEN}` },
    });
    if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
    const data = await res.json();

    const items = Array.isArray(data) ? data : (data.items || []);
    allItems = allItems.concat(items);
    nextKey  = data.nextKey || null;

    console.log(`    Page ${page}: ${items.length} entries (total so far: ${allItems.length})`);
    page++;
  } while (nextKey);

  console.log(`    ✅  Total entries fetched: ${allItems.length}\n`);
  return allItems;
}

// ── Step 2: download a wp-content file ──────────────────────
async function downloadFile(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${url}`);
  const buffer = await res.arrayBuffer();
  const contentType = res.headers.get('content-type') || 'application/octet-stream';
  return { buffer, contentType };
}

// ── Step 3: get presigned upload URL from Lambda ─────────────
async function getPresignedUpload(fileName, fileType, folder) {
  const res = await fetch(S3_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileType, folder }),
  });
  if (!res.ok) throw new Error(`Presigned URL failed: ${res.status}`);
  const { uploadUrl, fileKey } = await res.json();
  return { uploadUrl, fileKey };
}

// ── Step 4: upload buffer to S3 via presigned URL ────────────
async function uploadToS3(uploadUrl, buffer, contentType) {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: buffer,
  });
  if (!res.ok) throw new Error(`S3 PUT failed: ${res.status}`);
}

// ── Step 5: patch DynamoDB entry ─────────────────────────────
async function patchEntry(id, updates) {
  const res = await fetch(UPD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ id, ...updates }),
  });
  if (!res.ok) throw new Error(`Update failed: ${res.status}`);
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  console.log(DRY_RUN ? '🔍  DRY RUN — no changes will be made\n' : '🚀  LIVE RUN\n');

  const entries = await getAllEntries();

  // Find entries where ANY string field contains a wp-content URL
  const toMigrate = entries.filter(e =>
    Object.values(e).some(v => isWpUrl(v))
  );

  console.log(`🔎  Entries with wp-content file URLs: ${toMigrate.length}\n`);
  if (toMigrate.length === 0) {
    console.log('✅  Nothing to migrate.');
    return;
  }

  let success = 0;
  let failed  = 0;

  for (const entry of toMigrate) {
    const name = `${entry.firstName || ''} ${entry.lastName || ''}`.trim() || entry.id;
    console.log(`\n── ${name} (${entry.formType}) ──`);

    const updates = {};

    // Scan all fields for wp-content URLs
    for (const field of Object.keys(entry)) {
      const raw = entry[field];
      if (!isWpUrl(raw)) continue;

      console.log(`  📎  ${field}: ${raw}`);

      // Field may contain multiple comma-separated URLs (S3 + wp-content mixed)
      const parts = String(raw).split(',').map(u => u.trim()).filter(Boolean);
      const newParts = [];
      let anyChanged = false;

      for (const url of parts) {
        if (!isWpUrl(url)) {
          // Already an S3 URL or key — keep as-is
          newParts.push(url);
          continue;
        }

        try {
          const rawName  = decodeURIComponent(url.split('/').pop().split('?')[0]);
          const safeName = rawName.replace(/[^a-zA-Z0-9._-]/g, '_');
          const folder   = `migrated/${entry.formType.replace(/\s+/g, '-').toLowerCase()}`;

          if (DRY_RUN) {
            console.log(`  ↳  [DRY] Would migrate ${url}`);
            newParts.push(url);
            continue;
          }

          const { buffer, contentType: dlType } = await downloadFile(url);
          const contentType = dlType.split(';')[0].trim() || guessContentType(safeName);
          console.log(`  ↳  Downloaded ${(buffer.byteLength / 1024).toFixed(1)} KB (${contentType})`);

          const { uploadUrl, fileKey } = await getPresignedUpload(safeName, contentType, folder);
          await uploadToS3(uploadUrl, buffer, contentType);
          console.log(`  ✅  Uploaded → ${fileKey}`);

          newParts.push(fileKey);
          anyChanged = true;

        } catch (err) {
          console.error(`  ❌  Failed for one URL in ${field}: ${err.message}`);
          newParts.push(url); // keep original on failure
          failed++;
        }
      }

      if (anyChanged) {
        updates[field] = newParts.join(', ');
      }
    }

    if (Object.keys(updates).length > 0) {
      if (DRY_RUN) {
        console.log(`  [DRY] Would patch entry ${entry.id} with`, updates);
      } else {
        try {
          await patchEntry(entry.id, updates);
          console.log(`  💾  DynamoDB updated for entry ${entry.id}`);
          success++;
        } catch (err) {
          console.error(`  ❌  DynamoDB patch failed: ${err.message}`);
          failed++;
        }
      }
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅  Migrated: ${success} entries`);
  if (failed > 0) console.log(`❌  Failed:   ${failed} entries`);
  console.log(DRY_RUN ? '\n(dry run — nothing was actually changed)' : '\nDone. Refresh the admin dashboard to see S3 links.');
}

main().catch(err => {
  console.error('\n💥  Fatal error:', err);
  process.exit(1);
});
