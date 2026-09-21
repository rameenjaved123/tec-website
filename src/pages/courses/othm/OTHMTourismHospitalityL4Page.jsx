import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Award, FileText } from 'lucide-react';
import '../../InnerPage.css';
import '../../CoursePage.css';
import '../higher-education/ATHELevel4Page.css';
import PageHero from '../../../components/PageHero';

const facts = [
  { icon: <Clock size={22} />, label: '600 Guided Learning Hours (1,200 TQT)' },
  { icon: <Calendar size={22} />, label: 'Duration: One Academic Year (Full-time)' },
  { icon: <Award size={22} />, label: 'Awarding Body: OTHM (Ofqual regulated)' },
  { icon: <FileText size={22} />, label: 'Level 4 Diploma · 120 Credits' },
];

const tabs = ['Overview', 'Course Units', 'Course Fees'];

export default function OTHMTourismHospitalityL4Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="inner-page page-enter al4-page">

      <PageHero
        title="OTHM Level 4 Diploma in Tourism and Hospitality Management"
        bgImage="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=80"
      />

      <div style={{ height: '24px', background: '#fff' }} />

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
            <p><strong>The OTHM Level 4 Diploma in Tourism and Hospitality Management supports students&rsquo; development as managers within the tourism and hospitality industry.</strong></p>
            <p>The qualification combines theoretical knowledge with practical application across academic research skills, the business environment, services marketing, consumer behaviour, sustainability and event management. Successful completion supports progression to university study as well as entry into the tourism and hospitality workforce.</p>
          </div>
        )}

        {activeTab === 'Course Units' && (
          <div className="al4-units-list">
            <p style={{ fontWeight: 700, marginBottom: 10 }}>Mandatory Units — complete all 6 (120 credits, 20 credits each)</p>
            <ul className="al4-bullets">
              <li>Academic Writing and Research Skills (20 Credits)</li>
              <li>Business Environment for Tourism and Hospitality (20 Credits)</li>
              <li>Services Marketing in Tourism and Hospitality (20 Credits)</li>
              <li>Sustainability in Tourism and Hospitality (20 Credits)</li>
              <li>Events Management (20 Credits)</li>
              <li>The Development of the Tourism and Hospitality Industry (20 Credits)</li>
            </ul>
          </div>
        )}

        {activeTab === 'Course Fees' && (
          <div className="al4-fees">
            <p>Tuition fee for Home (UK) students per year*: <strong>&pound;4,000</strong></p>
            <p style={{ marginTop: 16 }}>At Trent Education Centre we are committed to making education accessible and affordable. We offer a range of funding options, including government loans, scholarships and bursaries, and flexible payment plans may be available. Please contact our admissions team for personalised advice.</p>
            <p style={{ marginTop: 16 }}>
              Before enrolling, please read the{' '}
              <a href="/assets/documents/terms/terms-conditions-he.pdf" target="_blank" rel="noreferrer">Terms and Conditions</a>
              {' '}and{' '}
              <a href="/assets/documents/terms/tuition-fees-he.pdf" target="_blank" rel="noreferrer">Tuition Fees, Refunds and Compensation Policy</a>.
            </p>
          </div>
        )}

      </div>

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

      <div className="container al4-section">
        <h2 className="al4-section-title">Entry Requirement</h2>
        <p><strong>Age:</strong> 18+</p>
        <p style={{ marginTop: 12 }}>Applicants should hold at least one of the following:</p>
        <ul className="al4-bullets" style={{ marginTop: 8 }}>
          <li>A relevant Level 3 Diploma or an equivalent qualification</li>
          <li>GCE Advanced Level (A Levels) in 2 subjects or equivalent</li>
          <li>Mature students (21+) with relevant management experience</li>
        </ul>
        <p style={{ marginTop: 16 }}><strong>English Language Requirements:</strong></p>
        <p style={{ marginTop: 8 }}>Applicants who are not from a majority English-speaking country must provide evidence of English language competency.</p>
        <p style={{ marginTop: 16 }}><strong>All entry decisions are made on an individual basis.</strong></p>
      </div>

      <div className="container al4-section">
        <h2 className="al4-section-title">Progression</h2>
        <p>On successful completion, students can progress to a relevant OTHM Level 5 Diploma, or gain direct entry into the second year of a UK Bachelor&rsquo;s degree programme, as this is an Ofqual-regulated qualification.</p>
      </div>

      <div className="container al4-section">
        <h2 className="al4-section-title">Why TEC?</h2>
        <p style={{ marginBottom: 16 }}><strong>Qualified Teachers:</strong> Our teachers hold recognised teaching qualifications and are experienced in teaching the subject to adults. They will identify your individual needs to ensure you get the best out of the course.</p>
        <p><strong>Individual Focus:</strong> At Trent Education Centre we believe in the power of individual attention. Our teaching and support staff assess your needs and monitor your development throughout the course, providing extra support where needed. We won&rsquo;t treat you like a face in the crowd, but as an individual with unique learning needs and interests.</p>
      </div>

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
