/**
 * Central API client for TEC website → FastAPI backend.
 *
 * All calls (form submit, chat, error report, S3 upload, email) are authenticated
 * with a dedicated Keycloak service account (website_public role). Credentials
 * are stored in VITE_KC_* env vars and bundled at build time.
 *
 * Token lifecycle: ROPC login on first call → cached in memory → auto-refreshed
 * 60s before expiry using the refresh token.
 */

const BASE_URL    = import.meta.env.VITE_API_URL    || 'http://localhost:8000/api/v1';
const KC_URL      = import.meta.env.VITE_KC_URL      || 'http://localhost:8080';
const KC_REALM    = import.meta.env.VITE_KC_REALM    || 'tec';
const KC_CLIENT   = import.meta.env.VITE_KC_CLIENT_ID || 'tec-website';
const KC_USERNAME = import.meta.env.VITE_KC_SVC_USERNAME;
const KC_PASSWORD = import.meta.env.VITE_KC_SVC_PASSWORD;

const TOKEN_URL = `${KC_URL}/realms/${KC_REALM}/protocol/openid-connect/token`;

// ── reCAPTCHA v3 ─────────────────────────────────────────────────────────────

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

/** Returns a reCAPTCHA v3 token for the given action, or null if not configured. */
export async function getRecaptchaToken(action = 'submit') {
  if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return null;
  return new Promise((resolve) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
        .then(resolve)
        .catch(() => resolve(null));
    });
  });
}

// ── Service-account token manager ────────────────────────────────────────────

let _token        = null;  // current access token
let _refreshToken = null;  // refresh token
let _expiresAt    = 0;     // unix ms when access token expires
let _inflight     = null;  // deduplicate concurrent login calls

async function _login() {
  const body = new URLSearchParams({
    grant_type: 'password',
    client_id:  KC_CLIENT,
    username:   KC_USERNAME,
    password:   KC_PASSWORD,
  });
  const res = await fetch(TOKEN_URL, { method: 'POST', body });
  if (!res.ok) throw new Error(`KC login failed: ${res.status}`);
  const data = await res.json();
  _token        = data.access_token;
  _refreshToken = data.refresh_token;
  _expiresAt    = Date.now() + (data.expires_in - 60) * 1000; // 60s buffer
}

async function _refresh() {
  const body = new URLSearchParams({
    grant_type:    'refresh_token',
    client_id:     KC_CLIENT,
    refresh_token: _refreshToken,
  });
  const res = await fetch(TOKEN_URL, { method: 'POST', body });
  if (!res.ok) {
    _token = _refreshToken = null; _expiresAt = 0;
    return _login();
  }
  const data = await res.json();
  _token        = data.access_token;
  _refreshToken = data.refresh_token;
  _expiresAt    = Date.now() + (data.expires_in - 60) * 1000;
}

/** Returns a valid Bearer token, logging in or refreshing as needed. */
async function getToken() {
  // If no KC credentials configured, skip auth (dev fallback)
  if (!KC_USERNAME || !KC_PASSWORD) return null;

  if (_inflight) return _inflight;

  if (_token && Date.now() < _expiresAt) return _token;

  _inflight = (_refreshToken ? _refresh() : _login())
    .then(() => { _inflight = null; return _token; })
    .catch(err => { _inflight = null; throw err; });

  return _inflight;
}

// ── Internal fetch wrapper ────────────────────────────────────────────────────

async function publicFetch(path, options = {}) {
  const token = await getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw Object.assign(new Error(err.detail || 'Request failed'), { status: res.status, body: err });
  }
  return res.status === 204 ? null : res.json();
}

// ── Form submissions ──────────────────────────────────────────────────────────

/**
 * Submit a website form to the FastAPI backend.
 * `formTypeSlug` must match one of the VALID_FORM_TYPES slugs:
 *   enquiry | application | enrolment | international-application |
 *   job-application | new-starter | partnerships | english-ielts | complaint
 */
export async function submitForm(formTypeSlug, data, recaptchaToken = null) {
  return publicFetch(`/website/forms/${formTypeSlug}`, {
    method: 'POST',
    body: JSON.stringify({ data, recaptcha_token: recaptchaToken }),
  });
}

// ── File uploads ──────────────────────────────────────────────────────────────

/** Get a presigned S3 upload URL then PUT the file directly to S3. */
export async function uploadToS3(file, folder = 'uploads') {
  const { upload_url, file_key } = await publicFetch('/website/upload-url', {
    method: 'POST',
    body: JSON.stringify({ file_name: file.name, file_type: file.type, folder }),
  });

  const uploadRes = await fetch(upload_url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!uploadRes.ok) throw new Error('File upload to S3 failed');

  const bucket = import.meta.env.VITE_S3_WEBSITE_BUCKET || 'tec-form-uploads';
  const region = import.meta.env.VITE_AWS_REGION || 'eu-west-2';
  return { fileKey: file_key, fileUrl: `https://${bucket}.s3.${region}.amazonaws.com/${file_key}` };
}

/** Get a presigned S3 view URL for a file key. */
export async function getS3ViewUrl(fileKey) {
  const { view_url } = await publicFetch('/website/view-url', {
    method: 'POST',
    body: JSON.stringify({ file_key: fileKey }),
  });
  return view_url;
}

// ── Admin submission management (stubs — admin panel moved to VLE frontend) ───

export async function listSubmissions(slug, { offset = 0, limit = 25 } = {}) {
  return publicFetch(`/website/forms/${slug}?offset=${offset}&limit=${limit}`);
}

export async function updateSubmission(slug, id, patch) {
  return publicFetch(`/website/forms/${slug}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
}

export async function deleteSubmission(slug, id) {
  return publicFetch(`/website/forms/${slug}/${id}`, { method: 'DELETE' });
}

// ── Email ─────────────────────────────────────────────────────────────────────

export async function sendEmail({ to, subject, html, fromName, replyTo }) {
  return publicFetch('/website/send-email', {
    method: 'POST',
    body: JSON.stringify({
      to,
      subject,
      html,
      from_name: fromName || 'Trent Education Centre',
      reply_to:  replyTo  || null,
    }),
  });
}

// ── Chat ──────────────────────────────────────────────────────────────────────

export async function logChat(userMessage, botAnswer, sessionId, recaptchaToken = null) {
  return publicFetch('/website/chat', {
    method: 'POST',
    body: JSON.stringify({
      user_message:    userMessage,
      bot_answer:      botAnswer,
      session_id:      sessionId,
      recaptcha_token: recaptchaToken,
    }),
  });
}

// ── Error reporter ────────────────────────────────────────────────────────────

export async function reportError(payload) {
  return publicFetch('/website/errors', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
