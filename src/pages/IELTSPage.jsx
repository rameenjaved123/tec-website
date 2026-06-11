import { Calendar, ArrowRight } from 'lucide-react';
import './InnerPage.css';
import './international/ApplicationProcessPage.css';
import './international/PreArrivalPage.css';
import PageHero from '../components/PageHero';

const writingItems = [
  {
    title: 'Task 1',
    body: 'You will be asked to explain a visual representation, such as a line graph, bar chart, pie chart, table, or process, using a minimum of 150 words.',
  },
  {
    title: 'Task 2',
    body: 'You will write an essay of at least 250 words discussing a general academic topic.',
  },
];

const speakingItems = [
  {
    title: 'Part 1',
    body: "You'll answer questions about yourself and a couple of familiar topics.",
  },
  {
    title: 'Part 2',
    body: "You'll be given a topic to speak about for 1–2 minutes, with one minute allowed to prepare your response.",
  },
  {
    title: 'Part 3',
    body: "You'll respond to more complex questions related to the theme.",
  },
];

function ItemCards({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'flex', gap: 16, alignItems: 'flex-start',
          background: 'var(--tec-bg-soft, #f8f8f6)', borderRadius: 10,
          padding: '16px 20px', border: '1px solid var(--tec-border, #e8e8e4)'
        }}>
          <span style={{
            minWidth: 28, height: 28, borderRadius: '50%',
            background: 'var(--tec-gold-light, #fdf3d0)', color: 'var(--tec-gold, #c9a227)',
            fontWeight: 700, fontSize: '0.85rem', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1
          }}>{i + 1}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4, color: 'var(--tec-heading)' }}>{it.title}</div>
            <div style={{ fontSize: '0.93rem', color: 'var(--tec-text-light)', lineHeight: 1.75 }}>{it.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function IELTSPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="IELTS Exam Preparation"
        subtitle="Prepare for the globally recognised IELTS exam with expert guidance."
        bgImage="https://trenteducation.co.uk/wp-content/uploads/2025/04/Castle-Blvd.-Frames-1.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split */}
        <div className="aap-intro-split">
          <h2>IELTS Exam Preparation</h2>
          <p>
            These courses provide a fantastic opportunity for individuals looking to excel in the
            International English Language Testing System (IELTS) exam. They enhance your reading,
            writing, listening, and speaking skills while refining exam strategies and language
            proficiency, with in-person options available.
          </p>
        </div>

        {/* Intake badge */}
        <div className="pa-info" style={{ marginBottom: 40 }}>
          <div className="pa-info-head">
            <span className="pa-info-icon"><Calendar size={18} /></span>
            <h3>Intake: Every Month</h3>
          </div>
          <p>
            Strategically located on the prestigious <strong>Castle Boulevard</strong>, our{' '}
            <strong>purpose-designed English Language campus</strong> offers students an inspiring and
            immersive environment that combines modern learning with rich cultural experience. Whether
            you&apos;re preparing for academic success, professional growth, or personal development,
            Trent Language Hub is your gateway to mastering the English language in the heart of the UK.
          </p>
        </div>

        {/* What to Expect */}
        <div className="aap-section-head">
          <span className="aap-eyebrow">Course Overview</span>
          <h2>What to Expect</h2>
        </div>

        <div className="pa-info" style={{ marginBottom: 48 }}>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.85, fontSize: '0.96rem', color: 'var(--tec-text-light)' }}>
            <li style={{ marginBottom: 10 }}><strong>Skill Development:</strong> Comprehensive training in all four IELTS sections: reading, writing, listening, and speaking.</li>
            <li style={{ marginBottom: 10 }}><strong>Exam Techniques:</strong> Learn practical strategies for various question types and essential time management skills.</li>
            <li style={{ marginBottom: 10 }}><strong>Language Enhancement:</strong> Expand your vocabulary, refine grammar, and perfect pronunciation.</li>
            <li style={{ marginBottom: 10 }}><strong>Practice and Feedback:</strong> Engage in practice exercises and mock tests, receiving valuable feedback from experienced instructors.</li>
            <li><strong>Targeted Preparation:</strong> Customised courses to help you achieve specific IELTS goals, whether aiming for a particular band score or preparing for a specific exam version (Academic or General Training).</li>
          </ul>
        </div>

        {/* IELTS Test Components */}
        <div className="aap-section-head">
          <span className="aap-eyebrow">IELTS Test Components</span>
          <h2>The Four Sections</h2>
          <p>The IELTS exam is made up of four main sections that you must complete.</p>
        </div>

        {/* Writing */}
        <div className="aap-section-head" style={{ marginTop: 0, marginBottom: 12 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Writing <span style={{ fontWeight: 400, fontSize: '0.9rem', color: 'var(--tec-text-light)' }}>— 60 minutes, two tasks</span></h3>
        </div>
        <ItemCards items={writingItems} />

        {/* Speaking */}
        <div className="aap-section-head" style={{ marginTop: 40, marginBottom: 12 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Speaking <span style={{ fontWeight: 400, fontSize: '0.9rem', color: 'var(--tec-text-light)' }}>— 10 to 15 minutes, face-to-face interview</span></h3>
        </div>
        <ItemCards items={speakingItems} />

        {/* Listening */}
        <div className="pa-info" style={{ marginTop: 40, marginBottom: 24 }}>
          <div className="pa-info-head">
            <h3>Listening</h3>
          </div>
          <p>This section takes 30 minutes, followed by an additional 10 minutes to transfer your answers. There are four parts:</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0 0', lineHeight: 1.85, fontSize: '0.96rem', color: 'var(--tec-text-light)' }}>
            <li>A dialogue between two people in a daily life situation.</li>
            <li>A monologue in a general social setting, like a public speech.</li>
            <li>A conversation involving up to four people in an academic or training context.</li>
            <li>A monologue focused on an academic topic, such as a university lecture.</li>
          </ul>
        </div>

        {/* Reading */}
        <div className="pa-info" style={{ marginBottom: 56 }}>
          <div className="pa-info-head">
            <h3>Reading</h3>
          </div>
          <p>
            You&apos;ll have 60 minutes to complete the reading test, which includes three passages
            totalling around 2,000–2,750 words and 40 questions.
          </p>
          <p style={{ marginTop: 10 }}>
            You&apos;ll receive a question booklet and a separate answer sheet. Question formats may include
            multiple-choice, identifying key points or the writer&apos;s views, and matching information
            across texts.
          </p>
        </div>

        {/* CTA split */}
        <div className="aap-split" style={{ marginBottom: 0 }}>
          <div className="aap-split-img">
            <img
              src="https://trenteducation.co.uk/wp-content/uploads/2025/04/Castle-Blvd.-Frames-1.jpg"
              alt="IELTS at Trent Language Hub"
              loading="lazy"
            />
          </div>
          <div className="aap-split-body">
            <span className="aap-split-eyebrow">Start Your Journey</span>
            <h3>Unlock Your Potential</h3>
            <p>
              Start your journey with Trent Education Centre and unlock your potential. Our experienced
              tutors will guide you every step of the way to achieve your target band score.
            </p>
            <a href="/apply" className="aap-split-btn">
              Apply Now <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
