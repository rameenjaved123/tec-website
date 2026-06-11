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
  { icon: <Clock size={22} />, label: '6 Weeks' },
  { icon: <Calendar size={22} />, label: 'Intake: January / April / June / October' },
  { icon: <Award size={22} />, label: 'Awarding Body: NCFE & Open Awards' },
  { icon: <TrendingUp size={22} />, label: 'Progression: On successful completion, you may progress to A Level Mathematics or a Level 3 Diploma in a variety of fields.' },
];

const tabs = ['Overview', 'Course Fees'];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function NCFEMathsL2Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="inner-page page-enter al4-page">

      <PageHero
        title="NCFE Level 2 Functional Skills Qualification in Maths"
        bgImage="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1600&q=80"
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
            <p><strong>The Level 2 Functional Skills Mathematics qualification is awarded by NCFE &amp; Open Awards and regulated by Ofqual.</strong></p>
            <p>The Level 2 Functional Skills Mathematics qualification is designed to demonstrate proficiency in mathematics at the appropriate level and the ability to apply mathematical thinking effectively to solve problems in the workplace and other real&#8209;life situations.</p>
            <p>This qualification is widely recognised by employers and universities as evidence of a solid foundation in mathematics. It is equivalent to a GCSE Grade C/4 in Maths and opens doors to further education, apprenticeships, and career progression.</p>
          </div>
        )}

        {activeTab === 'Course Fees' && (
          <div className="al4-fees">
            <p>Tuition fee for Home (UK) students per year*: <strong>&pound;700</strong></p>
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
          <li>Hold a Level 1 Functional Skills Mathematics qualification, or complete a Functional Skills assessment to establish the appropriate starting level (Entry 1, Entry 2, Entry 3, Level 1 or Level 2)</li>
          <li>No other prior qualifications are required to enrol</li>
        </ul>
        <p style={{ marginTop: 16 }}><strong>All entry decisions are made on an individual basis.</strong></p>
      </div>

      {/* Why TEC */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Why TEC?</h2>
        <p style={{ marginBottom: 16 }}><strong>Qualified Teachers:</strong> Our instructors hold recognised teaching qualifications and have extensive experience teaching adults. They will identify your individual needs and ensure you get the most from your course.</p>
        <p style={{ marginBottom: 16 }}><strong>Individual Focus:</strong> We believe in the power of personalised support. Our teaching and support staff will assess your progress throughout the course and provide extra assistance where needed. You won&rsquo;t be just another face in the crowd, but an individual with unique learning needs and interests.</p>
        <p><strong>Path to Progression:</strong> Successfully completing this qualification opens pathways to A Level Mathematics, Level 3 Diplomas, apprenticeships, and a wide range of career and higher education opportunities.</p>
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
              <p>Once you&rsquo;ve completed your application and connected with an admissions representative, you&rsquo;re ready to create your schedule.</p>
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
