import {
  ArrowUpRight, ClipboardCheck, GraduationCap, CreditCard, Home,
  Landmark, Stethoscope, LifeBuoy, Share2, Instagram, Facebook,
  Linkedin, Youtube,
} from 'lucide-react';
import '../InnerPage.css';
import './ApplicationProcessPage.css';
import './OfferChecklistPage.css';
import './PreArrivalPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   Post-Arrival Information page
   Mirrors WordPress /post-arrival-information/ — wording verbatim.
   ════════════════════════════════════════════════════════════ */

const steps = [
  {
    icon: <ClipboardCheck size={18} />,
    title: 'Complete your enrolment',
    body: (
      <p>
        Enrolment for international students is a two-step process. Firstly, you will be
        encouraged to start your enrolment online. This involves checking the information
        we have about you, paying your tuition fees, or setting up an instalment
        arrangement. Then, when you arrive in the UK, you should attend our International
        Enrolment Event to complete enrolment in person. This is where you'll show your
        visa documentation, meet our support staff, and collect your TEC Student Card.
      </p>
    ),
  },
  {
    icon: <GraduationCap size={18} />,
    title: 'Attend your Course Induction',
    body: (
      <p>
        Your course induction is compulsory so it is really important that you check your
        timetable and attend right from the first day. If you miss these you risk falling
        behind and missing key opportunities to: meet course staff and fellow students;
        explore facilities and learning resources you will use, be introduced to the
        first modules of your course.
      </p>
    ),
  },
];

const stepsRow = [
  {
    icon: <CreditCard size={18} />,
    title: 'Pay your fees',
    body: (
      <p>
        Make sure you have made arrangements to pay the rest of your tuition fees in full
        or have set up a plan to pay your fees in installments. If you opt for an
        instalment plan, no money will be taken from your account until the instalment
        dates. When you open a UK bank account, you can change the payment details on
        your instalment plan, if necessary. Our finance team will be at the International
        Enrolment event so you can speak to them if you have any questions.
      </p>
    ),
  },
  {
    icon: <Home size={18} />,
    title: 'Settle into your New Home',
    body: (
      <>
        <p>
          It is important to make your new accommodation feel like your home from home.
          There are lots of shops in Nottingham to buy essential items and kit out your
          room with home comforts. Introduce yourself to your flatmates — it is a great
          time to explore Nottingham together, find your way around campus, and discover
          your new favourite spots.
        </p>
        <p>
          We strongly advise you to book your accommodation before you travel. If you
          have not arranged this in advance, please make sure you have a temporary option
          booked (such as a hotel) for your arrival.
        </p>
      </>
    ),
  },
];

const stepsAfter = [
  {
    icon: <Landmark size={18} />,
    title: 'Open a UK Bank Account',
    body: (
      <p>
        When you arrive, we recommend that you open a UK bank account. You can use this
        account to pay your rent and bills, transfer money from overseas and, if you
        decide to work part-time, your employer will be able to pay your wages into this
        account. You can get advice on student bank accounts from our International
        Student Support team and will need a letter from your Academic School confirming
        you are a student.
      </p>
    ),
  },
  {
    icon: <Stethoscope size={18} />,
    title: 'Register with a Doctor',
    body: (
      <p>
        All international students have access to NHS healthcare after paying the NHS
        healthcare surcharge at the time of visa processing. We strongly recommend
        registering with a local medical practice nearby to your accommodation when you
        arrive. If you're aged 18 or over and study in the UK you'll be eligible for a
        free COVID-19 vaccination. You'll need your NHS number which you'll get when you
        register with a doctor. You may also be encouraged to have a Meningitis ACWY
        vaccination.
      </p>
    ),
  },
  {
    icon: <LifeBuoy size={18} />,
    title: 'Meet our Student Support Services',
    body: (
      <p>
        If you need advice on working in the UK, have immigration questions or feel
        homesick and just want someone to talk to, they are there to help you. If you
        have a diagnosed disability, require specialist support or need practical
        adjustments, we can provide advice and guidance throughout your transition to
        TEC.
      </p>
    ),
  },
];

const socials = [
  { label: 'TEC Instagram', icon: <Instagram size={14} />, href: 'https://www.instagram.com/trent_education_centre/' },
  { label: 'TEC Facebook',  icon: <Facebook size={14} />,  href: 'https://www.facebook.com/profile.php?id=61551912643921' },
  { label: 'TEC LinkedIn',  icon: <Linkedin size={14} />,  href: 'https://www.linkedin.com/company/63814420/admin/dashboard/' },
  { label: 'TEC YouTube',   icon: <Youtube size={14} />,   href: 'https://www.youtube.com/@TrentEducationCentre' },
];

