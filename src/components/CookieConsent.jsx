import { useState, useEffect } from 'react';
import { initRUM } from '../utils/rum';
import './CookieConsent.css';

const CONSENT_KEY = 'tec_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') {
      // Returning visitor who already accepted — fire RUM silently
      initRUM();
    } else if (!stored) {
      // First visit — show the banner
      setVisible(true);
    }
    // stored === 'declined' → do nothing (RUM stays off)
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    initRUM();
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <p className="cookie-banner__text">
        <strong>We use cookies.</strong> We use analytics cookies (AWS CloudWatch RUM) to
        understand how visitors use our site and improve your experience. No personal data
        is sold or shared with third parties.{' '}
        <a href="/privacy-policy">Privacy Policy</a>
      </p>
      <div className="cookie-banner__actions">
        <button className="cookie-btn cookie-btn--decline" onClick={handleDecline}>
          Decline
        </button>
        <button className="cookie-btn cookie-btn--accept" onClick={handleAccept}>
          Accept cookies
        </button>
      </div>
    </div>
  );
}
