import { Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, CalendarDays, Award } from 'lucide-react';
import '../../InnerPage.css';
import PageHero from '../../../components/PageHero';

const courses = [
  {
    title: 'OTHM Level 3 Diploma in Beauty Therapy',
    duration: '600 Hours',
    mode: 'Onsite',
    intake: 'Every Month',
    awarding: 'OTHM',
    description:
      'Develops your skills as a beauty therapist to provide treatments to professional standards. Extending your knowledge beyond Level 2, this 60-credit diploma covers the knowledge, skills and competencies required to administer the most up-to-date treatments in the beauty industry safely and appropriately.',
    modules: [
      'Health and Safety Practice in the Salon',
      'Client Care and Communication',
      'Facial Electrical Treatments',
      'Body Electrical Treatments',
      'Body Massage',
      'Plus two optional units (e.g. Hot Stone Therapy, Aromatherapy Massage)',
    ],
    link: '/othm-beauty-therapy-level-3',
  },
  {
    title: 'OTHM Level 3 Certificate in Facial Treatments',
    duration: '270 Hours',
    mode: 'Onsite',
    intake: 'Every Month',
    awarding: 'OTHM',
    description:
      'Provides learners with the knowledge and understanding required to provide facial treatments. This 26-credit certificate equips learners with the underpinning knowledge and skills required to succeed in employment or further studies in the beauty and complementary therapy sector.',
    modules: [
      'Health and Safety Practice in the Salon',
      'Client Care and Communication',
      'Anatomy and Physiology for Facial Treatments',
      'Provide Facial Treatments',
    ],
    link: '/othm-facial-treatments-level-3',
  },
];

export default function OTHMCoursesPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="OTHM Beauty & Complementary Therapy Courses"
        subtitle="Professional beauty therapy qualifications awarded by OTHM"
        bgImage="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
        bgPosition="center 45%"
      />

      <div className="container inner-content">
        <p style={{ fontSize: '1.05rem', color: 'var(--tec-text-light)', margin: '0 0 36px', textAlign: 'center' }}>
          Our OTHM beauty therapy courses are practical, industry-focused qualifications delivered onsite at
          Trent Education Centre, designed to prepare learners for employment or further study in the beauty
          and complementary therapy sector.
        </p>

        {courses.map((course, i) => (
          <div key={i} style={{ marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '36px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--tec-green)', marginBottom: '12px' }}>
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
              <span className="info-badge" style={{ background: '#555', color: 'white' }}>
                <Award size={13} /> {course.awarding}
              </span>
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
