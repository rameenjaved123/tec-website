import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../InnerPage.css';
import './NewStarterFormPage.css';
import { saveSubmission, saveSubmissionToDB } from '../../config/forms';

function Field({ label, required, children }) {
  return (
    <div className="nsf-field">
      <label className="nsf-label">{label}{required && <span className="nsf-required"> *</span>}</label>
      {children}
    </div>
  );
}

function YesNo({ label, value, onChange, error }) {
  return (
    <div className="nsf-field" style={{ marginBottom: 14 }}>
      <label className="nsf-label" style={{ fontWeight: 500 }}>{label}</label>
      <div className="nsf-radio-group">
        {['Yes', 'No'].map(v => (
          <label key={v} className={`nsf-radio${error ? ' nsf-input-error' : ''}`}>
            <input type="radio" checked={value === v} onChange={() => onChange(v)} /> {v}
          </label>
        ))}
      </div>
    </div>
  );
}

const initialState = {
  studentName: '', studentId: '', email: '', programme: '', assessmentDeadline: '', tutorAssessor: '',
  deadlineExtension: '', specialConsideration: '',
  circumstances: '', evidenceAttached: '', evidenceDescription: '',
  requestingExtension: '', proposedSubmissionDate: '', requestingSpecialConsiderations: '',
  declarationAgreed: false, signature: '',
};

