import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Award, TrendingUp, FileText } from 'lucide-react';
import './InnerPage.css';
import './CoursePage.css';
import './ATHELevel4Page.css';
import PageHero from '../components/PageHero';

/* ─────────────────────────────────────────────
   Course facts
───────────────────────────────────────────── */
const facts = [
  { icon: <Clock size={22} />, label: '12 Weeks' },
  { icon: <Calendar size={22} />, label: 'Intake: January / April / June / October' },
  { icon: <Award size={22} />, label: 'Awarding Body: ATHE' },
  { icon: <TrendingUp size={22} />, label: 'Progression: Learners who successfully complete this qualification may progress to the Level 4 Extended Diploma in Business and Management.' },
];

const tabs = ['Overview', 'Mandatory Course Units', 'Course Fees'];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function ATHELevel3Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="inner-page page-enter al4-page">

      <PageHero
        title="ATHE Level 3 Diploma in Business"
        bgImage="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80"
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

      {/* Tab content */}
      <div className="container al4-tab-content-wrap">

        {activeTab === 'Overview' && (
          <div className="al4-overview">
            <p><strong>Our Level 3 Diploma in Business is awarded by Awards for Training and Higher Education (ATHE) and regulated by Ofqual.</strong></p>
            <p>It is well respected by employers across the sector. This comprehensive programme comprises 60 credits and is suitable for learners who wish to develop knowledge and skills in business management, and to progress towards an HND or university degree in business.</p>
            <p>The ATHE Level 3 Diploma in Business is a 60-credit qualification, equivalent to an A Level or Access to Higher Education qualification. It provides learners with knowledge and understanding of the business environment and how businesses operate. This qualification is widely recognised by employers, and learners can progress to Level 4 qualifications in Business upon successful completion.</p>
          </div>
        )}

        {activeTab === 'Mandatory Course Units' && (
          <div className="al4-units-list">
            <ul className="al4-bullets">
              <li>Unit 1: Business Environment (10 Credits)</li>
              <li>Unit 2: How Businesses and Organisations Work (10 Credits)</li>
              <li>Unit 3: Business Communication (10 Credits)</li>
              <li>Unit 4: Working in Teams (10 Credits)</li>
              <li>Unit 5: Market Research (10 Credits)</li>
            </ul>
          </div>
        )}

        {activeTab === 'Course Fees' && (
          <div className="al4-fees">
            <p>Tuition fee for Home (UK) students per year*: <strong>&pound;1,987</strong></p>
            <p>
              Before enrolling, please read the{' '}
              <a href="/assets/documents/terms/terms-conditions-he.pdf" target="_blank" rel="noreferrer">Terms and Conditions (Higher Education)</a>
              {' '}and{' '}
              <a href="/assets/documents/terms/tuition-fees-he.pdf" target="_blank" rel="noreferrer">Tuition Fees, Refunds and Compensation Policy (Higher Education)</a>.
            </p>
          </div>
        )}

      </div>

      {/* Facts strip */}
      <div className="al4-facts-units-wrap">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            columnGap: '48px',
          }}>
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
        <p style={{ marginTop: 16 }}><strong>Qualifications:</strong></p>
        <ul className="al4-bullets" style={{ marginTop: 8 }}>
          <li>Five or more GCSEs at Grade C or above, or Grade 4 or above</li>
          <li>Other related Level 2 qualifications such as Functional Skills in English and Maths</li>
          <li>Equivalent international qualifications</li>
        </ul>
        <p style={{ marginTop: 16 }}><strong>English Language Requirements:</strong></p>
        <p style={{ marginTop: 8 }}>For learners without qualifications from majority English-speaking countries:</p>
        <ul className="al4-bullets" style={{ marginTop: 8 }}>
          <li>IELTS 5.0</li>
          <li>Common European Framework of Reference for Languages (CEFR) Level B1</li>
          <li>Cambridge B1 Preliminary with a score of 140 or above</li>
          <li>Pearson Test of English Academic (PTE-A) score of 40.8 or higher</li>
          <li>Functional Skills English Level 1</li>
        </ul>
        <p style={{ marginTop: 8 }}>Learners who do not meet any of the above may be required to pass the TEC English language test.</p>
        <p style={{ marginTop: 16 }}><strong>Prior Experiential Learning:</strong></p>
        <p style={{ marginTop: 8 }}>Learners without formal qualifications may be considered if they can demonstrate prior learning through relevant work experience. This will be assessed via a personal statement and interview.</p>
        <p style={{ marginTop: 16 }}><strong>All entry decisions are made on an individual basis.</strong></p>
      </div>

      {/* Why TEC */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Why TEC?</h2>
        <p style={{ marginBottom: 16 }}><strong>Qualified Teachers:</strong> Our teachers hold relevant qualifications and have extensive experience teaching adults. They will identify your individual needs to ensure you gain the most from your course.</p>
        <p style={{ marginBottom: 16 }}><strong>Individual Focus:</strong> At Trent Education Centre, we value personalised attention. Our teaching and support staff will assess your progress regularly and provide additional support where necessary. We won&rsquo;t treat you like a face in the crowd, but as an individual with unique learning needs and interests.</p>
        <p><strong>Path to Progression:</strong> Our programme is designed to support your progression towards a Bachelor&rsquo;s degree and to open doors to advanced career opportunities. After completing Level 4, you can progress to Level 5, followed by a Level 6 Top-up at a university to achieve a full degree.</p>
      </div>

      {/* How to Apply */}
      <div className="al4-apply-wrap">
        <div className="container">
          <h2 className="al4-section-title" style={{ textAlign: 'center' }}>How to Apply?</h2>
          <div className="al4-apply-grid">
            <div className="al4-apply-step">
              <span className="al4-apply-icon"><FileText size={26} /></span>
              <h3>You Apply</h3>
              <p>Tell us a little about yourself, and we&rsquo;ll take care of the rest. Our convenient online application form takes just 10 minutes to complete.</p>
            </div>
            <div className="al4-apply-step">
              <span className="al4-apply-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <h3>We Connect</h3>
              <p>After you submit your application, an admissions representative will contact you to help you complete the process.</p>
            </div>
            <div className="al4-apply-step">
              <span className="al4-apply-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <h3>Enrolment</h3>
              <p>We will let you know if your application is successful. If it is, you will be able to enrol on the course and begin studying.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/apply" className="btn-gold" style={{ display: 'inline-block', padding: '14px 40px', fontSize: '1rem' }}>Apply Now</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
