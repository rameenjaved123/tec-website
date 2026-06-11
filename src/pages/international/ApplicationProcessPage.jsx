import { useState, useRef } from 'react';
import { ChevronDown, ArrowUpRight, Check, Megaphone, FileText } from 'lucide-react';
import '../InnerPage.css';
import './ApplicationProcessPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   The Application and Admissions Process
   Mirrors the WordPress page of the same name.
   ════════════════════════════════════════════════════════════ */

const beforeYouApply = [
  {
    title: 'Read Our International Admission Policy',
    body: (
      <p>
        Please see our International Admission Policy for full details of the application
        process including eligibility criteria, required documentation, deadlines, and how
        to submit your documents.
      </p>
    ),
  },
  {
    title: 'Support for Applicants with a Disability or Special Educational Needs',
    body: (
      <p>
        If we need any additional information you have not provided, we will reach out via
        the email provided in your application.
      </p>
    ),
  },
  {
    title: 'Uploading Supporting Documents',
    body: (
      <>
        <p>
          To ensure a smooth application process, please upload all required supporting
          documents <strong>before submitting your application</strong>.
        </p>
        <p>
          If we need any additional details beyond your uploaded documents, we will reach
          out via the email provided in your application.
        </p>
      </>
    ),
  },
  {
    title: 'Help with Your Personal Statement?',
    body: (
      <>
        <p>
          Your personal statement is one of the most important parts of your application.
          It is your chance to tell your story, explain your goals, and show why you are a
          great fit for our institution. Submitted as part of your application, it should
          explain why you are passionate about your chosen course, what makes you a strong
          candidate, and what you hope to gain from the course.
        </p>
        <a
          href="/personal-statement"
          className="aap-acc-inline-btn"
        >
          Learn More: How to Write a Personal Statement <ArrowUpRight size={14} />
        </a>
      </>
    ),
  },
];

const afterYouApply = [
  {
    title: 'Interview Process',
    body: (
      <>
        <p>
          Once your application is approved, the next step is an <strong>interview</strong>{' '}
          to assess your suitability for the course.
        </p>
        <p><strong>What to expect in the interview:</strong></p>
        <div className="aap-acc-checks">
          <div className="aap-acc-check">
            <Check size={16} className="aap-acc-check-icon" />
            <span><strong>Identity verification</strong> (ID check and screenshot)</span>
          </div>
          <div className="aap-acc-check">
            <Check size={16} className="aap-acc-check-icon" />
            <span>
              <strong>Questions about your study intentions, background, education,
              and work experience</strong> (if applicable)
            </span>
          </div>
        </div>
        <p style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <Megaphone size={16} style={{ color: 'var(--tec-gold)' }} />
          <strong>After the interview:</strong>
        </p>
        <ul>
          <li>
            If successful, you will receive a <strong>conditional offer</strong> to study
            at TEC.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'Offer Acceptance and Conditions',
    body: (
      <ul>
        <li>
          Upon receiving your <strong>Conditional Offer Letter</strong>, you will be
          required to formally accept the offer by completing the{' '}
          <strong>Offer Acceptance Form</strong>.
        </li>
        <li>
          To progress to an <strong>Unconditional Offer</strong>, you must fulfil all
          conditions outlined in the Conditional Offer Letter. Only upon meeting these
          requirements will the Unconditional Offer Letter be issued.
        </li>
      </ul>
    ),
  },
  {
    title: 'Make Advance Payment',
    body: (
      <p>
        As an international student, you will need to make an advance payment of fees when
        you have accepted your offer to study at TEC through a secure link of Flywire
        payments. You will then need to pay your tuition fees in full, or have an agreement
        to pay in two further instalments, before the start date of your course.
      </p>
    ),
  },
];

const learnMoreCards = [
  {
    title: 'Fees and Funding',
    desc: 'Tuition fees and payment plans, opening a UK bank account, scholarships and funding opportunities.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/06/Multi-faith-6.jpg',
    href: '/fees-and-funding',
    internal: true,
  },
  {
    title: 'Student Support Services',
    desc: 'Academic Support, International Student Support, Disability and Wellbeing Services.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2024/08/smiling-females-wearing-headphones-around-neck-looking-laptop-scaled.jpg',
    href: '/student-support',
    internal: true,
  },
  {
    title: 'Pre-Arrival Information',
    desc: 'Pre-departure checklist, packing essentials, important documents, airport transfers, accommodation.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/03/10.jpg',
    href: '/pre-arrival',
    internal: true,
  },
  {
    title: 'Post-Arrival Information',
    desc: 'Complete your enrolment, collect your student ID, attend orientation sessions, and explore the campus.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/tec-website-photos-3.jpg',
    href: '/post-arrival',
    internal: true,
  },
];

function Accordion({ items }) {
  const [open, setOpen] = useState(null);
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

export default function ApplicationProcessPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="The Application and Admissions Process"
        subtitle="Step-by-step guidance for international applicants — from preparing your documents to accepting your offer."
        bgImage="https://trenteducation.co.uk/wp-content/uploads/2025/04/Multi-faith-5.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split */}
        <div className="aap-intro-split">
          <h2>Thinking of studying at TEC as an international student?</h2>
          <div>
            <p>
              Explore our step-by-step application guidance for all courses, including
              entry requirements and essential post-application advice.
            </p>
            <p>We are here to support you at every stage of your journey!</p>
          </div>
        </div>

        {/* Image + body — Applying to TEC */}
        <div className="aap-split">
          <div className="aap-split-img">
            <img
              src="https://trenteducation.co.uk/wp-content/uploads/2025/04/Multi-faith-5.jpg"
              alt="Students at Trent Education Centre"
              loading="lazy"
            />
          </div>
          <div className="aap-split-body">
            <span className="aap-split-eyebrow">How to Apply</span>
            <h3>Applying to Trent Education Centre (TEC)</h3>
            <p>
              If you wish to apply directly to TEC independently, you can submit your
              application using our online Application Form.
            </p>
            <a href="/application-form" className="aap-split-btn">
              <FileText size={16} /> Application Form
            </a>
          </div>
        </div>

        {/* Section heading — Before you apply */}
        <div className="aap-section-head">
          <span className="aap-eyebrow">Before You Apply</span>
          <h2>Essential Preparation Steps</h2>
          <p>
            Before starting your application, make sure you are fully prepared by following
            these important steps.
          </p>
        </div>

        {/* Accordion — before */}
        <Accordion items={beforeYouApply} />

        {/* What Happens After You Apply — call-out */}
        <div className="aap-callout">
          <span className="aap-callout-eyebrow">
            <Megaphone size={12} /> What Happens Next
          </span>
          <h3>What Happens After You Apply</h3>
          <p>
            We will assess your application. If we request any further information, please
            follow the instructions in the email sent to you by the admissions team and
            upload the necessary documents (if any) directly to the link provided in the
            email. This is the <strong>fastest</strong> way to process your application.
          </p>
        </div>

        {/* Accordion — after */}
        <Accordion items={afterYouApply} />

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
