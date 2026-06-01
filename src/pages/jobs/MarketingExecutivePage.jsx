import '../InnerPage.css';
import PageHero from '../../components/PageHero';

export default function MarketingExecutivePage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Marketing Executive"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/site-photo-5.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Overview</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              The primary objective of the Marketing Executive role within TEC is to work with the
              management and other team members to identify and profile target audience, both in terms
              of users and buyers. Moreover, as a Marketing Executive, you will be responsible for
              assisting in the execution and function of online and offline marketing strategies to
              ensure that the company's key messages are communicated effectively.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}>To assist in the production and publication of promotional materials including brochures, application forms, newsletters, fact sheets, and posters. This includes supporting copywriting, proofreading, liaising with our management and designers, and liaising with external branding agencies.</li>
              <li style={{ marginBottom: '10px' }}>Responsible for performing key competitor analysis including price lists, brochures, courses, and locations.</li>
              <li style={{ marginBottom: '10px' }}>To assist or coordinate in the in-house production and maintenance of information packs and fact sheets, ensuring timely delivery of new and updated materials.</li>
              <li style={{ marginBottom: '10px' }}>To assist in producing content for various channels of communication, such as social media, email, adverts, and landing pages.</li>
              <li style={{ marginBottom: '10px' }}>Support the agent sales team with materials requests as well as forms, questionnaires, and platforms.</li>
              <li style={{ marginBottom: '10px' }}>Ensure all marketing campaigns reflect the wider business goals and strategy — agree with relevant persons to ensure aligned messaging throughout all marketing activities.</li>
              <li style={{ marginBottom: '10px' }}>Review website performance and make recommendations for site improvement and optimisation.</li>
              <li style={{ marginBottom: '10px' }}>To track and record the student leads to assist in economical lead generation and executing marketing campaigns.</li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>General Duties</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}>Develop and implement marketing strategies to promote company products or services.</li>
              <li style={{ marginBottom: '10px' }}>Conduct market research to identify potential customers and evaluate market trends.</li>
              <li style={{ marginBottom: '10px' }}>Create and manage marketing campaigns across various channels, including digital, print, and social media.</li>
              <li style={{ marginBottom: '10px' }}>Develop sales strategies and achieve revenue targets.</li>
              <li style={{ marginBottom: '10px' }}>Build and maintain relationships with key clients through effective account management.</li>
              <li style={{ marginBottom: '10px' }}>Identify new business opportunities and develop strategies for business development.</li>
              <li style={{ marginBottom: '10px' }}>Stay updated on industry trends and competitor activities to ensure a competitive edge.</li>
              <li style={{ marginBottom: '10px' }}>Prepare reports on marketing activities, sales performance, and market trends.</li>
              <li style={{ marginBottom: '10px' }}>Being aware of, and upholding the company's policies and procedures, and when appropriate contribute to the development of them.</li>
              <li style={{ marginBottom: '10px' }}>Being aware of confidentiality issues linked to home/student/teacher/college work and to keep confidences as appropriate in line with Safeguarding Policy.</li>
              <li style={{ marginBottom: '10px' }}>To undertake duties elsewhere within the Support Team as required.</li>
              <li style={{ marginBottom: '10px' }}>To ensure a safe working environment in accordance with Health and Safety Regulations.</li>
              <li style={{ marginBottom: '10px' }}>To attend appropriate training events and meetings as required.</li>
              <li style={{ marginBottom: '10px' }}>To attend meetings as required e.g. whole staff meetings, student reviews, as appropriate.</li>
              <li style={{ marginBottom: '10px' }}>To comply with the requirements of equal opportunities, data protection, copyright and other relevant legislation and Company policy.</li>
              <li style={{ marginBottom: '10px' }}>To participate in networking events, graduation ceremonies, and conferences.</li>
            </ul>
          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Marketing Executive</h3>
              <p style={{ color: 'var(--tec-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '24px' }}>Now Hiring: 1 Position</p>
              <a
                href="/job-application?job=Marketing%20Executive"
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
