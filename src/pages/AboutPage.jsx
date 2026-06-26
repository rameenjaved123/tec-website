import { Link } from 'react-router-dom';
import './InnerPage.css';
import PageHero from '../components/PageHero';

const stats = [
  { value: '83%',   label: 'Successful Placements' },
  { value: '1,200+', label: 'Students Referred' },
  { value: '1,000+', label: 'Student Satisfaction Rate' },
  { value: '12+',   label: 'Years in Operation' },
];

export default function AboutPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Background"
        subtitle="Trent Education Centre — empowering adults since 2012"
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
        bgPosition="center 50%"
      />

      <div className="container inner-content">
        <div className="two-col">
          <div className="main-col">

            <h4 style={{ color: 'var(--tec-green)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
              Welcome to TEC
            </h4>
            <p>
              Trent Education Centre (TEC) has been providing functional skills and vocational training
              courses to adults in Nottingham, Leicester and Birmingham since 2012.
            </p>
            <p>
              Many of the people we support believe that they have missed their chance for an education.
              They may have left school recently or many years ago, and lack the academic skills or
              confidence to study at a university. TEC exists to support such people. We help them build
              their self-esteem and competencies, so they can succeed in education at university level
              and go on to career success.
            </p>

            <h3 style={{ marginTop: '28px' }}>Our Holistic Approach to Education</h3>
            <p>
              We believe that the well-being and personal growth of our students are essential to their
              academic achievement and career success. We focus, therefore, on integrating personal,
              social, and emotional development, with the knowledge and skills required for
              university-level qualifications, and the modern workplace.
            </p>

            <h3 style={{ marginTop: '28px' }}>Future Plans</h3>
            <p>
              We have many students graduating from functional skills and vocational training courses
              who are looking for progression in university-level education. We have started offering
              higher education courses and aim to register with the Office for Students as an approved
              provider in the near future.
            </p>

          </div>

          <div className="side-col">
            <div className="side-card">
              <h4>Quick Links</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link to="/mission-values" style={{ color: 'var(--tec-green)', fontWeight: 500 }}>Mission &amp; Values →</Link></li>
                <li><Link to="/study-centres" style={{ color: 'var(--tec-green)', fontWeight: 500 }}>Our Study Centres →</Link></li>
                <li><Link to="/student-life" style={{ color: 'var(--tec-green)', fontWeight: 500 }}>Student Life →</Link></li>
                <li><Link to="/approvals" style={{ color: 'var(--tec-green)', fontWeight: 500 }}>Approvals →</Link></li>
                <li><Link to="/careers" style={{ color: 'var(--tec-green)', fontWeight: 500 }}>Careers →</Link></li>
                <li><Link to="/news-events" style={{ color: 'var(--tec-green)', fontWeight: 500 }}>News &amp; Events →</Link></li>
                <li><Link to="/contact" style={{ color: 'var(--tec-green)', fontWeight: 500 }}>Contact Us →</Link></li>
              </ul>
            </div>

            <div className="side-card green">
              <h4>Contact Us</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}>Head Office: Digital House 2.3, Clarendon Park, Nottingham, NG5 1AH</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}>
                📞 <a href="tel:+441157950171" style={{ color: 'var(--tec-gold-light)' }}>(+44) 1157950171</a>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}>
                📧 <a href="mailto:info@trenteducation.ac.uk" style={{ color: 'var(--tec-gold-light)' }}>info@trenteducation.ac.uk</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ background: 'var(--tec-green)', padding: '48px 0', margin: '0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            textAlign: 'center',
          }}>
            {stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--tec-gold)', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginTop: '8px', fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
