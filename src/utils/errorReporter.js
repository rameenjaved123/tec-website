/**
 * Error Reporter — production only
 * Sends JS errors + stack traces to FastAPI backend → stored in website_errors table.
 * Never runs on localhost (import.meta.env.PROD is false in dev).
 *
 * Rate limiting (prevents crash-loop spam):
 *   - Max 5 reports per browser session
 *   - Duplicate errors (same message) only sent once per session
 *   - Max 1 report every 10 seconds
 */

const BASE_URL    = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
const WEBSITE_KEY = import.meta.env.VITE_WEBSITE_API_KEY || '';
const ENDPOINT    = `${BASE_URL}/website/errors`;

const MAX_PER_SESSION = 5;
const RATE_LIMIT_MS   = 10_000;

let reportCount  = 0;
let lastReportAt = 0;
const seenErrors = new Set();

export function sendErrorReport(payload) {
  if (!import.meta.env.PROD) return;
  if (reportCount >= MAX_PER_SESSION) return;

  const now = Date.now();
  if (now - lastReportAt < RATE_LIMIT_MS) return;

  const dedupKey = `${payload.type}::${payload.message}`;
  if (seenErrors.has(dedupKey)) return;

  reportCount++;
  lastReportAt = now;
  seenErrors.add(dedupKey);

  try {
    // sendBeacon doesn't support custom headers — use a small Blob with JSON
    // and add the API key as a query param for this fire-and-forget call.
    const body = JSON.stringify({
      ...payload,
      url:          window.location.href,
      timestamp:    new Date().toISOString(),
      userAgent:    navigator.userAgent,
      reportNumber: reportCount,
    });

    // Prefer fetch (keeps headers); fall back to sendBeacon if page is unloading.
    const sent = navigator.sendBeacon(
      `${ENDPOINT}?_key=${encodeURIComponent(WEBSITE_KEY)}`,
      new Blob([body], { type: 'application/json' })
    );

    if (!sent) {
      // sendBeacon queue full — try fetch as fallback
      fetch(ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'X-Website-API-Key': WEBSITE_KEY },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // never break the site because of the reporter
  }
}

export function initErrorReporter() {
  if (!import.meta.env.PROD) return;

  window.addEventListener('error', (event) => {
    sendErrorReport({
      type:    'uncaught-error',
      message: event.message,
      stack:   event.error?.stack ?? `${event.filename}:${event.lineno}:${event.colno}`,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    sendErrorReport({
      type:    'unhandled-promise-rejection',
      message: reason?.message ?? String(reason),
      stack:   reason?.stack ?? 'No stack trace',
    });
  });
}
