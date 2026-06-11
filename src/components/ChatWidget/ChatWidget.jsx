import { useState, useRef, useEffect, useCallback } from 'react';
import './ChatWidget.css';

const BOT_AVATAR = '/assets/logos/tec-crest.png';
const LAMBDA_URL = 'https://htabzeqaghsn4zoe5z5hruppe40ckfyh.lambda-url.us-east-1.on.aws';

// Fire-and-forget — logs the conversation for admin panel, also triggers rate limiting
function logConversation(userMessage, botAnswer, sessionId) {
  fetch(`${LAMBDA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userMessage, botAnswer, sessionId }),
  }).catch(() => {}); // never throw — this is non-critical
}

// ── FAQ knowledge base (purely from TEC site content) ─────────────────────────
const FAQS = [
  {
    keywords: ['courses', 'offer', 'study', 'programme', 'what courses', 'available', 'programs'],
    question: 'What courses does TEC offer?',
    answer: `TEC offers the following courses:\n\n📚 English Language:\n• Ascentis ESOL (English for Speakers of Other Languages)\n• NCFE Functional Skills English (Level 1 & 2)\n• IELTS Exam Preparation\n\n🎓 Higher Education:\n• Pearson BTEC Level 4 & 5 HND in Business (2 years)\n• ATHE Level 4 Extended Diploma in Business & Management\n• ATHE Level 5 Extended Diploma in Business & Management\n\n📝 Further Education:\n• ATHE Level 3 Diploma in Business (12 weeks)\n• NCFE Functional Skills Maths (Level 1 & 2)\n• SIA Door Supervisor Licence Course\n• Digital Skills for Beginners (FREE)\n\nContact us at info@trenteducation.co.uk for more details.`,
  },
  {
    keywords: ['gcse', 'a-level', 'a level', 'school', 'secondary', 'alevel'],
    question: 'Do you offer GCSEs or A-Levels?',
    answer: `No, TEC does not offer GCSEs or A-Levels. We are a further and higher education provider for adults (18+).\n\nWe offer:\n• ATHE Level 3 Diploma in Business (equivalent to A-Level)\n• NCFE Functional Skills in English & Maths\n• Higher Education courses (BTEC HND, ATHE Level 4 & 5)\n• English language courses (ESOL, IELTS)\n\nContact admissions@trenteducation.co.uk for guidance on which course suits you.`,
  },
  {
    keywords: ['apply', 'application', 'enrol', 'enroll', 'sign up', 'register', 'admission', 'how to join', 'start', 'joining'],
    question: 'How do I apply / enrol?',
    answer: `Applying to TEC is simple — 3 steps:\n\n1️⃣ Complete the online Student Application Form (takes ~20 minutes). Include your details, course choice, and supporting documents.\n\n2️⃣ Our admissions team reviews your application against the entry requirements.\n\n3️⃣ If successful, you'll receive an offer and can enrol and begin studying.\n\n📧 Email: admissions@trenteducation.co.uk\n📞 Phone: (+44) 1157950171\n\nAdmissions for new intakes are open — contact us to check availability.`,
  },
  {
    keywords: ['fee', 'cost', 'fees', 'price', 'how much', 'tuition', 'pay', 'payment', 'free', 'charge'],
    question: 'How much do the courses cost?',
    answer: `Course fees vary by programme:\n\n✅ FREE: Digital Skills for Beginners (free for UK/Home students)\n\n💷 Paid courses: Contact TEC for current fee information — fees depend on your student status (UK Home / International).\n\nFunding options available:\n• Self-funded\n• Employer-sponsored\n• Government grants or loans\n• TEC Scholarships & Bursaries (£100,000 fund per year)\n\nInternational students pay an additional booking fee before travelling to the UK.\n\n📧 admissions@trenteducation.co.uk\n📞 (+44) 1157950171`,
  },
  {
    keywords: ['location', 'address', 'where', 'campus', 'centre', 'center', 'nottingham', 'leicester', 'birmingham', 'castle boulevard', 'find you', 'directions'],
    question: 'Where are TEC\'s study centres?',
    answer: `TEC has 5 study centres:\n\n📍 Nottingham (Head Office)\nDigital House 2.3, Clarendon Park, Nottingham, NG5 1AH\n\n📍 Nottingham Study Centre 1\n2.1, Clarendon Park, Nottingham, NG5 1AH\n\n📍 Nottingham Study Centre 2 (English / Language Hub)\n16 Castle Blvd, Nottingham, NG7 1FL\n(Buses: 11, 35, 36, 9 — short walk from city centre)\n\n📍 Leicester Study Centre\nHumberstone House, 81–83 Humberstone Gate, Leicester, LE1 1WB\n(Next to Primark, all city centre buses)\n\n📍 Birmingham Study Centre\nMill Wharf, Mill Street, Birmingham, B6 4BS\n\nAll centres open 7 days a week.`,
  },
  {
    keywords: ['entry', 'requirement', 'qualify', 'eligible', 'qualification needed', 'need to have', 'entry requirement', 'criteria', 'can i join'],
    question: 'What are the entry requirements?',
    answer: `Entry requirements depend on the course:\n\n📘 ATHE Level 3 (Further Ed):\n• 5 GCSEs grade C/4 or above, OR equivalent Level 2 qualifications, OR relevant work experience\n• English: CEFR B1 minimum\n\n🎓 ATHE Level 4 / BTEC HND (Higher Ed):\n• Level 3 qualification (A-Levels, ATHE Level 3, Access to HE) OR work experience\n• English: CEFR B2 minimum (IELTS 5.5 for BTEC)\n\n🗣️ ESOL / English courses:\n• No formal qualifications needed — an assessment determines your level\n\n📞 Call (+44) 1157950171 to discuss your background.`,
  },
  {
    keywords: ['scholarship', 'bursary', 'funding', 'financial support', 'help paying', 'discount', 'grant', 'loan'],
    question: 'Are scholarships or bursaries available?',
    answer: `Yes! TEC offers two types of financial support:\n\n🏆 Scholarships\nFor students with outstanding achievements (academic, work, sports, arts or music). May cover the full cost of study.\n\n💰 Bursaries\nFor students from low-income backgrounds. Contributes towards tuition costs.\n\nKey facts:\n• £100,000 set aside each academic year\n• Apply at least 1 month before the term starts\n• Decision made within 2 weeks by the Senior Management Team\n\n📧 admissions@trenteducation.co.uk`,
  },
  {
    keywords: ['english', 'esol', 'language', 'ielts', 'functional skills english', 'improve english', 'english course', 'speaking', 'writing', 'reading'],
    question: 'What English courses do you offer?',
    answer: `TEC offers three English courses at the Castle Boulevard campus, Nottingham:\n\n1️⃣ Ascentis ESOL Certificate\nFor adults 18+ improving everyday English. Suitable for settled communities, refugees, and asylum seekers.\n• 2 days/week, 4 hours/day (10:00–16:30)\n• 30 weeks total (270 hours)\n• Three units: Speaking & Listening, Reading, Writing\n• No extra fees for registration, exams or materials\n\n2️⃣ NCFE Functional Skills English (Level 1 & 2)\nNationally recognised English qualification — 6 weeks, onsite.\n\n3️⃣ IELTS Exam Preparation\nMonthly intakes. Covers all 4 IELTS sections with mock tests and expert feedback.\n\n📍 16 Castle Blvd, Nottingham, NG7 1FL`,
  },
  {
    keywords: ['btec', 'hnd', 'higher national', 'business degree', 'degree', 'university', 'progression', 'level 4', 'level 5'],
    question: 'Tell me about the BTEC HND in Business.',
    answer: `The Pearson BTEC Level 4 & 5 HND in Business is a 2-year programme equivalent to the first two years of a university degree.\n\n📋 Key facts:\n• 240 credits total (120 at Level 4 + 120 at Level 5)\n• Blended learning: one online + one in-person session per week\n• No exams — assessed by assignments and projects only\n\n📈 Career paths:\n• Management, marketing, HR, finance, entrepreneurship\n• Progress to Year 2 or 3 of a university degree\n\n✅ Entry: Level 3 qualification or equivalent work experience\n🗣️ English: IELTS 5.5 or CEFR B2\n\n📧 info@trenteducation.co.uk`,
  },
  {
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'get in touch', 'open', 'hours', 'office', 'telephone'],
    question: 'How do I contact TEC?',
    answer: `You can reach TEC through:\n\n📞 Phone: (+44) 1157950171\n📧 General: info@trenteducation.co.uk\n📧 Admissions: admissions@trenteducation.co.uk\n\n🕐 Office hours: Monday – Friday, 9:00 am – 5:00 pm\n🏫 Study centres: Open 7 days a week\n\n📍 Head Office:\nDigital House 2.3, Clarendon Park, Nottingham, NG5 1AH\n\nWe aim to reply within 1–2 working days by email.`,
  },
  {
    keywords: ['international', 'visa', 'overseas', 'foreign', 'abroad', 'outside uk', 'from abroad', 'international student'],
    question: 'Can I apply as an international student?',
    answer: `Yes, TEC welcomes international students!\n\n🌍 Key information:\n• TEC is based in Nottingham — a welcoming, diverse student city\n• International students pay an additional booking fee before travelling to the UK (contact admissions for the amount)\n• Fees can be paid via Flywire (240 countries, 140+ currencies, 24/7 support)\n\n📋 Application process:\n1. Apply and submit documents\n2. Attend an interview (online ID verification)\n3. Receive a Conditional Offer Letter\n4. Accept offer and complete pre-arrival steps\n\n📧 info@trenteducation.co.uk\n📞 (+44) 1157950171`,
  },
  {
    keywords: ['digital', 'computer', 'it skills', 'technology', 'beginner computer', 'basic computer', 'online', 'internet skills'],
    question: 'Tell me about the Digital Skills course.',
    answer: `TEC offers a FREE Digital Skills for Beginners course for UK/Home students.\n\n🖥️ For: People new to digital devices, internet, email or social media.\n\n📅 7-week programme:\n• Week 1: Digital Devices & Internet\n• Week 2: Email & Online Communication\n• Week 3: Microsoft Office & Job Search Skills\n• Week 4: E-Commerce & Online Shopping\n• Week 5: Video Calls & Staying Connected\n• Week 6: Online Security\n• Week 7: Practical Assessment\n\n✅ Completely FREE for UK students\n✅ No prior experience needed\n\n📧 admissions@trenteducation.co.uk`,
  },
  {
    keywords: ['sia', 'door supervisor', 'security', 'bouncer', 'licence', 'license', 'security guard'],
    question: 'Tell me about the SIA Door Supervisor course.',
    answer: `TEC offers the BIIAB Level 3 Award for Door Supervisors — this meets SIA licence requirements.\n\n📋 What's included:\n• Unit 1: Working within the Private Security Industry\n• Unit 2: Working as a Door Supervisor\n• Unit 3: Conflict Management\n• Unit 4: Physical Intervention Skills\n• BIIAB Level 3 Emergency First Aid at Work (mandatory)\n\n✅ Hands-on training with real-world scenarios\n✅ Fulfils requirements to apply for an SIA licence\n\n🗣️ English requirement: CEFR B2 or Functional Skills Level 1\n\n📧 admissions@trenteducation.co.uk`,
  },
  {
    keywords: ['maths', 'math', 'mathematics', 'numeracy', 'functional skills maths', 'numbers'],
    question: 'Do you offer Maths courses?',
    answer: `Yes! TEC offers NCFE Functional Skills in Mathematics:\n\n📐 Level 1 Functional Skills Maths\n• Nationally recognised qualification (NCFE & Open Awards, regulated by Ofqual)\n• 6 weeks, onsite\n• No prior qualifications required\n• An assessment determines your starting level\n• Progression to Level 2 after completion\n\n📐 Level 2 Functional Skills Maths\n• Higher level of the same qualification\n• 6 weeks, onsite\n\n✅ FREE for eligible UK students\n\n📧 admissions@trenteducation.co.uk`,
  },
  {
    keywords: ['athe', 'level 3', 'diploma', 'business diploma', 'level 3 business'],
    question: 'Tell me about the ATHE Level 3 Diploma in Business.',
    answer: `The ATHE Level 3 Diploma in Business is a 60-credit qualification equivalent to an A-Level.\n\n📋 Key facts:\n• Awarded by ATHE, regulated by Ofqual\n• Duration: 12 weeks, onsite\n• 5 units: Business Environment, How Businesses Work, Business Communication, Working in Teams, Market Research\n\n✅ Widely recognised by employers\n📈 Progression: directly into ATHE Level 4 or BTEC HND in Business\n\nEntry: 5 GCSEs grade C/4 or above (or equivalent), or relevant work experience.\nEnglish: CEFR B1 minimum.\n\n📧 admissions@trenteducation.co.uk`,
  },
];

