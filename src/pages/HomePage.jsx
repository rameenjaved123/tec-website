import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Target, Eye, ArrowRight, CheckCircle, Play, ClipboardList } from 'lucide-react';
import './HomePage.css';

const heroSlides = [
  { imageOnly: true, src: '/assets/images/banners/he-banner-4.jpg',                                                          alt: 'TEC Higher Education', link: '/english-language-courses' },
  { imageOnly: true, src: '/assets/images/banners/he-banner-3.jpg',                                                          alt: 'ESOL Courses', link: '/english-language-courses' },
  { imageOnly: true, src: '/assets/images/general/bio-link.jpg',  alt: 'TEC Courses' },
  { imageOnly: true, src: '/assets/images/banners/events-banner.png', alt: 'TEC Programmes' },
  { imageOnly: true, src: '/assets/images/banners/landing-banner.jpg',                                      alt: 'Trent Education Centre' },
];

const courseCategories = [
  { id: 'english', label: 'English Language' },
  { id: 'higher', label: 'Higher Education' },
  { id: 'further', label: 'Further Education' },
];

const courses = {
  english: [
    {
      title: 'Ascentis Entry Level 2 ESOL',
      duration: 'Flexible / Onsite',
      img: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=600&q=80',
      link: '/english-language-courses',
      cta: 'View Course',
    },
    {
      title: 'NCFE Functional Skills English',
      duration: '6 Weeks / Onsite',
      img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
      link: '/english-language-courses',
      cta: 'View Course',
    },
  ],
  higher: [
    {
      title: 'ATHE Level 4 & 5 Extended Diploma in Business and Management',
      duration: '1 Year / Blended',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      link: '/athe-level-4-5',
      cta: 'View Course',
    },
    {
      title: 'Pearson BTEC Level 4 & 5 HND in Business',
      duration: '2 Years / Onsite',
      img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
      link: '/btec-hnd',
      cta: 'View Course',
    },
  ],
  further: [
    {
      title: 'ATHE Level 3 Diploma in Business',
      duration: '12 Weeks / Onsite',
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      link: '/athe-level-3',
      cta: 'View Course',
    },
    {
      title: 'NCFE Level 1 & 2 Functional Skills in Maths',
      duration: '6 Weeks / Onsite',
      img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80',
      levels: [
        { label: 'Level 1', link: '/ncfe-maths-l1' },
        { label: 'Level 2', link: '/ncfe-maths-l2' },
      ],
    },
    {
      title: 'SIA Level 2 Award for Door Supervisors (BIIAB)',
      duration: '6 Days + 1 Day First Aid / Onsite',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      link: '/sia-door-supervisors',
      cta: 'View Course',
    },
    {
      title: 'Digital Skills for Beginners',
      duration: '6 Weeks / Onsite',
      img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
      link: '/digital-skills',
      cta: 'View Course',
    },
  ],
};

const campuses = [
  { label: 'Nottingham (Digital House 2.3, Clarendon Park)', img: '/assets/images/campus/thumbnails/digital-house.jpg' },
  { label: 'Nottingham (Castle Boulevard)', img: '/assets/images/campus/thumbnails/castle-boulevard.jpg' },
  { label: 'Nottingham (2.1 Clarendon Park)', img: '/assets/images/campus/thumbnails/clarendon-park.jpg' },
  { label: 'Leicester', img: '/assets/images/campus/thumbnails/leicester.jpg' },
  { label: 'Birmingham', img: '/assets/images/campus/thumbnails/birmingham.jpg' },
];

