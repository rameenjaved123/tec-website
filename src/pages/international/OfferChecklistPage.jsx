import { useState, useRef } from 'react';
import {
  ChevronDown, ArrowUpRight, ClipboardCheck, CheckCircle,
  Upload, CreditCard, Plane, Calendar, Megaphone, Mail,
} from 'lucide-react';
import '../InnerPage.css';
import './ApplicationProcessPage.css';
import './FeesFundingPage.css';
import './OfferChecklistPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   Offer Checklist page
   Mirrors WordPress /offer-checklist/ — wording verbatim.
   ════════════════════════════════════════════════════════════ */

const ADMISSIONS_EMAIL = 'Internationaladmissions@trenteducation.ac.uk';

const acceptSteps = [
  {
    title: 'Step 1: Complete the Acceptance Form',
    body: (
      <p>
        An Acceptance Form is included with your official offer letter. Please read the
        offer carefully and ensure you understand all the terms before proceeding.
      </p>
    ),
  },
  {
    title: 'Step 2: Sign and Submit',
    body: (
      <p>
        You must sign the Acceptance Form and return it to the Admissions Team via email.
      </p>
    ),
  },
];

const learnMoreCards = [
  {
    title: 'How to write a Personal Statement',
    desc: 'No one can tell your story better than you. Share your ambitions, strengths, and experiences in your own words.',
    img: '/uploads/2025/06/cropped-photo-attractive-young-man-office-working-scaled.jpg',
    href: '/personal-statement',
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
    title: 'Things to do in Nottingham',
    desc: 'Sightseeing, tours, museums, parks, and markets.',
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

function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  const refs = useRef([]);

  const handleClick = (i, isOpen) => {
    const next = isOpen ? null : i;
    setOpen(next);
    if (next !== null) {
      requestAnimationFrame(() => {
        const el = refs.current[i];
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    }
  };

  return (
    <div className="aap-accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            ref={el => (refs.current[i] = el)}
            className={`aap-acc-item ${isOpen ? 'open' : ''}`}
          >
            <button
              type="button"
              className="aap-acc-head"
              aria-expanded={isOpen}
              onClick={() => handleClick(i, isOpen)}
            >
              <span className="aap-acc-num">{i + 1}</span>
              <span className="aap-acc-title">{it.title}</span>
              <ChevronDown size={20} className="aap-acc-chev" />
            </button>
            {isOpen && <div className="aap-acc-body">{it.body}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default function OfferChecklistPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Offer Checklist"
        subtitle="Now you have your offer — here is what to do next to secure your place at TEC."
        bgImage="/uploads/2025/06/tec-website-photos-29.7-x-21-cm.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split */}
        <div className="aap-intro-split">
          <h2>Your offer checklist</h2>
          <p>
            Now you have got an offer to study with us as an international student, here
            is what to do next. Follow our step-by-step advice and you will soon be
            confirming your place at TEC.
          </p>
        </div>

        {/* Understanding your offer */}
        <div className="aap-section-head">
          <span className="aap-eyebrow">Step One</span>
          <h2>Understanding your offer</h2>
          <p>
            There are some steps that you need to take before we can confirm your place,
            and we encourage you to take action as soon as you can. As an international
            student, you are most likely to get a conditional offer. Here is the
            difference:
          </p>
        </div>

        <div className="oc-offer-pair">
          <div className="oc-offer-card">
            <span className="oc-offer-eyebrow"><ClipboardCheck size={14} /> Conditional</span>
            <h4>Conditional Offer</h4>
            <p>
              This means that you must meet some requirements before you can be
              officially accepted onto the course. An example of this would be
              demonstrating that you have achieved the required grades in your
              qualifications.
            </p>
          </div>
          <div className="oc-offer-card">
            <span className="oc-offer-eyebrow"><CheckCircle size={14} /> Unconditional</span>
            <h4>Unconditional Offer</h4>
            <p>
              This means we are satisfied that you have already met all the entry
              requirements, and that we can accept you on to the course with no further
              requirements.
            </p>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          color: 'var(--tec-text-light)',
          fontSize: '0.96rem',
          lineHeight: 1.8,
          maxWidth: 900,
          margin: '0 auto 48px',
        }}>
          Whether your offer is conditional or unconditional, we encourage you to{' '}
          <strong style={{ color: 'var(--tec-green-dark, #122618)' }}>
            accept your offer within two weeks
          </strong>{' '}
          of receiving it. You can then complete steps to meet your conditions where
          necessary and confirm your place at TEC in plenty of time.
        </p>

        {/* "What's next?" banner */}
        <div className="oc-next-banner">
          <div className="oc-next-banner-inner">
            <span className="oc-next-eyebrow">
              <Megaphone size={12} /> What's next?
            </span>
            <h3>Check your email regularly for our messages</h3>
            <p>
              We will contact you on the email you used in your application if we require
              any further information to support your application. Please follow the
              advice in the checklist below.
            </p>
          </div>
        </div>

        {/* Accepting your offer */}
        <div className="aap-section-head">
          <span className="aap-eyebrow">Step Two</span>
          <h2>Accepting your offer</h2>
          <p>To secure your place, please follow the steps below.</p>
        </div>

        <Accordion items={acceptSteps} />

        {/* Deadline + submission */}
        <div className="oc-deadline">
          <Calendar size={18} className="oc-deadline-icon" />
          <div className="oc-deadline-text">
            <strong>Deadline:</strong> The signed Acceptance Form must be submitted{' '}
            <strong>within two weeks</strong> of the date of your offer letter.
          </div>
        </div>

        <div className="oc-step">
          <div className="oc-step-head">
            <span className="oc-step-icon"><Mail size={18} /></span>
            <h3>Submission Instructions</h3>
          </div>
          <p>
            Please email your signed form to:{' '}
            <a href={`mailto:${ADMISSIONS_EMAIL}`}>{ADMISSIONS_EMAIL}</a>
          </p>
          <p>
            If you have any questions or need help completing the form, do not hesitate
            to get in touch.
          </p>
        </div>

        {/* Upload your documents */}
        <div className="oc-step">
          <div className="oc-step-head">
            <span className="oc-step-icon"><Upload size={18} /></span>
            <h3>Upload your documents</h3>
          </div>
          <p>
            As part of your conditional offer, you are required to provide additional
            documents to meet the conditions outlined in your offer letter.
          </p>
          <p>
            Review your offer letter carefully to identify the specific documents
            requested. Ensure all documents are clear, complete, and in a suitable
            format (PDF, JPG, or PNG).
          </p>
          <p>
            <strong>How to Submit:</strong> Please email the required documents to our
            Admissions Team at{' '}
            <a href={`mailto:${ADMISSIONS_EMAIL}`}>{ADMISSIONS_EMAIL}</a>
          </p>
          <p><strong>Include the following in your email:</strong></p>
          <ul>
            <li>Your full name</li>
            <li>Your application ID or student reference number</li>
            <li>
              A brief note indicating that these documents are submitted in response to
              your conditional offer
            </li>
          </ul>
        </div>

        {/* Advance payment */}
        <div className="oc-step">
          <div className="oc-step-head">
            <span className="oc-step-icon"><CreditCard size={18} /></span>
            <h3>Make your advance payment</h3>
          </div>
          <p>
            Once you have accepted your offer, you will need to make an advance payment
            of fees through our secure Flywire link. This confirms your place and
            allows us to begin issuing the documents needed for your visa application.
          </p>
          <p>
            Full payment instructions — including how to set up an international payment
            plan — are available on our Fees and Funding page.
          </p>
          <a href="/fees-and-funding" className="aap-split-btn" style={{ marginTop: 6 }}>
            <CreditCard size={16} /> Fees & Payment Options <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Visa application */}
        <div className="oc-step">
          <div className="oc-step-head">
            <span className="oc-step-icon"><Plane size={18} /></span>
            <h3>Prepare for your visa application</h3>
          </div>
          <p>
            If you are applying for a visa you will need to plan carefully — it can take
            longer than you think! For example, for a student visa, one of the things
            you will need to do is show that you have enough money, and you will need to
            save this money in a bank account for at least <strong>28 days</strong>{' '}
            before you apply.
          </p>
          <p>
            You can get lots of advice from our expert international student support team
            on <strong>applying for your visa</strong>.
          </p>
          <a href="/student-support" className="aap-split-btn" style={{ marginTop: 6 }}>
            Talk to Student Support <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Learn more */}
        <h2 className="aap-learn-head" style={{ marginTop: 56 }}>Learn more</h2>
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
