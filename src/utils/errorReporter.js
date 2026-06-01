/**
 * Error Reporter — production only
 * Sends JS errors + stack traces to Lambda → SNS → email
 * Never runs on localhost (import.meta.env.PROD is false in dev)
 */

const LAMBDA_URL = 'https://5o6ssmq55g4z6w5s5pnrhpfro40bfmbf.lambda-url.us-east-1.on.aws/';

export function sendErrorReport(payload) {
  if (!import.meta.env.PROD) return; // local dev — do nothing

  try {
    navigator.sendBeacon(
      LAMBDA_URL,
      new Blob(
        [JSON.stringify({
          ...payload,
          url:       window.location.href,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
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
