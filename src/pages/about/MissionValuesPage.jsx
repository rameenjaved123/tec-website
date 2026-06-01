import { Link } from 'react-router-dom';
import '../InnerPage.css';
import './MissionValuesPage.css';
import PageHero from '../../components/PageHero';

const values = [
  { label: 'Respect', desc: 'Commending courage and commitment for those returning to education.' },
  { label: 'Integrity', desc: 'Authenticity and credibility in academic and working practices.' },
  { label: 'Inclusion', desc: 'Widening participation so that no one gets left behind.' },
  { label: 'Creativity', desc: 'Experimenting with new approaches to learning, teaching, and assessment.' },
  { label: 'Aspiration', desc: 'Striving to reach beyond expectations.' },
  { label: 'Sustainability', desc: 'Securing a future for individuals, their families, and communities.' },
  { label: 'Professionalism', desc: 'Upholding high academic and service standards and sharing expertise.' },
];

const priorities = [
  { num: '01', text: 'Deliver <strong>high-quality</strong> learning, teaching, and assessment from basic skills up to and including <strong>university-level</strong> education.' },
  { num: '02', text: 'Widen university access to people from under-represented and disadvantaged communities.' },
  { num: '03', text: 'Give people the opportunity to develop the employability skills they need for gainful employment and career success.' },
  { num: '04', text: 'Enhance learning through the ongoing development and improvement of the TEC holistic approach to education.' },
  { num: '05', text: 'Develop the quality and international recognition of our English language courses to meet the needs of local and international students aiming to improve their life chances.' },
];

export default function MissionValuesPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Mission, Vision & Values"
        subtitle="The principles that guide everything we do at Trent Education Centre"
        bgImage="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&q=80"
        bgPosition="center 40%"
      />

      <div className="container inner-content">
        {/* Mission & Vision */}
        <div className="mv-split">
          <div className="mv-card mission">
            <div className="mv-label">Our Mission</div>
            <p>
              To provide students in local and international communities with the holistic education
              they need to enhance their life chances.
            </p>
          </div>
          <div className="mv-card vision">
            <div className="mv-label">Our Vision</div>
            <p>
              To become a leading provider of lifelong learning, supporting adults from basic skills
              and further education through to higher education and sustained career success.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <section className="mv-section">
          <h2>Core Values</h2>
          <p className="mv-intro">
            Trent Education Centre prioritises the well-being and growth of the people we exist to
            serve through a high-quality education, leading to career success. Our values include:
          </p>
          <div className="mv-values-row">
            <div className="values-grid">
              {values.map((v, i) => (
                <div key={i} className="value-pill">
                  <span className="value-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{v.label}</strong>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mv-values-img">
              <img
                src="/assets/images/general/mission-values.png"
                alt="TEC students and staff"
                style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', height: '100%', minHeight: '320px' }}
              />
            </div>
          </div>
        </section>

        {/* Priorities */}
        <section className="mv-section">
          <h2>Our priorities meet the needs of the communities we serve</h2>
          <div className="priorities-list">
            {priorities.map((p, i) => (
              <div key={i} className="priority-item">
                <div className="priority-num">{p.num}</div>
                <p dangerouslySetInnerHTML={{ __html: p.text }} />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="cta-box" style={{ marginTop: '8px' }}>
          <div>
            <h3>Be part of our vision</h3>
            <p>Join us today and start shaping your tomorrow!</p>
            <Link to="/apply" className="btn-gold" style={{ display: 'inline-block' }}>
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
