import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InnerPage.css';
import './NewStarterFormPage.css';
import { uploadToS3, saveSubmission, saveSubmissionToDB, exportToSheets, sendEmailNotification, sendConfirmationEmail } from '../config/forms';

const COUNTRIES = [
  'United Kingdom','Afghanistan','Albania','Algeria','Andorra','Angola','Argentina',
  'Armenia','Australia','Austria','Azerbaijan','Bahrain','Bangladesh','Belarus',
  'Belgium','Bolivia','Bosnia and Herzegovina','Brazil','Bulgaria','Cambodia',
  'Cameroon','Canada','Chile','China','Colombia','Croatia','Cuba','Cyprus',
  'Czech Republic','Denmark','Egypt','Estonia','Ethiopia','Finland','France',
  'Georgia','Germany','Ghana','Greece','Guatemala','Honduras','Hungary','India',
  'Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan',
  'Kazakhstan','Kenya','Kosovo','Kuwait','Kyrgyzstan','Latvia','Lebanon','Libya',
  'Lithuania','Luxembourg','Malaysia','Malta','Mexico','Moldova','Morocco',
  'Nepal','Netherlands','New Zealand','Nigeria','North Macedonia','Norway',
  'Oman','Pakistan','Palestine','Panama','Paraguay','Peru','Philippines','Poland',
  'Portugal','Qatar','Romania','Russia','Saudi Arabia','Senegal','Serbia',
  'Sierra Leone','Singapore','Slovakia','Slovenia','Somalia','South Africa',
  'South Korea','Spain','Sri Lanka','Sudan','Sweden','Switzerland','Syria',
  'Taiwan','Tajikistan','Tanzania','Thailand','Tunisia','Turkey','Uganda',
  'Ukraine','United Arab Emirates','United States','Uruguay','Uzbekistan',
  'Venezuela','Vietnam','Yemen','Zimbabwe','Other',
];

const initialForm = {
  title: '', firstName: '', middleName: '', lastName: '',
  gender: '', dob: '', maritalStatus: '',
  streetAddress: '', city: '', postCode: '', country: 'United Kingdom',
  jobTitle: '', startDate: '', mobile: '', email: '',
  nationalInsurance: '', annualSalary: '', siteLocation: '',
  emergencyName: '', emergencyRelationship: '', emergencyMobile: '',
  accountHolder: '', sortCode: '', accountNumber: '', bankName: '',
  contractType: '', starterType: '', starterDeclaration: '',
  proofOfId: [], p45: null,
  privacyAgreed: false,
};

function Section({ title }) {
  return <div className="nsf-section-title"><span>{title}</span></div>;
}

function Field({ label, required, children }) {
  return (
    <div className="nsf-field">
      <label className="nsf-label">{label}{required && <span className="nsf-required">*</span>}</label>
      {children}
    </div>
  );
}

