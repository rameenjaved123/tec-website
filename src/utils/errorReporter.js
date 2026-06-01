/**
 * Error Reporter — production only
 * Sends JS errors + stack traces to Lambda → SNS → email
 * Never runs on localhost (import.meta.env.PROD is false in dev)
 *
 * Rate limiting (prevents crash-loop spam):
 *   - Max 5 reports per browser session
 *   - Duplicate errors (same message) only sent once per session
 *   - Max 1 report every 10 seconds
 */

const LAMBDA_URL  = 'https://5o6ssmq55g4z6w5s5pnrhpfro40bfmbf.lambda-url.us-east-1.on.aws/';
const MAX_PER_SESSION = 5;      // hard cap per tab session
const RATE_LIMIT_MS   = 10_000; // min ms between any two reports

let reportCount   = 0;
let lastReportAt  = 0;
const seenErrors  = new Set(); // deduplicate by message

export function sendErrorReport(payload) {
  if (!import.meta.env.PROD) return;

  // 1. Hard cap — stop after MAX_PER_SESSION reports this session
  if (reportCount >= MAX_PER_SESSION) return;

  // 2. Rate limit — don't send more than 1 per RATE_LIMIT_MS
  const now = Date.now();
  if (now - lastReportAt < RATE_LIMIT_MS) return;

  // 3. Deduplicate — same error message already sent this session
  const dedupKey = `${payload.type}::${payload.message}`;
  if (seenErrors.has(dedupKey)) return;

  // All checks passed — record and send
  reportCount++;
  lastReportAt = now;
  seenErrors.add(dedupKey);

  try {
    navigator.sendBeacon(
      LAMBDA_URL,
      new Blob(
        [JSON.stringify({
          ...payload,
          url:          window.location.href,
          timestamp:    new Date().toISOString(),
          userAgent:    navigator.userAgent,
          reportNumber: reportCount,       // e.g. "Report 2 of 5"
        })],
        { type: 'application/json' }
      )
    );
  } catch {
    // never break the site because of the reporter
  }
}

export function initErrorReporter() {
  if (!import.meta.env.PROD) return;

  // 1. Uncaught JS errors
  window.addEventListener('error', (event) => {
    sendErrorReport({
      type:    'uncaught-error',
      message: event.message,
      stack:   event.error?.stack ?? `${event.filename}:${event.lineno}:${event.colno}`,
    });
  });

  // 2. Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    sendErrorReport({
      type:    'unhandled-promise-rejection',
      message: reason?.message ?? String(reason),
      stack:   reason?.stack ?? 'No stack trace',
    });
  });
}
