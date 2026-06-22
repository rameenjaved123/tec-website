import { useState, useRef } from 'react';
import {
  ChevronDown, ArrowUpRight, FileCheck, Plane, Home, Users,
  Package, Wallet, ShieldCheck, Calendar, ScrollText,
} from 'lucide-react';
import '../InnerPage.css';
import './ApplicationProcessPage.css';
import './PreArrivalPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   Pre-Arrival Information page
   Mirrors WordPress /pre-arrival-information/ — wording verbatim.
   ════════════════════════════════════════════════════════════ */

const GOV_CHECK_VISA = 'https://www.gov.uk/check-uk-visa';
const HMRC_BANNED = 'https://www.gov.uk/bringing-goods-into-uk-personal-use/banned-and-restricted-goods';

const financeAcc = [
  {
    title: 'Managing Living Costs and Finances for International Students',
    body: (
      <>
        <p>
          The cost of living in Nottingham is generally more affordable compared to other
          large UK cities, making it a great choice for international students.
        </p>
        <p>
          Your personal spending will depend on your lifestyle choices. Keep in mind that
          the cost of goods and services in the UK may differ from what you're accustomed
          to, so it may take some time to adjust to these changes.
        </p>
        <p>
          This page provides a detailed overview of expected costs, along with useful tips
          on how to manage your budget and finances.
        </p>
      </>
    ),
  },
  {
    title: 'What to Expect and How to Plan',
    body: (
      <p>
        As an international student at TEC, it's important to prepare and budget
        carefully. In addition to your tuition fees, you will need to consider other
        expenses, including initial costs when you arrive and ongoing daily, weekly, and
        monthly expenditures.
      </p>
    ),
  },
  {
    title: 'Estimated Costs for International Students at TEC',
    body: (
      <>
        <p>Here is a rough guide to the living expenses you can expect as a student at TEC in Nottingham.</p>
        <p>
          For your Student visa, it's important to have enough funds to cover your living
          costs, with a minimum of <strong>£1,136 per month</strong> in Nottingham.
          (Updated 2 January 2025.)
        </p>
      </>
    ),
  },
];

const rightToStudyAcc = [
  {
    title: 'Duration of Study',
    body: (
      <p>
        <strong>Short-Term Study Visa:</strong> Stay for the course length plus up to{' '}
        <strong>30 days</strong> (maximum <strong>11 months</strong>).
      </p>
    ),
  },
  {
    title: 'Access to Support Services',
    body: (
      <>
        <p>
          As a student at Trent Education Centre Limited, you have access to our{' '}
          <strong>student support services</strong>, including:
        </p>
        <ul>
          <li><strong>Induction programmes</strong> to help you settle in.</li>
          <li><strong>Academic support</strong> and guidance.</li>
          <li><strong>Welfare services</strong> for personal support.</li>
        </ul>
      </>
    ),
  },
];

