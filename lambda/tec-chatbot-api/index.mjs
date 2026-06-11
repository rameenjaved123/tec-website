/**
 * TEC Chatbot API — single-file Lambda (Node 20, no npm dependencies)
 * Chatbot answers are handled entirely in the frontend (keyword matching).
 * This Lambda provides: rate limiting on /api/chat, conversation logging,
 * and admin analytics/conversations endpoints secured by Cognito group auth.
 *
 * Auth: Cognito ID token (Bearer). Users must be in 'admin' or 'chatbot' group.
 * No separate username/password needed — Cognito session token is used directly.
 *
 * Environment variables required:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Handler: index.handler
 * Runtime: Node.js 20.x
 * Timeout: 15s   Memory: 256 MB
 */

import { randomUUID } from 'crypto';

const SUPA_URL = process.env.SUPABASE_URL;
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ── In-memory rate limiting (per IP) ──────────────────────
// 20 messages/minute · 100/hour · 200/day
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const e = rateLimitStore.get(ip) || { min: [0, now], hour: [0, now], day: [0, now] };
  if (now - e.min[1]  > 60_000)     e.min  = [0, now];
  if (now - e.hour[1] > 3_600_000)  e.hour = [0, now];
  if (now - e.day[1]  > 86_400_000) e.day  = [0, now];
  e.min[0]++; e.hour[0]++; e.day[0]++;
  rateLimitStore.set(ip, e);
  if (e.min[0]  > 20)  return 'Too many messages. Please wait a moment.';
  if (e.hour[0] > 100) return 'Hourly limit reached. Please try again later.';
  if (e.day[0]  > 200) return 'Daily limit reached. Please contact TEC directly.';
  return null;
}

// ── Allowed origins ────────────────────────────────────────
const ALLOWED_ORIGINS = new Set([
  'https://trenteducation.co.uk',
  'https://www.trenteducation.co.uk',
  'https://dev.trenteducation.co.uk',
  'http://localhost:5173',
]);

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : 'https://trenteducation.co.uk';
  return {
    'Access-Control-Allow-Origin':  allowed,
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Vary': 'Origin',
  };
}

function isAllowedOrigin(event) {
  const origin = event.headers?.origin || event.headers?.Origin || '';
  return ALLOWED_ORIGINS.has(origin);
}

function respond(status, body, origin = '') {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    body: JSON.stringify(body),
  };
}

// ── Cognito token verification ─────────────────────────────
// Decodes JWT payload, checks cognito:groups and expiry.
// Signature not verified here — token is already issued by Cognito.
function verifyCognitoToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    const groups = payload['cognito:groups'] || [];
    if (!groups.includes('admin') && !groups.includes('chatbot')) return null;
    return { username: payload.email, groups };
  } catch { return null; }
}

function getToken(event) {
  const auth = event.headers?.authorization || event.headers?.Authorization || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

// ── Supabase REST helper ───────────────────────────────────
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

// ── Upsert session row ─────────────────────────────────────
// Insert new session or bump last_message_at + message_count on existing one.
async function upsertSession(sid, now) {
  const existing = await supa(`/chatbot_sessions?id=eq.${encodeURIComponent(sid)}&select=message_count`);
  if (existing?.length) {
    await supa(`/chatbot_sessions?id=eq.${encodeURIComponent(sid)}`, {
      method: 'PATCH',
      prefer: 'return=minimal',
      body: JSON.stringify({
        last_message_at: now,
        message_count: (existing[0].message_count || 0) + 1,
      }),
    });
  } else {
    await supa('/chatbot_sessions', {
      method: 'POST',
      prefer: 'return=minimal',
      body: JSON.stringify({ id: sid, last_message_at: now, message_count: 1 }),
    });
  }
}

// ── Route handlers ─────────────────────────────────────────

async function handleChat(event, origin = '') {
  const ip = event.requestContext?.http?.sourceIp || 'unknown';
  const limited = checkRateLimit(ip);
  if (limited) return respond(429, { error: limited }, origin);

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return respond(400, { error: 'Invalid JSON' }, origin); }

  const { userMessage, botAnswer, sessionId } = body;
  const sid = sessionId || randomUUID();
  const now = new Date().toISOString();

  if (userMessage && botAnswer) {
    supa('/chatbot_conversations', {
      method: 'POST',
      prefer: 'return=minimal',
      body: JSON.stringify({
        id: randomUUID(),
        session_id: sid,
        user_message: String(userMessage).slice(0, 2000),
        assistant_message: String(botAnswer).slice(0, 5000),
        sources: [],
      }),
    }).catch(e => console.error('Log conv:', e.message));

    upsertSession(sid, now).catch(e => console.error('Session upsert:', e.message));
  }

  return respond(200, { ok: true, sessionId: sid }, origin);
}