/* News & Events — Instagram feed images */
const IG = '/assets/images/instagram/';
const newsPosts = [
  { src: IG + '663136228_17969140263045882_4990871444550172158_nlow.webp', isVideo: true,  link: 'https://www.instagram.com/reels/DW3yuZjjK9M/' },
  { src: IG + '656413746_1444211220831184_2177110105498773297_nlow.webp',  isVideo: true,  link: 'https://www.instagram.com/reels/DWYsLKxDIGa/' },
  { src: IG + '656864212_17967290847045882_714952565932259239_nfull.webp', isVideo: false, link: 'https://www.instagram.com/p/DWT0OOtDLlW/' },
  { src: IG + '645821380_17964433218045882_4962563911164900286_nfull.webp',isVideo: false, link: 'https://www.instagram.com/p/DVf69XMjAPi/' },
  { src: IG + '623986554_1795478401375747_3651335901021063968_nlow.webp',  isVideo: true,  link: 'https://www.instagram.com/reels/DUIT_eBDPSL/' },
  { src: IG + '621825500_17959789470045882_3282542183620762183_nlow.webp', isVideo: false, link: 'https://www.instagram.com/p/DT2Vc-AjE8I/' },
  { src: IG + '619750470_17959354623045882_945025808466373106_nlow.webp',  isVideo: true,  link: 'https://www.instagram.com/reels/DTsERF-DNmP/' },
  { src: IG + '615235178_17958601359045882_8105772759434397806_nlow.webp', isVideo: false, link: 'https://www.instagram.com/p/DTaKMX9DOw6/' },
];

