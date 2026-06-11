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
  { icon: <Clock size={22} />, label: '6 Days + 1 Day First Aid / Onsite' },
  { icon: <Calendar size={22} />, label: 'Intake: Every Week' },
  { icon: <Award size={22} />, label: 'Awarding Body: Pearson' },
  { icon: <TrendingUp size={22} />, label: 'Progression: Learners who successfully complete this qualification may progress into related fields including the ATHE Level 4 Diploma in Health and Social Care or higher-level apprenticeships.' },
];

const tabs = ['Overview', 'Course Units', 'Fees and Funding'];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function SIADoorSupervisorsPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="inner-page page-enter al4-page">

      <PageHero
        title="SIA Level 2 Award for Door Supervisors in the Private Security Industry (BIIAB)"
        bgImage="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=1600&q=80"
        bgPosition="center 40%"
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
            <p><strong>Door Supervisor Competence:</strong> This Level 2 Award for Door Supervisors in the Private Security Industry equips learners with the knowledge and skills required to work as a door supervisor. From understanding legal and operational aspects to managing conflict situations, you will gain the expertise needed to succeed in this important security role.</p>
            <ul className="al4-bullets" style={{ margin: '16px 0' }}>
              <li><strong>SIA Licence Requirements:</strong> All door supervisors must hold a licence to practise issued by the Security Industry Authority (SIA). Successful completion of this course fulfils one of the requirements needed to apply for a licence.</li>
              <li><strong>Practical Application:</strong> Our hands-on approach goes beyond theoretical knowledge. You will engage in real-world scenarios involving conflict management and simulations that reflect the challenges commonly encountered on the job. Practical experience in securing premises and ensuring the safety of patrons will enhance your confidence and prepare you for the role of door supervisor.</li>
            </ul>
            <p><strong>BIIAB Level 3 Award in Emergency First Aid at Work</strong></p>
            <p>It is now a mandatory requirement, under SIA regulations, for individuals applying for a Door Supervisor or Security Guard licence to complete first aid training prior to undertaking licence-linked training. Trent Education Centre is proud to offer this qualification, which is designed to equip learners with the knowledge and skills necessary to administer first aid to adults in a professional setting.</p>
          </div>
        )}

        {activeTab === 'Course Units' && (
          <div className="al4-units-list">
            <ul className="al4-bullets">
              <li>Unit 1: Working within the Private Security Industry</li>
              <li>Unit 2: Working as a Door Supervisor within the Private Security Industry</li>
              <li>Unit 3: Conflict Management within the Private Security Industry</li>
              <li>Unit 4: Physical Intervention Skills in the Private Security Industry</li>
            </ul>
          </div>
        )}

        {activeTab === 'Fees and Funding' && (
          <div className="al4-fees">
            <p>Tuition fee for Home (UK) students per year*: <strong>&pound;399</strong></p>
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
        <p style={{ marginTop: 16 }}><strong>English Language for Learners:</strong></p>
        <p style={{ marginTop: 8 }}>During their professional duties, security operatives may need to contact emergency services or manage conflict through effective communication. Strong communication skills in reading, writing, speaking, and listening are therefore essential. Prospective learners should demonstrate English language proficiency by meeting at least one of the following criteria:</p>
        <ul className="al4-bullets" style={{ marginTop: 8 }}>
          <li>A B2 level qualification from the Home Office&rsquo;s list of recognised English tests and qualifications</li>
          <li>A B2 level on the Common European Framework of Reference for Languages (CEFR)</li>
          <li>An ESOL qualification at Level 1 on the Ofqual Register, taken in England, Wales, or Northern Ireland</li>
          <li>Functional Skills Level 1 in English</li>
        </ul>
        <p style={{ marginTop: 16 }}><strong>All entry decisions are made on an individual basis.</strong></p>
      </div>

      {/* Why TEC */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Why TEC?</h2>
        <p style={{ marginBottom: 16 }}><strong>Qualified Teachers:</strong> Our instructors hold recognised teaching qualifications and have extensive experience teaching adults. They will identify your individual needs and ensure you get the most from your course.</p>
        <p><strong>Individual Focus:</strong> We believe in the power of personalised support. Our teaching and support staff will assess your progress throughout the course and provide extra assistance where needed. You won&rsquo;t be just another face in the crowd, but an individual with unique learning needs and interests.</p>
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
