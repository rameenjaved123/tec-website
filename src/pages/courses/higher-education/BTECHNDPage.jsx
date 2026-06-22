import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Award, TrendingUp, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import '../../InnerPage.css';
import '../../CoursePage.css';
import './ATHELevel4Page.css';
import './BTECHNDPage.css';
import PageHero from '../../../components/PageHero';

/* ─────────────────────────────────────────────
   Level 4 Units
───────────────────────────────────────────── */
const level4Units = [
  {
    key: 'l4u1',
    title: 'Unit 1. The Contemporary Business Environment',
    code: 'H/650/2917', level: 4, credits: 15,
    outcomes: [
      'LO1 Explain the different types, sizes and scope of organisations',
      'LO2 Discuss the interrelationship of the various functions in an organisation and how they link to organisational structure',
      'LO3 Use contemporary examples to demonstrate both the positive and negative influence/impact the macroenvironment has on business operations',
      'LO4 Determine the internal strengths and weaknesses of a specific business and their interrelationship with external macro factors',
    ],
  },
  {
    key: 'l4u2',
    title: 'Unit 2. Marketing Processes and Planning',
    code: 'A/618/5033', level: 4, credits: 15,
    outcomes: [
      'LO1 Explain the role of marketing and how it interrelates with other business units of an organisation',
      'LO2 Compare ways in which organisations use elements of the marketing mix to achieve overall business objectives',
      'LO3 Produce a marketing plan for an organisation that meets marketing objectives',
      'LO4 Develop a media plan to support a marketing campaign for an organisation',
    ],
  },
  {
    key: 'l4u3',
    title: 'Unit 3. Human Resource Management',
    code: 'J/650/2918', level: 4, credits: 15,
    outcomes: [
      'LO1 Explain the impact of the role of HRM in creating sustainable organisational performance and contributing to business success',
      'LO2 Produce a workforce action plan for recruiting and retaining talent to address skills shortages in an organisation',
      'LO3 Examine how external and internal factors can affect HRM decision-making in relation to organisational development',
      'LO4 Apply HRM practices in a work-related context for improving sustainable organisational performance',
    ],
  },
  {
    key: 'l4u4',
    title: 'Unit 4. Leadership and Management',
    code: 'L/618/5036', level: 4, credits: 15,
    outcomes: [
      'LO1 Examine leadership and management theories and principles, and their impact on the effectiveness of an organisation',
      'LO2 Review the influence of different leadership and management styles on the culture of organisations',
      'LO3 Develop a motivational strategy to optimise organisational performance',
      'LO4 Apply leadership and management approaches to managing performance to ensure continuous improvement',
    ],
  },
  {
    key: 'l4u5',
    title: 'Unit 5. Accounting Principles',
    code: 'Y/618/5038', level: 4, credits: 15,
    outcomes: [
      'LO1 Examine the context and purpose of accounting',
      'LO2 Prepare basic financial statements for unincorporated and small business organisations in accordance with accounting principles, conventions, and standards',
      'LO3 Interpret financial statements',
      'LO4 Prepare budgets for planning, control and decision making using spreadsheets',
    ],
  },
  {
    key: 'l4u6',
    title: 'Unit 6. Managing a Successful Business Project',
    code: 'D/618/5039', level: 4, credits: 15,
    outcomes: [
      'LO1 Explain the key stages of the project lifecycle that should be considered when project managing',
      'LO2 Produce a Project Management Plan (PMP) for a business project using primary and secondary research methods',
      'LO3 Implement the Project Management Plan (PMP) to communicate results from the research and make conclusions from the evidence of findings',
      'LO4 Reflect on value gained from implementing the project and the project management process',
    ],
  },
  {
    key: 'l4u8',
    title: 'Unit 8. Innovation and Commercialisation',
    code: 'D/618/5042', level: 4, credits: 15,
    outcomes: [
      'LO1 Investigate how innovation is sourced and supported within different types of organisations',
      'LO2 Explore the processing of different types of innovation within organisations',
      'LO3 Apply the process required to commercialise innovation within an organisation',
      'LO4 Evaluate the range of methods for protecting innovation within organisations',
    ],
  },
  {
    key: 'l4u9',
    title: 'Unit 9. Entrepreneurial Venture',
    code: 'A/618/5047', level: 4, credits: 15,
    outcomes: [
      'LO1 Examine what it takes to be an entrepreneur and the scope of entrepreneurial ventures',
      'LO2 Explore the concept of the entrepreneurial mindset and its contribution to entrepreneurial ventures',
      'LO3 Assess the impact of SMEs (small medium enterprises) on the economy',
      'LO4 Explain the importance of intrapreneurship in both public and corporate organisations',
    ],
  },
];

