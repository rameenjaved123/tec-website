import { Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, CalendarDays, PoundSterling, Award } from 'lucide-react';
import './InnerPage.css';
import PageHero from '../components/PageHero';

const courses = [
  {
    title: 'ATHE Level 3 Diploma in Business',
    duration: '12 Weeks',
    mode: 'Onsite',
    intake: 'January / April / June / October',
    fee: '£1,987 (UK students)',
    awarding: 'ATHE',
    description:
      'A 60-credit qualification equivalent to an A Level or Access to Higher Education qualification. Provides knowledge and understanding of the business environment and how businesses operate. Regulated by Ofqual and widely recognised by employers.',
    modules: [
      'Unit 1: Business Environment (10 Credits)',
      'Unit 2: How Businesses and Organisations Work (10 Credits)',
      'Unit 3: Business Communication (10 Credits)',
      'Unit 4: Working in Teams (10 Credits)',
      'Unit 5: Market Research (10 Credits)',
    ],
    link: '/athe-level-3',
  },
  {
    title: 'NCFE Level 1 Functional Skills Qualification in Maths',
    duration: '6 Weeks',
    mode: 'Onsite',
    intake: 'January / April / June / October',
    fee: '£700 (UK students)',
    awarding: 'NCFE & Open Awards',
    description:
      'Nationally recognised maths qualification for everyday life and the workplace. Ideal for learners who want to develop and demonstrate their mathematical skills for employment, further education, or daily life. No prior qualifications required.',
    modules: ['Number & place value', 'Fractions, decimals & percentages', 'Ratio & proportion', 'Measurements', 'Handling & interpreting data', 'Problem solving'],
    link: '/ncfe-maths-l1',
  },
  {
    title: 'NCFE Level 2 Functional Skills Qualification in Maths',
    duration: '6 Weeks',
    mode: 'Onsite',
    intake: 'January / April / June / October',
    fee: '£700 (UK students)',
    awarding: 'NCFE & Open Awards',
    description:
      'Equivalent to a GCSE Grade C/4 in Maths and widely recognised by employers and universities. Demonstrates the ability to apply mathematical thinking to solve problems in the workplace and real-life situations. Opens doors to A Levels, Level 3 Diplomas, and apprenticeships.',
    modules: ['Number & place value', 'Fractions, decimals & percentages', 'Ratio & proportion', 'Measurements', 'Handling & interpreting data', 'Problem solving'],
    link: '/ncfe-maths-l2',
  },
  {
    title: 'SIA Level 2 Award for Door Supervisors in the Private Security Industry (BIIAB)',
    duration: '6 Days + 1 Day First Aid',
    mode: 'Onsite',
    intake: 'Every Week',
    fee: '£399 (UK students)',
    awarding: 'Pearson',
    description:
      'Equips learners with the knowledge and skills required to work as a door supervisor. Successful completion fulfils one of the requirements to apply for an SIA Door Supervisor licence. Includes mandatory BIIAB Level 3 Award in Emergency First Aid at Work.',
    modules: [
      'Unit 1: Working within the Private Security Industry',
      'Unit 2: Working as a Door Supervisor within the Private Security Industry',
      'Unit 3: Conflict Management within the Private Security Industry',
      'Unit 4: Physical Intervention Skills in the Private Security Industry',
    ],
    link: '/sia-door-supervisors',
  },
  {
    title: 'Digital Skills for Beginners',
    duration: '6 Weeks',
    mode: 'Onsite',
    intake: 'Monthly',
    fee: 'FREE for Home (UK) students',
    awarding: null,
    description:
      'For adults new to digital devices who need support with essential applications — using devices, online shopping, email, and social media. Build your confidence, support your children with homework, and strengthen your readiness to re-enter the job market.',
    modules: [
      'Week 1: Getting Started with Digital Devices, Navigating the Internet & Social Media',
      'Week 2: Mastering Email and Online Communication',
      'Week 3: Microsoft Office and Job Search Skills',
      'Week 4: E-Commerce and Safe Online Food Ordering',
      'Week 5: Staying Connected Through Video Calls',
      'Week 6: Best Practices for Online Security',
      'Week 7: Practical Assessment',
    ],
    link: '/digital-skills',
  },
];

export default function FurtherEducationPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Further Education Courses"
        subtitle="Practical qualifications to advance your skills and career"
        bgImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80"
        bgPosition="center 40%"
      />

      <div className="container inner-content">
        <p style={{ fontSize: '1.05rem', color: 'var(--tec-text-light)', marginBottom: '36px', maxWidth: '700px' }}>
          Our Further Education courses are designed for adult learners looking to upskill, gain new
          qualifications, or prepare for higher education and employment.
        </p>

        {courses.map((course, i) => (
          <div key={i} style={{ marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '36px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--tec-green)', marginBottom: '12px' }}>
              {course.title}
            </h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span className="info-badge" style={{ background: 'var(--tec-green)', color: 'white' }}>
                <Clock size={13} /> {course.duration}
              </span>
              <span className="info-badge" style={{ background: 'var(--tec-green)', color: 'white' }}>
                <MapPin size={13} /> {course.mode}
              </span>
              <span className="info-badge" style={{ background: 'var(--tec-green)', color: 'white' }}>
                <CalendarDays size={13} /> {course.intake}
              </span>
              <span className="info-badge" style={{ background: course.fee.startsWith('FREE') ? '#2e7d32' : 'var(--tec-gold)', color: 'white' }}>
                <PoundSterling size={13} /> {course.fee}
              </span>
              {course.awarding && (
                <span className="info-badge" style={{ background: '#555', color: 'white' }}>
                  <Award size={13} /> {course.awarding}
                </span>
              )}
            </div>
            <p style={{ color: 'var(--tec-text-light)', lineHeight: '1.8', marginBottom: '16px' }}>
              {course.description}
            </p>
            <div className="course-modules">
              {course.modules.map((m, j) => (
                <div key={j} className="module-item">
                  <CheckCircle size={15} /> {m}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
              <Link to={course.link} className="btn-gold" style={{ display: 'inline-block' }}>
                Course Details
              </Link>
              <Link to="/apply" style={{
                display: 'inline-block', padding: '12px 28px', background: 'transparent',
                border: '2px solid var(--tec-green)', color: 'var(--tec-green)',
                borderRadius: '50px', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s'
              }}>
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
