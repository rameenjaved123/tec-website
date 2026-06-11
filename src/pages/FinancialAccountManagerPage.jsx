import './InnerPage.css';
import PageHero from '../components/PageHero';

export default function FinancialAccountManagerPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Financial Account Manager"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/site-photo-3.jpg"
        bgPosition="center center"
      />
      <div className="container inner-content">
        <p style={{ color: 'var(--tec-text-light)', lineHeight: 1.9 }}>
          Content coming soon.
        </p>
      </div>
    </div>
  );
}