const SUGGESTED_QUESTIONS = [
  'What courses do you offer?',
  'How do I apply?',
  'How much do courses cost?',
  'Where are you located?',
  'Do you offer scholarships?',
  'Can I apply as an international student?',
];

// ── Simple keyword matcher ─────────────────────────────────────────────────────
function findAnswer(input) {
  const text = input.toLowerCase().trim();
  if (!text) return null;

  let best = null;
  let bestScore = 0;

  for (const faq of FAQS) {
    let score = 0;
    for (const kw of faq.keywords) {
      if (text.includes(kw)) score += kw.split(' ').length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }

  return bestScore > 0 ? best.answer : null;
}

const FALLBACK = `I'm sorry, I don't have information about that.\n\nFor questions not answered here, please contact us directly:\n\n📞 (+44) 1157950171\n📧 info@trenteducation.co.uk\n📧 admissions@trenteducation.co.uk\n🕐 Mon–Fri, 9:00 am – 5:00 pm`;

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! 👋 I'm the TEC assistant. I can answer questions about our courses, admissions, fees, locations, and more.\n\nWhat would you like to know?",
      ts: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [sessionId] = useState(() => crypto.randomUUID());
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open && !minimised) inputRef.current?.focus();
  }, [open, minimised]);

  const sendMessage = useCallback((textArg) => {
    const trimmed = (typeof textArg === 'string' ? textArg : input).trim();
    if (!trimmed || typing) return;
    setInput('');
    setShowSuggestions(false);

    setMessages(prev => [...prev, { role: 'user', content: trimmed, ts: new Date() }]);
    setTyping(true);

    setTimeout(() => {
      const answer = findAnswer(trimmed);
      const botAnswer = answer || FALLBACK;
      setMessages(prev => [...prev, { role: 'assistant', content: botAnswer, ts: new Date() }]);
      setTyping(false);
      logConversation(trimmed, botAnswer, sessionId);
    }, 450);
  }, [input, typing]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!open) {
    return (
      <button className="chat-launcher" onClick={() => setOpen(true)} aria-label="Open chat">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className="chat-launcher-label">Ask TEC</span>
      </button>
    );
  }

  return (
    <div className={`chat-widget${minimised ? ' chat-widget--min' : ''}`}>
      <div className="chat-header">
        <img src={BOT_AVATAR} alt="TEC" className="chat-header-avatar" onError={e => { e.target.style.display = 'none'; }} />
        <div className="chat-header-info">
          <span className="chat-header-name">TEC Assistant</span>
          <span className="chat-header-status">
            <span className="chat-status-dot" />
            Online
          </span>
        </div>
        <div className="chat-header-actions">
          <button className="chat-icon-btn" onClick={() => setMinimised(m => !m)} aria-label={minimised ? 'Expand' : 'Minimise'}>
            {minimised ? '▲' : '▼'}
          </button>
          <button className="chat-icon-btn" onClick={() => setOpen(false)} aria-label="Close">
            ✕
          </button>
        </div>
      </div>

      {!minimised && (
        <>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg--${msg.role}`}>
                {msg.role === 'assistant' && (
                  <img src={BOT_AVATAR} alt="TEC" className="chat-msg-avatar" onError={e => { e.target.style.display = 'none'; }} />
                )}
                <div className="chat-msg-body">
                  <div className="chat-bubble">{msg.content}</div>
                  <div className="chat-ts">{formatTime(msg.ts)}</div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="chat-msg chat-msg--assistant">
                <img src={BOT_AVATAR} alt="TEC" className="chat-msg-avatar" onError={e => { e.target.style.display = 'none'; }} />
                <div className="chat-msg-body">
                  <div className="chat-bubble chat-bubble--typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            {showSuggestions && !typing && (
              <div className="chat-suggestions">
                <p className="chat-suggestions-label">Common questions:</p>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button key={i} className="chat-suggestion-btn" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Type your question…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              maxLength={500}
            />
            <button
              className="chat-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          <div className="chat-footer">
            Trent Education Centre · <a href="mailto:info@trenteducation.co.uk">info@trenteducation.co.uk</a>
          </div>
        </>
      )}
    </div>
  );
}
