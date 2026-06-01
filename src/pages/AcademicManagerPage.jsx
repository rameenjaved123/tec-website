import { Link } from 'react-router-dom';
import './InnerPage.css';
import PageHero from '../components/PageHero';

export default function AcademicManagerPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Academic Manager"
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
              Trent Education Centre (TEC) is seeking an experienced and dynamic Academic Manager to
              join our growing institution. As an Academic Manager, you will play a pivotal role in
              shaping the academic landscape of our institution. Your responsibilities will encompass a
              wide range of tasks aimed at fostering an environment of excellence, innovation, and
              continuous improvement. We are looking for a dedicated professional who can lead our
              academic team towards achieving the highest educational standards.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '14px' }}>
                <strong>Programme Management:</strong> Oversee the development, implementation, and evaluation of academic programmes. Ensure all programmes meet the standards set by the awarding bodies and align with the institution's educational goals.
              </li>
              <li style={{ marginBottom: '14px' }}>
                <strong>Faculty Support:</strong> Provide leadership and support to academic staff, including recruitment, induction, performance management, and professional development. Foster a culture of collaboration and continuous improvement among faculty members.
              </li>
              <li style={{ marginBottom: '14px' }}>
                <strong>Student Success:</strong> Implement strategies to enhance student engagement, retention, and achievement. Oversee the provision of student support services to ensure an inclusive and supportive learning environment.
              </li>
              <li style={{ marginBottom: '14px' }}>
                <strong>Curriculum Development:</strong> Lead the design and review of the curriculum to ensure it is current, relevant, and meets the needs of our diverse student population. Incorporate innovative teaching methodologies and technology-enhanced learning.
              </li>
              <li style={{ marginBottom: '14px' }}>
                <strong>Quality Assurance:</strong> Ensure compliance with internal quality assurance processes and external accreditation requirements. Conduct regular reviews and audits of academic performance and outcomes.
              </li>
              <li style={{ marginBottom: '14px' }}>
                <strong>Administrative Duties:</strong> Manage academic resources efficiently, including budgets, facilities, and educational materials. Prepare reports and documentation for internal and external stakeholders.
              </li>
              <li style={{ marginBottom: '14px' }}>
                <strong>Research and Innovation:</strong> Promote a culture of research and scholarship within the institution. Identify opportunities for funding, partnerships, and collaborative projects that can enhance the academic profile of TEC.
              </li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Need From You</h3>

            <h4 style={{ color: 'var(--tec-green)', fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Qualifications</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>A Master's degree or PhD in a relevant field is required. An educational qualification or professional development in higher education management is desirable.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-green)', fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Skills</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Strong leadership and management skills with the ability to motivate and inspire staff.</li>
              <li style={{ marginBottom: '8px' }}>Excellent communication and interpersonal skills, capable of building relationships at all levels.</li>
              <li style={{ marginBottom: '8px' }}>Strategic thinker with a proven track record in academic management and curriculum development.</li>
              <li style={{ marginBottom: '8px' }}>Proficient in the use of educational technologies and data management systems.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-green)', fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Attributes</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Committed to equality, diversity, and inclusion within the academic setting.</li>
              <li style={{ marginBottom: '8px' }}>Adaptable and resilient, able to thrive in a fast-paced and changing environment.</li>
              <li style={{ marginBottom: '8px' }}>A passion for education and a commitment to student success and wellbeing.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-green)', fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Experience</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '8px' }}>Significant experience in an academic management role within higher or further education.</li>
              <li style={{ marginBottom: '8px' }}>Experience in managing and developing curriculum and academic programmes.</li>
              <li style={{ marginBottom: '8px' }}>Demonstrated ability to manage budgets and resources effectively.</li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Offer</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '8px' }}>A competitive salary commensurate with experience and qualifications.</li>
              <li style={{ marginBottom: '8px' }}>Opportunities for professional development and career advancement.</li>
              <li style={{ marginBottom: '8px' }}>A vibrant and supportive academic community committed to excellence in education.</li>
            </ul>

          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Academic Manager</h3>
              <span style={{
                display: 'inline-block',
                background: '#f0f0f0',
                color: '#888',
                fontWeight: 600,
                fontSize: '0.85rem',
                padding: '4px 12px',
                borderRadius: '50px',
                marginBottom: '24px',
              }}>
                Position Closed
              </span>

              <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px', marginTop: '4px' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--tec-text-light)', lineHeight: 1.7, margin: '0 0 16px' }}>
                  This position is currently closed. Check our Careers page for current openings.
                </p>
                <Link
                  to="/careers"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px 20px',
                    background: 'var(--tec-green)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    letterSpacing: '0.4px',
                    marginBottom: '16px',
                  }}
                >
                  View Current Vacancies →
                </Link>
              </div>

              <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px', marginTop: '4px' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--tec-green)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  Contact Us
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--tec-text-light)', lineHeight: 1.75, margin: 0 }}>
                  Nottingham NG5 1AH<br />
                  <a href="tel:+441157950171" style={{ color: 'var(--tec-green)', textDecoration: 'none' }}>+44 115 795 0171</a><br />
                  <a href="mailto:info@trenteducation.co.uk" style={{ color: 'var(--tec-green)', textDecoration: 'none' }}>info@trenteducation.co.uk</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
