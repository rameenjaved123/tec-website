import {
  ArrowRight, Phone, Mail, Clock, CheckCircle, FileText,
  Users, Award, ClipboardList, ShieldCheck, GraduationCap, Globe,
} from 'lucide-react';
import '../InnerPage.css';
import './ApplyPage.css';
import PageHero from '../../components/PageHero';

// ── 4-step process (mirrors how applications actually flow at TEC) ─
const steps = [
  {
    icon: <FileText size={22} />,
    title: 'Complete the Form',
    desc: 'Fill in the online Student Application Form — personal details, course choice, background, and supporting documents.',
  },
  {
    icon: <ClipboardList size={22} />,
    title: 'Document Review',
    desc: 'Our admissions team checks your application against the entry requirements for your chosen course.',
  },
  {
    icon: <Users size={22} />,
    title: 'Interview & Offer',
    desc: 'We may invite you for a short informal interview before issuing a conditional or unconditional offer.',
  },
  {
    icon: <Award size={22} />,
    title: 'Enrol & Begin',
    desc: 'Accept your offer, complete enrolment, and start your studies at your preferred study centre.',
  },
];

// ── Document checklist (matches the 10 upload fields on the actual form) ─
const documents = [
  { label: 'Passport or National ID',           note: 'Driving licence is not accepted as primary ID' },
  { label: 'Proof of address (×2)',             note: 'Recent utility bill, bank statement, or council tax letter' },
  { label: 'Right to study evidence',           note: 'Visa, BRP, share code, or settled status documentation' },
  { label: 'National Insurance number',         note: 'NI card, payslip, or HMRC letter' },
  { label: 'Previous qualifications',           note: 'Certificates, transcripts, or work-based references' },
  { label: 'CV (if applying for HE or work-related courses)', note: 'PDF or Word document' },
  { label: 'Work reference (if applicable)',    note: 'For experience-based admissions' },
];

// ── Who can apply ──────────────────────────────────────────────
const eligibility = [
  { icon: <GraduationCap size={20} />, title: 'School Leavers (16+)',        desc: 'Recent qualifications and a willingness to learn.' },
  { icon: <Users size={20} />,         title: 'Adult Learners (19+)',         desc: 'Returning to education or upskilling for work.' },
  { icon: <Globe size={20} />,         title: 'International Students',       desc: 'See our International Application route — visa support available.' },
  { icon: <ShieldCheck size={20} />,   title: 'Career Changers',              desc: 'Work-experience and prior-learning recognition considered.' },
];

export default function ApplyPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Apply"
        subtitle="Your route to studying at Trent Education Centre"
        bgImage="/assets/images/general/student-studying.jpg"
        bgPosition="center center"
      />

      {/* ── Intro strip ── */}
      <div className="apply-intro">
        <div className="apply-intro-inner">
          <p>
            Apply to Trent Education Centre using our online <strong>Student Application Form</strong>.
            The form covers your personal details, address, background, course choice, employment, and
            the supporting documents we need to assess your application. Once submitted, our admissions
            team will review your application and be in touch shortly.
          </p>
        </div>
      </div>

      {/* ── 4-step process ── */}
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

      {/* ── Main CTA + document checklist ── */}
      <div className="apply-main">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="apply-main-grid">

            {/* Left — CTA card */}
            <div className="apply-cta-card">
              <h2>Ready to Apply?</h2>
              <p>
                Complete the online Student Application Form to share your details, course choice,
                and supporting documents. Our admissions team will be in touch shortly.
              </p>
              <a href="/application-form" className="apply-portal-btn">
                Start Your Application <ArrowRight size={16} />
              </a>
              <div className="apply-note">
                <Clock size={15} />
                <span>Average completion time: <strong>20–30 minutes</strong></span>
              </div>
              <div className="apply-note" style={{ marginTop: 6 }}>
                <CheckCircle size={15} />
                <span>You can upload documents directly within the form</span>
              </div>
            </div>

            {/* Right — document checklist */}
            <div className="apply-requirements">
              <h3>Documents You'll Need</h3>
              <p>Please have the following ready before you start. You can upload each one in the relevant section of the form:</p>
              <ul>
                {documents.map((d, i) => (
                  <li key={i}>
                    <CheckCircle size={16} />
                    <div>
                      <span><strong>{d.label}</strong></span>
                      <div className="apply-req-note">{d.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Who can apply ── */}
      <div className="apply-eligibility">
        <div className="container" style={{ maxWidth: 1100 }}>
          <h2 className="enrol-section-title">Who Can Apply</h2>
          <p className="apply-eligibility-intro">
            We welcome applications from a wide range of learners — there is no single route in.
            If you're unsure whether you qualify, get in touch with our admissions team.
          </p>
          <div className="apply-eligibility-grid">
            {eligibility.map((e, i) => (
              <div key={i} className="apply-eligibility-card">
                <div className="apply-eligibility-icon">{e.icon}</div>
                <h4>{e.title}</h4>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What happens next ── */}
      <div className="apply-next">
        <div className="container" style={{ maxWidth: 980 }}>
          <h2 className="enrol-section-title" style={{ textAlign: 'center' }}>What Happens After You Apply</h2>
          <div className="apply-next-list">
            <div className="apply-next-item">
              <span className="apply-next-step">1</span>
              <div>
                <h4>Confirmation</h4>
                <p>You'll receive an automatic confirmation email as soon as your application is submitted.</p>
              </div>
            </div>
            <div className="apply-next-item">
              <span className="apply-next-step">2</span>
              <div>
                <h4>Review (within 5 working days)</h4>
                <p>Our admissions team will review your application and supporting documents.</p>
              </div>
            </div>
            <div className="apply-next-item">
              <span className="apply-next-step">3</span>
              <div>
                <h4>Interview (where required)</h4>
                <p>For some courses, we'll invite you to a short informal conversation — in person or online.</p>
              </div>
            </div>
            <div className="apply-next-item">
              <span className="apply-next-step">4</span>
              <div>
                <h4>Decision</h4>
                <p>You'll receive a conditional or unconditional offer by email, with next steps for enrolment.</p>
              </div>
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
              <Phone size={16} /> (+44) 1157 950 171
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
