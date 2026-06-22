import { ArrowUpRight, Globe } from 'lucide-react';
import '../InnerPage.css';
import './InternationalPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   International page
   Mirrors the WordPress /international/ page layout & wording.
   Sub-page links currently point to the live WP URLs — these
   can be swapped to internal React routes once those pages are
   built locally.
   ════════════════════════════════════════════════════════════ */

const IMG = '/assets/images/international';

const studyPlanCards = [
  {
    title: 'The Application and Admission Process',
    desc: 'Entry requirements, how to apply, visa and immigration guidance.',
    img: `${IMG}/application-process.jpg`,
    href: '/application-process',
    internal: true,
  },
  {
    title: 'Fees and Funding',
    desc: 'Tuition fees and payment plans, opening a UK bank account, scholarships and funding opportunities.',
    img: '/uploads/2025/04/Multi-faith-6.jpg',
    href: '/fees-and-funding',
    internal: true,
  },
  {
    title: 'Student Support Services',
    desc: 'Academic Support, International Student Support, Disability and Wellbeing Services.',
    img: '/uploads/2024/08/smiling-females-wearing-headphones-around-neck-looking-laptop-scaled.jpg',
    href: '/student-support',
    internal: true,
  },
];

const arrivalCards = [
  {
    title: 'Offer Checklist',
    desc: 'Now you have an offer to study with us as an international student, here is what to do next. Follow our step-by-step advice and you will soon be confirming your place at TEC.',
    img: '/uploads/2025/06/tec-website-photos-29.7-x-21-cm.jpg',
    href: '/offer-checklist',
    internal: true,
  },
  {
    title: 'Pre-Arrival Information',
    desc: 'Pre-departure checklist, packing essentials, important documents to carry, airport transfers and transportation options, accommodation options.',
    img: '/uploads/2025/03/10.jpg',
    href: '/pre-arrival',
    internal: true,
  },
  {
    title: 'Post-Arrival Information',
    desc: 'Complete your enrolment, collect your student ID, attend orientation sessions, and explore the campus.',
    img: '/uploads/2025/04/tec-website-photos-3.jpg',
    href: '/post-arrival',
    internal: true,
  },
];

const nottinghamCards = [
  {
    title: 'Things to do in Nottingham',
    desc: 'Sightseeing, tours, galleries & museums, parks, and markets.',
    img: '/uploads/2025/03/5.jpg',
    href: '/things-to-do-nottingham',
    internal: true,
  },
  {
    title: 'Where to Eat Out in Nottingham',
    desc: 'Discover essential tips on where to find diverse and affordable food options in Nottingham.',
    img: '/uploads/2025/03/6-1.jpg',
    href: '/eat-out-nottingham',
    internal: true,
  },
];

function Card({ item }) {
  const linkProps = item.internal
    ? { href: item.href }
    : { href: item.href, target: '_blank', rel: 'noreferrer' };
  return (
    <a {...linkProps} className="int-card">
      <div className="int-card-img">
        <img src={item.img} alt={item.title} loading="lazy" />
      </div>
      <div className="int-card-body">
        <h3 className="int-card-title">{item.title}</h3>
        <p className="int-card-desc">{item.desc}</p>
        <span className="int-card-arrow">
          Learn more <ArrowUpRight size={14} />
        </span>
      </div>
    </a>
  );
}

export default function InternationalPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="International"
        subtitle="Explore everything about studying at Trent Education Centre (TEC) as an international student — including programmes, applications, and support services to help you succeed."
        bgImage="/uploads/2025/04/Multi-faith-11.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split — heading + paragraph */}
        <div className="int-split">
          <h2>Advice for your study plans</h2>
          <p>
            Read our guidance on the application processes, fees and funding, student life,
            and support services designed to help you succeed.
          </p>
        </div>

        {/* 3 cards — study plan */}
        <div className="int-cards-3">
          {studyPlanCards.map((c, i) => <Card key={i} item={c} />)}
        </div>

        {/* Banner CTA */}
        <div
          className="int-banner"
          style={{
            backgroundImage:
              'url(/uploads/2025/04/Multi-faith-11.jpg)',
          }}
        >
          <div className="int-banner-inner">
            <span className="int-banner-eyebrow">
              <Globe size={12} style={{ verticalAlign: '-1px', marginRight: 6 }} />
              International Students
            </span>
            <h3>Thinking about studying in the UK?</h3>
            <p>
              Explore everything about studying at TEC as an international student, including
              programmes, applications, and support services to help you succeed.
            </p>
            <a href="/about" className="int-banner-btn">
              Why study at TEC? <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Section heading — after acceptance */}
        <div className="int-section-head">
          <span className="int-section-eyebrow">After You Have Been Accepted</span>
          <h2>Your Next Steps</h2>
        </div>

        {/* Next steps split */}
        <div className="int-next">
          <div className="int-next-img">
            <img
              src="/uploads/2024/02/laughing-students-sitting-park-ground-1-scaled.jpg"
              alt="Students celebrating in the park"
              loading="lazy"
            />
          </div>
          <div className="int-next-body">
            <span className="int-next-eyebrow">Welcome to TEC</span>
            <h3>Congratulations on your<span style={{ whiteSpace: 'nowrap' }}>&nbsp;offer&nbsp;🎓</span></h3>
            <p>
              Follow our advice on these pages to accept your offer, take steps to meet
              your conditions, and learn more about student life at Trent Education Centre.
            </p>
          </div>
        </div>

        {/* 3 cards — arrival */}
        <div className="int-cards-3">
          {arrivalCards.map((c, i) => <Card key={i} item={c} />)}
        </div>

        {/* Nottingham section */}
        <div className="int-section-head">
          <span className="int-section-eyebrow">Discover the City</span>
          <h2>Nottingham — A Welcoming and Diverse Student City</h2>
          <p>
            If you are exploring Nottingham from afar, our Virtual Tour and website are
            great starting points. Discover what it is like to live and study in
            Nottingham, including insights on the cost of living, local food options, and
            more. If you are already in the UK, visit us for an open day or a campus tour
            to experience TEC first-hand.
          </p>
        </div>

        {/* 2 cards — Nottingham */}
        <div className="int-cards-2">
          {nottinghamCards.map((c, i) => <Card key={i} item={c} />)}
        </div>

      </div>
    </div>
  );
}
