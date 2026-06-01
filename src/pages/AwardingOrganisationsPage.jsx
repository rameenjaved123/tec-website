import './InnerPage.css';
import PageHero from '../components/PageHero';

const orgs = [
  {
    name: 'PEARSON',
    logo: '/assets/logos/partnership.png',
    desc: 'Pearson is a leading international education company, offering a wide range of qualifications, including BTEC and GCSE, recognized for their high standards and relevance to industry needs.',
    link: 'https://www.pearson.com/en-gb.html',
  },
  {
    name: 'ATHE',
    logo: '/assets/logos/athe-large.png',
    desc: 'ATHE (Awards for Training and Higher Education) is a UK-regulated awarding body, recognised by Ofqual. It provides accredited qualifications across sectors such as business, management, and healthcare, helping thousands of learners achieve success through flexible, industry-aligned courses.',
    link: 'https://www.athe.co.uk',
  },
  {
    name: 'ASCENTIS',
    logo: '/assets/logos/ofsted.png',
    desc: 'Ascentis is a leading UK-based awarding organisation, offering a diverse range of high-quality qualifications that promote lifelong learning and progression. Known for their innovative and flexible approach, Ascentis supports learners and centres globally across sectors including education, employability, and personal development.',
    link: 'https://www.ascentis.co.uk/',
  },
  {
    name: 'FOCUS AWARDS',
    logo: '/assets/logos/focus-awards.png',
    desc: 'Focus Awards is a UK-regulated awarding organisation committed to delivering high-quality qualifications across a broad range of sectors. Renowned for its flexible, learner-centred approach, Focus Awards supports training providers and learners by offering vocational qualifications that align with industry standards and encourage career progression.',
    link: 'https://focusawards.org.uk/',
  },
  {
    name: 'OTHM',
    logo: '/assets/logos/othm-sm.jpg',
    desc: 'Founded in 2014, OTHM is an awarding organisation recognised for providing high-quality qualifications in management, business, and hospitality sectors, facilitating career progression for learners globally.',
    link: 'https://www.othm.org.uk',
  },
  {
    name: 'BIIAB',
    logo: '/assets/logos/biiab.png',
    desc: 'Founded in 2000, BIIAB is an awarding and End-Point Assessment Organisation of choice for work-based learning providers, employers and further education colleges.',
    link: 'https://www.biiab.co.uk',
  },
  {
    name: 'NCFE',
    logo: '/assets/logos/ncfe-lg.jpg',
    desc: 'Trent Education Centre is accredited by NCFE, an Ofqual regulated national Awarding Organisation. NCFE is dedicated to designing and certifying nationally recognized qualifications and awards, facilitating the success of millions of learners from diverse backgrounds.',
    link: 'https://www.ncfe.org.uk',
  },
  {
    name: 'OPEN AWARDS',
    logo: '/assets/logos/open-awards-lg.jpg',
    desc: 'Open Awards is a UK-based awarding body regulated by Ofqual, committed to providing accessible qualifications across various sectors. With a focus on supporting diverse learners, Open Awards offers recognised certifications that equip individuals with the skills and knowledge needed for personal and professional development.',
    link: 'https://www.openawards.org.uk',
  },
];

export default function AwardingOrganisationsPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Awarding Organisations"
        subtitle="Our accredited awarding body partners"
        bgImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
        bgPosition="center 40%"
      />

      <div className="container inner-content">
        <p style={{ fontSize: '1rem', color: 'var(--tec-text-light)', lineHeight: 1.8, margin: '0 0 48px', textAlign: 'center' }}>
          Trent Education Centre works with a range of respected UK-regulated awarding organisations
          to deliver accredited qualifications that are recognised by employers and institutions worldwide.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {orgs.map((org, i) => (
            <div key={i}>
              <div className="awarding-org-row">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={org.logo}
                    alt={org.name}
                    style={{ maxWidth: '200px', maxHeight: '100px', objectFit: 'contain', display: 'block' }}
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2 style={{ color: 'var(--tec-green)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px' }}>
                    {org.name}
                  </h2>
                  <p style={{ color: 'var(--tec-text-light)', lineHeight: 1.8, marginBottom: '16px', fontSize: '0.92rem' }}>
                    {org.desc}
                  </p>
                  <a
                    href={org.link}
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
              {i < orgs.length - 1 && (
                <hr style={{ border: 'none', borderTop: '1px solid #e8e8e8', margin: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
