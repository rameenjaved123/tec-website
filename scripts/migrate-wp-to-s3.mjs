// ── Migrate WordPress files → S3 ─────────────────────────────
// Downloads each WP file, uploads to S3 via Lambda, updates JSON
import fs from 'fs';
import path from 'path';

const LAMBDA_URL = 'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com/get-upload-url';
const BUCKET     = 'tec-form-uploads';
const REGION     = 'us-east-1';
const FOLDER     = 'new-starter/proof-of-id';
const DELAY_MS   = 300; // be gentle with WP server

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function mimeFromUrl(url) {
  const ext = url.split('?')[0].split('.').pop().toLowerCase();
  const map = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', pdf: 'application/pdf', gif: 'image/gif', webp: 'image/webp' };
  return map[ext] || 'application/octet-stream';
}

function fileNameFromUrl(url) {
  return url.split('?')[0].split('/').pop() || 'file';
}

async function downloadFile(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 TEC-Migration/1.0' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buffer = await res.arrayBuffer();
  return Buffer.from(buffer);
}

async function getPresignedUploadUrl(fileName, fileType) {
  const res = await fetch(LAMBDA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileType, folder: FOLDER }),
  });
  if (!res.ok) throw new Error('Lambda error: ' + await res.text());
  return res.json(); // { uploadUrl, fileKey }
}

async function uploadToS3(buffer, uploadUrl, fileType) {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': fileType },
    body: buffer,
  });
  if (!res.ok) throw new Error('S3 upload failed: ' + res.status);
}

async function migrateUrl(wpUrl) {
  const fileName = fileNameFromUrl(wpUrl);
  const fileType = mimeFromUrl(wpUrl);
  const buffer   = await downloadFile(wpUrl);
  const { uploadUrl, fileKey } = await getPresignedUploadUrl(fileName, fileType);
  await uploadToS3(buffer, uploadUrl, fileType);
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${fileKey}`;
}

async function main() {
  const importPath = new URL('../public/tec-import.json', import.meta.url).pathname;
  const entries    = JSON.parse(fs.readFileSync(importPath, 'utf8'));

  // Build list of all WP URLs that need migrating
  const tasks = [];
  entries.forEach((e, idx) => {
    ['proofOfIdUrl', 'p45Url'].forEach(field => {
      if (e[field] && e[field].includes('wp-content')) {
        e[field].split(', ').forEach(url => {
          if (url.trim()) tasks.push({ idx, field, url: url.trim() });
        });
      }
    });
  });

  console.log(`\n🚀 Migrating ${tasks.length} files to S3...\n`);

  // URL cache — same file may appear in multiple entries
  const cache    = {};
  let success    = 0;
  let failed     = 0;
  const failures = [];

  for (let i = 0; i < tasks.length; i++) {
    const { idx, field, url } = tasks[i];
    process.stdout.write(`[${i+1}/${tasks.length}] ${fileNameFromUrl(url)} ... `);

    try {
      if (!cache[url]) {
        cache[url] = await migrateUrl(url);
      }
      const s3Url = cache[url];

      // Replace in entry (handle comma-separated multi-file fields)
      entries[idx][field] = entries[idx][field]
        .split(', ')
        .map(u => u.trim() === url ? s3Url : u)
        .join(', ');

      console.log('✅');
      success++;
    } catch (err) {
      console.log('❌', err.message);
      failures.push({ url, error: err.message });
      failed++;
    }

    await sleep(DELAY_MS);
  }

  // Save updated JSON
  fs.writeFileSync(importPath, JSON.stringify(entries, null, 2));
  console.log(`\n✅ Done. ${success} migrated, ${failed} failed.`);

  if (failures.length) {
    fs.writeFileSync('/tmp/migration-failures.json', JSON.stringify(failures, null, 2));
    console.log(`❌ Failed files saved to /tmp/migration-failures.json`);
  }

  // Generate localStorage update script
  const updateScript = `
// Run this in the browser console at /admin to update localStorage URLs
const key = 'tec_form_submissions_v2';
const updated = ${JSON.stringify(entries)};
const existing = JSON.parse(localStorage.getItem(key) || '[]');
// Replace all New Starter entries with migrated versions, keep others
const others = existing.filter(e => e.formType !== 'New Starter Form');
const merged = [...others, ...updated.filter(e => e.formType === 'New Starter Form')];
localStorage.setItem(key, JSON.stringify(merged));
console.log('✅ Updated', updated.filter(e=>e.formType==='New Starter Form').length, 'New Starter entries with S3 URLs');
location.reload();
`.trim();

  fs.writeFileSync('/tmp/update-localstorage.js', updateScript);
  console.log('\n📋 localStorage update script saved to /tmp/update-localstorage.js');
  console.log('   Paste it in the browser console at /admin to update file URLs.\n');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
