import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Bus } from 'lucide-react';
import './InnerPage.css';
import PageHero from '../components/PageHero';

const centres = [
  {
    city: 'Nottingham (Head Office)',
    addr: 'Digital House 2.3, Clarendon Park, Nottingham, NG5 1AH',
    photo: '/assets/images/general/leicester-2.jpg',
    bus: 'Buses: 68, 69, 70, 71, 89, 88, 84',
  },
  {
    city: 'Nottingham Study Centre 1',
    addr: '2.1, Clarendon Park, Nottingham, NG5 1AH',
    photo: '/assets/images/campus/thumbnails/clarendon-park.jpg',
    bus: 'Buses: 68, 69, 70, 71, 89, 88, 84',
  },
  {
    city: 'Nottingham Study Centre 2',
    addr: '16 Castle Blvd, Nottingham, NG7 1FL',
    photo: '/assets/images/campus/thumbnails/castle-boulevard.jpg',
    bus: 'Buses: 11, 35, 36, 9, I4, TWO — SkyLink Nottingham at Castle Marina (Stop LE21) ~5 min walk',
  },
  {
    city: 'Leicester Study Centre',
    addr: 'Humberstone House, 81–83 Humberstone Gate, Leicester, LE1 1WB',
    photo: '/assets/images/campus/thumbnails/leicester.jpg',
    bus: 'All buses to Leicester City Centre — next to Primark',
  },
  {
    city: 'Birmingham Study Centre',
    addr: 'Mill Wharf, Mill Street, Birmingham, B6 4BS',
    photo: '/assets/images/campus/thumbnails/birmingham.jpg',
    bus: 'West Midlands buses to St Chad\'s (8 min walk), or buses 934, 935, 937, 997 at Lower Tower Street',
  },
];

export default function ContactPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you"
        bgImage="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1600&q=80"
        bgPosition="center center"
      />

      <div className="container inner-content">

        {/* Intro */}
        <p style={{ fontSize: '1rem', color: 'var(--tec-text-light)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '800px' }}>
          Our Study Centres in Nottingham, Leicester and Birmingham have the same warm and vibrant
          community — get in touch with us and we'll be happy to help.
        </p>

        {/* Phone & Email tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {[
            { icon: <Phone size={22} />, label: 'Phone', value: '(+44) 1157950171', link: 'tel:+441157950171' },
            { icon: <Mail size={22} />, label: 'Email', value: 'info@trenteducation.co.uk', link: 'mailto:info@trenteducation.co.uk' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'var(--tec-gray)',
              padding: '20px 24px',
              borderRadius: '12px',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
            }}>
              <div style={{ color: 'var(--tec-gold)', marginTop: '2px' }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--tec-green)', marginBottom: '4px' }}>{item.label}</div>
                <a href={item.link} style={{ color: 'var(--tec-text-light)', fontSize: '0.9rem' }}>{item.value}</a>
              </div>
            </div>
          ))}
        </div>

        {/* Study Centres */}
        <h2 style={{ color: 'var(--tec-green)', marginBottom: '24px' }}>Our Study Centres</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '52px' }}>
          {centres.map((c, i) => (
            <div key={i} style={{
              background: 'var(--tec-gray)',
              borderRadius: '14px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              gap: 0,
            }}
              className="centre-card"
            >
              {/* Photo */}
              <div style={{ overflow: 'hidden', minHeight: '200px' }}>
                <img
                  src={c.photo}
                  alt={c.city}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px' }}>
                  {c.city}
                </h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <MapPin size={16} style={{ color: 'var(--tec-gold)', flexShrink: 0, marginTop: '3px' }} />
                  <p style={{ color: 'var(--tec-text-light)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{c.addr}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <Bus size={16} style={{ color: 'var(--tec-gold)', flexShrink: 0, marginTop: '3px' }} />
                  <p style={{ color: 'var(--tec-text-light)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{c.bus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow Us & Opening Hours row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'start' }}>

          <div>
            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px' }}>Follow Us</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { Icon: Facebook, link: 'https://www.facebook.com/profile.php?id=61551912643921' },
                { Icon: Linkedin, link: 'https://www.linkedin.com/company/trent-education-centre-ltd/' },
                { Icon: Youtube, link: 'https://www.youtube.com/channel/UCUuFPZAfppw5v36Kfg1VMxg' },
                { Icon: Instagram, link: 'https://www.instagram.com/trent_education_centre/' },
              ].map(({ Icon, link }, i) => (
                <a key={i} href={link} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 42, height: 42, background: 'var(--tec-green)',
                  borderRadius: '50%', color: 'white', transition: 'background 0.2s',
                }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--tec-green)', borderRadius: '12px', padding: '28px 32px', color: '#fff' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '10px' }}>Opening Hours</h4>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', margin: '0 0 6px' }}>Monday – Sunday: 9:00am – 6:00pm</p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', margin: 0 }}>All study centres open 7 days a week</p>
          </div>

        </div>

      </div>
    </div>
  );
}
