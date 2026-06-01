import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Award, TrendingUp, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import './InnerPage.css';
import './CoursePage.css';
import './ATHELevel4Page.css';
import PageHero from '../components/PageHero';

/* ─────────────────────────────────────────────
   Assessor Guidance (shared boilerplate)
───────────────────────────────────────────── */
const ASSESSOR_GUIDANCE = [
  'In order to achieve this unit learners must produce work which demonstrates achievement of the learning outcomes at the standards provided by the assessment criteria.',
  'Learners must use real life examples to illustrate the points which are made. There is a requirement to utilise information from specific organisations to meet some of the stated standards. Learners will need to agree with tutors an appropriate organisation and country on which to base their study. Tutors need to ensure that the organisation chosen is suitable. SMEs are recommended as larger organisations are often too complex and accessing the information required can be challenging.',
  'Learner work should demonstrate substantial coverage of the unit indicative content.',
];

/* ─────────────────────────────────────────────
   Unit data
───────────────────────────────────────────── */
const units = [
  {
    key: 'u1',
    title: 'Unit 1 Business Organisations in a Global Context',
    code: 'Y/850/5055', level: 4, glh: 60, credits: 15,
    gradingStructure: 'Pass-Merit-Distinction',
    hasAssessorGuidance: true,
    aims: "This unit will develop learners' understanding of the business environment and the internal and external circumstances in which different organisations operate. Learners will also gain understanding of organisational responsibilities and structures.",
    outcomes: [
      {
        lo: '1. Understand types of organisation, their purposes and responsibilities',
        pass: ['1.1 Explain the different types of organisations', '1.2 Analyse the purposes and responsibilities of organisations', '1.3 Analyse how organisations fulfil their responsibilities to stakeholders'],
        merit: ['1M1 Assess the extent to which a named organisation meets its stated purposes'],
        distinction: [],
      },
      {
        lo: '2. Understand the structure of organisations',
        pass: ['2.1 Explain the structures found within organisations', '2.2 Analyse the functions of different departments and their inter-relationships in organisational structures'],
        merit: [],
        distinction: ['2D1 Propose improvements to the structure of a named organisation'],
      },
      {
        lo: '3. Understand the impact of the market environment on organisations',
        pass: ['3.1 Analyse the impact of supply and demand on the prices of goods and services in markets', '3.2 Analyse possible planned interventions in the marketplace and their impact on organisations'],
        merit: ['3M1 Assess the response of a named organisation to changes in its market'],
        distinction: [],
      },
      {
        lo: '4. Understand the nature of the national environment in which organisations operate',
        pass: ['4.1 Analyse the role of monetary and fiscal policy and the possible impact on organisations and their activities', '4.2 Evaluate the impact of competition policy and other regulatory mechanisms on the activities of a named organisation'],
        merit: [],
        distinction: ['4D1 Assess the challenges of operating in both an economic and market environment for a named organisation'],
      },
    ],
  },
  {
    key: 'u2',
    title: 'Unit 2: People in Organisations',
    code: 'A/650/5056', level: 4, glh: 60, credits: 15,
    gradingStructure: 'Pass-Merit-Distinction',
    hasAssessorGuidance: true,
    aims: 'This unit aims to develop knowledge and understanding of those aspects of organisations that concern and support people. This includes communication practices, teamwork, remote working and other organisational structures. Using this knowledge and understanding, learners will be able to review the impact of workplace practices on people.',
    outcomes: [
      {
        lo: '1. Understand communication within organisations',
        pass: ['1.1 Analyse the benefits of effective communication to organisations', '1.2 Explain the implications of legislation, policies and procedures relevant to communication within organisations', '1.3 Assess how the organisational structure impacts on communication'],
        merit: ["1M1 Assess the impact of new technologies on organisations' communications"],
        distinction: [],
      },
      {
        lo: '2. Understand effective teamwork',
        pass: ['2.1 Assess the benefits of team working to individuals and organisations', '2.2 Analyse why teams might fail to meet their objectives'],
        merit: ['2M1 Assess the potential impact of different leadership styles on teamwork'],
        distinction: ['2D1 Evaluate the use and effectiveness of teamwork in a chosen organisation'],
      },
      {
        lo: '3. Understand the issues associated with remote working',
        pass: ['3.1 Analyse the implications of remote working for individuals', '3.2 Assess the effectiveness of different leadership styles for remote working'],
        merit: [],
        distinction: [],
      },
      {
        lo: '4. Understand how organisations monitor and support people in the workplace',
        pass: ['4.1 Explain how HR departments provide support and monitor people within the workplace', '4.2 Assess policies and procedures designed to support and monitor people in the workplace'],
        merit: [],
        distinction: ['4D1 Evaluate the impact of legislation on employee relations management in different organisational contexts'],
      },
    ],
  },
  {
    key: 'u3',
    title: 'Unit 3: Financial and Management Accounting Techniques for Managers',
    code: 'D/650/5057', level: 4, glh: 60, credits: 15,
    gradingStructure: null, hasAssessorGuidance: false,
    aims: 'To develop a knowledge and understanding of fundamental financial and management accounting techniques that are used by managers in organisations and to develop skills enabling learners to apply these techniques.',
    outcomes: [
      {
        lo: '1. Understand financial and management accounting systems',
        pass: ['1.1 Compare management and financial accounting systems', '1.2 Analyse financial and management techniques used for recording financial information'],
        merit: ['1M1 Assess the needs of stakeholders in relation to management and financial accounting information in a specific organisation'],
        distinction: ['1D1 Evaluate the benefits of integrating financial and management accounting for a specific business organisation system'],
      },
      {
        lo: '2. Can assess business organisation performance',
        pass: ['2.1 Analyse components of working capital explaining how business organisations can effectively manage working capital', '2.2 Use ratios to assess the performance of a specific organisation'],
        merit: ['2M1 Evaluate the usefulness of ratio analysis when assessing organisational performance'],
        distinction: [],
      },
      {
        lo: '3. Can apply management accounting techniques for decision-making',
        pass: ['3.1 Use budgetary techniques for decision-making', '3.2 Use costing techniques for pricing purposes', '3.3 Use capital investment appraisal techniques to evaluate a specific business decision'],
        merit: [],
        distinction: ['3D1 Evaluate the benefits of management accounting techniques in supporting financial decision making to ensure long term financial stability'],
      },
    ],
  },
  {
    key: 'u4',
    title: 'Unit 4: Communication Skills for Business',
    code: 'F/650/5058', level: 4, glh: 60, credits: 15,
    gradingStructure: null, hasAssessorGuidance: false,
    aims: 'This unit aims to develop knowledge and understanding of the communication practices within organisations and learners are introduced to the different modes and channels of communication used in organisations. In addition, learners will be able to develop their communication skills. Learners will also apply their own communication skills to typical organisational requirements.',
    outcomes: [
      {
        lo: '1. Understand how internal communication takes place within organisations',
        pass: ['1.1 Explain the process of internal communication within organisations', '1.2 Assess the appropriate use of different internal modes of communication for different purposes', '1.3 Analyse barriers to effective communication within organisations'],
        merit: ['1M1 Analyse the legal and ethical issues in relation to the communication of information within organisations'],
        distinction: [],
      },
      {
        lo: '2. Understand how organisations communicate with customers',
        pass: ['2.1 Evaluate communication systems used by organisations to communicate with customers'],
        merit: [],
        distinction: [],
      },
      {
        lo: '3. Understand the factors that impact on the effectiveness of communications in business',
        pass: ['3.1 Analyse the impact of organisational relationships on effective communications', '3.2 Assess the impact of non-verbal communication on the effectiveness of oral communications'],
        merit: [],
        distinction: [],
      },
      {
        lo: '4. Can present oral information effectively',
        pass: ['4.1 Present complex information using technology'],
        merit: ['LO3, LO4 and LO5', '5M1 Assess the effectiveness of technology in oral and written communication'],
        distinction: ['4D1 Adapt own oral communication for different audiences and purposes', '5D1 Adapt own written communication for different audiences and purposes'],
      },
      {
        lo: '5. Can communicate effectively in writing',
        pass: ['5.1 Communicate complex information in writing for specific purposes'],
        merit: [],
        distinction: [],
      },
    ],
  },
  {
    key: 'u6',
    title: 'Unit 6: Marketing Mix',
    code: 'L/650/5060', level: 4, glh: 60, credits: 15,
    gradingStructure: null, hasAssessorGuidance: false,
    aims: 'To develop an understanding of the seven elements of the marketing mix and how they relate to one another, including how digital and social media marketing relate to each element.',
    outcomes: [
      {
        lo: '1. Understand the elements of the marketing mix',
        pass: ['1.1 Explain the use of the seven elements of the marketing mix', '1.2 Analyse the relationship between the different elements of the marketing mix'],
        merit: ['1M1 Evaluate the role of different elements of marketing mix for a chosen product or service'],
        distinction: ['1D1 Assess the impact of adjusting one element of the marketing mix on the other elements of the marketing mix'],
      },
      {
        lo: '2. Understand the application of the marketing mix',
        pass: ['2.1 Analyse the application of a co-ordinated marketing mix for a chosen product or service', '2.2 Analyse the benefits of a co-ordinated marketing mix'],
        merit: ['LO1 and LO2', '2M1 Assess the success of the marketing mix used for a chosen product or service'],
        distinction: [],
      },
      {
        lo: '3. Understand digital elements of the marketing mix',
        pass: ['3.1 Explain the digital tools and techniques available to include within the marketing mix', '3.2 Analyse the use of digital marketing tools and techniques for a chosen product or service', '3.3 Assess the benefits of digital marketing'],
        merit: [],
        distinction: ['3D1 Evaluate the marketing mix including digital elements for a chosen product or service'],
      },
    ],
  },
  {
    key: 'u8',
    title: 'Unit 8: Managing a Work-Based Team',
    code: 'R/650/5062', level: 4, glh: 60, credits: 15,
    gradingStructure: null, hasAssessorGuidance: false,
    aims: 'This unit aims to develop project management skills for a work-based team project by implementing the different stages of project development. Learners will have the opportunity to plan, implement and review a project of their choice.',
    outcomes: [
      {
        lo: '1. Can develop a proposal for a work-based team project',
        pass: ['1.1 Develop the objectives and scope of the project', '1.2 Propose ways of monitoring and evaluating the project, including quality assurance processes'],
        merit: ['1M1 Evaluate the benefits of the project to the organisation'],
        distinction: [],
      },
      {
        lo: '2. Can plan the work-based team project',
        pass: ['2.1 Plan the activities for the project using a suitable project management methodology', '2.2 Analyse the resources required to undertake the project', '2.3 Carry out a risk assessment for the project'],
        merit: [],
        distinction: ['2D1 Justify the management control points needed in the project including those for quality assurance processes'],
      },
      {
        lo: '3. Can implement the plan for a work-based team project',
        pass: ['3.1 Implement the plan, logging activities', '3.2 Manage risks and issues identified during the project, noting decisions taken'],
        merit: ['LO3 and LO4', '4M1 Evaluate own and team members’ performance within the project'],
        distinction: ['3D1 Manage the quality control requirements of the project and document the outcomes'],
      },
      {
        lo: '4. Can evaluate the process and outcomes of the project',
        pass: ['4.1 Analyse feedback gathered from stakeholders about the project', '4.2 Evaluate performance of the project against the objectives and quality requirements'],
        merit: [],
        distinction: [],
      },
    ],
  },
  {
    key: 'u9',
    title: 'Unit 9: Entrepreneurship',
    code: 'T/650/5063', level: 4, glh: 60, credits: 15,
    gradingStructure: null, hasAssessorGuidance: false,
    aims: 'To provide the learner with an understanding of entrepreneurship in business, the skills and qualities needed by a successful entrepreneur and the roles an entrepreneur plays in starting and developing businesses. The learner will develop skills in generating ideas for possible new business ventures and will be able to prepare for a new business venture.',
    outcomes: [
      {
        lo: '1. Understand entrepreneurship in business',
        pass: ['1.1 Analyse the entrepreneurial lifecycle', '1.2 Evaluate how entrepreneurship is encouraged and supported in different countries'],
        merit: [],
        distinction: ['1D1 Analyse the impact of entrepreneurship on the economy in a named country'],
      },
      {
        lo: '2. Understand the skills and qualities of a successful entrepreneur',
        pass: ['2.1 Analyse the different types of entrepreneurs', '2.2 Compare the skills and qualities of entrepreneurs and managers'],
        merit: ['2M1 Analyse the differences between the roles of entrepreneurs and managers'],
        distinction: [],
      },
      {
        lo: '3. Can prepare for a new business venture',
        pass: ['3.1 Propose a range of new entrepreneurial ideas for further development using Drucker’s seven sources of innovation', '3.2 Prepare a start-up plan for a chosen new business venture'],
        merit: ['3M1 Justify your choice of new business venture'],
        distinction: ['3D1 Analyse brand development and promotion aspects of launching an effective new business venture'],
      },
    ],
  },
  {
    key: 'u10',
    title: 'Unit 10: Customer Relationship Management',
    code: 'Y/650/5064', level: 4, glh: 60, credits: 15,
    gradingStructure: null, hasAssessorGuidance: false,
    aims: 'Learners will be able to develop knowledge and understanding of the scope and importance of Customer Relationship Management (CRM) and to explore how effective CRM is achieved. Learners will also gain an understanding of loyalty schemes and have an opportunity to make improvements to CRM.',
    outcomes: [
      {
        lo: '1. Understand the importance of customer relationship management (CRM) to business',
        pass: ['1.1 Explain the key features of customer relationship management', '1.2 Analyse the benefits of good customer relationship management to business'],
        merit: ['LO1 and LO2', '2M1 Evaluate the methods used to measure customer satisfaction'],
        distinction: [],
      },
      {
        lo: '2. Understand how effective customer relationship management is achieved',
        pass: ['2.1 Evaluate the processes necessary for achieving effective customer relationship management', '2.2 Assess the role of staff in achieving effective customer relations experiences', '2.3 Assess the role of external stakeholders in achieving effective customer relations'],
        merit: [],
        distinction: ['2D1 Analyse the impact of employee engagement with CRM on customer relations experiences'],
      },
      {
        lo: '3. Understand the use of loyalty schemes in customer relationship management',
        pass: ['3.1 Analyse the use of loyalty schemes to gain information about customers', '3.2 Explain how the information gained is used to inform segmentation and other CRM decisions'],
        merit: [],
        distinction: ['3D1 Evaluate methods used to segment customers as part of a customer relationship management process in a named organisation'],
      },
      {
        lo: '4. Can plan improvements to customer relationship management in a named organisation',
        pass: ['4.1 Review customer relationship management in an organisation', '4.2 Propose improvements to processes and staff roles for customer relationship management', '4.3 Plan for the implementation of improvements'],
        merit: ['4M1 Obtain feedback on your plan and make amendments'],
        distinction: [],
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Indicative Content components
───────────────────────────────────────────── */
function IC({ heading, children }) {
  return <div className="al4-ic-section"><p className="al4-ic-heading">{heading}</p>{children}</div>;
}
function Sub({ label }) {
  return <p className="al4-ic-sub">{label}</p>;
}
function Bullets({ items }) {
  return <ul className="al4-ic-list">{items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
}

function Unit6Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>

      <IC heading="1. Understand the elements of the marketing mix">
        <Sub label="Product" />
        <Bullets items={[
          'Features and benefits of products or services',
          'Product and service information and descriptions are provided to potential customers',
          'Comparison against features and benefits of competitor products and services',
          'Importance of having the right product or service which is of interest to customers',
          'Use of marketing mix at each stage of Product Life Cycle',
          'Creating lifetime value to a customer by using the Customer Life Cycle – targeting needs at different life stages',
        ]} />
        <Sub label="Price" />
        <Bullets items={[
          'Use of pricing to reflect the perceived value of the benefits of a product to the buyer',
          'Use of pricing to offset the costs of product manufacturing and/or service delivery',
          'Different pricing strategies: penetration pricing, economy pricing, price skimming, psychological pricing, product line pricing, optional pricing, captive product pricing, product bundle pricing, promotional pricing, geographical pricing, premium pricing.',
        ]} />
        <Sub label="Place (distribution channels)" />
        <Bullets items={[
          'chain of distribution channel: wholesalers, retailers, distributors, internet',
          'direct channel (end consumer buys straight from manufacturer)',
          'indirect channel (end consumer buys from wholesaler or retailer)',
          'types of distribution of products and services for market coverage: intensive distribution, selective distribution, exclusive distribution.',
          'Advantages of using a direct marketing channel (personal feel of market due to direct contact, easy to adapt to changes required thanks to immediate customer feedback, can control product pricing)',
        ]} />
        <Sub label="Promotion" />
        <Bullets items={[
          'Functions of promotion: persuade, remind, inform, sell, respond to competition, increase market share',
          'Promotion of corporate identity',
        ]} />
        <Sub label="Process" />
        <Bullets items={[
          'Process activities: technological, manufacturing, electronic (electronic point-of-sale (epos); barcodes, checkouts, loyalty cards), direct (at customer interface), indirect (before, during and after customer interface)',
          'How process leads to customer focus (customer retention, cross-selling, tailor process to needs of different individuals)',
        ]} />
        <Sub label="People" />
        <Bullets items={[
          'Importance of recruiting the right people to become customer facing staff',
          'How people underpin customer relationship between the business and the consumer. (People buy from people), relationships can add value to transactions, people provide expertise on business and its products and services and ask questions to ascertain customers’ needs and wants',
          'Importance to the business of training customer-facing and non-customer-facing staff (increase knowledge and skills; add value by offering technical support, expertise and advice; support sales, marketing and customer service processes; represent the business and build its reputation, ensure seamless transactions and customer service).',
        ]} />
        <Sub label="Physical evidence" />
        <Bullets items={[
          'Physical environment', 'Ambience', 'Spatial layout',
          'Corporate branding: signs, symbols, artefacts; packaging, webpages, brochures, uniforms, business cards.',
        ]} />
        <Sub label="Relationship between elements" />
        <p className="al4-ic-para">Relationship between elements and effects of adjusting one element of a product or service on other elements e.g.</p>
        <Bullets items={[
          'Product: changes may affect cost which in turn affects price, changes in quality may affect pricing and distribution, items that have to be tried out sell better in shops etc.',
          'Price: changes marketing strategy, effects demand and sales, impacts on cash flow and can impact perception of quality',
          'Place: online distribution may need different information, cheaper/more expensive items may sell in different outlets',
          'Promotion: discounting/buy one get one free offers not usually suitable for more expensive products, national campaigns require product to be available nationally',
          'Process: fresh products need short order to delivery times, efficient processes provide better customer service which make products more desirable and can affect price',
          'People: provide better customer service which can make products more desirable and can affect price',
          'Physical evidence: presence and branding makes product more visible; branding may make products more desirable; high quality branding may allow higher price to be set',
          'Identifying and relating elements within an organisation',
        ]} />
      </IC>

      <IC heading="2. Understand the application of the marketing mix">
        <Bullets items={[
          'Analysing marketing mix within organisations: identify a product or service, research and establish each element',
          'Benefits: supports understanding of products/services and customers, helps planning, helps businesses focus on strengths, helps business avoid unnecessary costs, support efficiency because of whole organisation focus, guide for allocating resources and responsibilities, facilitates communication',
        ]} />
      </IC>

      <IC heading="3. Understand digital elements of the marketing mix">
        <Sub label="Digital tools" />
        <Bullets items={['Search marketing','Social media marketing','Digital advertising','Digital PR','Digital partnerships','Digital messaging']} />
        <Sub label="Digital media can be:" />
        <Bullets items={[
          'Paid for e.g. pay per click, paid social media, online adverts, affiliate marketing, external email push',
          'Owned media – in house e.g. guest blogging, customer reviews, website advertising',
          'Earned media e.g. sponsorship, earned mentions, influencer, partner emails',
        ]} />
        <Sub label="Examples of uses" />
        <Bullets items={[
          'Product – opportunities offering digital products as core products or add-ons such as customer service, advice etc.',
          'Price – new pricing models and strategies including online discounts',
          'Place – for example using affiliate or co-marketing',
          'Promotion – marketing techniques such as search, email and social media marketing',
          'People, process and physical evidence – improving customer service via Livechat and online knowledge bases',
        ]} />
      </IC>
    </div>
  );
}

function Unit8Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>
      <IC heading="1. Develop a proposal for a work-based team project">
        <Sub label="Objectives" /><Bullets items={['Strategic, Financial, Organisational, Personal development, Team building']} />
        <Sub label="Scope" /><Bullets items={['Outputs, Financial, Time, Quality, Out of scope']} />
        <Sub label="Ways of monitoring the project" /><Bullets items={['Meetings, Reporting, Data analysis, Risks and issues, Managing quality processes']} />
        <Sub label="Ways of evaluating the project" /><Bullets items={['Self-evaluation, Peer evaluation, Customer evaluation']} />
        <Sub label="Benefits to organisation" /><Bullets items={['Strategic, Financial, Competitive, Innovative, Kudos, Benefits customers']} />
      </IC>
      <IC heading="2. Plan the work-based team project">
        <Sub label="Project management methodology" />
        <Bullets items={['Critical path analysis, Gantt charts, PERT analysis','Project management methodologies e.g. Prince2, Agile, Waterfall, PMP, APM, organisation’s bespoke models']} />
        <Sub label="Activity planning" />
        <Bullets items={['Identification of activities, Ordering of activities in a logical order, Identification of interdependencies, Critical path, Identifying key milestones in the plan','Identifying opportunities for monitoring and evaluating quality','Allocating roles and responsibilities for the project team','Identifying and allocating resources for the project']} />
        <Sub label="Key milestones" /><Bullets items={['Milestones at which decision will be taken to continue or stop project']} />
        <Sub label="Physical/technology resources" /><Bullets items={['Workspace, Documentation, Other physical, Technology']} />
        <Sub label="Financial resources" /><Bullets items={['Budget, Sources of funding, Contingency']} />
        <Sub label="Human resources" /><Bullets items={['Allocation of team members’ roles, Roles and responsibilities, External expertise']} />
        <Sub label="Risk assessment" /><Bullets items={['Identification of risks, Likelihood of risk, Severity of risk, Contingencies']} />
        <Sub label="Quality requirements" /><Bullets items={['Acceptance criteria, Line manager/customer’s quality expectations, Quality log; review, Quality plan, Product description and quality criteria, Stage quality plan']} />
        <Sub label="Management control points" /><Bullets items={['Project initiation decision, End stage assessment, Highlight reports, Tolerance, Exception reports, Project closure']} />
      </IC>
      <IC heading="3. Implement the plan for a work-based team project">
        <Sub label="Carry out plan" /><Bullets items={['Track activities completed']} />
        <Sub label="Risk and issue management" /><Bullets items={['Identification and logging of risks and issues, Contingency planning, Mitigation, Management of risks and issues, Risk and issue log']} />
        <Sub label="Manage quality" /><Bullets items={['Quality check: fitness for use of the project outcome, and adherence to requirements']} />
      </IC>
      <IC heading="4. Evaluate the process and outcomes of the project">
        <Sub label="Collection of feedback" /><Bullets items={['Identification of stakeholders to provide feedback, Verbal and written feedback, Project review meetings and discussions, Lessons learned meeting']} />
        <Sub label="Analysis of feedback" /><Bullets items={['Use of feedback to identify common patterns and themes, Summary of patterns and themes']} />
        <Sub label="Evaluation of project" /><Bullets items={['Evaluation of project outcomes against project aims and objectives']} />
      </IC>
    </div>
  );
}

function Unit9Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>
      <IC heading="1. Understand entrepreneurship in business">
        <Bullets items={[
          'What is entrepreneurship?',
          'Entrepreneurial lifecycle: new idea conception; test ideas; focus on opportunity; commit resources; market entry; growth; maturity/sale of business/decline of business.',
          'New business ventures, business start-ups',
          'Opening new markets; fulfilling a new need; identifying a gap in the market; new products and services; new business models; disruptive business models',
          'Entrepreneurship vs established business management',
          'Can create employment and wealth',
          'European Commission Entrepreneurship 2020 Action Plan; Entrepreneur First (EF)',
          'World Economic Forum – Entrepreneurial Ecosystem',
          'DIT Global Entrepreneur programme; entrepreneurship visa; TechStars London',
        ]} />
      </IC>
      <IC heading="2. Understand the skills and qualities of a successful entrepreneur">
        <Bullets items={[
          'Types of entrepreneur; e.g. small business entrepreneur; lifestyle entrepreneur; high-growth potential entrepreneur; professional entrepreneur; serial entrepreneur; corporate entrepreneur; social entrepreneur',
          'Skills and qualities: risk-taking; organising; motivating people; drawing together a team of people with relevant skills; creativity; opportunity analysis; speed of taking action to take advantage of opportunities; decision-making; innovative; hard-working; passionate; able to sell ideas and convince others; perseverant; resilient; imaginative; motivated; problem-solving; vision; teamwork; commitment',
          'Compare with managers who may be more concerned with stability, profit margins, lower risk-takers, people oriented, responsible and accountable.',
          'Roles of managers and entrepreneurs e.g. entrepreneur driving force, often business owner, starts and expands the business; managers focus on administration, utilise existing resources, plan and control day-to-day activities.',
        ]} />
      </IC>
      <IC heading="3. Prepare for a new business venture">
        <Bullets items={[
          'New business opportunities: services, products, new business models',
          'Idea generation',
          'Model/theory: Drucker’s 7 sources of innovation',
          'Making recommendations: selection of workable idea; justifying the business case; financial projections; customer base; gap in market; need for product/service',
          'Component parts of an effective business plan: executive summary; business description; market analysis; organisation management; sales strategies; funding requirements; financial projections',
          'Developing a brand: link with business strategy; identification of target customers; research of target customers; develop of brand positioning; developing of messaging strategy; development of name, logo and tagline; development of content marketing strategy; development of branded items (e.g. website, business cards)',
          'Business promotion: marketing plan; social networks; promotional products; adverts; samples',
          'Business start-up plan: strategy; team; financial objectives and projections; form of business organisation and legal set-up; product/service and their features and benefits; market; customer analysis; competitors; market positioning; sales and marketing strategy; operations; payback plan (ie using loans and other people’s investment)',
        ]} />
      </IC>
    </div>
  );
}

