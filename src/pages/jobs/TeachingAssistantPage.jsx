import '../InnerPage.css';
import PageHero from '../../components/PageHero';

export default function TeachingAssistantPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Teaching Assistant"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/site-photo-2.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            {/* Job details block */}
            <div style={{ background: 'var(--tec-gray)', borderRadius: '10px', padding: '20px 24px', marginBottom: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {[
                { label: 'Salary', value: '£25,000 – £31,000' },
                { label: 'Hours', value: '37.5 hours/week' },
                { label: 'Job Type', value: 'Full Time' },
                { label: 'Schedule', value: 'Monday – Friday' },
                { label: 'Vacancies', value: '12 Positions' },
                { label: 'Location', value: 'Nottingham – Leicester' },
                { label: 'Deadline', value: '01/05/2025' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: 'var(--tec-green)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.9rem', color: 'var(--tec-text-light)', fontWeight: 500 }}>{value}</p>
                </div>
              ))}
            </div>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Overview</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '16px' }}>
              We are seeking a dedicated and enthusiastic Teaching Assistant to join our academic team.
              The successful candidate will work alongside lecturers to support students in their learning
              journey, helping to create an inclusive and productive educational environment.
            </p>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              This is an exciting opportunity to contribute to the growth and success of our students,
              helping them to achieve their academic and personal goals. As a Teaching Assistant, you
              will play a vital role in the day-to-day functioning of our educational programmes across
              our Nottingham and Leicester study centres.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}>Assist lecturers in preparing and delivering educational content, including presentations, handouts, and digital resources.</li>
              <li style={{ marginBottom: '10px' }}>Support students individually or in small groups to reinforce learning and aid understanding of course material.</li>
              <li style={{ marginBottom: '10px' }}>Grade assignments, provide constructive feedback, and maintain accurate records of student performance.</li>
              <li style={{ marginBottom: '10px' }}>Help to create and maintain a positive, inclusive, and safe learning environment in the classroom.</li>
              <li style={{ marginBottom: '10px' }}>Monitor student attendance, engagement, and progress, reporting any concerns to the relevant lecturer or pastoral team.</li>
              <li style={{ marginBottom: '10px' }}>Assist in organising and supervising field trips, workshops, and other educational activities.</li>
              <li style={{ marginBottom: '10px' }}>Provide pastoral support and guidance to students on academic matters, signposting to further support when needed.</li>
              <li style={{ marginBottom: '10px' }}>Support the administration of examinations and assessments, including invigilation duties.</li>
              <li style={{ marginBottom: '10px' }}>Assist in updating and maintaining course materials and learning resources in line with awarding body requirements.</li>
              <li style={{ marginBottom: '10px' }}>Liaise with external stakeholders, parents, and guardians as appropriate.</li>
              <li style={{ marginBottom: '10px' }}>Participate in staff meetings, training sessions, and professional development activities.</li>
              <li style={{ marginBottom: '10px' }}>Support students with special educational needs or disabilities, implementing appropriate accommodations.</li>
              <li style={{ marginBottom: '10px' }}>Assist with the preparation of schemes of work and lesson plans under the direction of the lead lecturer.</li>
              <li style={{ marginBottom: '10px' }}>Contribute to the overall smooth running of the academic team and college operations.</li>
              <li style={{ marginBottom: '10px' }}>Maintain up-to-date knowledge of curriculum content, assessment criteria, and awarding body guidelines.</li>
              <li style={{ marginBottom: '10px' }}>Uphold and promote the college's values, policies, and safeguarding procedures at all times.</li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Need from You</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>Qualifications (one of the following):</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>A degree in a relevant subject area, or</li>
                  <li>A recognised teaching qualification (e.g. PGCE, CertEd, PTLLS), or</li>
                  <li>At least 2 years of relevant experience in an educational or training environment</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Essential:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Enhanced DBS check (or willingness to obtain one)</li>
                  <li>Strong communication and interpersonal skills</li>
                  <li>Competency with technology, including learning management systems and Microsoft Office</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Desirable:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Industry experience relevant to the subject area being taught</li>
                  <li>Previous experience in a teaching or tutoring role</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Benefits:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Company pension scheme</li>
                  <li>Generous annual leave entitlement</li>
                  <li>Supportive and collaborative team environment</li>
                </ul>
              </li>
            </ul>

            <div style={{ background: '#f0f7f2', borderLeft: '4px solid var(--tec-green)', borderRadius: '6px', padding: '16px 20px', marginBottom: '24px' }}>
              <p style={{ margin: 0, lineHeight: 1.8, color: 'var(--tec-text-light)', fontSize: '0.9rem' }}>
                Trent Education Centre is committed to equality, diversity, and inclusion. We welcome
                applications from individuals of all backgrounds. All successful candidates will be
                subject to an Enhanced DBS check. Please note that we are unable to offer sponsorship
                for this role; applicants must have the right to work in the UK.
              </p>
            </div>

          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Teaching Assistant</h3>
              <p style={{ color: 'var(--tec-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>Now Hiring: 12 Positions</p>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.85rem', marginBottom: '24px' }}>Nottingham – Leicester</p>
              <a
                href="/job-application?job=Teaching%20Assistant"
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
