import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Award, TrendingUp, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import '../../InnerPage.css';
import '../../CoursePage.css';
import './ATHELevel4Page.css';
import PageHero from '../../../components/PageHero';

/* ─────────────────────────────────────────────
   Indicative Content helpers
───────────────────────────────────────────── */
function IC({ heading, children }) {
  return <div className="al4-ic-section"><p className="al4-ic-heading">{heading}</p>{children}</div>;
}
function Sub({ label }) { return <p className="al4-ic-sub">{label}</p>; }
function Bullets({ items }) {
  return <ul className="al4-ic-list">{items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
}

/* ── Unit 1 Indicative Content ── */
function Unit1Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>

      <IC heading="1. Understand global business operations — Key differences:">
        <Bullets items={[
          'Legal status/ownership – e.g. sole trader, partnership, company, corporation (e.g. limited and unlimited, public limited and international equivalents)',
          'Structure and size',
          'What they offer (Products and/or services)',
          'Image',
        ]} />
        <Sub label="Different sectors/industries e.g." />
        <Bullets items={[
          'Private – e.g. manufacturing, service e.g. hospitality, finance',
          'Public – e.g. healthcare, education',
          "Not for profit' – e.g. supporting others, conservation and heritage organisations, campaign groups",
        ]} />
        <Sub label="Global context:" />
        <Bullets items={['International', 'National', 'Local']} />
        <Sub label="Organisational responsibilities:" />
        <Bullets items={['To shareholders', 'To employees', 'To other stakeholders', 'To customers', 'To the environment', 'Ethical issues']} />
        <Sub label="Organisational strategies:" />
        <Bullets items={[
          'Human resources policy', 'Environmental strategy', 'Equal opportunities policy', 'Ethics policy',
          'Financial plan', 'International partnering policy', 'Electronic modes of marketing and communication',
          'Reliable import and export processes',
        ]} />
      </IC>

      <IC heading="2. Understand the impact of external factors on global business organisations — Benefits and Challenges">
        <Sub label="Technological factors" />
        <Bullets items={['Technological factors', 'Transport revolution', 'Information and communications']} />
        <Sub label="Economic factors" />
        <Bullets items={[
          'Increasing incomes', 'Global trade', 'World financial markets', 'Market forces',
          'Global competition and competition rules', 'Country specific differences – costs, logistics',
        ]} />
        <Sub label="Social Factors" />
        <Bullets items={['Consumerism', 'Convergence in customer tastes', 'Education and skills', 'Environmental conservation']} />
        <Sub label="Political factors" />
        <Bullets items={[
          'Reduced trade barriers', 'Intellectual Property Rights', 'Privatisation',
          'Technical standards, regulations, legislations', 'Global strategies',
        ]} />
        <Sub label="Government policies" />
        <Bullets items={[
          'Monetary policies, interest rates, quantitative easing, unemployment',
          'Fiscal policies, spending (in central and local government), public sector borrowing, controlling demand, taxation, distribution of income',
          'Competition Policy',
          'Sector regulation e.g. in UK OfGem, OfQual, OfGas, CAA, OfCom – equivalents in other countries and globally where applicable',
          'Regional policies',
          'Skills agenda, apprenticeships',
        ]} />
      </IC>

      <IC heading="3. Understand the impact of globalisation on the internal operations of business organisations — Global integration:">
        <Bullets items={[
          'Trading blocs',
          'World Bank, IMF, Global/trading bloc policies and directives (e.g. EU), G20, OPEC and other relevant organisations',
          'Market size',
          'Transnational corporations',
        ]} />
        <Sub label="International trade:" />
        <Bullets items={[
          'Opportunities e.g. emerging markets', 'Growth', 'Protectionism',
          'Trading blocs, partnerships and agreements and their regulation/restrictions (e.g. EU)',
          'Trade duties and tariffs',
          'Increased competition; outsourcing to other countries; increased customer choice',
        ]} />
        <Sub label="Operational management:" />
        <Bullets items={['Structure appropriate to effectively manage operations across numerous locations; agreed systems, protocols']} />
        <Sub label="Impact of technology:" />
        <Bullets items={[
          'ICT technologies',
          'Remote workforce – advantages of being able to locate workforce in other countries where labour may be cheaper/may have more relevant skills etc.',
          'The role of the internet in trade',
          'Easy communication e.g. Skype, email, social networking',
        ]} />
        <Sub label="Different approaches to leadership and decision making in global organisations:" />
        <Bullets items={[
          'Potential for different decisions depending on the culture and value of different locations',
          'Leadership; appropriate range of skills, experience in different locations, expat managers and staff; issues with language and communication',
        ]} />
      </IC>

      <IC heading="4. Understand current issues impacting on global business activities in a specified country — A review of:">
        <Bullets items={[
          'Domestic market in chosen country', 'Global market', 'Domestic and global policies',
          'Other global factors', 'Government policies', 'Trade blocs',
        ]} />
        <Sub label="Strategies" />
        <Bullets items={[
          'New markets', 'New environments e.g. move business', 'New technologies', 'Growth/shrink',
          'Change of suppliers, importers, exporters',
          'Change in business structure e.g. from sole trader to company/corporation',
        ]} />
        <Sub label="Issues affecting business activities in a specified country could include:" />
        <Bullets items={['Internal issues', 'Cultural issues', 'Ethical issues', 'Problems with suppliers', 'Limited resources']} />
      </IC>
    </div>
  );
}

