import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InnerPage.css';
import './NewStarterFormPage.css'; // reuse same form styles
import { saveSubmission, saveSubmissionToDB, exportToSheets, sendEmailNotification, sendConfirmationEmail } from '../config/forms';

const TITLES = ['Mr.', 'Mrs.', 'Miss', 'Ms.', 'Dr.', 'Prof.', 'Rev.'];

const LEGAL_STATUS_OPTIONS = [
  'An academic institution',
  'A public sector organisation',
  'A charity or voluntary organisation',
  'A non-governmental organisation (NGO)',
  'Ltd',
  'Sole Trader',
];

const SERVICE_OPTIONS = [
  'Consultancy',
  'Training',
  'Collaborations/Partnerships',
];

const COUNTRIES = [
  'United Kingdom','Afghanistan','Albania','Algeria','Andorra','Angola','Argentina',
  'Armenia','Australia','Austria','Azerbaijan','Bahrain','Bangladesh','Belarus',
  'Belgium','Bolivia','Bosnia and Herzegovina','Brazil','Bulgaria','Cambodia',
  'Canada','Chile','China','Colombia','Croatia','Cuba','Cyprus','Czech Republic',
  'Denmark','Egypt','Estonia','Ethiopia','Finland','France','Georgia','Germany',
  'Ghana','Greece','Guatemala','Honduras','Hungary','India','Indonesia','Iran',
  'Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan',
  'Kenya','Kosovo','Kuwait','Latvia','Lebanon','Libya','Lithuania','Luxembourg',
  'Malaysia','Malta','Mexico','Moldova','Morocco','Nepal','Netherlands',
  'New Zealand','Nigeria','Norway','Oman','Pakistan','Palestine','Poland',
  'Portugal','Qatar','Romania','Russia','Saudi Arabia','Serbia','Singapore',
  'Somalia','South Africa','Spain','Sri Lanka','Sweden','Switzerland','Syria',
  'Tanzania','Thailand','Tunisia','Turkey','Uganda','Ukraine','United Arab Emirates',
  'United States','Yemen','Zimbabwe',
];

const INITIAL = {
  title: '',
  firstName: '',
  lastName: '',
  companyName: '',
  legalStatus: '',
  streetAddress: '',
  addressLine2: '',
  city: '',
  stateProvince: '',
  postCode: '',
  country: 'United Kingdom',
  phone: '',
  email: '',
  service: '',
  tellUsMore: '',
  privacyAgreed: false,
};

// Fields to keep as-is (not uppercased)
const SKIP_UPPERCASE = ['email', 'tellUsMore'];

function toUpper(val) {
  return typeof val === 'string' ? val.toUpperCase() : val;
}

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

