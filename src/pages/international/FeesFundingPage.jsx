import { useState, useRef } from 'react';
import {
  ChevronDown, ArrowUpRight, GraduationCap, Home, CreditCard,
  Wallet, Globe, ShieldCheck, Mail,
} from 'lucide-react';
import '../InnerPage.css';
import './ApplicationProcessPage.css';
import './FeesFundingPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   Fees and Funding page
   Mirrors WordPress /fees-and-funding/ — wording verbatim.
   ════════════════════════════════════════════════════════════ */

const FLYWIRE = 'https://flywire.com/pay/subdomain';

const monthlyCosts = [
  { label: 'Groceries', val: '£144 – £200' },
  { label: 'Socialising', val: '£66' },
  { label: 'Travel', val: '£69' },
  { label: 'Household bills', val: '£79' },
  { label: 'Clothes & shopping', val: '£48' },
  { label: 'Mobile phone', val: '£24' },
  { label: 'Health & wellbeing', val: '£26' },
];

const sections = [
  {
    title: 'Fees for International Students',
    body: (
      <>
        <p>
          International students – see the fees for this course, as well as the estimated
          living costs during your stay in the UK. All prices are in UK Pounds Sterling.
        </p>

        {/* Fee highlight */}
        <div className="ff-fee-card">
          <span className="ff-fee-icon"><GraduationCap size={22} /></span>
          <div className="ff-fee-meta">
            <span className="ff-fee-label">Course Fee</span>
            <span className="ff-fee-amount">£6,000</span>
          </div>
        </div>

        <p>
          Your course fees cover the cost of studies and include loads of great benefits,
          such as the use of our library, support from our expert team and free use of the
          IT equipment across the campus.
        </p>

        <div className="ff-subhead">
          <Home size={18} /> Estimated Monthly Costs
        </div>
        <p>
          The cost of living for a student in Nottingham remains cheaper than in other big
          cities in the UK. How much you spend of course will depend on your own lifestyle.
          You may find that the costs of goods and services in the UK are different to
          those in your own country and this can take some time to get used to.
        </p>
        <p>
          As an international student at TEC, it is really important that you are
          well-prepared and budget carefully because it is not just your fees you will
          need to pay. You will have immediate costs when you arrive, and daily, weekly
          and monthly expenses too.
        </p>
        <p>
          The average monthly cost of being a student in Nottingham depends very much on
          your own lifestyle. Here is an approximate guide to what you can expect to pay
          monthly as a student here, using insights from the National Student Money
          Survey 2025.
        </p>

        <div className="ff-cost-grid">
          {monthlyCosts.map((c, i) => (
            <div key={i} className="ff-cost-tile">
              <span className="ff-cost-tile-label">{c.label}</span>
              <span className="ff-cost-tile-val">{c.val}</span>
            </div>
          ))}
        </div>

        <p>
          Accommodation is the biggest expense for most students. The monthly cost of
          accommodation can depend on a number of things such as:
        </p>
        <ul>
          <li>The number of people you live with;</li>
          <li>The amount of space you have;</li>
          <li>Any private facilities (such as an en-suite shower room);</li>
          <li>The location of the property;</li>
          <li>Whether or not bills are included.</li>
        </ul>

        <div className="ff-acc-strip">
          We advise an approximate average monthly amount of{' '}
          <strong>£580 – £1,250</strong> for accommodation.
        </div>

        <div className="ff-subhead">
          <CreditCard size={18} /> Paying fees
        </div>
        <p>
          As an international student, you will need to make an advance payment of{' '}
          <strong>£3,000</strong> when you have accepted your offer to study at TEC
          through a secure link of Flywire payments. You will then need to pay your
          remaining tuition fees in full before the start date of your course.
        </p>

        <div className="ff-subhead">
          <Mail size={18} /> Enquiries
        </div>
        <p>
          If you have any queries relating to advance payments or arrangements to pay,
          please contact our friendly and experienced admissions team.
        </p>
      </>
    ),
  },
  {
    title: 'Payment through Flywire',
    body: (
      <>
        <p>
          As the <strong>Trusted Choice</strong> of millions of students and thousands of
          institutions worldwide, <strong>Flywire</strong> is the safest, most convenient
          way to make your education payment to <strong>Trent Education Centre</strong>.
        </p>

        <a href={FLYWIRE} target="_blank" rel="noreferrer" className="ff-fly-btn">
          <span className="ff-fly-btn-badge">Pay Now</span>
          Pay with Flywire <ArrowUpRight size={14} />
        </a>

        <div className="ff-subhead">Why use Flywire?</div>
        <ul>
          <li>
            Use secure, flexible options to{' '}
            <strong>pay from 240 countries and territories, in 140+ currencies</strong>.
          </li>
          <li>
            Choose from <strong>convenient, local payment methods</strong> including bank
            transfers, credit cards, e-wallets and more.
          </li>
          <li>
            Take advantage of Flywire's{' '}
            <a
              href="https://www.flywire.com/legal/best-price-guarantee"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--tec-gold)', fontWeight: 700 }}
            >
              Best Price Guarantee
            </a>{' '}
            for local bank transfers.
          </li>
          <li>
            <strong>Track payments every step of the way</strong> via email, mobile app
            and text alerts.
          </li>
          <li>
            Access <strong>around-the-clock multilingual support</strong> from the{' '}
            <a
              href="https://help.flywire.com/hc/en-us"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--tec-gold)', fontWeight: 700 }}
            >
              Flywire Help Centre
            </a>{' '}
            via email, phone or live chat.
          </li>
        </ul>

        <p style={{ marginTop: 14 }}>
          <strong>Easily pay your education expenses now!</strong>
        </p>
      </>
    ),
  },
  {
    title: 'Payment Plans for International Students',
    body: (
      <>
        <p>
          International students can now set up payment plans using accounts from your
          home country via Flywire. Click the button below to begin the process.
        </p>

        <a href={FLYWIRE} target="_blank" rel="noreferrer" className="ff-fly-btn">
          <span className="ff-fly-btn-badge">Plan</span>
          Start your Payment Plan <ArrowUpRight size={14} />
        </a>

        <div className="ff-subhead">Follow the steps below to get started:</div>
        <ul>
          <li>
            Create a Flywire account using your TEC email address and entering the
            required information. You will receive a second email to "Verify Your Email
            Address" and complete the setup by entering your name and student ID.
          </li>
          <li>
            Select the desired plan option (a small plan enrolment fee will be added to
            the balance).
          </li>
          <li>Alternatively, you may opt to "Make a one-time payment" to pay your balance in full.</li>
          <li>Enter the total balance you want to create a plan for.</li>
          <li>
            The first instalment + plan enrolment fee will be due immediately to activate
            the payment plan.
          </li>
          <li>
            Follow the steps shown to select your country and payment method, and
            complete the transaction by transferring the funds to Flywire.
          </li>
          <li>You will receive email updates and notifications about your payment.</li>
          <li>
            For consecutive instalments, you will be notified via email to return to the
            site to complete your remaining payments.
          </li>
        </ul>

        <div className="ff-subhead">
          <ShieldCheck size={18} /> Did you know?
        </div>
        <ul>
          <li>
            Flywire is the global market leader for education payments — the Trusted
            Choice of millions of students, thousands of institutions and recruitment
            agents, and hundreds of partners worldwide.
          </li>
          <li>
            Convenient payment options from over <strong>240 countries</strong> and
            territories, in more than <strong>140+ currencies</strong>.
          </li>
          <li>
            Supports a variety of local payment methods including bank transfers, credit
            cards, e-wallets and more.
          </li>
          <li>
            Guarantees payment as soon as funds are received in any of their accounts
            worldwide.
          </li>
          <li>
            Real-time payment tracking via email, in-app and text alerts.
          </li>
          <li>Around-the-clock multilingual support via email, phone or live chat.</li>
          <li>
            Internal controls ensure that funds are secure and protected against fraud.
          </li>
        </ul>
      </>
    ),
  },
];

