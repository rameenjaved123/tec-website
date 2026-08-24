import { FileText, ExternalLink, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import '../InnerPage.css';
import './PoliciesPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   Policies grouped into the 7 categories used on the WP site.
   Each entry: { title, link, badge? }
   badge = 'new' | 'archived' (optional small pill)
   ════════════════════════════════════════════════════════════ */
const sections = [
  {
    name: 'Governance',
    items: [
      { title: 'Access and Participation Statement 2026–27',                  link: '/assets/documents/terms/access-participation-2026.pdf', badge: 'new' },
      { title: 'Archived Access and Participation Statement 2025–26 (superseded)', link: '/assets/documents/terms/access-participation-2025-archived.pdf', badge: 'archived' },
      { title: 'Anti-Bribery and Corruption Policy',                          link: '/assets/documents/policies/anti-bribery-corruption.pdf' },
      { title: 'Conflict of Interest Policy',                                 link: '/assets/documents/policies/conflict-of-interest.pdf' },
      { title: 'Consumer Protection Policy',                                  link: '/assets/documents/policies/consumer-protection.pdf' },
      { title: 'Contingency and Adverse Effects Policy',                      link: '/assets/documents/policies/contingency.pdf' },
      { title: 'Data Protection Policy',                                      link: '/assets/documents/policies/data-protection.pdf' },
      { title: 'Equality, Diversity & Inclusion Policy',                      link: '/assets/documents/policies/equality-diversity-inclusion.pdf' },
      { title: 'Ethics Policy',                                               link: '/assets/documents/policies/ethics.pdf' },
      { title: 'Fraud Management Policy',                                     link: '/assets/documents/policies/fraud-management.pdf' },
      { title: 'Freedom of Speech Policy',                                    link: '/assets/documents/policies/freedom-of-speech.pdf' },
      { title: 'Fitness to Study Policy',                                     link: '/assets/documents/policies/fitness-to-study.pdf' },
      { title: 'Modern Slavery and Human Trafficking Statement (August 2026)', link: '/assets/documents/policies/modern-slavery-human-trafficking.pdf' },
      { title: 'Risk Management Policy',                                      link: '/assets/documents/policies/risk-management.pdf' },
      { title: 'Safeguarding & Prevent Policy',                               link: '/assets/documents/policies/safeguarding-prevent.pdf' },
      { title: 'Sexual Harassment Policy',                                    link: '/assets/documents/policies/sexual-harassment.pdf' },
      { title: 'Strategic Plan (2024–28)',                                    link: '/assets/documents/policies/strategic-plan.pdf' },
      { title: 'Student Protection Plan',                                     link: '/assets/documents/policies/student-protection-plan.pdf' },
      { title: 'Terms and Conditions (Higher Education)',                     link: '/assets/documents/terms/terms-conditions-he.pdf' },
      { title: 'Tuition Fee, Refunds and Compensation Policy (Higher Education)', link: '/assets/documents/terms/tuition-fees-he.pdf' },
    ],
  },
  {
    name: 'Academic Management',
    items: [
      { title: 'Academic Appeals Policy',                                     link: '/assets/documents/policies/academic-appeals.pdf' },
      { title: 'Academic Freedom Policy',                                     link: '/assets/documents/policies/academic-freedom.pdf' },
      { title: 'Academic Misconduct Policy',                                  link: '/assets/documents/policies/academic-misconduct.pdf' },
      { title: 'Assessment Policy',                                           link: '/assets/documents/policies/assessment.pdf' },
      { title: 'Attendance and Engagement Policy',                            link: '/assets/documents/policies/attendance-engagement.pdf' },
      { title: 'Complaints & Appeals Policy',                                 link: '/assets/documents/policies/complaints-and-appeals.pdf' },
      { title: 'Examinations Policy',                                         link: '/assets/documents/policies/examinations.pdf' },
      { title: 'Internal Verification & Quality Assurance Policy',            link: '/assets/documents/policies/internal-verification.pdf' },
      { title: 'Quality Assurance Framework',                                 link: '/assets/documents/policies/quality-assurance-framework.pdf' },
      { title: 'Recognition of Prior Learning Policy',                        link: '/assets/documents/policies/recognition-prior-learning.pdf' },
      { title: 'Special Consideration and Reasonable Adjustments Policy',     link: '/assets/documents/policies/special-consideration.pdf' },
      { title: 'Student Disciplinary Policy',                                 link: '/assets/documents/policies/student-disciplinary.pdf' },
      { title: 'Student Support Policy',                                      link: '/assets/documents/policies/student-support.pdf' },
    ],
  },
  {
    name: 'Student Admissions and Support',
    items: [
      { title: 'Admission Policy',                                            link: '/assets/documents/policies/admissions.pdf' },
      { title: 'Student Recruitment, Registration, and Certification Policy', link: '/assets/documents/policies/student-recruitment-registration.pdf' },
      { title: 'Anti-Bullying and Harassment (Students) Policy',              link: '/assets/documents/policies/anti-bullying.pdf' },
    ],
  },
  {
    name: 'Human Resources',
    items: [
      { title: 'Staff Disciplinary Policy',                                   link: '/assets/documents/policies/staff-disciplinary.pdf' },
      { title: 'Staff Appraisal Policy',                                      link: '/assets/documents/policies/staff-appraisal.pdf' },
      { title: 'Staff Development Policy',                                    link: '/assets/documents/policies/staff-development.pdf' },
      { title: 'Staff Recruitment Policy',                                    link: '/assets/documents/policies/staff-recruitment.pdf' },
    ],
  },
  {
    name: 'Information and Marketing',
    items: [
      { title: 'Online Safety Statement',                                     link: '/assets/documents/policies/online-safety.pdf' },
    ],
  },
  {
    name: 'Health & Safety, Facilities and Resources',
    items: [
      { title: 'Health & Safety Policy',                                      link: '/assets/documents/policies/health-safety.pdf' },
    ],
  },
  {
    name: 'Policies for English Language Courses',
    items: [
      { title: 'Contingency and Adverse Effects Policy (EL Courses)',         link: '/assets/documents/policies/contingency-el.pdf' },
      { title: 'Lesson Observation Policy (EL Courses)',                      link: '/assets/documents/policies/lesson-observation.pdf' },
      { title: 'Sexual Harassment Policy (EL Courses)',                       link: '/assets/documents/policies/sexual-harassment-el.pdf' },
      { title: 'Staff Development Policy (EL Courses)',                       link: '/assets/documents/policies/staff-development-el.pdf' },
      { title: 'Staff Induction Policy (EL Courses)',                         link: '/assets/documents/policies/staff-induction.pdf' },
      { title: 'Staff Recruitment Policy (EL Courses)',                       link: '/assets/documents/policies/staff-recruitment-el.pdf' },
      { title: 'Student Support Policy (EL Courses)',                         link: '/assets/documents/policies/student-support-el.pdf' },
      { title: 'Student Feedback Policy (EL Courses)',                        link: '/assets/documents/policies/student-feedback.pdf' },
      { title: 'Teacher Cover Policy (EL Courses)',                           link: '/assets/documents/policies/teacher-cover.pdf' },
      { title: 'Terms and Conditions (EL Courses)',                           link: '/assets/documents/terms/terms-conditions-el-courses.pdf' },
      { title: 'Tuition Fees, Refunds and Compensation Policy (EL Courses)',  link: '/assets/documents/terms/tuition-fees-el.pdf' },
    ],
  },
];

const Badge = ({ kind }) => {
  if (kind === 'new')      return <span className="policy-badge policy-badge--new">New</span>;
  if (kind === 'archived') return <span className="policy-badge policy-badge--archived">Archived</span>;
  return null;
};

export default function PoliciesPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map(s => ({ ...s, items: s.items.filter(it => it.title.toLowerCase().includes(q)) }))
      .filter(s => s.items.length > 0);
  }, [query]);

  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Policies"
        subtitle="Our governing policies and official documents"
        bgImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro + search */}
        <div className="policies-intro">
          <p>
            Trent Education Centre is committed to transparency and accountability. Our policies
            are organised by area below. Click any policy to open or download the PDF.
          </p>
          <div className="policies-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search policies…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery('')} className="policies-search-clear" aria-label="Clear search">×</button>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="policies-sections">
          {filtered.length === 0 ? (
            <div className="policies-empty">No policies match “{query}”.</div>
          ) : filtered.map((section, si) => (
            <section key={si} className="policy-section">
              <div className="policy-section-head">
                <h2>{section.name}</h2>
                <span className="policy-section-count">{section.items.length}</span>
              </div>

              <ul className="policy-grid">
                {section.items.map((p, i) => (
                  <li key={i}>
                    <a href={p.link} target="_blank" rel="noreferrer" className="policy-card">
                      <span className="policy-card-icon">
                        <FileText size={18} />
                      </span>
                      <span className="policy-card-title">
                        {p.title}
                        {p.badge && <Badge kind={p.badge} />}
                      </span>
                      <ExternalLink size={14} className="policy-card-arrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
