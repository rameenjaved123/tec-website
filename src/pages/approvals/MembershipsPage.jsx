import '../InnerPage.css';
import './MembershipsPage.css';
import PageHero from '../../components/PageHero';

const memberships = [
  {
    logo: '/assets/logos/british-council-ielts.jpg',
    logoAlt: 'British Council IELTS',
    title: 'British Council Affiliate IELTS Partnership Programme',
    description:
      'As a proud member of the British Council IELTS partnership programme, we offer advice and support for individuals who require an English language test to work, study or live in the UK. Book your British Council IELTS for UKVI and Life Skills test.',
    link: 'https://takeielts.britishcouncil.org/',
  },
  {
    logo: '/assets/logos/advance-he.jpg',
    logoAlt: 'Advance HE',
    title: 'ADVANCE HE',
    description:
      'Advance HE is a UK-based organisation focused on supporting higher education institutions. It provides accredited programmes and professional development opportunities aimed at enhancing teaching, learning, and leadership across the sector. With a commitment to advancing excellence in higher education, Advance HE helps individuals and institutions foster innovation and drive positive change.',
    link: 'https://www.advance-he.ac.uk/advance-he-members',
  },
  {
    logo: '/assets/logos/totum.png',
    logoAlt: 'TOTUM',
    title: 'TOTUM',
    description:
      "TOTUM is a UK-based student discount and membership platform, offering a wide range of savings across retailers, entertainment, travel, and more. Designed to support students, TOTUM provides exclusive deals and offers to help manage finances while enhancing the student experience. It's the UK's largest student discount card, recognised by universities and colleges nationwide.",
    link: 'https://totum.com/',
  },
];

export default function MembershipsPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Memberships (PSRB)"
        subtitle="Our professional memberships and endorsements"
        bgImage="/assets/images/events/asic-group-photo.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">
        {memberships.map((m, i) => (
          <div key={i}>
            <div className="mem-row">

              {/* Logo column */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={m.logo}
                  alt={m.logoAlt}
                  style={{ maxWidth: '220px', maxHeight: '140px', width: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>

              {/* Content column */}
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '20px', lineHeight: 1.3 }}>
                  {m.title}
                </h2>
                <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px', maxWidth: '680px' }}>
                  {m.description}
                </p>
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '13px 28px',
                    background: 'var(--tec-green)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    letterSpacing: '0.5px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(26,58,42,0.18)',
                    transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--tec-gold)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,58,42,0.22)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--tec-green)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,58,42,0.18)'; }}
                >
                  More Info
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            {i < memberships.length - 1 && (
              <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '24px 0' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
