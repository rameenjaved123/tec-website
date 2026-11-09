import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../InnerPage.css';
import './NewStarterFormPage.css';
import { uploadToS3, saveSubmission, saveSubmissionToDB, sendEmailNotification, sendConfirmationEmail } from '../../config/forms';

function Field({ label, required, hint, children }) {
  return (
    <div className="nsf-field">
      <label className="nsf-label">{label}{required && <span className="nsf-required"> *</span>}</label>
      {children}
      {hint && <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>{hint}</span>}
    </div>
  );
}

const LEVELS = ['Entry 1', 'Entry 2', 'Entry 3', 'Level 1', 'Level 2', 'Not applicable'];
const ENGLISH_ASSESSMENTS = ['Full qualification', 'Reading', 'Writing', 'Speaking, Listening and Communicating', 'Not applicable'];
const LOCATIONS = ['Nottingham', 'Leicester', 'Birmingham', 'Other', 'No preference'];

const initialState = {
  // A. Candidate information
  fullName: '', dob: '', email: '', mobile: '', address: '', uln: '', previousAwardingBody: '',
  // B. Examination requirements
  subject: '', englishLevel: '', mathsLevel: '',
  englishAssessments: [], mathsAssessment: '',
  firstAttempt: '', passedEnglishComponents: '', passedComponentsDetails: '',
  preferredDate: '', examLocation: '', examLocationOther: '',
  // C. Access arrangements
  accessArrangements: '', accessDescription: '',
  // D. Supporting documents (optional for now)
  idDoc: null, addressDoc: null, photo: null,
  // E. Declarations
  declExamOnly: false, declBooking: false, declAccurate: false, declPrivacy: false,
  declarationName: '',
};

export default function ExamOnlyRegistrationPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const toggleAssessment = (v) => {
    setForm(f => {
      const has = f.englishAssessments.includes(v);
      return { ...f, englishAssessments: has ? f.englishAssessments.filter(x => x !== v) : [...f.englishAssessments, v] };
    });
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    if (!form.mobile.trim()) e.mobile = 'Required';
    if (!form.subject) e.subject = 'Please select a subject.';
    if (!form.declExamOnly || !form.declBooking || !form.declAccurate || !form.declPrivacy) {
      e.declarations = 'You must acknowledge all four declarations to submit.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setSubmitting(true);
    try {
      const payload = {
        // structured keys (mapped to columns on the backend)
        fullName: form.fullName.trim(),
        dob: form.dob.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        uln: form.uln.trim(),
        subject: form.subject,
        englishLevel: form.englishLevel || 'Not applicable',
        mathsLevel: form.mathsLevel || 'Not applicable',
        examLocation: form.examLocation === 'Other' && form.examLocationOther.trim()
          ? `Other — ${form.examLocationOther.trim()}` : (form.examLocation || 'No preference'),
        firstAttempt: form.firstAttempt || 'Not answered',
        preferredDate: form.preferredDate.trim(),
        // readable fields
        'Home address and postcode': form.address.trim(),
        'Previous awarding organisation / candidate number': form.previousAwardingBody.trim(),
        'English assessment(s) required': form.englishAssessments.join(', ') || 'Not applicable',
        'Mathematics assessment required': form.mathsAssessment || 'Not applicable',
        'Previously passed any English components?': form.passedEnglishComponents || 'Not answered',
        'Components passed (awarding org & dates)': form.passedComponentsDetails.trim(),
        'Access arrangements required?': form.accessArrangements || 'Not answered',
        'Access arrangements — support requested': form.accessDescription.trim(),
        'Declaration — exam-only / no tuition': form.declExamOnly ? 'Acknowledged' : 'No',
        'Declaration — booking not confirmed until written confirmation': form.declBooking ? 'Acknowledged' : 'No',
        'Declaration — information accurate / rules & ID checks': form.declAccurate ? 'Acknowledged' : 'No',
        'Declaration — data processing & awarding-body sharing': form.declPrivacy ? 'Acknowledged' : 'No',
        'Electronic declaration name': form.declarationName.trim() || form.fullName.trim(),
        'Date of declaration': new Date().toLocaleDateString('en-GB'),
      };

      // Optional supporting documents → S3
      if (form.idDoc) {
        const { fileUrl } = await uploadToS3(form.idDoc, 'exam-only/proof-of-id');
        payload.proofOfIdUrl = fileUrl;
      }
      if (form.addressDoc) {
        const { fileUrl } = await uploadToS3(form.addressDoc, 'exam-only/proof-of-address');
        payload.proofOfAddressUrl = fileUrl;
      }
      if (form.photo) {
        const { fileUrl } = await uploadToS3(form.photo, 'exam-only/photo');
        payload.photoUrl = fileUrl;
      }

      const entry = saveSubmission('Functional Skills — Exam-Only Registration', payload);
      await saveSubmissionToDB(entry);
      // Fire-and-forget notifications (never block the confirmation)
      sendEmailNotification(entry).catch(() => {});
      sendConfirmationEmail(entry).catch(() => {});
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
            <h2>Registration Enquiry Received!</h2>
            <p>Thank you, <strong>{form.fullName}</strong>. Your Functional Skills exam-only registration has been submitted to Trent Education Centre.</p>
            <p>This is an enquiry and does not confirm a booking. Our examinations office will review availability, eligibility, fees and identity requirements and will be in touch in writing. For any questions, email <a href="mailto:admissions@trenteducation.ac.uk">admissions@trenteducation.ac.uk</a>.</p>
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
          <h1 className="nsf-page-title">Functional Skills — Exam-Only Registration</h1>
          <p className="nsf-page-sub">External / private candidates · English and Mathematics · Entry 1 – Level 2</p>
        </div>

        <div style={{ background: 'linear-gradient(135deg,#eaf3ee,#f5faf7)', border: '1px solid #d6e6dc',
          borderRadius: 12, padding: '16px 20px', marginBottom: 24, color: '#294b38', lineHeight: 1.6 }}>
          This application is for <strong>examination-only candidates</strong>; tuition is not included. Submission is an
          enquiry and does <strong>not</strong> confirm an examination booking. TEC will confirm availability, eligibility,
          fees, identity checks and assessment arrangements in writing. Fields marked <span className="nsf-required">*</span> are required.
        </div>

        {(Object.keys(errors).length > 0) && (
          <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 10,
            padding: '12px 18px', marginBottom: 20, color: '#dc2626', fontSize: '0.88rem', fontWeight: 600 }}>
            ⚠ {errors.submit || errors.declarations || errors.subject || 'Please complete all required fields before submitting.'}
          </div>
        )}

        <form className="nsf-form" onSubmit={handleSubmit} noValidate>

          {/* A. Candidate information */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">A. Candidate Information</h2>
            <Field label="Full legal name (as shown on identification)" required>
              <input className={`nsf-input${errors.fullName ? ' nsf-input-error' : ''}`}
                value={form.fullName} onChange={e => set('fullName', e.target.value)} />
              {errors.fullName && <span className="nsf-error">{errors.fullName}</span>}
            </Field>
            <div className="nsf-grid-2">
              <Field label="Date of birth" hint="DD/MM/YYYY">
                <input className="nsf-input" placeholder="DD/MM/YYYY" value={form.dob} onChange={e => set('dob', e.target.value)} />
              </Field>
              <Field label="Mobile telephone number" required>
                <input className={`nsf-input${errors.mobile ? ' nsf-input-error' : ''}`}
                  value={form.mobile} onChange={e => set('mobile', e.target.value)} />
                {errors.mobile && <span className="nsf-error">{errors.mobile}</span>}
              </Field>
            </div>
            <Field label="Email address" required>
              <input type="email" className={`nsf-input${errors.email ? ' nsf-input-error' : ''}`}
                value={form.email} onChange={e => set('email', e.target.value)} />
              {errors.email && <span className="nsf-error">{errors.email}</span>}
            </Field>
            <Field label="Home address and postcode">
              <textarea className="nsf-input" rows={2} value={form.address} onChange={e => set('address', e.target.value)} />
            </Field>
            <div className="nsf-grid-2">
              <Field label="Unique Learner Number (ULN)" hint="If known">
                <input className="nsf-input" value={form.uln} onChange={e => set('uln', e.target.value)} />
              </Field>
              <Field label="Previous awarding organisation & candidate number" hint="If known">
                <input className="nsf-input" value={form.previousAwardingBody} onChange={e => set('previousAwardingBody', e.target.value)} />
              </Field>
            </div>
          </div>

          {/* B. Examination requirements */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">B. Examination Requirements</h2>
            <Field label="Subject(s) required" required>
              <div className="nsf-radio-group">
                {['English', 'Mathematics', 'Both'].map(v => (
                  <label key={v} className={`nsf-radio${errors.subject ? ' nsf-input-error' : ''}`}>
                    <input type="radio" name="subject" checked={form.subject === v} onChange={() => set('subject', v)} /> {v}
                  </label>
                ))}
              </div>
              {errors.subject && <span className="nsf-error">{errors.subject}</span>}
            </Field>
            <div className="nsf-grid-2">
              <Field label="Level required — English">
                <select className="nsf-input" value={form.englishLevel} onChange={e => set('englishLevel', e.target.value)}>
                  <option value="">Select…</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Level required — Mathematics">
                <select className="nsf-input" value={form.mathsLevel} onChange={e => set('mathsLevel', e.target.value)}>
                  <option value="">Select…</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </Field>
            </div>
            <Field label="English assessment(s) required" hint="Subject to awarding-body arrangements — tick all that apply">
              <div className="nsf-radio-group" style={{ flexWrap: 'wrap' }}>
                {ENGLISH_ASSESSMENTS.map(v => (
                  <label key={v} className="nsf-radio">
                    <input type="checkbox" checked={form.englishAssessments.includes(v)} onChange={() => toggleAssessment(v)} /> {v}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Mathematics assessment required">
              <div className="nsf-radio-group">
                {['Full qualification / assessment', 'Resit', 'Not applicable'].map(v => (
                  <label key={v} className="nsf-radio">
                    <input type="radio" name="mathsAssessment" checked={form.mathsAssessment === v} onChange={() => set('mathsAssessment', v)} /> {v}
                  </label>
                ))}
              </div>
            </Field>
            <div className="nsf-grid-2">
              <Field label="Is this your first attempt?">
                <div className="nsf-radio-group">
                  {['First attempt', 'Resit', 'Not sure'].map(v => (
                    <label key={v} className="nsf-radio">
                      <input type="radio" name="firstAttempt" checked={form.firstAttempt === v} onChange={() => set('firstAttempt', v)} /> {v}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Have you previously passed any English components?">
                <div className="nsf-radio-group">
                  {['Yes', 'No', 'Not sure', 'Not applicable'].map(v => (
                    <label key={v} className="nsf-radio">
                      <input type="radio" name="passedEnglish" checked={form.passedEnglishComponents === v} onChange={() => set('passedEnglishComponents', v)} /> {v}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
            <Field label="If yes, list components passed, awarding organisation and approximate dates">
              <textarea className="nsf-input" rows={2} value={form.passedComponentsDetails} onChange={e => set('passedComponentsDetails', e.target.value)} />
            </Field>
            <div className="nsf-grid-2">
              <Field label="Preferred examination month or date" hint="Subject to availability">
                <input className="nsf-input" placeholder="e.g. March 2026" value={form.preferredDate} onChange={e => set('preferredDate', e.target.value)} />
              </Field>
              <Field label="Preferred examination location">
                <select className="nsf-input" value={form.examLocation} onChange={e => set('examLocation', e.target.value)}>
                  <option value="">Select…</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </Field>
            </div>
            {form.examLocation === 'Other' && (
              <Field label="If other, specify preferred location">
                <input className="nsf-input" value={form.examLocationOther} onChange={e => set('examLocationOther', e.target.value)} />
              </Field>
            )}
          </div>

          {/* C. Access arrangements */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">C. Access Arrangements</h2>
            <Field label="Do you need reasonable adjustments or access arrangements?">
              <div className="nsf-radio-group">
                {['Yes', 'No', 'Unsure'].map(v => (
                  <label key={v} className="nsf-radio">
                    <input type="radio" name="accessArrangements" checked={form.accessArrangements === v} onChange={() => set('accessArrangements', v)} /> {v}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="If yes or unsure, describe the support requested"
              hint="Please do not include diagnoses or unnecessary sensitive details.">
              <textarea className="nsf-input" rows={3} value={form.accessDescription} onChange={e => set('accessDescription', e.target.value)} />
            </Field>
          </div>

          {/* D. Supporting documents */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">D. Supporting Documents</h2>
            <p style={{ fontSize: '0.86rem', color: '#555', lineHeight: 1.6, marginTop: -4 }}>
              You can attach these now or send them later — our examinations office will confirm which documents are
              required before your exam is booked. Accepted types: PDF, JPG or PNG.
            </p>
            <Field label="Proof of identity" hint="Valid passport, photocard driving licence or another TEC-accepted ID">
              <div className="nsf-file-box">
                <input type="file" id="idDoc" accept=".pdf,.jpg,.jpeg,.png" onChange={e => set('idDoc', e.target.files[0] || null)} />
                <label htmlFor="idDoc" className="nsf-file-label">
                  <span className="nsf-file-icon">📎</span>
                  <span>{form.idDoc ? form.idDoc.name : 'Choose file (PDF, JPG, PNG)'}</span>
                </label>
              </div>
            </Field>
            <Field label="Proof of address" hint="Recent official correspondence showing name and address">
              <div className="nsf-file-box">
                <input type="file" id="addressDoc" accept=".pdf,.jpg,.jpeg,.png" onChange={e => set('addressDoc', e.target.files[0] || null)} />
                <label htmlFor="addressDoc" className="nsf-file-label">
                  <span className="nsf-file-icon">📎</span>
                  <span>{form.addressDoc ? form.addressDoc.name : 'Choose file (PDF, JPG, PNG)'}</span>
                </label>
              </div>
            </Field>
            <Field label="Recent passport-style photograph" hint="Clear, front-facing image (JPG or PNG)">
              <div className="nsf-file-box">
                <input type="file" id="photo" accept=".jpg,.jpeg,.png" onChange={e => set('photo', e.target.files[0] || null)} />
                <label htmlFor="photo" className="nsf-file-label">
                  <span className="nsf-file-icon">📎</span>
                  <span>{form.photo ? form.photo.name : 'Choose file (JPG, PNG)'}</span>
                </label>
              </div>
            </Field>
          </div>

          {/* E. Declarations */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">E. Candidate Declarations</h2>
            {[
              ['declExamOnly', 'I understand that this is an exam-only application and tuition is not included.'],
              ['declBooking', 'I understand that booking is not confirmed until TEC has checked eligibility, availability, fees and payment and sent written confirmation.'],
              ['declAccurate', 'I confirm the information is accurate and agree to comply with examination rules and identity checks.'],
              ['declPrivacy', 'I acknowledge TEC will process my information for this enquiry and, where necessary, share relevant details with the awarding organisation as explained in its privacy notice.'],
            ].map(([key, text]) => (
              <label key={key} className={`nsf-checkbox${errors.declarations ? ' nsf-input-error' : ''}`}
                style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', lineHeight: 1.6, marginBottom: 12 }}>
                <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} style={{ marginTop: 4 }} />
                <span>{text} <span className="nsf-required">*</span></span>
              </label>
            ))}
            {errors.declarations && <span className="nsf-error">{errors.declarations}</span>}

            <div className="nsf-grid-2" style={{ marginTop: 16 }}>
              <Field label="Full name as electronic declaration">
                <input className="nsf-input" value={form.declarationName} onChange={e => set('declarationName', e.target.value)} placeholder={form.fullName} />
              </Field>
              <Field label="Date of declaration">
                <input className="nsf-input" value={new Date().toLocaleDateString('en-GB')} readOnly disabled />
              </Field>
            </div>
          </div>

          <button type="submit" className="nsf-btn-primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Registration Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
