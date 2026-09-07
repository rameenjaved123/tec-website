import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../InnerPage.css';
import './NewStarterFormPage.css';
import { saveSubmission, saveSubmissionToDB } from '../../config/forms';

// ── Module lists (from the Academic Transition Form) ───────────────────────────
const YEAR1 = [
  'Unit 1 (The Contemporary Business Environment)',
  'Unit 2 (Marketing Processes and Planning)',
  'Unit 5 (Accounting Principles)',
  'Unit 8 (Innovation and Commercialisation)',
  'Unit 14 (Digital Business in Practice)',
  'Unit 3 (Human Resource Management)',
  'Unit 4 (Leadership and Management)',
  'Unit 6 (Managing a Successful Business Project)',
];
const YEAR2 = [
  'Unit 19 (Research Project)',
  'Unit 20 (Organisational Behaviour Management)',
  'Unit 34 (Digital Marketing)',
  'Unit 55 (Planning a Social Media Campaign)',
  'Unit 28 (Launching a New Venture)',
  'Unit 33 (Marketing Insights and Analytics)',
  'Unit 35 (Integrated Marketing Communications)',
];
const INDUCTION = [
  'Have you received and accepted the Canvas invitations for your term modules?',
  'Have you accessed the Zoom links for your online classes through Canvas?',
  'Have you received your timetable for the current term?',
  'Have you been informed about your assigned teachers and their email addresses?',
  'Have you been briefed on the attendance policy, including how to notify teachers of any absences?',
  'Have you received training on how to use Canvas effectively?',
  'Do you know how to access your assignment briefs on Canvas?',
  'Have you been shown how to submit your assignments via Turnitin?',
  'Have you received all assignment submission deadlines for the term?',
  'Have you been informed that you are responsible for regularly checking your given email for correspondence?',
  'Have you been made aware that if you fail to pass after three submissions, you may retake the assessment through Trent at an additional cost?',
  'Have you attended a session on Study Skills (citations, referencing, academic integrity, plagiarism, responsible use of AI)?',
];

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
  studentName: '', email: '', intake: '', classDayGroup: '',
  ans: {},                       // Yes/No answers keyed by question label
  experienceFeedback: '',
  mitigatingCircumstances: '',
  acknowledged: false,
};

