import '../InnerPage.css';
import PageHero from '../../components/PageHero';

const items = [
  {
    name: 'Skills Funding Agency',
    logo: '/assets/logos/sfa.jpg',
    desc: 'The Skills Funding Agency (SFA) was a UK government body responsible for funding further education and skills training. It played a crucial role in supporting adult learners, apprenticeships, and vocational education by managing funding to colleges, training organisations, and employers.',
    link: 'http://www.gov.uk/government/organisations/education-and-skills-funding-agency',
  },
  {
    name: 'ECSC Framework – Skills Education Advisers (DfE)',
    logo: '/assets/badges/dfe-logo.jpg',
    desc: 'The Department for Education is responsible for children\'s services and education, including early years, schools, higher and further education policy, apprenticeships and wider skills in England.',
    link: 'https://www.gov.uk/government/organisations/department-for-education',
  },
];

export default function ApprovedSupplierStatusPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Approved Supplier Status"
        subtitle="Our approved supplier partnerships"
        bgImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
        bgPosition="center 40%"
      />

      <div className="container inner-content">
        <p style={{ fontSize: '1rem', color: 'var(--tec-text-light)', lineHeight: 1.8, margin: '0 0 48px', textAlign: 'center' }}>
          Trent Education Centre holds approved supplier status with a number of government bodies,
          reflecting our commitment to quality provision and compliance with national standards.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {items.map((item, i) => (
            <div key={i}>
              <div className="awarding-org-row">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={item.logo}
                    alt={item.name}
                    style={{ maxWidth: '200px', maxHeight: '120px', objectFit: 'contain', display: 'block' }}
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2 style={{ color: 'var(--tec-green)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
                    {item.name}
                  </h2>
                  <p style={{ color: 'var(--tec-text-light)', lineHeight: 1.8, marginBottom: '16px', fontSize: '0.92rem' }}>
                    {item.desc}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-block',
                      background: 'var(--tec-green)',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      padding: '9px 20px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                    }}
                  >
                    More Info
                  </a>
                </div>
              </div>
              {i < items.length - 1 && (
                <hr style={{ border: 'none', borderTop: '1px solid #e8e8e8', margin: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