/* ── Unit 2 Indicative Content ── */
function Unit2Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>

      <IC heading="1. Factors that impact on individuals and teams in organisations">
        <Sub label="Organisational structure:" />
        <Bullets items={[
          'Types of organisational structure – hierarchical, flat, matrix, network',
          'Impact of structure on communication, decision-making and individual roles',
          'Formal and informal structures',
          'Span of control and chain of command',
        ]} />
        <Sub label="Organisational culture:" />
        <Bullets items={[
          "Handy's model of organisational culture – power, role, task, person",
          'Impact of culture on individual motivation and team cohesion',
          'Cultural change and its effects on people',
        ]} />
        <Sub label="Other factors:" />
        <Bullets items={[
          'Leadership style – autocratic, democratic, laissez-faire, transformational',
          'Psychological contract',
          'Job design and enrichment',
          'Physical environment and working conditions',
        ]} />
      </IC>

      <IC heading="2. Managing performance of individuals and teams">
        <Sub label="Approaches to managing performance:" />
        <Bullets items={[
          'Performance appraisal systems – 360 degree feedback, self-assessment',
          'Setting SMART objectives and targets',
          'Performance improvement plans',
          'Managing underperformance and disciplinary procedures',
        ]} />
        <Sub label="Creating effective teams:" />
        <Bullets items={[
          "Belbin's team roles",
          "Stages of team development – Tuckman's model (forming, storming, norming, performing)",
          'Characteristics of effective teams – clear goals, trust, communication, accountability',
          'Virtual and remote team management',
        ]} />
        <Sub label="External factors affecting performance management:" />
        <Bullets items={[
          'Economic conditions and their impact on workforce management',
          'Technological changes affecting roles and performance expectations',
          'Legislative requirements – employment law, equality legislation',
        ]} />
      </IC>

      <IC heading="3. Motivating individuals and teams">
        <Sub label="Training and development approaches:" />
        <Bullets items={[
          'On-the-job training – coaching, mentoring, job rotation, secondments',
          'Off-the-job training – workshops, conferences, e-learning',
          'Personal Development Plans (PDPs)',
          'Continuous Professional Development (CPD)',
        ]} />
        <Sub label="Incentives and rewards:" />
        <Bullets items={[
          'Financial rewards – pay increases, bonuses, profit sharing',
          'Non-financial rewards – recognition, promotion, flexible working',
          'Total reward packages',
          'Impact of reward systems on motivation and retention',
        ]} />
        <Sub label="Motivational theories:" />
        <Bullets items={[
          "Maslow's Hierarchy of Needs",
          "Herzberg's Two-Factor Theory",
          "McGregor's Theory X and Theory Y",
          "Vroom's Expectancy Theory",
          'Application of motivational theories to management practice',
        ]} />
      </IC>

      <IC heading="4. People management strategies">
        <Sub label="People management strategies:" />
        <Bullets items={[
          'Hard HRM – treating people as a resource to be used efficiently',
          'Soft HRM – treating people as valued assets to be developed',
          'Talent management and succession planning',
          'Diversity and inclusion strategies',
          'Employee engagement and well-being programmes',
        ]} />
        <Sub label="Impact on organisational performance:" />
        <Bullets items={[
          'Link between people management and organisational productivity',
          'Employee retention and turnover rates',
          'Organisational culture and its relationship to people management strategy',
          'Measuring the effectiveness of people management strategies',
        ]} />
      </IC>
    </div>
  );
}

/* ── Unit 3 Indicative Content ── */
function Unit3Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>

      <IC heading="1. Financial statements and their interpretation">
        <Sub label="Types of financial statements:" />
        <Bullets items={[
          'Income statement (Profit and Loss account) – revenue, costs, gross profit, net profit',
          'Statement of financial position (Balance Sheet) – assets, liabilities, equity',
          'Cash flow statement – operating, investing and financing activities',
          'Notes to the accounts and their importance',
        ]} />
        <Sub label="Ratio analysis:" />
        <Bullets items={[
          'Profitability ratios – gross profit margin, net profit margin, return on capital employed (ROCE)',
          'Liquidity ratios – current ratio, acid test ratio',
          'Efficiency ratios – asset turnover, inventory turnover, receivables days',
          'Gearing ratios – debt-to-equity ratio',
          'Limitations of ratio analysis',
        ]} />
        <Sub label="Usefulness of financial statements for management:" />
        <Bullets items={[
          'Decision-making and planning',
          'Monitoring and controlling business performance',
          'Comparing with industry benchmarks and competitors',
          'Meeting stakeholder information needs',
        ]} />
      </IC>

      <IC heading="2. Financial management tools and techniques">
        <Sub label="Costing methods:" />
        <Bullets items={[
          'Absorption costing – full cost, fixed and variable overheads',
          'Marginal costing – contribution, break-even analysis',
          'Activity-based costing (ABC)',
          'Standard costing and variance analysis',
        ]} />
        <Sub label="Investment appraisal techniques:" />
        <Bullets items={[
          'Payback period',
          'Net Present Value (NPV)',
          'Internal Rate of Return (IRR)',
          'Accounting Rate of Return (ARR)',
          'Risk and uncertainty in investment decisions',
        ]} />
        <Sub label="Financial strategies:" />
        <Bullets items={[
          'Sources of finance – internal and external, short-term and long-term',
          'Working capital management',
          'Capital structure decisions',
          'Financial risk management',
        ]} />
      </IC>

      <IC heading="3. Budgetary management">
        <Sub label="Purpose of budgets:" />
        <Bullets items={[
          'Planning and coordination',
          'Control and monitoring',
          'Motivation and communication',
          'Performance measurement',
        ]} />
        <Sub label="Types of budgets:" />
        <Bullets items={[
          'Sales, production, labour, overhead and cash budgets',
          'Master budget and its components',
          'Fixed, flexible and zero-based budgeting',
          'Rolling budgets',
        ]} />
        <Sub label="Budget setting and variance analysis:" />
        <Bullets items={[
          'Top-down versus bottom-up budgeting approaches',
          'Calculating and interpreting variances – favourable and adverse',
          'Sales price and volume variances',
          'Labour and material variances',
          'Responding to significant variances',
          'Limitations of traditional budgeting',
        ]} />
      </IC>
    </div>
  );
}

/* ── Unit 4 Indicative Content ── */
function Unit4Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>

      <IC heading="1. Research methods for business">
        <Sub label="Types of research:" />
        <Bullets items={[
          'Primary research – surveys, interviews, focus groups, observation, experiments',
          'Secondary research – academic journals, government publications, company reports, online databases',
          'Quantitative research – numerical data, statistical analysis, generalisation',
          'Qualitative research – non-numerical data, themes, depth of understanding',
          'Mixed-methods approaches',
        ]} />
        <Sub label="Research design:" />
        <Bullets items={[
          'Research philosophies – positivism, interpretivism, pragmatism',
          'Research approaches – deductive and inductive',
          'Research strategies – case study, survey, experiment, ethnography',
          'Sampling methods – probability and non-probability sampling',
          'Research instruments – questionnaires, interview schedules, observation frameworks',
        ]} />
        <Sub label="Ethical considerations:" />
        <Bullets items={[
          'Informed consent and confidentiality',
          'Data protection and GDPR requirements',
          'Avoiding harm and maintaining integrity',
          'Plagiarism and academic honesty',
          'Reliability and validity of research findings',
        ]} />
      </IC>

      <IC heading="2. Conducting business research">
        <Sub label="Data collection:" />
        <Bullets items={[
          'Designing and piloting research instruments',
          'Conducting interviews and focus groups',
          'Administering surveys – online, paper-based, telephone',
          'Collecting and organising secondary data',
        ]} />
        <Sub label="Data analysis:" />
        <Bullets items={[
          'Statistical analysis – descriptive statistics, correlation, regression',
          'Qualitative analysis – thematic analysis, content analysis, coding',
          'Using software for data analysis – Excel, SPSS, NVivo',
          'Assessing reliability and validity of data',
          'Triangulation of findings',
        ]} />
      </IC>

      <IC heading="3. Communicating research findings">
        <Sub label="Research reports:" />
        <Bullets items={[
          'Structure of a research report – introduction, methodology, findings, discussion, conclusions, recommendations',
          'Academic writing style – referencing, citations, bibliographies',
          'Presenting data – tables, graphs, charts',
          'Executive summaries for business audiences',
        ]} />
        <Sub label="Presentations:" />
        <Bullets items={[
          'Oral presentations of research findings',
          'Use of visual aids – PowerPoint, infographics',
          'Responding to questions and critical scrutiny',
        ]} />
      </IC>

      <IC heading="4. Research and business knowledge">
        <Sub label="Contribution of research to business:" />
        <Bullets items={[
          'Evidence-based management and decision-making',
          'Innovation and new product/service development',
          'Market intelligence and competitive advantage',
          'Policy development and organisational change',
        ]} />
        <Sub label="Impact of research on practice:" />
        <Bullets items={[
          'Implementation of research recommendations',
          'Monitoring the outcomes of research-informed decisions',
          'Evaluating the return on investment from business research',
          'Continuous improvement and knowledge management',
        ]} />
      </IC>
    </div>
  );
}

