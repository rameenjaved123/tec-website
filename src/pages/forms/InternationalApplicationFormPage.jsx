import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../InnerPage.css';
import './NewStarterFormPage.css';
import { saveSubmission, saveSubmissionToDB, exportToSheets, sendEmailNotification, sendConfirmationEmail } from '../../config/forms';

// ── Static option lists ────────────────────────────────────────
const TITLES = ['Mr.', 'Mrs.', 'Miss', 'Ms.', 'Dr.', 'Prof.', 'Rev.'];

const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

const QUALIFICATION_TYPES = [
  'O Level or Equivalent',
  'A Level or Equivalent',
  'GCSE or Equivalent',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD / Doctorate',
  'Diploma',
  'HND',
  'Foundation',
  'Other',
];

const EMPLOYMENT_STATUS_OPTIONS = [
  'Employed',
  'Self Employed',
  'Unemployed',
  'Student',
  'Retired',
];

const LENGTH_EMPLOYMENT = [
  'Up to 3 Months',
  '3 to 6 Months',
  '6 to 12 Months',
  'More than 12 Months',
];

const LENGTH_UNEMPLOYMENT = [
  'Up to 3 Months',
  '3 to 6 Months',
  '6 to 12 Months',
  'More than 12 Months',
];

const DISABILITY_OPTIONS = [
  'No disability',
  'Visual impairment',
  'Hearing impairment',
  'Mobility impairment',
  'Mental health condition',
  'Specific learning difficulty',
  'Other',
];

const HEAR_ABOUT_OPTIONS = [
  'Social Media (Facebook, Instagram, LinkedIn, YouTube etc.)',
  'Word of Mouth',
  'Referral',
  'Agent',
  'Previous Student Recommendation',
  'Google',
  'Other',
];

const STUDY_CENTRES = ['Nottingham'];

const COURSES = [
  'ESOL (English for Speakers of Other Languages) - 9 Months Course',
  'ESOL (English for Speakers of Other Languages) - 11 Months Course',
  'IELTS Preparation',
  'Business English',
  'Other',
];

const COUNTRIES = [
  'United Kingdom','Afghanistan','Albania','Algeria','Andorra','Angola','Argentina',
  'Armenia','Australia','Austria','Azerbaijan','Bahrain','Bangladesh','Belarus',
  'Belgium','Bolivia','Bosnia and Herzegovina','Brazil','Bulgaria','Cambodia',
  'Canada','Chile','China','Colombia','Croatia','Cuba','Cyprus','Czech Republic',
  'Denmark','Egypt','Eritrea','Estonia','Ethiopia','Finland','France','Georgia','Germany',
  'Ghana','Greece','Guatemala','Honduras','Hungary','India','Indonesia','Iran',
  'Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan',
  'Kenya','Kosovo','Kuwait','Latvia','Lebanon','Libya','Lithuania','Luxembourg',
  'Malaysia','Malta','Mexico','Moldova','Morocco','Nepal','Netherlands',
  'New Zealand','Nigeria','Norway','Oman','Pakistan','Palestine','Poland',
  'Portugal','Qatar','Romania','Russia','Saudi Arabia','Serbia','Singapore',
  'Somalia','South Africa','Spain','Sri Lanka','Sudan','Sweden','Switzerland','Syria',
  'Tanzania','Thailand','Tunisia','Turkey','Uganda','Ukraine','United Arab Emirates',
  'United States','Yemen','Zimbabwe',
];

const START_MONTHS = [
  'January 2025','February 2025','March 2025','April 2025','May 2025','June 2025',
  'July 2025','August 2025','September 2025','October 2025','November 2025','December 2025',
  'January 2026','February 2026','March 2026','April 2026','May 2026','June 2026',
  'July 2026','August 2026','September 2026','October 2026','November 2026','December 2026',
];

