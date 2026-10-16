import { useEffect } from 'react';

/*
 * Standalone landing page for Saudi (KSA) government-sponsored students.
 * Rendered OUTSIDE the main AppLayout (no site navbar/footer/chat) so it can be
 * shared as a single, focused English-programme reference. Fully self-contained:
 * all styles are scoped under `.ksa-` and inlined here so it touches nothing else.
 */

const BRAND = {
  green: '#0f3d24',
  greenMid: '#1a4a2e',
  gold: '#c9a227',
};

const APPLY_URL = '/application-form';
const ADMISSIONS_EMAIL = 'admissions@trenteducation.ac.uk';
const WHATSAPP = '+44 7463 026467';

const WHY_TEC = [
  { img: '/assets/images/events/tec-classroom-session.webp', title: 'Modern Classrooms', text: 'Bright, well-equipped classrooms designed for interactive language learning.' },
  { img: '/assets/images/events/teacher-classroom-portrait.jpg', title: 'Experienced Faculty', text: 'Qualified, supportive English teachers focused on your progress.' },
  { img: '/assets/images/events/student-common-room.jpg', title: 'Comfortable Facilities', text: 'A welcoming student environment with comfortable study and social spaces.' },
  { img: '/assets/images/events/student-support-session.jpg', title: 'One-to-One Support', text: 'Personal academic and welfare support throughout your studies.' },
  { img: '/assets/images/events/esol-trip.jpg', title: 'Life Beyond the Classroom', text: 'Trips and activities to practise English and experience life in the UK.' },
  { img: '/assets/images/events/student-lounge-group.jpg', title: 'Indoor Games & Leisure', text: 'A relaxed leisure area to unwind and make friends between classes.' },
];

const SKILLS = [
  { title: 'Speaking & Communication', text: 'Develop fluency, pronunciation, discussion skills and confidence in everyday, academic and professional situations.' },
  { title: 'Listening', text: 'Understand conversations, classroom instruction, lectures and a range of spoken English accents and contexts.' },
  { title: 'Reading', text: 'Build comprehension, vocabulary and the ability to identify key ideas, detail, purpose and meaning in different text types.' },
  { title: 'Writing', text: 'Improve sentence structure, grammar, paragraphing and organisation for emails, reports, essays and academic tasks.' },
  { title: 'Grammar & Vocabulary', text: 'Strengthen accuracy and expand the vocabulary needed for study, work and day-to-day communication.' },
  { title: 'Academic & Study Skills', text: 'Develop note-taking, presentation, seminar participation, research awareness and independent learning strategies.' },
];

const OUTCOMES = [
  'Communicate more confidently and effectively in English',
  'Understand and respond to a wider range of spoken and written English',
  'Write with improved structure, accuracy and clarity',
  'Participate more effectively in lessons, discussions and presentations',
  'Use English more independently for study, work and daily life',
  'Prepare for the language demands of further or higher education',
];

const ACCREDITATIONS = [
  { img: '/assets/badges/british-council-badge.png', alt: 'British Council Accredited' },
  { img: '/assets/logos/partners/ascentis.png', alt: 'Ascentis Awarding Organisation' },
  { img: '/assets/logos/british-council-ielts.jpg', alt: 'IELTS Registration Centre' },
  { img: '/assets/logos/ncfe.jpg', alt: 'NCFE' },
  { img: '/assets/badges/asic.jpg', alt: 'ASIC Accredited' },
];

function Fact({ label, value }) {
  return (
    <div className="ksa-fact">
      <span className="ksa-fact-label">{label}</span>
      <span className="ksa-fact-value">{value}</span>
    </div>
  );
}