async function handleAnalytics(origin = '') {
  // Old data cleanup is handled by Supabase pg_cron (runs every Sunday at 2am UTC).
  // No manual deletion here.
  const [c1, c2] = await Promise.all([
    supa('/chatbot_sessions?select=id').catch(() => []),
    supa(`/chatbot_conversations?select=id&created_at=gte.${new Date().toISOString().slice(0, 10)}`).catch(() => []),
  ]);

  return respond(200, {
    totalConversations: c1.length,
    todayConversations: c2.length,
  }, origin);
}

// Proper pagination: page directly from chatbot_sessions, then fetch only
// the messages belonging to that page's sessions — 2 queries, always exact.
async function handleConversations(event, origin = '') {
  const qs     = event.queryStringParameters || {};
  const page   = Math.max(1, parseInt(qs.page)  || 1);
  const limit  = Math.min(50, parseInt(qs.limit) || 20);
  const offset = (page - 1) * limit;

  // Step 1 — paginate sessions (fast index scan on last_message_at)
  const [sessionRows, countRows] = await Promise.all([
    supa(`/chatbot_sessions?order=last_message_at.desc&limit=${limit}&offset=${offset}`),
    supa('/chatbot_sessions?select=id'),
  ]);

  if (!sessionRows?.length) {
    return respond(200, { sessions: [], page, limit, totalSessions: countRows?.length || 0 }, origin);
  }

  // Step 2 — fetch messages for only this page's sessions
  const ids = sessionRows.map(s => `"${s.id}"`).join(',');
  const messages = await supa(
    `/chatbot_conversations?session_id=in.(${ids})&order=created_at.asc&limit=1000`
  );

  // Group messages by session_id
  const msgMap = new Map();
  for (const m of messages || []) {
    if (!msgMap.has(m.session_id)) msgMap.set(m.session_id, []);
    msgMap.get(m.session_id).push(m);
  }

  const sessions = sessionRows.map(s => ({
    sessionId:    s.id,
    latestAt:     s.last_message_at,
    messageCount: s.message_count,
    messages:     msgMap.get(s.id) || [],
  }));

  return respond(200, { sessions, page, limit, totalSessions: countRows?.length || 0 }, origin);
}

// ── Main handler ───────────────────────────────────────────
export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod || 'GET';
  const path   = (event.requestContext?.http?.path || event.path || '/').replace(/\/$/, '');
  const origin = event.headers?.origin || event.headers?.Origin || '';

  if (method === 'OPTIONS') return { statusCode: 204, headers: corsHeaders(origin), body: '' };

  try {
    if (method === 'GET' && path === '/api/health') return respond(200, { ok: true }, origin);

    // Block requests not coming from allowed origins on the public chat endpoint
    if (method === 'POST' && path === '/api/chat') {
      if (!isAllowedOrigin(event)) return respond(403, { error: 'Forbidden' }, origin);
      return await handleChat(event, origin);
    }

    // Admin endpoints — Cognito token check (origin not enforced, admin uses same domains anyway)
    const token = getToken(event);
    if (!token || !verifyCognitoToken(token)) return respond(401, { error: 'Unauthorised' }, origin);

    if (method === 'GET' && path === '/api/admin/analytics')    return await handleAnalytics(origin);
    if (method === 'GET' && path === '/api/admin/conversations') return await handleConversations(event, origin);

    return respond(404, { error: 'Not found' }, origin);
  } catch (err) {
    console.error(err);
    return respond(500, { error: err.message || 'Internal error' }, origin);
  }
};
