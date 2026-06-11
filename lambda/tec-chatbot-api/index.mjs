/**
 * TEC Chatbot API — single-file Lambda (Node 20, no npm dependencies)
 *
 * Environment variables required:
 *   ANTHROPIC_API_KEY, OPENAI_API_KEY,
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 *   JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD,
 *   CORS_ORIGINS  (comma-separated, e.g. https://trenteducation.co.uk)
 *
 * Handler: index.handler
 * Runtime: Node.js 20.x
 * Timeout: 30s   Memory: 512 MB
 *
 * Routes:
 *   POST   /api/chat
 *   GET    /api/documents
 *   POST   /api/documents/upload   (TXT only — paste plain text as field "text", name as "name")
 *   DELETE /api/documents/:id
 *   POST   /api/admin/token
 *   GET    /api/admin/analytics
 *   GET    /api/admin/conversations
 */

import { createHmac, randomUUID, timingSafeEqual } from 'crypto';

// ── Env ───────────────────────────────────────────────────
const ANTHROPIC_KEY  = process.env.ANTHROPIC_API_KEY;
const OPENAI_KEY     = process.env.OPENAI_API_KEY;
const SUPA_URL       = process.env.SUPABASE_URL;
const SUPA_KEY       = process.env.SUPABASE_SERVICE_ROLE_KEY;
const JWT_SECRET     = process.env.JWT_SECRET || 'change-me';
const ADMIN_USER     = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS     = process.env.ADMIN_PASSWORD || 'changeme';
const CORS_ORIGINS   = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim());

const SYSTEM_PROMPT = `You are a helpful assistant for Trent Education Centre (TEC), an education provider in Nottingham, UK. Help students, parents and partners with questions about courses, admissions, and student life. Be friendly and concise. If unsure, direct them to info@trenteducation.co.uk. Do not invent fees, dates or requirements.`;

// ── In-memory rate limiting (resets on cold start — fine for small site) ──
const rateLimitStore = new Map(); // key: IP, value: { min: [count, ts], hour: [count, ts], day: [count, ts] }

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip) || { min: [0, now], hour: [0, now], day: [0, now] };

  if (now - entry.min[1]  > 60_000)        entry.min  = [0, now];
  if (now - entry.hour[1] > 3_600_000)     entry.hour = [0, now];
  if (now - entry.day[1]  > 86_400_000)    entry.day  = [0, now];

  entry.min[0]++;  entry.hour[0]++;  entry.day[0]++;
  rateLimitStore.set(ip, entry);

  if (entry.min[0]  > 20)  return 'Too many messages. Please wait a moment.';
  if (entry.hour[0] > 100) return 'Hourly limit reached. Please try again later.';
  if (entry.day[0]  > 200) return 'Daily limit reached. Please contact TEC directly.';
  return null;
}

// ── CORS helper ───────────────────────────────────────────
function corsHeaders(origin) {
  const allowed = CORS_ORIGINS.includes(origin) ? origin : (CORS_ORIGINS[0] || '*');
  return {
    'Access-Control-Allow-Origin':  allowed,
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
  };
}

function respond(status, body, origin = '*') {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    body: JSON.stringify(body),
  };
}

// ── JWT (HMAC-SHA256, no library) ─────────────────────────
function jwtSign(payload) {
  const header  = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g,'');
  const body    = btoa(JSON.stringify({ ...payload, exp: Math.floor(Date.now()/1000) + 28800 })).replace(/=/g,'');
  const sig     = createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

function jwtVerify(token) {
  try {
    const [header, body, sig] = token.split('.');
    const expected = createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) throw new Error('bad sig');
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (payload.exp < Math.floor(Date.now()/1000)) throw new Error('expired');
    return payload;
  } catch { return null; }
}

