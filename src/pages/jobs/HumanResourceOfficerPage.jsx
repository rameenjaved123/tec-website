import '../InnerPage.css';
import PageHero from '../../components/PageHero';

export default function HumanResourceOfficerPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Human Resource Officer"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/meeting.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Overview</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              We are looking for a knowledgeable and dedicated Human Resource Officer to join our team.
              The successful candidate will manage recruitment processes, employee relations, regulatory
              compliance, and staff development programmes within our organisation. This role is central
              to maintaining a positive, productive, and compliant workplace culture, supporting both
              the organisation's strategic goals and the wellbeing of our staff.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}><strong>Recruitment:</strong> Manage end-to-end recruitment processes including job advertising, shortlisting, interviewing, and onboarding of new staff, ensuring a positive candidate experience throughout.</li>
              <li style={{ marginBottom: '10px' }}><strong>Employee Relations:</strong> Support managers and staff in handling employee relations matters including grievances, disciplinaries, and performance improvement plans, in line with employment law and company policy.</li>
              <li style={{ marginBottom: '10px' }}><strong>Performance Management:</strong> Coordinate and support the performance appraisal process, providing guidance to managers on setting objectives, conducting reviews, and managing underperformance.</li>
              <li style={{ marginBottom: '10px' }}><strong>Training &amp; Development:</strong> Identify training and development needs across the organisation and coordinate the delivery of relevant programmes to support staff growth and compliance.</li>
              <li style={{ marginBottom: '10px' }}><strong>Compliance:</strong> Ensure HR practices comply with current employment legislation, safeguarding requirements, and organisational policies. Maintain up-to-date knowledge of relevant legal developments.</li>
              <li style={{ marginBottom: '10px' }}><strong>HR Administration:</strong> Maintain accurate and confidential HR records, manage payroll data in coordination with finance, and produce HR reports and metrics for senior management.</li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Need from You</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>Qualifications:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>A degree in Human Resources, Business Administration, or a related field</li>
                  <li>CIPD qualification (Level 3 or above) is highly preferred</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Skills:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Sound knowledge of UK employment law and HR best practices</li>
                  <li>Strong communication, negotiation, and interpersonal skills</li>
                  <li>Excellent organisational skills and attention to detail</li>
                  <li>Proficiency in HR information systems and Microsoft Office</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Attributes:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>High degree of confidentiality and professional integrity</li>
                  <li>Approachable and empathetic, with the ability to build trust across all levels of the organisation</li>
                  <li>Solution-focused and able to manage complex employee matters with sensitivity</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Experience:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Proven experience in an HR officer or generalist HR role</li>
                  <li>Experience managing recruitment and employee relations cases</li>
                  <li>Experience working within an education or public sector environment is advantageous</li>
                </ul>
              </li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Offer</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}>Competitive salary commensurate with experience</li>
              <li style={{ marginBottom: '10px' }}>Opportunities for career advancement and professional development</li>
              <li style={{ marginBottom: '10px' }}>A dynamic and supportive working environment</li>
            </ul>

          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Human Resource Officer</h3>
              <p style={{ color: '#999', fontWeight: 600, fontSize: '0.9rem', marginBottom: '24px' }}>Position Closed</p>
              <div
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 24px',
                  background: '#ccc',
                  color: '#666',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '6px',
                  letterSpacing: '0.5px',
                  cursor: 'not-allowed',
                }}
              >
                Applications Closed
              </div>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.82rem', marginTop: '16px', lineHeight: 1.7 }}>
                This vacancy is no longer accepting applications. Please check the Careers page for current openings.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
