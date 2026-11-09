import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../InnerPage.css';
import './NewStarterFormPage.css';
import { saveSubmission, saveSubmissionToDB, sendEmailNotification } from '../../config/forms';

function Field({ label, required, hint, children }) {
  return (
    <div className="nsf-field">
      <label className="nsf-label">{label}{required && <span className="nsf-required"> *</span>}</label>
      {children}
      {hint && <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>{hint}</span>}
    </div>
  );
}

const TITLES = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Other'];
const GENDERS = ['Male', 'Female', 'Prefer not to say'];

const initialState = {
  title: '', firstName: '', lastName: '', email: '', contactNo: '', dob: '', gender: '',
  addressLine1: '', addressLine2: '', postcode: '', city: '',
  nationality: '', countryOfBirth: '', passportId: '', maritalStatus: '', preferredContact: '',
  specialNeedRequired: '', specialNeedDetails: '',
};

export default function ExamRegistrationPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    if (!form.contactNo.trim()) e.contactNo = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        contactNo: form.contactNo.trim(),
        dob: form.dob.trim(),
        gender: form.gender,
        addressLine1: form.addressLine1.trim(),
        addressLine2: form.addressLine2.trim(),
        postcode: form.postcode.trim(),
        city: form.city.trim(),
        nationality: form.nationality.trim(),
        countryOfBirth: form.countryOfBirth.trim(),
        passportId: form.passportId.trim(),
        maritalStatus: form.maritalStatus.trim(),
        preferredContact: form.preferredContact.trim(),
        specialNeedRequired: form.specialNeedRequired || 'No',
        specialNeedDetails: form.specialNeedDetails.trim(),
      };
      const entry = saveSubmission('Exam Only Registration Form', payload);
      await saveSubmissionToDB(entry);
      sendEmailNotification(entry).catch(() => {});
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ submit: 'Something went wrong submitting the form. Please try again, or email admissions@trenteducation.ac.uk.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="inner-page page-enter">
        <div className="container inner-content">
          <div className="nsf-success">
            <div className="nsf-success-icon">✓</div>
            <h2>Registration Received!</h2>
            <p>Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your exam registration has been submitted to Trent Education Centre.</p>
            <p>Our team will review your details and be in touch. For any questions, email <a href="mailto:admissions@trenteducation.ac.uk">admissions@trenteducation.ac.uk</a>.</p>
            <button className="nsf-btn-primary" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inner-page page-enter">
      <div className="container inner-content">

        <div className="nsf-page-header">
          <h1 className="nsf-page-title">Exam Only Registration Form</h1>
          <p className="nsf-page-sub">Please complete all required fields marked with *</p>
        </div>

        {(Object.keys(errors).length > 0) && (
          <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 10,
            padding: '12px 18px', marginBottom: 20, color: '#dc2626', fontSize: '0.88rem', fontWeight: 600 }}>
            ⚠ {errors.submit || 'Please complete all required fields before submitting.'}
          </div>
        )}

        <form className="nsf-form" onSubmit={handleSubmit} noValidate>

          {/* Personal details */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Candidate Details</h2>
            <div className="nsf-grid-2">
              <Field label="Title">
                <select className="nsf-input" value={form.title} onChange={e => set('title', e.target.value)}>
                  <option value="">Select…</option>
                  {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Gender">
                <select className="nsf-input" value={form.gender} onChange={e => set('gender', e.target.value)}>
                  <option value="">Select…</option>
                  {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </Field>
            </div>
            <div className="nsf-grid-2">
              <Field label="First Name" required>
                <input className={`nsf-input${errors.firstName ? ' nsf-input-error' : ''}`}
                  value={form.firstName} onChange={e => set('firstName', e.target.value)} />
                {errors.firstName && <span className="nsf-error">{errors.firstName}</span>}
              </Field>
              <Field label="Last Name" required>
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
              <Field label="Contact No." required>
                <input className={`nsf-input${errors.contactNo ? ' nsf-input-error' : ''}`}
                  value={form.contactNo} onChange={e => set('contactNo', e.target.value)} />
                {errors.contactNo && <span className="nsf-error">{errors.contactNo}</span>}
              </Field>
            </div>
            <div className="nsf-grid-2">
              <Field label="Date of Birth" hint="DD/MM/YYYY">
                <input className="nsf-input" placeholder="DD/MM/YYYY" value={form.dob} onChange={e => set('dob', e.target.value)} />
              </Field>
              <Field label="Preferred Contact" hint="Phone or email you'd prefer we use">
                <input className="nsf-input" value={form.preferredContact} onChange={e => set('preferredContact', e.target.value)} />
              </Field>
            </div>
          </div>

          {/* Address */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Address</h2>
            <Field label="Address Line 1">
              <input className="nsf-input" value={form.addressLine1} onChange={e => set('addressLine1', e.target.value)} />
            </Field>
            <Field label="Address Line 2">
              <input className="nsf-input" value={form.addressLine2} onChange={e => set('addressLine2', e.target.value)} />
            </Field>
            <div className="nsf-grid-2">
              <Field label="Postcode">
                <input className="nsf-input" value={form.postcode} onChange={e => set('postcode', e.target.value)} />
              </Field>
              <Field label="City">
                <input className="nsf-input" value={form.city} onChange={e => set('city', e.target.value)} />
              </Field>
            </div>
          </div>

          {/* Nationality & ID */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Nationality & Identification</h2>
            <div className="nsf-grid-2">
              <Field label="Nationality">
                <input className="nsf-input" value={form.nationality} onChange={e => set('nationality', e.target.value)} />
              </Field>
              <Field label="Country of Birth">
                <input className="nsf-input" value={form.countryOfBirth} onChange={e => set('countryOfBirth', e.target.value)} />
              </Field>
            </div>
            <div className="nsf-grid-2">
              <Field label="Passport ID">
                <input className="nsf-input" value={form.passportId} onChange={e => set('passportId', e.target.value)} />
              </Field>
              <Field label="Marital Status">
                <input className="nsf-input" value={form.maritalStatus} onChange={e => set('maritalStatus', e.target.value)} />
              </Field>
            </div>
          </div>

          {/* Special needs */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Special Needs / Access Arrangements</h2>
            <Field label="Special Need Required?">
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className="nsf-radio">
                    <input type="radio" name="specialNeedRequired" checked={form.specialNeedRequired === v} onChange={() => set('specialNeedRequired', v)} /> {v}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="If yes, please give details"
              hint="Please do not include diagnoses or unnecessary sensitive details.">
              <textarea className="nsf-input" rows={3} value={form.specialNeedDetails} onChange={e => set('specialNeedDetails', e.target.value)} />
            </Field>
          </div>

          <button type="submit" className="nsf-btn-primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}
