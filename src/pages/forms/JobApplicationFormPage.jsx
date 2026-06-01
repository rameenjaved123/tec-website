import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../InnerPage.css';
import './NewStarterFormPage.css';
import { uploadToS3, saveSubmission, saveSubmissionToDB, exportToSheets, sendEmailNotification, sendConfirmationEmail } from '../../config/forms';

// ── Constants ────────────────────────────────────────────────────
const COUNTRIES = [
  'United Kingdom','Afghanistan','Albania','Algeria','American Samoa','Andorra','Angola',
  'Anguilla','Antigua and Barbuda','Argentina','Armenia','Aruba','Australia','Austria',
  'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize',
  'Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei Darussalam',
  'Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cape Verde',
  'Central African Republic','Chad','Chile','China','Colombia','Comoros',
  'Congo, Democratic Republic of the','Congo, Republic of the','Costa Rica','Croatia',
  'Cuba','Curaçao','Cyprus','Czech Republic','Côte d\'Ivoire','Denmark','Djibouti',
  'Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea',
  'Eritrea','Estonia','Eswatini (Swaziland)','Ethiopia','Fiji','Finland','France',
  'Gabon','Gambia','Georgia','Germany','Ghana','Gibraltar','Greece','Grenada','Guatemala',
  'Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hong Kong','Hungary','Iceland',
  'India','Indonesia','Iran','Iraq','Ireland','Isle of Man','Israel','Italy','Jamaica',
  'Japan','Jersey','Jordan','Kazakhstan','Kenya','Kuwait','Kyrgyzstan','Latvia','Lebanon',
  'Lesotho','Liberia','Libya','Lithuania','Luxembourg','Macedonia','Madagascar','Malawi',
  'Malaysia','Maldives','Mali','Malta','Mauritania','Mauritius','Mexico','Moldova',
  'Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nepal',
  'Netherlands','New Zealand','Nicaragua','Niger','Nigeria','Norway','Oman','Pakistan',
  'Palestine, State of','Panama','Papua New Guinea','Paraguay','Peru','Philippines',
  'Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saudi Arabia','Senegal',
  'Serbia','Sierra Leone','Singapore','Slovakia','Slovenia','Somalia','South Africa',
  'South Korea','South Sudan','Spain','Sri Lanka','Sudan','Sweden','Switzerland','Syria',
  'Taiwan','Tajikistan','Tanzania','Thailand','Togo','Trinidad and Tobago','Tunisia',
  'Turkey','Turkmenistan','Uganda','Ukraine','United Arab Emirates','United States',
  'Uruguay','Uzbekistan','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe','Other',
];

const NATIONALITIES = [
  'British','Afghan','Albanian','Algerian','Andorran','Angolan','Argentine','Armenian',
  'Australian','Austrian','Azerbaijani','Bahraini','Bangladeshi','Belarusian','Belgian',
  'Bolivian','Bosnian','Brazilian','Bulgarian','Cambodian','Cameroonian','Canadian',
  'Chilean','Chinese','Colombian','Congolese','Croatian','Cuban','Cypriot','Czech',
  'Danish','Egyptian','Estonian','Ethiopian','Finnish','French','Georgian','German',
  'Ghanaian','Greek','Guatemalan','Honduran','Hungarian','Indian','Indonesian','Iranian',
  'Iraqi','Irish','Israeli','Italian','Jamaican','Japanese','Jordanian','Kazakh','Kenyan',
  'Kuwaiti','Kyrgyz','Latvian','Lebanese','Libyan','Lithuanian','Luxembourgish',
  'Macedonian','Malagasy','Malawian','Malaysian','Maldivian','Malian','Maltese',
  'Mauritanian','Mexican','Moldovan','Mongolian','Montenegrin','Moroccan','Mozambican',
  'Namibian','Nepalese','Dutch','New Zealander','Nicaraguan','Nigerian','Norwegian',
  'Omani','Pakistani','Palestinian','Panamanian','Paraguayan','Peruvian','Filipino',
  'Polish','Portuguese','Qatari','Romanian','Russian','Rwandan','Saudi Arabian',
  'Senegalese','Serbian','Sierra Leonean','Singaporean','Slovak','Slovenian','Somali',
  'South African','South Korean','Spanish','Sri Lankan','Sudanese','Swedish','Swiss',
  'Syrian','Taiwanese','Tajik','Tanzanian','Thai','Togolese','Trinidadian','Tunisian',
  'Turkish','Turkmen','Ugandan','Ukrainian','Emirati','American','Uruguayan','Uzbek',
  'Venezuelan','Vietnamese','Yemeni','Zambian','Zimbabwean','Other',
];