/* ── Unit 5 Indicative Content ── */
function Unit5Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>

      <IC heading="1. Communication theories and models">
        <Sub label="Communication theories:" />
        <Bullets items={[
          'Shannon and Weaver model of communication',
          'Berlo\'s SMCR model – sender, message, channel, receiver',
          'Transactional model of communication',
          'Schramm\'s model and the concept of shared fields of experience',
        ]} />
        <Sub label="Barriers to communication:" />
        <Bullets items={[
          'Physical barriers – noise, distance, technology failure',
          'Psychological barriers – perception, attitude, emotions',
          'Language and semantic barriers',
          'Cultural barriers in international business contexts',
          'Organisational barriers – structure, hierarchy, information overload',
        ]} />
      </IC>

      <IC heading="2. Communication strategies">
        <Sub label="Types of communication:" />
        <Bullets items={[
          'Verbal communication – formal and informal meetings, presentations, interviews',
          'Written communication – reports, emails, memos, business letters',
          'Non-verbal communication – body language, gestures, visual aids',
          'Visual communication – infographics, charts, diagrams',
        ]} />
        <Sub label="Communication strategies for different audiences:" />
        <Bullets items={[
          'Stakeholder communication – tailoring messages for different stakeholders',
          'Internal communication – upward, downward and lateral communication',
          'External communication – customers, suppliers, media, regulators',
          'Crisis communication strategies',
          'Intercultural communication considerations',
        ]} />
        <Sub label="Evaluating communication effectiveness:" />
        <Bullets items={[
          'Feedback mechanisms',
          'Communication audits',
          'Measuring impact of communication strategies on organisational outcomes',
        ]} />
      </IC>

      <IC heading="3. Digital communication in business">
        <Sub label="Role of digital communication:" />
        <Bullets items={[
          'Email, instant messaging and collaborative platforms (e.g. Slack, Teams)',
          'Social media for business – LinkedIn, Twitter, Facebook, Instagram',
          'Video conferencing – Zoom, Teams, WebEx',
          'Intranets and internal communication portals',
          'Content management systems and websites',
        ]} />
        <Sub label="Benefits and challenges:" />
        <Bullets items={[
          'Benefits – speed, reach, cost-effectiveness, accessibility',
          'Challenges – information overload, security risks, digital exclusion',
          'Managing digital reputation and brand communication',
          'GDPR and data protection in digital communication',
        ]} />
      </IC>

      <IC heading="4. Managing communication in organisations">
        <Sub label="The manager's role in communication:" />
        <Bullets items={[
          'Setting communication norms and standards',
          'Facilitating open and transparent communication cultures',
          'Active listening skills and empathetic communication',
          'Managing conflict through effective communication',
        ]} />
        <Sub label="Approaches to managing communication:" />
        <Bullets items={[
          'Communication planning – objectives, audiences, channels, messages, timelines',
          'Change communication – communicating organisational change effectively',
          'Remote and hybrid team communication management',
          'Evaluating and improving communication systems',
        ]} />
      </IC>
    </div>
  );
}

/* ── Unit 6 Indicative Content ── */
function Unit6Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>

      <IC heading="1. Sustainability in business organisations">
        <Sub label="Concept of sustainability:" />
        <Bullets items={[
          'Definitions and dimensions of sustainability – environmental, social, economic (Triple Bottom Line)',
          'Sustainable development – Brundtland Commission definition',
          'UN Sustainable Development Goals (SDGs) and their relevance to business',
          'Corporate sustainability versus corporate social responsibility (CSR)',
        ]} />
        <Sub label="Impact of business activities on sustainability:" />
        <Bullets items={[
          'Environmental impacts – carbon emissions, waste, water usage, biodiversity',
          'Social impacts – labour practices, community relations, human rights',
          'Economic impacts – supply chain practices, tax responsibility, financial sustainability',
          'The business case for sustainability – risk management, reputation, competitive advantage',
        ]} />
      </IC>

      <IC heading="2. External environment for sustainability">
        <Sub label="Legislative and regulatory framework:" />
        <Bullets items={[
          'UK and international environmental legislation',
          'Carbon reporting requirements and targets (e.g. Net Zero commitments)',
          'Modern Slavery Act and supply chain responsibilities',
          'ISO 14001 – Environmental Management Systems',
          'ESG (Environmental, Social and Governance) reporting requirements',
        ]} />
        <Sub label="External drivers:" />
        <Bullets items={[
          'Consumer demand for sustainable products and services',
          'Investor pressure and ESG criteria',
          'NGO and activist group influence',
          'Media scrutiny and reputational risk',
          'International agreements – Paris Climate Agreement',
        ]} />
      </IC>

      <IC heading="3. Approaches to managing sustainability">
        <Sub label="Sustainability management approaches:" />
        <Bullets items={[
          'Life cycle assessment (LCA) of products and services',
          'Circular economy principles – reduce, reuse, recycle',
          'Green supply chain management',
          'Carbon footprint reduction strategies',
          'Sustainable procurement policies',
        ]} />
        <Sub label="Tools for measuring sustainability performance:" />
        <Bullets items={[
          'Global Reporting Initiative (GRI) framework',
          'Balanced Scorecard adapted for sustainability',
          'Key Performance Indicators (KPIs) for sustainability',
          'Environmental Management Information Systems (EMIS)',
          'Benchmarking against industry standards',
        ]} />
      </IC>

      <IC heading="4. Developing a sustainability plan">
        <Sub label="Components of a sustainability plan:" />
        <Bullets items={[
          'Sustainability vision, mission and objectives',
          'Materiality assessment – identifying key sustainability issues',
          'Stakeholder engagement in sustainability planning',
          'Action plans with targets, timescales and responsibilities',
          'Monitoring, reporting and review mechanisms',
        ]} />
        <Sub label="Resource implications:" />
        <Bullets items={[
          'Financial investment required for sustainability initiatives',
          'Human resource requirements – training, new roles',
          'Technology and infrastructure needs',
          'Partnerships and collaborations for sustainability',
          'Feasibility assessment – costs versus benefits',
        ]} />
      </IC>
    </div>
  );
}

