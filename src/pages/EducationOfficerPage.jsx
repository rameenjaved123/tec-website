import './InnerPage.css';
import PageHero from '../components/PageHero';

export default function EducationOfficerPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Education Officer"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/site-photo-4.jpg"
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
