import './InnerPage.css';
import PageHero from '../components/PageHero';

export default function LecturerPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Lecturer"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/site-photo-1.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Overview</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              We are seeking a dedicated and knowledgeable Lecturer to join our academic team. The
              successful candidate will be responsible for delivering high-quality lectures, engaging
              with students, and contributing to our academic research goals. This position requires a
              passion for teaching, a deep understanding of the subject matter, and the ability to
              inspire and develop students at the university level.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}><strong>Course Preparation:</strong> Design and update course materials, including syllabi, lectures, readings, and assignments, ensuring they meet the learning objectives.</li>
              <li style={{ marginBottom: '10px' }}><strong>Teaching:</strong> Deliver engaging and informative lectures to undergraduate or graduate students. Use various teaching methods to cater to different learning styles.</li>
              <li style={{ marginBottom: '10px' }}><strong>Assessment:</strong> Develop and administer assessments to monitor student progress. Provide timely and constructive feedback to students.</li>
              <li style={{ marginBottom: '10px' }}><strong>Student Support:</strong> Offer office hours and academic guidance to students, helping them navigate challenges and achieve their educational goals.</li>
              <li style={{ marginBottom: '10px' }}><strong>Research:</strong> Conduct scholarly research in your field of expertise. Publish findings in peer-reviewed journals and present at conferences.</li>
              <li style={{ marginBottom: '10px' }}><strong>Departmental Contributions:</strong> Participate in departmental meetings, serve on academic committees, and assist with the development of educational programs.</li>
              <li style={{ marginBottom: '10px' }}><strong>Continuous Learning:</strong> Stay updated with the latest teaching methods and advancements in your field to enhance educational practices.</li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Need from You</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}><strong>Qualifications:</strong> Master's degree required; PhD highly preferred. Proven experience as a Lecturer, Instructor, or similar teaching role in higher education.</li>
              <li style={{ marginBottom: '10px' }}><strong>Skills:</strong> Strong communication and presentation skills. Ability to inspire and motivate students. Proficient in curriculum and program development. Excellent organisational and time-management skills.</li>
              <li style={{ marginBottom: '10px' }}><strong>Attributes:</strong> Passionate about education and lifelong learning. Approachable and empathetic towards students. Commitment to maintaining high academic standards and integrity.</li>
              <li style={{ marginBottom: '10px' }}><strong>Experience:</strong> A track record of published research and participation in academic communities is highly desirable.</li>
            </ul>

          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Lecturer</h3>
              <p style={{ color: 'var(--tec-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '24px' }}>Now Hiring</p>
              <a
                href="https://trenteducation.co.uk/enrol/job-application/?job=Lecturer"
                target="_blank"
                rel="noopener noreferrer"
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
