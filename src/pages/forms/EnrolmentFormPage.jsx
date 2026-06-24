import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../InnerPage.css';
import './NewStarterFormPage.css';
import { saveSubmission, saveSubmissionToDB, exportToSheets, sendEmailNotification, sendConfirmationEmail } from '../../config/forms';

// ── Static option lists ────────────────────────────────────────
const TITLES = ['Mr.', 'Mrs.', 'Miss', 'Ms.', 'Dr.', 'Prof.', 'Rev.'];

const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other'];

const ACCOMMODATION_OPTIONS = [
  'With the Family - family house',
  'Private tenant',
  'Private owner-occupied',
  'Housing association',
  'Council tenant',
  'Halls of residence',
  'Other',
];

const QUALIFICATION_LEVELS = [
  'Entry Level',
  'Level 1',
  'Level 2',
  'Level 3',
  'Level 4',
  'Level 5',
  'Level 6',
  'Level 7',
  'Level 8',
  'None',
  'Other',
];

const EDUCATION_PROVIDER_OPTIONS = [
  'School',
  'Further Education College',
  'Sixth Form College',
  'Higher Education Institution',
  'Private Training Provider',
  'Employer',
  'Not in education or training',
  'Other',
];

const EMPLOYMENT_TYPE_OPTIONS = ['Full time', 'Part time', 'Self-employed', 'Voluntary'];

const SEX_OPTIONS = ['Male', 'Female', 'Intersex', 'Prefer not to say'];

const RELIGION_OPTIONS = [
  'No religion',
  'Christian',
  'Muslim',
  'Hindu',
  'Sikh',
  'Jewish',
  'Buddhist',
  'Other',
  'Prefer not to say',
];

const PARENTAL_EDUCATION_OPTIONS = [
  'Yes',
  'No',
  "Don't know",
  'Prefer not to say',
];

const CARE_LEAVER_OPTIONS = [
  'Not a care leaver',
  'Care leaver (age 18-21)',
  'Care leaver (age 22-25)',
  'Care leaver (age 25+)',
  'Prefer not to say',
];

const GENDER_IDENTITY_OPTIONS = [
  'Yes, same as sex registered at birth',
  'No',
  'Prefer not to say',
];

const SEXUAL_ORIENTATION_OPTIONS = [
  'Heterosexual or straight',
  'Gay or lesbian',
  'Bisexual',
  'Other',
  'Prefer not to say',
];

const ETHNICITY_OPTIONS = [
  'English/Welsh/Scottish/Northern Irish/British',
  'Irish',
  'Gypsy or Irish Traveller',
  'Roma',
  'Other White',
  'White and Black Caribbean',
  'White and Black African',
  'White and Asian',
  'Other Mixed/Multiple ethnic groups',
  'Indian',
  'Pakistani',
  'Bangladeshi',
  'Chinese',
  'Other Asian',
  'African',
  'Caribbean',
  'Other Black/African/Caribbean',
  'Arab',
  'Other',
  'Prefer not to say',
];

const DISABILITY_OPTIONS = [
  'No known impairment, health condition or learning difference',
  'Visual impairment',
  'Hearing impairment',
  'Mobility impairment',
  'Mental health condition',
  'Autism spectrum condition',
  'Specific learning difficulty (e.g. dyslexia)',
  'Other physical disability',
  'Multiple conditions',
  'Prefer not to say',
];

