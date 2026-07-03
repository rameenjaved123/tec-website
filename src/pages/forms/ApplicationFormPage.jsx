import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../InnerPage.css';
import './NewStarterFormPage.css';
import {
  uploadToS3,
  saveSubmission,
  saveSubmissionToDB,
  exportToSheets,
  sendEmailNotification,
  sendConfirmationEmail,
} from '../../config/forms';

/* ════════════════════════════════════════════════════════════
   Student Application Form
   Mirrors the Gravity Forms structure from the original WP site:
   55 fields across personal info, address, background, course choice,
   employment, declarations, and 10 file uploads.
   ════════════════════════════════════════════════════════════ */

// ── Option lists (kept verbatim from the WP form spec) ───────
const TITLES = ['Mr.', 'Mrs.', 'Miss', 'Ms.', 'Dr.', 'Prof.', 'Rev.'];
const SEX_OPTIONS = ['Male', 'Female'];

const COUNTRIES = [
  'United Kingdom','Afghanistan','Albania','Algeria','American Samoa','Andorra','Angola',
  'Anguilla','Antarctica','Antigua and Barbuda','Argentina','Armenia','Aruba','Australia',
  'Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium',
  'Belize','Benin','Bermuda','Bhutan','Bolivia','Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina','Botswana','Bouvet Island','Brazil','British Indian Ocean Territory',
  'Brunei Darussalam','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada',
  'Cape Verde','Cayman Islands','Central African Republic','Chad','Chile','China',
  'Christmas Island','Cocos Islands','Colombia','Comoros','Congo, Democratic Republic of the',
  'Congo, Republic of the','Cook Islands','Costa Rica','Croatia','Cuba','Curaçao','Cyprus',
  'Czech Republic',"Côte d'Ivoire",'Denmark','Djibouti','Dominica','Dominican Republic',
  'Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia',
  'Eswatini (Swaziland)','Ethiopia','Falkland Islands','Faroe Islands','Fiji','Finland',
  'France','French Guiana','French Polynesia','French Southern Territories','Gabon','Gambia',
  'Georgia','Germany','Ghana','Gibraltar','Greece','Greenland','Grenada','Guadeloupe','Guam',
  'Guatemala','Guernsey','Guinea','Guinea-Bissau','Guyana','Haiti','Heard and McDonald Islands',
  'Holy See','Honduras','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq',
  'Ireland','Isle of Man','Israel','Italy','Jamaica','Japan','Jersey','Jordan','Kazakhstan',
  'Kenya','Kiribati','Kuwait','Kyrgyzstan',"Lao People's Democratic Republic",'Latvia',
  'Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Macau',
  'Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands',
  'Martinique','Mauritania','Mauritius','Mayotte','Mexico','Micronesia','Moldova','Monaco',
  'Mongolia','Montenegro','Montserrat','Morocco','Mozambique','Myanmar','Namibia','Nauru',
  'Nepal','Netherlands','New Caledonia','New Zealand','Nicaragua','Niger','Nigeria','Niue',
  'Norfolk Island','North Korea','Northern Mariana Islands','Norway','Oman','Pakistan',
  'Palau','Palestine, State of','Panama','Papua New Guinea','Paraguay','Peru','Philippines',
  'Pitcairn','Poland','Portugal','Puerto Rico','Qatar','Romania','Russia','Rwanda','Réunion',
  'Saint Barthélemy','Saint Helena','Saint Kitts and Nevis','Saint Lucia','Saint Martin',
  'Saint Pierre and Miquelon','Saint Vincent and the Grenadines','Samoa','San Marino',
  'Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone',
  'Singapore','Sint Maarten','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa',
  'South Georgia','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname',
  'Svalbard and Jan Mayen Islands','Sweden','Switzerland','Syria','Taiwan','Tajikistan',
  'Tanzania','Thailand','Timor-Leste','Togo','Tokelau','Tonga','Trinidad and Tobago','Tunisia',
  'Turkey','Turkmenistan','Turks and Caicos Islands','Tuvalu','US Minor Outlying Islands',
  'Uganda','Ukraine','United Arab Emirates','United States','Uruguay','Uzbekistan','Vanuatu',
  'Venezuela','Vietnam','Virgin Islands, British','Virgin Islands, U.S.','Wallis and Futuna',
  'Western Sahara','Yemen','Zambia','Zimbabwe','Åland Islands',
];

