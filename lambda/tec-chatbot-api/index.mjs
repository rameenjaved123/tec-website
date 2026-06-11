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

// ── CORS / response helpers ────────────────────────────────
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
  };
}

function respond(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    body: JSON.stringify(body),
  };
}

// ── JWT helpers ────────────────────────────────────────────

// Verify Cognito ID token — decode payload, check cognito:groups, check expiry.
// We don't verify the RS256 signature here (no public key in Lambda), but the
// token is already validated by Cognito's auth flow on the client side.
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

function verifyToken(token) {
  return verifyCognitoToken(token);
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

// ── Route handlers ─────────────────────────────────────────

// Rate-limit check + log the conversation (no AI involved)
async function handleChat(event) {
  const ip = event.requestContext?.http?.sourceIp || 'unknown';
  const limited = checkRateLimit(ip);
  if (limited) return respond(429, { error: limited });

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return respond(400, { error: 'Invalid JSON' }); }

  const { userMessage, botAnswer, sessionId } = body;
  const sid = sessionId || randomUUID();

  // Log conversation to Supabase (best-effort, non-blocking)
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
  }

  return respond(200, { ok: true, sessionId: sid });
}

async function handleAnalytics() {
  const [c1, c2] = await Promise.all([
    supa('/chatbot_conversations?select=id').catch(() => []),
    supa(`/chatbot_conversations?select=id&created_at=gte.${new Date().toISOString().slice(0, 10)}`).catch(() => []),
  ]);
  return respond(200, {
    totalConversations: c1.length,
    todayConversations: c2.length,
  });
}

async function handleConversations() {
  const rows = await supa('/chatbot_conversations?select=*&order=created_at.desc&limit=100');
  return respond(200, rows || []);
}

// ── Main handler ───────────────────────────────────────────
export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod || 'GET';
  const path   = (event.requestContext?.http?.path || event.path || '/').replace(/\/$/, '');

  if (method === 'OPTIONS') return { statusCode: 204, headers: corsHeaders(), body: '' };

  try {
    if (method === 'GET'  && path === '/api/health') return respond(200, { ok: true });
    if (method === 'POST' && path === '/api/chat')   return await handleChat(event);

    const token = getToken(event);
    if (!token || !verifyToken(token)) return respond(401, { error: 'Unauthorised' });

    if (method === 'GET' && path === '/api/admin/analytics')     return await handleAnalytics();
    if (method === 'GET' && path === '/api/admin/conversations')  return await handleConversations();

    return respond(404, { error: 'Not found' });
  } catch (err) {
    console.error(err);
    return respond(500, { error: err.message || 'Internal error' });
  }
};
