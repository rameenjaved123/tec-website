import './InnerPage.css';
import PageHero from '../components/PageHero';

export default function DigitalMarketingExecutivePage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Digital Marketing Executive"
        subtitle="Job description and person specification"
        bgImage="/assets/images/general/site-photo-4.jpg"
        bgPosition="center center"
      />

      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Overview</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              We are looking for a talented and driven Digital Marketing Executive to join our marketing
              team. The successful candidate will design and implement digital marketing campaigns,
              manage our social media profiles, and analyse digital data to optimise marketing strategies.
              This role offers the opportunity to make a significant impact on our brand presence and
              student recruitment efforts.
            </p>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>Key Responsibilities</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}><strong>Course Preparation:</strong> Design and update digital marketing materials and campaign content, ensuring they meet the organisation's objectives and brand guidelines.</li>
              <li style={{ marginBottom: '10px' }}><strong>Campaign Management:</strong> Plan and execute digital marketing campaigns across channels including social media, email, SEO, and paid advertising.</li>
              <li style={{ marginBottom: '10px' }}><strong>Analytics & Reporting:</strong> Monitor campaign performance using analytics tools, preparing regular reports and providing actionable recommendations for improvement.</li>
              <li style={{ marginBottom: '10px' }}><strong>Social Media Management:</strong> Manage and grow the organisation's social media presence, creating engaging content and growing follower communities.</li>
              <li style={{ marginBottom: '10px' }}><strong>Content Creation:</strong> Produce compelling digital content including blog posts, email newsletters, web copy, and promotional materials in line with the brand voice.</li>
              <li style={{ marginBottom: '10px' }}><strong>SEO & Website:</strong> Implement SEO best practices, conduct keyword research, and make recommendations to improve website visibility and organic search rankings.</li>
              <li style={{ marginBottom: '10px' }}><strong>Continuous Learning:</strong> Stay up to date with the latest digital marketing trends, tools, and technologies to ensure the organisation maintains a competitive edge.</li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Need from You</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '32px' }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>Qualifications:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>A degree in Marketing, Communications, Business, or a related field</li>
                  <li>Relevant digital marketing certifications (e.g. Google Analytics, HubSpot) are highly desirable</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Skills:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Proficiency in digital marketing tools and platforms (Google Ads, Meta Ads, Mailchimp, etc.)</li>
                  <li>Strong understanding of SEO/SEM principles and best practices</li>
                  <li>Excellent copywriting and content creation skills</li>
                  <li>Data-driven mindset with strong analytical abilities</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Attributes:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Creative thinker with a passion for digital innovation</li>
                  <li>Self-motivated with strong organisational and time management skills</li>
                  <li>Collaborative team player with excellent communication skills</li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Experience:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  <li>Proven experience in a digital marketing role</li>
                  <li>Demonstrable track record of planning and executing successful digital campaigns</li>
                  <li>Experience in the education sector is advantageous but not essential</li>
                </ul>
              </li>
            </ul>

            <h3 style={{ color: 'var(--tec-green)', marginBottom: '16px', fontSize: '1.25rem' }}>What We Offer</h3>
            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}>Competitive salary commensurate with experience</li>
              <li style={{ marginBottom: '10px' }}>Opportunities for continuous professional development</li>
              <li style={{ marginBottom: '10px' }}>A vibrant and dynamic working environment</li>
              <li style={{ marginBottom: '10px' }}>The chance to shape and grow the digital presence of a leading education provider</li>
            </ul>

          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Digital Marketing Executive</h3>
              <p style={{ color: '#999', fontWeight: 600, fontSize: '0.9rem', marginBottom: '24px' }}>Position Closed</p>
              <div
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 24px',
                  background: '#ccc',
                  color: '#666',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '6px',
                  letterSpacing: '0.5px',
                  cursor: 'not-allowed',
                }}
              >
                Applications Closed
              </div>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.82rem', marginTop: '16px', lineHeight: 1.7 }}>
                This vacancy is no longer accepting applications. Please check the Careers page for current openings.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