/* ── Unit 7 Indicative Content ── */
function Unit7Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>

      <IC heading="1. Ethical theories and their application to business">
        <Sub label="Ethical theories:" />
        <Bullets items={[
          'Utilitarianism – greatest good for the greatest number; cost-benefit analysis in business',
          'Deontological ethics – Kant\'s categorical imperative; rules-based approach',
          'Virtue ethics – character and integrity in business leadership',
          'Contractarianism – Rawls\' theory of justice; fairness in business',
          'Stakeholder theory – balancing the interests of all stakeholders',
        ]} />
        <Sub label="Applying ethical theories to business situations:" />
        <Bullets items={[
          'Ethical decision-making frameworks',
          'Resolving conflicts between stakeholder interests',
          'Whistleblowing and reporting unethical behaviour',
          'Ethical leadership and its influence on organisational culture',
          'Case studies of ethical and unethical business practice',
        ]} />
      </IC>

      <IC heading="2. Corporate social responsibility (CSR)">
        <Sub label="Concept and principles of CSR:" />
        <Bullets items={[
          'Carroll\'s Pyramid of CSR – economic, legal, ethical, philanthropic responsibilities',
          'Voluntary versus mandatory CSR',
          'CSR reporting and transparency',
          'Shared value – creating economic value while creating value for society',
        ]} />
        <Sub label="Impact of CSR on business and stakeholders:" />
        <Bullets items={[
          'Impact on brand reputation and customer loyalty',
          'Employee engagement and talent attraction',
          'Investor relations and ESG criteria',
          'Community and social impact programmes',
          'Evaluating CSR effectiveness – reporting and measurement',
        ]} />
      </IC>

      <IC heading="3. Ethical decision-making in business">
        <Sub label="Approaches to ethical decision-making:" />
        <Bullets items={[
          'Ethical decision-making models – Rest\'s model, the PLUS model',
          'Stakeholder analysis in ethical decisions',
          'The role of organisational values and codes of conduct',
          'Ethical audit and review processes',
        ]} />
        <Sub label="Factors influencing ethical decisions:" />
        <Bullets items={[
          'Personal values and moral development',
          'Organisational culture and peer pressure',
          'Competitive pressures and financial incentives',
          'Legal requirements and regulatory environment',
          'Cultural differences in ethics across international contexts',
        ]} />
      </IC>

      <IC heading="4. Role of governance in promoting ethical behaviour">
        <Sub label="Corporate governance frameworks:" />
        <Bullets items={[
          'UK Corporate Governance Code',
          'Board structure and composition – executive and non-executive directors',
          'Audit committees and their role in ethical oversight',
          'Remuneration committees and executive pay',
          'Shareholder rights and accountability',
        ]} />
        <Sub label="Impact of governance on ethical conduct:" />
        <Bullets items={[
          'Governance structures and their influence on organisational behaviour',
          'Anti-bribery and corruption policies (Bribery Act 2010)',
          'Data protection and ethical use of information (GDPR)',
          'Supply chain ethics and due diligence',
          'Evaluating the effectiveness of governance in preventing unethical practice',
        ]} />
      </IC>
    </div>
  );
}

/* ── Unit 8 Indicative Content ── */
function Unit8Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>

      <IC heading="1. Understand how to determine the market potential of a new business venture">
        <Sub label="Market conditions" />
        <Bullets items={[
          'PEST (Political, Economic, Social/Ethical, Technical) PESTLE political Economic, Social, Technological, Legal and Environmental',
          'Competitor analysis e.g. characteristics and strategies of the competition',
          'Estimating market size',
        ]} />
        <Sub label="Market need" />
        <Bullets items={[
          'Gap analysis',
          'Market conditions',
          'Specifying a product to meet market need e.g. details, dimensions, purpose, longevity, target market, international or national market, pricing, distribution, and marketing',
          'New products or services',
          'Emerging trends e.g. due to aging population, because of new technology',
          'Changing requirements',
        ]} />
        <Sub label="Target markets" />
        <Bullets items={[
          'Socioeconomic', 'Age', 'Gender', 'Occupation',
          'Sources of finance', 'Special factors', 'Personality indicators', 'Geographical',
        ]} />
        <Sub label="Potential benefits, limitations and risks for the proposed new business venture" />
        <Bullets items={[
          'Potential benefits – ownership, control',
          'Potential limitations – growth, image, operations, finance',
          'Potential risks – unlimited liability, loss of control e.g. to shareholders, closure, bankruptcy/insolvency',
        ]} />
      </IC>

      <IC heading="2. Understand the legal considerations of new business ventures">
        <Sub label="Legal and regulatory considerations" />
        <Bullets items={[
          'Legal entity of business, eg sole trader, partnership, LLP',
          'Health and safety',
          'Environmental',
          'Employment and redundancy',
          'Contracts',
          'Insurance',
          'Data protection',
          'Equality and diversity',
        ]} />
      </IC>

      <IC heading="3. Develop a business plan">
        <Sub label="Vision and mission" />
        <Bullets items={[
          'Market conditions',
          'Target market',
          'Opportunities due to a gap in the market',
        ]} />
        <Sub label="Skills/experience" />
        <Bullets items={[
          'Project management', 'Business planning', 'Marketing', 'Accountancy/book-keeping',
          'Leadership', 'Communication skills both oral and written', 'Delegation',
          'Organisation', 'Sales', 'Customer relations', 'People management',
        ]} />
        <Sub label="Other resources" />
        <Bullets items={[
          'Human (fully committed and capable personnel)',
          'Financial (financially secure, access to funding)',
          'Physical (suitable premises, equipment)',
          'Mentoring (support, guidance) and training',
          'Information (in-depth knowledge of industry, stakeholders etc.)',
        ]} />
        <Sub label="Financial requirements" />
        <Bullets items={[
          'Financial forecasts', 'Physical forecasts', 'Sales forecasts', 'Short and longer term',
        ]} />
        <Sub label="Business structures and systems" />
        <Bullets items={[
          'Organisational structure', 'Resource management systems',
          'Supply chain management', 'Technology requirements/systems',
        ]} />
        <Sub label="Strengths, weaknesses, opportunities and threats" />
        <Bullets items={[
          'SWOT analysis', 'Risk management', 'Use of contingency funds',
          'Insolvency and bankruptcy', 'New markets',
        ]} />
      </IC>

      <IC heading="4. Understand how to secure funding for a new business venture">
        <Sub label="Sources of finance" />
        <Bullets items={[
          'Savings', 'Flotation on stock market', 'Loans', 'Investors',
          'Share capital', 'Crowdfunding', 'Private equity',
        ]} />
        <Sub label="Benefits and risks associated with different sources of funding eg" />
        <Bullets items={[
          'Savings – Benefit: No interest to pay back; Risk: Could lose savings if business is not successful',
          'Loans – Benefit: A range of funding amounts and payback options. Retain equity in the business. Enables personal money to be used for operational purposes and savings are protected if business is not successful; Risk: Interest rates and payments must be paid back and on time whether the business succeeds or not',
          'Investors – Benefit: Extends financial risk over more than one person; Risk: Will give up some control of the business',
        ]} />
        <Sub label="Pitching for funding" />
        <Bullets items={[
          'Getting your facts correct, being on top of the detail',
          'Considering your investors\' needs',
          'Framing the pitch – \'telling a story\'',
          'Practice and developing confidence',
          'Following up – checking back in with potential investors',
          'Revising the pitch – what worked/what didn\'t?',
        ]} />
      </IC>
    </div>
  );
}

