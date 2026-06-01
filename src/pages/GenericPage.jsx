import { Link } from 'react-router-dom';
import './InnerPage.css';
import PageHero from '../components/PageHero';

export default function GenericPage({ title, subtitle, bgImage, children }) {
  return (
    <div className="inner-page page-enter">
      <PageHero title={title} subtitle={subtitle} bgImage={bgImage} />
      <div className="container inner-content">
        {children || (
          <div style={{ maxWidth: '600px' }}>
            <p style={{ color: 'var(--tec-text-light)', lineHeight: '1.8', marginBottom: '20px' }}>
              This page is coming soon. Please check back later or{' '}
              <Link to="/contact" style={{ color: 'var(--tec-green)', fontWeight: 600 }}>contact us</Link> for more information.
            </p>
            <Link to="/" className="btn-gold" style={{ display: 'inline-block' }}>
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
