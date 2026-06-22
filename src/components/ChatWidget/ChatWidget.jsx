import { useState, useRef, useEffect, useCallback } from 'react';
import './ChatWidget.css';
import { logChat, getRecaptchaToken } from '../../utils/api';

const BOT_AVATAR = '/assets/logos/tec-crest.png';

// Fire-and-forget — logs the conversation to FastAPI backend for admin panel
async function logConversation(userMessage, botAnswer, sessionId) {
  try {
    const recaptchaToken = await getRecaptchaToken('chat');
    await logChat(userMessage, botAnswer, sessionId, recaptchaToken);
  } catch {
    // never throw — this is non-critical logging
  }
}

// ── FAQ knowledge base (purely from TEC site content) ─────────────────────────
const FAQS = [
  {
    keywords: ['courses', 'offer', 'study', 'programme', 'what courses', 'available', 'programs'],
    question: 'What courses does TEC offer?',
    answer: `TEC offers the following courses:\n\nEnglish Language:\n• Ascentis ESOL (English for Speakers of Other Languages)\n• NCFE Functional Skills English (Level 1 & 2)\n• IELTS Exam Preparation\n\nHigher Education:\n• Pearson BTEC Level 4 & 5 HND in Business (2 years)\n• ATHE Level 4 Extended Diploma in Business & Management\n• ATHE Level 5 Extended Diploma in Business & Management\n\nFurther Education:\n• ATHE Level 3 Diploma in Business (12 weeks)\n• NCFE Functional Skills Maths (Level 1 & 2)\n• SIA Door Supervisor Licence Course\n• Digital Skills for Beginners (free for UK students)\n\nFor further information, please contact us at info@trenteducation.co.uk.`,
  },
  {
    keywords: ['gcse', 'a-level', 'a level', 'school', 'secondary', 'alevel'],
    question: 'Do you offer GCSEs or A-Levels?',
    answer: `TEC does not offer GCSEs or A-Levels. We are a further and higher education provider for adults aged 18 and above.\n\nWe do offer:\n• ATHE Level 3 Diploma in Business (equivalent to an A-Level)\n• NCFE Functional Skills in English and Maths\n• Higher Education courses (BTEC HND, ATHE Level 4 and 5)\n• English language courses (ESOL, IELTS)\n\nPlease contact our admissions team at admissions@trenteducation.co.uk for guidance on the most suitable course for you.`,
  },
  {
    keywords: ['apply', 'application', 'enrol', 'enroll', 'sign up', 'register', 'admission', 'how to join', 'start', 'joining'],
    question: 'How do I apply / enrol?',
    answer: `Applying to TEC involves three straightforward steps:\n\n1. Complete the online Student Application Form (approximately 20 minutes). Please include your personal details, chosen course, and any supporting documents.\n\n2. Our admissions team will review your application against the relevant entry requirements.\n\n3. If successful, you will receive an offer letter and can proceed to enrol and begin your studies.\n\nEmail: admissions@trenteducation.co.uk\nPhone: (+44) 1157950171\n\nAdmissions are currently open. Please get in touch to confirm availability for your chosen course.`,
  },
  {
    keywords: ['fee', 'cost', 'fees', 'price', 'how much', 'tuition', 'pay', 'payment', 'free', 'charge'],
    question: 'How much do the courses cost?',
    answer: `Course fees vary depending on the programme and your student status.\n\nThe Digital Skills for Beginners course is available free of charge for UK home students.\n\nFor all other courses, please contact TEC directly for current fee information, as fees differ for UK home and international students.\n\nFunding options include:\n• Self-funded\n• Employer-sponsored\n• Government grants or loans\n• TEC Scholarships and Bursaries (£100,000 allocated annually)\n\nInternational students are required to pay an additional booking fee prior to travelling to the UK.\n\nEmail: admissions@trenteducation.co.uk\nPhone: (+44) 1157950171`,
  },
  {
    keywords: ['location', 'address', 'where', 'campus', 'centre', 'center', 'nottingham', 'leicester', 'birmingham', 'castle boulevard', 'find you', 'directions'],
    question: 'Where are TEC\'s study centres?',
    answer: `TEC operates five study centres across three cities:\n\nNottingham — Head Office\nDigital House 2.3, Clarendon Park, Nottingham, NG5 1AH\n\nNottingham — Study Centre 1\n2.1, Clarendon Park, Nottingham, NG5 1AH\n\nNottingham — Study Centre 2 (English Language / Castle Boulevard Campus)\n16 Castle Blvd, Nottingham, NG7 1FL\nNearest buses: 11, 35, 36, 9 — a short walk from the city centre.\n\nLeicester Study Centre\nHumberstone House, 81–83 Humberstone Gate, Leicester, LE1 1WB\nLocated next to Primark, accessible by all city centre buses.\n\nBirmingham Study Centre\nMill Wharf, Mill Street, Birmingham, B6 4BS\n\nAll centres are open seven days a week.`,
  },
  {
    keywords: ['entry', 'requirement', 'qualify', 'eligible', 'qualification needed', 'need to have', 'entry requirement', 'criteria', 'can i join'],
    question: 'What are the entry requirements?',
    answer: `Entry requirements vary by course:\n\nATHE Level 3 (Further Education):\n• Five GCSEs at grade C/4 or above, or equivalent Level 2 qualifications, or relevant work experience\n• English: CEFR B1 minimum\n\nATHE Level 4 and BTEC HND (Higher Education):\n• A Level 3 qualification (A-Levels, ATHE Level 3, or Access to Higher Education), or equivalent work experience\n• English: CEFR B2 minimum (IELTS 5.5 for BTEC HND)\n\nESOL and English Language courses:\n• No formal qualifications are required — your level will be assessed before enrolment\n\nPlease call (+44) 1157950171 to discuss your background and find the right course.`,
  },
  {
    keywords: ['scholarship', 'bursary', 'funding', 'financial support', 'help paying', 'discount', 'grant', 'loan'],
    question: 'Are scholarships or bursaries available?',
    answer: `TEC offers two forms of financial support:\n\nScholarships\nAvailable to students who demonstrate outstanding achievements in academics, work, sport, arts, or music. A scholarship may cover the full cost of study.\n\nBursaries\nAvailable to students from low-income backgrounds, contributing towards tuition costs.\n\nKey information:\n• £100,000 is allocated annually for scholarships and bursaries\n• Applications must be submitted at least one month before the term start date\n• Decisions are made within two weeks by the Senior Management Team\n• Once the annual fund is exhausted, no further applications are accepted until the next academic year\n\nEmail: admissions@trenteducation.co.uk`,
  },
  {
    keywords: ['english', 'esol', 'language', 'ielts', 'functional skills english', 'improve english', 'english course', 'speaking', 'writing', 'reading'],
    question: 'What English courses do you offer?',
    answer: `TEC offers three English language courses, all delivered at our Castle Boulevard campus in Nottingham:\n\n1. Ascentis ESOL Certificate\nDesigned for adults aged 18 and above who wish to improve their everyday English. Suitable for settled communities, refugees, and asylum seekers.\n• Two days per week, four hours per day (10:00–16:30)\n• 30 weeks in total (270 hours)\n• Three units: Speaking and Listening, Reading, and Writing\n• No additional fees for registration, exams, or materials\n\n2. NCFE Functional Skills English (Level 1 and Level 2)\nA nationally recognised English qualification. Duration: 6 weeks, delivered onsite.\n\n3. IELTS Exam Preparation\nMonthly intakes. Covers all four IELTS sections with practice tests and expert feedback.\n\nCampus address: 16 Castle Blvd, Nottingham, NG7 1FL`,
  },
  {
    keywords: ['btec', 'hnd', 'higher national', 'business degree', 'degree', 'university', 'progression', 'level 4', 'level 5'],
    question: 'Tell me about the BTEC HND in Business.',
    answer: `The Pearson BTEC Level 4 and 5 Higher National Diploma (HND) in Business is a two-year programme equivalent to the first two years of a university degree.\n\nKey details:\n• 240 credits in total (120 at Level 4, 120 at Level 5)\n• Delivered through blended learning: one online session and one in-person session per week\n• Assessment is by assignments and projects only — no formal examinations\n\nCareer pathways include management, marketing, human resources, finance, and entrepreneurship.\n\nGraduates may progress to Year 2 or Year 3 of a university degree programme.\n\nEntry requirements: A Level 3 qualification or equivalent work experience.\nEnglish requirement: IELTS 5.5 or CEFR B2.\n\nEmail: info@trenteducation.co.uk`,
  },
  {
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'get in touch', 'open', 'hours', 'office', 'telephone'],
    question: 'How do I contact TEC?',
    answer: `You can contact Trent Education Centre through the following:\n\nPhone: (+44) 1157950171\nGeneral enquiries: info@trenteducation.co.uk\nAdmissions: admissions@trenteducation.co.uk\n\nOffice hours: Monday to Friday, 9:00 am – 5:00 pm\nStudy centres: Open seven days a week\n\nHead Office:\nDigital House 2.3, Clarendon Park, Nottingham, NG5 1AH\n\nWe aim to respond to all email enquiries within one to two working days.`,
  },
  {
    keywords: ['international', 'visa', 'overseas', 'foreign', 'abroad', 'outside uk', 'from abroad', 'international student'],
    question: 'Can I apply as an international student?',
    answer: `TEC welcomes applications from international students.\n\nKey information:\n• TEC is based in Nottingham — a diverse and welcoming city for international learners\n• An additional booking fee is required before travelling to the UK to cover visa administration costs (please contact admissions for the exact amount)\n• Tuition fees can be paid via Flywire, which supports payments from over 240 countries in 140+ currencies with multilingual support available around the clock\n\nApplication process:\n1. Submit your application with the required documents\n2. Attend an interview, which includes identity verification\n3. Receive a Conditional Offer Letter\n4. Accept your offer and complete any pre-arrival requirements\n\nEmail: info@trenteducation.co.uk\nPhone: (+44) 1157950171`,
  },
  {
    keywords: ['digital', 'computer', 'it skills', 'technology', 'beginner computer', 'basic computer', 'online', 'internet skills'],
    question: 'Tell me about the Digital Skills course.',
    answer: `TEC offers a Digital Skills for Beginners course, available free of charge for UK home students.\n\nThis course is designed for people who are new to digital devices, online communication, or basic computing.\n\nThe programme runs over seven weeks:\n• Week 1: Getting started with digital devices and navigating the internet\n• Week 2: Mastering email and online communication\n• Week 3: Microsoft Office and job search skills\n• Week 4: E-commerce and safe online shopping\n• Week 5: Staying connected through video calls\n• Week 6: Online security best practices\n• Week 7: Practical assessment\n\nNo prior experience is required. The course is completely free for eligible UK students.\n\nEmail: admissions@trenteducation.co.uk`,
  },
  {
    keywords: ['sia', 'door supervisor', 'security', 'bouncer', 'licence', 'license', 'security guard'],
    question: 'Tell me about the SIA Door Supervisor course.',
    answer: `TEC offers the BIIAB Level 3 Award for Door Supervisors, which meets the requirements for obtaining an SIA licence to practise.\n\nThe course covers the following units:\n• Unit 1: Working within the Private Security Industry\n• Unit 2: Working as a Door Supervisor\n• Unit 3: Conflict Management within the Private Security Industry\n• Unit 4: Physical Intervention Skills\n• BIIAB Level 3 Award in Emergency First Aid at Work (mandatory under SIA regulations)\n\nTraining includes hands-on practical sessions and conflict management simulations.\n\nEnglish language requirement: CEFR B2, or Functional Skills English Level 1.\n\nEmail: admissions@trenteducation.co.uk`,
  },
  {
    keywords: ['maths', 'math', 'mathematics', 'numeracy', 'functional skills maths', 'numbers'],
    question: 'Do you offer Maths courses?',
    answer: `TEC offers NCFE Functional Skills in Mathematics at two levels:\n\nLevel 1 Functional Skills Maths\n• Nationally recognised qualification, awarded by NCFE and Open Awards (regulated by Ofqual)\n• Duration: 6 weeks, delivered onsite\n• No prior qualifications required — a skills assessment is completed before enrolment to determine your starting level\n• On completion, students may progress to Level 2\n\nLevel 2 Functional Skills Maths\n• A higher-level continuation of the above qualification\n• Duration: 6 weeks, delivered onsite\n\nThis course may be available free of charge for eligible UK students. Please contact us to confirm.\n\nEmail: admissions@trenteducation.co.uk`,
  },
  {
    keywords: ['athe', 'level 3', 'diploma', 'business diploma', 'level 3 business'],
    question: 'Tell me about the ATHE Level 3 Diploma in Business.',
    answer: `The ATHE Level 3 Diploma in Business is a 60-credit qualification equivalent to an A-Level, awarded by ATHE and regulated by Ofqual.\n\nKey details:\n• Duration: 12 weeks, delivered onsite\n• Five units: Business Environment, How Businesses and Organisations Work, Business Communication, Working in Teams, and Market Research\n• Widely recognised by employers\n• Provides direct progression to the ATHE Level 4 Diploma or the BTEC HND in Business\n\nEntry requirements: Five GCSEs at grade C/4 or above (or equivalent qualifications), or relevant work experience.\nEnglish requirement: CEFR B1 minimum.\n\nEmail: admissions@trenteducation.co.uk`,
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

const FALLBACK = `I'm sorry, I don't have specific information about that.\n\nFor any questions not covered here, please contact us directly:\n\nPhone: (+44) 1157950171\nGeneral enquiries: info@trenteducation.co.uk\nAdmissions: admissions@trenteducation.co.uk\nOffice hours: Monday to Friday, 9:00 am – 5:00 pm`;

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hello, I'm the TEC assistant. I can answer questions about our courses, admissions, fees, locations, and more.\n\nWhat would you like to know?",
  ts: new Date(),
};