const PREV_QUAL = [
  'High School','Diploma','Associate Degree',"Bachelor's Degree",
  'Graduate or Professional Degree','Some College','Other','Prefer Not to Answer',
];

const ETHNICITIES = [
  'English / Welsh / Scottish / Northern Irish / British','Irish','Gypsy or Irish Traveller',
  'Any other White background','White and Black Caribbean','White and Black African',
  'White and Asian','Any other Mixed / Multiple ethnic background','Indian','Pakistani',
  'Bengladeshi','Chinese','Any Other Asian Background','African','Caribbean',
  'Any other Black / African / Caribbean background','Arab','Any other ethnic group',
];

const VISA_STATUSES = [
  'EEA or Swiss national','Child of a Turkish Worker','Refugee',
  'Pre-settled status (EU settlement scheme )','Humanitarian Protection or similar',
  'Fully Settled in the UK','Pre Settled','UK Citizen - English','UK Citizen - Wales',
  'UK Citizen - Scotland','UK Citizen - Northern Island',
  'British Citizen - Channel Islands and Isle of Man',
  'British Citizen - British Overseas Territories','EU National (non-UK Citizen)',
  'Biometric Residents Permit','Indefinite leave to remain','Dependent Partner Leave To Remain',
  'Dependent Leave To Remain','Skilled Worker Leave To Remain',
];

const COURSES = [
  'HNC/HND in Business:  Entrepreneurship and Small Business Management',
  'ATHE Level 5 Extended Diploma in Business and Management',
  'ESOL (English for Speakers of Other Languages)',
  'SIA Level 2 Award for Door Supervisors in the Private Security Industry (BIIAB)',
  'NCFE & Open Awards Level 2 in English',
  'NCFE & Open Awards Level 2 in Mathematics',
  'NCFE & Open Awards Level 1 in English',
  'NCFE & Open Awards Level 1 in Mathematics',
  'IELTS - Exam Preparation',
  'Other Courses',
];

const OTHER_COURSES = ['Function Skills English', 'Function Skills Mathematics', 'Digital Skills (Beginner)'];

const START_DATES = [
  'January 2026','February 2026','March 2026','April 2026','May 2026','June 2026',
  'July 2026','August 2026','September 2026','October 2026',
];

const STUDY_CENTRES = ['Nottingham', 'Birmingham', 'Leicester'];

const MARITAL_STATUSES = ['Single', 'Married', 'Civil Partnership', 'Divorced', 'Widowed', 'Separated', 'Prefer Not to Answer'];
const PREFERRED_CONTACTS = ['Email', 'Phone', 'SMS / Text', 'WhatsApp', 'Post'];

const EMPLOYMENT_STATUSES = ['Employed', 'Unemployed', 'Self Employed'];
const LENGTH_OPTIONS = ['Up to 3 Months', '3 to 6 Months', '6 to 12 Months', 'More than 12 Months'];

const DISABILITIES = [
  'No disability','Autistic disorder','Blind/partial sight','Deaf/partial hearing',
  'Long standing illness','Mental health','Learning difficulty','Wheelchair/mobility',
  'Other disability','Multiple disabilities',
];

const BENEFITS = [
  'Universal Credit',
  'Social Fund (Sure Start Maternity Grant, Funeral Payment, Cold Weather Payment)',
  'Council Tax Support','Housing Benefit',
  'Tax Credits (Child Tax Credit and Working Tax Credit)','Pension Credit','Income Support',
  'Income-related Employment and Support Allowance','Income-based Jobseeker’s Allowance',
];

const HEAR_ABOUT = [
  'Social Media (Facebook, Instagram, LinkedIn, YouTube etc.)','Website','Google/Search Engine',
  'Referral','Word of Mouth','Email Marketing','Local Community Centre',
  'Previous Student Recommendation','Other',
];