const INITIAL = {
  // Personal
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  dob: '',
  mobile: '',
  email: '',
  emergencyContact: '',
  // Address
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  postCode: '',
  // Background
  countryOfBirth: '',
  countryOfPermanentResidence: '',
  nationality: '',
  ethnicity: '',
  // Immigration
  ukCitizen: '',
  requiresVisa: '',
  passportNumber: '',
  passportPlaceOfIssue: '',
  passportIssuedDate: '',
  passportExpiryDate: '',
  visaRefused: '',
  // Qualification 1
  qual1Type: '',
  qual1OtherDetails: '',
  qual1Subject: '',
  qual1Grade: '',
  qual1DateAchieved: '',
  qual1Institution: '',
  // Qualification 2
  qual2Type: '',
  qual2OtherDetails: '',
  qual2Subject: '',
  qual2Grade: '',
  qual2YearAchieved: '',
  qual2MonthAchieved: '',
  qual2Institution: '',
  // Course
  course: '',
  startDate: '',
  studyCentre: 'Nottingham',
  // Employment
  employmentStatus: '',
  employerName: '',
  dateOfEmployment: '',
  lengthOfEmployment: '',
  lengthOfUnemployment: '',
  // Other
  disability: '',
  disabilityDetails: '',
  criminalConviction: '',
  criminalConvictionDetails: '',
  hearAbout: '',
  referralName: '',
  // Consent
  consentAgreed: false,
};

const SKIP_UPPERCASE = [
  'email', 'dob', 'passportIssuedDate', 'passportExpiryDate',
  'qual1DateAchieved', 'qual1OtherDetails', 'qual1Subject',
  'qual2OtherDetails', 'qual2Subject', 'qual2YearAchieved', 'qual2MonthAchieved',
  'disabilityDetails', 'criminalConvictionDetails',
];

function toUpper(val) {
  return typeof val === 'string' ? val.toUpperCase() : val;
}

