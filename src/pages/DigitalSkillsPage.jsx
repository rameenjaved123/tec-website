import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, TrendingUp, FileText } from 'lucide-react';
import './InnerPage.css';
import './CoursePage.css';
import './ATHELevel4Page.css';
import PageHero from '../components/PageHero';

/* ─────────────────────────────────────────────
   Course facts
───────────────────────────────────────────── */
const facts = [
  { icon: <Clock size={22} />, label: '6 Weeks' },
  { icon: <Calendar size={22} />, label: 'Intake: Monthly' },
  { icon: <TrendingUp size={22} />, label: 'Progression: The Digital Skills for Beginners course offers a clear and structured progression — from foundational device skills and internet navigation through to Microsoft Office, job searching, safe online shopping, video calls, and advanced digital safety practices.' },
];

const tabs = ['Overview', 'Course Structure', 'Fees and Funding'];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function DigitalSkillsPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="inner-page page-enter al4-page">

      <PageHero
        title="Digital Skills for Beginners"
        bgImage="https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?w=1600&q=80"
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
            <p><strong>If you&rsquo;re new to digital devices and need support with essential applications such as using devices, online shopping, email, or staying connected on social media, we offer FREE beginner courses to help you build your confidence.</strong></p>
            <p>These courses are designed to help you stay connected with family and friends, support your children with their homework, enhance your everyday digital skills, and strengthen your readiness to re-enter the job market.</p>
            <p>It&rsquo;s never too late to learn. Enrol on our FREE Digital Skills for Beginners course today and take the first step towards improving your confidence and expanding your career opportunities!</p>
          </div>
        )}

        {activeTab === 'Course Structure' && (
          <div className="al4-units-list">
            <ul className="al4-bullets">
              <li>Week 1: Getting Started with Digital Devices, Navigating the Internet &amp; Social Media</li>
              <li>Week 2: Mastering Email and Online Communication</li>
              <li>Week 3: Microsoft Office and Job Search Skills</li>
              <li>Week 4: E-Commerce and Safe Online Food Ordering</li>
              <li>Week 5: Staying Connected Through Video Calls</li>
              <li>Week 6: Best Practices for Online Security</li>
              <li>Week 7: Practical Assessment</li>
            </ul>
          </div>
        )}

        {activeTab === 'Fees and Funding' && (
          <div className="al4-fees">
            <p><strong>Tuition is free for Home (UK) students.</strong></p>
            <p>At Trent Education Centre, we are committed to making education accessible and affordable. We offer a range of funding options, including government loans, scholarships, and bursaries, to support your academic journey. Flexible payment plans may also be available to help you manage your tuition fees more easily.</p>
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

      {/* Assessment */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Assessment</h2>
        <ul className="al4-bullets">
          <li>Practical exercises</li>
          <li>Quizzes and guided tasks</li>
          <li>Final project: Create a digital portfolio, including a CV, and demonstrate digital safety skills</li>
        </ul>
      </div>

      {/* Why TEC */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Why TEC?</h2>
        <p style={{ marginBottom: 16 }}>Joining the Digital Skills for Beginners course at Trent Education Centre offers a range of key benefits. As a reputable institution committed to empowering individuals, we provide a supportive and inclusive learning environment where beginners can confidently develop essential digital skills.</p>
        <p>The course is accessible, hands-on, and tailored to meet the needs of learners at all levels. With expert instructors and personalised guidance, participants can progress at their own pace, enhancing their digital literacy and unlocking opportunities for career development, improved social connectivity, and greater independence in everyday life. By choosing Trent Education Centre, you&rsquo;re not just learning digital skills &mdash; you&rsquo;re investing in your future.</p>
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
