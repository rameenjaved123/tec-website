import './InnerPage.css';
import PageHero from '../components/PageHero';

export default function StudentSupportOfficerPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Student Support Officer"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/he-site-photo-1.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Overview</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              We are seeking a compassionate and resourceful Student Support Officer to join our team.
              The successful candidate will provide comprehensive support to students, helping them to
              overcome academic and personal challenges and achieve their full potential. This role
              requires empathy, strong communication skills, and the ability to work collaboratively
              with both students and staff to foster an inclusive and supportive learning environment.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}><strong>Student Welfare:</strong> Monitor and promote the general welfare of students, providing a first point of contact for any concerns or difficulties they may encounter during their studies.</li>
              <li style={{ marginBottom: '10px' }}><strong>Guidance and Counselling:</strong> Offer advice and guidance on academic, personal, and social issues, signposting students to appropriate external support services when required.</li>
              <li style={{ marginBottom: '10px' }}><strong>Programme Development:</strong> Assist in the development and delivery of student support programmes, workshops, and initiatives designed to enhance student wellbeing and academic performance.</li>
              <li style={{ marginBottom: '10px' }}><strong>Liaison and Advocacy:</strong> Act as a liaison between students and academic staff, advocating for student needs and helping to resolve any issues in a fair and constructive manner.</li>
              <li style={{ marginBottom: '10px' }}><strong>Crisis Management:</strong> Respond promptly and appropriately to student crises, including mental health emergencies, following established safeguarding procedures and escalating concerns as necessary.</li>
              <li style={{ marginBottom: '10px' }}><strong>Record Keeping:</strong> Maintain accurate and confidential records of student interactions, support plans, and outcomes in compliance with data protection regulations.</li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Need from You</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>Qualifications:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>A degree in a relevant field such as Social Work, Psychology, Education, or Counselling</li>
                  <li>A recognised counselling or student support qualification is desirable</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Skills:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Excellent communication, active listening, and interpersonal skills</li>
                  <li>Ability to manage sensitive and confidential information with discretion</li>
                  <li>Strong organisational skills and the ability to manage a varied caseload</li>
                  <li>Proficiency in IT and record-keeping systems</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Attributes:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Empathetic, patient, and non-judgmental approach</li>
                  <li>Commitment to equality, diversity, and inclusion</li>
                  <li>Resilient and able to work effectively under pressure</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Experience:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Previous experience in a student support, welfare, or guidance role within an educational setting</li>
                  <li>Knowledge of safeguarding legislation and best practices is highly desirable</li>
                </ul>
              </li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Offer</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}>Competitive salary of <strong>£26,200</strong> per annum</li>
              <li style={{ marginBottom: '10px' }}>Opportunities for continuous professional development and career progression</li>
              <li style={{ marginBottom: '10px' }}>A rewarding role with the opportunity to make a real difference in students' lives</li>
              <li style={{ marginBottom: '10px' }}>A supportive and collaborative team environment</li>
            </ul>

          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Student Support Officer</h3>
              <p style={{ color: 'var(--tec-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>Now Hiring</p>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.85rem', marginBottom: '24px' }}>£26,200 per annum</p>
              <a
                href="/job-application?job=Student%20Support%20Officer"
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