function Field({ label, required, hint, children }) {
  return (
    <div className="nsf-field">
      <label className="nsf-label">
        {label}{required && <span className="nsf-required"> *</span>}
      </label>
      {hint && <p style={{ fontSize: '0.78rem', color: '#888', margin: '0 0 4px' }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function InternationalApplicationFormPage() {
  const [form, setForm]           = useState(INITIAL);
  const [errors, setErrors]       = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
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
    if (!form.firstName.trim())  e.firstName  = 'Required';
    if (!form.lastName.trim())   e.lastName   = 'Required';
    if (!form.email.trim())      e.email      = 'Required';
    if (!form.mobile.trim())     e.mobile     = 'Required';
    if (!form.course)            e.course     = 'Required';
    if (!form.consentAgreed)     e.consentAgreed = 'You must agree to the declaration';
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
      delete payload.consentAgreed;

      const entry = saveSubmission('International Application', payload);
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
        <h2>Application Submitted Successfully</h2>
        <p>
          Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your international application has been received.
        </p>
        <p>A member of our admissions team will be in touch shortly.</p>
        <button className="nsf-btn" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <>

      <div className="nsf-page-header">
        <h1 className="nsf-page-title">International Student Application</h1>
        <p className="nsf-page-sub">Please complete all required fields marked with *</p>
      </div>
      <form className="nsf-form" onSubmit={handleSubmit} noValidate>

        {/* ── Section 1: Personal Details ─────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">1. Personal Details</h2>

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

          {/* Name row */}
          <div className="nsf-row nsf-row--3">
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
            <Field label="Middle Name">
              <input
                className="nsf-input"
                type="text"
                placeholder="Middle name"
                value={form.middleName}
                onChange={e => set('middleName', e.target.value)}
              />
            </Field>
            <Field label="Surname" required>
              <input
                className={`nsf-input${errors.lastName ? ' nsf-input-error' : ''}`}
                type="text"
                placeholder="Surname"
                value={form.lastName}
                onChange={e => set('lastName', e.target.value)}
              />
              {errors.lastName && <span className="nsf-error">{errors.lastName}</span>}
            </Field>
          </div>

          {/* Gender / DOB */}
          <div className="nsf-row nsf-row--2">
            <Field label="Gender">
              <select
                className="nsf-input"
                value={form.gender}
                onChange={e => set('gender', e.target.value)}
              >
                <option value="">— Select —</option>
                {GENDER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Date of Birth">
              <input
                className="nsf-input"
                type="date"
                value={form.dob}
                onChange={e => set('dob', e.target.value)}
              />
            </Field>
          </div>

          {/* Contact */}
          <div className="nsf-row nsf-row--2">
            <Field label="Mobile Number" required>
              <input
                className={`nsf-input${errors.mobile ? ' nsf-input-error' : ''}`}
                type="tel"
                placeholder="+44 7..."
                value={form.mobile}
                onChange={e => set('mobile', e.target.value)}
              />
              {errors.mobile && <span className="nsf-error">{errors.mobile}</span>}
            </Field>
            <Field label="Email Address" required>
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

          <div className="nsf-row nsf-row--1">
            <Field label="Emergency Contact">
              <input
                className="nsf-input"
                type="text"
                placeholder="Name and phone number"
                value={form.emergencyContact}
                onChange={e => set('emergencyContact', e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ── Section 2: Address ───────────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">2. Address</h2>

          <div className="nsf-row nsf-row--1">
            <Field label="First Line of Address">
              <input
                className="nsf-input"
                type="text"
                placeholder="Street address"
                value={form.addressLine1}
                onChange={e => set('addressLine1', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--1">
            <Field label="Second Line of Address">
              <input
                className="nsf-input"
                type="text"
                placeholder="Address line 2"
                value={form.addressLine2}
                onChange={e => set('addressLine2', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--3">
            <Field label="City">
              <input
                className="nsf-input"
                type="text"
                placeholder="City"
                value={form.city}
                onChange={e => set('city', e.target.value)}
              />
            </Field>
            <Field label="Postal Code">
              <input
                className="nsf-input"
                type="text"
                placeholder="Postal code"
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
                <option value="">— Select —</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
        </section>

        {/* ── Section 3: Background ────────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">3. Background Information</h2>

          <div className="nsf-row nsf-row--2">
            <Field label="Country of Birth">
              <select
                className="nsf-input"
                value={form.countryOfBirth}
                onChange={e => set('countryOfBirth', e.target.value)}
              >
                <option value="">— Select —</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Country of Permanent Residence">
              <select
                className="nsf-input"
                value={form.countryOfPermanentResidence}
                onChange={e => set('countryOfPermanentResidence', e.target.value)}
              >
                <option value="">— Select —</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <div className="nsf-row nsf-row--2">
            <Field label="Nationality">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. British, Pakistani, Indian"
                value={form.nationality}
                onChange={e => set('nationality', e.target.value)}
              />
            </Field>
            <Field label="Ethnicity">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. Arab, South Asian, White"
                value={form.ethnicity}
                onChange={e => set('ethnicity', e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ── Section 4: Immigration ───────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">4. Immigration &amp; Passport Details</h2>

          <div className="nsf-row nsf-row--2">
            <Field label="Are you a UK citizen?">
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="nsf-radio-label">
                    <input
                      type="radio"
                      name="ukCitizen"
                      value={opt}
                      checked={form.ukCitizen === opt}
                      onChange={() => set('ukCitizen', opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Do you require a visa to study in the UK?">
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="nsf-radio-label">
                    <input
                      type="radio"
                      name="requiresVisa"
                      value={opt}
                      checked={form.requiresVisa === opt}
                      onChange={() => set('requiresVisa', opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <div className="nsf-row nsf-row--2">
            <Field label="Passport Number">
              <input
                className="nsf-input"
                type="text"
                placeholder="Passport number"
                value={form.passportNumber}
                onChange={e => set('passportNumber', e.target.value)}
              />
            </Field>
            <Field label="Passport Place of Issue">
              <input
                className="nsf-input"
                type="text"
                placeholder="City / Country of issue"
                value={form.passportPlaceOfIssue}
                onChange={e => set('passportPlaceOfIssue', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--2">
            <Field label="Passport Issued Date">
              <input
                className="nsf-input"
                type="date"
                value={form.passportIssuedDate}
                onChange={e => set('passportIssuedDate', e.target.value)}
              />
            </Field>
            <Field label="Passport Expiry Date">
              <input
                className="nsf-input"
                type="date"
                value={form.passportExpiryDate}
                onChange={e => set('passportExpiryDate', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--1">
            <Field label="Have you ever been refused a visa from the United Kingdom, New Zealand, Australia, or Ireland?">
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="nsf-radio-label">
                    <input
                      type="radio"
                      name="visaRefused"
                      value={opt}
                      checked={form.visaRefused === opt}
                      onChange={() => set('visaRefused', opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
          </div>
        </section>

        {/* ── Section 5: Qualifications ────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">5. Qualifications</h2>
          <p className="nsf-section-desc">Please provide details of your two most recent qualifications.</p>

          <h3 className="nsf-subsection-title">Qualification 1</h3>
          <div className="nsf-row nsf-row--2">
            <Field label="Qualification Type">
              <select
                className="nsf-input"
                value={form.qual1Type}
                onChange={e => set('qual1Type', e.target.value)}
              >
                <option value="">— Select —</option>
                {QUALIFICATION_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            {form.qual1Type === 'Other' && (
              <Field label="If other, please give details">
                <input
                  className="nsf-input"
                  type="text"
                  placeholder="Qualification details"
                  value={form.qual1OtherDetails}
                  onChange={e => set('qual1OtherDetails', e.target.value)}
                />
              </Field>
            )}
          </div>
          <div className="nsf-row nsf-row--2">
            <Field label="Subject(s)">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. Maths, English, Science"
                value={form.qual1Subject}
                onChange={e => set('qual1Subject', e.target.value)}
              />
            </Field>
            <Field label="Grade(s)">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. A, B, C or Merit"
                value={form.qual1Grade}
                onChange={e => set('qual1Grade', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--2">
            <Field label="Date Achieved">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. 2022-06-10"
                value={form.qual1DateAchieved}
                onChange={e => set('qual1DateAchieved', e.target.value)}
              />
            </Field>
            <Field label="School / College / Institution">
              <input
                className="nsf-input"
                type="text"
                placeholder="Institution name"
                value={form.qual1Institution}
                onChange={e => set('qual1Institution', e.target.value)}
              />
            </Field>
          </div>

          <h3 className="nsf-subsection-title">Qualification 2 (if applicable)</h3>
          <div className="nsf-row nsf-row--2">
            <Field label="Qualification Type">
              <select
                className="nsf-input"
                value={form.qual2Type}
                onChange={e => set('qual2Type', e.target.value)}
              >
                <option value="">— Select —</option>
                {QUALIFICATION_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            {form.qual2Type === 'Other' && (
              <Field label="If other, please give details">
                <input
                  className="nsf-input"
                  type="text"
                  placeholder="Qualification details"
                  value={form.qual2OtherDetails}
                  onChange={e => set('qual2OtherDetails', e.target.value)}
                />
              </Field>
            )}
          </div>
          <div className="nsf-row nsf-row--2">
            <Field label="Subject(s)">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. Maths, English"
                value={form.qual2Subject}
                onChange={e => set('qual2Subject', e.target.value)}
              />
            </Field>
            <Field label="Grade(s)">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. A, B, C"
                value={form.qual2Grade}
                onChange={e => set('qual2Grade', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--3">
            <Field label="Year Achieved">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. 2023"
                value={form.qual2YearAchieved}
                onChange={e => set('qual2YearAchieved', e.target.value)}
              />
            </Field>
            <Field label="Month Achieved">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. June"
                value={form.qual2MonthAchieved}
                onChange={e => set('qual2MonthAchieved', e.target.value)}
              />
            </Field>
            <Field label="School / College / Institution">
              <input
                className="nsf-input"
                type="text"
                placeholder="Institution name"
                value={form.qual2Institution}
                onChange={e => set('qual2Institution', e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ── Section 6: Course Preference ────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">6. Course Preference</h2>

          <div className="nsf-row nsf-row--1">
            <Field label="Which course are you applying for?" required>
              <select
                className={`nsf-input${errors.course ? ' nsf-input-error' : ''}`}
                value={form.course}
                onChange={e => set('course', e.target.value)}
              >
                <option value="">— Select a course —</option>
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.course && <span className="nsf-error">{errors.course}</span>}
            </Field>
          </div>

          <div className="nsf-row nsf-row--2">
            <Field label="When would you like to start?">
              <select
                className="nsf-input"
                value={form.startDate}
                onChange={e => set('startDate', e.target.value)}
              >
                <option value="">— Select month —</option>
                {START_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </Field>
            <Field label="Preferred Study Centre">
              <select
                className="nsf-input"
                value={form.studyCentre}
                onChange={e => set('studyCentre', e.target.value)}
              >
                {STUDY_CENTRES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
        </section>

        {/* ── Section 7: Employment ────────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">7. Employment</h2>

          <div className="nsf-row nsf-row--2">
            <Field label="Employment Status">
              <select
                className="nsf-input"
                value={form.employmentStatus}
                onChange={e => set('employmentStatus', e.target.value)}
              >
                <option value="">— Select —</option>
                {EMPLOYMENT_STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            {(form.employmentStatus === 'Employed' || form.employmentStatus === 'Self Employed') && (
              <Field label="Name of Employer">
                <input
                  className="nsf-input"
                  type="text"
                  placeholder="Employer name"
                  value={form.employerName}
                  onChange={e => set('employerName', e.target.value)}
                />
              </Field>
            )}
          </div>

          {(form.employmentStatus === 'Employed' || form.employmentStatus === 'Self Employed') && (
            <div className="nsf-row nsf-row--2">
              <Field label="Date of Employment">
                <input
                  className="nsf-input"
                  type="date"
                  value={form.dateOfEmployment}
                  onChange={e => set('dateOfEmployment', e.target.value)}
                />
              </Field>
              <Field label="Length of Employment">
                <select
                  className="nsf-input"
                  value={form.lengthOfEmployment}
                  onChange={e => set('lengthOfEmployment', e.target.value)}
                >
                  <option value="">— Select —</option>
                  {LENGTH_EMPLOYMENT.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </div>
          )}

          {form.employmentStatus === 'Unemployed' && (
            <div className="nsf-row nsf-row--1">
              <Field label="Length of Unemployment">
                <select
                  className="nsf-input"
                  value={form.lengthOfUnemployment}
                  onChange={e => set('lengthOfUnemployment', e.target.value)}
                >
                  <option value="">— Select —</option>
                  {LENGTH_UNEMPLOYMENT.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </div>
          )}
        </section>

        {/* ── Section 8: Additional Information ───────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">8. Additional Information</h2>

          <div className="nsf-row nsf-row--1">
            <Field label="Disclose any disability or medical condition">
              <select
                className="nsf-input"
                value={form.disability}
                onChange={e => set('disability', e.target.value)}
              >
                <option value="">— Select —</option>
                {DISABILITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          {form.disability === 'Other' && (
            <div className="nsf-row nsf-row--1">
              <Field label="Please give details">
                <textarea
                  className="nsf-input nsf-textarea"
                  rows={3}
                  placeholder="Please describe your condition"
                  value={form.disabilityDetails}
                  onChange={e => set('disabilityDetails', e.target.value)}
                />
              </Field>
            </div>
          )}

          <div className="nsf-row nsf-row--1">
            <Field label="Do you have any spent or unspent criminal convictions?">
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="nsf-radio-label">
                    <input
                      type="radio"
                      name="criminalConviction"
                      value={opt}
                      checked={form.criminalConviction === opt}
                      onChange={() => set('criminalConviction', opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          {form.criminalConviction === 'Yes' && (
            <div className="nsf-row nsf-row--1">
              <Field label="Please give details">
                <textarea
                  className="nsf-input nsf-textarea"
                  rows={3}
                  placeholder="Please provide details"
                  value={form.criminalConvictionDetails}
                  onChange={e => set('criminalConvictionDetails', e.target.value)}
                />
              </Field>
            </div>
          )}

          <div className="nsf-row nsf-row--2">
            <Field label="How did you hear about us?">
              <select
                className="nsf-input"
                value={form.hearAbout}
                onChange={e => set('hearAbout', e.target.value)}
              >
                <option value="">— Select —</option>
                {HEAR_ABOUT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            {form.hearAbout === 'Referral' && (
              <Field label="Referral Name">
                <input
                  className="nsf-input"
                  type="text"
                  placeholder="Name of person who referred you"
                  value={form.referralName}
                  onChange={e => set('referralName', e.target.value)}
                />
              </Field>
            )}
          </div>
        </section>

        {/* ── Declaration ───────────────────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">Declaration</h2>
          <div style={{
            background: '#f8faf8',
            border: '1px solid #d8e8d8',
            borderRadius: 8,
            padding: '14px 18px',
            marginBottom: 16,
            fontSize: '0.875rem',
            color: '#444',
            lineHeight: 1.6,
          }}>
            I confirm that the information I have provided in this application form is accurate and complete to the best of my knowledge. I understand that any false or misleading information may result in my application being rejected or my enrolment being terminated. I agree that Trent Education Centre may use this information to process my application and contact me regarding my studies.
          </div>

          <label className="nsf-checkbox-label">
            <input
              type="checkbox"
              checked={form.consentAgreed}
              onChange={e => setForm(prev => ({ ...prev, consentAgreed: e.target.checked }))}
            />
            I confirm that I have read and understood the above declaration and agree to the{' '}
            <a href="/policies" target="_blank" rel="noreferrer" className="nsf-link">
              privacy policy
            </a>.
          </label>
          {errors.consentAgreed && (
            <span className="nsf-error">{errors.consentAgreed}</span>
          )}
        </section>

        <div className="nsf-submit-row">
          <button type="submit" className="nsf-btn" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Application'}
          </button>
        </div>
      </form>
    </>
  );
}