function Unit10Indicative() {
  return (
    <div className="al4-indicative">
      <h5 className="al4-ic-title">Indicative Content</h5>
      <IC heading="1. Understand the importance of customer relationship management (CRM) to business">
        <Sub label="Key features" />
        <Bullets items={['Definition e.g. strategies to learn more about customers and improve relationships with them','Collecting customer information','Systems to store customer information','Access to information for appropriate personnel','Analysis of customer behaviour','Use of data to inform marketing, customer service and quality systems']} />
        <Sub label="Benefits" />
        <Bullets items={['Increased profits','Competitive advantage','Increased sales due to better understanding of customer requirements','Effective marketing targeted at known customer profiles','Personalised approach to customers','Increased customer satisfaction','Increased customer retention']} />
        <Sub label="Measuring customer satisfaction" />
        <Bullets items={['Formal/informal','Repeat business, customer loyalty','Net Promoter Score (NPS)','Customer feedback','Complaints']} />
      </IC>
      <IC heading="2. Understand how effective customer relationship management is achieved">
        <Sub label="Processes" />
        <Bullets items={['Creating a customer culture','Collecting and processing customer information','Making systems customer based','Supporting with effective IT','Complaints procedures']} />
        <Sub label="Staff" />
        <Bullets items={['Senior management','IT managers','Operational managers','Front line','Administration']} />
        <Sub label="Staff Roles" />
        <Bullets items={['Determination of aims and objectives of CRM','Choice of system','Implementation and management of system','Liaison with software suppliers','Analysis and use of data','Implementing customer service policies and processes','Understanding of customer service as a key responsibility','Role model','Training']} />
        <Sub label="External stakeholders" />
        <Bullets items={['Shareholders','Suppliers','Community groups','Customers']} />
        <Sub label="External stakeholder roles" />
        <Bullets items={['Agreeing strategies','Reporting','Sharing information','Complying with customer service policies','Acting in partnership','Giving feedback']} />
        <Sub label="Impact of employee engagement with CRM" />
        <Bullets items={['Increased job satisfaction','Increased productivity/efficiency','Better service','Satisfied customers/repeat business']} />
      </IC>
      <IC heading="3. Understand the use of loyalty schemes in customer relationship management">
        <Sub label="Information from loyalty schemes" />
        <Bullets items={['Purchasing habits','Opinions','Preferences','Profiles of customers']} />
        <Sub label="Use of information" />
        <Bullets items={['Targeting groups of customers','Product development to meet customer needs','Adapting marketing mix','Personalising marketing','Choice of media for promotion']} />
        <Sub label="Segmentation by" />
        <Bullets items={['Geography','Products purchased','Stage in family lifecycle','Loyalty','Consumer spends']} />
      </IC>
      <IC heading="4. Plan improvements to customer relationship management in a chosen organisation">
        <Sub label="Review" />
        <Bullets items={['Systems in use','Current role of staff','Service policies in use','Quality benchmarks used','Quality of customer service','Available data on customer satisfaction']} />
        <Sub label="Potential improvements to processes" />
        <Bullets items={['New software systems','Customer service']} />
      </IC>
    </div>
  );
}

