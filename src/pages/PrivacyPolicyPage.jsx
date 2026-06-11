import PageHero from '../components/PageHero';
import './PrivacyPolicyPage.css';

const UPDATED = '1 June 2025';

const TOC = [
  'Who We Are',
  'What We Collect',
  'How We Use It',
  'Legal Basis',
  'Cookies',
  'Sharing Your Data',
  'Data Retention',
  'Your Rights',
  'Security',
  'Third-Party Links',
  'Policy Changes',
  'Contact Us',
];

export default function PrivacyPolicyPage() {
  return (
    <div className="pp-page">
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
        bgImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
        bgPosition="center 35%"
      />

      {/* Summary strip */}
      <div className="pp-summary">
        <div className="container">
          <div className="pp-summary-grid">
            <div className="pp-summary-item">
              <div className="label">Last Updated</div>
              <div className="value">{UPDATED}</div>
            </div>
            <div className="pp-summary-item">
              <div className="label">Data Controller</div>
              <div className="value">Trent Education Centre Ltd</div>
            </div>
            <div className="pp-summary-item">
              <div className="label">Contact</div>
              <div className="value">info@trenteducation.co.uk</div>
            </div>
            <div className="pp-summary-item">
              <div className="label">UK Regulator</div>
              <div className="value">Information Commissioner's Office (ICO)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pp-body">

        {/* Sticky TOC */}
        <nav className="pp-toc" aria-label="Table of contents">
          <h5>Contents</h5>
          <ol>
            {TOC.map((t, i) => (
              <li key={i}>
                <a href={`#s${i + 1}`}>{t}</a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Main sections */}
        <div className="pp-content">

          {/* 1 */}
          <section id="s1" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">1</div>
              <h2>Who We Are</h2>
            </div>
            <p>
              Trent Education Centre Ltd (<strong>"TEC"</strong>, "we", "us", "our") is a private
              further and higher education provider registered in England and Wales. We are the{' '}
              <strong>data controller</strong> for all personal information collected through this
              website and our enrolment processes.
            </p>
            <ul className="pp-list">
              <li><span><strong>Registered address:</strong> Digital House 2.3, Clarendon Park, Nottingham, NG5 1AH</span></li>
              <li><span><strong>Email:</strong> <a href="mailto:info@trenteducation.co.uk">info@trenteducation.co.uk</a></span></li>
              <li><span><strong>Phone:</strong> (+44) 1157950171</span></li>
            </ul>
          </section>

          {/* 2 */}
          <section id="s2" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">2</div>
              <h2>What We Collect</h2>
            </div>

            <h3>Information you give us</h3>
            <ul className="pp-list">
              <li><span><strong>Enquiry &amp; contact forms</strong> — name, email address, phone number, and your message.</span></li>
              <li><span><strong>Application forms</strong> (enrolment, international, IELTS, partnerships) — name, date of birth, nationality, address, qualifications, and any supporting documents you upload.</span></li>
              <li><span><strong>Job applications</strong> — CV, employment history, right-to-work information, and references.</span></li>
              <li><span><strong>Other forms</strong> (complaint, new starter, partnerships) — details relevant to each specific form.</span></li>
            </ul>

            <h3>Information collected automatically</h3>
            <p>
              With your consent, we use <strong>AWS CloudWatch RUM</strong> (Real User Monitoring)
              to collect anonymised technical data:
            </p>
            <ul className="pp-list">
              <li><span>Pages visited and time spent on each page</span></li>
              <li><span>Device type, browser, and operating system</span></li>
              <li><span>Approximate geographic location (country / region only — no IP address stored)</span></li>
              <li><span>Page load performance metrics and JavaScript errors</span></li>
            </ul>
            <div className="pp-callout">
              If you <strong>decline</strong> cookies, RUM is not activated and no analytics data is
              collected about your visit. Your choice is remembered via your browser's local storage.
            </div>
          </section>

          {/* 3 */}
          <section id="s3" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">3</div>
              <h2>How We Use It</h2>
            </div>
            <ul className="pp-list">
              <li><span><strong>Respond to enquiries</strong> — using the contact details you provide to answer your questions.</span></li>
              <li><span><strong>Process applications</strong> — assessing eligibility, enrolling students onto programmes, and communicating course updates.</span></li>
              <li><span><strong>Recruit staff</strong> — reviewing job applications and contacting shortlisted candidates.</span></li>
              <li><span><strong>Improve our website</strong> — using anonymised analytics to identify technical issues and enhance the user experience (only with your consent).</span></li>
              <li><span><strong>Meet legal obligations</strong> — reporting to Ofsted, funding bodies, awarding organisations, and other statutory bodies as required.</span></li>
            </ul>
          </section>

          {/* 4 */}
          <section id="s4" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">4</div>
              <h2>Legal Basis for Processing</h2>
            </div>
            <p>Under UK GDPR, we process your data under one or more of the following lawful bases:</p>
            <div className="pp-basis-grid">
              <div className="pp-basis-chip">
                <strong>Contract</strong>
                <span>Processing required to deliver a course or service you have applied for or enrolled in.</span>
              </div>
              <div className="pp-basis-chip">
                <strong>Legitimate Interests</strong>
                <span>Responding to general enquiries and improving our services, where this does not override your rights.</span>
              </div>
              <div className="pp-basis-chip">
                <strong>Consent</strong>
                <span>Analytics cookies — you can withdraw consent at any time by clearing local storage and revisiting the site.</span>
              </div>
              <div className="pp-basis-chip">
                <strong>Legal Obligation</strong>
                <span>Where processing is required by law, regulation, or a statutory body such as Ofsted or a funding authority.</span>
              </div>
            </div>
          </section>

          {/* 5 */}
          <section id="s5" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">5</div>
              <h2>Cookies</h2>
            </div>
            <p>
              We use a single preference entry (<code>tec_cookie_consent</code>) stored in your
              browser's local storage to remember your cookie choice. No tracking occurs until you
              explicitly accept.
            </p>
            <p>
              If you accept analytics cookies, <strong>AWS CloudWatch RUM</strong> may set additional
              session cookies to maintain continuity for monitoring purposes. These expire
              automatically and do not identify you personally.
            </p>
            <div className="pp-callout">
              To change your preference, clear your browser's cookies and local storage then
              revisit the site — the consent banner will reappear. Alternatively, email us and we
              will assist you.
            </div>
          </section>

          {/* 6 */}
          <section id="s6" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">6</div>
              <h2>Sharing Your Data</h2>
            </div>
            <p>We do not sell your personal data. We may share it only where necessary:</p>
            <ul className="pp-list">
              <li><span><strong>Awarding organisations</strong> (e.g. OTHM, ATHE, Pearson, NCFE, BIIAB) to register students, process results, and issue certificates.</span></li>
              <li><span><strong>Government and funding bodies</strong> where required by law, grant conditions, or regulatory oversight.</span></li>
              <li><span><strong>Amazon Web Services (AWS)</strong> — our website and analytics infrastructure provider, acting as a data processor under a Data Processing Agreement.</span></li>
            </ul>
          </section>

          {/* 7 */}
          <section id="s7" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">7</div>
              <h2>Data Retention</h2>
            </div>
            <table className="pp-retention">
              <thead>
                <tr>
                  <th>Data Type</th>
                  <th>Retention Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Student enrolment records</td>
                  <td>6 years after the academic year of last enrolment (funding body requirement)</td>
                </tr>
                <tr>
                  <td>Unsuccessful job applications</td>
                  <td>6 months after the vacancy closes, unless you consent to future consideration</td>
                </tr>
                <tr>
                  <td>General enquiries</td>
                  <td>Up to 2 years</td>
                </tr>
                <tr>
                  <td>Analytics data (CloudWatch RUM)</td>
                  <td>30 days — automatically purged by AWS</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 8 */}
          <section id="s8" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">8</div>
              <h2>Your Rights</h2>
            </div>
            <p>Under UK GDPR, you have the following rights regarding your personal data:</p>
            <div className="pp-rights-grid">
              {[
                { label: 'Access',        desc: 'Request a copy of the data we hold about you.' },
                { label: 'Rectification', desc: 'Ask us to correct inaccurate or incomplete data.' },
                { label: 'Erasure',       desc: 'Request deletion where there is no lawful reason to retain.' },
                { label: 'Restriction',   desc: 'Ask us to limit processing in certain circumstances.' },
                { label: 'Portability',   desc: 'Receive your data in a structured, machine-readable format.' },
                { label: 'Object',        desc: 'Object to processing based on legitimate interests.' },
              ].map(({ label, desc }) => (
                <div key={label} className="pp-right-card">
                  <div className="icon">{label[0]}</div>
                  <div className="text">
                    <strong>{label}</strong>
                    <span>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pp-callout">
              To exercise any right, email{' '}
              <a href="mailto:info@trenteducation.co.uk">info@trenteducation.co.uk</a>. We will
              respond within <strong>30 days</strong>. You may also lodge a complaint with the{' '}
              <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">
                Information Commissioner's Office (ICO)
              </a>.
            </div>
          </section>

          {/* 9 */}
          <section id="s9" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">9</div>
              <h2>Security</h2>
            </div>
            <p>
              We take appropriate technical and organisational measures to protect your personal
              data against unauthorised access, accidental loss, or disclosure. Our website is
              hosted on <strong>AWS Amplify</strong> and served exclusively over HTTPS with TLS
              encryption. All form submissions are encrypted in transit.
            </p>
          </section>

          {/* 10 */}
          <section id="s10" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">10</div>
              <h2>Third-Party Links</h2>
            </div>
            <p>
              Our website may link to external sites — awarding organisations, government bodies,
              or partner institutions. We are not responsible for the privacy practices of those
              sites and recommend you read their privacy policies before submitting any personal
              information.
            </p>
          </section>

          {/* 11 */}
          <section id="s11" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">11</div>
              <h2>Changes to This Policy</h2>
            </div>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in law,
              technology, or our practices. The <strong>"Last updated"</strong> date in the summary
              strip above will always reflect the most recent version. We encourage you to review
              this page periodically.
            </p>
          </section>

          {/* 12 */}
          <section id="s12" className="pp-section">
            <div className="pp-section-header">
              <div className="pp-num">12</div>
              <h2>Contact Us</h2>
            </div>
            <p>
              For any privacy-related questions, data subject requests, or concerns, please reach
              out to us. We aim to respond to all requests within 30 days.
            </p>
            <ul className="pp-list">
              <li><span><strong>Email:</strong> <a href="mailto:info@trenteducation.co.uk">info@trenteducation.co.uk</a></span></li>
              <li><span><strong>Phone:</strong> (+44) 1157950171</span></li>
              <li><span><strong>Post:</strong> Trent Education Centre Ltd, Digital House 2.3, Clarendon Park, Nottingham, NG5 1AH</span></li>
            </ul>
          </section>

          {/* Bottom CTA */}
          <div className="pp-contact-card">
            <div>
              <h3>Have a privacy question?</h3>
              <p>Our team is happy to help with any data requests or concerns. We respond within 30 days.</p>
            </div>
            <a href="mailto:info@trenteducation.co.uk" className="pp-cta">
              Email Us →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
