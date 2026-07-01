import '../InnerPage.css';
import PageHero from '../../components/PageHero';

export default function FinancialAccountManagerPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Financial Accounts Manager"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/site-photo-3.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '8px', fontSize: '1.25rem' }}>Job Details</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '8px' }}>
              <strong>Salary:</strong> £45,000 per annum
            </p>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '8px' }}>
              <strong>Contract:</strong> Full Time
            </p>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              <strong>Location:</strong> Trent Education Centre
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Purpose</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              The Financial Accounts Manager will be responsible for overseeing the financial operations
              of Trent Education Centre, ensuring accurate financial reporting, effective budget management,
              and full regulatory compliance. This is a key leadership role within the organisation,
              supporting the senior management team in making informed financial decisions.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Financial Management</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Managing day-to-day financial operations including accounts payable and receivable.</li>
              <li style={{ marginBottom: '8px' }}>Preparing monthly, quarterly and annual financial statements and management accounts.</li>
              <li style={{ marginBottom: '8px' }}>Overseeing payroll processing and ensuring accuracy and compliance.</li>
              <li style={{ marginBottom: '8px' }}>Managing cash flow forecasting and treasury functions.</li>
              <li style={{ marginBottom: '8px' }}>Conducting bank reconciliations and maintaining accurate financial records.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Budgeting &amp; Reporting</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Leading the annual budgeting and forecasting process in collaboration with senior leadership.</li>
              <li style={{ marginBottom: '8px' }}>Monitoring budget performance and providing variance analysis with actionable insights.</li>
              <li style={{ marginBottom: '8px' }}>Producing financial reports for the Board and senior management team.</li>
              <li style={{ marginBottom: '8px' }}>Supporting grant reporting and funding compliance requirements.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Compliance &amp; Audit</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Ensuring compliance with all statutory and regulatory financial requirements.</li>
              <li style={{ marginBottom: '8px' }}>Coordinating and supporting the annual external audit process.</li>
              <li style={{ marginBottom: '8px' }}>Maintaining and improving internal financial controls and procedures.</li>
              <li style={{ marginBottom: '8px' }}>Ensuring VAT returns, PAYE and other tax obligations are met on time.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Leadership &amp; Teamwork</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '8px' }}>Supporting and mentoring finance team members.</li>
              <li style={{ marginBottom: '8px' }}>Working closely with the senior management team to provide strategic financial guidance.</li>
              <li style={{ marginBottom: '8px' }}>Identifying opportunities for cost savings and financial efficiency improvements.</li>
              <li style={{ marginBottom: '8px' }}>Attending management meetings and contributing to organisational planning.</li>
            </ul>

            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px', fontStyle: 'italic' }}>
              This job description is not exhaustive, and duties may vary in line with organisational needs.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Person Specification</h3>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Essential Qualifications, Knowledge and Skills</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>ACA, ACCA, CIMA or equivalent professional accounting qualification</li>
              <li style={{ marginBottom: '8px' }}>Proven experience in a financial management or senior accounts role</li>
              <li style={{ marginBottom: '8px' }}>Strong knowledge of UK accounting standards and financial regulations</li>
              <li style={{ marginBottom: '8px' }}>Excellent analytical and numerical skills with strong attention to detail</li>
              <li style={{ marginBottom: '8px' }}>Proficiency in accounting software and Microsoft Excel</li>
              <li style={{ marginBottom: '8px' }}>Ability to communicate financial information clearly to non-financial stakeholders</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>Desirable Qualifications, Knowledge and Skills</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '8px' }}>Experience working in the education or charity sector</li>
              <li style={{ marginBottom: '8px' }}>Knowledge of funding and grant compliance requirements</li>
              <li style={{ marginBottom: '8px' }}>Experience managing and developing finance team members</li>
              <li style={{ marginBottom: '8px' }}>Familiarity with payroll systems and HR-related financial processes</li>
            </ul>

            <div style={{ background: 'var(--tec-gray)', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
              <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', margin: 0 }}>
                <strong>Please note:</strong> All applicants must provide two referees that we can contact directly.
                Any offer of work will be conditional upon the receipt of two satisfactory references.
                To apply, please send your CV and a short cover letter using the <strong>Apply Now</strong> button.
              </p>
            </div>

          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Financial Accounts Manager</h3>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.85rem', marginBottom: '4px' }}>Full Time · £45,000 p/a</p>
              <p style={{ color: 'var(--tec-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '24px' }}>Now Hiring</p>
              <a
                href="/job-application?job=Financial%20Accounts%20Manager"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 24px',
                  background: 'var(--tec-green)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 14px rgba(26,58,42,0.2)',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--tec-gold)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--tec-green)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Apply Now →
              </a>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.82rem', marginTop: '16px', lineHeight: 1.7 }}>
                To apply, click the button above or visit the Careers page for more details.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