const INDICATIVE_MAP = { u6: Unit6Indicative, u8: Unit8Indicative, u9: Unit9Indicative, u10: Unit10Indicative };

/* ─────────────────────────────────────────────
   Unit Accordion
───────────────────────────────────────────── */
function UnitAccordion({ unit, isOpen, onToggle }) {
  const IndicativeContent = INDICATIVE_MAP[unit.key] || null;
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      // slight delay lets the accordion body render before we scroll
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
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
          {/* Centred unit heading */}
          <p className="al4-unit-heading">{unit.title}</p>

          {/* Metadata table */}
          <div className="al4-meta-table-wrap">
          <table className="al4-meta-table">
            <tbody>
              <tr>
                <td className="al4-meta-label">Unit Aims</td>
                <td className="al4-meta-value" colSpan={3}>{unit.aims}</td>
              </tr>
              <tr>
                <td className="al4-meta-label">Unit Level</td>
                <td className="al4-meta-value">{unit.level}</td>
                <td className="al4-meta-label">GLH</td>
                <td className="al4-meta-value">{unit.glh}</td>
              </tr>
              <tr>
                <td className="al4-meta-label">Unit Code</td>
                <td className="al4-meta-value">{unit.code}</td>
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

          {/* Assessor Guidance */}
          {unit.hasAssessorGuidance && (
            <div className="al4-assessor">
              <p className="al4-assessor-heading">Assessor Guidance</p>
              {ASSESSOR_GUIDANCE.map((p, i) => <p key={i} className="al4-assessor-para">{p}</p>)}
            </div>
          )}

          {/* Learning Outcomes table */}
          <div className="al4-lo-wrap">
            <table className="al4-lo-table">
              <thead>
                <tr>
                  <th className="al4-lo-col">
                    Learning Outcomes<br />
                    <span className="al4-lo-sub">The learner will demonstrate that they:</span>
                  </th>
                  <th>Pass (P)</th>
                  <th>Merit (M)</th>
                  <th>Distinction (D)</th>
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

          {/* Indicative Content */}
          {IndicativeContent && <IndicativeContent />}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Course facts strip
───────────────────────────────────────────── */
const facts = [
  { icon: <Clock size={22} />, label: '1 Year' },
  { icon: <Calendar size={22} />, label: 'Intake: February / September' },
  { icon: <Award size={22} />, label: 'Awarding Body: ATHE' },
  { icon: <TrendingUp size={22} />, label: 'Progression: Level 5 Extended Diploma in Business and Management' },
];

const tabs = ['Overview', 'Course Units', 'Course Fees'];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function ATHELevel4Page() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [openUnit, setOpenUnit] = useState(null);

  return (
    <div className="inner-page page-enter al4-page">

      <PageHero
        title="ATHE Level 4 Extended Diploma in Business and Management"
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
      />

      {/* Spacer */}
      <div style={{ height: '24px', background: '#fff' }} />

      {/* Tab bar */}
      <div className="al4-tab-bar">
        {tabs.map(t => (
          <button key={t} className={`al4-tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="container al4-tab-content-wrap">

        {activeTab === 'Overview' && (
          <div className="al4-overview">
            <p><strong>ATHE Level 4 Extended Diploma in Business and Management is a 120-credit qualification equivalent to the first year of a university degree.</strong></p>
            <p>It offers students broad and comprehensive knowledge and understanding of business covering 8 units on a wide range of business and management related topics. Students with this qualification can progress to Level 5 Extended Diploma in Business and Management. This course provides you with a wide range of transferable business knowledge and skills you will need to succeed in any industry of your choice. Skills you will learn include business communications, financial management, marketing, staff management and customer relationship management.</p>
            <p><strong>Enhance your Management Skills with the Level 4 Extended Diploma in Business &amp; Management</strong></p>
            <p className="al4-subhead">Career Opportunities:</p>
            <ul className="al4-bullets">
              <li><strong>Junior Management Roles:</strong> Enter the world of management equipped with the skills to lead and make informed decisions.</li>
              <li><strong>Progression to a Bachelor&rsquo;s Degree:</strong> Our programme offers a pathway to Bachelor&rsquo;s degrees, enabling you to further enhance your qualifications and career prospects.</li>
            </ul>
            <p className="al4-subhead">What you will learn:</p>
            <ul className="al4-bullets">
              <li>A solid foundation in essential business and management principles.</li>
              <li>The ability to apply management concepts to real-world scenarios.</li>
              <li>Strong analytical and decision-making skills.</li>
              <li>Effective communication and leadership capabilities.</li>
            </ul>
            <p><strong>Course mode:</strong> Blended learning: one session per week online, one session in-person</p>
          </div>
        )}

        {activeTab === 'Course Units' && (
          <div className="al4-units-list">
            <ul className="al4-bullets">
              <li>Unit 1: The Business Environment (15 Credits)</li>
              <li>Unit 2: People in Organisations (15 Credits)</li>
              <li>Unit 3: Financial and Management Accounting Techniques for Managers (15 Credits)</li>
              <li>Unit 4: Communication Skills for Business (15 Credits)</li>
              <li>Unit 6: The Marketing Mix (15 Credits)</li>
              <li>Unit 8: Managing a Work-Based Team (15 Credits)</li>
              <li>Unit 9: Entrepreneurship (15 Credits)</li>
              <li>Unit 10: Customer Relationship Management (15 Credits)</li>
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
        <ul className="al4-bullets" style={{ marginTop: 8 }}>
          <li>A GCE Advanced level profile with achievement in 2 or more subjects supported by 5 or more GCSEs at grades C and above</li>
          <li>Other related level 3 subjects such as ATHE level 3 Diplomas</li>
          <li>An Access to Higher Education Certificate delivered by an approved further education institute and validated by an Access Validating Agency</li>
          <li>Other equivalent international qualifications</li>
        </ul>
        <p style={{ marginTop: 16 }}><strong>Prior Experiential Learning:</strong></p>
        <p style={{ marginTop: 8 }}>Students with no formal qualifications may be considered if they are able to demonstrate prior learning through work experience. This is assessed through a personal statement and interview.</p>
        <p style={{ marginTop: 16 }}><strong>All entry decisions are taken on an individual basis.</strong></p>
      </div>

      {/* English Language Requirements */}
      <div className="container al4-section">
        <h2 className="al4-section-title">English Language Requirements</h2>
        <p><strong>English Language Level:</strong></p>
        <p style={{ marginTop: 8 }}>Students without qualifications from majority English-speaking countries:</p>
        <ul className="al4-bullets" style={{ marginTop: 8 }}>
          <li>IELTs 5.5</li>
          <li>Common European Framework of Reference (CEFR) B2</li>
          <li>Cambridge B2 First 160 or above</li>
          <li>Pearson Test of English Academic (PTE-A) 45.4 +</li>
          <li>Functional Skills English Level 2</li>
          <li>Students with none of the above may be required to pass the TEC English language test.</li>
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
          <h2 className="al4-section-title" style={{ textAlign: 'center' }}>How to Apply?</h2>
          <div className="al4-apply-grid">
            <div className="al4-apply-step">
              <span className="al4-apply-icon"><FileText size={26} /></span>
              <h3>You Apply</h3>
              <p>Tell us a little about yourself and we&rsquo;ll help with the rest. Our convenient online application tool only takes 10 minutes to complete.</p>
            </div>
            <div className="al4-apply-step">
              <span className="al4-apply-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <h3>We Connect</h3>
              <p>After you submit your application, an admissions representative will contact you and will help you to complete the process.</p>
            </div>
            <div className="al4-apply-step">
              <span className="al4-apply-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <h3>Enrolment</h3>
              <p>Once you&rsquo;ve completed your application and connected with an admissions representative, you&rsquo;re ready to create your student profile and enrol.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/apply" className="btn-gold" style={{ display: 'inline-block', padding: '14px 40px', fontSize: '1rem' }}>Apply Now</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
