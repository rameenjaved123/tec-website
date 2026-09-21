import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Award, FileText } from 'lucide-react';
import '../../InnerPage.css';
import '../../CoursePage.css';
import '../higher-education/ATHELevel4Page.css';
import PageHero from '../../../components/PageHero';

const facts = [
  { icon: <Clock size={22} />, label: '600 Hours / Onsite' },
  { icon: <Calendar size={22} />, label: 'Intake: Every Month' },
  { icon: <Award size={22} />, label: 'Awarding Body: OTHM' },
  { icon: <FileText size={22} />, label: 'Level 3 Diploma · 60 Credits' },
];

const tabs = ['Overview', 'Course Units', 'Course Fees'];

export default function OTHMBeautyTherapyL3Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="inner-page page-enter al4-page">

      <PageHero
        title="OTHM Level 3 Diploma in Beauty Therapy"
        bgImage="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
      />

      <div style={{ height: '24px', background: '#fff' }} />

      {/* Tab bar */}
      <div className="al4-tab-bar">
        {tabs.map(t => (
          <button key={t} className={`al4-tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="container al4-tab-content-wrap">

        {activeTab === 'Overview' && (
          <div className="al4-overview">
            <p><strong>The OTHM Level 3 Diploma in Beauty Therapy develops your skills as a beauty therapist, enabling you to provide beauty therapy treatments to professional standards.</strong></p>
            <p>This qualification is designed to extend your knowledge beyond the Level 2 Diploma in Beauty Therapy, so that you can acquire the knowledge, skills and competencies required to administer the most up-to-date treatments in the beauty industry safely and appropriately.</p>
          </div>
        )}

        {activeTab === 'Course Units' && (
          <div className="al4-units-list">
            <p style={{ fontWeight: 700, marginBottom: 10 }}>Mandatory Units — complete all 5 (44 credits)</p>
            <ul className="al4-bullets">
              <li>Health and Safety Practice in the Salon (8 Credits)</li>
              <li>Client Care and Communication (6 Credits)</li>
              <li>Facial Electrical Treatments (10 Credits)</li>
              <li>Body Electrical Treatments (10 Credits)</li>
              <li>Body Massage (10 Credits)</li>
            </ul>
            <p style={{ fontWeight: 700, margin: '22px 0 10px' }}>Optional Units — choose any 2 (16 credits)</p>
            <ul className="al4-bullets">
              <li>Hot Stone Therapy (8 Credits)</li>
              <li>Dermaplaning Treatments (8 Credits)</li>
              <li>Indian Head Massage (8 Credits)</li>
              <li>Aromatherapy Massage (8 Credits)</li>
              <li>Self-Tanning Services (6 Credits)</li>
            </ul>
          </div>
        )}

        {activeTab === 'Course Fees' && (
          <div className="al4-fees">
            <p>At Trent Education Centre we are committed to making education accessible and affordable. We offer a range of funding options, including government loans, scholarships and bursaries, and flexible payment plans may be available. Please contact our admissions team for the current fee and personalised advice.</p>
            <p style={{ marginTop: 16 }}>
              Before enrolling, please read the{' '}
              <a href="/assets/documents/terms/terms-conditions-he.pdf" target="_blank" rel="noreferrer">Terms and Conditions</a>
              {' '}and{' '}
              <a href="/assets/documents/terms/tuition-fees-he.pdf" target="_blank" rel="noreferrer">Tuition Fees, Refunds and Compensation Policy</a>.
            </p>
          </div>
        )}

      </div>

      {/* Facts strip */}
      <div className="al4-facts-units-wrap">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '48px' }}>
            {facts.map((f, i) => (
              <div key={i} className="al4-fact-item">
                <span className="al4-fact-icon">{f.icon}</span>
                <span className="al4-fact-label">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Entry Requirement */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Entry Requirement</h2>
        <p><strong>Age:</strong> 18+</p>
        <p style={{ marginTop: 12 }}>It is recommended that learners hold a Level 2 Diploma in Beauty Therapy or an equivalent qualification.</p>
        <p style={{ marginTop: 16 }}><strong>English Language Requirements:</strong></p>
        <p style={{ marginTop: 8 }}>Learners who are not from a majority English-speaking country must provide evidence of English language competency at B1 level according to the Common European Framework of Reference for Languages (CEFR).</p>
        <p style={{ marginTop: 16 }}><strong>All entry decisions are made on an individual basis.</strong></p>
      </div>

      {/* Why TEC */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Why TEC?</h2>
        <p style={{ marginBottom: 16 }}><strong>Qualified Teachers:</strong> Our teachers hold recognised teaching qualifications and are experienced in teaching the subject to adults. They will identify your individual needs to ensure you get the best out of the course.</p>
        <p><strong>Individual Focus:</strong> At Trent Education Centre we believe in the power of individual attention. Our teaching and support staff assess your needs and monitor your development throughout the course, providing extra support where needed. We won&rsquo;t treat you like a face in the crowd, but as an individual with unique learning needs and interests.</p>
      </div>

      {/* How to Apply */}
      <div className="al4-apply-wrap">
        <div className="container">
          <h2 className="al4-section-title" style={{ textAlign: 'center' }}>How to Apply</h2>
          <div className="al4-apply-grid">
            <div className="al4-apply-step">
              <span className="al4-apply-icon"><FileText size={26} /></span>
              <h3>Apply Online</h3>
              <p>Complete the online Student Application Form to share your details, course choice and supporting documents. It takes around 20 minutes.</p>
            </div>
            <div className="al4-apply-step">
              <span className="al4-apply-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </span>
              <h3>We Review</h3>
              <p>Our admissions team reviews your application and supporting documents against the entry requirements for your chosen course.</p>
            </div>
            <div className="al4-apply-step">
              <span className="al4-apply-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </span>
              <h3>Offer &amp; Start</h3>
              <p>We will let you know if your application is successful. If it is, you will be able to enrol on the course and begin studying.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/application-form" className="btn-gold" style={{ display: 'inline-block', padding: '14px 40px', fontSize: '1rem' }}>Start Your Application</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