export default function PartnershipsFormPage() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  function set(key, value) {
    setForm(prev => ({
      ...prev,
      [key]: SKIP_UPPERCASE.includes(key) ? value : toUpper(value),
    }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    if (!form.privacyAgreed) e.privacyAgreed = 'You must agree to the privacy policy';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...form };
      delete payload.privacyAgreed;

      const entry = saveSubmission('Partnerships & Collaborations', payload);
      saveSubmissionToDB(entry).catch(err => console.error('DynamoDB save failed:', err));

      exportToSheets(entry).catch(err => console.error('Sheets sync failed:', err));
      sendEmailNotification(entry).catch(err => console.error('Notification email failed:', err));
      sendConfirmationEmail(entry).catch(err => console.error('Confirmation email failed:', err));

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('Submission failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="nsf-success">
        <div className="nsf-success-icon">✓</div>
        <h2>Form Submitted Successfully</h2>
        <p>
          Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your enquiry has been received.
        </p>
        <p>A member of our team will be in touch shortly.</p>
        <button className="nsf-btn" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <>

      <div className="nsf-page-header">
        <h1 className="nsf-page-title">Partnerships & Collaborations</h1>
        <p className="nsf-page-sub">Please complete all required fields marked with *</p>
      </div>
      <form className="nsf-form" onSubmit={handleSubmit} noValidate>

        {/* ── Section 1: Contact Person ──────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">1. Details Of Main Contact Person</h2>
          <p className="nsf-section-desc">
            Fill in as appropriate. This person must have official permission from your organisation
            to be our main contact. We will send all correspondence about the application to this person.
          </p>

          {/* Company Name */}
          <div className="nsf-row nsf-row--1">
            <Field label="Company Name">
              <input
                className={`nsf-input${errors.companyName ? ' nsf-input-error' : ''}`}
                type="text"
                placeholder="Company name"
                value={form.companyName}
                onChange={e => set('companyName', e.target.value)}
              />
            </Field>
          </div>

          {/* Legal Status */}
          <div className="nsf-row nsf-row--1">
            <Field label="Legal Status of Your Organisation">
              <select
                className={`nsf-input${errors.legalStatus ? ' nsf-input-error' : ''}`}
                value={form.legalStatus}
                onChange={e => set('legalStatus', e.target.value)}
              >
                <option value="">— Select —</option>
                {LEGAL_STATUS_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Title */}
          <div className="nsf-field">
            <label className="nsf-label">Title</label>
            <div className="nsf-radio-group">
              {TITLES.map(t => (
                <label key={t} className="nsf-radio-label">
                  <input
                    type="radio"
                    name="title"
                    value={t}
                    checked={form.title === t}
                    onChange={() => set('title', t)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          {/* First / Last Name */}
          <div className="nsf-row nsf-row--2">
            <Field label="First Name" required>
              <input
                className={`nsf-input${errors.firstName ? ' nsf-input-error' : ''}`}
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={e => set('firstName', e.target.value)}
              />
              {errors.firstName && <span className="nsf-error">{errors.firstName}</span>}
            </Field>
            <Field label="Last Name" required>
              <input
                className={`nsf-input${errors.lastName ? ' nsf-input-error' : ''}`}
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={e => set('lastName', e.target.value)}
              />
              {errors.lastName && <span className="nsf-error">{errors.lastName}</span>}
            </Field>
          </div>

          {/* Address */}
          <div className="nsf-row nsf-row--1">
            <Field label="Street Address">
              <input
                className="nsf-input"
                type="text"
                placeholder="Street address"
                value={form.streetAddress}
                onChange={e => set('streetAddress', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--1">
            <Field label="Address Line 2">
              <input
                className="nsf-input"
                type="text"
                placeholder="Address line 2"
                value={form.addressLine2}
                onChange={e => set('addressLine2', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--2">
            <Field label="City">
              <input
                className="nsf-input"
                type="text"
                placeholder="City"
                value={form.city}
                onChange={e => set('city', e.target.value)}
              />
            </Field>
            <Field label="State / Province">
              <input
                className="nsf-input"
                type="text"
                placeholder="State / Province"
                value={form.stateProvince}
                onChange={e => set('stateProvince', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--2">
            <Field label="Post Code">
              <input
                className="nsf-input"
                type="text"
                placeholder="Post code"
                value={form.postCode}
                onChange={e => set('postCode', e.target.value)}
              />
            </Field>
            <Field label="Country">
              <select
                className="nsf-input"
                value={form.country}
                onChange={e => set('country', e.target.value)}
              >
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Phone / Email */}
          <div className="nsf-row nsf-row--2">
            <Field label="Phone">
              <input
                className="nsf-input"
                type="tel"
                placeholder="+44 ..."
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
              />
            </Field>
            <Field label="Email" required>
              <input
                className={`nsf-input${errors.email ? ' nsf-input-error' : ''}`}
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
              {errors.email && <span className="nsf-error">{errors.email}</span>}
            </Field>
          </div>
        </section>

        {/* ── Section 2: Requirements ────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">2. Your Requirements</h2>
          <p className="nsf-section-desc">Please select the service you are interested in below.</p>

          {/* Service */}
          <div className="nsf-row nsf-row--1">
            <Field label="Service">
              <select
                className="nsf-input"
                value={form.service}
                onChange={e => set('service', e.target.value)}
              >
                <option value="">— Select —</option>
                {SERVICE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Tell us more */}
          <div className="nsf-row nsf-row--1">
            <Field label="Tell Us More">
              <textarea
                className="nsf-input nsf-textarea"
                rows={6}
                placeholder="Please use this space to tell us more about your company and also what your goals are."
                value={form.tellUsMore}
                onChange={e => set('tellUsMore', e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ── Consent ───────────────────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">Consent</h2>
          <label className="nsf-checkbox-label">
            <input
              type="checkbox"
              checked={form.privacyAgreed}
              onChange={e => setForm(prev => ({ ...prev, privacyAgreed: e.target.checked }))}
            />
            I agree to the{' '}
            <a href="/policies" target="_blank" rel="noreferrer" className="nsf-link">
              privacy policy
            </a>{' '}
            and consent to TEC processing my data for partnership purposes.
          </label>
          {errors.privacyAgreed && (
            <span className="nsf-error">{errors.privacyAgreed}</span>
          )}
        </section>

        <div className="nsf-submit-row">
          <button type="submit" className="nsf-btn" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Enquiry'}
          </button>
        </div>
      </form>
    </>
  );
}
