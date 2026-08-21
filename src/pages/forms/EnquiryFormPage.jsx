import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../InnerPage.css';
import './NewStarterFormPage.css';
import { saveSubmission, saveSubmissionToDB, exportToSheets, sendEmailNotification, sendConfirmationEmail } from '../../config/forms';

// ── Course options ─────────────────────────────────────────────────────────────
const ENQUIRY_COURSES = [
  'HNC/HND in Business:  Entrepreneurship and Small Business Management',
  'ATHE Level 5 Extended Diploma in Business and Management',
  'ATHE Level 4 Extended Diploma in Business and Management',
  'ATHE Level 3 Diploma in Business',
  'SIA Level 2 Award for Door Supervisors in the Private Security Industry (BIIAB)',
  'NCFE & Open Awards Level 2 in English',
  'NCFE & Open Awards Level 2 in Mathematics',
  'NCFE & Open Awards Level 1 in English',
  'NCFE & Open Awards Level 1 in Mathematics',
  'ESOL',
  'General English',
  'Other Courses',
];

const OTHER_COURSES = [
  'Functional Skills English',
  'Functional Skills Mathematics',
];

// ── Field helper ───────────────────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div className="nsf-field">
      <label className="nsf-label">
        {label}{required && <span className="nsf-required"> *</span>}
      </label>
      {children}
    </div>
  );
}

// ── Initial state ──────────────────────────────────────────────────────────────
const initialState = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  enquiringAbout: '',
  otherCourses: [],
};

export default function EnquiryFormPage() {
  const navigate = useNavigate();
  const [form, setForm]             = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [errors, setErrors]         = useState({});

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const toggleOther = (option) => {
    setForm(f => ({
      ...f,
      otherCourses: f.otherCourses.includes(option)
        ? f.otherCourses.filter(o => o !== option)
        : [...f.otherCourses, option],
    }));
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.title)             e.title = 'Required';
    if (!form.firstName.trim())  e.firstName = 'Required';
    if (!form.lastName.trim())   e.lastName = 'Required';
    if (!form.email.trim())      e.email = 'Required';
    if (!form.mobile.trim())     e.mobile = 'Required';
    if (!form.enquiringAbout)    e.enquiringAbout = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setSubmitting(true);
    try {
      const entry = saveSubmission('Enquiry Form', { ...form });
      saveSubmissionToDB(entry).catch(console.error);
      await exportToSheets(entry);
      sendEmailNotification(entry).catch(console.error);
      sendConfirmationEmail(entry).catch(console.error);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success ───────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="inner-page page-enter">
        <div className="container inner-content">
          <div className="nsf-success">
            <div className="nsf-success-icon">✓</div>
            <h2>Enquiry Received!</h2>
            <p>Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your enquiry has been successfully submitted.</p>
            <p>A confirmation has been sent to <strong>{form.email}</strong>. Our admissions team will be in touch shortly.</p>
            <button className="nsf-btn-primary" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="inner-page page-enter">
      <div className="container inner-content">

        {Object.keys(errors).length > 0 && (
          <div style={{
            background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 10,
            padding: '12px 18px', marginBottom: 20, color: '#dc2626',
            fontSize: '0.88rem', fontWeight: 600,
          }}>
            ⚠ Please fill in all required fields before submitting.
          </div>
        )}

        <div className="nsf-page-header">
          <h1 className="nsf-page-title">Enquiry Form</h1>
          <p className="nsf-page-sub">Please complete all required fields marked with *</p>
        </div>
        <form className="nsf-form" onSubmit={handleSubmit} noValidate>

          {/* ── Your Details ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Your Details</h2>

            <Field label="Title" required>
              <div className="nsf-radio-group">
                {['Dr.','Miss','Mr.','Mrs.','Ms.','Prof.','Rev.'].map(t => (
                  <label key={t} className={`nsf-radio${errors.title ? ' nsf-input-error' : ''}`}>
                    <input type="radio" name="title" value={t}
                      checked={form.title === t} onChange={() => set('title', t)} />
                    {t}
                  </label>
                ))}
              </div>
              {errors.title && <span className="nsf-error">{errors.title}</span>}
            </Field>

            <div className="nsf-grid-2" style={{ marginTop: 20 }}>
              <Field label="First Name" required>
                <input className={`nsf-input${errors.firstName ? ' nsf-input-error' : ''}`}
                  value={form.firstName} onChange={e => set('firstName', e.target.value)} />
                {errors.firstName && <span className="nsf-error">{errors.firstName}</span>}
              </Field>
              <Field label="Surname" required>
                <input className={`nsf-input${errors.lastName ? ' nsf-input-error' : ''}`}
                  value={form.lastName} onChange={e => set('lastName', e.target.value)} />
                {errors.lastName && <span className="nsf-error">{errors.lastName}</span>}
              </Field>
            </div>

            <div className="nsf-grid-2">
              <Field label="Email" required>
                <input type="email" className={`nsf-input${errors.email ? ' nsf-input-error' : ''}`}
                  value={form.email} onChange={e => set('email', e.target.value)} />
                {errors.email && <span className="nsf-error">{errors.email}</span>}
              </Field>
              <Field label="Mobile" required>
                <input className={`nsf-input${errors.mobile ? ' nsf-input-error' : ''}`}
                  value={form.mobile} onChange={e => set('mobile', e.target.value)} />
                {errors.mobile && <span className="nsf-error">{errors.mobile}</span>}
              </Field>
            </div>
          </div>

          {/* ── Course Enquiry ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Course Enquiry</h2>

            <Field label="I am enquiring about" required>
              <select
                className={`nsf-input${errors.enquiringAbout ? ' nsf-input-error' : ''}`}
                value={form.enquiringAbout}
                onChange={e => {
                  const val = e.target.value;
                  setForm(f => ({ ...f, enquiringAbout: val, otherCourses: val !== 'Other Courses' ? [] : f.otherCourses }));
                  setErrors(err => ({ ...err, enquiringAbout: '' }));
                }}
              >
                <option value="">Select a course</option>
                {ENQUIRY_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.enquiringAbout && <span className="nsf-error">{errors.enquiringAbout}</span>}
            </Field>

            {form.enquiringAbout === 'Other Courses' && (
              <div style={{ marginTop: 16 }}>
                <label className="nsf-label" style={{ marginBottom: 10, display: 'block' }}>
                  Please select the course(s) you are interested in:
                </label>
                <div className="nsf-radio-group nsf-radio-col">
                  {OTHER_COURSES.map(opt => (
                    <label key={opt} className="nsf-radio-label">
                      <input type="checkbox" checked={form.otherCourses.includes(opt)}
                        onChange={() => toggleOther(opt)}
                        style={{ accentColor: '#1a4d2e', width: 16, height: 16 }} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Submit ── */}
          <div className="nsf-submit-row">
            <button type="submit" className="nsf-btn-primary" disabled={submitting}>
              {submitting ? <><span className="nsf-spinner" /> Submitting…</> : 'Submit Enquiry →'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
