import { Link } from 'react-router-dom';
import { Mail, FileText, Clock, CheckCircle } from 'lucide-react';
import '../InnerPage.css';
import PageHero from '../../components/PageHero';

export default function ComplaintPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Complaints"
        subtitle="Our complaints process"
        bgImage="https://images.unsplash.com/photo-1758519288178-b381ba43b9e1?w=1600&q=80"
        bgPosition="center center"
      />
      <div className="container inner-content">
        <div className="two-col">

          {/* ── Main content ── */}
          <div className="main-col">

            {/* How to complain */}
            <h2 style={{ color: 'var(--tec-green)', marginBottom: '12px' }}>How to complain?</h2>
            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '20px' }}>
              If you are a student or if you are applying to study at Trent Education Centre (TEC),
              you can complain to us about anything you are not satisfied with here:{' '}
              <a href="mailto:complaints@trenteducation.co.uk" style={{ color: 'var(--tec-gold)', fontWeight: 600 }}>
                complaints@trenteducation.co.uk
              </a>.
            </p>

            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '14px' }}>
              When you submit a complaint by email, you need to give us the following information:
            </p>

            <ul style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', paddingLeft: '20px', marginBottom: '28px' }}>
              <li style={{ marginBottom: '8px' }}>Tell us your name and student number if you have one</li>
              <li style={{ marginBottom: '8px' }}>Explain your concern or complaint</li>
              <li style={{ marginBottom: '8px' }}>State what if any steps you have taken to resolve the matter informally</li>
              <li style={{ marginBottom: '8px' }}>State what you want to see happen</li>
              <li style={{ marginBottom: '8px' }}>Add any supporting evidence you may have (e.g., relevant emails or documents)</li>
            </ul>

            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '20px' }}>
              If you prefer, you may find it easier to fill in the{' '}
              <a
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAABGlEu5URE5ZMFgzNElHWDJFVkJUMVM1MzdRWkU4QS4u"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--tec-gold)', fontWeight: 600 }}
              >
                Complaint Form
              </a>{' '}
              on our website instead.
            </p>

            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '20px' }}>
              We will respond to you within three days after receiving your email or complaint form
              and let you know what steps we will take to try and resolve the issue.
            </p>

            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '20px' }}>
              Please read our{' '}
              <a
                href="/assets/documents/policies/complaints-and-appeals.pdf"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--tec-gold)', fontWeight: 600 }}
              >
                Complaints and Appeals Policy
              </a>{' '}
              for more information.
            </p>

            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '40px' }}>
              Where possible, your details will remain confidential, and you will not be penalised
              for making a complaint. We welcome fair and constructive criticism from students and
              applicants that helps us to improve our services.
            </p>

            {/* What will happen next */}
            <h2 style={{ color: 'var(--tec-green)', marginBottom: '20px' }}>What will happen next?</h2>

            <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '24px' }}>
              After you have sent us your complaint by email or using the complaint form, we will
              contact you within three days to let you know the next steps and how long it might take.
              We aim to resolve all complaints within 10 days if possible and no later than a maximum
              of 21 days in total.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'var(--tec-gray)', borderRadius: '12px', padding: '20px 24px' }}>
                <div style={{ color: 'var(--tec-gold)', flexShrink: 0, marginTop: '2px' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <strong style={{ color: 'var(--tec-green)', display: 'block', marginBottom: '6px' }}>Initial response</strong>
                  <p style={{ color: 'var(--tec-text-light)', lineHeight: 1.8, margin: 0, fontSize: '0.92rem' }}>
                    We will contact you within <strong>3 days</strong> of receiving your complaint to
                    let you know the next steps and how long it might take.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'var(--tec-gray)', borderRadius: '12px', padding: '20px 24px' }}>
                <div style={{ color: 'var(--tec-gold)', flexShrink: 0, marginTop: '2px' }}>
                  <Clock size={22} />
                </div>
                <div>
                  <strong style={{ color: 'var(--tec-green)', display: 'block', marginBottom: '6px' }}>Resolution timeframe</strong>
                  <p style={{ color: 'var(--tec-text-light)', lineHeight: 1.8, margin: 0, fontSize: '0.92rem' }}>
                    We aim to resolve all complaints within <strong>10 days</strong> if possible — and
                    no later than a maximum of <strong>21 days</strong> in total.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'var(--tec-gray)', borderRadius: '12px', padding: '20px 24px' }}>
                <div style={{ color: 'var(--tec-gold)', flexShrink: 0, marginTop: '2px' }}>
                  <CheckCircle size={22} />
                </div>
                <div>
                  <strong style={{ color: 'var(--tec-green)', display: 'block', marginBottom: '6px' }}>Confidentiality</strong>
                  <p style={{ color: 'var(--tec-text-light)', lineHeight: 1.8, margin: 0, fontSize: '0.92rem' }}>
                    Where possible, your details will remain confidential, and you will not be
                    penalised for making a complaint.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* ── Sidebar ── */}
          <div className="side-col">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '32px 28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ color: 'var(--tec-green)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Quick Links</h3>

              <a
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAABGlEu5URE5ZMFgzNElHWDJFVkJUMVM1MzdRWkU4QS4u"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'var(--tec-gold)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  borderRadius: '8px',
                  padding: '14px 18px',
                  marginBottom: '12px',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                <FileText size={18} />
                Submit a Complaint
              </a>

              <a
                href="/assets/documents/policies/complaints-and-appeals.pdf"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'var(--tec-green)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  borderRadius: '8px',
                  padding: '14px 18px',
                  marginBottom: '24px',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                <FileText size={18} />
                Complaints Policy (PDF)
              </a>

              <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--tec-text-light)', lineHeight: 1.7, margin: 0 }}>
                  For urgent matters, please contact us directly at{' '}
                  <a href="mailto:complaints@trenteducation.co.uk" style={{ color: 'var(--tec-gold)', fontWeight: 600 }}>
                    complaints@trenteducation.co.uk
                  </a>
                </p>
              </div>
            </div>

            <div style={{ marginTop: '20px', background: 'var(--tec-green)', borderRadius: '12px', padding: '28px' }}>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Need More Help?</h4>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '16px' }}>
                For general enquiries, please visit our Contact Us page or call us directly.
              </p>
              <Link
                to="/contact"
                style={{
                  display: 'inline-block',
                  background: 'var(--tec-gold)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  textDecoration: 'none',
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