export default function MitigatingCircumstancesFormPage() {
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
    if (!form.studentName.trim())   e.studentName = 'Required';
    if (!form.email.trim())         e.email = 'Required';
    if (!form.circumstances.trim()) e.circumstances = 'Please describe your mitigating circumstances.';
    if (!form.declarationAgreed)    e.declarationAgreed = 'You must confirm the declaration to submit.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setSubmitting(true);
    try {
      const payload = {
        // structured keys (mapped to columns on the backend)
        studentName: form.studentName.trim(),
        studentId: form.studentId.trim(),
        email: form.email.trim(),
        programme: form.programme.trim(),
        // readable fields
        'Assessment / Exam & Deadline': form.assessmentDeadline.trim(),
        'Tutor / Assessor': form.tutorAssessor.trim(),
        'Deadline Extension (before the deadline)': form.deadlineExtension || 'Not answered',
        'Special Consideration (after the deadline)': form.specialConsideration || 'Not answered',
        'Mitigating Circumstances': form.circumstances.trim(),
        'Evidence attached to support the request?': form.evidenceAttached || 'Not answered',
        'Description of the evidence': form.evidenceDescription.trim(),
        'Requesting an extension?': form.requestingExtension || 'Not answered',
        'Proposed date able to submit work': form.proposedSubmissionDate || '',
        'Requesting special considerations?': form.requestingSpecialConsiderations || 'Not answered',
        'Declaration confirmed': form.declarationAgreed ? 'Yes' : 'No',
        'Signature (student)': form.signature.trim() || form.studentName.trim(),
        'Date': new Date().toLocaleDateString('en-GB'),
      };
      const entry = saveSubmission('Mitigating Circumstances Form', payload);
      await saveSubmissionToDB(entry);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ submit: 'Something went wrong submitting the form. Please try again, or email mitcircs@trenteducation.ac.uk.' });
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
            <h2>Mitigating Circumstances Form Received!</h2>
            <p>Thank you, <strong>{form.studentName}</strong>. Your request has been submitted to Trent Education.</p>
            <p>Our team will review your request and be in touch. If you have supporting evidence, please email it to <a href="mailto:mitcircs@trenteducation.ac.uk">mitcircs@trenteducation.ac.uk</a>.</p>
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
          <h1 className="nsf-page-title">Mitigating Circumstances Form</h1>
          <p className="nsf-page-sub">Please complete all required fields marked with *</p>
        </div>

        <div style={{ background: 'linear-gradient(135deg,#eaf3ee,#f5faf7)', border: '1px solid #d6e6dc',
          borderRadius: 12, padding: '16px 20px', marginBottom: 24, color: '#294b38', lineHeight: 1.6 }}>
          This Mitigating Circumstances Form is for students requesting a <strong>deadline extension</strong> (pre-assessment)
          or <strong>Special Consideration</strong> (post-assessment). Complete this form and, if you have supporting
          evidence, email it to <a href="mailto:mitcircs@trenteducation.ac.uk">mitcircs@trenteducation.ac.uk</a>.
        </div>

        {(Object.keys(errors).length > 0) && (
          <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 10,
            padding: '12px 18px', marginBottom: 20, color: '#dc2626', fontSize: '0.88rem', fontWeight: 600 }}>
            ⚠ {errors.submit || errors.circumstances || errors.declarationAgreed || 'Please complete all required fields before submitting.'}
          </div>
        )}

        <form className="nsf-form" onSubmit={handleSubmit} noValidate>

          {/* Student Details */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Student Details</h2>
            <div className="nsf-grid-2">
              <Field label="Student's Full Name" required>
                <input className={`nsf-input${errors.studentName ? ' nsf-input-error' : ''}`}
                  value={form.studentName} onChange={e => set('studentName', e.target.value)} />
                {errors.studentName && <span className="nsf-error">{errors.studentName}</span>}
              </Field>
              <Field label="Email Address" required>
                <input type="email" className={`nsf-input${errors.email ? ' nsf-input-error' : ''}`}
                  value={form.email} onChange={e => set('email', e.target.value)} />
                {errors.email && <span className="nsf-error">{errors.email}</span>}
              </Field>
            </div>
            <div className="nsf-grid-2">
              <Field label="Student ID">
                <input className="nsf-input" value={form.studentId} onChange={e => set('studentId', e.target.value)} />
              </Field>
              <Field label="Programme">
                <input className="nsf-input" value={form.programme} onChange={e => set('programme', e.target.value)} />
              </Field>
            </div>
            <div className="nsf-grid-2">
              <Field label="Assessment / Exam & Deadline">
                <input className="nsf-input" placeholder="e.g. Unit 5 assignment — due 30 Oct 2026"
                  value={form.assessmentDeadline} onChange={e => set('assessmentDeadline', e.target.value)} />
              </Field>
              <Field label="Tutor / Assessor">
                <input className="nsf-input" value={form.tutorAssessor} onChange={e => set('tutorAssessor', e.target.value)} />
              </Field>
            </div>
          </div>

          {/* Request */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Request</h2>
            <div className="nsf-grid-2">
              <YesNo label="Deadline Extension (before the deadline)" value={form.deadlineExtension} onChange={v => set('deadlineExtension', v)} />
              <YesNo label="Special Consideration (after the deadline)" value={form.specialConsideration} onChange={v => set('specialConsideration', v)} />
            </div>

            <Field label="What are your mitigating circumstances (e.g. illness, injury or other)? Explain what has happened and how it has affected your ability to submit your work or sit an exam, or how your performance has been affected post-assessment." required>
              <textarea className={`nsf-input${errors.circumstances ? ' nsf-input-error' : ''}`} rows={5}
                value={form.circumstances} onChange={e => set('circumstances', e.target.value)} />
              {errors.circumstances && <span className="nsf-error">{errors.circumstances}</span>}
            </Field>

            <YesNo label="Have you attached evidence to support your request?" value={form.evidenceAttached} onChange={v => set('evidenceAttached', v)} />

            <Field label="Describe the evidence you have for the reasons given.">
              <textarea className="nsf-input" rows={3} value={form.evidenceDescription} onChange={e => set('evidenceDescription', e.target.value)} />
            </Field>

            <div className="nsf-grid-2">
              <YesNo label="Are you requesting an extension?" value={form.requestingExtension} onChange={v => set('requestingExtension', v)} />
              <Field label="If YES, the date you will be able to submit your work">
                <input type="date" className="nsf-input" value={form.proposedSubmissionDate} onChange={e => set('proposedSubmissionDate', e.target.value)} />
                <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>The Programme Leader may not agree to your selected date of submission.</span>
              </Field>
            </div>

            <YesNo label="Are you requesting special considerations?" value={form.requestingSpecialConsiderations} onChange={v => set('requestingSpecialConsiderations', v)} />
          </div>

          {/* Declaration */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Student Declaration</h2>
            <label className={`nsf-checkbox${errors.declarationAgreed ? ' nsf-input-error' : ''}`}
              style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', lineHeight: 1.6 }}>
              <input type="checkbox" checked={form.declarationAgreed}
                onChange={e => set('declarationAgreed', e.target.checked)} style={{ marginTop: 4 }} />
              <span>I confirm that the information provided in this form is accurate and truthful. I understand that providing false information may result in disciplinary action. <span className="nsf-required">*</span></span>
            </label>
            {errors.declarationAgreed && <span className="nsf-error">{errors.declarationAgreed}</span>}

            <div className="nsf-grid-2" style={{ marginTop: 16 }}>
              <Field label="Signature (type your full name)">
                <input className="nsf-input" value={form.signature} onChange={e => set('signature', e.target.value)} placeholder={form.studentName} />
              </Field>
              <Field label="Date">
                <input className="nsf-input" value={new Date().toLocaleDateString('en-GB')} readOnly disabled />
              </Field>
            </div>
          </div>

          <button type="submit" className="nsf-btn-primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Form'}
          </button>
        </form>
      </div>
    </div>
  );
}