const INDICATIVE_MAP = {
  u1: Unit1Indicative,
  u2: Unit2Indicative,
  u3: Unit3Indicative,
  u4: Unit4Indicative,
  u5: Unit5Indicative,
  u6: Unit6Indicative,
  u7: Unit7Indicative,
  u8: Unit8Indicative,
};

/* ─────────────────────────────────────────────
   Unit data
───────────────────────────────────────────── */
const units = [
  /* ── Unit 1 ── */
  {
    key: 'u1',
    title: 'Unit 1: Business Organisations in a Global Context',
    code: 'K/650/6249', level: 5, glh: 60, credits: 15,
    gradingStructure: 'Pass-Merit-Distinction',
    hasAssessorGuidance: true,
    assessorGuidance: [
      'In order to achieve this unit, learners must produce work which demonstrates achievement of the learning outcomes at the standards provided by the assessment criteria. Learners must use real life examples to illustrate the points which are made. There is a requirement to utilise information from specific organisations to meet some of the stated standards. For LOs 2 and 4, learners will need to agree with tutors an appropriate country or countries on which to base their study. For LO4, they will also need to agree an appropriate organisation. Tutors need to ensure that the countries and organisations chosen are suitable.',
    ],
    aims: 'This unit develops learners understanding of the issues organisations face when operating in a global context. This understanding will allow learners to review the issues currently impacting on business organisations.',
    outcomes: [
      {
        lo: '1. Understand global business operations',
        pass: [
          '1.1 Analyse differences between global business organisations operating in different sectors and industries',
          '1.2 Assess the responsibilities of business organisations operating in a global environment',
          '1.3 Evaluate strategies employed by business organisations operating in a global environment',
        ],
        merit: [],
        distinction: [],
      },
      {
        lo: '2. Understand the impact of external factors on global business organisations',
        pass: [
          '2.1 Evaluate the benefits and challenges to global business operations from external factors',
          '2.2 Review the measures taken by governments to influence the activities of global business organisations',
        ],
        merit: ['2M1 Analyse how the economic performance of a specified country impacts on the activities of global business organisations'],
        distinction: ['2D1 Evaluate the current global environment for business organisations'],
      },
      {
        lo: '3. Understand the impact of globalisation on the internal operations of business organisations',
        pass: [
          '3.1 Assess the impact of globalisation on the operational management of business organisations',
          '3.2 Evaluate how technology has impacted on the global integration of business organisations',
          '3.3 Evaluate the different approaches to leadership and decision-making in global organisations',
        ],
        merit: [],
        distinction: [],
      },
      {
        lo: '4. Understand current issues impacting on global business activities in a specified country',
        pass: ['4.1 Explain current issues that impact on global business activities in a specified country'],
        merit: ['4M1 Analyse the strategies to address issues affecting global business activities in a specified country'],
        distinction: ['4D1 Evaluate the opportunities and challenges to a specific global business organisation operating in a specified country'],
      },
    ],
  },

  /* ── Unit 2 ── */
  {
    key: 'u2',
    title: 'Unit 2: People Management',
    code: 'R/650/6250', level: 5, glh: 60, credits: 15,
    gradingStructure: 'Pass-Merit-Distinction',
    hasAssessorGuidance: true,
    assessorGuidance: [
      'In order to achieve this unit, learners must produce work which demonstrates achievement of the learning outcomes at the standards provided by the assessment criteria. Learners must use real life examples to illustrate the points which are made. There is a requirement to utilise information from specific organisations to meet some of the stated standards. For LO4, learners will need to agree an appropriate organisation. Tutors need to ensure that the organisation chosen is suitable.',
    ],
    aims: 'This unit will enable learners to understand how to manage individuals and teams. Learners will study organisational factors and how they impact on and influence individual and team behaviour, and learn management tools and techniques to help them effectively manage individuals and teams.',
    outcomes: [
      {
        lo: '1. Understand factors that impact on individuals and teams in organisations',
        pass: [
          '1.1 Explain how organisational structure impacts on the performance of individuals and teams',
          '1.2 Analyse how organisational culture impacts on individual and team performance',
          '1.3 Analyse how other factors impact on the performance of individuals and teams',
        ],
        merit: [],
        distinction: [],
      },
      {
        lo: '2. Understand how to manage performance of individuals and teams',
        pass: [
          '2.1 Assess approaches to managing the performance of individuals',
          '2.2 Explain the steps needed to create effective teams',
        ],
        merit: ['2M1 Evaluate the impact of external factors on managing individual and team performance'],
        distinction: ['2D1 Analyse how managers can manage individuals and teams through a period of strategic change'],
      },
      {
        lo: '3. Understand approaches to motivating individuals and teams',
        pass: [
          '3.1 Analyse approaches to training and developing individuals and teams',
        ],
        merit: ['3M1 Assess the effect of incentives and rewards on individual and team performance'],
        distinction: ['3D1 Assess the contribution of motivational theories to managing individuals and teams'],
      },
      {
        lo: '4. Understand approaches to people management',
        pass: [
          '4.1 Describe people management strategies used by organisations',
          '4.2 Assess the impact of different people management strategies on organisational performance',
        ],
        merit: [],
        distinction: [],
      },
    ],
  },

  /* ── Unit 3 ── */
  {
    key: 'u3',
    title: 'Unit 3: Finance for Managers',
    code: 'T/650/6251', level: 5, glh: 60, credits: 15,
    gradingStructure: 'Pass-Merit-Distinction',
    hasAssessorGuidance: true,
    assessorGuidance: [
      'In order to achieve this unit, learners must produce work which demonstrates achievement of the learning outcomes at the standards provided by the assessment criteria. Learners must use real life examples and financial data from actual organisations to illustrate the points made. Learners are expected to demonstrate their ability to interpret and apply financial information to management decisions.',
    ],
    aims: 'This unit will enable learners to understand the financial information available to managers and the tools and techniques used in financial management. Learners will develop skills in interpreting financial statements and applying budgetary management techniques.',
    outcomes: [
      {
        lo: '1. Understand financial statements and their interpretation',
        pass: [
          '1.1 Explain the purpose of financial statements for business organisations',
          '1.2 Analyse the components of key financial statements',
          '1.3 Interpret financial information for management decision-making',
        ],
        merit: [],
        distinction: ['1D1 Evaluate the usefulness of financial statements for different categories of stakeholder'],
      },
      {
        lo: '2. Understand financial management tools and techniques',
        pass: [
          '2.1 Explain the tools and techniques used in financial management',
          '2.2 Apply financial management tools and techniques to business scenarios',
        ],
        merit: ['2M1 Analyse the effectiveness of financial management techniques used by a selected organisation'],
        distinction: ['2D1 Evaluate the financial management strategies of a selected organisation'],
      },
      {
        lo: '3. Understand budgetary management',
        pass: [
          '3.1 Explain the purpose and process of budgetary management',
          '3.2 Analyse approaches to setting and managing budgets in organisations',
          '3.3 Assess the impact of budgetary decisions on organisational performance',
        ],
        merit: ['3M1 Evaluate the effectiveness of budgetary management processes in a selected organisation'],
        distinction: [],
      },
    ],
  },

  /* ── Unit 4 ── */
  {
    key: 'u4',
    title: 'Unit 4: Research Project',
    code: 'Y/650/6252', level: 5, glh: 60, credits: 15,
    gradingStructure: 'Pass-Merit-Distinction',
    hasAssessorGuidance: true,
    assessorGuidance: [
      'In order to achieve this unit, learners must produce work which demonstrates achievement of the learning outcomes at the standards provided by the assessment criteria. Learners will need to select an appropriate business topic for their research project, agreed with their tutor. The research must use appropriate research methods and produce a written report presenting the findings and recommendations.',
    ],
    aims: 'This unit will enable learners to understand research methods and their application to business contexts. Learners will develop skills in designing and conducting business research, analysing data, and communicating findings effectively.',
    outcomes: [
      {
        lo: '1. Understand research methods for business',
        pass: [
          '1.1 Explain quantitative and qualitative research methods for business research',
          '1.2 Assess the suitability of different research methods for a business topic',
          '1.3 Develop a research proposal for a business topic',
        ],
        merit: ['1M1 Analyse the ethical considerations relevant to conducting business research'],
        distinction: ['1D1 Evaluate the validity and reliability of different research approaches for business research'],
      },
      {
        lo: '2. Be able to conduct business research',
        pass: [
          '2.1 Carry out research using appropriate methods for a business topic',
          '2.2 Analyse and interpret data collected during the research process',
        ],
        merit: ['2M1 Assess the reliability and validity of the research findings'],
        distinction: [],
      },
      {
        lo: '3. Be able to communicate research findings',
        pass: [
          '3.1 Present research findings in an appropriate format for a business audience',
          '3.2 Make justified recommendations based on research findings',
        ],
        merit: [],
        distinction: [],
      },
      {
        lo: '4. Understand how research contributes to business knowledge',
        pass: [
          '4.1 Explain how research contributes to business knowledge and informed decision-making',
        ],
        merit: [],
        distinction: ['4D1 Evaluate the impact of the research findings on business practice in the chosen area'],
      },
    ],
  },

  /* ── Unit 5 ── */
  {
    key: 'u5',
    title: 'Unit 5: Managing Communication',
    code: 'A/650/6253', level: 5, glh: 60, credits: 15,
    gradingStructure: 'Pass-Merit-Distinction',
    hasAssessorGuidance: true,
    assessorGuidance: [
      'In order to achieve this unit, learners must produce work which demonstrates achievement of the learning outcomes at the standards provided by the assessment criteria. Learners must use real life examples to illustrate the points which are made and apply theories and models to actual business situations. Learners are expected to critically evaluate communication strategies and their effectiveness.',
    ],
    aims: 'This unit will enable learners to understand theories and models of communication and how they can be applied to business. Learners will develop an understanding of communication strategies and their management, including digital communication in contemporary organisations.',
    outcomes: [
      {
        lo: '1. Understand communication theories and models in a business context',
        pass: [
          '1.1 Explain communication theories and models relevant to business organisations',
          '1.2 Analyse the barriers to effective communication in business organisations',
        ],
        merit: [],
        distinction: ['1D1 Evaluate the effectiveness of communication models for business organisations'],
      },
      {
        lo: '2. Understand communication strategies in organisations',
        pass: [
          '2.1 Explain communication strategies used in business organisations',
          '2.2 Assess the suitability of communication strategies for different audiences and purposes',
        ],
        merit: ['2M1 Analyse the effectiveness of communication strategies in a selected organisation'],
        distinction: ['2D1 Evaluate the impact of communication strategies on the performance of a selected organisation'],
      },
      {
        lo: '3. Understand the role of digital communication in business',
        pass: [
          '3.1 Explain the role of digital communication in business organisations',
        ],
        merit: ['3M1 Assess the benefits and challenges of digital communication for business organisations'],
        distinction: [],
      },
      {
        lo: '4. Understand the management of communication in organisations',
        pass: [
          '4.1 Explain the role of managers in facilitating effective communication',
          '4.2 Assess approaches to managing communication in organisations',
        ],
        merit: ['4M1 Evaluate the effectiveness of approaches to managing communication in a selected organisation'],
        distinction: [],
      },
    ],
  },

  /* ── Unit 6 ── */
  {
    key: 'u6',
    title: 'Unit 6: Manage Sustainability in an Organisation',
    code: 'F/650/6255', level: 5, glh: 60, credits: 15,
    gradingStructure: 'Pass-Merit-Distinction',
    hasAssessorGuidance: true,
    assessorGuidance: [
      'In order to achieve this unit, learners must produce work which demonstrates achievement of the learning outcomes at the standards provided by the assessment criteria. Learners must use real life examples to illustrate the points which are made. There is a requirement to utilise information from specific organisations to meet some of the stated standards. Learners will need to agree an appropriate organisation for their sustainability plan with their tutor.',
    ],
    aims: 'This unit will enable learners to understand sustainability in business organisations and the external environment that drives sustainable practice. Learners will develop knowledge of approaches to managing sustainability and the ability to create a sustainability plan for an organisation.',
    outcomes: [
      {
        lo: '1. Understand sustainability in business organisations',
        pass: [
          '1.1 Explain the concept of sustainability in a business context',
          '1.2 Analyse the impact of business activities on sustainability',
        ],
        merit: ['1M1 Assess the approaches taken by organisations to manage sustainability'],
        distinction: [],
      },
      {
        lo: '2. Understand the external environment for sustainability in business organisations',
        pass: [
          '2.1 Explain the legislative and regulatory framework for sustainability relevant to business organisations',
          '2.2 Analyse external drivers that influence sustainability in business organisations',
        ],
        merit: [],
        distinction: ['2D1 Evaluate the effectiveness of external drivers in promoting sustainable business practice'],
      },
      {
        lo: '3. Understand approaches to managing sustainability in organisations',
        pass: [
          '3.1 Explain approaches to managing sustainability in business organisations',
          '3.2 Analyse tools used to measure sustainability performance in organisations',
          '3.3 Assess the impact of sustainability management approaches on organisational performance',
        ],
        merit: [],
        distinction: [],
      },
      {
        lo: '4. Be able to develop a sustainability plan for an organisation',
        pass: [
          '4.1 Explain the components of an organisational sustainability plan',
          '4.2 Develop a sustainability plan for a selected organisation',
        ],
        merit: ['4M1 Analyse the resource implications of implementing the sustainability plan'],
        distinction: ['4D1 Evaluate the feasibility of the sustainability plan for the selected organisation'],
      },
    ],
  },

  /* ── Unit 7 ── */
  {
    key: 'u7',
    title: 'Unit 7: Business Ethics',
    code: 'D/650/6263', level: 5, glh: 60, credits: 15,
    gradingStructure: 'Pass-Merit-Distinction',
    hasAssessorGuidance: true,
    assessorGuidance: [
      'In order to achieve this unit, learners must produce work which demonstrates achievement of the learning outcomes at the standards provided by the assessment criteria. Learners must use real life examples to illustrate the points which are made. Learners are expected to engage critically with ethical theory and apply it to real business situations and case studies.',
    ],
    aims: 'This unit will enable learners to understand ethical theory and its application to business. Learners will develop an understanding of corporate social responsibility, ethical decision-making, and the role of governance in promoting ethical behaviour in organisations.',
    outcomes: [
      {
        lo: '1. Understand ethical theories and their application to business',
        pass: [
          '1.1 Explain ethical theories relevant to business organisations',
          '1.2 Assess how ethical theories can be applied to business situations',
        ],
        merit: ['1M1 Analyse ethical dilemmas in business and the approaches used to resolve them'],
        distinction: ['1D1 Evaluate the role of ethics in shaping business decisions and organisational behaviour'],
      },
      {
        lo: '2. Understand corporate social responsibility (CSR)',
        pass: [
          '2.1 Explain the concept and principles of corporate social responsibility',
          '2.2 Assess the impact of CSR on business operations and stakeholders',
        ],
        merit: [],
        distinction: [],
      },
      {
        lo: '3. Understand ethical decision-making in business organisations',
        pass: [
          '3.1 Explain approaches to ethical decision-making in business organisations',
          '3.2 Analyse factors that influence ethical decision-making in organisations',
        ],
        merit: ['3M1 Assess the effectiveness of ethical decision-making frameworks used by organisations'],
        distinction: [],
      },
      {
        lo: '4. Understand the role of governance in promoting ethical behaviour',
        pass: [
          '4.1 Explain the role of governance in promoting ethical business behaviour',
          '4.2 Analyse the impact of governance structures on ethical conduct in organisations',
        ],
        merit: [],
        distinction: ['4D1 Evaluate the effectiveness of governance frameworks in promoting ethical business practice'],
      },
    ],
  },

  /* ── Unit 8 ── */
  {
    key: 'u8',
    title: 'Unit 8: Planning a New Business Venture',
    code: 'J/650/6257', level: 5, glh: 60, credits: 15,
    gradingStructure: 'Pass-Merit-Distinction',
    hasAssessorGuidance: true,
    assessorGuidance: [
      'In order to achieve this unit, learners must produce work which demonstrates achievement of the learning outcomes at the standards provided by the assessment criteria. Learners must use real life examples to illustrate the points which are made. For the business plan element, learners will develop a plan for a new business venture of their choosing, agreed with their tutor. Tutors should ensure the chosen venture is realistic and appropriate for the level.',
    ],
    aims: 'This unit will enable learners to understand entrepreneurship and the process of planning a new business venture. Learners will develop knowledge of how to assess market potential and legal considerations, produce a business plan, and understand how to secure funding for a new venture.',
    outcomes: [
      {
        lo: '1. Understand how to determine the market potential of a new business venture',
        pass: [
          '1.1 Assess the market conditions for a proposed new business venture',
          '1.2 Identify the target market for a proposed new business venture',
          '1.3 Explain the potential benefits, limitations and risks of a proposed new business venture',
        ],
        merit: ['1M1 Evaluate the market potential for a proposed new business venture'],
        distinction: [],
      },
      {
        lo: '2. Understand the legal considerations of new business ventures',
        pass: [
          '2.1 Explain the legal entity options available for a new business venture',
          '2.2 Assess the legal and regulatory requirements for a new business venture',
        ],
        merit: [],
        distinction: [],
      },
      {
        lo: '3. Can develop a business plan',
        pass: [
          '3.1 Develop mission, vision statement and business objectives for the proposed business venture',
          '3.2 Analyse skills, experience and other resources needed to introduce and establish the new business venture',
          '3.3 Explain financial requirements needed for the new business venture',
          '3.4 Propose business structures and systems needed to deliver business objectives',
        ],
        merit: ['3M1 Analyse strengths, weaknesses and risks inherent in the business plan'],
        distinction: ['3D1 Propose strategies to address the weaknesses and mitigate the risks in business plans'],
      },
      {
        lo: '4. Understand how to secure funding for a new business venture',
        pass: [
          '4.1 Evaluate approaches to securing funding for a new business venture',
        ],
        merit: [],
        distinction: ['4D1 Pitch for funding for a new business venture'],
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Accordion
───────────────────────────────────────────── */
function UnitAccordion({ unit, isOpen, onToggle }) {
  const ref = useRef(null);
  const IndicativeContent = INDICATIVE_MAP[unit.key] || null;

  useEffect(() => {
    if (isOpen && ref.current) {
      setTimeout(() => { ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    }
  }, [isOpen]);

  return (
    <div className="al4-acc-item" ref={ref}>
      <button className="al4-acc-header" onClick={onToggle}>
        <span className="al4-acc-title">{unit.title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="al4-acc-body">
          <p className="al4-unit-heading">{unit.title}</p>

          <div className="al4-meta-table-wrap">
          <table className="al4-meta-table">
            <tbody>
              <tr>
                <td className="al4-meta-label">Unit Aims</td>
                <td className="al4-meta-value" colSpan={3}>{unit.aims || '—'}</td>
              </tr>
              <tr>
                <td className="al4-meta-label">Unit Level</td>
                <td className="al4-meta-value">{unit.level}</td>
                <td className="al4-meta-label">GLH</td>
                <td className="al4-meta-value">{unit.glh}</td>
              </tr>
              <tr>
                <td className="al4-meta-label">Unit Code</td>
                <td className="al4-meta-value">{unit.code || '—'}</td>
                <td className="al4-meta-label">Credit Value</td>
                <td className="al4-meta-value">{unit.credits}</td>
              </tr>
              {unit.gradingStructure && (
                <tr>
                  <td className="al4-meta-label">Unit Grading Structure</td>
                  <td className="al4-meta-value" colSpan={3}>{unit.gradingStructure}</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>{/* end al4-meta-table-wrap */}

          {unit.hasAssessorGuidance && unit.assessorGuidance.length > 0 && (
            <div className="al4-assessor">
              <p className="al4-assessor-heading">Assessment Guidance</p>
              {unit.assessorGuidance.map((p, i) => (
                <p key={i} className="al4-assessor-para">{p}</p>
              ))}
            </div>
          )}

          {unit.outcomes.length > 0 && (
            <div className="al4-lo-wrap">
              <table className="al4-lo-table">
                <thead>
                  <tr>
                    <th className="al4-lo-col">Learning Outcomes<span className="al4-lo-sub">The learner will demonstrate that they:</span></th>
                    <th>P (Pass)<span className="al4-lo-sub">The learner can:</span></th>
                    <th>M (Merit)</th>
                    <th>D (Distinction)</th>
                  </tr>
                </thead>
                <tbody>
                  {unit.outcomes.map((o, i) => (
                    <tr key={i}>
                      <td><strong>{o.lo}</strong></td>
                      <td>{o.pass.map((p, j) => <p key={j} className="al4-lo-item">{p}</p>)}</td>
                      <td>{o.merit.map((m, j) => <p key={j} className="al4-lo-item">{m}</p>)}</td>
                      <td>{o.distinction.map((d, j) => <p key={j} className="al4-lo-item">{d}</p>)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {IndicativeContent && <IndicativeContent />}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page facts
───────────────────────────────────────────── */
const facts = [
  { icon: <Clock size={22} />, label: '1 Year' },
  { icon: <Calendar size={22} />, label: 'Intake: January / August' },
  { icon: <Award size={22} />, label: 'Awarding Body: ATHE' },
  { icon: <TrendingUp size={22} />, label: 'Progression: Level 6 Extended Diploma in Business and Management — the final year (top-up year) of degree programmes at some universities.' },
];

const tabs = ['Overview', 'Course Units', 'Course Fees'];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function ATHELevel5Page() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [openUnit, setOpenUnit] = useState(null);

  return (
    <div className="inner-page page-enter al4-page">

      <PageHero
        title="ATHE Level 5 Extended Diploma in Business and Management"
        bgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"
        bgPosition="center 25%"
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
            <p><strong>ATHE Level 5 Extended Diploma in Business and Management is a 120-credit qualification equivalent to the second year of a university degree.</strong></p>
            <p>It offers students advanced knowledge and understanding of business covering 8 units on a wide range of business and management related topics. Students with this qualification can progress to Level 6 Extended Diploma in Business and Management (the final top-up year of a degree). This course builds on Level 4 foundations, developing higher-level skills in management, sustainability, ethics and entrepreneurship.</p>
            <p><strong>Advance your Management Skills with the Level 5 Extended Diploma in Business &amp; Management</strong></p>
            <p className="al4-subhead">Career Opportunities:</p>
            <ul className="al4-bullets">
              <li><strong>Middle Management Roles:</strong> Step into higher management positions equipped with advanced business and leadership skills.</li>
              <li><strong>Progression to a Bachelor&rsquo;s Degree:</strong> Our programme offers a direct pathway to the final year (Level 6) of a Bachelor&rsquo;s degree at a range of universities.</li>
            </ul>
            <p className="al4-subhead">What you will learn:</p>
            <ul className="al4-bullets">
              <li>Advanced business and management concepts in a global context.</li>
              <li>Strategic thinking and research skills.</li>
              <li>Sustainable business practices and ethics.</li>
              <li>Entrepreneurial planning and financial management for managers.</li>
            </ul>
            <p><strong>Course mode:</strong> Blended learning: one session per week online, one session in-person</p>
          </div>
        )}

        {activeTab === 'Course Units' && (
          <div className="al4-units-list">
            <ul className="al4-bullets">
              <li>Unit 1: Business Organisations in a Global Context (15 Credits)</li>
              <li>Unit 2: People Management (15 Credits)</li>
              <li>Unit 3: Finance for Managers (15 Credits)</li>
              <li>Unit 4: Research Project (15 Credits)</li>
              <li>Unit 5: Managing Communication (15 Credits)</li>
              <li>Unit 6: Manage Sustainability in an Organisation (15 Credits)</li>
              <li>Unit 7: Business Ethics (15 Credits)</li>
              <li>Unit 8: Planning a New Business Venture (15 Credits)</li>
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

      {/* Course facts + Unit Details */}
      <div className="al4-facts-units-wrap">
        <div className="container al4-facts-units-inner">
          <div className="al4-facts-col">
            {facts.map((f, i) => (
              <div key={i} className="al4-fact-item">
                <span className="al4-fact-icon">{f.icon}</span>
                <span className="al4-fact-label">{f.label}</span>
              </div>
            ))}
          </div>
          <div className="al4-units-col">
            <h3 className="al4-units-heading">Unit Details:</h3>
            <div className="al4-accordion">
              {units.map((u) => (
                <UnitAccordion
                  key={u.key}
                  unit={u}
                  isOpen={openUnit === u.key}
                  onToggle={() => setOpenUnit(openUnit === u.key ? null : u.key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Entry Requirement */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Entry Requirement</h2>
        <p><strong>Age:</strong> 18+</p>
        <p style={{ marginTop: 16 }}><strong>Qualifications:</strong></p>
        <p style={{ marginTop: 8 }}>For learners who have recently been in education or training the entry profile is likely to include one of the following:</p>
        <ul className="al4-bullets" style={{ marginTop: 8 }}>
          <li>Prior study in business, management or related subjects at level 4 or above</li>
          <li>A level 4 qualification for example an ATHE Level 4 Extended Diploma in Business and Management or an ATHE Level 4 Diploma in Business and Administrative Management</li>
          <li>Other equivalent international qualifications</li>
        </ul>
        <p style={{ marginTop: 16 }}><strong>All entry decisions are taken on an individual basis.</strong></p>
      </div>

      {/* English Language Requirements */}
      <div className="container al4-section">
        <h2 className="al4-section-title">English Language Requirements</h2>
        <p>For those whom English is not their first language, we recommend the following standards of proficiency in English language skills or an approved equivalent for this qualification:</p>
        <ul className="al4-bullets" style={{ marginTop: 12 }}>
          <li>IELTs 5.5</li>
          <li>Common European Framework of Reference (CEFR) B2</li>
          <li>Cambridge English Advanced (CAE) 162 or above</li>
          <li>Pearson Test of English (PTE) Academic 42–49</li>
        </ul>
      </div>

      {/* Assessment Method */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Assessment Method</h2>
        <p>Assessment will be conducted through a range of internally set assignments, projects, practical tasks, and presentations designed to meet the learning outcomes and assessment criteria specified by ATHE. All assessments are internally verified and subject to ATHE&rsquo;s external quality assurance procedures. There are no formal examinations.</p>
      </div>

      {/* Why TEC */}
      <div className="container al4-section">
        <h2 className="al4-section-title">Why TEC?</h2>
        <p style={{ marginBottom: 16 }}><strong>Qualified Teachers:</strong> Our teachers hold relevant qualifications and are experienced in teaching the subject to adults. They will find out about your individual needs and make sure that you are able to get the best out of the course.</p>
        <p style={{ marginBottom: 16 }}><strong>Individual Focus:</strong> At Trent Education Centre, we believe in the power of individual attention. Our teaching and support staff will assess your needs and monitor your development throughout the course. We will provide you with extra support if needed. We won&rsquo;t treat you like a face in the crowd, but an individual with unique learning needs and interests.</p>
        <p><strong>Path to Progression:</strong> Our programme is designed to support your journey towards a Bachelor&rsquo;s degree, opening doors to advanced career opportunities. After completing Level 4, you can progress to Level 5. Then you could complete Level 6 Top-up at a university for the full degree.</p>
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
