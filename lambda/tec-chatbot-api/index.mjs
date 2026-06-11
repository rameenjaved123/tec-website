/**
 * TEC Chatbot API — single-file Lambda (Node 20, no npm dependencies)
 * AI: Google Gemini (free) — chat + embeddings, one API key
 *
 * Environment variables required:
 *   GEMINI_API_KEY        — from aistudio.google.com (free)
 *   SUPABASE_URL          — your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   JWT_SECRET            — any long random string
 *   ADMIN_USERNAME
 *   ADMIN_PASSWORD
 *   CORS_ORIGINS          — e.g. https://trenteducation.co.uk,https://www.trenteducation.co.uk
 *
 * Handler: index.handler
 * Runtime: Node.js 20.x
 * Timeout: 30s   Memory: 512 MB
 */

import { createHmac, randomUUID, timingSafeEqual } from 'crypto';

const GEMINI_KEY  = process.env.GEMINI_API_KEY;
const SUPA_URL    = process.env.SUPABASE_URL;
const SUPA_KEY    = process.env.SUPABASE_SERVICE_ROLE_KEY;
const JWT_SECRET  = process.env.JWT_SECRET || 'change-me';
const ADMIN_USER  = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS  = process.env.ADMIN_PASSWORD || 'changeme';
const CORS_ORIGINS = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim());

const GEMINI_CHAT_URL  = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=`;
const GEMINI_EMBED_URL = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=`;
const GEMINI_BATCH_EMBED_URL = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:batchEmbedContents?key=`;

const SYSTEM_PROMPT = `You are a helpful assistant for Trent Education Centre (TEC), an education provider in Nottingham, UK. Help students, parents and partners with questions about courses, admissions, and student life. Be friendly and concise. If unsure, direct them to info@trenteducation.co.uk. Do not invent fees, dates or requirements.`;

// ── In-memory rate limiting ────────────────────────────────
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const e = rateLimitStore.get(ip) || { min: [0, now], hour: [0, now], day: [0, now] };
  if (now - e.min[1]  > 60_000)      e.min  = [0, now];
  if (now - e.hour[1] > 3_600_000)   e.hour = [0, now];
  if (now - e.day[1]  > 86_400_000)  e.day  = [0, now];
  e.min[0]++; e.hour[0]++; e.day[0]++;
  rateLimitStore.set(ip, e);
  if (e.min[0]  > 20)  return 'Too many messages. Please wait a moment.';
  if (e.hour[0] > 100) return 'Hourly limit reached. Please try again later.';
  if (e.day[0]  > 200) return 'Daily limit reached. Please contact TEC directly.';
  return null;
}

// ── CORS / response helpers ───────────────────────────────
function corsHeaders(origin) {
  const allowed = CORS_ORIGINS.includes(origin) ? origin : (CORS_ORIGINS[0] || '*');
  return {
    'Access-Control-Allow-Origin':  allowed,
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
  };
}

function respond(status, body, origin = '') {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    body: JSON.stringify(body),
  };
}

// ── JWT (HMAC-SHA256, no library) ─────────────────────────
function jwtSign(payload) {
  const h = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '');
  const b = btoa(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 28800 })).replace(/=/g, '');
  const s = createHmac('sha256', JWT_SECRET).update(`${h}.${b}`).digest('base64url');
  return `${h}.${b}.${s}`;
}

function jwtVerify(token) {
  try {
    const [h, b, s] = token.split('.');
    const expected = createHmac('sha256', JWT_SECRET).update(`${h}.${b}`).digest('base64url');
    if (!timingSafeEqual(Buffer.from(s), Buffer.from(expected))) throw new Error();
    const payload = JSON.parse(Buffer.from(b, 'base64url').toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error();
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
  const text = await r.text();
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${text}`);
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

// ── Gemini embeddings (768 dimensions) ───────────────────
async function embed(text) {
  const r = await fetch(`${GEMINI_EMBED_URL}${GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: { parts: [{ text: text.slice(0, 8000) }] } }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`Gemini embed: ${d.error?.message}`);
  return d.embedding.values;
}

async function embedBatch(texts) {
  const r = await fetch(`${GEMINI_BATCH_EMBED_URL}${GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: texts.map(t => ({
        model: 'models/text-embedding-004',
        content: { parts: [{ text: t.slice(0, 8000) }] },
      })),
    }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`Gemini batch embed: ${d.error?.message}`);
  return d.embeddings.map(e => e.values);
}

