import '../InnerPage.css';
import PageHero from '../../components/PageHero';

export default function OfficeAdminITAssistantPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Office Administrator & IT Assistant"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/site-photo-6.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Overview</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              We are seeking a highly organised and tech-savvy Office Administrator &amp; IT Assistant to
              join our team. The successful candidate will be responsible for ensuring smooth office
              operations and providing technical support to staff and students. This position requires
              excellent administrative skills, a strong understanding of IT systems, and the ability
              to manage multiple tasks efficiently.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}><strong>Office Management:</strong> Oversee day-to-day office operations, including managing schedules, coordinating meetings, and maintaining office supplies and equipment.</li>
              <li style={{ marginBottom: '10px' }}><strong>Administrative Support:</strong> Provide administrative assistance to staff and faculty, including preparing reports, handling correspondence, and organising events.</li>
              <li style={{ marginBottom: '10px' }}><strong>IT Support:</strong> Troubleshoot and resolve hardware and software issues. Provide technical support and training to staff and students.</li>
              <li style={{ marginBottom: '10px' }}><strong>Database Management:</strong> Maintain and update office databases, ensuring accuracy and confidentiality of information.</li>
              <li style={{ marginBottom: '10px' }}><strong>Documentation:</strong> Manage and organise important documents, including records, reports, and files, ensuring they are easily accessible.</li>
              <li style={{ marginBottom: '10px' }}><strong>Communication:</strong> Act as the point of contact for internal and external inquiries. Facilitate effective communication within the office.</li>
              <li style={{ marginBottom: '10px' }}><strong>Project Assistance:</strong> Support various office projects and initiatives as needed, ensuring timely completion and adherence to project goals.</li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Need from You</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>Qualifications:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>A Bachelor's degree in Business Administration, Information Technology, or a related field is preferred</li>
                  <li>Proven experience in an administrative or IT support role</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Skills:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Strong organisational and multitasking abilities</li>
                  <li>Excellent communication and interpersonal skills</li>
                  <li>Proficiency in office software (e.g., Microsoft Office Suite) and familiarity with IT systems and troubleshooting</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Attributes:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Detail-oriented and capable of managing various tasks simultaneously</li>
                  <li>Proactive and able to work independently as well as part of a team</li>
                  <li>Committed to providing high-quality administrative and IT support</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Experience:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Experience with office management and IT support in a professional setting is highly desirable</li>
                  <li>Familiarity with office equipment and technology</li>
                </ul>
              </li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Offer</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}>A competitive salary of £26,200, along with a comprehensive benefits package</li>
              <li style={{ marginBottom: '10px' }}>Opportunities for professional development and training in IT</li>
              <li style={{ marginBottom: '10px' }}>A dynamic work environment with a supportive team and growth opportunities</li>
            </ul>

          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Office Administrator &amp; IT Assistant</h3>
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
