import '../InnerPage.css';
import PageHero from '../../components/PageHero';

export default function OfficeAdminManagerPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Office Admin Manager"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/site-photo-3.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Overview</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              We are seeking an experienced and highly organised Office Admin Manager to oversee the
              day-to-day administrative operations of our centre. The successful candidate will play a
              key role in ensuring the smooth running of our offices, coordinating staff activities,
              and supporting the executive team with a broad range of administrative functions.
              This is a fantastic opportunity for a proactive and detail-oriented professional to
              contribute to a growing education provider.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}><strong>Office Management:</strong> Oversee all aspects of day-to-day office operations, ensuring processes run efficiently and that the office environment is well-maintained and organised.</li>
              <li style={{ marginBottom: '10px' }}><strong>Staff Supervision:</strong> Manage and support administrative staff, including scheduling, performance reviews, and day-to-day line management responsibilities.</li>
              <li style={{ marginBottom: '10px' }}><strong>Resource Management:</strong> Manage office supplies, equipment, and facilities, ensuring adequate stock levels and coordinating procurement as required.</li>
              <li style={{ marginBottom: '10px' }}><strong>Administrative Support:</strong> Provide high-level administrative support to the executive team, including diary management, correspondence, and preparation of reports and presentations.</li>
              <li style={{ marginBottom: '10px' }}><strong>Financial Oversight:</strong> Assist with budget management for office operations, processing invoices, and maintaining accurate financial records in coordination with the finance team.</li>
              <li style={{ marginBottom: '10px' }}><strong>Compliance:</strong> Ensure all office activities comply with relevant policies, procedures, health and safety regulations, and data protection legislation.</li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Need from You</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>Qualifications:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>A degree in Business Administration, Management, or a related discipline is preferred</li>
                  <li>Relevant professional qualifications in administration or management are desirable</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Skills:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Exceptional organisational and multitasking abilities</li>
                  <li>Strong communication skills, both written and verbal</li>
                  <li>Proficiency in Microsoft Office Suite and office management software</li>
                  <li>Ability to manage competing priorities and meet deadlines under pressure</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Attributes:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Proactive, resourceful, and solutions-focused approach</li>
                  <li>High level of discretion and ability to handle confidential information</li>
                  <li>Strong leadership qualities with the ability to motivate and develop a team</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Experience:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Proven experience in an office management or senior administrative role</li>
                  <li>Experience in the education or public sector is advantageous</li>
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
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Office Admin Manager</h3>
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
