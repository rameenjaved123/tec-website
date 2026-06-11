import { BookOpen, GraduationCap, Globe, Building2, MapPin, ArrowRight } from 'lucide-react';
import './InnerPage.css';
import './international/ApplicationProcessPage.css';
import './international/PreArrivalPage.css';
import PageHero from '../components/PageHero';

const courses = [
  {
    title: 'Academic English',
    desc: 'Nationally accredited and designed to develop practical, everyday English. (UK-Based Students)',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/2.jpg',
    href: '/english-language-courses',
    internal: true,
  },
  {
    title: 'ESOL',
    desc: 'English for Speakers of Other Languages. Structured to support learners from diverse backgrounds in developing strong foundational and advanced English communication. (International & UK-Based Students)',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/3.jpg',
    href: '/english-language-courses',
    internal: true,
  },
  {
    title: 'IELTS Exam Preparation',
    desc: 'Prepare for the globally recognised IELTS exam with expert guidance. (International & UK-Based Students)',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/Castle-Blvd.-Frames-1.jpg',
    href: '/ielts-exam-preparation',
    internal: true,
  },
];

const features = [
  {
    icon: <GraduationCap size={22} />,
    title: 'Experienced Teaching Faculty',
    body: (
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        <li style={{ marginBottom: 8 }}><strong>Highly experienced UK-based tutors</strong> with decades of experience in English language instruction.</li>
        <li style={{ marginBottom: 8 }}><strong>Flying faculty</strong> – visiting international experts who bring global perspectives and cutting-edge teaching methods.</li>
        <li>A teaching approach that combines academic rigour with cultural sensitivity and personalised student support.</li>
      </ul>
    ),
  },
  {
    icon: <Building2 size={22} />,
    title: 'State-of-the-Art Campus',
    body: (
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        <li style={{ marginBottom: 8 }}>Smart classrooms with <strong>audio-visual learning tools</strong></li>
        <li style={{ marginBottom: 8 }}>Language &amp; digital learning <strong>labs</strong></li>
        <li style={{ marginBottom: 8 }}>Modern student lounges and study areas</li>
        <li style={{ marginBottom: 8 }}>On-site student support services</li>
        <li>A welcoming and inclusive atmosphere for international learners</li>
      </ul>
    ),
  },
  {
    icon: <MapPin size={22} />,
    title: 'Life Beyond the Classroom',
    body: (
      <p style={{ margin: 0, lineHeight: 1.85 }}>
        Studying at Trent Language Hub means more than just learning English – it is about experiencing British culture, making international connections, and exploring one of the UK&apos;s most student-friendly cities. Nottingham is home to world-renowned universities, historic landmarks, shopping destinations, and beautiful parks. It offers an affordable cost of living and excellent transport links to <strong>London</strong>, <strong>Manchester</strong>, and <strong>Birmingham</strong>.
      </p>
    ),
  },
];

export default function TrentLanguageHubPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Trent Language Hub"
        subtitle="Here's a complete guide for international students studying at TEC."
        bgImage="https://trenteducation.co.uk/wp-content/uploads/2025/04/tec-website-photos-5.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split */}
        <div className="aap-intro-split">
          <h2>Trent Language Hub</h2>
          <p>
            Based in the historic and vibrant city of <strong>Nottingham, United Kingdom</strong>, is a flagship centre under the Trent Education brand, dedicated exclusively to the delivery of world-class English language education.
          </p>
        </div>

        {/* Campus description */}
        <div className="pa-info">
          <div className="pa-info-head">
            <span className="pa-info-icon"><Globe size={18} /></span>
            <h3>Our Campus</h3>
          </div>
          <p>
            Strategically located on the prestigious <strong>Castle Boulevard</strong>, our <strong>purpose-designed English Language campus</strong> offers students an inspiring and immersive environment that combines modern learning with rich cultural experience. Whether you&apos;re preparing for academic success, professional growth, or personal development, Trent Language Hub is your gateway to mastering the English language in the heart of the UK.
          </p>
        </div>

        {/* Why Choose — courses 3-up */}
        <div className="aap-section-head">
          <span className="aap-eyebrow">Why Choose Trent Language Hub?</span>
          <h2>Globally Recognised Qualifications</h2>
          <p>We offer a range of English language programmes designed to meet your goals.</p>
        </div>

        <div className="aap-cards-3" style={{ marginBottom: 64 }}>
          {courses.map((c, i) => {
            const inner = (
              <>
                <div className="aap-card-img">
                  <img src={c.img} alt={c.title} loading="lazy" />
                </div>
                <div className="aap-card-body">
                  <h3 className="aap-card-title">{c.title}</h3>
                  <p className="aap-card-desc">{c.desc}</p>
                </div>
              </>
            );
            if (!c.href) {
              return <div key={i} className="aap-card" style={{ cursor: 'default' }}>{inner}</div>;
            }
            if (c.internal) {
              return <a key={i} href={c.href} className="aap-card">{inner}</a>;
            }
            return <a key={i} href={c.href} target="_blank" rel="noreferrer" className="aap-card">{inner}</a>;
          })}
        </div>

        {/* Feature blocks */}
        {features.map((f, i) => (
          <div key={i} className="pa-info">
            <div className="pa-info-head">
              <span className="pa-info-icon">{f.icon}</span>
              <h3>{f.title}</h3>
            </div>
            <div style={{ fontSize: '0.96rem', color: 'var(--tec-text-light)', lineHeight: 1.85 }}>
              {f.body}
            </div>
          </div>
        ))}

        {/* Join Us split */}
        <div className="aap-split" style={{ marginBottom: 56 }}>
          <div className="aap-split-img">
            <img
              src="https://trenteducation.co.uk/wp-content/uploads/2024/02/young-woman-posing-with-book-scaled.jpg"
              alt="Student at Trent Language Hub"
              loading="lazy"
            />
          </div>
          <div className="aap-split-body">
            <span className="aap-split-eyebrow">Join Us</span>
            <h3>Speak the Future.</h3>
            <p>
              Whether you are a school graduate preparing for university, a professional upgrading your English, or simply looking to gain international experience – <strong>Trent Language Hub</strong> is here to guide you every step of the way.
            </p>
            <a href="/apply" className="aap-split-btn">
              Apply Now <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Enrolment callout */}
        <div className="aap-callout" style={{ marginBottom: 64 }}>
          <span className="aap-callout-eyebrow"><BookOpen size={12} /> Enrolment</span>
          <h3>Now Enrolling for 2025 Intakes</h3>
          <p>
            Contact us for admissions, group packages, or agency collaborations.
          </p>
        </div>

        {/* International guide banner */}
        <div className="aap-split" style={{ marginBottom: 0 }}>
          <div className="aap-split-body" style={{ background: 'var(--tec-green-dark, #122618)' }}>
            <span className="aap-split-eyebrow">International Students</span>
            <h3 style={{ color: '#fff' }}>Complete Guide for International Students</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)' }}>
              Read our guidance on the international academic programmes, application processes, student life, and support services designed to help you succeed.
            </p>
            <a href="/international" className="aap-split-btn">
              Learn More <ArrowRight size={16} />
            </a>
          </div>
          <div className="aap-split-img">
            <img
              src="https://trenteducation.co.uk/wp-content/uploads/2025/04/Black-and-White-Photo-Night-Worship-YouTube-Thumbnail.jpg"
              alt="International students guide"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