const IMMIGRATION_STATUS_OPTIONS = [
  'EEA or Swiss national',
  'Child of a Turkish Worker',
  'Refugee',
  'Pre-settled status (EU settlement scheme )',
  'Humanitarian Protection or similar',
  'Fully Settled in the UK',
  'Pre Settled',
  'UK Citizen - English',
  'UK Citizen - Wales',
  'UK Citizen - Scotland',
  'UK Citizen - Northern Island',
  'British Citizen - Channel Islands and Isle of Man',
  'British Citizen - British Overseas Territories',
  'EU National (non-UK Citizen)',
  'Biometric Residents Permit',
  'Indefinite leave to remain',
  'Dependent Partner Leave To Remain',
  'Dependent Leave To Remain',
  'Skilled Worker Leave To Remain',
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

// ── Initial form state ─────────────────────────────────────────
const INITIAL = {
  // Section 1 — Personal Details
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  dob: '',
  // Term Time Address
  addressLine1: '',
  addressLine2: '',
  postCode: '',
  city: '',
  mobile: '',
  email: '',
  // Next of Kin
  nextOfKinName: '',
  nextOfKinRelationship: '',
  nextOfKinTelephone: '',
  accommodationType: '',
  // Section 1a — Permanent Address
  permAddressLine1: '',
  permAddressLine2: '',
  permAddressLine3: '',
  permAddressLine4: '',
  permPostCode: '',
  permCountry: 'United Kingdom',
  // Section 2 — Fee Status
  ukResident3Years: '',
  studentFinance: '',
  feesPayer: '',
  studentLoansCRN: '',
  requiresStudentVisa: '',
  nonBritishInfo: '',
  immigrationStatus: '',
  passportNumber: '',
  passportValidFrom: '',
  passportValidTo: '',
  passportCountry: '',
  visaBRPNumber: '',
  visaValidFrom: '',
  visaValidTo: '',
  // Section 3 — Qualifications
  englishFirstLanguage: '',
  firstLanguage: '',
  englishQualification: '',
  mathsQualification: '',
  highestQualification: '',
  qualificationLevel: '',
  previousEducationProvider: '',
  // Section 4 — Employment
  jobTitle: '',
  organisation: '',
  employmentType: '',
  employmentStartDate: '',
  employmentEndDate: '',
  // Section 5 — Criminal Convictions
  criminalConvictions: '',
  // Section 6 — Equal Opportunities
  sexIdentifier: '',
  religion: '',
  parentalEducation: '',
  careLeaverStatus: '',
  genderIdentity: '',
  sexualOrientation: '',
  ethnicity: '',
  disability: '',
  // Section 7 — Learning Plan (Staff)
  programmeTitle: '',
  plannedStartDate: '',
  plannedEndDate: '',
  contract: '',
  holdEquivalentQualification: '',
  tuitionFeeYear1: '',
  tuitionFeeYear2: '',
  tuitionFeeYear3: '',
  tuitionFeeTotal: '',
  // Consent & Signature
  signature: '',
  signatureDate: '',
  privacyAgreed: false,
};

// Fields that should NOT be auto-uppercased (free-text inputs only; select/radio values keep their case)
const SKIP_UPPERCASE = [
  'email', 'dob', 'passportValidFrom', 'passportValidTo', 'visaValidFrom', 'visaValidTo',
  'plannedStartDate', 'plannedEndDate', 'signatureDate', 'employmentStartDate', 'employmentEndDate',
  'nonBritishInfo', 'feesPayer', 'englishQualification', 'mathsQualification',
  'highestQualification', 'studentLoansCRN',
  // radio/select fields — values must stay as-is to match option labels
  'title', 'gender', 'accommodationType', 'nationality', 'countryOfBirth',
  'qualificationLevel', 'previousEducationProvider', 'employmentType',
  'sexIdentifier', 'religion', 'parentalEducation', 'careLeaverStatus',
  'genderIdentity', 'sexualOrientation', 'ethnicity', 'disability',
  'englishFirstLanguage', 'immigrationStatus', 'criminalConvictions',
  'holdEquivalentQualification', 'contract',
];

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

export default function EnrolmentFormPage() {
  const [form, setForm]         = useState(INITIAL);
  const [errors, setErrors]     = useState({});
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
    if (!form.dob.trim())        e.dob        = 'Required';
    if (!form.privacyAgreed)     e.privacyAgreed = 'You must agree to the privacy policy';
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

      const entry = saveSubmission('Enrolment Form', payload);
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
        <h2>Enrolment Form Submitted Successfully</h2>
        <p>
          Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your enrolment form has been received.
        </p>
        <p>A member of our admissions team will be in touch shortly.</p>
        <button className="nsf-btn" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <>

      <div className="nsf-page-header">
        <h1 className="nsf-page-title">Enrolment Form</h1>
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

          {/* First / Middle / Last Name */}
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
            <Field label="Date of Birth" required>
              <input
                className={`nsf-input${errors.dob ? ' nsf-input-error' : ''}`}
                type="date"
                value={form.dob}
                onChange={e => set('dob', e.target.value)}
              />
              {errors.dob && <span className="nsf-error">{errors.dob}</span>}
            </Field>
          </div>

          {/* Term Time Address */}
          <h3 className="nsf-subsection-title">Term Time Address</h3>

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
            <Field label="Post Code">
              <input
                className="nsf-input"
                type="text"
                placeholder="Post code"
                value={form.postCode}
                onChange={e => set('postCode', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--2">
            <Field label="Phone Number">
              <input
                className="nsf-input"
                type="tel"
                placeholder="+44 ..."
                value={form.mobile}
                onChange={e => set('mobile', e.target.value)}
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

          {/* Accommodation Type */}
          <div className="nsf-row nsf-row--1">
            <Field label="Type of Accommodation During Term Time">
              <select
                className="nsf-input"
                value={form.accommodationType}
                onChange={e => set('accommodationType', e.target.value)}
              >
                <option value="">— Select —</option>
                {ACCOMMODATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          {/* Next of Kin */}
          <h3 className="nsf-subsection-title">Next of Kin</h3>
          <div className="nsf-row nsf-row--3">
            <Field label="Full Name">
              <input
                className="nsf-input"
                type="text"
                placeholder="Full name"
                value={form.nextOfKinName}
                onChange={e => set('nextOfKinName', e.target.value)}
              />
            </Field>
            <Field label="Relationship">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. Parent, Spouse"
                value={form.nextOfKinRelationship}
                onChange={e => set('nextOfKinRelationship', e.target.value)}
              />
            </Field>
            <Field label="Telephone">
              <input
                className="nsf-input"
                type="tel"
                placeholder="+44 ..."
                value={form.nextOfKinTelephone}
                onChange={e => set('nextOfKinTelephone', e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ── Section 1a: Permanent Address ───────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">1a. Permanent Address Prior to Start</h2>
          <p className="nsf-section-desc">If different from your term time address, please provide your permanent address.</p>

          <div className="nsf-row nsf-row--1">
            <Field label="Address Line 1">
              <input
                className="nsf-input"
                type="text"
                placeholder="Address line 1"
                value={form.permAddressLine1}
                onChange={e => set('permAddressLine1', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--1">
            <Field label="Address Line 2">
              <input
                className="nsf-input"
                type="text"
                placeholder="Address line 2"
                value={form.permAddressLine2}
                onChange={e => set('permAddressLine2', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--2">
            <Field label="Address Line 3">
              <input
                className="nsf-input"
                type="text"
                placeholder="Address line 3"
                value={form.permAddressLine3}
                onChange={e => set('permAddressLine3', e.target.value)}
              />
            </Field>
            <Field label="Address Line 4">
              <input
                className="nsf-input"
                type="text"
                placeholder="Address line 4"
                value={form.permAddressLine4}
                onChange={e => set('permAddressLine4', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--2">
            <Field label="Post Code">
              <input
                className="nsf-input"
                type="text"
                placeholder="Post code"
                value={form.permPostCode}
                onChange={e => set('permPostCode', e.target.value)}
              />
            </Field>
            <Field label="Country">
              <select
                className="nsf-input"
                value={form.permCountry}
                onChange={e => set('permCountry', e.target.value)}
              >
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
        </section>

        {/* ── Section 2: Fee Status ────────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">2. Fee Status</h2>

          <div className="nsf-row nsf-row--1">
            <Field label="2A) On the day you expect to start your course, will you have been ordinarily resident in the UK for at least the past three years?">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. Yes / No / Living since..."
                value={form.ukResident3Years}
                onChange={e => set('ukResident3Years', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--1">
            <Field label="2B) Have you applied for student finance (e.g. via Student Finance England)?">
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="nsf-radio-label">
                    <input
                      type="radio"
                      name="studentFinance"
                      value={opt}
                      checked={form.studentFinance === opt}
                      onChange={() => set('studentFinance', opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          {form.studentFinance === 'No' && (
            <div className="nsf-row nsf-row--1">
              <Field label="If no, who will pay your fees? (e.g. self funded, employer, charity/college)">
                <input
                  className="nsf-input"
                  type="text"
                  placeholder="Fee payer"
                  value={form.feesPayer}
                  onChange={e => set('feesPayer', e.target.value)}
                />
              </Field>
            </div>
          )}

          {form.studentFinance === 'Yes' && (
            <div className="nsf-row nsf-row--1">
              <Field label="Student Loans Company Customer Reference Number (CRN)">
                <input
                  className="nsf-input"
                  type="text"
                  placeholder="CRN"
                  value={form.studentLoansCRN}
                  onChange={e => set('studentLoansCRN', e.target.value)}
                />
              </Field>
            </div>
          )}

          <div className="nsf-row nsf-row--1">
            <Field label="2C) Do you require a student visa to study in the UK?">
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="nsf-radio-label">
                    <input
                      type="radio"
                      name="requiresStudentVisa"
                      value={opt}
                      checked={form.requiresStudentVisa === opt}
                      onChange={() => set('requiresStudentVisa', opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <div className="nsf-row nsf-row--1">
            <Field label="If you are not a British Citizen, please provide relevant information (or type N/A)">
              <textarea
                className="nsf-input nsf-textarea"
                rows={3}
                placeholder="e.g. Share Code, right to remain details..."
                value={form.nonBritishInfo}
                onChange={e => set('nonBritishInfo', e.target.value)}
              />
            </Field>
          </div>

          {/* Immigration & Documents */}
          <h3 className="nsf-subsection-title">Immigration &amp; Travel Documents</h3>

          <div className="nsf-row nsf-row--2">
            <Field label="Immigration Status">
              <select
                className="nsf-input"
                value={form.immigrationStatus}
                onChange={e => set('immigrationStatus', e.target.value)}
              >
                <option value="">— Select —</option>
                {IMMIGRATION_STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Passport Country">
              <input
                className="nsf-input"
                type="text"
                placeholder="Issuing country"
                value={form.passportCountry}
                onChange={e => set('passportCountry', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--3">
            <Field label="Passport Number">
              <input
                className="nsf-input"
                type="text"
                placeholder="Passport number"
                value={form.passportNumber}
                onChange={e => set('passportNumber', e.target.value)}
              />
            </Field>
            <Field label="Passport Valid From">
              <input
                className="nsf-input"
                type="text"
                placeholder="DD/MM/YY"
                value={form.passportValidFrom}
                onChange={e => set('passportValidFrom', e.target.value)}
              />
            </Field>
            <Field label="Passport Valid To">
              <input
                className="nsf-input"
                type="text"
                placeholder="DD/MM/YY"
                value={form.passportValidTo}
                onChange={e => set('passportValidTo', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--3">
            <Field label="VISA / BRP / Document Number">
              <input
                className="nsf-input"
                type="text"
                placeholder="Document number"
                value={form.visaBRPNumber}
                onChange={e => set('visaBRPNumber', e.target.value)}
              />
            </Field>
            <Field label="Visa Valid From">
              <input
                className="nsf-input"
                type="text"
                placeholder="DD/MM/YY"
                value={form.visaValidFrom}
                onChange={e => set('visaValidFrom', e.target.value)}
              />
            </Field>
            <Field label="Visa Valid To">
              <input
                className="nsf-input"
                type="text"
                placeholder="DD/MM/YY"
                value={form.visaValidTo}
                onChange={e => set('visaValidTo', e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ── Section 3: Qualifications ────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">3. Qualifications and Educational History</h2>

          <div className="nsf-row nsf-row--2">
            <Field label="Is English your first language?">
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="nsf-radio-label">
                    <input
                      type="radio"
                      name="englishFirstLanguage"
                      value={opt}
                      checked={form.englishFirstLanguage === opt}
                      onChange={() => set('englishFirstLanguage', opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
            {form.englishFirstLanguage === 'No' && (
              <Field label="If not, please specify your first language">
                <input
                  className="nsf-input"
                  type="text"
                  placeholder="First language"
                  value={form.firstLanguage}
                  onChange={e => set('firstLanguage', e.target.value)}
                />
              </Field>
            )}
          </div>

          <div className="nsf-row nsf-row--1">
            <Field label="Name and type of English Language Qualification">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. IELTS 5.5, Functional Skills English Level 2"
                value={form.englishQualification}
                onChange={e => set('englishQualification', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--1">
            <Field label="Name and type of Maths Qualification">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. GCSE Maths Grade C, Functional Skills Maths Level 1"
                value={form.mathsQualification}
                onChange={e => set('mathsQualification', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--1">
            <Field label="Name, Subject and Type of Highest Qualification">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. A-Level Biology, BTEC Level 3 Business"
                value={form.highestQualification}
                onChange={e => set('highestQualification', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--2">
            <Field label="Level of Highest Achievement">
              <select
                className="nsf-input"
                value={form.qualificationLevel}
                onChange={e => set('qualificationLevel', e.target.value)}
              >
                <option value="">— Select —</option>
                {QUALIFICATION_LEVELS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Most Recent Education Provider Type">
              <select
                className="nsf-input"
                value={form.previousEducationProvider}
                onChange={e => set('previousEducationProvider', e.target.value)}
              >
                <option value="">— Select —</option>
                {EDUCATION_PROVIDER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>
        </section>

        {/* ── Section 4: Employment History ───────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">4. Employment History</h2>
          <p className="nsf-section-desc">Please provide details of your most recent employment, if applicable.</p>

          <div className="nsf-row nsf-row--2">
            <Field label="Job Title">
              <input
                className="nsf-input"
                type="text"
                placeholder="Job title"
                value={form.jobTitle}
                onChange={e => set('jobTitle', e.target.value)}
              />
            </Field>
            <Field label="Organisation">
              <input
                className="nsf-input"
                type="text"
                placeholder="Organisation name"
                value={form.organisation}
                onChange={e => set('organisation', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--3">
            <Field label="Employment Type">
              <select
                className="nsf-input"
                value={form.employmentType}
                onChange={e => set('employmentType', e.target.value)}
              >
                <option value="">— Select —</option>
                {EMPLOYMENT_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Start Month / Year">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. January 2022"
                value={form.employmentStartDate}
                onChange={e => set('employmentStartDate', e.target.value)}
              />
            </Field>
            <Field label="End Month / Year">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. December 2023"
                value={form.employmentEndDate}
                onChange={e => set('employmentEndDate', e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ── Section 5: Criminal Convictions ─────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">5. Criminal Convictions Disclosure</h2>
          <p className="nsf-section-desc">
            Do you have any criminal convictions that are both relevant and unspent? Under the Rehabilitation of Offenders Act 1974 you are not required to disclose spent convictions.
          </p>

          <div className="nsf-field">
            <div className="nsf-radio-group">
              {['Yes', 'No'].map(opt => (
                <label key={opt} className="nsf-radio-label">
                  <input
                    type="radio"
                    name="criminalConvictions"
                    value={opt}
                    checked={form.criminalConvictions === opt}
                    onChange={() => set('criminalConvictions', opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 6: Equal Opportunities ──────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">6. Equal Opportunities Monitoring</h2>
          <p className="nsf-section-desc">
            This information is collected for monitoring and statistical purposes only and will not be used in any way that could identify you.
          </p>

          <div className="nsf-row nsf-row--2">
            <Field label="Sex Identifier — What is your sex?">
              <select
                className="nsf-input"
                value={form.sexIdentifier}
                onChange={e => set('sexIdentifier', e.target.value)}
              >
                <option value="">— Select —</option>
                {SEX_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Gender Identity — Is the gender you identify with the same as your sex registered at birth?">
              <select
                className="nsf-input"
                value={form.genderIdentity}
                onChange={e => set('genderIdentity', e.target.value)}
              >
                <option value="">— Select —</option>
                {GENDER_IDENTITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          <div className="nsf-row nsf-row--2">
            <Field label="Religion or Belief">
              <select
                className="nsf-input"
                value={form.religion}
                onChange={e => set('religion', e.target.value)}
              >
                <option value="">— Select —</option>
                {RELIGION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Sexual Orientation">
              <select
                className="nsf-input"
                value={form.sexualOrientation}
                onChange={e => set('sexualOrientation', e.target.value)}
              >
                <option value="">— Select —</option>
                {SEXUAL_ORIENTATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          <div className="nsf-row nsf-row--1">
            <Field label="Ethnicity — What is your ethnicity or ethnic group?">
              <select
                className="nsf-input"
                value={form.ethnicity}
                onChange={e => set('ethnicity', e.target.value)}
              >
                <option value="">— Select —</option>
                {ETHNICITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          <div className="nsf-row nsf-row--1">
            <Field label="Disability — Do you have an impairment, health condition, or learning difference that has a substantial impact on your ability to carry out day-to-day activities and has lasted, or is expected to last, at least 12 months?">
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

          <div className="nsf-row nsf-row--2">
            <Field label="Parental Education — Do any of your parents have higher education qualifications?">
              <select
                className="nsf-input"
                value={form.parentalEducation}
                onChange={e => set('parentalEducation', e.target.value)}
              >
                <option value="">— Select —</option>
                {PARENTAL_EDUCATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Care Leaver Status">
              <select
                className="nsf-input"
                value={form.careLeaverStatus}
                onChange={e => set('careLeaverStatus', e.target.value)}
              >
                <option value="">— Select —</option>
                {CARE_LEAVER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>
        </section>

        {/* ── Section 7: Learning Plan (Staff completed) ──────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">7. Learning Plan Aim Details <span style={{ fontSize: '0.85em', fontWeight: 400, color: '#666' }}>(Staff Completed)</span></h2>

          <div className="nsf-row nsf-row--1">
            <Field label="Programme Title">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. ESOL, BTEC Level 3, HND Business"
                value={form.programmeTitle}
                onChange={e => set('programmeTitle', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--3">
            <Field label="Planned Start Date">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. 25 Feb 2026"
                value={form.plannedStartDate}
                onChange={e => set('plannedStartDate', e.target.value)}
              />
            </Field>
            <Field label="Planned End Date">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. 22 May 2026"
                value={form.plannedEndDate}
                onChange={e => set('plannedEndDate', e.target.value)}
              />
            </Field>
            <Field label="Contract / Duration">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. 12 weeks"
                value={form.contract}
                onChange={e => set('contract', e.target.value)}
              />
            </Field>
          </div>

          <div className="nsf-row nsf-row--1">
            <Field label="Do you hold a qualification at a level equivalent to or higher than the one you are enrolling for?">
              <div className="nsf-radio-group">
                {['Yes', 'No', 'N/A'].map(opt => (
                  <label key={opt} className="nsf-radio-label">
                    <input
                      type="radio"
                      name="holdEquivalentQualification"
                      value={opt}
                      checked={form.holdEquivalentQualification === opt}
                      onChange={() => set('holdEquivalentQualification', opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <h3 className="nsf-subsection-title">Tuition Fees</h3>
          <div className="nsf-row nsf-row--2">
            <Field label="Tuition Fee Payable — Year 1 (£)">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. 1440"
                value={form.tuitionFeeYear1}
                onChange={e => set('tuitionFeeYear1', e.target.value)}
              />
            </Field>
            <Field label="Tuition Fee Payable — Year 2 (£, if applicable)">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. 1440"
                value={form.tuitionFeeYear2}
                onChange={e => set('tuitionFeeYear2', e.target.value)}
              />
            </Field>
          </div>
          <div className="nsf-row nsf-row--2">
            <Field label="Tuition Fee Payable — Year 3 (£, if applicable)">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. 1440"
                value={form.tuitionFeeYear3}
                onChange={e => set('tuitionFeeYear3', e.target.value)}
              />
            </Field>
            <Field label="Tuition Fee Total (£)">
              <input
                className="nsf-input"
                type="text"
                placeholder="e.g. 1440"
                value={form.tuitionFeeTotal}
                onChange={e => set('tuitionFeeTotal', e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* ── Consent & Signature ──────────────────────────────────── */}
        <section className="nsf-section">
          <h2 className="nsf-section-title">Declaration &amp; Signature</h2>
          <p className="nsf-section-desc">
            I confirm that the information I have provided on this form is accurate and complete to the best of my knowledge. I understand that providing false information may result in withdrawal of my place.
          </p>

          <div className="nsf-row nsf-row--2">
            <Field label="Signature (type full name)">
              <input
                className="nsf-input"
                type="text"
                placeholder="Full name as signature"
                value={form.signature}
                onChange={e => set('signature', e.target.value)}
              />
            </Field>
            <Field label="Date">
              <input
                className="nsf-input"
                type="date"
                value={form.signatureDate}
                onChange={e => set('signatureDate', e.target.value)}
              />
            </Field>
          </div>

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
            and consent to Trent Education Centre processing my data for enrolment purposes.
          </label>
          {errors.privacyAgreed && (
            <span className="nsf-error">{errors.privacyAgreed}</span>
          )}
        </section>

        <div className="nsf-submit-row">
          <button type="submit" className="nsf-btn" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Enrolment Form'}
          </button>
        </div>
      </form>
    </>
  );
}