const ETHNICITIES = [
  'English / Welsh / Scottish / Northern Irish / British','Irish','Gypsy or Irish Traveller',
  'Any other White background','White and Black Caribbean','White and Black African',
  'White and Asian','Any other Mixed / Multiple ethnic background',
  'Indian','Pakistani','Bangladeshi','Chinese','Any Other Asian Background',
  'African','Caribbean','Any other Black / African / Caribbean background',
  'Arab','Any other ethnic group',
];

const VISA_STATUSES = [
  'UK Citizen - English',
  'UK Citizen - Wales',
  'UK Citizen - Scotland',
  'UK Citizen - Northern Ireland',
  'EEA or Swiss national',
  'EU National (non-UK Citizen)',
  'Pre Settled',
  'Pre-settled status (EU settlement scheme)',
  'Fully Settled in the UK',
  'Refugee',
  'Humanitarian Protection or similar',
  'Biometric Residents Permit',
  'Indefinite leave to remain',
  'Skilled Worker Leave to Remain',
  'Dependent Leave to Remain',
  'Other',
];

const DISABILITIES = [
  'No disability',
  'Autistic disorder',
  'Blind/partial sight',
  'Deaf/partial hearing',
  'Long standing illness',
  'Mental health',
  'Learning difficulty',
  'Wheelchair/mobility',
  'Other disability',
  'Multiple disabilities',
];

const LOCATIONS = ['London', 'Birmingham', 'Nottingham', 'Leicester'];

// ── Helper components ────────────────────────────────────────────
function Field({ label, required, hint, children }) {
  return (
    <div className="nsf-field">
      <label className="nsf-label">
        {label}{required && <span className="nsf-required"> *</span>}
      </label>
      {hint && <span className="nsf-field-hint">{hint}</span>}
      {children}
    </div>
  );
}