const awarding = [
  { name: 'OTHM',        src: '/assets/logos/partners/othm.png' },
  { name: 'ATHE',        src: '/assets/logos/partners/athe.png' },
  { name: 'NCFE',        src: '/assets/logos/partners/ncfe.png' },
  { name: 'Pearson',     src: '/assets/logos/partners/pearson.png' },
  { name: 'BIIAB',       src: '/assets/logos/partners/biiab.png' },
  { name: 'Open Awards', src: '/assets/logos/partners/open-awards.png' },
  { name: 'Ascentis',    src: '/assets/logos/partners/ascentis.png' },
  { name: 'Focus Awards',src: '/assets/logos/partners/focus-awards.png' },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('english');

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();
  const prev = () => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setSlide((s) => (s + 1) % heroSlides.length);

  return (
    <div className="home page-enter">
      {/* ── Hero Slider ── */}
      <section className="hero">
        {heroSlides.map((s, i) =>
          s.imageOnly ? (
            /* Full pre-designed image slide — no overlay */
            <div
              key={i}
              className={`hero-slide hero-slide--image ${i === slide ? 'active' : ''} ${s.link ? 'hero-slide--clickable' : ''}`}
              onClick={() => s.link && navigate(s.link)}
            >
              <img src={s.src} alt={s.alt} className="hero-full-img" />
            </div>
          ) : (
            /* Standard split slide */
            <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
              <div className="hero-right" style={{ backgroundImage: `url(${s.bg})` }} />
              <div className="hero-left">
                <div className="hero-content">
                  <h1>{s.title}</h1>
                  {s.subtitle && <h2>{s.subtitle}</h2>}
                  {s.bullets && (
                    <ul className="hero-bullets">
                      {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  )}
                  {s.description && <p>{s.description}</p>}
                  {s.tagline && <p className="hero-tagline">{s.tagline}</p>}
                  <div className="hero-btns">
                    <Link to="/apply" className="btn-outline-light">Apply Now</Link>
                    {s.secondaryLabel && (
                      <Link to={s.secondaryLink} className="btn-outline-light">{s.secondaryLabel}</Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
        <button className="hero-btn prev" onClick={prev}><ChevronLeft size={28} /></button>
        <button className="hero-btn next" onClick={next}><ChevronRight size={28} /></button>
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === slide ? 'active' : ''}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* ── Announcement Banner ── */}
      <div className="announcement-banner">
        <p>
          See our{' '}
          <a
            href="/assets/documents/terms/access-participation-2026.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Latest Access and Participation Statement 2026-27
          </a>
        </p>
      </div>

      {/* ── About Intro ── */}
      <section className="about-intro">
        <div className="container">
          <p className="about-intro-text">
            Established in 2012 on the principles of{' '}
            <strong>opportunity, empowerment, and community</strong>, TEC is a{' '}
            <strong>forward-thinking institution</strong> dedicated to{' '}
            <strong>expanding access to quality education</strong>,{' '}
            <strong>fostering personal growth</strong>, and{' '}
            <strong>enhancing career prospects</strong>.
          </p>
        </div>
      </section>

      {/* ── Study Centres + Vision & Mission ── */}
      <section className="centres-section">
        <div className="container centres-grid">
          <div className="centres-text">
            <div className="centres-icon"><MapPin size={32} /></div>
            <h3>Study Centres</h3>
            <p>
              We aim to provide education that meets the needs of local communities, which is why we
              have established study centres in three cities across the UK:{' '}
              <strong>Nottingham</strong>, <strong>Leicester</strong>, and <strong>Birmingham</strong>.
            </p>
            <p>
              Having study centres in these cities enables us to widen participation among people from
              under-represented communities, who often lack the confidence and support needed to
              achieve academic and career success.
            </p>
            <Link to="/study-centres" className="link-arrow">
              Discover More <ArrowRight size={16} />
            </Link>
          </div>

          <div className="centres-images">
            {campuses.map((c, i) => (
              <div key={i} className="campus-thumb">
                <img src={c.img} alt={c.label} />
                <span className="campus-label"><MapPin size={13} /> {c.label}</span>
              </div>
            ))}
          </div>

          <div className="vm-cards">
            <div className="vm-card">
              <Eye size={28} className="vm-icon" />
              <h4>Our Vision</h4>
              <p>
                To become a leading provider of lifelong learning, supporting adults from basic skills
                and further education through to higher education and sustained career success.
              </p>
              <Link to="/mission-values" className="link-arrow">Read More <ArrowRight size={14} /></Link>
            </div>
            <div className="vm-card">
              <Target size={28} className="vm-icon" />
              <h4>Our Mission</h4>
              <p>
                To provide students in local and international communities with the holistic education
                they need to enhance their life chances.
              </p>
              <Link to="/mission-values" className="link-arrow">Read More <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Find the Right Course ── */}
      <section className="courses-section">
        <div className="container">
          <h2 className="section-title text-center">Find the Right Course for You</h2>
          <div className="course-tabs">
            {courseCategories.map((cat) => (
              <button
                key={cat.id}
                className={`course-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="course-grid">
            {courses[activeCategory].map((course, i) => (
              <div key={i} className="course-card">
                <div className="course-img">
                  <img src={course.img} alt={course.title} />
                </div>
                <div className="course-body">
                  <h4>{course.title}</h4>
                  {course.duration && <p className="course-duration">{course.duration}</p>}
                  {course.levels ? (
                    <div className="course-levels">
                      {course.levels.map((lv, j) => (
                        <Link key={j} to={lv.link} className="course-btn">{lv.label}</Link>
                      ))}
                    </div>
                  ) : (
                    <Link to={course.link} className="course-btn">{course.cta}</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Centre Approvals + Memberships & Endorsements ── */}
      <section className="partners-section">
        <div className="container">
          <p className="partners-intro">
            We are approved by the following Awarding organisations to offer courses and qualifications
            that enhance our students' academic and career development.
          </p>

          <h3 className="partners-label">Centre Approvals:</h3>
          <div className="partners-logos partners-logos--big">
            {awarding.map((p, i) => (
              <div key={i} className="partner-logo partner-logo--big">
                <img src={p.src} alt={p.name} />
              </div>
            ))}
          </div>

          <div className="partners-divider" />

          <h3 className="partners-label">Memberships &amp; Endorsements:</h3>
          <div className="partners-logos partners-logos--big memberships-section">
            {[
              { name: 'Membership',                     src: '/assets/logos/partners/membership-1.png' },
              { name: 'Membership',                     src: '/assets/logos/partners/membership-2.png' },
              { name: 'Membership',                     src: '/assets/logos/partners/membership-3.png' },
              { name: 'Membership',                     src: '/assets/logos/partners/membership-4.png' },
              { name: 'British Council',                           src: '/assets/logos/partners/british-council.png' },
              { name: 'Accredited by the British Council (ELT)', src: '/assets/images/general/bc-accreditation.jpg' },
              { name: 'Advance HE',                              src: '/assets/logos/partners/advance-he.png' },
              { name: 'TOTUM',                          src: '/assets/logos/partners/totum.png' },
              { name: 'Endorsement',                    src: '/assets/logos/partners/endorsement.png' },
            ].map((p, i) => (
              <div key={i} className="partner-logo partner-logo--big">
                <img src={p.src} alt={p.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Study Centre Environment ── */}
      <section className="environment-section">
        <div className="container env-grid">
          <div className="env-text">
            <h2>Our Study Centre Environment</h2>
            <p>
              Each of our Study Centres fosters the same warm and vibrant community of students and
              staff, working together to achieve shared goals. You will find staff ready to support and
              guide you, academic faculty delivering high-quality education, and well-equipped
              facilities with everything you need to learn to the best of your ability.
            </p>
            <Link to="/study-centres" className="btn-gold" style={{ marginTop: '20px', display: 'inline-block' }}>
              Read More
            </Link>
          </div>
          <div className="env-card">
            <CheckCircle size={32} className="env-icon" />
            <p>
              We are establishing a TEC Student Council for all Study Centres in Nottingham, Leicester,
              and Birmingham. The Student Council will develop an annual calendar of social and
              educational events that reflect students' needs and interests.
            </p>
          </div>
        </div>
      </section>

      {/* ── Photo Strip ── */}
      <section className="photo-strip">
        <div className="photo-strip-track">
          <img src="/assets/images/general/layer-3.png" alt="TEC students and city" />
          <img src="/assets/images/general/artboard-2.png" alt="TEC community" />
          <img src="/assets/images/general/layer-3.png" alt="TEC students and city" aria-hidden="true" />
          <img src="/assets/images/general/artboard-2.png" alt="TEC community" aria-hidden="true" />
        </div>
      </section>

      {/* ── News & Events ── */}
      <section className="news-section">
        <div className="container">
          <h2 className="section-title text-center">News &amp; Events</h2>
          <div className="news-grid">
            {newsPosts.map((post, i) => (
              <a key={i} href={post.link} target="_blank" rel="noreferrer" className="news-item">
                <img src={post.src} alt="TEC Instagram post" />
                {post.isVideo && (
                  <div className="news-video-icon"><Play size={22} fill="white" /></div>
                )}
                <div className="news-overlay"><span>View on Instagram</span></div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link to="/news-events" className="btn-gold">View All News &amp; Events</Link>
          </div>
        </div>
      </section>

      {/* ── Application Process ── */}
      <section className="apply-section">
        <div className="container">
          <h2 className="section-title text-center">Application Process</h2>
          <div className="apply-steps">
            <div className="apply-step">
              <div className="step-num">1</div>
              <h4>You Apply</h4>
              <p>Tell us a little about yourself and we'll take care of the rest. Our convenient online application form takes just 10 minutes to complete.</p>
            </div>
            <ArrowRight size={36} className="apply-arrow" />
            <div className="apply-step">
              <div className="step-num">2</div>
              <h4>We Connect</h4>
              <p>After you submit your application, an admissions representative will contact you to help you complete the process.</p>
            </div>
            <ArrowRight size={36} className="apply-arrow" />
            <div className="apply-step">
              <div className="step-num">3</div>
              <h4>Enrolment</h4>
              <p>We will let you know if your application is successful. If it is, you will be able to enrol and begin studying.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-icon"><ClipboardList size={36} /></div>
          <h2>Begin Your Enrolment Today</h2>
          <p>Our admissions team is ready to guide you from your first enquiry through to enrolment. Simple, transparent, and designed around you.</p>
          <Link to="/apply" className="cta-btn">
            Start Your Enrolment <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
