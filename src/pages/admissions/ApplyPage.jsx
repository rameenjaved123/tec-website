import { ArrowRight, Phone, Mail, Clock, CheckCircle, FileText, Users, Award } from 'lucide-react';
import '../InnerPage.css';
import './ApplyPage.css';
import PageHero from '../../components/PageHero';

const steps = [
  { icon: <FileText size={22} />, title: 'Complete the Form', desc: 'Fill in our simple online application — takes just 10 minutes.' },
  { icon: <Users size={22} />, title: 'Meet the Team', desc: 'A member of our admissions team will contact you to discuss your options.' },
  { icon: <Award size={22} />, title: 'Get Your Offer', desc: 'Receive your conditional or unconditional offer and confirm your place.' },
];

const requirements = [
  'Valid photo ID (passport or driving licence)',
  'Proof of address (utility bill or bank statement)',
  'Previous qualification certificates or transcripts',
  'Evidence of English language proficiency (if applicable)',
  'Work experience evidence (for mature students 21+)',
];

export default function ApplyPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Enrolment"
        bgImage="/assets/images/general/student-studying.jpg"
        bgPosition="center center"
      />

      {/* ── Intro strip ── */}
      <div className="apply-intro">
        <div className="apply-intro-inner">
          <p>Ready to join Trent Education Centre? Our straightforward application process is designed to get you started quickly. Complete the form below or visit our portal, and our friendly admissions team will guide you every step of the way.</p>
        </div>
      </div>

      {/* ── 3-step process ── */}
      <div className="enrol-steps-section">
        <div className="container" style={{ maxWidth: 1100 }}>
          <h2 className="enrol-section-title">How It Works</h2>
          <div className="enrol-steps">
            {steps.map((s, i) => (
              <div key={i} className="enrol-step-card">
                <div className="enrol-step-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="enrol-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main CTA + requirements ── */}
      <div className="apply-main">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="apply-main-grid">

            {/* Left — CTA card */}
            <div className="apply-cta-card">
              <h2>Apply Now</h2>
              <p>Our online application takes just 10 minutes to complete. Once submitted, a member of our admissions team will be in touch within 2 working days.</p>
              <a
                href="/application-form"
                className="apply-portal-btn"
              >
                Go to Application Portal <ArrowRight size={16} />
              </a>
              <div className="apply-note">
                <Clock size={15} />
                <span>Average completion time: <strong>10 minutes</strong></span>
              </div>
            </div>

            {/* Right — what you need */}
            <div className="apply-requirements">
              <h3>What You'll Need</h3>
              <p>Please have the following documents ready before you begin your application:</p>
              <ul>
                {requirements.map((r, i) => (
                  <li key={i}>
                    <CheckCircle size={16} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Contact strip ── */}
      <div className="apply-contact-strip">
        <div className="container" style={{ maxWidth: 1100 }}>
          <p className="apply-contact-label">Need help with your application?</p>
          <div className="apply-contact-links">
            <a href="tel:+441157950171">
              <Phone size={16} /> (+44) 1157950171
            </a>
            <a href="mailto:admissions@trenteducation.co.uk">
              <Mail size={16} /> admissions@trenteducation.co.uk
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
