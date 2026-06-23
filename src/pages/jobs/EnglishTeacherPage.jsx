import '../InnerPage.css';
import PageHero from '../../components/PageHero';

export default function EnglishTeacherPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="English Language Teacher"
        subtitle="Job description and person specification"
        bgImage="/assets/images/banners/englishBanner.png"
        bgPosition="center center"
      />

      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '8px', fontSize: '1.25rem' }}>Job Details</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '8px' }}>
              <strong>Reference:</strong> HR/TEC/00213
            </p>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '8px' }}>
              <strong>Reports to:</strong> Programme Leader and Director of Studies
            </p>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '8px' }}>
              <strong>Location:</strong> Nottingham (with hybrid working as required)
            </p>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              <strong>Contract:</strong> Full Time or Part Time positions available
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Purpose</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              English Language Teachers are responsible for teaching English skilfully and creatively
              to our motivated international EFL and local ESOL students at our Nottingham Centre. You
              will be expected to plan, prepare and deliver highly engaging student-centred English
              language lessons that are specifically designed to meet the needs of local and
              international students, helping them to achieve their goals in an inclusive, challenging
              and enjoyable learning environment. The post requires TEFLI status as defined by the
              British Council Accreditation Scheme.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Teaching Quality</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Delivering high-quality English language lessons to ESOL/EFL adults.</li>
              <li style={{ marginBottom: '8px' }}>Maintaining high standards of teaching, learning, and assessment.</li>
              <li style={{ marginBottom: '8px' }}>Applying the Trent Education Centre holistic approach to teaching English language.</li>
              <li style={{ marginBottom: '8px' }}>Creating engaging lesson plans and differentiated learning resources to ensure students meet clear individual and group learning objectives.</li>
              <li style={{ marginBottom: '8px' }}>Using appropriate methodologies for adult ESOL, EFL and Functional Skills English students.</li>
              <li style={{ marginBottom: '8px' }}>Conducting personal tutorials with students as and when required.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Assessments, Exams and Compliance</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Supporting students to prepare for exams and assessments so that they can attain qualifications if they wish.</li>
              <li style={{ marginBottom: '8px' }}>Completing student documentation, assessments and progress tracking.</li>
              <li style={{ marginBottom: '8px' }}>Monitoring attendance, student engagement, conduct and performance.</li>
              <li style={{ marginBottom: '8px' }}>Maintaining accurate and up-to-date academic records in line with British Council Accreditation Scheme requirements.</li>
              <li style={{ marginBottom: '8px' }}>Providing timely feedback and academic reports on students.</li>
              <li style={{ marginBottom: '8px' }}>Participating in student placement testing and marking and invigilating for exams as required.</li>
              <li style={{ marginBottom: '8px' }}>Completing all mandatory training and reading all required TEC policies in compliance with Safeguarding, Prevent, Anti-Bullying, Anti-Harassment and Sexual Misconduct and Health and Safety requirements.</li>
              <li style={{ marginBottom: '8px' }}>Upholding the principles of Freedom of Speech and Academic Freedom.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Teamwork and Quality Performance</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '8px' }}>Working closely with colleagues as part of a supportive team.</li>
              <li style={{ marginBottom: '8px' }}>Supporting admissions staff with student academic interviews and assessments to ensure they meet course entry requirements.</li>
              <li style={{ marginBottom: '8px' }}>Contributing positively to curriculum development and quality improvement and enhancement.</li>
              <li style={{ marginBottom: '8px' }}>Attending meetings and CPD training and workshops as and when required.</li>
              <li style={{ marginBottom: '8px' }}>Actively engaging in ongoing professional development in line with British Council Accreditation Scheme expectations.</li>
              <li style={{ marginBottom: '8px' }}>Promoting student welfare and following TEC's relevant procedures, escalating concerns appropriately.</li>
              <li style={{ marginBottom: '8px' }}>Maintaining high professional standards in line with TEC policies and British Council Accreditation Scheme expectations.</li>
              <li style={{ marginBottom: '8px' }}>Participating in lesson observations as part of TEC's quality assurance cycle.</li>
              <li style={{ marginBottom: '8px' }}>Supporting the Programme Leader and Director of Studies with planning and preparation for internal and external quality assurance checks and all British Council Accreditation Scheme requirements.</li>
            </ul>

            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px', fontStyle: 'italic' }}>
              This job description is not exhaustive, and duties may vary in line with organisational needs.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Person Specification</h3>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Essential Qualifications, Knowledge and Skills</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Degree level qualification</li>
              <li style={{ marginBottom: '8px' }}>CELTA/CertTESOL or equivalent (minimum)</li>
              <li style={{ marginBottom: '8px' }}>Experience with ESOL Skills for Life and Functional Skills English</li>
              <li style={{ marginBottom: '8px' }}>GCSE or equivalent Level 2 English and Maths (minimum)</li>
              <li style={{ marginBottom: '8px' }}>Excellent English language speaking and writing skills</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Desirable Qualifications, Knowledge and Skills</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '8px' }}>DELTA/DipTESOL or equivalent at Level 7</li>
              <li style={{ marginBottom: '8px' }}>Three years' experience or more teaching ESOL/EFL to adults at all levels</li>
              <li style={{ marginBottom: '8px' }}>Experience designing schemes of work, assessments and curriculum</li>
              <li style={{ marginBottom: '8px' }}>Understanding of British Council Accreditation Scheme requirements</li>
              <li style={{ marginBottom: '8px' }}>Strong organisational skills and ability to manage multiple priorities</li>
              <li style={{ marginBottom: '8px' }}>Experience with awarding body requirements (e.g., Ascentis, NCFE)</li>
              <li style={{ marginBottom: '8px' }}>Experience working in a British Council accredited centre</li>
              <li style={{ marginBottom: '8px' }}>Experience preparing for British Council inspections</li>
            </ul>

            <div style={{ background: 'var(--tec-gray)', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
              <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', margin: 0 }}>
                <strong>Please note:</strong> All applicants must provide two referees that we can contact directly.
                Any offer of work will be conditional upon the receipt of two satisfactory references.
                To apply, please send your CV and a short cover letter using the <strong>Apply Now</strong> button.
              </p>
            </div>

          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>English Language Teacher</h3>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.85rem', marginBottom: '4px' }}>Nottingham · Full Time / Part Time</p>
              <p style={{ color: 'var(--tec-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '24px' }}>Now Hiring</p>
              <a
                href="/job-application?job=English%20Language%20Teacher"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 24px',
                  background: 'var(--tec-green)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 14px rgba(26,58,42,0.2)',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--tec-gold)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--tec-green)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Apply Now →
              </a>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.82rem', marginTop: '16px', lineHeight: 1.7 }}>
                To apply, click the button above or visit the Careers page for more details.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
