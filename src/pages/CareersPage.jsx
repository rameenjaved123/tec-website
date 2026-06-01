import { Link } from 'react-router-dom';
import './InnerPage.css';
import PageHero from '../components/PageHero';
import './CoursePage.css';

const jobs = [
  {
    title: 'Marketing Executive (Nottingham)',
    positions: '1 Position',
    status: 'open',
    desc: 'Plans and delivers effective marketing campaigns to promote products and services, supporting brand growth and customer engagement.',
    applyLink: 'https://trenteducation.co.uk/enrol/job-application/?job=Marketing%20Executive',
    learnLink: '/marketing-executive',
  },
  {
    title: 'Lecturer',
    positions: null,
    status: 'open',
    desc: 'Responsible for delivering lectures, designing curriculum, and assessing student performance in a specific subject area at a tertiary level.',
    applyLink: 'https://trenteducation.co.uk/enrol/job-application/?job=Lecturer',
    learnLink: '/job-lecturer',
  },
  {
    title: 'Teaching Assistant (Leicester)',
    positions: '5 Positions',
    status: 'open',
    desc: 'Assists lecturers in preparing and delivering educational content, grading assignments, and supporting students in their academic journey.',
    applyLink: 'https://trenteducation.co.uk/enrol/job-application/?job=Teaching%20Assistant',
    learnLink: '/job-teaching-assistant',
  },
  {
    title: 'Student Support Officer',
    positions: null,
    status: 'open',
    desc: 'Provides guidance and support to students on various issues, including academic advice, mental health support, and career counseling',
    applyLink: 'https://trenteducation.co.uk/enrol/job-application/?job=Student%20Support%20Officer',
    learnLink: '/job-student-support-officer',
  },
  {
    title: 'Digital Marketing Executive',
    positions: null,
    status: 'closed',
    desc: 'Designs and implements digital marketing campaigns, manages social media profiles, and analyses digital data to optimise marketing strategies.',
    applyLink: 'https://trenteducation.co.uk/enrol/job-application/?job=Digital%20Marketing%20Executive',
    learnLink: '/digital-marketing-executive',
  },
  {
    title: 'Office Admin Manager',
    positions: null,
    status: 'closed',
    desc: 'Oversees daily administrative operations, manages office supplies, coordinates staff, and supports executive team functions.',
    applyLink: null,
    learnLink: '/job-office-admin-manager',
  },
  {
    title: 'Human Resource Officer',
    positions: null,
    status: 'closed',
    desc: 'Manages recruitment processes, employee relations, regulatory compliance, and staff development programs within the organisation.',
    applyLink: null,
    learnLink: '/job-human-resource-officer',
  },
  {
    title: 'Office Administrator & IT Assistant',
    positions: null,
    status: 'closed',
    desc: 'Handles general administrative duties while also providing basic IT support, troubleshooting technical issues, and maintaining IT equipment',
    applyLink: null,
    learnLink: '/job-office-admin-it-assistant',
  },
  {
    title: 'Academic Manager',
    positions: null,
    status: 'closed',
    desc: 'Responsible for the overall management of academic staff and programs, ensuring educational excellence and curriculum development.',
    applyLink: null,
    learnLink: '/job-academic-manager',
    learnDisabled: true,
  },
  {
    title: 'Education Officer',
    positions: null,
    status: 'closed',
    openedDate: '25th Dec 2023',
    closedDate: '1st Feb 2023',
    desc: 'Develops educational materials, programs, and initiatives to enhance the learning environment and educational outcomes for students.',
    applyLink: null,
    learnLink: null,
  },
  {
    title: 'Financial Account Manager',
    positions: null,
    status: 'closed',
    openedDate: '1st Feb 2023',
    closedDate: '15th March 2023',
    desc: 'Oversees financial accounts, ensuring accurate reporting and compliance with regulations. Develops financial strategies, prepares statements, and analyses data to support business growth and the organisation\'s educational mission.',
    applyLink: null,
    learnLink: null,
  },
];

export default function CareersPage() {
  const openJobs = jobs.filter(j => j.status === 'open');
  const closedJobs = jobs.filter(j => j.status === 'closed');

  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Careers at TEC"
        subtitle="Join our team and help shape the future of education"
        bgImage="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80"
        bgPosition="center 40%"
      />

      <div className="container inner-content">
        <p style={{ fontSize: '1rem', color: 'var(--tec-text-light)', lineHeight: '1.8', marginBottom: '12px', maxWidth: '800px' }}>
          Trent Education Centre (TEC) will be advertising new job opportunities from January 2024.
          Our job adverts will include a job description, person specification and details of how to
          apply for each vacancy. We welcome applications from people of all backgrounds.
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--tec-text-light)', lineHeight: '1.8', marginBottom: '40px', maxWidth: '800px' }}>
          TEC is an equal opportunities employer. All our hiring decisions are made fairly based upon
          qualifications and experience. We are committed to making reasonable adjustments where we
          can to enable disabled people to apply for any vacancy. Applicants will be required to
          provide references that testify they are suitable to work with adults at risk. Please check
          this link regularly to see what vacancies are available.
        </p>

        {/* Open positions */}
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--tec-green)', marginBottom: '16px' }}>
          Current Vacancies
        </h2>
        {openJobs.map((job, i) => (
          <div key={i} className="job-listing">
            <div className="job-header">
              <div>
                <div className="job-title">
                  {job.title}
                  {job.positions && <span style={{ fontSize: '0.8rem', color: 'var(--tec-gold)', fontWeight: 600, marginLeft: '10px' }}>{job.positions}</span>}
                </div>
              </div>
              <span className="job-badge open">Now Hiring</span>
            </div>
            <p className="job-desc">{job.desc}</p>
            <div className="job-actions">
              {job.applyLink && (
                <a href={job.applyLink} target="_blank" rel="noreferrer" className="job-apply">
                  Apply Here
                </a>
              )}
              {job.learnLink && (
                job.learnLink.startsWith('/')
                  ? <Link to={job.learnLink} className="job-learn">Learn More</Link>
                  : <a href={job.learnLink} target="_blank" rel="noreferrer" className="job-learn">Learn More</a>
              )}
            </div>
          </div>
        ))}

        {/* Closed positions */}
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--tec-text-light)', margin: '40px 0 16px' }}>
          Previous Vacancies
        </h2>
        {closedJobs.map((job, i) => (
          <div key={i} className="job-listing" style={{ opacity: 0.7 }}>
            <div className="job-header">
              <div className="job-title">{job.title}</div>
              <span className="job-badge closed">Job Closed</span>
            </div>
            <p className="job-desc">{job.desc}</p>
            {(job.openedDate || job.closedDate) && (
              <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--tec-text-light)' }}>
                {job.openedDate && <p style={{ margin: '2px 0' }}><strong>Job Opening Date:</strong> {job.openedDate}</p>}
                {job.closedDate && <p style={{ margin: '2px 0' }}><strong>Job Closing Date:</strong> {job.closedDate}</p>}
              </div>
            )}
            {job.learnLink && (
              <div className="job-actions">
                {job.learnDisabled ? (
                  <span className="job-learn" style={{ pointerEvents: 'none', opacity: 0.45, cursor: 'default' }}>Learn More</span>
                ) : job.learnLink.startsWith('/') ? (
                  <Link to={job.learnLink} className="job-learn">Learn More</Link>
                ) : (
                  <a href={job.learnLink} target="_blank" rel="noreferrer" className="job-learn">Learn More</a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