/* ─────────────────────────────────────────────
   Level 5 Units
───────────────────────────────────────────── */
const level5Units = [
  {
    key: 'l5u19',
    title: 'Unit 19. Research Project (Pearson Set)',
    code: 'H/618/5060', level: 5, credits: 30,
    outcomes: [
      'LO1 Examine appropriate research methodologies and methods to identify those appropriate to the research process',
      'LO2 Develop a research proposal, including a supporting literature review',
      'LO3 Analyse data using appropriate techniques to communicate research findings',
      'LO4 Reflect on the application of research methodologies and process',
    ],
  },
  {
    key: 'l5u20',
    title: 'Unit 20. Organisational Behaviour Management',
    code: 'R/650/2920', level: 5, credits: 15,
    outcomes: [
      'LO1 Reflect on own personality and perceptions to understand how individual difference informs and influences management approaches',
      'LO2 Apply content and process theories of motivation to create and maintain an effective workforce',
      'LO3 Lead a group team activity for a given business situation to demonstrate effective team leadership skills',
      'LO4 Examine how power, politics and culture can be used to influence employee behaviour and accomplish organisational goals',
    ],
  },
  {
    key: 'l5u27',
    title: 'Unit 27. Identifying Entrepreneurial Opportunities',
    code: 'A/618/5095', level: 5, credits: 15,
    outcomes: [
      'LO1 Explore the role of entrepreneurship and innovation for developing new entrepreneurial ideas',
      'LO2 Investigate a potential entrepreneurial idea arising from a gap in the market for a small to medium sized (SME) enterprise',
      'LO3 Analyse primary and secondary data to identify the market potential of an entrepreneurial idea',
      'LO4 Pitch the potential viability of an entrepreneurial idea in the context of the market and competitors',
    ],
  },
  {
    key: 'l5u28',
    title: 'Unit 28. Launching a New Venture',
    code: 'A/618/5114', level: 5, credits: 15,
    outcomes: [
      'LO1 Investigate the resources required to launch a new venture',
      'LO2 Explore skills and capabilities required to support the launch of a new venture',
      'LO3 Develop promotional activities to support the launch of a new venture',
      'LO4 Produce a budget for a small business or social enterprise',
    ],
  },
  {
    key: 'l5u29',
    title: 'Unit 29. Managing and Running a Small Business',
    code: 'F/618/5115', level: 5, credits: 15,
    outcomes: [
      'LO1 Explore how a small business or social enterprise plans and allocates resources effectively',
      'LO2 Evaluate the customer relationship management process and the importance of building relationships for a small business or social enterprise',
      'LO3 Develop a cash flow forecast and break-even analysis to demonstrate understanding of finance for a small business or social enterprise',
      'LO4 Discuss financial statements, regulation and legislation that apply to a small business or social enterprise',
    ],
  },
  {
    key: 'l5u32',
    title: 'Unit 32. Strategic Human Resource Management',
    code: 'Y/618/5119', level: 5, credits: 15,
    outcomes: [
      'LO1 Assess how HR strategy and practices are influenced by developments in an organisation\'s external and contextual environment',
      'LO2 Appraise the theoretical perspectives of strategic human resource management and their associated practices in different types of organisations',
      'LO3 Evaluate how strategic HR initiatives can be used to develop high-performance organisational cultures',
      'LO4 Develop an integrated HR strategy for an organisation to support sustainable business performance and growth',
    ],
  },
  {
    key: 'l5u34',
    title: 'Unit 34. Digital Marketing',
    code: 'R/618/5121', level: 5, credits: 15,
    outcomes: [
      'LO1 Investigate the influence of the digital environment and landscape for effective marketing of business organisations',
      'LO2 Apply digital tools and techniques for an integrated marketing approach within a given business organisation',
      'LO3 Design a digital marketing campaign using multimedia to optimise content that targets key audiences',
      'LO4 Evaluate methods of monitoring and measuring a digital marketing campaign in line with marketing objectives to increase engagement and conversions',
    ],
  },
];