const arrivalAcc = [
  {
    title: 'Avoid the e-gates',
    body: (
      <p>
        If you are travelling on a Student Route or Visit Visa, do not use the ePassport
        gates upon arrival in the UK. You need to have your passport stamped to validate
        your visa or vignette. Instead, head to a staffed booth where a Border Force
        Officer will stamp your passport after checking your documents.
      </p>
    ),
  },
  {
    title: 'Passport Control',
    body: (
      <>
        <p>
          At passport control, you will need to present your passport and visa. Be
          prepared to also show the following documents, which should be in your hand
          luggage:
        </p>
        <ul>
          <li>Proof of funding</li>
          <li>A recent medical report, including x-ray results (if required)</li>
          <li>Your unconditional offer letter from TEC</li>
        </ul>
        <p>To speed up the process at UK passport control, follow these tips:</p>
        <ul>
          <li>Remove your passport from its cover and have it open to the photo page</li>
          <li>Take off any hats, sunglasses, or headphones</li>
          <li>Put away your mobile phone or tablet before seeing the officer</li>
          <li>If you are travelling with family, stay together</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Immigration Interview',
    body: (
      <>
        <p>
          Be prepared for an interview with UK Visas and Immigration (UKVI) staff. You
          will be asked questions in English, and it is important that you can respond
          without needing an interpreter. Failure to communicate effectively may result in
          being denied entry to the UK and sent back home. Questions might include where
          you are staying and why you are visiting the UK. If you provided biometrics
          during your visa application, you may also be fingerprinted.
        </p>
        <p>Since UK border control can be busy, expect possible waiting times in the queue.</p>
      </>
    ),
  },
  {
    title: 'Collecting Your Luggage',
    body: (
      <>
        <p>
          Don't forget to collect your checked luggage. The baggage carousel for your
          flight will be displayed on the information screens after passport control.
          You may have to wait a bit before the luggage starts coming through.
        </p>
        <p>
          If there are any issues with missing or damaged luggage, visit the baggage desk,
          which is typically located near the carousels.
        </p>
      </>
    ),
  },
];

const accommodationAcc = [
  {
    title: 'Private Student Accommodation',
    body: <p>Nottingham has private student accommodation buildings, offering a range of amenities and services.</p>,
  },
  {
    title: 'Private Rented Accommodation',
    body: <p>You can also rent rooms, studios, or apartments in shared houses or flats.</p>,
  },
  {
    title: 'Homestay',
    body: <p>Consider homestay options, where you live with a local family.</p>,
  },
];

const guarantorAcc = [
  {
    title: 'Guarantor',
    body: <p>Landlords may require a UK-based guarantor (someone who will pay the rent if you cannot) or upfront payment of rent.</p>,
  },
  {
    title: 'Deposit',
    body: <p>You will need to pay a refundable tenancy deposit, which should be held by an approved tenancy deposit scheme.</p>,
  },
];

const learnMoreCards = [
  {
    title: 'Post-Arrival Information',
    desc: 'Complete your enrolment, collect your student ID, attend orientation sessions, and explore the campus.',
    img: '/uploads/2025/04/tec-website-photos-3.jpg',
    href: '/post-arrival',
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
    title: 'Things to do in Nottingham',
    desc: 'Sightseeing, tours, museums, parks, and markets.',
    img: '/uploads/2025/03/5.jpg',
    href: '/things-to-do-nottingham',
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

function Accordion({ items, openFirst = false }) {
  const [open, setOpen] = useState(openFirst ? 0 : null);
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

export default function PreArrivalPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Pre-Arrival Information"
        subtitle="Get ready for TEC — what to know before you arrive in the UK."
        bgImage="/uploads/2025/04/Multi-faith-13.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split */}
        <div className="aap-intro-split">
          <h2>Get Ready for TEC: What to Know Before You Arrive</h2>
          <p>
            We are delighted that you are considering joining Trent Education Centre
            Limited for your short-term study in the UK. This outlines the essential
            rights and obligations for international students entering the UK under a{' '}
            <strong>Short-Term Study Visa</strong>. Understanding these responsibilities
            ensures your stay is both legal and rewarding.
          </p>
        </div>

        {/* Visa & Entry Clearance — image + body */}
        <div className="aap-split">
          <div className="aap-split-img">
            <img
              src="/uploads/2025/04/Multi-faith-13.jpg"
              alt="International students at TEC"
              loading="lazy"
            />
          </div>
          <div className="aap-split-body">
            <span className="aap-split-eyebrow">Step One</span>
            <h3>Visa and Entry Clearance</h3>
            <p>
              Most international students are required to obtain a visa or entry
              clearance to study in the UK. To determine whether this applies to you,
              you can complete a self-assessment on the UK Government's Home Office
              website.
            </p>
            <a href={GOV_CHECK_VISA} target="_blank" rel="noreferrer" className="aap-split-btn">
              <FileCheck size={16} /> Check if you need a UK Visa <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* eVisa info block */}
        <div className="pa-info">
          <div className="pa-info-head">
            <span className="pa-info-icon"><ShieldCheck size={18} /></span>
            <h3>About your eVisa & Student Route conditions</h3>
          </div>
          <p>
            An eVisa serves as an electronic record of your immigration status and
            outlines the terms of your permission to enter and stay in the UK, replacing
            traditional documents like Biometric Residence Permits (BRPs).
          </p>
          <p>
            When entering the UK on a Student Visa, there are specific conditions you
            must understand, along with the need to create online accounts to access
            your eVisa. These include your responsibilities as a Student Route visa
            holder, your work rights in the UK, and limitations on driving within the
            country.
          </p>
          <p>
            The UK Government provides comprehensive information regarding Student
            Visas.{' '}
            <a href={GOV_CHECK_VISA} target="_blank" rel="noreferrer">
              For full details and guidance, please visit the official website.
            </a>
          </p>
        </div>

        {/* Two-column: When to arrive (with accordion) + Right to Study (with accordion) */}
        <div className="pa-two-col">

          {/* When to arrive */}
          <div className="pa-info">
            <div className="pa-info-head">
              <span className="pa-info-icon"><Calendar size={18} /></span>
              <h3>When to arrive</h3>
            </div>
            <p>
              Make sure you arrive in Nottingham before your course start date to ensure
              you can move in and get settled.
            </p>
            <div className="pa-sub">Living costs & finances</div>
            <Accordion items={financeAcc} />
          </div>

          {/* Right to Study */}
          <div className="pa-info">
            <div className="pa-info-head">
              <span className="pa-info-icon"><ScrollText size={18} /></span>
              <h3>Right to Study</h3>
            </div>
            <ul>
              <li>
                You are entitled to study <strong>only the course</strong> specified in
                your acceptance letter from Trent Education Centre Limited.
              </li>
              <li>
                Course changes or transfers to other institutions are{' '}
                <strong>not permitted</strong> under these visas.
              </li>
            </ul>
            <div className="pa-sub">Duration & support</div>
            <Accordion items={rightToStudyAcc} />
          </div>

        </div>

        {/* Bringing your family */}
        <div className="pa-info">
          <div className="pa-info-head">
            <span className="pa-info-icon"><Users size={18} /></span>
            <h3>Bringing your family to the UK</h3>
          </div>
          <p>
            Students coming to study are no longer eligible to bring dependants.
            Students studying for research or PhD courses are still eligible to bring
            dependants.
          </p>
          <p>
            If you are eligible and bringing dependants with you, you need to think about
            more than just your own arrangements. Ensure suitable accommodation and
            childcare arrangements are made in advance.
          </p>
        </div>

        {/* What to pack */}
        <div className="pa-info">
          <div className="pa-info-head">
            <span className="pa-info-icon"><Package size={18} /></span>
            <h3>What to pack</h3>
          </div>
          <p>
            There are restrictions on certain items you can bring into the UK. Meat and
            fish products, all non-prescription drugs, and animals are not allowed. For
            a full list of banned and restricted goods,{' '}
            <a href={HMRC_BANNED} target="_blank" rel="noreferrer">
              visit the HMRC website
            </a>{' '}
            to ensure you are aware of the regulations before you travel.
          </p>
          <p>
            It is important to bring enough money for your first few weeks in the UK.
            However, we recommend avoiding carrying large amounts of cash to reduce the
            risk of theft. If you are travelling with more than{' '}
            <strong>€10,000</strong> (or its equivalent in other currencies), you must
            declare it at customs. For safety, we suggest carrying no more than{' '}
            <strong>£500–£600</strong> in cash and using a pre-paid credit card for the
            rest, or relying on traveller's cheques or a bank card that works in the UK.
          </p>
        </div>

        {/* Two-column: Arrival at airport + Accommodation */}
        <div className="pa-two-col">

          {/* Arrival */}
          <div className="pa-info">
            <div className="pa-info-head">
              <span className="pa-info-icon"><Plane size={18} /></span>
              <h3>Arrival Guidance at the Airport</h3>
            </div>
            <p>
              Arriving in a new country can feel overwhelming, but we've outlined the
              steps below to help make your arrival smoother and ensure you know exactly
              what to expect when you land.
            </p>
            <Accordion items={arrivalAcc} />
          </div>

          {/* Accommodation */}
          <div className="pa-info">
            <div className="pa-info-head">
              <span className="pa-info-icon"><Home size={18} /></span>
              <h3>Accommodation</h3>
            </div>
            <p>
              For international students in Nottingham, planning accommodation involves
              securing temporary housing, student hostels, researching private rental
              options, understanding tenancy agreements, being aware of costs, knowing
              your rights, and potentially using a guarantor service if needed. It is
              ideal to arrange accommodation near <strong>NG5, NG6, NG7</strong>.
            </p>
            <div className="pa-sub">Accommodation Options</div>
            <Accordion items={accommodationAcc} />
            <div className="pa-sub">
              <Wallet size={16} /> Guarantor & Deposit
            </div>
            <Accordion items={guarantorAcc} />
          </div>

        </div>

        {/* Learn more */}
        <h2 className="aap-learn-head">Learn more about life at TEC</h2>
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