export default function NewStarterFormPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.gender) e.gender = 'Required';
    if (!form.dob) e.dob = 'Required';
    if (!form.proofOfId || form.proofOfId.length === 0) e.proofOfId = 'Required';
    if (!form.privacyAgreed) e.privacyAgreed = 'You must agree to the privacy policy';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      document.querySelector('.nsf-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setUploading(true);
    try {
      const payload = { ...form };

      // Upload Proof of ID files to S3 (multiple allowed)
      if (form.proofOfId && form.proofOfId.length > 0) {
        const uploads = await Promise.all(
          form.proofOfId.map(f => uploadToS3(f, 'new-starter/proof-of-id'))
        );
        payload.proofOfIdUrl = uploads.map(u => u.fileUrl).join(', ');
        payload.proofOfIdName = form.proofOfId.map(f => f.name).join(', ');
      }

      // Upload P45 to S3 (optional)
      if (form.p45) {
        const { fileUrl } = await uploadToS3(form.p45, 'new-starter/p45');
        payload.p45Url = fileUrl;
        payload.p45Name = form.p45.name;
      }

      // Remove File objects (not JSON-serialisable)
      delete payload.proofOfId;
      delete payload.p45;

      // Uppercase all string fields before saving
      const skipUppercase = ['email', 'proofOfIdUrl', 'p45Url', 'proofOfIdName', 'p45Name'];
      Object.keys(payload).forEach(k => {
        if (typeof payload[k] === 'string' && !skipUppercase.includes(k)) {
          payload[k] = payload[k].toUpperCase();
        }
      });

      // Save to localStorage + DynamoDB
      const entry = saveSubmission('New Starter Form', payload);
      saveSubmissionToDB(entry).catch(err => console.error('DynamoDB save failed:', err));

      // Auto-sync to Google Sheets + send emails — all in background
      exportToSheets(entry).catch(err => console.error('Sheets sync failed:', err));
      sendEmailNotification(entry).catch(err => console.error('HR email failed:', err));
      sendConfirmationEmail(entry).catch(err => console.error('Confirmation email failed:', err));

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('Upload failed: ' + err.message + '\n\nMake sure your Lambda function is deployed correctly.');
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="inner-page page-enter">
        <div className="container inner-content">
          <div className="nsf-success">
            <div className="nsf-success-icon">✓</div>
            <h2>Form Submitted Successfully</h2>
            <p>Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your new starter form has been received.</p>
            <p>A member of the HR team will be in touch shortly.</p>
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
          <h1 className="nsf-page-title">New Starter Form</h1>
          <p className="nsf-page-sub">Please complete all required fields marked with *</p>
        </div>
        <form className="nsf-form" onSubmit={handleSubmit} noValidate>

          {/* ── Personal Information ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Personal Information</h2>
            <Field label="Title">
              <div className="nsf-radio-group">
                {['Dr.','Miss','Mr.','Mrs.','Ms.','Mx.','Prof.','Rev.'].map(t => (
                  <label key={t} className="nsf-radio">
                    <input type="radio" name="title" value={t} checked={form.title === t} onChange={() => set('title', t)} />
                    {t}
                  </label>
                ))}
              </div>
            </Field>
            <div className="nsf-grid-3" style={{ marginTop: 20 }}>
              <Field label="First Name" required>
                <input className={`nsf-input${errors.firstName ? ' nsf-input-error' : ''}`} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="First name" />
                {errors.firstName && <span className="nsf-error">{errors.firstName}</span>}
              </Field>
              <Field label="Middle Name">
                <input className="nsf-input" value={form.middleName} onChange={e => set('middleName', e.target.value)} placeholder="Middle name" />
              </Field>
              <Field label="Last Name" required>
                <input className={`nsf-input${errors.lastName ? ' nsf-input-error' : ''}`} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Last name" />
                {errors.lastName && <span className="nsf-error">{errors.lastName}</span>}
              </Field>
            </div>
            <div className="nsf-grid-3">
              <Field label="Gender" required>
                <div className={`nsf-radio-group${errors.gender ? ' nsf-radio-error' : ''}`}>
                  {['Male','Female','Other'].map(g => (
                    <label key={g} className="nsf-radio">
                      <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={() => set('gender', g)} />
                      {g}
                    </label>
                  ))}
                </div>
                {errors.gender && <span className="nsf-error">{errors.gender}</span>}
              </Field>
              <Field label="Date of Birth" required>
                <input type="date" className={`nsf-input${errors.dob ? ' nsf-input-error' : ''}`} value={form.dob} onChange={e => set('dob', e.target.value)} />
                {errors.dob && <span className="nsf-error">{errors.dob}</span>}
              </Field>
              <Field label="Marital Status">
                <div className="nsf-radio-group">
                  {['Single','Married','Civil Partnership'].map(m => (
                    <label key={m} className="nsf-radio">
                      <input type="radio" name="maritalStatus" value={m} checked={form.maritalStatus === m} onChange={() => set('maritalStatus', m)} />
                      {m}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          </div>

          {/* ── Address ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Address</h2>
            <div className="nsf-grid-2">
              <Field label="Street Address">
                <input className="nsf-input" value={form.streetAddress} onChange={e => set('streetAddress', e.target.value)} placeholder="Street address" />
              </Field>
              <Field label="City">
                <input className="nsf-input" value={form.city} onChange={e => set('city', e.target.value)} placeholder="City" />
              </Field>
            </div>
            <div className="nsf-grid-2">
              <Field label="Post Code">
                <input className="nsf-input" value={form.postCode} onChange={e => set('postCode', e.target.value)} placeholder="Post code" />
              </Field>
              <Field label="Country">
                <select className="nsf-input" value={form.country} onChange={e => set('country', e.target.value)}>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>
          </div>

          {/* ── Employment ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Employment Details</h2>
            <div className="nsf-grid-3">
              <Field label="Job Title">
                <input className="nsf-input" value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)} placeholder="Job title" />
              </Field>
              <Field label="Start Date">
                <input type="date" className="nsf-input" value={form.startDate} onChange={e => set('startDate', e.target.value)} />
              </Field>
              <Field label="Site Location">
                <div className="nsf-radio-group">
                  {['Leicester','Nottingham','Birmingham'].map(s => (
                    <label key={s} className="nsf-radio">
                      <input type="radio" name="siteLocation" value={s} checked={form.siteLocation === s} onChange={() => set('siteLocation', s)} />
                      {s}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
            <div className="nsf-grid-3">
              <Field label="Mobile Contact Number">
                <input type="tel" className="nsf-input" value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="+44 7..." />
              </Field>
              <Field label="Email Address">
                <input type="email" className="nsf-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" />
              </Field>
              <Field label="Annual Salary">
                <input className="nsf-input" value={form.annualSalary} onChange={e => set('annualSalary', e.target.value)} placeholder="£" />
              </Field>
            </div>
            <div className="nsf-grid-2">
              <Field label="National Insurance Number">
                <input className="nsf-input" value={form.nationalInsurance} onChange={e => set('nationalInsurance', e.target.value)} placeholder="AB 12 34 56 C" style={{ textTransform: 'uppercase' }} />
              </Field>
            </div>
          </div>

          {/* ── Emergency Contact ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Emergency Contact</h2>
            <div className="nsf-grid-3">
              <Field label="Emergency Contact Name">
                <input className="nsf-input" value={form.emergencyName} onChange={e => set('emergencyName', e.target.value)} placeholder="Full name" />
              </Field>
              <Field label="Relationship">
                <input className="nsf-input" value={form.emergencyRelationship} onChange={e => set('emergencyRelationship', e.target.value)} placeholder="e.g. Spouse, Parent" />
              </Field>
              <Field label="Emergency Contact Mobile">
                <input type="tel" className="nsf-input" value={form.emergencyMobile} onChange={e => set('emergencyMobile', e.target.value)} placeholder="+44 7..." />
              </Field>
            </div>
          </div>

          {/* ── Bank Details ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Bank Details</h2>
            <div className="nsf-grid-2">
              <Field label="Account Holder Name">
                <input className="nsf-input" value={form.accountHolder} onChange={e => set('accountHolder', e.target.value)} placeholder="As shown on bank card" />
              </Field>
              <Field label="Bank Name">
                <input className="nsf-input" value={form.bankName} onChange={e => set('bankName', e.target.value)} placeholder="e.g. Barclays" />
              </Field>
            </div>
            <div className="nsf-grid-2">
              <Field label="Sort Code">
                <input className="nsf-input" value={form.sortCode} onChange={e => set('sortCode', e.target.value)} placeholder="00-00-00" maxLength={8} />
              </Field>
              <Field label="Account Number">
                <input className="nsf-input" value={form.accountNumber} onChange={e => set('accountNumber', e.target.value)} placeholder="8 digits" maxLength={8} />
              </Field>
            </div>
          </div>

          {/* ── Contract ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Contract Details</h2>
            <div className="nsf-grid-3">
              <Field label="Contract Type">
                <div className="nsf-radio-group nsf-radio-col">
                  {['Full Time','Part-Time','Term Time','Zero Hours'].map(c => (
                    <label key={c} className="nsf-radio">
                      <input type="radio" name="contractType" value={c} checked={form.contractType === c} onChange={() => set('contractType', c)} />
                      {c}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Starter Type">
                <div className="nsf-radio-group nsf-radio-col">
                  {['Starter with P45','Starter without P45','Student Loan','Post Grad Loan'].map(s => (
                    <label key={s} className="nsf-radio">
                      <input type="radio" name="starterType" value={s} checked={form.starterType === s} onChange={() => set('starterType', s)} />
                      {s}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Starter Declaration">
                <div className="nsf-radio-group nsf-radio-col">
                  {[
                    'This is my first job since the start of the tax year.',
                    'I currently have another job or pension.',
                    'I have had another job since the start of the tax year, but this is now my only job.',
                  ].map(d => (
                    <label key={d} className="nsf-radio">
                      <input type="radio" name="starterDeclaration" value={d} checked={form.starterDeclaration === d} onChange={() => set('starterDeclaration', d)} />
                      {d}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          </div>

          {/* ── Documents ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Documents</h2>
            <div className="nsf-grid-2">
              <Field label="Proof of ID" required>
                <div className={`nsf-file-box${errors.proofOfId ? ' nsf-input-error' : ''}`}>
                  <input type="file" id="proofOfId" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={e => set('proofOfId', Array.from(e.target.files))} />
                  <label htmlFor="proofOfId" className="nsf-file-label">
                    <span className="nsf-file-icon">📎</span>
                    <span>{form.proofOfId?.length > 0 ? form.proofOfId.map(f => f.name).join(', ') : 'Choose files (PDF, JPG, PNG — multiple allowed)'}</span>
                  </label>
                </div>
                {errors.proofOfId && <span className="nsf-error">{errors.proofOfId}</span>}
              </Field>
              {form.starterType === 'Starter with P45' && (
                <Field label="P45" required>
                  <div className="nsf-file-box">
                    <input type="file" id="p45" accept=".pdf,.jpg,.jpeg,.png" onChange={e => set('p45', e.target.files[0] || null)} />
                    <label htmlFor="p45" className="nsf-file-label">
                      <span className="nsf-file-icon">📎</span>
                      <span>{form.p45 ? form.p45.name : 'Choose file (PDF, JPG, PNG — max 128MB)'}</span>
                    </label>
                  </div>
                </Field>
              )}
            </div>
          </div>

          {/* ── Consent ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Consent</h2>
            <div className="nsf-consent">
              <label className={`nsf-checkbox-label${errors.privacyAgreed ? ' nsf-checkbox-error' : ''}`}>
                <input type="checkbox" checked={form.privacyAgreed} onChange={e => set('privacyAgreed', e.target.checked)} />
                <span>I agree to the <a href="/policies" target="_blank" rel="noreferrer">privacy policy</a> and consent to TEC processing my personal data for employment purposes.</span>
              </label>
              {errors.privacyAgreed && <span className="nsf-error">{errors.privacyAgreed}</span>}
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="nsf-submit-row">
            <button type="submit" className="nsf-btn-primary" disabled={uploading}>
              {uploading ? (
                <><span className="nsf-spinner" /> Uploading & Submitting…</>
              ) : (
                'Submit New Starter Form'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