function freshState() {
  return {
    messages: [{ ...INITIAL_MESSAGE, ts: new Date() }],
    showSuggestions: true,
    sessionId: crypto.randomUUID(),
  };
}

export default function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages]   = useState(freshState().messages);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const [input, setInput]         = useState('');
  const [typing, setTyping]       = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, showSuggestions]);

  useEffect(() => {
    if (open && !minimised) inputRef.current?.focus();
  }, [open, minimised]);

  function resetChat() {
    const s = freshState();
    setMessages(s.messages);
    setShowSuggestions(true);
    setSessionId(s.sessionId);
    setInput('');
    setTyping(false);
  }

  const sendMessage = useCallback((textArg) => {
    const trimmed = (typeof textArg === 'string' ? textArg : input).trim();
    if (!trimmed || typing) return;
    setInput('');
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', content: trimmed, ts: new Date() }]);
    setTyping(true);

    setTimeout(() => {
      const answer = findAnswer(trimmed);
      const isFallback = !answer;
      const botAnswer = answer || FALLBACK;
      setMessages(prev => [...prev, { role: 'assistant', content: botAnswer, ts: new Date() }]);
      setTyping(false);
      // Show suggestions again after a fallback so user knows what the bot CAN answer
      if (isFallback) setShowSuggestions(true);
      logConversation(trimmed, botAnswer, sessionId);
    }, 450);
  }, [input, typing, sessionId]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
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

  const hasConversation = messages.length > 1;

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
          {hasConversation && (
            <button className="chat-icon-btn" onClick={resetChat} aria-label="New conversation" title="Start new conversation">
              ↺
            </button>
          )}
          <button className="chat-icon-btn" onClick={() => setMinimised(m => !m)} aria-label={minimised ? 'Expand' : 'Minimise'}>
            {minimised ? '▲' : '▼'}
          </button>
          <button className="chat-icon-btn" onClick={() => setOpen(false)} aria-label="Close">✕</button>
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
                  <div className="chat-bubble chat-bubble--typing"><span /><span /><span /></div>
                </div>
              </div>
            )}

            {/* Suggestions panel — shows on open, after fallback, or when user toggles */}
            {showSuggestions && !typing && (
              <div className="chat-suggestions">
                <div className="chat-suggestions-header">
                  <p className="chat-suggestions-label">Common questions</p>
                  {hasConversation && (
                    <button className="chat-suggestions-close" onClick={() => setShowSuggestions(false)} aria-label="Hide suggestions">✕</button>
                  )}
                </div>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button key={i} className="chat-suggestion-btn" onClick={() => sendMessage(q)}>{q}</button>
                ))}
              </div>
            )}

            {/* Show suggestions toggle when hidden and not typing */}
            {!showSuggestions && !typing && (
              <div style={{ textAlign: 'center', padding: '4px 0 2px' }}>
                <button className="chat-suggestions-toggle" onClick={() => setShowSuggestions(true)}>
                  💡 Common questions
                </button>
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