export default function StudyEnglishKSAPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Study English in Nottingham — Trent Education Centre';
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="ksa-root">
      <style>{ksaStyles}</style>

      {/* Top bar */}
      <header className="ksa-topbar">
        <img src="/assets/logos/tec-logo-transparent.png" alt="Trent Education Centre" className="ksa-logo" />
        <a href={APPLY_URL} className="ksa-btn ksa-btn-gold ksa-topbar-cta">Apply / Enrol</a>
      </header>

      {/* Hero */}
      <section className="ksa-hero">
        <div className="ksa-hero-overlay" />
        <div className="ksa-hero-inner">
          <p className="ksa-welcome">مرحباً بكم · Welcome</p>
          <h1 className="ksa-hero-title">Study English in Nottingham, UK</h1>
          <p className="ksa-hero-sub">
            A premier English Language Programme at Trent Education Centre — a British Council
            accredited English language centre in the heart of the United Kingdom.
          </p>
          <div className="ksa-badge-line">
            <span className="ksa-pill">British Council Accredited</span>
            <span className="ksa-pill">Government-Sponsored Students Welcome</span>
          </div>
          <div className="ksa-facts">
            <Fact label="Duration" value="Up to 11 months" />
            <Fact label="Tuition" value="20 hours / week" />
            <Fact label="Location" value="Castle Boulevard, Nottingham" />
            <Fact label="Mode" value="Face-to-face" />
          </div>
          <a href={APPLY_URL} className="ksa-btn ksa-btn-gold ksa-hero-cta">Apply Now</a>
        </div>
      </section>

      {/* About */}
      <section className="ksa-section">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">The Programme</span>
          <h2 className="ksa-h2">A structured pathway to stronger English</h2>
          <p className="ksa-lead">
            Trent Education Centre offers a structured English Language Programme for students who
            want to improve their English for everyday life, professional development and further
            study. It is delivered at our Castle Boulevard campus in Nottingham in a supportive,
            student-focused learning environment, and is particularly suitable for international
            students who intend to progress to university or another form of higher education.
          </p>
          <div className="ksa-forwho">
            <h3 className="ksa-h3">Who is this programme for?</h3>
            <ul className="ksa-check">
              <li>Students preparing for study at an international university or college</li>
              <li>Learners who want stronger academic English for lectures, seminars and assignments</li>
              <li>Those who want to build confidence in speaking, listening, reading and writing</li>
              <li>Professionals improving communication for work and international environments</li>
              <li>Anyone seeking a structured, classroom-based English programme in the UK</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What you will study */}
      <section className="ksa-section ksa-section-alt">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">Curriculum</span>
          <h2 className="ksa-h2">What you will study</h2>
          <p className="ksa-lead">
            Teaching is organised around the four core language skills, supported by grammar,
            vocabulary, pronunciation and study skills. Content is adapted to your starting level
            following an initial assessment.
          </p>
          <div className="ksa-grid ksa-grid-3">
            {SKILLS.map((s) => (
              <div className="ksa-card" key={s.title}>
                <h4 className="ksa-card-title">{s.title}</h4>
                <p className="ksa-card-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="ksa-section">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">Learning Outcomes</span>
          <h2 className="ksa-h2">By the end of the programme, you will be better able to</h2>
          <div className="ksa-grid ksa-grid-2">
            {OUTCOMES.map((o) => (
              <div className="ksa-outcome" key={o}>
                <span className="ksa-tick">✓</span>
                <span>{o}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why TEC */}
      <section className="ksa-section ksa-section-alt">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">Why Trent Education Centre</span>
          <h2 className="ksa-h2">A supportive place to learn and live</h2>
          <div className="ksa-grid ksa-grid-3">
            {WHY_TEC.map((w) => (
              <div className="ksa-why" key={w.title}>
                <div className="ksa-why-img" style={{ backgroundImage: `url('${w.img}')` }} />
                <div className="ksa-why-body">
                  <h4 className="ksa-card-title">{w.title}</h4>
                  <p className="ksa-card-text">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees / details */}
      <section className="ksa-section">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">Course Details</span>
          <h2 className="ksa-h2">Fees &amp; what's included</h2>
          <div className="ksa-feebox">
            <div className="ksa-fee-main">
              <span className="ksa-fee-amount">£10,800</span>
              <span className="ksa-fee-note">Government-sponsored course fee</span>
            </div>
            <ul className="ksa-check ksa-fee-list">
              <li>Up to 11 months of English language study</li>
              <li>20 hours of tuition per week</li>
              <li>Initial assessment to place you at the right level</li>
              <li>Ongoing feedback and progress monitoring</li>
              <li>Academic and welfare support throughout</li>
            </ul>
          </div>
          <p className="ksa-smallnote">
            Please confirm current fees, start dates and any additional costs (such as coursebooks)
            with our Admissions Team before making payment or travel arrangements.
          </p>
        </div>
      </section>

      {/* Life & support */}
      <section className="ksa-section ksa-section-alt">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">Living &amp; Support in Nottingham</span>
          <h2 className="ksa-h2">We'll help you settle in</h2>
          <div className="ksa-grid ksa-grid-2">
            <div className="ksa-card">
              <h4 className="ksa-card-title">Student Support</h4>
              <p className="ksa-card-text">Induction programmes to help you settle in, academic support and guidance, and welfare services for personal support.</p>
            </div>
            <div className="ksa-card">
              <h4 className="ksa-card-title">Getting Here</h4>
              <p className="ksa-card-text">Nottingham is easily reached from London, Birmingham, Manchester and East Midlands Airport by train, coach or a pre-booked airport transfer.</p>
            </div>
            <div className="ksa-card">
              <h4 className="ksa-card-title">A Welcoming City</h4>
              <p className="ksa-card-text">Nottingham is a diverse, student-friendly city, and the cost of living is generally more affordable than other large UK cities.</p>
            </div>
            <div className="ksa-card">
              <h4 className="ksa-card-title">Healthcare &amp; Safety</h4>
              <p className="ksa-card-text">Access to NHS services, a 24-hour emergency line, and a safe, respectful environment where everyone is welcome regardless of culture or background.</p>
            </div>
          </div>
          <div className="ksa-visa-note">
            <strong>Visa:</strong> Most students study on a Short-Term Study Visa, which allows stays
            for the course length (maximum 11 months). Always check the specific requirements for
            your nationality and course on the UK Government website before you travel.
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="ksa-section ksa-accred">
        <div className="ksa-wrap">
          <p className="ksa-accred-title">Accredited &amp; recognised by</p>
          <div className="ksa-accred-row">
            {ACCREDITATIONS.map((a) => (
              <img key={a.alt} src={a.img} alt={a.alt} className="ksa-accred-logo" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact footer */}
      <section className="ksa-cta">
        <div className="ksa-wrap ksa-cta-inner">
          <h2 className="ksa-cta-title">Start your English language journey with Trent</h2>
          <p className="ksa-cta-sub">Apply today or contact our Admissions Team — we're happy to help.</p>
          <a href={APPLY_URL} className="ksa-btn ksa-btn-gold ksa-cta-btn">Apply / Enrol Now</a>
          <div className="ksa-contact">
            <div><span>Email</span><a href={`mailto:${ADMISSIONS_EMAIL}`}>{ADMISSIONS_EMAIL}</a></div>
            <div><span>Call / WhatsApp</span><a href={`tel:${WHATSAPP.replace(/\s/g, '')}`}>{WHATSAPP}</a></div>
            <div><span>Campus</span><span>16 Castle Blvd, Nottingham, NG7 1FL, UK</span></div>
          </div>
        </div>
        <p className="ksa-colophon">Trent Education Centre Ltd · Registered in England and Wales No. 7959722</p>
      </section>
    </div>
  );
}

const ksaStyles = `
.ksa-root { --g:${BRAND.green}; --gm:${BRAND.greenMid}; --gold:${BRAND.gold};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color:#1f2937; background:#fff; line-height:1.6; }
.ksa-root *, .ksa-root *::before, .ksa-root *::after { box-sizing:border-box; }

.ksa-topbar { display:flex; align-items:center; justify-content:space-between;
  padding:14px 24px; border-bottom:1px solid #eef0ec; position:sticky; top:0; background:#fff; z-index:20; }
.ksa-logo { height:46px; width:auto; }
.ksa-topbar-cta { font-size:14px; padding:9px 18px; }

.ksa-btn { display:inline-block; border-radius:10px; font-weight:700; text-decoration:none;
  cursor:pointer; transition:transform .12s ease, box-shadow .12s ease, opacity .12s ease; }
.ksa-btn-gold { background:var(--gold); color:#1a1a1a; box-shadow:0 4px 14px rgba(201,162,39,.35); }
.ksa-btn-gold:hover { transform:translateY(-1px); opacity:.95; }

.ksa-hero { position:relative; color:#fff; padding:0;
  background:linear-gradient(135deg,#0c3420,#17492e 60%,#0c3420);
  overflow:hidden; }
.ksa-hero-overlay { position:absolute; inset:0;
  background:url('/assets/images/events/students-studying.jpg') center/cover no-repeat; opacity:.18; }
.ksa-hero-inner { position:relative; max-width:960px; margin:0 auto; padding:64px 24px 72px; text-align:center; }
.ksa-welcome { color:var(--gold); font-weight:600; letter-spacing:.5px; margin:0 0 10px; font-size:17px; }
.ksa-hero-title { font-size:clamp(32px,6vw,56px); line-height:1.08; margin:0 0 16px; font-weight:800; }
.ksa-hero-sub { font-size:clamp(16px,2.4vw,19px); max-width:680px; margin:0 auto 22px; color:#e8f0ea; }
.ksa-badge-line { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:26px; }
.ksa-pill { background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.25);
  padding:6px 14px; border-radius:999px; font-size:13px; font-weight:600; }
.ksa-facts { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; max-width:720px;
  margin:0 auto 30px; }
.ksa-fact { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.14);
  border-radius:12px; padding:14px 10px; display:flex; flex-direction:column; gap:4px; }
.ksa-fact-label { font-size:11px; text-transform:uppercase; letter-spacing:.6px; color:var(--gold); font-weight:700; }
.ksa-fact-value { font-size:15px; font-weight:600; }
.ksa-hero-cta { font-size:17px; padding:14px 38px; }

.ksa-section { padding:62px 24px; }
.ksa-section-alt { background:#f6f8f6; }
.ksa-wrap { max-width:1080px; margin:0 auto; }
.ksa-eyebrow { display:inline-block; color:var(--gold); font-weight:700; font-size:13px;
  letter-spacing:1px; text-transform:uppercase; margin-bottom:10px; }
.ksa-h2 { font-size:clamp(24px,3.6vw,34px); color:var(--g); margin:0 0 18px; font-weight:800; line-height:1.15; }
.ksa-h3 { font-size:20px; color:var(--g); margin:0 0 12px; font-weight:700; }
.ksa-lead { font-size:17px; color:#374151; max-width:820px; margin:0 0 24px; }

.ksa-check { list-style:none; padding:0; margin:0; display:grid; gap:10px; }
.ksa-check li { position:relative; padding-left:30px; color:#374151; }
.ksa-check li::before { content:'✓'; position:absolute; left:0; top:0; color:#fff;
  background:var(--gm); width:20px; height:20px; border-radius:50%; font-size:12px;
  display:flex; align-items:center; justify-content:center; font-weight:700; }
.ksa-forwho { margin-top:18px; background:#f6f8f6; border:1px solid #e6ece7; border-radius:16px; padding:26px; }

.ksa-grid { display:grid; gap:18px; }
.ksa-grid-2 { grid-template-columns:repeat(2,1fr); }
.ksa-grid-3 { grid-template-columns:repeat(3,1fr); }
.ksa-card { background:#fff; border:1px solid #e9ece9; border-radius:14px; padding:22px;
  box-shadow:0 1px 3px rgba(0,0,0,.03); }
.ksa-section-alt .ksa-card { background:#fff; }
.ksa-card-title { font-size:17px; color:var(--g); margin:0 0 8px; font-weight:700; }
.ksa-card-text { font-size:15px; color:#4b5563; margin:0; }

.ksa-outcome { display:flex; gap:12px; align-items:flex-start; background:#f6f8f6;
  border-radius:12px; padding:16px 18px; font-size:16px; color:#374151; }
.ksa-tick { flex-shrink:0; width:24px; height:24px; border-radius:50%; background:var(--gold);
  color:#1a1a1a; font-weight:800; display:flex; align-items:center; justify-content:center; font-size:14px; }

.ksa-why { background:#fff; border:1px solid #e9ece9; border-radius:16px; overflow:hidden; display:flex; flex-direction:column; }
.ksa-why-img { height:150px; background-size:cover; background-position:center; background-color:#dfe7e1; }
.ksa-why-body { padding:18px 20px; }

.ksa-feebox { display:flex; gap:28px; align-items:center; background:var(--g); color:#fff;
  border-radius:20px; padding:30px 34px; flex-wrap:wrap; }
.ksa-fee-main { display:flex; flex-direction:column; min-width:200px; }
.ksa-fee-amount { font-size:46px; font-weight:800; color:var(--gold); line-height:1; }
.ksa-fee-note { font-size:14px; color:#dbe7df; margin-top:6px; }
.ksa-fee-list { flex:1; min-width:260px; }
.ksa-feebox .ksa-check li { color:#eaf1ec; }
.ksa-feebox .ksa-check li::before { background:var(--gold); color:#1a1a1a; }
.ksa-smallnote { font-size:13px; color:#6b7280; margin-top:16px; font-style:italic; }

.ksa-visa-note { margin-top:22px; background:#fff; border-left:4px solid var(--gold);
  border-radius:8px; padding:16px 20px; font-size:15px; color:#374151; box-shadow:0 1px 3px rgba(0,0,0,.04); }

.ksa-accred { text-align:center; padding:48px 24px; }
.ksa-accred-title { color:#6b7280; font-size:13px; text-transform:uppercase; letter-spacing:1px; font-weight:700; margin:0 0 22px; }
.ksa-accred-row { display:flex; gap:38px; align-items:center; justify-content:center; flex-wrap:wrap; }
.ksa-accred-logo { height:58px; width:auto; object-fit:contain; filter:grayscale(.1); }

.ksa-cta { background:linear-gradient(135deg,#0c3420,#17492e); color:#fff; padding:60px 24px 34px; text-align:center; }
.ksa-cta-title { font-size:clamp(24px,3.4vw,32px); font-weight:800; margin:0 0 10px; }
.ksa-cta-sub { color:#d8e4db; margin:0 0 26px; font-size:17px; }
.ksa-cta-btn { font-size:17px; padding:15px 42px; }
.ksa-contact { display:flex; gap:40px; justify-content:center; flex-wrap:wrap; margin:34px 0 0; }
.ksa-contact > div { display:flex; flex-direction:column; gap:4px; font-size:15px; }
.ksa-contact span:first-child { color:var(--gold); font-size:12px; text-transform:uppercase; letter-spacing:.6px; font-weight:700; }
.ksa-contact a { color:#fff; text-decoration:none; }
.ksa-contact a:hover { text-decoration:underline; }
.ksa-colophon { margin:36px 0 0; font-size:12px; color:#9db3a5; }

@media (max-width:860px) {
  .ksa-grid-3 { grid-template-columns:repeat(2,1fr); }
  .ksa-facts { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:560px) {
  .ksa-grid-2, .ksa-grid-3 { grid-template-columns:1fr; }
  .ksa-section { padding:46px 20px; }
  .ksa-topbar-cta { padding:8px 14px; }
  .ksa-feebox { flex-direction:column; align-items:flex-start; gap:18px; }
}
`;