export default function TransitionFormPage() {
  const navigate = useNavigate();
  const [form, setForm]             = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [errors, setErrors]         = useState({});

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };
  const setAns = (label, value) => setForm(f => ({ ...f, ans: { ...f.ans, [label]: value } }));

  const validate = () => {
    const e = {};
    if (!form.studentName.trim())   e.studentName = 'Required';
    if (!form.email.trim())         e.email = 'Required';
    if (!form.intake.trim())        e.intake = 'Required';
    if (!form.classDayGroup.trim()) e.classDayGroup = 'Required';
    if (![...YEAR1, ...YEAR2].every(u => form.ans[u]))
      e.modules = 'Please answer Yes/No for every module in both years.';
    if (!form.acknowledged)         e.acknowledged = 'You must acknowledge this to continue.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setSubmitting(true);
    try {
      // Flatten into a readable, CMS-friendly payload
      const payload = {
        studentName: form.studentName.trim(),
        email: form.email.trim(),
        intake: form.intake.trim(),
        classDayGroup: form.classDayGroup.trim(),
      };
      YEAR1.forEach(u => { payload[`Year 1 — ${u}`] = form.ans[u] || ''; });
      YEAR2.forEach(u => { payload[`Year 2 — ${u}`] = form.ans[u] || ''; });
      INDUCTION.forEach((q, i) => { payload[`Induction Q${i + 1}: ${q}`] = form.ans[q] || 'Not answered'; });
      payload.experienceFeedback = form.experienceFeedback.trim();
      payload.mitigatingCircumstances = form.mitigatingCircumstances.trim();
      payload.acknowledgedTrentPolicies = form.acknowledged ? 'Yes' : 'No';
      payload.confirmedByStudent = form.studentName.trim();
      payload.confirmedDate = new Date().toLocaleDateString('en-GB');

      const entry = saveSubmission('Academic Transition Form', payload);
      await saveSubmissionToDB(entry);   // backend notifies digitaladmissions@ on submit
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
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
            <h2>Transition Form Received!</h2>
            <p>Thank you, <strong>{form.studentName}</strong>. Your academic transition details have been submitted to Trent Education.</p>
            <p>Our team will be in touch if anything further is needed.</p>
            <button className="nsf-btn-primary" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inner-page page-enter">
      <div className="container inner-content">

        {Object.keys(errors).length > 0 && (
          <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 10,
            padding: '12px 18px', marginBottom: 20, color: '#dc2626', fontSize: '0.88rem', fontWeight: 600 }}>
            ⚠ {errors.modules || errors.acknowledged || 'Please complete all required fields before submitting.'}
          </div>
        )}

        <div className="nsf-page-header">
          <h1 className="nsf-page-title">Academic Transition Form</h1>
          <p className="nsf-page-sub">For BAJ students transitioning to Trent Education. Please complete all required fields marked with *</p>
        </div>

        <form className="nsf-form" onSubmit={handleSubmit} noValidate>

          {/* Your details */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Your Details</h2>
            <div className="nsf-grid-2">
              <Field label="Student Name" required>
                <input className={`nsf-input${errors.studentName ? ' nsf-input-error' : ''}`}
                  value={form.studentName} onChange={e => set('studentName', e.target.value)} />
                {errors.studentName && <span className="nsf-error">{errors.studentName}</span>}
              </Field>
              <Field label="Email" required>
                <input type="email" className={`nsf-input${errors.email ? ' nsf-input-error' : ''}`}
                  value={form.email} onChange={e => set('email', e.target.value)} />
                {errors.email && <span className="nsf-error">{errors.email}</span>}
              </Field>
            </div>
            <div className="nsf-grid-2">
              <Field label="Intake" required>
                <input className={`nsf-input${errors.intake ? ' nsf-input-error' : ''}`}
                  placeholder="e.g. Jan 2025" value={form.intake} onChange={e => set('intake', e.target.value)} />
                {errors.intake && <span className="nsf-error">{errors.intake}</span>}
              </Field>
              <Field label="Class Day and Group" required>
                <input className={`nsf-input${errors.classDayGroup ? ' nsf-input-error' : ''}`}
                  placeholder="e.g. Friday — Group A (On campus)" value={form.classDayGroup}
                  onChange={e => set('classDayGroup', e.target.value)} />
                {errors.classDayGroup && <span className="nsf-error">{errors.classDayGroup}</span>}
              </Field>
            </div>
          </div>

          {/* Previously completed modules */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Previously Completed Modules</h2>
            <p className="nsf-page-sub" style={{ marginTop: -6, marginBottom: 16 }}>
              Please indicate Yes or No for each module — have you previously completed it?
            </p>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '8px 0 12px' }}>Year 1</h3>
            {YEAR1.map(u => (
              <YesNo key={u} label={u} value={form.ans[u]} onChange={v => setAns(u, v)} error={errors.modules && !form.ans[u]} />
            ))}
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '18px 0 12px' }}>Year 2</h3>
            {YEAR2.map(u => (
              <YesNo key={u} label={u} value={form.ans[u]} onChange={v => setAns(u, v)} error={errors.modules && !form.ans[u]} />
            ))}
          </div>

          {/* Induction checklist */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Induction Checklist</h2>
            {INDUCTION.map((q, i) => (
              <YesNo key={q} label={`${i + 1}. ${q}`} value={form.ans[q]} onChange={v => setAns(q, v)} />
            ))}
          </div>

          {/* Feedback */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Your Feedback</h2>
            <Field label="How would you describe your experience of studying so far? What could be improved?">
              <textarea className="nsf-input" rows={4} value={form.experienceFeedback}
                onChange={e => set('experienceFeedback', e.target.value)} />
            </Field>
            <Field label="Any outstanding or mitigating circumstances that may have affected, or could affect, your studies?">
              <textarea className="nsf-input" rows={4} value={form.mitigatingCircumstances}
                onChange={e => set('mitigatingCircumstances', e.target.value)} />
            </Field>
          </div>

          {/* Acknowledgement */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Acknowledgement</h2>
            <label className="nsf-radio-label" style={{ alignItems: 'flex-start', gap: 10 }}>
              <input type="checkbox" checked={form.acknowledged}
                onChange={e => set('acknowledged', e.target.checked)}
                style={{ accentColor: '#1a4d2e', width: 16, height: 16, marginTop: 3 }} />
              <span>
                I understand that I am now subject to Trent Education's policies and procedures, and that the
                previous BAJ policies no longer apply. I can access Trent Education's current policies at{' '}
                <a href="https://trenteducation.ac.uk/policies" target="_blank" rel="noopener noreferrer">
                  trenteducation.ac.uk/policies</a>.
              </span>
            </label>
            {errors.acknowledged && <span className="nsf-error">{errors.acknowledged}</span>}
            <p className="nsf-page-sub" style={{ marginTop: 14 }}>
              By submitting, you confirm the above is accurate. Signing off as <strong>{form.studentName || '—'}</strong> on {new Date().toLocaleDateString('en-GB')}.
            </p>
          </div>

          <div className="nsf-submit-row">
            <button type="submit" className="nsf-btn-primary" disabled={submitting}>
              {submitting ? <><span className="nsf-spinner" /> Submitting…</> : 'Submit Transition Form →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
