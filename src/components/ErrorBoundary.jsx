import { Component } from 'react';
import { sendErrorReport } from '../utils/errorReporter';

/**
 * Catches React render errors and reports them.
 * Shows a clean fallback UI instead of a blank page.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    sendErrorReport({
      type:    'react-render-error',
      message: error.message,
      stack:   `${error.stack ?? ''}\n\nComponent Stack:\n${info.componentStack ?? ''}`,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          textAlign: 'center',
          fontFamily: 'inherit',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: '#1a2e1a', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            marginBottom: 20, fontSize: 28,
          }}>
            ⚠️
          </div>
          <h2 style={{ color: '#1a2e1a', marginBottom: 12, fontSize: '1.4rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#6a7a6a', maxWidth: 420, lineHeight: 1.7, marginBottom: 28 }}>
            We've been notified and are looking into it. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#1a2e1a', color: '#c9a84c',
              border: 'none', borderRadius: 6,
              padding: '12px 28px', fontWeight: 700,
              fontSize: '0.9rem', cursor: 'pointer',
            }}
          >
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
