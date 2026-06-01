import './InnerPage.css';
import PageHero from '../components/PageHero';

const items = [
  {
    name: 'ASIC',
    logo: '/assets/badges/asic-lg.jpg',
    desc: [
      'Trent Education Centre holds UK Accreditation from ASIC (Accreditation Service for International Schools, Colleges, and Universities).',
      'ASIC Accreditation is a leading, globally recognised quality standard in international education. Institutions undergo an impartial and independent external assessment process to confirm their provision meets rigorous internationally accepted standards, covering the whole spectrum of its administration, governance, and educational offering. Achieving ASIC Accreditation demonstrates to students and stakeholders that an institution is a high-quality education provider that delivers safe and rewarding educational experiences and is committed to continuous improvement throughout its operation.',
      'About ASIC: One of the largest international accreditation agencies operating in 70+ countries, ASIC is recognised in the UK by UKVI – UK Visas and Immigration (part of the Home Office of the UK Government), is ISO 9001:2015 (Quality Management Systems) Accredited and is a Full Member of The International Network for Quality Assurance Agencies in Higher Education (INQAAHE), a member of the BQF (British Quality Foundation), a member of the International Schools Association (ISA), and an institutional member of EDEN (European Distance and E-Learning Network).',
    ],
    link: 'https://www.asic.org.uk/directory/uk-directory/trent-education-centre-limited',
  },
  {
    name: 'FSF DPS 2 – Department of Work and Pensions',
    logo: '/assets/badges/dwp-lg.png',
    desc: 'The Department for Work and Pensions (DWP) is a UK government department responsible for welfare and pension policy. It oversees a wide range of services, including social security benefits, pensions, disability support, and employment services. The DWP works to provide financial support to individuals, promote employment opportunities, and ensure the well-being of vulnerable groups within society.',
    link: 'https://www.gov.uk/guidance/dwp-flexible-support-fund-dynamic-purchasing-system-2',
  },
  {
    name: 'Armed Forces Covenant (AFC) – Employer Recognition Scheme',
    logo: '/assets/badges/armed-forces-covenant.png',
    desc: 'The Employer Recognition Scheme (ERS) is a UK government initiative that recognises and rewards employers who demonstrate exceptional support for the armed forces community. The scheme highlights businesses that have committed to supporting veterans, reservists, and military families, promoting a positive and inclusive environment for those who serve or have served in the military. Employers can achieve various levels of recognition, from Bronze to Gold, based on their contributions.',
    link: 'https://www.gov.uk/government/publications/defence-employer-recognition-scheme',
  },
];

export default function AccreditationsPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Accreditations"
        subtitle="Our accreditations and quality standards"
        bgImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80"
        bgPosition="center 40%"
      />

      <div className="container inner-content">
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
                  <div style={{ color: 'var(--tec-text-light)', lineHeight: 1.8, marginBottom: '16px', fontSize: '0.92rem' }}>
                    {Array.isArray(item.desc)
                      ? item.desc.map((p, j) => <p key={j} style={{ marginBottom: j < item.desc.length - 1 ? '10px' : 0 }}>{p}</p>)
                      : <p>{item.desc}</p>}
                  </div>
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
