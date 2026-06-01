import { FileText } from 'lucide-react';
import './InnerPage.css';
import './EnglishPoliciesPage.css';
import PageHero from '../components/PageHero';

const policies = [
  { label: 'Contingency and Adverse Effects Policy (EL Courses)',          url: '/assets/documents/policies/contingency-el.pdf' },
  { label: 'English Language Lesson Observation Policy',                    url: '/assets/documents/policies/lesson-observation.pdf' },
  { label: 'English Language Staff Induction Policy',                       url: '/assets/documents/policies/staff-induction.pdf' },
  { label: 'English Language Student Feedback Policy',                      url: '/assets/documents/policies/student-feedback.pdf' },
  { label: 'Sexual Harassment Policy',                                      url: '/assets/documents/policies/sexual-harassment.pdf' },
  { label: 'Staff Development Policy',                                      url: '/assets/documents/policies/staff-development.pdf' },
  { label: 'Staff Recruitment Policy – Trent Education Centre',             url: '/assets/documents/policies/staff-recruitment.pdf' },
  { label: 'Strategic Plan 2024–28',                                        url: '/assets/documents/policies/strategic-plan.pdf' },
  { label: 'Student Support Policy',                                        url: '/assets/documents/policies/student-support.pdf' },
  { label: 'Teacher Cover Policy',                                          url: '/assets/documents/policies/teacher-cover.pdf' },
  { label: 'Terms and Conditions (EL Courses)',                             url: '/assets/documents/terms/terms-conditions-el-courses.pdf' },
  { label: 'Tuition Fees, Refunds and Compensation Policy (EL Courses)',    url: '/assets/documents/terms/tuition-fees-el.pdf' },
];

const handbooks = [
  { label: 'English Language Student Handbook',  url: '/assets/documents/handbooks/student-handbook.pdf' },
  { label: "English Language Teacher's Handbook", url: '/assets/documents/handbooks/teachers-handbook.pdf' },
];

function DocList({ items }) {
  return (
    <ul className="elp-doc-list">
      {items.map((item, i) => (
        <li key={i}>
          <a href={item.url} target="_blank" rel="noreferrer" className="elp-doc-link">
            <span className="elp-doc-icon"><FileText size={17} /></span>
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function EnglishPoliciesPage() {
  return (
    <div className="inner-page page-enter">

      <PageHero
        title="Policies for English Language Courses"
        bgImage="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&q=80"
        bgPosition="20% center"
      />

      <div className="container elp-container">
        <div className="elp-grid">

          {/* ── Policies column ── */}
          <div className="elp-col">
            <h2 className="elp-col-title">Policies for English Language Courses</h2>
            <DocList items={policies} />
          </div>

          {/* ── Handbooks column ── */}
          <div className="elp-col">
            <h2 className="elp-col-title">Handbooks</h2>
            <DocList items={handbooks} />
          </div>

        </div>
      </div>

    </div>
  );
}
