import { FileText, ExternalLink } from 'lucide-react';
import './InnerPage.css';
import PageHero from '../components/PageHero';

const policies = [
  /* ── General / HE Policies (local 2026) ── */
  { title: 'Access and Participation Statement 2026-27', link: '/assets/documents/terms/access-participation-2026.pdf' },
  { title: 'Admissions Policy', link: '/assets/documents/policies/admissions.pdf' },
  { title: 'Academic Appeals Policy', link: '/assets/documents/policies/academic-appeals.pdf' },
  { title: 'Academic Freedom Policy', link: '/assets/documents/policies/academic-freedom.pdf' },
  { title: 'Academic Misconduct Policy', link: '/assets/documents/policies/academic-misconduct.pdf' },
  { title: 'Anti-Bullying and Harassment Policy (Students)', link: '/assets/documents/policies/anti-bullying.pdf' },
  { title: 'Assessment Policy', link: '/assets/documents/policies/assessment.pdf' },
  { title: 'Special Consideration and Reasonable Adjustments Policy', link: '/assets/documents/policies/special-consideration.pdf' },
  { title: 'Complaints and Appeals Policy', link: '/assets/documents/policies/complaints-and-appeals.pdf' },
  { title: 'Fitness to Study Policy', link: '/assets/documents/policies/fitness-to-study.pdf' },
  { title: 'Sexual Harassment Policy', link: '/assets/documents/policies/sexual-harassment.pdf' },
  { title: 'Student Support Policy', link: '/assets/documents/policies/student-support.pdf' },
  { title: 'Staff Recruitment Policy', link: '/assets/documents/policies/staff-recruitment.pdf' },
  { title: 'Staff Development Policy', link: '/assets/documents/policies/staff-development.pdf' },
  { title: 'Teacher Cover Policy', link: '/assets/documents/policies/teacher-cover.pdf' },
  { title: 'Strategic Plan 2024–2028', link: '/assets/documents/policies/strategic-plan-v2.pdf' },
  /* ── Fees & Terms ── */
  { title: 'Tuition Fees, Refunds & Compensation Policy (Higher Education)', link: '/assets/documents/terms/tuition-fees-he.pdf' },
  { title: 'Terms and Conditions (Higher Education)', link: '/assets/documents/terms/terms-conditions-he.pdf' },
  { title: 'Tuition Fees, Refunds & Compensation Policy (English Language)', link: '/assets/documents/terms/tuition-fees-el.pdf' },
  { title: 'Terms and Conditions (English Language Courses)', link: '/assets/documents/terms/terms-conditions-el-courses.pdf' },
  /* ── English Language Course Policies ── */
  { title: 'English Language Lesson Observation Policy', link: '/assets/documents/policies/lesson-observation.pdf' },
  { title: 'English Language Staff Induction Policy', link: '/assets/documents/policies/staff-induction.pdf' },
  { title: 'English Language Student Feedback Policy', link: '/assets/documents/policies/student-feedback.pdf' },
  { title: 'English Language Student Handbook', link: '/assets/documents/handbooks/student-handbook.pdf' },
  { title: 'English Language Teachers Handbook', link: '/assets/documents/handbooks/teachers-handbook.pdf' },
  { title: 'Contingency and Adverse Effects Policy (EL Courses)', link: '/assets/documents/policies/contingency-el-2.pdf' },
];

export default function PoliciesPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Policies"
        subtitle="Our governing policies and official documents"
        bgImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
        bgPosition="center 40%"
      />

      <div className="container inner-content">
        <p style={{ fontSize: '1.05rem', color: 'var(--tec-text-light)', margin: '0 0 36px', textAlign: 'center' }}>
          Trent Education Centre is committed to transparency and accountability. Below you will find
          our key policies and official documents. Click any policy to open or download the PDF.
        </p>

        <div className="policy-list">
          {policies.map((p, i) => (
            <div key={i} className="policy-item">
              <div className="policy-item-title">
                <FileText size={18} style={{ color: 'var(--tec-green)' }} />
                {p.title}
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--tec-gold)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              >
                View PDF <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
