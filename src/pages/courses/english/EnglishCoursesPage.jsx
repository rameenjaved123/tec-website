import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle, Clock, BookOpen, CalendarDays, Users,
  ArrowRight, GraduationCap, ChevronLeft, ChevronRight,
  UtensilsCrossed, Star, Armchair, Monitor, HeartHandshake, Tv,
} from 'lucide-react';
import '../../InnerPage.css';
import './EnglishCoursesPage.css';
import PageHero from '../../../components/PageHero';

/* ── Accordion data: ESOL ── */
const esolSections = [
  {
    title: 'Overview',
    content: (
      <div className="eng-tab-content">
        <h4>What This Course Is</h4>
        <p>The Ascentis ESOL Certificate helps you improve your <strong>Speaking and Listening, Reading and Writing</strong>. The course follows the <strong>Adult ESOL Core Curriculum</strong> used across the UK.</p>
        <p>You study three units:</p>
        <ul className="eng-bullets" style={{ marginBottom: 16 }}>
          <li>Speaking &amp; Listening Communication</li>
          <li>Reading</li>
          <li>Writing</li>
        </ul>
        <p>Your teachers assess your work, and Ascentis checks the results.</p>

        <h4>Who the Course Is For</h4>
        <p>This course is for adults aged 18+ who live in the UK and want to improve their English. It is suitable for:</p>
        <ul className="eng-bullets" style={{ marginBottom: 16 }}>
          <li>People from settled communities</li>
          <li>Refugees and asylum seekers</li>
          <li>Anyone who speaks another language at home</li>
        </ul>

        <h4>What You Will Learn</h4>
        <p>You will learn English to help you:</p>
        <ul className="eng-bullets">
          <li>Use English at work</li>
          <li>Speak confidently in daily life</li>
          <li>Understand services in the UK</li>
          <li>Travel, study and socialise more easily</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'ESOL Levels',
    content: (
      <div className="eng-tab-content">
        <p style={{ marginBottom: 12 }}><strong>ESOL Levels:</strong></p>
        <div className="eng-table-wrap">
          <table className="eng-table">
            <thead>
              <tr><th>ESOL Level</th><th>CEFR Level</th><th>Language Stage</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Entry 1</strong></td><td><span className="eng-cefr-badge">A1</span></td><td>Beginner</td></tr>
              <tr><td><strong>Entry 2</strong></td><td><span className="eng-cefr-badge">A2</span></td><td>Elementary</td></tr>
              <tr><td><strong>Entry 3</strong></td><td><span className="eng-cefr-badge">B1</span></td><td>Pre-Intermediate</td></tr>
              <tr><td><strong>Level 1</strong></td><td><span className="eng-cefr-badge">B2</span></td><td>Intermediate / Upper Intermediate</td></tr>
              <tr><td><strong>Level 2</strong></td><td><span className="eng-cefr-badge">C1</span></td><td>Advanced</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: 'Class Times and Study Hours',
    content: (
      <div className="eng-tab-content">
        <p>You study <strong>2 days per week, 4 hours per day</strong>.</p>
        <p style={{ marginTop: 12, marginBottom: 8 }}><strong>ESOL Weekly Timetable:</strong></p>
        <div className="eng-table-wrap" style={{ marginBottom: 16 }}>
          <table className="eng-table">
            <thead><tr><th>Time</th><th>Wednesday</th><th>Thursday</th></tr></thead>
            <tbody>
              <tr><td>09:30 – 11:00</td><td>ESOL</td><td>ESOL</td></tr>
              <tr><td>11:00 – 11:30</td><td><em>Break</em></td><td></td></tr>
              <tr><td>11:30 – 13:00</td><td>ESOL</td><td>ESOL</td></tr>
              <tr><td>13:00 – 14:00</td><td><em>Break</em></td><td></td></tr>
              <tr><td>14:00 – 15:00</td><td>ESOL</td><td>ESOL</td></tr>
            </tbody>
          </table>
        </div>
        <p>You may also come to the campus on Monday and Tuesday for self-study from 9:30 – 17:00 if you wish.</p>
        <p style={{ marginTop: 12, marginBottom: 8 }}><strong>Each unit includes:</strong></p>
        <ul className="eng-bullets" style={{ marginBottom: 12 }}>
          <li><strong>Speaking &amp; Listening</strong> – 15 weeks (120 hours)</li>
          <li><strong>Reading</strong> – 6 weeks (60 hours)</li>
          <li><strong>Writing</strong> – 9 weeks (90 hours)</li>
        </ul>
        <p><strong>Total study time: 30 weeks, 270 hours</strong></p>

        <h4 style={{ color: 'var(--tec-green)', marginTop: 24, marginBottom: 8 }}>Calendar for Ascentis ESOL</h4>
        <p>Starting in February 2026</p>

        <p style={{ marginTop: 12, marginBottom: 6 }}><strong>Speaking &amp; Listening (15 weeks, with Easter break)</strong></p>
        <div className="eng-table-wrap" style={{ marginBottom: 16 }}>
          <table className="eng-table eng-table--compact">
            <thead><tr><th>Week</th><th>Wednesday</th><th>Thursday</th></tr></thead>
            <tbody>
              {[
                ['1','25 Feb 2026','26 Feb 2026'],['2','04 Mar 2026','05 Mar 2026'],
                ['3','11 Mar 2026','12 Mar 2026'],['4','18 Mar 2026','19 Mar 2026'],
                ['5','25 Mar 2026','26 Mar 2026'],['6','01 Apr 2026','02 Apr 2026'],
                [null,'08 Apr 2026 Holiday','09 Apr 2026 Holiday'],
                [null,'15 Apr 2026 Holiday','16 Apr 2026 Holiday'],
                ['7','22 Apr 2026','23 Apr 2026'],['8','29 Apr 2026','30 Apr 2026'],
                ['9','06 May 2026','07 May 2026'],['10','13 May 2026','14 May 2026'],
                ['11','20 May 2026','21 May 2026'],['12','27 May 2026','28 May 2026'],
                ['13','03 Jun 2026','04 Jun 2026'],['14','10 Jun 2026','11 Jun 2026'],
                ['15','17 Jun 2026','18 Jun 2026'],
              ].map(([w, wed, thu], i) => (
                <tr key={i} className={!w ? 'eng-holiday-row' : ''}>
                  <td>{w || ''}</td>
                  <td style={!w ? { color: '#e07b00', fontWeight: 600 } : {}}>{wed}</td>
                  <td style={!w ? { color: '#e07b00', fontWeight: 600 } : {}}>{thu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginBottom: 6 }}><strong>Two-week holiday</strong></p>
        <ul className="eng-bullets" style={{ marginBottom: 16 }}>
          <li>24 &amp; 25 Jun 2026 – Holiday</li>
          <li>01 &amp; 02 Jul 2026 – Holiday</li>
        </ul>

        <p style={{ marginBottom: 6 }}><strong>Reading (6 weeks after holiday)</strong></p>
        <div className="eng-table-wrap" style={{ marginBottom: 16 }}>
          <table className="eng-table eng-table--compact">
            <thead><tr><th>Week</th><th>Wednesday</th><th>Thursday</th></tr></thead>
            <tbody>
              {[['1','08 Jul 2026','09 Jul 2026'],['2','15 Jul 2026','16 Jul 2026'],
                ['3','22 Jul 2026','23 Jul 2026'],['4','29 Jul 2026','30 Jul 2026'],
                ['5','05 Aug 2026','06 Aug 2026'],['6','12 Aug 2026','13 Aug 2026'],
              ].map(([w,wed,thu],i)=><tr key={i}><td>{w}</td><td>{wed}</td><td>{thu}</td></tr>)}
            </tbody>
          </table>
        </div>

        <p style={{ marginBottom: 6 }}><strong>Writing (9 weeks after holiday)</strong></p>
        <div className="eng-table-wrap">
          <table className="eng-table eng-table--compact">
            <thead><tr><th>Week</th><th>Wednesday</th><th>Thursday</th></tr></thead>
            <tbody>
              {[['1','02 Sep 2026','03 Sep 2026'],['2','09 Sep 2026','10 Sep 2026'],
                ['3','16 Sep 2026','17 Sep 2026'],['4','23 Sep 2026','24 Sep 2026'],
                ['5','30 Sep 2026','01 Oct 2026'],['6','07 Oct 2026','08 Oct 2026'],
                ['7','14 Oct 2026','15 Oct 2026'],['8','21 Oct 2026','22 Oct 2026'],
                ['9','28 Oct 2026','29 Oct 2026'],
              ].map(([w,wed,thu],i)=><tr key={i}><td>{w}</td><td>{wed}</td><td>{thu}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: 'Course Fees',
    content: (
      <div className="eng-tab-content">
        <p>£12 per hour</p>
        <p>Total cost for 270 hours: <strong>£3,240</strong></p>
        <p style={{ marginTop: 12 }}>There are no extra fees for registration, exams, certificates, materials, or activities.</p>
        <p style={{ marginTop: 12 }}><strong>International students</strong> will need to pay an extra fee of <strong>£250</strong> to book their place on a course before travelling to the UK. This fee covers the extra administrative work for visas. TEC admissions staff will tell you the booking fee when you apply.</p>
        <p style={{ marginTop: 12 }}>Please read the following carefully before you enrol into a course:</p>
        <ul className="eng-bullets" style={{ marginTop: 8 }}>
          <li><a href="https://trenteducation.co.uk/terms-and-conditions" target="_blank" rel="noreferrer" style={{ color: 'var(--tec-green)' }}>Terms and Conditions</a></li>
          <li><a href="https://trenteducation.co.uk/tuition-fees-refunds-and-compensation-policy" target="_blank" rel="noreferrer" style={{ color: 'var(--tec-green)' }}>Tuition Fees, Refunds and Compensation Policy</a></li>
        </ul>
      </div>
    ),
  },
  {
    title: 'What You Study at Each ESOL Level',
    content: (
      <div className="eng-tab-content">
        {[
          { level: 'Entry 1 (Beginner)',       items: ['Understand simple spoken English', 'Ask and answer basic questions', 'Read short texts', 'Write simple sentences and complete forms'] },
          { level: 'Entry 2 (Elementary)',      items: ['Understand everyday spoken English', 'Speak in short conversations', 'Read simple texts and find information', 'Write short texts for a purpose'] },
          { level: 'Entry 3 (Pre-Intermediate)', items: ['Understand the main ideas in conversations', 'Take part in discussions', 'Read longer texts and understand purpose', 'Plan and write short texts for different audiences'] },
          { level: 'Level 1 (Intermediate)',    items: ['Understand detailed spoken English', 'Speak clearly in discussions', 'Read different types of texts', 'Write texts for different tasks and audiences'] },
          { level: 'Level 2 (Advanced)',        items: ['Understand complex spoken English', 'Take part in longer discussions', 'Read detailed texts and understand meaning', 'Plan and write longer texts for different purposes'] },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <h4 style={{ margin: '0 0 4px' }}>{s.level}</h4>
            <p style={{ margin: '0 0 6px', color: '#666' }}>You learn to:</p>
            <ul className="eng-bullets">
              {s.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Extra Information',
    content: (
      <div className="eng-tab-content">
        <ul className="eng-bullets">
          <li>Minimum age: <strong>18 years</strong></li>
          <li>Maximum class size: <strong>16 students</strong></li>
          <li>Lessons take place between <strong>10:00 and 16:30</strong></li>
          <li>Holiday dates for classes starting on <strong>25 Feb 2026</strong>: 08 &amp; 09 April; 24 &amp; 25 June; 01 &amp; 02 Jul; 19 &amp; 20 Aug; 26 &amp; 27 Aug</li>
          <li>Full details of the Ascentis ESOL Qualification can be found on the <a href="https://www.ascentis.co.uk" target="_blank" rel="noreferrer" style={{ color: 'var(--tec-green)' }}>Ascentis website</a></li>
        </ul>
      </div>
    ),
  },
];

/* ── Tab data: NCFE ── */
const ncfeSections = [
  {
    title: 'Overview',
    content: (
      <div className="eng-tab-content">
        <p>Functional Skills English helps you use English in real-life situations. It is useful for work, apprenticeships and further study.</p>
        <p style={{ marginTop: 12 }}>You study:</p>
        <ul className="eng-bullets" style={{ marginTop: 8 }}>
          <li>Speaking, Listening and Communicating</li>
          <li>Reading</li>
          <li>Writing</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Levels',
    content: (
      <div className="eng-tab-content">
        <div className="eng-table-wrap">
          <table className="eng-table">
            <thead><tr><th>ESOL Level</th><th>Equivalent</th><th>What It Means</th></tr></thead>
            <tbody>
              <tr><td><strong>Level 1</strong></td><td>GCSE 1 – 3</td><td>You can use English independently in familiar situations</td></tr>
              <tr><td><strong>Level 2</strong></td><td>GCSE 4</td><td>The level needed for many jobs, colleges and universities</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: 'Class Times and Study Hours',
    content: (
      <div className="eng-tab-content">
        <p>You study <strong>2 days per week, 5 hours per day</strong>.</p>
        <p style={{ marginTop: 12, marginBottom: 8 }}><strong>FS English Weekly Timetable:</strong></p>
        <div className="eng-table-wrap" style={{ marginBottom: 16 }}>
          <table className="eng-table">
            <thead><tr><th>Time</th><th>Tuesday</th><th>Wednesday</th></tr></thead>
            <tbody>
              <tr><td>09:30 – 11:00</td><td>FS English</td><td>FS English</td></tr>
              <tr><td>11:00 – 11:30</td><td><em>Break</em></td><td><em>Break</em></td></tr>
              <tr><td>11:30 – 13:00</td><td>FS English</td><td>FS English</td></tr>
              <tr><td>13:00 – 14:00</td><td><em>Break</em></td><td><em>Break</em></td></tr>
              <tr><td>14:00 – 16:00</td><td>FS English</td><td>FS English</td></tr>
            </tbody>
          </table>
        </div>
        <p>You may also come to the campus on Monday and Tuesday for self-study from 9:30 – 17:00 if you wish.</p>

        <h4 style={{ color: 'var(--tec-green)', marginTop: 24, marginBottom: 8 }}>Calendar for NCFE Functional Skills English</h4>
        <p>Starting June 2026</p>

        <p style={{ marginTop: 12, marginBottom: 6 }}><strong>FS English (6 weeks)</strong></p>
        <div className="eng-table-wrap" style={{ marginBottom: 16 }}>
          <table className="eng-table eng-table--compact">
            <thead><tr><th>Week</th><th>Tuesday</th><th>Wednesday</th></tr></thead>
            <tbody>
              {[
                ['1','02 Jun 2026','03 Jun 2026'],
                ['2','09 Jun 2026','10 Jun 2026'],
                ['3','16 Jun 2026','17 Jun 2026'],
                ['4','23 Jun 2026','24 Jun 2026'],
                ['5','30 Jun 2026','01 Jul 2026'],
                ['6','07 Jul 2026','08 Jul 2026'],
              ].map(([w, tue, wed], i) => (
                <tr key={i}><td>{w}</td><td>{tue}</td><td>{wed}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginBottom: 6 }}><strong>FS English (6 weeks) — second intake</strong></p>
        <div className="eng-table-wrap">
          <table className="eng-table eng-table--compact">
            <thead><tr><th>Week</th><th>Tuesday</th><th>Wednesday</th></tr></thead>
            <tbody>
              {[
                ['1','04 Aug 2026','05 Aug 2026'],
                ['2','11 Aug 2026','12 Aug 2026'],
                ['3','18 Aug 2026','19 Aug 2026'],
                ['4','25 Aug 2026','26 Aug 2026'],
                ['5','01 Sep 2026','02 Sep 2026'],
                ['6','08 Sep 2026','09 Sep 2026'],
              ].map(([w, tue, wed], i) => (
                <tr key={i}><td>{w}</td><td>{tue}</td><td>{wed}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: 'Course Fees',
    content: (
      <div className="eng-tab-content">
        <p>£12 per hour</p>
        <p>Total cost for 60 hours: <strong>£720</strong></p>
        <p style={{ marginTop: 12 }}>There are no extra fees for registration, exams, certificates, materials, or activities.</p>
        <p style={{ marginTop: 12 }}><strong>International students</strong> will need to pay an extra fee of <strong>£250</strong> to book their place on a course before travelling to the UK. This fee covers the extra administrative work for visas. TEC admissions staff will tell you the booking fee when you apply.</p>
        <p style={{ marginTop: 12 }}>Please read the following carefully before you enrol into a course:</p>
        <ul className="eng-bullets" style={{ marginTop: 8 }}>
          <li><a href="https://trenteducation.co.uk/terms-and-conditions" target="_blank" rel="noreferrer" style={{ color: 'var(--tec-green)' }}>Terms and Conditions</a></li>
          <li><a href="https://trenteducation.co.uk/tuition-fees-refunds-and-compensation-policy" target="_blank" rel="noreferrer" style={{ color: 'var(--tec-green)' }}>Tuition Fees, Refunds and Compensation Policy</a></li>
        </ul>
      </div>
    ),
  },
  {
    title: 'What You Study at Each Level',
    content: (
      <div className="eng-tab-content">
        {[
          {
            level: 'Level 1',
            items: [
              'Understand main ideas in texts',
              'Ask and answer questions',
              'Give your opinion',
              'Write clear simple texts',
              'Use grammar and punctuation correctly',
            ],
          },
          {
            level: 'Level 2',
            items: [
              'Understand detailed texts',
              'Compare ideas and opinions',
              'Write clear well-structured texts',
              'Use formal and informal language correctly',
              'Communicate confidently in discussions',
            ],
          },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <h4 style={{ margin: '0 0 4px' }}>{s.level}</h4>
            <p style={{ margin: '0 0 6px', color: '#666' }}>You learn to:</p>
            <ul className="eng-bullets">
              {s.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Extra Information',
    content: (
      <div className="eng-tab-content">
        <ul className="eng-bullets">
          <li>Minimum age: <strong>18 years</strong></li>
          <li>Maximum class size: <strong>16 students</strong></li>
          <li>Lessons take place between <strong>10:00 and 16:30</strong></li>
          <li>This is a six-week course so there are <strong>no holidays</strong></li>
          <li>Full details of the NCFE Functional Skills English can be found on the <a href="https://www.ncfe.org.uk" target="_blank" rel="noreferrer" style={{ color: 'var(--tec-green)' }}>NCFE website</a></li>
        </ul>
      </div>
    ),
  },
];

/* ── Campus carousel images ── */
const campusSlides = [
  { src: '/assets/images/campus/castle-boulevard/entrance.jpg',  alt: 'Campus Main Entrance' },
  { src: '/assets/images/campus/castle-boulevard/exterior.jpg',  alt: 'Campus Main Entrance View 2' },
  { src: '/assets/images/campus/castle-boulevard/reception.jpg',  alt: 'Reception' },
  { src: '/assets/images/campus/castle-boulevard/general.jpg',  alt: 'Classroom' },
  { src: '/assets/images/campus/castle-boulevard/classroom-2.jpg',  alt: 'Student Waiting Area / Lounge View 2' },
  { src: '/assets/images/campus/castle-boulevard/it-lab.jpg',  alt: 'IT Lab and Library' },
  { src: '/assets/images/campus/castle-boulevard/library.jpg',  alt: 'First Floor Conference Room' },
  { src: '/assets/images/campus/castle-boulevard/hallway-2.jpg',  alt: 'First Floor Office Area View 2' },
  { src: '/assets/images/campus/castle-boulevard/waiting-room.jpg',  alt: 'Waiting Room' },
  { src: '/assets/images/campus/castle-boulevard/multi-faith-room.jpg',  alt: 'Multi-Faith Room' },
  { src: '/assets/images/campus/castle-boulevard/student-lounge.jpg',  alt: 'Student Waiting Area / Lounge' },
  { src: '/assets/images/campus/castle-boulevard/hallway.jpg',  alt: 'Hallway' },
  { src: '/assets/images/campus/castle-boulevard/conference-room.jpg',  alt: 'Conference Room' },
  { src: '/assets/images/campus/castle-boulevard/exam-hall-2.jpg',  alt: 'First Floor Conference Room View 2' },
];

function CampusCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const total = campusSlides.length;

  const go = (idx) => setCurrent((idx + total) % total);

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 5000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 5000);
  };

  return (
    <div
      className="eng-carousel"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="eng-carousel-track">
        {campusSlides.map((slide, i) => (
          <div
            key={i}
            className={`eng-carousel-slide ${i === current ? 'active' : ''}`}
            aria-hidden={i !== current}
          >
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>

      <button className="eng-car-btn eng-car-prev" onClick={() => go(current - 1)} aria-label="Previous">
        <ChevronLeft size={22} />
      </button>
      <button className="eng-car-btn eng-car-next" onClick={() => go(current + 1)} aria-label="Next">
        <ChevronRight size={22} />
      </button>

      <div className="eng-carousel-dots">
        {campusSlides.map((_, i) => (
          <button
            key={i}
            className={`eng-car-dot ${i === current ? 'active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Horizontal tabs component ── */
function CourseTabs({ sections }) {
  const [active, setActive] = useState(0);
  return (
    <div className="eng-tabs">
      <div className="eng-tab-nav">
        {sections.map((s, i) => (
          <button
            key={i}
            className={`eng-tab-btn ${active === i ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="eng-tab-body">
        {sections[active].content}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function EnglishCoursesPage() {
  return (
    <div className="inner-page page-enter">

      {/* ── Hero ── */}
      <PageHero
        title="English Language Courses"
        bgImage="/assets/images/campus/castle-boulevard/general.jpg"
        bgPosition="center center"
      />

      {/* ── Intro ── */}
      <div className="container" style={{ padding: '72px 20px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '1rem', lineHeight: 1.85, color: '#333' }}>
          Our English Language courses are delivered at our Castle Boulevard campus in Nottingham.
          We offer two nationally recognised qualifications — the <strong>Ascentis ESOL</strong> programme
          for speakers of other languages, and <strong>NCFE Functional Skills English</strong> for
          learners who want a GCSE-equivalent qualification. Both courses are taught by experienced
          tutors in a supportive, inclusive environment with modern facilities.
        </p>
      </div>

      {/* ── Course cards strip ── */}
      <div className="eng-course-strip">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="eng-course-overview-grid">

            <div className="eng-overview-card">
              <div className="eng-overview-icon"><BookOpen size={28} /></div>
              <h3>Ascentis ESOL</h3>
              <p className="eng-overview-sub">Entry 1 to Level 2 (A1 – C1)</p>
              <ul className="eng-overview-facts">
                <li><Clock size={13} /> 30 weeks · 270 hours</li>
                <li><CalendarDays size={13} /> Wed &amp; Thu</li>
                <li><span className="eng-fee-pill">£3,240</span></li>
              </ul>
              <a href="#esol" className="eng-overview-link">View details <ArrowRight size={14} /></a>
            </div>

            <div className="eng-overview-card">
              <div className="eng-overview-icon"><GraduationCap size={28} /></div>
              <h3>NCFE Functional Skills</h3>
              <p className="eng-overview-sub">Level 1 &amp; Level 2 English</p>
              <ul className="eng-overview-facts">
                <li><Clock size={13} /> 6 weeks · 60 hours</li>
                <li><CalendarDays size={13} /> Tue &amp; Wed</li>
                <li><span className="eng-fee-pill">£720</span></li>
              </ul>
              <a href="#ncfe" className="eng-overview-link">View details <ArrowRight size={14} /></a>
            </div>

          </div>
        </div>
      </div>

      {/* ── ESOL Section ── */}
      <div id="esol" className="eng-course-section">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="eng-section-header">
            <span className="eng-section-tag">Ascentis</span>
            <h2 className="eng-section-title">ESOL — English for Speakers of Other Languages</h2>
            <p className="eng-section-sub">Entry 1 to Level 2 &nbsp;·&nbsp; CEFR A1 to C1</p>
          </div>
          <CourseTabs sections={esolSections} />
          <div className="eng-apply-row">
            <Link to="/apply" className="eng-apply-btn">
              Apply for ESOL <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── NCFE Section ── */}
      <div id="ncfe" className="eng-course-section eng-course-section--alt">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="eng-section-header">
            <span className="eng-section-tag">NCFE</span>
            <h2 className="eng-section-title">Functional Skills English</h2>
            <p className="eng-section-sub">Level 1 &amp; Level 2 &nbsp;·&nbsp; GCSE equivalent</p>
          </div>
          <CourseTabs sections={ncfeSections} />
          <div className="eng-apply-row">
            <Link to="/apply" className="eng-apply-btn">
              Apply for Functional Skills <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Location ── */}
      <div className="eng-location-section">
        <div className="container">
          <h2 className="eng-location-title">Location: Castle Boulevard, Nottingham</h2>
          <div className="eng-location-grid">

            {/* Campus image carousel */}
            <CampusCarousel />

            {/* Text + facilities */}
            <div className="eng-location-text">
              <h3 className="eng-location-tagline">Our English Language Hub is in the centre of Nottingham.</h3>
              <p>
                It is easy to reach and only a short walk from the city centre. The building is modern
                and comfortable, and it has everything you need for your studies.
              </p>
              <p className="eng-facilities-label">Facilities include:</p>
              <div className="eng-facilities-grid">
                {[
                  { icon: <UtensilsCrossed size={15} />, text: 'A kitchen and cafeteria area' },
                  { icon: <Star size={15} />,            text: 'A prayer room and halal-friendly facilities' },
                  { icon: <Armchair size={15} />,        text: 'Student lounge areas and quiet spaces for self‑study' },
                  { icon: <Monitor size={15} />,         text: 'Language and IT rooms, plus a library' },
                  { icon: <HeartHandshake size={15} />,  text: 'Staff who can help you with your studies and welfare' },
                  { icon: <Users size={15} />,           text: 'Staff rooms' },
                  { icon: <Tv size={15} />,              text: 'Classrooms with Smart Screens' },
                ].map((f, i) => (
                  <div key={i} className="eng-facility-item">
                    <span className="eng-facility-icon">{f.icon}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Fees ── */}
      {/* ── Fees ── */}
      <div className="eng-fees-section">
        <div className="container" style={{ maxWidth: 1100 }}>

          <div className="eng-fees-header">
            <h2 className="eng-plain-title">Fees</h2>
            <span className="eng-fees-rate">£12 / hour</span>
          </div>

          {/* Fee comparison cards */}
          <div className="eng-fees-cards">
            <div className="eng-fee-ccard">
              <div className="eng-fee-ccard-top">
                <span className="eng-fee-ccard-tag">Ascentis</span>
                <h3>ESOL Courses</h3>
                <p>Entry 1 to Level 2</p>
              </div>
              <div className="eng-fee-ccard-stats">
                <div><span>30</span>weeks</div>
                <div><span>270</span>hours</div>
                <div className="eng-fee-ccard-price"><span>£3,240</span>total</div>
              </div>
            </div>
            <div className="eng-fee-ccard">
              <div className="eng-fee-ccard-top">
                <span className="eng-fee-ccard-tag">NCFE</span>
                <h3>Functional Skills English</h3>
                <p>Level 1 and Level 2</p>
              </div>
              <div className="eng-fee-ccard-stats">
                <div><span>6</span>weeks</div>
                <div><span>60</span>hours</div>
                <div className="eng-fee-ccard-price"><span>£720</span>total</div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="eng-fees-notes">
            <div className="eng-fees-note-item">
              <CheckCircle size={16} />
              <p>There are <strong>no extra fees</strong> for registration, materials, or activities.</p>
            </div>
            <div className="eng-fees-note-item">
              <CheckCircle size={16} />
              <p><strong>International students</strong> will need to pay an extra booking fee before travelling to the UK. TEC admissions staff will tell you the amount when you apply.</p>
            </div>
          </div>

          {/* Policy links */}
          <div className="eng-fees-policies">
            <p>Please read the following carefully before you enrol:</p>
            <div className="eng-fees-policy-links">
              <a href="https://trenteducation.co.uk/terms-and-conditions" target="_blank" rel="noreferrer">
                <ArrowRight size={14} /> Terms and Conditions
              </a>
              <a href="https://trenteducation.co.uk/tuition-fees-refunds-and-compensation-policy" target="_blank" rel="noreferrer">
                <ArrowRight size={14} /> Tuition Fees, Refunds and Compensation Policy
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Leisure Programme ── */}
      <div className="eng-leisure-section">
        <div className="container" style={{ maxWidth: 1100 }}>
          <h2 className="eng-plain-title eng-plain-title--center">Leisure Programme</h2>
          <p style={{ lineHeight: 1.85, color: '#444', textAlign: 'center', maxWidth: 680, margin: '0 auto 40px' }}>
            In addition to our accredited English courses, we run a leisure programme — day trips,
            activities and events — to help students practise their English, experience British
            culture and enjoy life in Nottingham. Take a look at some of our recent activities below!
          </p>
          <div className="eng-video-grid">
            {[
              { id: 'F9H23TxCe5g', url: 'https://youtube.com/shorts/F9H23TxCe5g', label: 'TEC Eid Party' },
              { id: 'rHili4TcAlw', url: 'https://youtu.be/rHili4TcAlw',            label: 'Students Day Out' },
              { id: '6Fw-2KGN084', url: 'https://youtu.be/6Fw-2KGN084',            label: 'Tea & Talk' },
              { id: '0W7WJHoCl8U', url: 'https://youtube.com/shorts/0W7WJHoCl8U', label: 'Eid Celebration' },
            ].map((v, i) => (
              <a
                key={i}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="eng-video-card"
                aria-label={`Watch: ${v.label}`}
              >
                <img
                  src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                  alt={v.label}
                  className="eng-video-thumb"
                />
                <div className="eng-video-overlay">
                  <div className="eng-video-play">
                    <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span className="eng-video-label">{v.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Student Support ── */}
      <div className="eng-support-section">
        <div className="container" style={{ maxWidth: 1100 }}>
          <h2 className="eng-plain-title eng-plain-title--center">Student Support</h2>
          <div className="eng-support-cards">
            <div className="eng-support-card">
              <div className="eng-support-icon-wrap"><Users size={24} /></div>
              <h3>Support Staff</h3>
              <p>We have student support staff who can help you. They work with your tutors and can also help you with your studies. They can support you with other problems in your daily life too.</p>
            </div>
            <div className="eng-support-card">
              <div className="eng-support-icon-wrap"><HeartHandshake size={24} /></div>
              <h3>Free Counselling</h3>
              <p>We also have a trained counsellor. You can talk to the counsellor for free if you need help with your feelings, stress, or wellbeing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="eng-cta">
        <div className="eng-cta-inner">
          <div className="eng-cta-icon"><BookOpen size={34} /></div>
          <h2>Ready to Start Your English Journey?</h2>
          <p>
            Contact our Admissions Team to find out which course is right for you, check availability
            and begin your application.
          </p>
          <div className="eng-cta-btns">
            <Link to="/apply" className="eng-cta-btn-primary">
              Start Your Application <ArrowRight size={16} />
            </Link>
            <a href="mailto:admissions@trenteducation.co.uk" className="eng-cta-btn-secondary">
              Email Admissions
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