function Sel({ value, onChange, options, placeholder, error }) {
  return (
    <select
      className={`nsf-input${error ? ' nsf-input-error' : ''}`}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

const initialForm = {
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  dob: '',
  mobile: '',
  email: '',
  emergencyContact: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: 'United Kingdom',
  postCode: '',
  countryOfBirth: 'Romania',
  nationality: 'Romanian',
  ethnicity: 'Any other White background',
  visaStatus: 'Biometric Residents Permit',
  siteLocation: 'Nottingham',
  disability: '',
  disabilityDetails: '',
  criminalConviction: '',
  convictionDetails: '',
  privacyAgreed: false,
};

export default function JobApplicationFormPage() {
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get('job') || '';

  const [form, setForm] = useState(initialForm);
  const [qualifications, setQualifications] = useState(['']);
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  // ── Qualifications list helpers ──────────────────────────────
  const addQual = () => setQualifications(q => [...q, '']);
  const removeQual = (i) => setQualifications(q => q.filter((_, idx) => idx !== i));
  const setQual = (i, val) => setQualifications(q => q.map((v, idx) => idx === i ? val : v));

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.firstName.trim())      e.firstName      = 'Required';
    if (!form.lastName.trim())       e.lastName       = 'Required';
    if (!form.gender)                e.gender         = 'Required';
    if (!form.dob)                   e.dob            = 'Required';
    if (!form.mobile.trim())         e.mobile         = 'Required';
    if (!form.email.trim())          e.email          = 'Required';
    if (!form.emergencyContact.trim()) e.emergencyContact = 'Required';
    if (!form.addressLine1.trim())   e.addressLine1   = 'Required';
    if (!form.city.trim())           e.city           = 'Required';
    if (!form.postCode.trim())       e.postCode       = 'Required';
    if (!form.countryOfBirth)        e.countryOfBirth = 'Required';
    if (!form.nationality)           e.nationality    = 'Required';
    if (!form.ethnicity)             e.ethnicity      = 'Required';
    if (!form.visaStatus)            e.visaStatus     = 'Required';
    if (!form.siteLocation)          e.siteLocation   = 'Required';
    if (!form.disability)            e.disability     = 'Required';
    if (!form.criminalConviction)    e.criminalConviction = 'Required';
    if (!form.privacyAgreed)         e.privacyAgreed  = 'You must agree to the privacy policy';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      document.querySelector('.nsf-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setUploading(true);
    try {
      const payload = {
        ...form,
        jobTitle,
        qualifications: qualifications.filter(q => q.trim()).join('; '),
      };

      if (cvFile) {
        const { fileUrl } = await uploadToS3(cvFile, 'job-applications/cv');
        payload.cvFileUrl = fileUrl;
      }

      const entry = saveSubmission('Job Application', payload);
      saveSubmissionToDB(entry).catch(err => console.error('DynamoDB save failed:', err));
      exportToSheets(entry).catch(err => console.error('Sheets sync failed:', err));
      sendEmailNotification(entry).catch(err => console.error('HR email failed:', err));
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
            <p>A member of our HR team will review your application and be in touch shortly.</p>
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
          <h1 className="nsf-page-title">Job Application Form</h1>
          {jobTitle && (
            <p className="nsf-page-sub" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#1a4d2e' }}>
              Job Title: {jobTitle}
            </p>
          )}
          <p className="nsf-page-sub">Please complete all required fields marked with *</p>
        </div>

        <form className="nsf-form" onSubmit={handleSubmit} noValidate>

          {/* ── 1. Personal Information ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Personal Information</h2>

            <Field label="Title">
              <div className="nsf-radio-group">
                {['Dr.','Miss','Mr.','Mrs.','Ms.','Prof.','Rev.'].map(t => (
                  <label key={t} className="nsf-radio">
                    <input type="radio" name="title" value={t} checked={form.title === t} onChange={() => set('title', t)} />
                    {t}
                  </label>
                ))}
              </div>
            </Field>

            <div className="nsf-grid-3" style={{ marginTop: 20 }}>
              <Field label="First Name" required>
                <input
                  className={`nsf-input${errors.firstName ? ' nsf-input-error' : ''}`}
                  value={form.firstName}
                  onChange={e => set('firstName', e.target.value)}
                  placeholder="First name"
                />
                {errors.firstName && <span className="nsf-error">{errors.firstName}</span>}
              </Field>
              <Field label="Middle Name">
                <input
                  className="nsf-input"
                  value={form.middleName}
                  onChange={e => set('middleName', e.target.value)}
                  placeholder="Middle name (optional)"
                />
              </Field>
              <Field label="Surname" required>
                <input
                  className={`nsf-input${errors.lastName ? ' nsf-input-error' : ''}`}
                  value={form.lastName}
                  onChange={e => set('lastName', e.target.value)}
                  placeholder="Surname"
                />
                {errors.lastName && <span className="nsf-error">{errors.lastName}</span>}
              </Field>
            </div>

            <div className="nsf-grid-2">
              <Field label="Gender" required>
                <Sel
                  value={form.gender}
                  onChange={v => set('gender', v)}
                  options={['Male','Female','Non-binary','I prefer not to say','Other']}
                  placeholder="— Select —"
                  error={errors.gender}
                />
                {errors.gender && <span className="nsf-error">{errors.gender}</span>}
              </Field>
              <Field label="Date of Birth" required>
                <input
                  type="date"
                  className={`nsf-input${errors.dob ? ' nsf-input-error' : ''}`}
                  value={form.dob}
                  onChange={e => set('dob', e.target.value)}
                />
                {errors.dob && <span className="nsf-error">{errors.dob}</span>}
              </Field>
            </div>

            <div className="nsf-grid-2">
              <Field label="Mobile Number" required>
                <input
                  type="tel"
                  className={`nsf-input${errors.mobile ? ' nsf-input-error' : ''}`}
                  value={form.mobile}
                  onChange={e => set('mobile', e.target.value)}
                  placeholder="+44 7..."
                />
                {errors.mobile && <span className="nsf-error">{errors.mobile}</span>}
              </Field>
              <Field label="Email Address" required>
                <input
                  type="email"
                  className={`nsf-input${errors.email ? ' nsf-input-error' : ''}`}
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="email@example.com"
                />
                {errors.email && <span className="nsf-error">{errors.email}</span>}
              </Field>
            </div>

            <Field label="Emergency Contact" required hint="Name and phone number">
              <input
                className={`nsf-input${errors.emergencyContact ? ' nsf-input-error' : ''}`}
                value={form.emergencyContact}
                onChange={e => set('emergencyContact', e.target.value)}
                placeholder="e.g. Jane Smith — 07700 900000"
              />
              {errors.emergencyContact && <span className="nsf-error">{errors.emergencyContact}</span>}
            </Field>
          </div>

          {/* ── 2. Address ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Address</h2>

            <Field label="First Line of Address" required>
              <input
                className={`nsf-input${errors.addressLine1 ? ' nsf-input-error' : ''}`}
                value={form.addressLine1}
                onChange={e => set('addressLine1', e.target.value)}
                placeholder="Street address"
              />
              {errors.addressLine1 && <span className="nsf-error">{errors.addressLine1}</span>}
            </Field>

            <Field label="Second Line of Address">
              <input
                className="nsf-input"
                value={form.addressLine2}
                onChange={e => set('addressLine2', e.target.value)}
                placeholder="Flat / area / district (optional)"
              />
            </Field>

            <div className="nsf-grid-3">
              <Field label="City" required>
                <input
                  className={`nsf-input${errors.city ? ' nsf-input-error' : ''}`}
                  value={form.city}
                  onChange={e => set('city', e.target.value)}
                  placeholder="City"
                />
                {errors.city && <span className="nsf-error">{errors.city}</span>}
              </Field>
              <Field label="Country" required>
                <Sel value={form.country} onChange={v => set('country', v)} options={COUNTRIES} />
              </Field>
              <Field label="Postal Code" required>
                <input
                  className={`nsf-input${errors.postCode ? ' nsf-input-error' : ''}`}
                  value={form.postCode}
                  onChange={e => set('postCode', e.target.value)}
                  placeholder="Post code"
                />
                {errors.postCode && <span className="nsf-error">{errors.postCode}</span>}
              </Field>
            </div>
          </div>

          {/* ── 3. Background ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Background</h2>

            <div className="nsf-grid-2">
              <Field label="Country of Birth" required>
                <Sel
                  value={form.countryOfBirth}
                  onChange={v => set('countryOfBirth', v)}
                  options={COUNTRIES}
                  error={errors.countryOfBirth}
                />
                {errors.countryOfBirth && <span className="nsf-error">{errors.countryOfBirth}</span>}
              </Field>
              <Field label="Nationality" required>
                <Sel
                  value={form.nationality}
                  onChange={v => set('nationality', v)}
                  options={NATIONALITIES}
                  error={errors.nationality}
                />
                {errors.nationality && <span className="nsf-error">{errors.nationality}</span>}
              </Field>
            </div>

            <div className="nsf-grid-2">
              <Field label="Ethnicity" required>
                <Sel
                  value={form.ethnicity}
                  onChange={v => set('ethnicity', v)}
                  options={ETHNICITIES}
                  error={errors.ethnicity}
                />
                {errors.ethnicity && <span className="nsf-error">{errors.ethnicity}</span>}
              </Field>
              <Field label="Visa / Immigration Status" required>
                <Sel
                  value={form.visaStatus}
                  onChange={v => set('visaStatus', v)}
                  options={VISA_STATUSES}
                  error={errors.visaStatus}
                />
                {errors.visaStatus && <span className="nsf-error">{errors.visaStatus}</span>}
              </Field>
            </div>

            {/* Qualifications — add/remove list */}
            <Field label="Qualifications" hint="Add each qualification on a separate line">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                {qualifications.map((q, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      className="nsf-input"
                      style={{ flex: 1 }}
                      value={q}
                      onChange={e => setQual(i, e.target.value)}
                      placeholder="e.g. GCSE English — Grade B"
                    />
                    {qualifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQual(i)}
                        style={{
                          background: 'none', border: '1px solid #ccc', borderRadius: 4,
                          padding: '6px 10px', cursor: 'pointer', color: '#c62828', fontWeight: 600,
                          flexShrink: 0,
                        }}
                        title="Remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addQual}
                  style={{
                    alignSelf: 'flex-start', background: 'none', border: '1px dashed #1a4d2e',
                    borderRadius: 4, padding: '6px 14px', cursor: 'pointer',
                    color: '#1a4d2e', fontWeight: 600, fontSize: 13,
                  }}
                >
                  + Add Qualification
                </button>
              </div>
            </Field>
          </div>

          {/* ── 4. Work Preferences ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Work Preferences</h2>

            <Field label="Preferred Working Location" required>
              <div className={`nsf-radio-group${errors.siteLocation ? ' nsf-radio-error' : ''}`}>
                {LOCATIONS.map(loc => (
                  <label key={loc} className="nsf-radio">
                    <input
                      type="radio"
                      name="siteLocation"
                      value={loc}
                      checked={form.siteLocation === loc}
                      onChange={() => set('siteLocation', loc)}
                    />
                    {loc}
                  </label>
                ))}
              </div>
              {errors.siteLocation && <span className="nsf-error">{errors.siteLocation}</span>}
            </Field>
          </div>

          {/* ── 5. Additional Information ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Additional Information</h2>

            <Field label="Disclose any disability / medical condition" required>
              <Sel
                value={form.disability}
                onChange={v => set('disability', v)}
                options={DISABILITIES}
                placeholder="— Select —"
                error={errors.disability}
              />
              {errors.disability && <span className="nsf-error">{errors.disability}</span>}
            </Field>

            <Field label="If yes, please provide details" hint="Leave blank if not applicable">
              <textarea
                className="nsf-input"
                style={{ resize: 'vertical', minHeight: 80 }}
                value={form.disabilityDetails}
                onChange={e => set('disabilityDetails', e.target.value)}
                placeholder="Please describe your condition or requirements"
              />
            </Field>

            <Field label="Do you have any spent or unspent criminal convictions?" required>
              <div className={`nsf-radio-group${errors.criminalConviction ? ' nsf-radio-error' : ''}`}>
                {['Yes', 'No'].map(v => (
                  <label key={v} className="nsf-radio">
                    <input
                      type="radio"
                      name="criminalConviction"
                      value={v}
                      checked={form.criminalConviction === v}
                      onChange={() => set('criminalConviction', v)}
                    />
                    {v}
                  </label>
                ))}
              </div>
              {errors.criminalConviction && <span className="nsf-error">{errors.criminalConviction}</span>}
            </Field>

            <Field label="If yes, please give details" hint="Leave blank if not applicable">
              <textarea
                className="nsf-input"
                style={{ resize: 'vertical', minHeight: 80 }}
                value={form.convictionDetails}
                onChange={e => set('convictionDetails', e.target.value)}
                placeholder="Please provide details of any convictions"
              />
            </Field>
          </div>

          {/* ── 6. CV Upload ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">CV Upload</h2>
            <p className="nsf-section-desc">Please upload your CV. Accepted formats: PDF, DOC, DOCX.</p>

            <Field label="Upload your CV">
              <div className="nsf-file-box">
                <input
                  type="file"
                  id="cvFile"
                  accept=".pdf,.doc,.docx"
                  onChange={e => setCvFile(e.target.files[0] || null)}
                />
                <label htmlFor="cvFile" className="nsf-file-label">
                  <span className="nsf-file-icon">📎</span>
                  <span>{cvFile ? cvFile.name : 'Choose file (PDF, DOC, DOCX)'}</span>
                </label>
              </div>
            </Field>
          </div>

          {/* ── 7. Declaration ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Declaration</h2>

            <div className="nsf-consent">
              <label className={`nsf-checkbox-label${errors.privacyAgreed ? ' nsf-checkbox-error' : ''}`}>
                <input
                  type="checkbox"
                  checked={form.privacyAgreed}
                  onChange={e => set('privacyAgreed', e.target.checked)}
                />
                <span>
                  I confirm that the information provided is accurate and complete to the best of my knowledge.
                  I agree to the{' '}
                  <a href="/policies" target="_blank" rel="noreferrer">privacy policy</a>{' '}
                  and consent to Trent Education Centre processing my personal data in connection with this application.
                </span>
              </label>
              {errors.privacyAgreed && <span className="nsf-error">{errors.privacyAgreed}</span>}
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="nsf-submit-row">
            <button type="submit" className="nsf-btn-primary" disabled={uploading}>
              {uploading ? (
                <><span className="nsf-spinner" /> Uploading &amp; Submitting…</>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
