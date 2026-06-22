import { Lightbulb, FileText, ListChecks } from 'lucide-react';
import '../InnerPage.css';
import './ApplicationProcessPage.css';
import './PreArrivalPage.css';
import './PersonalStatementPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   How to Write a Personal Statement page
   Mirrors WordPress /how-to-write-a-personal-statement/ — wording verbatim.
   ════════════════════════════════════════════════════════════ */

const sixTips = [
  {
    title: 'Give yourself plenty of time',
    body: 'don’t rush it. Great writing takes planning and revision.',
  },
  {
    title: 'Keep your tone formal',
    body: 'you are applying for university, so keep it professional.',
  },
  {
    title: 'Be original and honest',
    body: 'avoid copying from others or using clichés. Focus on your own voice and story.',
  },
  {
    title: 'Believe in yourself',
    body: 'write in a confident and positive way. Show us what you have achieved and what you are capable of.',
  },
  {
    title: 'Check your spelling and grammar',
    body: 'ask someone you trust to review it for feedback.',
  },
  {
    title: 'Remember',
    body: 'we can only assess you based on what you include in your statement. Be thorough and clear.',
  },
];

const learnMoreCards = [
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
    title: 'What to Eat Out in Nottingham',
    desc: 'Discover essential tips on where to find diverse and affordable food options in Nottingham.',
    img: '/uploads/2025/03/6-1.jpg',
    href: '/eat-out-nottingham',
    internal: true,
  },
];

export default function PersonalStatementPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="How to Write a Personal Statement"
        subtitle="Guidance from Trent Education Centre — share your ambitions, strengths, and experiences in your own words."
        bgImage="/uploads/2025/06/cropped-photo-attractive-young-man-office-working-scaled.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split */}
        <div className="aap-intro-split">
          <h2>Guidance from Trent Education Centre</h2>
          <p>
            No one can tell your story better than you. This is your opportunity to share
            your ambitions, strengths, and experiences in your own words. With up to{' '}
            <strong>4,000 characters</strong> available, it is important to make every
            word count.
          </p>
        </div>

        {/* What is a Personal Statement? */}
        <div className="pa-info">
          <div className="pa-info-head">
            <span className="pa-info-icon"><FileText size={18} /></span>
            <h3>What is a Personal Statement?</h3>
          </div>
          <p>
            A personal statement is your chance to tell us why you are the right person
            for the course you are applying for. Submitted as part of your application, it
            should explain why you are passionate about your chosen course, what makes you
            a strong candidate, and how you will contribute in your educational journey.
          </p>
          <p>
            Think of it as your introduction — a way to show your motivation,
            individuality, and the journey that has brought you to this point. You have
            approximately two A4 pages to highlight the skills, experiences, and qualities
            that make you stand out.
          </p>
          <p>
            At Trent Education Centre, we encourage you to be confident, genuine, and
            thoughtful. Share what makes you unique and show your enthusiasm for learning
            and growth.
          </p>
        </div>

        {/* Starting Your Personal Statement */}
        <div className="pa-info">
          <div className="pa-info-head">
            <span className="pa-info-icon"><Lightbulb size={18} /></span>
            <h3>Starting Your Personal Statement – Advice from the Trent Admissions Team</h3>
          </div>
          <p>
            Writing your personal statement is one of the most important parts of your
            university application. It is your opportunity to tell us who you are, what
            inspires you, and why you are ready to take the next step in your education.
          </p>

          <h5 style={{ marginTop: 24, marginBottom: 12 }}>What to Think About Before You Start</h5>
          <p>Before you begin writing, take some time to reflect on these key questions:</p>
          <ul>
            <li><strong>Why are you interested in this course?</strong></li>
            <li><strong>What are your goals after this course?</strong></li>
            <li><strong>What are you passionate about – and how can you show that passion?</strong></li>
          </ul>
          <p>Spend some time researching the course and the education centre. Ask yourself:</p>
          <ul>
            <li><strong>What qualities is the course looking for in a student?</strong></li>
            <li><strong>Do you have any relevant skills or personal attributes? How can you demonstrate them?</strong></li>
            <li><strong>Have you gained any experience – through school, volunteering, or work – that supports your application?</strong></li>
          </ul>
          <p>
            Understanding what makes you a strong candidate will help you write with
            purpose and clarity.
          </p>
        </div>

        {/* Structuring Your Personal Statement */}
        <div className="pa-info">
          <div className="pa-info-head">
            <span className="pa-info-icon"><ListChecks size={18} /></span>
            <h3>Structuring Your Personal Statement</h3>
          </div>
          <p>
            Once you have gathered your thoughts and done your research, it is time to
            start writing.
          </p>
          <p>Your personal statement should be:</p>
          <ul>
            <li>
              <strong>Well-structured and easy to follow</strong> – show that you can
              communicate clearly in writing, which is essential for university-level
              study.
            </li>
            <li>
              <strong>Tailored to your course</strong> – if the course values
              specific qualities, like leadership, creativity, or attention to detail, put
              your most relevant experiences at the top of your statement.
            </li>
            <li>
              <strong>Clear and convincing</strong> – every part of your statement
              should support why you are a great fit for the course.
            </li>
          </ul>
        </div>

        {/* Six Tips — image + body */}
        <div className="aap-split">
          <div className="aap-split-img">
            <img
              src="/uploads/2025/06/cropped-photo-attractive-young-man-office-working-scaled.jpg"
              alt="Student writing a personal statement"
              loading="lazy"
            />
          </div>
          <div className="aap-split-body">
            <span className="aap-split-eyebrow">Top Tips</span>
            <h3>Six Tips from the Trent Admissions Team</h3>
            <ol style={{ paddingLeft: 20, margin: 0 }}>
              {sixTips.map((t, i) => (
                <li key={i} style={{ marginBottom: 12 }}>
                  <strong>{t.title}</strong> – {t.body}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Quote / Testimonial */}
        <div className="ps-quote-section">
          <div className="ps-quote-bg" aria-hidden="true" />
          <div className="ps-quote-inner">
            <span className="ps-quote-mark">&ldquo;</span>
            <blockquote className="ps-quote-text">
              The best personal statements give us a genuine insight into who you
              are, why this course matters to you, and what you hope to do in the
              future. Whether you have taken a traditional route or followed a
              unique path, we want to hear your story.
            </blockquote>
            <div className="ps-quote-footer">
              <span className="ps-quote-bar" />
              <div className="ps-quote-attribution">
                <span className="ps-quote-name">Trent Education Centre</span>
                <span className="ps-quote-role">Admissions Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Learn more */}
        <h2 className="aap-learn-head">Learn more</h2>
        <div className="aap-cards-3">
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