// ── File upload fields (label → form field key + S3 sub-folder) ─
const FILE_FIELDS = [
  { key: 'passportFileUrl',      label: 'Passport / National ID (No Driving Licence)', folder: 'application/passport' },
  { key: 'idBackFileUrl',        label: 'ID Back Picture',                              folder: 'application/id-back' },
  { key: 'qualificationsFileUrl',label: 'Qualification / Work reference letter / P60', folder: 'application/qualifications' },
  { key: 'certificatesFileUrl',  label: 'Qualification / Any Certificates / Transcripts you may have', folder: 'application/certificates' },
  { key: 'proofOfAddressUrl',    label: 'Proof of address',                              folder: 'application/proof-of-address' },
  { key: 'proofOfAddress2Url',   label: 'Proof of address (second)',                     folder: 'application/proof-of-address' },
  { key: 'rightToStudyUrl',      label: 'Right To Study',                                folder: 'application/right-to-study' },
  { key: 'ninFileUrl',           label: 'National Insurance Number',                     folder: 'application/nin' },
  { key: 'cvFileUrl',            label: 'CV',                                            folder: 'application/cv' },
  { key: 'workReferenceUrl',     label: 'Work Reference',                                folder: 'application/work-reference' },
];

// ── Field renderer helpers ──────────────────────────────────
function Field({ label, required, error, children, hint }) {
  return (
    <div className="nsf-field">
      <label className="nsf-label">
        {label}{required && <span className="nsf-required"> *</span>}
      </label>
      {children}
      {hint && <div className="nsf-hint">{hint}</div>}
      {error && <div className="nsf-error">{error}</div>}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────
export default function ApplicationFormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Personal
    title: '', firstName: '', lastName: '', sex: '', dob: '',
    mobile: '', email: '', emergencyContact: '', nationalInsurance: '',
    ukResident3Years: '', maritalStatus: '', preferredContact: '',
    // Address
    addressLine1: '', addressLine2: '', city: '', country: '', postCode: '',
    // Background
    education: '', prevQualification: '', countryOfBirth: '', nationality: '', ethnicity: '',
    visaStatus: '', shareCode: '', dateOfArrival: '',
    // Course
    course: '', otherCourses: [], startDate: '', passportNumber: '', studyCentre: '',
    // Employment
    employmentStatus: '', employerName: '', dateOfEmployment: '',
    lengthOfEmployment: '', lengthOfUnemployment: '',
    studentFinance: '', studentFinanceDetails: '',
    // Declarations
    disability: '', disabilityDetails: '',
    criminalConviction: '', convictionDetails: '',
    benefits: '', benefitsType: '',
    hearAbout: '', referralName: '',
    // Signature
    signature: '', signatureDate: '',
    privacyAgreed: false,
  });

  const [files, setFiles]       = useState({});  // { key: File }
  const [errors, setErrors]     = useState({});
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setFile = (k, f) => setFiles(s => ({ ...s, [k]: f }));

  const toggleOtherCourse = (val) => {
    setForm(f => ({
      ...f,
      otherCourses: f.otherCourses.includes(val)
        ? f.otherCourses.filter(x => x !== val)
        : [...f.otherCourses, val],
    }));
  };

  // ── Validation (mirrors required flags from the WP form) ───
  const validate = () => {
    const e = {};
    const req = (k, label = 'Required') => { if (!String(form[k] ?? '').trim()) e[k] = label; };

    req('firstName'); req('lastName'); req('sex'); req('dob');
    req('mobile'); req('email'); req('emergencyContact'); req('nationalInsurance');
    req('ukResident3Years');
    req('addressLine1'); req('addressLine2'); req('city'); req('country'); req('postCode');
    req('countryOfBirth'); req('nationality'); req('ethnicity'); req('visaStatus');
    req('dateOfArrival');
    req('course'); req('startDate'); req('passportNumber'); req('studyCentre');
    req('employmentStatus');
    if (form.employmentStatus === 'Employed' || form.employmentStatus === 'Self Employed') {
      req('dateOfEmployment'); req('lengthOfEmployment');
    }
    if (form.employmentStatus === 'Unemployed') {
      req('lengthOfUnemployment');
    }
    req('studentFinance'); req('disability'); req('criminalConviction'); req('benefits');
    req('hearAbout');

    // Email format
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';

    if (!form.privacyAgreed) e.privacyAgreed = 'You must agree to the privacy policy';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      setTimeout(() => document.querySelector('.nsf-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      return;
    }
    setUploading(true);
    try {
      // Upload any files in parallel
      const uploaded = {};
      await Promise.all(FILE_FIELDS.map(async ({ key, folder }) => {
        const f = files[key];
        if (!f) return;
        const { fileUrl } = await uploadToS3(f, folder);
        uploaded[key] = fileUrl;
      }));

      const payload = {
        ...form,
        otherCourses: form.otherCourses.join(', '),
        ...uploaded,
      };
      const entry = saveSubmission('Application Form', payload);

      // Fire-and-forget the side effects so the user sees the success state immediately
      saveSubmissionToDB(entry).catch(err => console.error('DynamoDB save failed:', err));
      exportToSheets(entry).catch(err => console.error('Sheets sync failed:', err));
      sendEmailNotification(entry).catch(err => console.error('Notification email failed:', err));
      sendConfirmationEmail(entry).catch(err => console.error('Confirmation email failed:', err));

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('Submission failed: ' + err.message);
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
            <h2>Application Submitted!</h2>
            <p>Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your application has been received.</p>
            <p>A member of our admissions team will review your application and be in touch shortly.</p>
            <button className="nsf-btn-primary" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="inner-page page-enter">
      <div className="container inner-content">
        <div className="nsf-page-header">
          <h1 className="nsf-page-title">Student Application Form</h1>
          <p className="nsf-page-sub">Please complete all required fields marked with *</p>
        </div>

        <form className="nsf-form" onSubmit={handleSubmit} noValidate>

          {/* ── 1. Personal Information ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Personal Information</h2>

            <Field label="Title">
              <div className="nsf-radio-group">
                {TITLES.map(t => (
                  <label key={t} className="nsf-radio">
                    <input type="radio" name="title" value={t} checked={form.title === t} onChange={() => set('title', t)} />
                    {t}
                  </label>
                ))}
              </div>
            </Field>

            <div className="nsf-grid-2" style={{ marginTop: 20 }}>
              <Field label="First Name" required error={errors.firstName}>
                <input className={`nsf-input${errors.firstName ? ' nsf-input-error' : ''}`}
                  value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="First name" />
              </Field>
              <Field label="Surname" required error={errors.lastName}>
                <input className={`nsf-input${errors.lastName ? ' nsf-input-error' : ''}`}
                  value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Surname" />
              </Field>
            </div>

            <div className="nsf-grid-2">
              <Field label="Gender" required error={errors.sex}>
                <select className={`nsf-input${errors.sex ? ' nsf-input-error' : ''}`}
                  value={form.sex} onChange={e => set('sex', e.target.value)}>
                  <option value="">Please Select</option>
                  {SEX_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Date of Birth" required error={errors.dob}>
                <input type="date" className={`nsf-input${errors.dob ? ' nsf-input-error' : ''}`}
                  value={form.dob} onChange={e => set('dob', e.target.value)} />
              </Field>
            </div>

            <div className="nsf-grid-2">
              <Field label="Mobile" required error={errors.mobile}>
                <input className={`nsf-input${errors.mobile ? ' nsf-input-error' : ''}`}
                  value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="Mobile number" />
              </Field>
              <Field label="Email" required error={errors.email}>
                <input type="email" className={`nsf-input${errors.email ? ' nsf-input-error' : ''}`}
                  value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
              </Field>
            </div>

            <div className="nsf-grid-2">
              <Field label="Emergency Contact" required error={errors.emergencyContact}>
                <input className={`nsf-input${errors.emergencyContact ? ' nsf-input-error' : ''}`}
                  value={form.emergencyContact} onChange={e => set('emergencyContact', e.target.value)} placeholder="Name and number" />
              </Field>
              <Field label="National Insurance Number" required error={errors.nationalInsurance}>
                <input className={`nsf-input${errors.nationalInsurance ? ' nsf-input-error' : ''}`}
                  value={form.nationalInsurance} onChange={e => set('nationalInsurance', e.target.value)} placeholder="AB123456C" />
              </Field>
            </div>

            <div className="nsf-grid-2">
              <Field label="Marital Status">
                <select className="nsf-input" value={form.maritalStatus} onChange={e => set('maritalStatus', e.target.value)}>
                  <option value="">Please Select (Optional)</option>
                  {MARITAL_STATUSES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Preferred Contact Method">
                <select className="nsf-input" value={form.preferredContact} onChange={e => set('preferredContact', e.target.value)}>
                  <option value="">Please Select (Optional)</option>
                  {PREFERRED_CONTACTS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Have you been a UK resident for 3 years or more?" required error={errors.ukResident3Years}>
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className="nsf-radio">
                    <input type="radio" name="ukResident3Years" value={v} checked={form.ukResident3Years === v} onChange={() => set('ukResident3Years', v)} />
                    {v}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          {/* ── 2. Address ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Address</h2>

            <Field label="First Line of Address" required error={errors.addressLine1}>
              <input className={`nsf-input${errors.addressLine1 ? ' nsf-input-error' : ''}`}
                value={form.addressLine1} onChange={e => set('addressLine1', e.target.value)} />
            </Field>

            <Field label="Second Line of Address" required error={errors.addressLine2}>
              <input className={`nsf-input${errors.addressLine2 ? ' nsf-input-error' : ''}`}
                value={form.addressLine2} onChange={e => set('addressLine2', e.target.value)} />
            </Field>

            <div className="nsf-grid-3">
              <Field label="City" required error={errors.city}>
                <input className={`nsf-input${errors.city ? ' nsf-input-error' : ''}`}
                  value={form.city} onChange={e => set('city', e.target.value)} />
              </Field>
              <Field label="Country" required error={errors.country}>
                <select className={`nsf-input${errors.country ? ' nsf-input-error' : ''}`}
                  value={form.country} onChange={e => set('country', e.target.value)}>
                  <option value="">Please Select</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Postal Code" required error={errors.postCode}>
                <input className={`nsf-input${errors.postCode ? ' nsf-input-error' : ''}`}
                  value={form.postCode} onChange={e => set('postCode', e.target.value)} />
              </Field>
            </div>
          </div>

          {/* ── 3. Background ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Background</h2>

            <Field label="Previous Qualification Level">
              <select className="nsf-input" value={form.prevQualification} onChange={e => set('prevQualification', e.target.value)}>
                <option value="">Please Select</option>
                {PREV_QUAL.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </Field>

            <Field label="Education History">
              <textarea className="nsf-input" rows={3} value={form.education}
                onChange={e => set('education', e.target.value)}
                placeholder="e.g. GCSEs at Anytown Secondary School (2018), A-Levels at Anytown College (2020) — Optional" />
            </Field>

            <div className="nsf-grid-2">
              <Field label="Country of Birth" required error={errors.countryOfBirth}>
                <select className={`nsf-input${errors.countryOfBirth ? ' nsf-input-error' : ''}`}
                  value={form.countryOfBirth} onChange={e => set('countryOfBirth', e.target.value)}>
                  <option value="">Please Select</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Nationality" required error={errors.nationality}>
                <select className={`nsf-input${errors.nationality ? ' nsf-input-error' : ''}`}
                  value={form.nationality} onChange={e => set('nationality', e.target.value)}>
                  <option value="">Please Select</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>

            <div className="nsf-grid-2">
              <Field label="Ethnicity" required error={errors.ethnicity}>
                <select className={`nsf-input${errors.ethnicity ? ' nsf-input-error' : ''}`}
                  value={form.ethnicity} onChange={e => set('ethnicity', e.target.value)}>
                  <option value="">Please Select</option>
                  {ETHNICITIES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Visa Status" required error={errors.visaStatus}>
                <select className={`nsf-input${errors.visaStatus ? ' nsf-input-error' : ''}`}
                  value={form.visaStatus} onChange={e => set('visaStatus', e.target.value)}>
                  <option value="">Please Select</option>
                  {VISA_STATUSES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </div>

            <div className="nsf-grid-2">
              <Field label="Share Code">
                <input className="nsf-input" value={form.shareCode} onChange={e => set('shareCode', e.target.value)} placeholder="Optional" />
              </Field>
              <Field label="Date of Arrival in the UK" required error={errors.dateOfArrival}>
                <input type="date" className={`nsf-input${errors.dateOfArrival ? ' nsf-input-error' : ''}`}
                  value={form.dateOfArrival} onChange={e => set('dateOfArrival', e.target.value)} />
              </Field>
            </div>
          </div>

          {/* ── 4. Course Selection ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Course Selection</h2>

            <Field label="Which course are you applying for?" required error={errors.course}>
              <select className={`nsf-input${errors.course ? ' nsf-input-error' : ''}`}
                value={form.course} onChange={e => set('course', e.target.value)}>
                <option value="">Please Select</option>
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            {form.course === 'Other Courses' && (
              <Field label="Other Courses (select all that apply)">
                <div className="nsf-radio-group" style={{ flexDirection: 'column', gap: 8 }}>
                  {OTHER_COURSES.map(o => (
                    <label key={o} className="nsf-radio">
                      <input type="checkbox" checked={form.otherCourses.includes(o)} onChange={() => toggleOtherCourse(o)} />
                      {o}
                    </label>
                  ))}
                </div>
              </Field>
            )}

            <div className="nsf-grid-3">
              <Field label="When would you like to start study?" required error={errors.startDate}>
                <select className={`nsf-input${errors.startDate ? ' nsf-input-error' : ''}`}
                  value={form.startDate} onChange={e => set('startDate', e.target.value)}>
                  <option value="">Please Select</option>
                  {START_DATES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Passport Number" required error={errors.passportNumber}>
                <input className={`nsf-input${errors.passportNumber ? ' nsf-input-error' : ''}`}
                  value={form.passportNumber} onChange={e => set('passportNumber', e.target.value)} />
              </Field>
              <Field label="Preferred Study Centre" required error={errors.studyCentre}>
                <select className={`nsf-input${errors.studyCentre ? ' nsf-input-error' : ''}`}
                  value={form.studyCentre} onChange={e => set('studyCentre', e.target.value)}>
                  <option value="">Please Select</option>
                  {STUDY_CENTRES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>
          </div>

          {/* ── 5. Employment ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Employment</h2>

            <Field label="Employment Status" required error={errors.employmentStatus}>
              <select className={`nsf-input${errors.employmentStatus ? ' nsf-input-error' : ''}`}
                value={form.employmentStatus} onChange={e => set('employmentStatus', e.target.value)}>
                <option value="">Please Select</option>
                {EMPLOYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            {(form.employmentStatus === 'Employed' || form.employmentStatus === 'Self Employed') && (
              <>
                <div className="nsf-grid-2">
                  <Field label="Name of Employer">
                    <input className="nsf-input" value={form.employerName} onChange={e => set('employerName', e.target.value)} />
                  </Field>
                  <Field label="Date of Employment" required error={errors.dateOfEmployment}>
                    <input type="date" className={`nsf-input${errors.dateOfEmployment ? ' nsf-input-error' : ''}`}
                      value={form.dateOfEmployment} onChange={e => set('dateOfEmployment', e.target.value)} />
                  </Field>
                </div>
                <Field label="Length of Employment" required error={errors.lengthOfEmployment}>
                  <select className={`nsf-input${errors.lengthOfEmployment ? ' nsf-input-error' : ''}`}
                    value={form.lengthOfEmployment} onChange={e => set('lengthOfEmployment', e.target.value)}>
                    <option value="">Please Select</option>
                    {LENGTH_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </Field>
              </>
            )}

            {form.employmentStatus === 'Unemployed' && (
              <Field label="Length of Unemployment" required error={errors.lengthOfUnemployment}>
                <select className={`nsf-input${errors.lengthOfUnemployment ? ' nsf-input-error' : ''}`}
                  value={form.lengthOfUnemployment} onChange={e => set('lengthOfUnemployment', e.target.value)}>
                  <option value="">Please Select</option>
                  {LENGTH_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </Field>
            )}

            <Field label="Have you ever applied for student finance?" required error={errors.studentFinance}>
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className="nsf-radio">
                    <input type="radio" name="studentFinance" value={v} checked={form.studentFinance === v} onChange={() => set('studentFinance', v)} />
                    {v}
                  </label>
                ))}
              </div>
            </Field>
            {form.studentFinance === 'Yes' && (
              <Field label="If yes, please specify when and for what course?">
                <input className="nsf-input" value={form.studentFinanceDetails} onChange={e => set('studentFinanceDetails', e.target.value)} />
              </Field>
            )}
          </div>

          {/* ── 6. Declarations ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Declarations</h2>

            <Field label="Disclose any disability / medical condition" required error={errors.disability}>
              <select className={`nsf-input${errors.disability ? ' nsf-input-error' : ''}`}
                value={form.disability} onChange={e => set('disability', e.target.value)}>
                <option value="">Please Select</option>
                {DISABILITIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
            {form.disability && form.disability !== 'No disability' && (
              <Field label="If other, please give details">
                <input className="nsf-input" value={form.disabilityDetails} onChange={e => set('disabilityDetails', e.target.value)} />
              </Field>
            )}

            <Field label="Do you have any spent/unspent criminal conviction?" required error={errors.criminalConviction}>
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className="nsf-radio">
                    <input type="radio" name="criminalConviction" value={v} checked={form.criminalConviction === v} onChange={() => set('criminalConviction', v)} />
                    {v}
                  </label>
                ))}
              </div>
            </Field>
            {form.criminalConviction === 'Yes' && (
              <Field label="If yes, please give details">
                <input className="nsf-input" value={form.convictionDetails} onChange={e => set('convictionDetails', e.target.value)} />
              </Field>
            )}

            <Field label="Are you in receipt of any benefits?" required error={errors.benefits}>
              <div className="nsf-radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className="nsf-radio">
                    <input type="radio" name="benefits" value={v} checked={form.benefits === v} onChange={() => set('benefits', v)} />
                    {v}
                  </label>
                ))}
              </div>
            </Field>
            {form.benefits === 'Yes' && (
              <Field label="If yes, what type of benefits are you receiving?">
                <select className="nsf-input" value={form.benefitsType} onChange={e => set('benefitsType', e.target.value)}>
                  <option value="">Please Select</option>
                  {BENEFITS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
            )}

            <Field label="How did you hear about us?" required error={errors.hearAbout}>
              <select className={`nsf-input${errors.hearAbout ? ' nsf-input-error' : ''}`}
                value={form.hearAbout} onChange={e => set('hearAbout', e.target.value)}>
                <option value="">Please Select</option>
                {HEAR_ABOUT.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </Field>
            {(form.hearAbout === 'Referral' || form.hearAbout === 'Previous Student Recommendation') && (
              <Field label="Referral Name">
                <input className="nsf-input" value={form.referralName} onChange={e => set('referralName', e.target.value)} />
              </Field>
            )}
          </div>

          {/* ── 7. Documents ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Supporting Documents</h2>
            <p className="nsf-section-sub">Upload any supporting documents you have. All file types accepted.</p>

            <div className="nsf-grid-2">
              {FILE_FIELDS.map(({ key, label }) => (
                <Field key={key} label={label} hint={files[key] ? `Selected: ${files[key].name}` : undefined}>
                  <input
                    type="file"
                    className="nsf-input nsf-file-input"
                    onChange={e => setFile(key, e.target.files?.[0] || null)}
                  />
                </Field>
              ))}
            </div>
          </div>

          {/* ── 8. Signature ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Signature</h2>
            <div className="nsf-grid-2">
              <Field label="Signature (type your full name)">
                <input className="nsf-input" value={form.signature} onChange={e => set('signature', e.target.value)} />
              </Field>
              <Field label="Date">
                <input type="date" className="nsf-input" value={form.signatureDate} onChange={e => set('signatureDate', e.target.value)} />
              </Field>
            </div>

            <label className="nsf-radio" style={{ marginTop: 16 }}>
              <input
                type="checkbox"
                checked={form.privacyAgreed}
                onChange={e => set('privacyAgreed', e.target.checked)}
              />
              I confirm the information provided is accurate and agree to the privacy policy. *
            </label>
            {errors.privacyAgreed && <div className="nsf-error">{errors.privacyAgreed}</div>}
          </div>

          {/* ── Submit ── */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <button type="submit" className="nsf-btn-primary" disabled={uploading}>
              {uploading ? 'Submitting…' : 'Submit Application'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
