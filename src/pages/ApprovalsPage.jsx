import { Link } from 'react-router-dom';
import './InnerPage.css';
import './ApprovalsPage.css';
import PageHero from '../components/PageHero';

const awardingOrgs = [
  {
    name: 'Pearson',
    logo: '/assets/logos/pearson.png',
    desc: 'Pearson is a leading international education company, offering a wide range of qualifications, including BTEC and GCSE, recognized for their high standards and relevance to industry needs.',
    link: '/awarding-organisations',
  },
  {
    name: 'ATHE',
    logo: '/assets/logos/athe.png',
    desc: 'Trent Education Centre is accredited by ATHE.',
    link: '/awarding-organisations',
  },
  {
    name: 'Focus Awards',
    logo: '/assets/logos/focus-awards.png',
    desc: 'Trent Education Centre is now an approved training provider with Focus Awards.',
    link: '/awarding-organisations',
  },
  {
    name: 'Ascentis',
    logo: `/assets/logos/ofsted.png`,
    desc: 'Trent Education Centre is Now an Approved Ascentis Centre.',
    link: '/awarding-organisations',
  },
  {
    name: 'OTHM',
    logo: '/assets/logos/othm.jpg',
    desc: 'Founded in 2014, OTHM is an awarding organization recognized for providing high-quality qualifications in management, business, and hospitality sectors, facilitating career progression for learners globally.',
    link: '/awarding-organisations',
  },
  {
    name: 'Open Awards',
    logo: '/assets/logos/open-awards.jpg',
    desc: 'Trent Education is an approved provider with Open Awards.',
    link: '/awarding-organisations',
  },
  {
    name: 'NCFE',
    logo: '/assets/logos/ncfe.jpg',
    desc: 'Trent Education Centre is accredited by NCFE, an Ofqual regulated national Awarding Organisation. NCFE is dedicated to designing and certifying nationally recognized qualifications and awards, facilitating the success of millions of learners from diverse backgrounds.',
    link: '/awarding-organisations',
  },
  {
    name: 'BIIAB',
    logo: '/assets/logos/biiab.png',
    desc: 'Founded in 2000, BIIAB is an awarding and End-Point Assessment Organisation of choice for work-based learning providers, employers and further education colleges.',
    link: '/awarding-organisations',
  },
];

const accreditations = [
  { src: '/assets/badges/asic.jpg', name: 'ASIC Accreditation' },
  { src: '/assets/badges/dwp.jpg', name: 'DWP Approved Provider' },
  { src: '/assets/badges/armed-forces.jpg', name: 'Armed Forces Covenant Bronze' },
];

const approvedSupplier = [
  { src: '/assets/badges/skills-funding.jpg', name: 'Skills Funding Agency' },
  { src: '/assets/badges/dfe.jpg', name: 'Department for Education' },
];

function LogoCard({ logo, name, desc, link }) {
  return (
    <div className="ap-logo-card">
      <div className="ap-logo-card-front">
        <img src={logo} alt={name} className="ap-logo-img" />
        <div className="ap-logo-name">{name}</div>
      </div>
      <div className="ap-logo-card-hover">
        <p className="ap-hover-desc">{desc}</p>
        <Link to={link} className="ap-more-info-btn">
          More Info <span className="ap-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

function ImageCard({ src, name }) {
  return (
    <div className="ap-img-card">
      <img src={src} alt={name} className="ap-img-card-img" />
    </div>
  );
}

export default function ApprovalsPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Approvals & Accreditations"
        subtitle="Our approved awarding organisations, accreditations, and supplier status"
        bgImage="/assets/images/events/asic-group-photo.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">

        {/* Awarding Organisations */}
        <section className="ap-section">
          <div className="ap-section-header">
            <h2>Awarding Organisations</h2>
            <div className="ap-divider" />
            <p className="ap-section-intro">
              We are approved by the following awarding organisations to offer courses and qualifications
              that enhance our students' academic and career development.
            </p>
          </div>
          <div className="ap-logo-grid">
            {awardingOrgs.map((org, i) => (
              <LogoCard key={i} logo={org.logo} name={org.name} desc={org.desc} link={org.link} />
            ))}
          </div>
          <div className="ap-section-cta">
            <Link to="/awarding-organisations" className="ap-view-all-btn">
              View All Awarding Organisations →
            </Link>
          </div>
        </section>

        {/* Accreditations */}
        <section className="ap-section">
          <div className="ap-section-header">
            <h2>Accreditations</h2>
            <div className="ap-divider" />
            <p className="ap-section-intro">
              Our accreditations reflect TEC's commitment to quality, integrity, and excellence in education.
            </p>
          </div>
          <div className="ap-img-grid">
            {accreditations.map((a, i) => (
              <ImageCard key={i} src={a.src} name={a.name} />
            ))}
          </div>
          <div className="ap-section-cta">
            <Link to="/accreditations" className="ap-view-all-btn">
              View All Accreditations →
            </Link>
          </div>
        </section>

        {/* Approved Supplier Status */}
        <section className="ap-section" style={{ marginBottom: '24px' }}>
          <div className="ap-section-header">
            <h2>Approved Supplier Status</h2>
            <div className="ap-divider" />
            <p className="ap-section-intro">
              TEC holds approved supplier status with key government bodies, enabling us to deliver
              funded programmes that change lives.
            </p>
          </div>
          <div className="ap-img-grid ap-img-grid--small">
            {approvedSupplier.map((a, i) => (
              <ImageCard key={i} src={a.src} name={a.name} />
            ))}
          </div>
          <div className="ap-section-cta">
            <Link to="/approved-supplier-status" className="ap-view-all-btn">
              View Approved Supplier Status →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