/* ─────────────────────────────────────────────
   Accordion
───────────────────────────────────────────── */
function UnitAccordion({ unit, isOpen, onToggle }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      setTimeout(() => { ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    }
  }, [isOpen]);

  return (
    <div className="al4-acc-item btec-acc-item" ref={ref}>
      <button className="al4-acc-header" onClick={onToggle}>
        <span className="al4-acc-title">{unit.title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="al4-acc-body">
          <div className="al4-meta-table-wrap">
          <table className="al4-meta-table">
            <tbody>
              <tr>
                <td className="al4-meta-label">Unit Level</td>
                <td className="al4-meta-value">{unit.level}</td>
                <td className="al4-meta-label">Unit Code</td>
                <td className="al4-meta-value">{unit.code}</td>
              </tr>
              <tr>
                <td className="al4-meta-label">Credit Value</td>
                <td className="al4-meta-value" colSpan={3}>{unit.credits}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <p style={{ fontWeight: 700, color: 'var(--tec-green-dark)', fontSize: '0.88rem', margin: '12px 0 8px' }}>
            By the end of this unit students will be able to:
          </p>
          <ul className="btec-lo-list">
            {unit.outcomes.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stateful accordion groups
───────────────────────────────────────────── */
function AccordionGroup({ units }) {
  const [openKey, setOpenKey] = useState(null);
  return (
    <div className="al4-accordion">
      {units.map((u) => (
        <UnitAccordion
          key={u.key}
          unit={u}
          isOpen={openKey === u.key}
          onToggle={() => setOpenKey(openKey === u.key ? null : u.key)}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Facts
───────────────────────────────────────────── */
const facts = [
  { icon: <Clock size={22} />, label: '2 Years' },
  { icon: <Calendar size={22} />, label: 'Intake: January / September' },
  { icon: <Award size={22} />, label: 'Awarding Body: Pearson' },
  { icon: <TrendingUp size={22} />, label: 'Progression: Advanced entry to Year 2 or Year 3 of a related degree programme at many universities.' },
];

const tabs = ['Overview', 'Course Units', 'Course Fees'];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function BTECHNDPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="inner-page page-enter al4-page">

      <PageHero
        title="Pearson BTEC Level 4 &amp; 5 Higher National Diploma in Business"
        bgImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80"
        bgPosition="center 40%"
      />

      <div style={{ height: '24px', background: '#fff' }} />

      <div className="al4-tab-bar">
        {tabs.map(t => (
          <button key={t} className={`al4-tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="container al4-tab-content-wrap">

        {activeTab === 'Overview' && (
          <div className="al4-overview">
            <p><strong>Welcome to Trent Education Centre's Higher National Diploma (HND) in Business (Entrepreneurship and Small Business Management).</strong> This rewarding and challenging programme is designed to provide learners with a thorough grounding in the key concepts and practical skills essential to business.</p>
            <p>BTEC Higher Nationals offer a strong emphasis on practical skills alongside the development of the essential knowledge and understanding required in today&rsquo;s business environment. Learners benefit from this comprehensive academic and practical programme, which develops key skills and knowledge tailored to their individual progression needs — whether that be into employment, starting their own business, or continuing into higher education, including a top-up year for a university degree or other professional courses.</p>
            <p>A major progression route for learners of the BTEC Higher National Certificate (HNC) and Diploma (HND) is direct entry to the second or third year of an honours degree programme, depending on how well the BTEC units align with the prerequisites of the chosen degree.</p>
            <p className="al4-subhead">Programme Structure:</p>
            <ul className="al4-bullets">
              <li>120 credits at Level 4 — 6 core units and 2 optional units (8 units, each worth 15 credits)</li>
              <li>120 credits at Level 5 — 5 core units (4 units at 15 credits and 1 unit at 30 credits) and 2 optional units at 15 credits</li>
              <li><strong>Total Qualification Time:</strong> 2,400 hours</li>
              <li><strong>Guided Learning Hours:</strong> 960 hours</li>
              <li><strong>Independent Study Hours:</strong> 1,440 hours</li>
            </ul>
            <p><strong>Qualification Code:</strong> 603/6838/X<br />
            <strong>Awarding Body:</strong> Pearson BTEC Level 5 HND Diploma in Business (Entrepreneurship and Small Business Management) (RQF)<br />
            <strong>Course mode:</strong> Blended learning — one session per week online, one session in-person</p>
            <p className="al4-subhead">Progression Routes:</p>
            <p>Many universities allow advanced entry to the second or third year of the course. The Level 5 Higher National Diploma is recognised by Higher Education providers as meeting admission requirements to many relevant business-related courses, for example:</p>
            <ul className="al4-bullets">
              <li>BA (Hons) Business Management</li>
              <li>BA International Business</li>
              <li>BA Business Administration</li>
              <li>BA (Hons) Business Entrepreneurship and Innovation</li>
              <li>BA (Hons) Global Business Management</li>
              <li>BA (Hons) Accounting and Finance</li>
            </ul>
          </div>
        )}

        {activeTab === 'Course Units' && (
          <div className="al4-units-list">
            <p className="al4-subhead" style={{ marginBottom: 8 }}>Level 4 Units:</p>
            <ul className="al4-bullets" style={{ marginBottom: 24 }}>
              <li>Unit 1: The Contemporary Business Environment (15 Credits)</li>
              <li>Unit 2: Marketing Processes and Planning (15 Credits)</li>
              <li>Unit 3: Human Resource Management (15 Credits)</li>
              <li>Unit 4: Leadership and Management (15 Credits)</li>
              <li>Unit 5: Accounting Principles (15 Credits)</li>
              <li>Unit 6: Managing a Successful Business Project (15 Credits)</li>
              <li>Unit 8: Innovation and Commercialisation (15 Credits)</li>
              <li>Unit 9: Entrepreneurial Venture (15 Credits)</li>
            </ul>
            <p className="al4-subhead" style={{ marginBottom: 8 }}>Level 5 Units:</p>
            <ul className="al4-bullets">
              <li>Unit 19: Research Project (Pearson Set) (30 Credits)</li>
              <li>Unit 20: Organisational Behaviour Management (15 Credits)</li>
              <li>Unit 27: Identifying Entrepreneurial Opportunities (15 Credits)</li>
              <li>Unit 28: Launching a New Venture (15 Credits)</li>
              <li>Unit 29: Managing and Running a Small Business (15 Credits)</li>
              <li>Unit 32: Strategic Human Resource Management (15 Credits)</li>
              <li>Unit 34: Digital Marketing (15 Credits)</li>
            </ul>
          </div>
        )}

        {activeTab === 'Course Fees' && (
          <div className="al4-fees">
            <p>Tuition fee for Home (UK) students per year*: <strong>&pound;4,000</strong></p>
            <p>
              Before enrolling, please read the{' '}
              <a href="/assets/documents/terms/terms-conditions-he.pdf" target="_blank" rel="noreferrer">Terms and Conditions (Higher Education)</a>
              {' '}and{' '}
              <a href="/assets/documents/terms/tuition-fees-he.pdf" target="_blank" rel="noreferrer">Tuition Fees, Refunds and Compensation Policy (Higher Education)</a>.
            </p>
          </div>
        )}

      </div>

      {/* Facts + Unit Details */}
      <div className="al4-facts-units-wrap">
        <div className="container btec-facts-inner">
          {/* Facts column */}
          <div className="al4-facts-col">
            {facts.map((f, i) => (
              <div key={i} className="al4-fact-item">
                <span className="al4-fact-icon">{f.icon}</span>
                <span className="al4-fact-label">{f.label}</span>
              </div>
            ))}
          </div>

          {/* Level 4 units */}
          <div className="al4-units-col">
            <h3 className="al4-units-heading">Level 4 Unit Details:</h3>
            <AccordionGroup units={level4Units} />
          </div>

          {/* Level 5 units */}
          <div className="al4-units-col">
            <h3 className="al4-units-heading">Level 5 Unit Details:</h3>
            <AccordionGroup units={level5Units} />
          </div>
        </div>
      </div>

      {/* Entry Requirement */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Entry Requirement</h2>
        <p>For Learners who have recently been in education, the entry profile is likely to include one of the following:</p>
        <ul className="al4-bullets" style={{ marginTop: 8 }}>
          <li>A BTEC Level 3 qualification in Business</li>
          <li>A GCE Advanced Level profile demonstrating strong performance in a relevant subject or adequate performance across multiple GCE subjects</li>
          <li>Other related Level 3 qualifications</li>
          <li>At least one GCE A Level pass in a relevant subject, supported by appropriate GCSE passes</li>
          <li>An Access to Higher Education Certificate awarded by an approved Further Education institution</li>
          <li>Appropriate work experience</li>
          <li>Learners aged 18 or over applying for HND courses</li>
          <li>An international equivalent of the above qualifications</li>
        </ul>
        <p style={{ marginTop: 16 }}>Trent Education Centre (TEC) will consider applicants&rsquo; prior learning when assessing their suitability for BTEC Higher Nationals, through Recognition of Prior Learning (RPL).</p>
      </div>

      {/* English Language */}
      <div className="container al4-section">
        <h2 className="al4-section-title">English Language Requirements</h2>
        <p>For those whom English is not their first language, we recommend the following standards of proficiency in English language skills or an approved equivalent for this qualification:</p>
        <ul className="al4-bullets" style={{ marginTop: 12 }}>
          <li>IELTs 5.5 (Reading and Writing each at 5.5)</li>
          <li>Common European Framework of Reference (CEFR) B2</li>
          <li>Pearson Test of English (PTE) Academic score of 51</li>
        </ul>
      </div>

      {/* Assessment Method */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Assessment Method</h2>
        <p>Assessment is conducted through internally set assignments, projects, practical tasks, and presentations designed to meet the learning outcomes specified by Pearson. All assessments are internally verified and subject to Pearson&rsquo;s external quality assurance procedures. There are no formal examinations.</p>
      </div>

      {/* Why TEC */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Why TEC?</h2>
        <p style={{ marginBottom: 16 }}>Trent Education Centre (TEC) has a strong reputation and extensive experience in delivering quality education, particularly in areas that align with the practical and vocational focus of the HND. TEC provides essential resources, including experienced faculty, modern facilities, and an up-to-date curriculum designed to effectively support HND programmes.</p>
        <p style={{ marginBottom: 16 }}>As a career-oriented provider, TEC&rsquo;s connections with local businesses and industries offer valuable networking, internship, and job opportunities for Learners. Its convenient location makes TEC an accessible choice for learners pursuing higher education locally or internationally.</p>
        <p>TEC is also partnered with recognised accreditation bodies and universities, which strengthens the credibility of its HND programmes and ensures they meet established academic and industry standards.</p>
      </div>

      {/* How to Apply */}
      <div className="al4-apply-wrap">
        <div className="container">
          <h2 className="al4-section-title" style={{ textAlign: 'center' }}>How to Apply</h2>
          <div className="al4-apply-grid">
            <div className="al4-apply-step">
              <span className="al4-apply-icon"><FileText size={26} /></span>
              <h3>Apply Online</h3>
              <p>Complete the online Student Application Form to share your details, course choice, and supporting documents. It takes around 20 minutes.</p>
            </div>
            <div className="al4-apply-step">
              <span className="al4-apply-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <h3>We Review</h3>
              <p>After you submit your application, an admissions representative will contact you and will help you to complete the process.</p>
            </div>
            <div className="al4-apply-step">
              <span className="al4-apply-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <h3>Offer &amp; Start</h3>
              <p>We will let you know if your application is successful. If it is, you will be able to enrol on the course and begin studying.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/application-form" className="btn-gold" style={{ display: 'inline-block', padding: '14px 40px', fontSize: '1rem' }}>Start Your Application</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
