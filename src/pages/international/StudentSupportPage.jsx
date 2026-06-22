import {
  ArrowUpRight, FileText, Phone, Mail, Clock,
  Instagram, Facebook, Linkedin, Youtube,
} from 'lucide-react';
import '../InnerPage.css';
import './ApplicationProcessPage.css';
import './StudentSupportPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   Student Support Services page
   Mirrors WordPress /student-support-services/ — wording verbatim.
   ════════════════════════════════════════════════════════════ */

const WELCOME_PACK = '/assets/documents/handbooks/international-welcome-pack.pdf';

const learnMoreCards = [
  {
    title: 'Things to do in Nottingham',
    desc: 'Sightseeing, tours, museums, parks, and markets.',
    img: '/uploads/2025/03/5.jpg',
    href: '/things-to-do-nottingham',
    internal: true,
  },
  {
    title: 'Fees and Funding',
    desc: 'Tuition fees and payment plans, opening a UK bank account, scholarships and funding opportunities.',
    img: '/uploads/2025/06/Multi-faith-6.jpg',
    href: '/fees-and-funding',
    internal: true,
  },
  {
    title: 'Where to Eat Out in Nottingham',
    desc: 'Discover essential tips on where to find diverse and affordable food options in Nottingham.',
    img: '/uploads/2025/03/6-1.jpg',
    href: '/eat-out-nottingham',
    internal: true,
  },
  {
    title: 'How to write a Personal Statement',
    desc: 'No one can tell your story better than you. Share your ambitions, strengths, and experiences in your own words.',
    img: '/uploads/2025/06/cropped-photo-attractive-young-man-office-working-scaled.jpg',
    href: '/personal-statement',
    internal: true,
  },
];

const socials = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/trent_education_centre/' },
  { Icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61551912643921' },
  { Icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/trent-education-centre-ltd/' },
  { Icon: Youtube,   label: 'YouTube',   href: 'https://www.youtube.com/@TrentEducationCentre' },
];

export default function StudentSupportPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Student Support Services"
        subtitle="We are here for you — wraparound support to help you settle, study and thrive at TEC."
        bgImage="/uploads/2025/04/Multi-faith-7.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split */}
        <div className="aap-intro-split">
          <h2>We are here for you!</h2>
          <p>
            At <strong>Trent Education Centre (TEC),</strong> our{' '}
            <strong>International Student Support Service</strong> is here to help you with
            a wide range of concerns, ensuring a smooth and enjoyable experience during
            your studies.
          </p>
        </div>

        {/* Welcome Pack — image + body */}
        <div className="aap-split">
          <div className="aap-split-img">
            <img
              src="/uploads/2025/04/Multi-faith-7.jpg"
              alt="TEC International Student Support"
              loading="lazy"
            />
          </div>
          <div className="aap-split-body">
            <span className="aap-split-eyebrow">Welcome Pack</span>
            <h3>See our Welcome Pack for more information</h3>
            <p>
              This includes what to do if you are not happy with our services. We also run
              Welcome Events at the start of the term. These help you settle into life in
              Nottingham and at TEC. They also introduce you to the service.
            </p>
            <a
              href={WELCOME_PACK}
              target="_blank"
              rel="noreferrer"
              className="aap-split-btn"
            >
              <FileText size={16} /> International Welcome Pack <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Policies CTA */}
        <div className="ssp-policies">
          <div className="ssp-policies-text">
            <h3>Learn more about our policies for International Students</h3>
            <p>
              Read our published policies covering admissions, safeguarding, student
              support and more.
            </p>
          </div>
          <a href="/policies" className="ssp-policies-btn">
            View Our Policies <ArrowUpRight size={14} />
          </a>
        </div>

        {/* How to reach us */}
        <div className="aap-section-head">
          <span className="aap-eyebrow">Get in Touch</span>
          <h2>How to Reach Us</h2>
          <p>
            If there is anything you need or you are unsure where to turn, do not hesitate
            to get in touch. We are here to support you every step of the way!
          </p>
        </div>

        <div className="ssp-reach">
          <div className="ssp-reach-tile">
            <span className="ssp-reach-icon"><Phone size={18} /></span>
            <span className="ssp-reach-label">Phone</span>
            <span className="ssp-reach-val">
              <a href="tel:+441157950171">+44 (0) 115 795 0171</a>
            </span>
            <p className="ssp-reach-sub">Call us during office hours.</p>
          </div>

          <div className="ssp-reach-tile">
            <span className="ssp-reach-icon"><Mail size={18} /></span>
            <span className="ssp-reach-label">Email</span>
            <span className="ssp-reach-val">
              <a href="mailto:info@trenteducation.co.uk">info@trenteducation.co.uk</a>
            </span>
            <p className="ssp-reach-sub">We aim to reply within 1–2 working days.</p>
          </div>

          <div className="ssp-reach-tile">
            <span className="ssp-reach-icon"><Clock size={18} /></span>
            <span className="ssp-reach-label">Office Hours</span>
            <span className="ssp-reach-val">Mon – Fri · 9:00 am – 5:00 pm</span>
            <p className="ssp-reach-sub">Open across all study centres.</p>
          </div>
        </div>

        {/* Connect with us banner */}
        <div className="ssp-connect">
          <h3>Connect with us</h3>
          <p>
            Explore everything about studying at TEC as an international student,
            including programmes, applications, and support services to help you succeed.
          </p>
          <div className="ssp-connect-row">
            {socials.map(({ Icon, label, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="ssp-social"
                aria-label={label}
              >
                <Icon size={16} /> {label}
              </a>
            ))}
          </div>
        </div>

        {/* Learn more */}
        <h2 className="aap-learn-head">Learn more</h2>
        <div className="aap-cards-4">
          {learnMoreCards.map((c, i) => {
            const linkProps = c.internal
              ? { href: c.href }
              : { href: c.href, target: '_blank', rel: 'noreferrer' };
            return (
              <a key={i} {...linkProps} className="aap-card">
                <div className="aap-card-img">
                  <img src={c.img} alt={c.title} loading="lazy" />
                </div>
                <div className="aap-card-body">
                  <h3 className="aap-card-title">{c.title}</h3>
                  <p className="aap-card-desc">{c.desc}</p>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
}
