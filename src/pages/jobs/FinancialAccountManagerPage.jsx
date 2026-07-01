import '../InnerPage.css';
import PageHero from '../../components/PageHero';

export default function FinancialAccountManagerPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Financial Account Manager"
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
              <strong>Reference:</strong> HR/TEC/00220
            </p>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '8px' }}>
              <strong>Job Title:</strong> Financial Account Manager
            </p>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '8px' }}>
              <strong>Salary:</strong> £45,000 per annum
            </p>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              <strong>Location:</strong> Digital House 2.3 Clarendon Park, Nottingham, NG5 1AH
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Position Overview</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              The Financial Account Manager is responsible for overseeing all financial and accounting
              activities within an organization. This role involves managing financial reporting,
              budgeting, compliance, and strategic financial planning. The manager ensures the accuracy
              and integrity of financial records, provides financial insights to support decision-making,
              and ensures the organization's financial health and sustainability.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>1. Financial Reporting and Analysis</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Prepare and present accurate and timely financial statements, including income statements, balance sheets, cash flow statements, and other reports.</li>
              <li style={{ marginBottom: '8px' }}>Analyse financial data to identify trends, variances, and opportunities for improvement.</li>
              <li style={{ marginBottom: '8px' }}>Provide insights and recommendations to senior management based on financial analysis.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>2. Budgeting and Forecasting</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Lead the annual budgeting process, working with department heads to develop realistic and achievable budgets.</li>
              <li style={{ marginBottom: '8px' }}>Monitor and report on budget performance, identifying any variances and proposing corrective actions.</li>
              <li style={{ marginBottom: '8px' }}>Prepare financial forecasts and projections to support strategic planning and decision-making.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>3. Compliance and Risk Management</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Ensure compliance with all relevant financial regulations, accounting standards, and tax laws.</li>
              <li style={{ marginBottom: '8px' }}>Manage audits and work with external auditors to ensure accurate and timely completion of financial audits.</li>
              <li style={{ marginBottom: '8px' }}>Develop and implement internal controls to safeguard the organization's assets and ensure the accuracy of financial records.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>4. Accounts Payable and Receivable</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Oversee the accounts payable and receivable functions, ensuring timely and accurate processing of invoices and payments.</li>
              <li style={{ marginBottom: '8px' }}>Monitor cash flow and manage working capital to ensure the organization has adequate liquidity.</li>
              <li style={{ marginBottom: '8px' }}>Implement credit control measures to minimize bad debts and improve collections.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>5. Team Leadership and Development</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Manage and mentor the finance and accounting team, providing guidance, support, and professional development opportunities.</li>
              <li style={{ marginBottom: '8px' }}>Foster a collaborative and high-performance culture within the team.</li>
              <li style={{ marginBottom: '8px' }}>Conduct regular performance evaluations and address any performance issues.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>6. Financial Strategy and Planning</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Support the development and implementation of the organization's financial strategy.</li>
              <li style={{ marginBottom: '8px' }}>Evaluate financial performance and develop strategies to achieve financial goals and objectives.</li>
              <li style={{ marginBottom: '8px' }}>Participate in strategic planning meetings and provide financial insights to inform business decisions.</li>
            </ul>

            <h4 style={{ color: 'var(--tec-text)', marginBottom: '10px', fontSize: '1rem', fontWeight: 700 }}>7. Technology and Systems</h4>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '8px' }}>Oversee the implementation and maintenance of financial systems and software.</li>
              <li style={{ marginBottom: '8px' }}>Ensure the integrity and security of financial data.</li>
              <li style={{ marginBottom: '8px' }}>Leverage technology to improve financial processes and reporting.</li>
            </ul>

            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px', fontStyle: 'italic' }}>
              This job description is not exhaustive, and duties may vary in line with organisational needs.
            </p>

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
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Financial Account Manager</h3>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.85rem', marginBottom: '4px' }}>Nottingham · Full Time</p>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.85rem', marginBottom: '4px' }}>£45,000 per annum</p>
              <p style={{ color: 'var(--tec-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '24px' }}>Now Hiring</p>
              <a
                href="/job-application?job=Financial%20Account%20Manager"
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
