import { Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, GraduationCap, CalendarDays, PoundSterling } from 'lucide-react';
import '../../InnerPage.css';
import PageHero from '../../../components/PageHero';

const courses = [
  {
    title: 'ATHE Level 4 Extended Diploma in Business and Management',
    duration: '1 Year',
    mode: 'Blended Learning',
    intake: 'February / September',
    fee: '£4,000 per year (UK students)',
    description:
      'A 120-credit qualification equivalent to the first year of a university degree. Covers 8 units across a wide range of business and management topics. Students progress to Level 5 upon completion.',
    modules: [],
    link: '/athe-level-4',
  },
  {
    title: 'ATHE Level 5 Extended Diploma in Business and Management',
    duration: '1 Year',
    mode: 'Blended Learning',
    intake: 'January / August',
    fee: '£4,000 per year (UK students)',
    description:
      'A 120-credit qualification building on Level 4. Covers advanced business and management topics, preparing students for senior roles or a Level 6 top-up degree at a partner university.',
    modules: [],
    link: '/athe-level-5',
  },
  {
    title: 'Pearson BTEC Level 4 & 5 Higher National Diploma in Business',
    duration: '2 Years',
    mode: 'Blended Learning',
    intake: 'January / September',
    fee: '£4,000 per year (UK students)',
    description:
      'A two-year programme (240 credits) providing a thorough grounding in key business concepts and practical skills. Graduates may enter the second or third year of a bachelor\'s degree at many universities.',
    modules: [],
    link: '/btec-hnd',
  },
];

export default function HigherEducationPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Higher Education Courses"
        subtitle="Advance your academic and professional credentials"
        bgImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80"
      >
        <span className="info-badge"><GraduationCap size={14} /> Level 4 &amp; 5 Qualifications</span>
        <span className="info-badge"><MapPin size={14} /> Nottingham · Leicester · Birmingham</span>
      </PageHero>

      <div className="container inner-content">
        <p style={{ fontSize: '1.05rem', color: 'var(--tec-text-light)', margin: '0 0 36px', textAlign: 'center' }}>
          Our Higher Education courses are ideal for learners looking to progress into degree-level
          study or advance their careers in business and management.
        </p>

        {courses.map((course, i) => (
          <div key={i} style={{ marginBottom: '48px', borderBottom: '1px solid #eee', paddingBottom: '40px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--tec-green)', marginBottom: '12px' }}>
              {course.title}
            </h2>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span className="info-badge" style={{ background: 'var(--tec-green)', color: 'white' }}>
                <Clock size={13} /> {course.duration}
              </span>
              <span className="info-badge" style={{ background: 'var(--tec-green)', color: 'white' }}>
                <MapPin size={13} /> {course.mode}
              </span>
              <span className="info-badge" style={{ background: 'var(--tec-green)', color: 'white' }}>
                <CalendarDays size={13} /> Intake: {course.intake}
              </span>
              <span className="info-badge" style={{ background: 'var(--tec-gold)', color: 'white' }}>
                <PoundSterling size={13} /> {course.fee}
              </span>
            </div>
            <p style={{ color: 'var(--tec-text-light)', lineHeight: '1.8', marginBottom: '20px' }}>
              {course.description}
            </p>
            {course.modules.length > 0 && (
              <>
                <h4 style={{ fontWeight: 700, color: 'var(--tec-green)', marginBottom: '12px' }}>Key Modules</h4>
                <div className="course-modules">
                  {course.modules.map((m, j) => (
                    <div key={j} className="module-item">
                      <CheckCircle size={15} />
                      {m}
                    </div>
                  ))}
                </div>
              </>
            )}
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