function getToken(event) {
  const auth = event.headers?.authorization || event.headers?.Authorization || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

// ── Supabase REST helper ──────────────────────────────────
async function supa(path, opts = {}) {
  const r = await fetch(`${SUPA_URL}/rest/v1${path}`, {
    ...opts,
    headers: {
      apikey: SUPA_KEY,
      Authorization: `Bearer ${SUPA_KEY}`,
      'Content-Type': 'application/json',
      Prefer: opts.prefer || 'return=representation',
      ...opts.headers,
    },
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Supabase ${r.status}: ${t}`);
  }
  const text = await r.text();
  return text ? JSON.parse(text) : null;
}

async function supaRpc(fn, body) {
  const r = await fetch(`${SUPA_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      apikey: SUPA_KEY,
      Authorization: `Bearer ${SUPA_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`Supabase RPC ${r.status}: ${await r.text()}`);
  return r.json();
}

// ── OpenAI embedding ──────────────────────────────────────
async function embed(text) {
  const r = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'text-embedding-3-small', input: text.slice(0, 8000) }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`OpenAI embeddings: ${d.error?.message}`);
  return d.data[0].embedding;
}

async function embedBatch(texts) {
  const r = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'text-embedding-3-small', input: texts.map(t => t.slice(0, 8000)) }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`OpenAI embeddings: ${d.error?.message}`);
  return d.data.map(x => x.embedding);
}

// ── Chunk plain text ──────────────────────────────────────
function chunkText(text, size = 500, overlap = 50) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks = [];
  for (let i = 0; i < words.length; i += size - overlap) {
    const chunk = words.slice(i, i + size).join(' ');
    if (chunk.length > 20) chunks.push(chunk);
  }
  return chunks;
}

// ── Anthropic chat ────────────────────────────────────────
async function claudeChat(messages, contextChunks) {
  const context = contextChunks.length
    ? '\n\nRelevant info from TEC knowledge base:\n' +
      contextChunks.map((c, i) => `[${i+1}] (from "${c.document_name}")\n${c.content}`).join('\n\n')
    : '';

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: SYSTEM_PROMPT + context,
      messages,
    }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`Anthropic: ${d.error?.message}`);
  return d.content.find(b => b.type === 'text')?.text || '';
}

// ── Route handlers ────────────────────────────────────────

async function handleChat(event, origin) {
  const ip = event.requestContext?.http?.sourceIp || event.requestContext?.identity?.sourceIp || 'unknown';
  const limited = checkRateLimit(ip);
  if (limited) return respond(429, { error: limited }, origin);

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return respond(400, { error: 'Invalid JSON' }, origin); }

  const { messages, sessionId } = body;
  if (!Array.isArray(messages) || messages.length === 0) return respond(400, { error: 'messages required' }, origin);
  if (messages.length > 20) return respond(400, { error: 'Too many messages' }, origin);

  const cleaned = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role, content: String(m.content).slice(0, 2000) }))
    .slice(-10);

  const sid = sessionId || randomUUID();
  const lastUser = [...cleaned].reverse().find(m => m.role === 'user')?.content || '';

  // RAG: embed query → similarity search
  let chunks = [];
  try {
    const qEmbed = await embed(lastUser);
    chunks = await supaRpc('match_document_chunks', {
      query_embedding: qEmbed,
      match_threshold: 0.25,
      match_count: 5,
    });
  } catch (e) { console.warn('RAG failed, continuing without context:', e.message); }

  const text = await claudeChat(cleaned, chunks || []);

  // Save conversation (fire and forget)
  supa('/chatbot_conversations', {
    method: 'POST',
    prefer: 'return=minimal',
    body: JSON.stringify({
      id: randomUUID(),
      session_id: sid,
      user_message: lastUser,
      assistant_message: text,
      sources: (chunks || []).map(c => ({ document: c.document_name, score: c.similarity })),
    }),
  }).catch(e => console.error('Save conv failed:', e.message));

  return respond(200, { text, sessionId: sid }, origin);
}

async function handleGetDocuments(origin) {
  const docs = await supa('/chatbot_documents?select=id,name,file_type,file_size,chunk_count,status,created_at&order=created_at.desc');
  return respond(200, docs || [], origin);
}

async function handleUploadDocument(event, origin) {
  // Accepts JSON body: { name: "filename.txt", text: "...plain text content..." }
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return respond(400, { error: 'Invalid JSON' }, origin); }

  const { name, text } = body;
  if (!name || !text || text.trim().length < 20) return respond(400, { error: 'name and text (min 20 chars) required' }, origin);
  if (text.length > 500_000) return respond(400, { error: 'Text too large (max 500k chars)' }, origin);

  const docId = randomUUID();
  const rawChunks = chunkText(text);
  if (rawChunks.length === 0) return respond(400, { error: 'No usable text chunks' }, origin);

  // Embed in batches of 50
  const embeddings = [];
  for (let i = 0; i < rawChunks.length; i += 50) {
    const batch = await embedBatch(rawChunks.slice(i, i + 50));
    embeddings.push(...batch);
  }

  // Insert document record
  await supa('/chatbot_documents', {
    method: 'POST',
    prefer: 'return=minimal',
    body: JSON.stringify({
      id: docId,
      name,
      file_type: 'text/plain',
      file_size: text.length,
      chunk_count: rawChunks.length,
      status: 'ready',
    }),
  });

  // Insert chunks
  const chunkRows = rawChunks.map((content, idx) => ({
    id: randomUUID(),
    document_id: docId,
    document_name: name,
    content,
    embedding: embeddings[idx],
    chunk_index: idx,
  }));
  await supa('/chatbot_chunks', {
    method: 'POST',
    prefer: 'return=minimal',
    body: JSON.stringify(chunkRows),
  });

  return respond(200, { id: docId, name, chunkCount: rawChunks.length }, origin);
}

async function handleDeleteDocument(id, origin) {
  await supa(`/chatbot_documents?id=eq.${id}`, { method: 'DELETE', prefer: 'return=minimal' });
  return respond(200, { ok: true }, origin);
}

async function handleAdminToken(event, origin) {
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return respond(400, { error: 'Invalid JSON' }, origin); }
  if (body.username !== ADMIN_USER || body.password !== ADMIN_PASS) {
    return respond(401, { error: 'Invalid credentials' }, origin);
  }
  return respond(200, { token: jwtSign({ username: body.username, role: 'admin' }) }, origin);
}

async function handleAnalytics(origin) {
  const [total, today, docs] = await Promise.all([
    supa('/chatbot_conversations?select=id&head=true', { method: 'HEAD', prefer: 'count=exact' }),
    supa(`/chatbot_conversations?select=id&created_at=gte.${new Date().toISOString().slice(0,10)}&head=true`, { method: 'HEAD', prefer: 'count=exact' }),
    supa('/chatbot_documents?select=id&status=eq.ready&head=true', { method: 'HEAD', prefer: 'count=exact' }),
  ].map(p => p.catch(() => null)));
  // Supabase returns count in Content-Range header — we'll do a count query instead
  const [c1, c2, c3] = await Promise.all([
    supa('/chatbot_conversations?select=count', { headers: { Prefer: 'count=exact' } }).catch(() => [{ count: 0 }]),
    supa(`/chatbot_conversations?select=count&created_at=gte.${new Date().toISOString().slice(0,10)}`, { headers: { Prefer: 'count=exact' } }).catch(() => [{ count: 0 }]),
    supa('/chatbot_documents?select=count&status=eq.ready', { headers: { Prefer: 'count=exact' } }).catch(() => [{ count: 0 }]),
  ]);
  return respond(200, {
    totalConversations: Array.isArray(c1) ? c1.length : 0,
    todayConversations: Array.isArray(c2) ? c2.length : 0,
    totalDocuments:     Array.isArray(c3) ? c3.length : 0,
  }, origin);
}

async function handleConversations(origin) {
  const rows = await supa('/chatbot_conversations?select=*&order=created_at.desc&limit=100');
  return respond(200, rows || [], origin);
}

// ── Main handler ──────────────────────────────────────────
export const handler = async (event) => {
  const origin  = event.headers?.origin || event.headers?.Origin || '';
  const method  = event.requestContext?.http?.method || event.httpMethod || 'GET';
  const rawPath = event.requestContext?.http?.path || event.path || '/';
  const path    = rawPath.replace(/\/$/, '');

  // OPTIONS preflight
  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(origin), body: '' };
  }

  try {
    // ── Public routes ──────────────────────────────────────
    if (method === 'GET'  && path === '/api/health')           return respond(200, { ok: true }, origin);
    if (method === 'POST' && path === '/api/chat')             return await handleChat(event, origin);
    if (method === 'POST' && path === '/api/admin/token')      return await handleAdminToken(event, origin);

    // ── Admin-only routes (require JWT) ───────────────────
    const token = getToken(event);
    if (!token || !jwtVerify(token)) return respond(401, { error: 'Unauthorised' }, origin);

    if (method === 'GET'    && path === '/api/documents')           return await handleGetDocuments(origin);
    if (method === 'POST'   && path === '/api/documents/upload')    return await handleUploadDocument(event, origin);
    if (method === 'DELETE' && path.startsWith('/api/documents/')) {
      const id = path.split('/').pop();
      return await handleDeleteDocument(id, origin);
    }
    if (method === 'GET' && path === '/api/admin/analytics')    return await handleAnalytics(origin);
    if (method === 'GET' && path === '/api/admin/conversations') return await handleConversations(origin);

    return respond(404, { error: 'Not found' }, origin);
  } catch (err) {
    console.error(err);
    return respond(500, { error: err.message || 'Internal error' }, origin);
  }
};