// ── Gemini chat ───────────────────────────────────────────
async function geminiChat(messages, contextChunks) {
  const context = contextChunks.length
    ? '\n\nRelevant info from TEC knowledge base:\n' +
      contextChunks.map((c, i) => `[${i + 1}] (from "${c.document_name}")\n${c.content}`).join('\n\n')
    : '';

  // Convert messages to Gemini format
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const r = await fetch(`${GEMINI_CHAT_URL}${GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT + context }] },
      contents,
      generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
    }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`Gemini chat: ${d.error?.message}`);
  return d.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
}

// ── Text chunking ─────────────────────────────────────────
function chunkText(text, size = 500, overlap = 50) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks = [];
  for (let i = 0; i < words.length; i += size - overlap) {
    const chunk = words.slice(i, i + size).join(' ');
    if (chunk.length > 20) chunks.push(chunk);
  }
  return chunks;
}

// ── Route handlers ────────────────────────────────────────

async function handleChat(event, origin) {
  const ip = event.requestContext?.http?.sourceIp || 'unknown';
  const limited = checkRateLimit(ip);
  if (limited) return respond(429, { error: limited }, origin);

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return respond(400, { error: 'Invalid JSON' }, origin); }

  const { messages, sessionId } = body;
  if (!Array.isArray(messages) || messages.length === 0) return respond(400, { error: 'messages required' }, origin);

  const cleaned = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role, content: String(m.content).slice(0, 2000) }))
    .slice(-10);

  const sid = sessionId || randomUUID();
  const lastUser = [...cleaned].reverse().find(m => m.role === 'user')?.content || '';

  // RAG — embed query → similarity search
  let chunks = [];
  try {
    const qEmbed = await embed(lastUser);
    chunks = await supaRpc('match_document_chunks', {
      query_embedding: qEmbed,
      match_threshold: 0.25,
      match_count: 5,
    });
  } catch (e) { console.warn('RAG skipped:', e.message); }

  const text = await geminiChat(cleaned, chunks || []);

  // Save conversation async
  supa('/chatbot_conversations', {
    method: 'POST',
    prefer: 'return=minimal',
    body: JSON.stringify({
      id: randomUUID(), session_id: sid,
      user_message: lastUser, assistant_message: text,
      sources: (chunks || []).map(c => ({ document: c.document_name, score: c.similarity })),
    }),
  }).catch(e => console.error('Save conv:', e.message));

  return respond(200, { text, sessionId: sid }, origin);
}

async function handleGetDocuments(origin) {
  const docs = await supa('/chatbot_documents?select=id,name,file_type,file_size,chunk_count,status,created_at&order=created_at.desc');
  return respond(200, docs || [], origin);
}

async function handleUploadDocument(event, origin) {
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return respond(400, { error: 'Invalid JSON' }, origin); }

  const { name, text } = body;
  if (!name || !text || text.trim().length < 20) return respond(400, { error: 'name and text required' }, origin);
  if (text.length > 500_000) return respond(400, { error: 'Text too large (max 500k chars)' }, origin);

  const docId = randomUUID();
  const rawChunks = chunkText(text);
  if (!rawChunks.length) return respond(400, { error: 'No usable text chunks' }, origin);

  const embeddings = [];
  for (let i = 0; i < rawChunks.length; i += 50) {
    const batch = await embedBatch(rawChunks.slice(i, i + 50));
    embeddings.push(...batch);
  }

  await supa('/chatbot_documents', {
    method: 'POST', prefer: 'return=minimal',
    body: JSON.stringify({
      id: docId, name, file_type: 'text/plain',
      file_size: text.length, chunk_count: rawChunks.length, status: 'ready',
    }),
  });

  await supa('/chatbot_chunks', {
    method: 'POST', prefer: 'return=minimal',
    body: JSON.stringify(rawChunks.map((content, idx) => ({
      id: randomUUID(), document_id: docId, document_name: name,
      content, embedding: embeddings[idx], chunk_index: idx,
    }))),
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
  if (body.username !== ADMIN_USER || body.password !== ADMIN_PASS) return respond(401, { error: 'Invalid credentials' }, origin);
  return respond(200, { token: jwtSign({ username: body.username, role: 'admin' }) }, origin);
}

async function handleAnalytics(origin) {
  const [c1, c2, c3] = await Promise.all([
    supa('/chatbot_conversations?select=id').catch(() => []),
    supa(`/chatbot_conversations?select=id&created_at=gte.${new Date().toISOString().slice(0, 10)}`).catch(() => []),
    supa('/chatbot_documents?select=id&status=eq.ready').catch(() => []),
  ]);
  return respond(200, {
    totalConversations: c1.length,
    todayConversations: c2.length,
    totalDocuments: c3.length,
  }, origin);
}

async function handleConversations(origin) {
  const rows = await supa('/chatbot_conversations?select=*&order=created_at.desc&limit=100');
  return respond(200, rows || [], origin);
}

// ── Main handler ──────────────────────────────────────────
export const handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || '';
  const method = event.requestContext?.http?.method || event.httpMethod || 'GET';
  const path   = (event.requestContext?.http?.path || event.path || '/').replace(/\/$/, '');

  if (method === 'OPTIONS') return { statusCode: 204, headers: corsHeaders(origin), body: '' };

  try {
    if (method === 'GET'  && path === '/api/health')        return respond(200, { ok: true }, origin);
    if (method === 'POST' && path === '/api/chat')          return await handleChat(event, origin);
    if (method === 'POST' && path === '/api/admin/token')   return await handleAdminToken(event, origin);

    const token = getToken(event);
    if (!token || !jwtVerify(token)) return respond(401, { error: 'Unauthorised' }, origin);

    if (method === 'GET'    && path === '/api/documents')              return await handleGetDocuments(origin);
    if (method === 'POST'   && path === '/api/documents/upload')       return await handleUploadDocument(event, origin);
    if (method === 'DELETE' && path.startsWith('/api/documents/'))     return await handleDeleteDocument(path.split('/').pop(), origin);
    if (method === 'GET'    && path === '/api/admin/analytics')        return await handleAnalytics(origin);
    if (method === 'GET'    && path === '/api/admin/conversations')     return await handleConversations(origin);

    return respond(404, { error: 'Not found' }, origin);
  } catch (err) {
    console.error(err);
    return respond(500, { error: err.message || 'Internal error' }, origin);
  }
};