const learnMoreCards = [
  {
    title: 'Student Support Services',
    desc: 'Academic Support, International Student Support, Disability and Wellbeing Services.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2024/08/smiling-females-wearing-headphones-around-neck-looking-laptop-scaled.jpg',
    href: '/student-support',
    internal: true,
  },
  {
    title: 'Pre-Arrival Information',
    desc: 'Pre-departure checklist, packing essentials, important documents to carry, airport transfers and transportation options, accommodation options.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/03/10.jpg',
    href: '/pre-arrival',
    internal: true,
  },
  {
    title: 'Things to do in Nottingham',
    desc: 'Sightseeing, tours, museums, parks, and markets.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/03/5.jpg',
    href: '/things-to-do-nottingham',
    internal: true,
  },
  {
    title: 'Where to Eat Out in Nottingham',
    desc: 'Discover essential tips on where to find diverse and affordable food options in Nottingham.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/03/6-1.jpg',
    href: '/eat-out-nottingham',
    internal: true,
  },
];

function StepBlock({ icon, title, body, number }) {
  return (
    <div className="oc-step">
      <div className="oc-step-head">
        <span className="oc-step-icon">{icon}</span>
        <h3>
          {number ? <span style={{ color: 'var(--tec-gold)', marginRight: 8 }}>{number}.</span> : null}
          {title}
        </h3>
      </div>
      {body}
    </div>
  );
}

export default function PostArrivalPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Post-Arrival Information"
        subtitle="Everything you need to know to settle in, complete enrolment, and start your student journey with confidence."
        bgImage="https://trenteducation.co.uk/wp-content/uploads/2025/04/Multi-faith-4.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split */}
        <div className="aap-intro-split">
          <h2>Get Ready for TEC: What to Know After You Arrive</h2>
          <p>
            Everything you need to know to settle in, complete enrolment, and start your
            student journey with confidence.
          </p>
        </div>

        {/* Step 1 — image + body card */}
        <div className="aap-split">
          <div className="aap-split-body">
            <span className="aap-split-eyebrow">Step 1</span>
            <h3>Complete your enrolment</h3>
            <p>
              Enrolment for international students is a two-step process. Firstly, you
              will be encouraged to start your enrolment online. This involves checking
              the information we have about you, paying your tuition fees, or setting up
              an instalment arrangement. Then, when you arrive in the UK, you should
              attend our International Enrolment Event to complete enrolment in person.
              This is where you'll show your visa documentation, meet our support staff,
              and collect your TEC Student Card.
            </p>
          </div>
          <div className="aap-split-img">
            <img
              src="https://trenteducation.co.uk/wp-content/uploads/2025/04/tec-website-photos.jpg"
              alt="International Enrolment Event at TEC"
              loading="lazy"
            />
          </div>
        </div>

        {/* Step 2 */}
        <StepBlock number={2} icon={<GraduationCap size={18} />} title={steps[1].title} body={steps[1].body} />

        {/* Steps 3 & 4 — two-column */}
        <div className="pa-two-col">
          {stepsRow.map((s, i) => (
            <div key={i} className="pa-info">
              <div className="pa-info-head">
                <span className="pa-info-icon">{s.icon}</span>
                <h3>
                  <span style={{ color: 'var(--tec-gold)', marginRight: 8 }}>{i + 3}.</span>
                  {s.title}
                </h3>
              </div>
              {s.body}
            </div>
          ))}
        </div>

        {/* Steps 5-7 */}
        {stepsAfter.map((s, i) => (
          <StepBlock key={i} number={i + 5} icon={s.icon} title={s.title} body={s.body} />
        ))}

        {/* Step 8 — Social */}
        <div
          className="oc-next-banner"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18,38,24,0.85), rgba(18,38,24,0.85)), url(https://trenteducation.co.uk/wp-content/uploads/2025/04/Multi-faith-4.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="oc-next-banner-inner">
            <span className="oc-next-eyebrow">
              <Share2 size={12} /> Step 8
            </span>
            <h3>Follow us on Social Media</h3>
            <p>
              There are many ways to keep up-to-date with all that is going on around in
              TEC. You can join us on social media to get the latest news and meet new
              friends. There are groups if you want to meet people in your accommodation,
              or on your course. Come and join us!
            </p>
            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 10, marginTop: 18, justifyContent: 'flex-start' }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="aap-split-btn"
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}
                >
                  {s.icon} {s.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
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
