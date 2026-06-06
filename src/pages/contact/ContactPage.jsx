import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Bus, ArrowUpRight, Clock } from 'lucide-react';
import '../InnerPage.css';
import './ContactPage.css';
import PageHero from '../../components/PageHero';

const centres = [
  {
    city: 'Nottingham (Head Office)',
    addr: 'Digital House 2.3, Clarendon Park, Nottingham, NG5 1AH',
    photo: '/assets/images/general/leicester-2.jpg',
    bus: 'Nearest Bus Services: The 68, 69, 70, 71, 89, 88, and 84 buses go north on Mansfield Road/Nottingham Road.',
    mapQuery: 'Trent+Education+Centre+Digital+House+Clarendon+Park+Nottingham+NG5+1AH',
  },
  {
    city: 'Nottingham Study Centre 1',
    addr: '2.1, Clarendon Park, Nottingham, NG5 1AH',
    photo: '/assets/images/campus/thumbnails/clarendon-park.jpg',
    bus: 'Nearest Bus Services: The 68, 69, 70, 71, 89, 88, and 84 buses go north on Mansfield Road/Nottingham Road.',
    mapQuery: 'Trent+Education+Centre+Clarendon+Park+Nottingham+NG5+1AH',
  },
  {
    city: 'Nottingham Study Centre 2',
    addr: '16 Castle Blvd, Nottingham, NG7 1FL',
    photo: '/assets/images/campus/thumbnails/castle-boulevard.jpg',
    bus: 'Buses: 11, 35, 36, 9, I4, TWO — SkyLink Nottingham at Castle Marina (Stop LE21) ~5 min walk',
    mapQuery: '16+Castle+Boulevard+Nottingham+NG7+1FL',
  },
  {
    city: 'Leicester Study Centre',
    addr: 'Humberstone House, 81–83 Humberstone Gate, Leicester, LE1 1WB',
    photo: '/assets/images/campus/thumbnails/leicester.jpg',
    bus: 'All buses to Leicester City Centre — next to Primark',
    mapQuery: 'Humberstone+House+81-83+Humberstone+Gate+Leicester+LE1+1WB',
  },
  {
    city: 'Birmingham Study Centre',
    addr: 'Mill Wharf, Mill Street, Birmingham, B6 4BS',
    photo: '/assets/images/campus/thumbnails/birmingham.jpg',
    bus: "West Midlands buses to St Chad's (8 min walk), or buses 934, 935, 937, 997 at Lower Tower Street",
    mapQuery: 'Mill+Wharf+Mill+Street+Birmingham+B6+4BS',
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
        <p className="contact-intro">
          Our Study Centres in Nottingham, Leicester and Birmingham have the same warm and vibrant
          community of students and staff, working together to achieve our shared goals. You will
          find staff ready to support and guide you, academic faculty to provide you with high
          quality education, and well-equipped facilities with everything you need to learn to
          the best of your ability.
        </p>

        {/* Phone & Email tiles */}
        <div className="contact-quick">
          {[
            { icon: <Phone size={22} />, label: 'Phone', value: '(+44) 1157950171', link: 'tel:+441157950171' },
            { icon: <Mail size={22} />,  label: 'Email', value: 'info@trenteducation.co.uk', link: 'mailto:info@trenteducation.co.uk' },
          ].map((item, i) => (
            <a key={i} href={item.link} className="contact-quick-tile">
              <span className="contact-quick-icon">{item.icon}</span>
              <span className="contact-quick-text">
                <span className="contact-quick-label">{item.label}</span>
                <span className="contact-quick-value">{item.value}</span>
              </span>
              <ArrowUpRight size={16} className="contact-quick-arrow" />
            </a>
          ))}
        </div>

        {/* ── Study Centres ─────────────────────────────── */}
        <div className="contact-section-head">
          <span className="contact-section-eyebrow">Visit Us</span>
          <h2>Our Study Centres</h2>
          <p>Five welcoming locations across Nottingham, Leicester and Birmingham — find directions to the one nearest you.</p>
        </div>

        <div className="contact-centres">
          {centres.map((c, i) => (
            <article key={i} className="centre-card-v2">

              {/* Photo header */}
              <div className="centre-photo">
                <img src={c.photo} alt={c.city} loading="lazy" />
                <div className="centre-photo-badge">
                  <MapPin size={12} /> {c.city.split(' ')[0]}
                </div>
              </div>

              {/* Details */}
              <div className="centre-body">
                <h3 className="centre-name">{c.city}</h3>

                <div className="centre-row">
                  <MapPin size={15} className="centre-row-icon" />
                  <span>{c.addr}</span>
                </div>

                <div className="centre-row">
                  <Bus size={15} className="centre-row-icon" />
                  <span>{c.bus}</span>
                </div>

                <div className="centre-actions">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${c.mapQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="centre-btn centre-btn-primary"
                  >
                    Get Directions <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${c.mapQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="centre-btn centre-btn-secondary"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>

              {/* Embedded map */}
              <div className="centre-map">
                <iframe
                  title={`Map of ${c.city}`}
                  src={`https://www.google.com/maps?q=${c.mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </article>
          ))}
        </div>

        {/* ── Follow Us & Opening Hours row ─────────────────── */}
        <div className="contact-bottom-grid">

          <div className="contact-follow">
            <span className="contact-section-eyebrow">Stay Connected</span>
            <h3>Follow Us</h3>
            <p>Updates on student stories, events, and what's happening across our centres.</p>
            <div className="contact-socials">
              {[
                { Icon: Facebook,  link: 'https://www.facebook.com/profile.php?id=61551912643921', label: 'Facebook' },
                { Icon: Linkedin,  link: 'https://www.linkedin.com/company/trent-education-centre-ltd/', label: 'LinkedIn' },
                { Icon: Youtube,   link: 'https://www.youtube.com/channel/UCUuFPZAfppw5v36Kfg1VMxg', label: 'YouTube' },
                { Icon: Instagram, link: 'https://www.instagram.com/trent_education_centre/', label: 'Instagram' },
              ].map(({ Icon, link, label }, i) => (
                <a key={i} href={link} target="_blank" rel="noreferrer" aria-label={label} className="contact-social">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="contact-hours">
            <div className="contact-hours-head">
              <Clock size={20} className="contact-hours-icon" />
              <span className="contact-hours-label">Opening Hours</span>
            </div>

            <div className="contact-hours-days">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <span key={d} className="contact-hours-day">{d}</span>
              ))}
            </div>

            <div className="contact-hours-time">
              <span className="contact-hours-time-from">9:00 am</span>
              <span className="contact-hours-time-sep">—</span>
              <span className="contact-hours-time-to">6:00 pm</span>
            </div>

            <span className="contact-hours-sub">Open 7 days a week across all study centres</span>
          </div>

        </div>

      </div>
    </div>
  );
}
