import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight, ClipboardList } from 'lucide-react';
import '../InnerPage.css';
import './AdmissionPage.css';
import PageHero from '../../components/PageHero';

// ── Helper: turn any email address inside a string into a clickable
//    `mailto:` link styled blue. Splitting with a capture group means odd-indexed
//    parts are the matches, even-indexed ones are the surrounding text.
function linkifyEmails(text) {
  if (!text) return text;
  const parts = String(text).split(/([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/gi);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <a key={i} href={`mailto:${part}`} className="adm-email-link">{part}</a>
      : part
  );
}

const commitmentLeft = [
  'We welcome applicants regardless of age, marital status, race, nationality, ethnic or national origin, sexual orientation, religious beliefs, disability, family circumstances, and parental status.',
  'Applicants will receive the support and information they need to make well-informed decisions before joining a course at the College.',
  'Applicants will be informed about the entry criteria for the course they wish to apply and informed about whether or not they meet the criteria.',
  'The entry level courses are designed to provide you with qualifications that meet the entry requirements of the higher-level courses we offer.',
];

const commitmentRight = [
  'We support under-represented groups, reducing barriers to education.',
  'We provide courses for all levels, and applicants who are not able to meet entry requirements for higher-level course, can be admitted into English and Maths courses we provide at entry levels.',
  'For mature students (21 years or older), applying for higher-level courses, work experience can be considered as a valid substitute for formal qualifications. However, applicants may need to pass an English test as well. This could be Trent Education Centre\'s own English Test, or an English Test provided by a recognised awarding body such as Pearson or NCFE.',
];

const scholarshipCriteria = [
  'The applicant meets the entry requirements for the course.',
  'There are still funds available for the current academic year (please check this first)',
  'The applicant has been able to communicate effectively in their 500-word essay that they made an outstanding achievement in a particular field',
  'Three members of the SMT including the Chair need to agree before a Scholarship can be approved',
];

const bursaryCriteria = [
  'The applicant meets the entry requirements for the course.',
  'There are still funds available for the current academic year (please check this first)',
  'The applicant can produce evidence upon request that they cannot finance the course themselves',
  'The applicant has been able to communicate effectively in their 500-word essay why they wish to join the course they are applying for and how it will help them to improve their life-chances.',
];

const admissionsSteps = [
  {
    title: 'Introduction',
    items: [
      'Applicants contact Admissions staff in person or online admissions@trenteducation.ac.uk',
      'Admissions staff guide Applicants on courses, dates, and entry requirements',
      'Applicants complete the application form and apply for student finance or scholarship/bursary if relevant',
    ],
  },
  {
    title: 'Application',
    items: [
      'Applicants provide hard copies in person of all required personal documents',
      'Admissions staff store documents and check authenticity',
      'Evidence of relevant qualifications are submitted',
      'Evidence of work experience can be submitted for consideration for students 21 years or older',
    ],
  },
  {
    title: 'Interview',
    items: [
      'Applicants can take the TEC English language Test unless required to provide a recognised English language qualification (BKBS, Pearson, NCFE, Duolingo, IELTS or Cambridge).',
      'All applicants must attend an Academic Interview in person',
      'Successful applicants receive a Conditional Offer Letter',
      'An Unconditional Offer Letter is sent to the student who have met all requirements',
      'The student accepts the offer and supplies their CRN number if SLC funded',
    ],
  },
  {
    title: 'Enrolment',
    items: [
      'Applicants meet the enrolment requirements of their respective awarding organisation',
      'The TEC Student Support Manager (Registry) changes the student status from \'Provisional\' to \'Enrolled\'',
      'Students who are not approved for student finance by the awarding organisation\'s deadline can pay their own fees or will have their application cancelled or deferred to the next intake if they wish to apply again.',
      'Students may pay their own fees, be sponsored or in receipt of a scholarship or bursary',
    ],
  },
  {
    title: 'Induction & Follow up',
    items: [
      'Applicants who wish to accept an offer, attend the induction',
      'Applicants who wish to accept an offer, sign a learning agreement',
      'Students complete a feedback form on the admissions process after induction',
      'Applicants/students may complain or appeal against admission decisions at any time during the process following the TEC Admission Complaints and Appeals procedure',
    ],
  },
];

export default function AdmissionPage() {
  const [openStep, setOpenStep] = useState(null);

  return (
    <div className="inner-page page-enter">

      {/* ── Hero ── */}
      <PageHero
        title="Admission"
        bgImage="/assets/images/general/student-book.jpg"
      />

      {/* ── Intro ── */}
      <div className="container" style={{ padding: '72px 20px 12px', maxWidth: 1040 }}>
        <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333', textAlign: 'center' }}>
          The College is dedicated to providing an admission process that is fair, transparent, and gives all applicants equal opportunities. The College accepts applications from people regardless of their background or circumstances, and actively promotes applications from communities that are under-represented in further and higher education, particularly those who may face disadvantages and barriers to higher education. We aim to attract students who need skills and qualifications to prepare for academic and career success, including finding a job, gaining promotion or starting your own business.
        </p>
        <p style={{ textAlign: 'center', marginTop: 16 }}>
          Please see our{' '}
          <a
            href="/assets/documents/terms/access-participation-2026.pdf"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#000', fontWeight: 700, textDecoration: 'underline' }}
          >
            Access and Participation Statement 2026-27
          </a>
        </p>
      </div>

      {/* ── Apply for 2024 ── */}
      <div className="adm-apply-banner">
        <div className="adm-apply-content">
          <h2>Apply for 2026</h2>
          <p>
            Admissions for July 2026 are now open! Start your application today and get connected to our Admissions Team{' '}
            <a href="mailto:admissions@trenteducation.ac.uk" className="adm-email-link">admissions@trenteducation.ac.uk</a>{' '}
            so you can see if Trent Education Centre has the right courses and support for you.
          </p>
          <a href="/application-form" className="adm-apply-btn">
            Start Your Application
          </a>
        </div>
      </div>

      {/* ── Our Commitment ── */}
      <div className="adm-commitment">
        <div className="container" style={{ maxWidth: 1100 }}>
          <h2 className="adm-commitment-title">Our Commitment</h2>
          <div className="adm-commitment-grid">
            <div>
              {commitmentLeft.map((item, i) => (
                <div key={i} className="adm-commit-item">
                  <CheckCircle size={19} className="adm-check" />
                  <p>{linkifyEmails(item)}</p>
                </div>
              ))}
            </div>
            <div>
              {commitmentRight.map((item, i) => (
                <div key={i} className="adm-commit-item">
                  <CheckCircle size={19} className="adm-check" />
                  <p>{linkifyEmails(item)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Student Finance Options ── */}
      <div
        className="adm-finance"
        style={{ backgroundImage: 'url(/assets/images/general/scholarship.jpg)' }}
      >
        <div className="adm-finance-overlay" />
        <div className="adm-finance-text">
          <h2>Student Finance Options</h2>
          <p>
            Students may cover the costs of their studies through different funding sources. You may be self-funded, which means you will pay the fees and your maintenance costs yourself. You may be sponsored, which means you may have someone like your employer who agrees to pay your course fees for you. Thirdly, you may be eligible to receive a government grant or loan to cover the costs of your fees and maintenance. Finally, you may be eligible for the limited number of Scholarships and Bursaries the College offers to deserving students.
          </p>
          <p style={{ marginTop: 16 }}>
            Please contact our Admissions Team{' '}
            <a href="mailto:admissions@trenteducation.ac.uk" className="adm-email-link">admissions@trenteducation.ac.uk</a>{' '}
            in order to enquire about your eligibility for student finance, and how you can apply for grants, loans, scholarships and bursaries to support your studies.
          </p>
        </div>
      </div>

      {/* ── Scholarships & Bursaries ── */}
      <div className="container" style={{ maxWidth: 900, padding: '56px 20px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, textAlign: 'center', marginBottom: 24 }}>Scholarships &amp; Bursaries</h2>
        <p style={{ lineHeight: 1.8, color: '#444', marginBottom: 32 }}>
          The College welcomes eligible candidates to apply for a Scholarship or Bursary to help them fund their studies. The College sets aside £100,000 per annum for scholarships and bursaries. Funds for Scholarships and Bursaries will be provided to applicants on an individual basis. Once the fund has been spent for the academic year, students will not be able to apply until the next academic year.<br /><br />
          Please ask the Admissions Team{' '}
          <a href="mailto:admissions@trenteducation.ac.uk" className="adm-email-link">admissions@trenteducation.ac.uk</a>{' '}
          to see if there are funds available for Scholarships or Bursaries in the current academic year before submitting your application.
        </p>

        <div className="adm-sb-grid">
          <div className="adm-sb-card">
            <h3>Scholarships</h3>
            <p>The TEC scholarship programme is for students who can demonstrate that they have made outstanding achievements either academically, in their work, sports, arts or music. We will consider offering scholarships to cover the full costs of study to eligible applicants with evidence of outstanding achievements.</p>
          </div>
          <div className="adm-sb-card">
            <h3>Bursaries</h3>
            <p>The College also offers the opportunity for students from low-income backgrounds to apply for a Bursary that will contribute towards the cost of their studies at TEC.</p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '40px 0 12px' }}>Eligibility and Application Process</h3>
        <p style={{ lineHeight: 1.8, color: '#444', marginBottom: 32 }}>
          We offer Scholarships and Bursaries for all our fee-paying courses. Anyone applying for a Scholarship or Bursary must meet the entry requirements for the course and must complete the usual application process. Request for a scholarship or bursary should be sent to{' '}
          <a href="mailto:admissions@trenteducation.ac.uk" className="adm-email-link">admissions@trenteducation.ac.uk</a>{' '}
          along with a 500-word essay explaining in English why you should be a TEC Scholarship Student, or why you should be considered for a Bursary. Applicants for a Bursary may be required to provide evidence that they cannot finance the course themselves.<br /><br />
          You must submit your request for a Scholarship or Bursary at least one month before the term starts. Your request will be considered by the Senior Management Team (SMT) and you will receive their decision two weeks after you have sent your request.
        </p>

        {/* Criteria two columns */}
        <div className="adm-criteria-grid">
          <div>
            <h3 className="adm-criteria-title">Criteria for Offering a Scholarship</h3>
            <ul className="adm-criteria-list">
              {scholarshipCriteria.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="adm-criteria-title">Criteria for Offering a Bursary</h3>
            <ul className="adm-criteria-list">
              {bursaryCriteria.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>

        {/* Flowchart */}
        <div className="adm-flowchart">
          {[
            { num: '01', step: 'Enquire', desc: 'The Applicant sends an email to admissions@trenteducation.ac.uk to enquire if funds are available for a scholarship or bursary in the current academic year.' },
            { num: '02', step: 'Submit Essay', desc: 'If funds are available, the applicant emails a 500-word essay requesting either a Scholarship or Bursary to admissions@trenteducation.ac.uk.' },
            { num: '03', step: 'Decision', desc: 'The Admissions Team sends the essay to the Senior Management Team (SMT). The SMT decision is communicated to the applicant within 14 days.' },
          ].map((f, i) => (
            <div key={i} className="adm-flow-item">
              <div className="adm-flow-num">{f.num}</div>
              <div className="adm-flow-connector" />
              <h4 className="adm-flow-title">{f.step}</h4>
              <p className="adm-flow-desc">{linkifyEmails(f.desc)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Admission Policy ── */}
      <div className="adm-policy-banner">
        <div className="adm-policy-inner">
          <div className="adm-policy-text">
            <h3>Admission Policy</h3>
            <p>The College is dedicated to providing an admission process that is fair, transparent, and gives all applicants equal opportunities. The College accepts applications from people regardless of their background and actively promotes applications from under-represented communities.</p>
          </div>
          <a
            href="/assets/documents/policies/admissions.pdf"
            target="_blank"
            rel="noreferrer"
            className="adm-policy-btn"
          >
            <ArrowRight size={18} />
            Download Policy PDF
          </a>
        </div>
      </div>

      {/* ── Student Admissions Process (UK) ── */}
      <div className="container" style={{ maxWidth: 860, padding: '56px 20px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Student Admissions (UK students only)</h2>
        <p style={{ color: '#666', marginBottom: 28 }}>Step-by-step guide through the TEC admissions process.</p>
        <div className="adm-accordion">
          {admissionsSteps.map((step, i) => (
            <div key={i} className={`adm-acc-item ${openStep === i ? 'open' : ''}`}>
              <button className="adm-acc-header" onClick={() => setOpenStep(openStep === i ? null : i)}>
                <span className="adm-acc-num">{i + 1}</span>
                <span>{step.title}</span>
                {openStep === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openStep === i && (
                <div className="adm-acc-body">
                  <ul>
                    {step.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="adm-cta">
        <div className="adm-cta-inner">
          <div className="adm-cta-icon"><ClipboardList size={36} /></div>
          <h2>Ready to Apply?</h2>
          <p>Complete the online Student Application Form to share your details, course choice, and supporting documents. Our admissions team will review your application and be in touch shortly.</p>
          <Link to="/application-form" className="adm-cta-btn">
            Start Your Application <ArrowRight size={18} />
          </Link>
        </div>
      </div>

    </div>
  );
}