const learnMoreCards = [
  {
    title: 'The Application and Admission Process',
    desc: 'Entry requirements, how to apply, visa and immigration guidance.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/03/8.jpg',
    href: '/application-process',
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
    title: 'How to write a Personal Statement',
    desc: 'No one can tell your story better than you. Share your ambitions, strengths, and experiences in your own words.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/06/cropped-photo-attractive-young-man-office-working-scaled.jpg',
    href: '/personal-statement',
    internal: true,
  },
  {
    title: 'Pre-Arrival Information',
    desc: 'Pre-departure checklist, packing essentials, important documents, airport transfers, accommodation.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/03/10.jpg',
    href: '/pre-arrival',
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
      // Scroll the opened item to the top of the viewport (with a small offset)
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

export default function FeesFundingPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Fees and Funding"
        subtitle="Invest in your future — affordable course fees and flexible payment options for international students."
        bgImage="https://trenteducation.co.uk/wp-content/uploads/2025/04/Multi-faith-6.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split */}
        <div className="aap-intro-split">
          <h2>Invest in Your Future</h2>
          <p>
            <strong>At Trent Education Centre (TEC),</strong> we are committed to helping
            international students access high-quality education through affordable
            course fees and flexible payment options.
          </p>
        </div>

        {/* Section heading */}
        <div className="aap-section-head">
          <span className="aap-eyebrow">In this section, you will find</span>
          <h2>Everything you need to plan and pay your fees</h2>
          <p>
            Course costs, monthly living estimates, secure payment options through
            Flywire, and flexible payment plans tailored to international students.
          </p>
        </div>

        {/* Accordion */}
        <Accordion items={sections} />

        {/* Closing line */}
        <p className="ff-closer">
          Let us help you take the next step in your academic journey with confidence!
        </p>

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
