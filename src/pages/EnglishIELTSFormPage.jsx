import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InnerPage.css';
import './NewStarterFormPage.css';
import { saveSubmission, saveSubmissionToDB, exportToSheets, sendEmailNotification, sendConfirmationEmail } from '../config/forms';

// ── Constants ──────────────────────────────────────────────────────────────────
const COUNTRIES = [
  'United Kingdom','Afghanistan','Albania','Algeria','American Samoa','Andorra','Angola',
  'Anguilla','Antigua and Barbuda','Argentina','Armenia','Aruba','Australia','Austria',
  'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize',
  'Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei Darussalam',
  'Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cape Verde',
  'Central African Republic','Chad','Chile','China','Colombia','Comoros',
  'Congo, Democratic Republic of the','Congo, Republic of the','Costa Rica','Croatia',
  'Cuba','Curaçao','Cyprus','Czech Republic',"Côte d'Ivoire",'Denmark','Djibouti',
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
  'Afghan','Albanian','Algerian','American','Andorran','Angolan','Argentine','Armenian',
  'Australian','Austrian','Azerbaijani','Bahraini','Bangladeshi','Belarusian','Belgian',
  'Belizean','Beninese','Bhutanese','Bolivian','Bosnian','Botswanan','Brazilian',
  'British','Bulgarian','Burundian','Cambodian','Cameroonian','Canadian','Cape Verdean',
  'Central African','Chadian','Chilean','Chinese','Colombian','Congolese','Costa Rican',
  'Croatian','Cuban','Cypriot','Czech','Danish','Djiboutian','Dominican','Ecuadorian',
  'Egyptian','Eritrean','Estonian','Ethiopian','Fijian','Finnish','French','Gabonese',
  'Gambian','Georgian','German','Ghanaian','Greek','Guatemalan','Guinean','Guyanese',
  'Haitian','Honduran','Hungarian','Icelandic','Indian','Indonesian','Iranian','Iraqi',
  'Irish','Israeli','Italian','Jamaican','Japanese','Jordanian','Kazakh','Kenyan',
  'Kuwaiti','Kyrgyz','Latvian','Lebanese','Liberian','Libyan','Lithuanian',
  'Luxembourgish','Macedonian','Malagasy','Malawian','Malaysian','Maldivian','Malian',
  'Maltese','Mauritanian','Mauritian','Mexican','Moldovan','Mongolian','Montenegrin',
  'Moroccan','Mozambican','Namibian','Nepalese','Dutch','New Zealander','Nicaraguan',
  'Nigerian','Norwegian','Omani','Pakistani','Palestinian','Panamanian','Paraguayan',
  'Peruvian','Filipino','Polish','Portuguese','Qatari','Romanian','Russian','Rwandan',
  'Saudi Arabian','Senegalese','Serbian','Sierra Leonean','Singaporean','Slovak',
  'Slovenian','Somali','South African','South Korean','South Sudanese','Spanish',
  'Sri Lankan','Sudanese','Swedish','Swiss','Syrian','Taiwanese','Tajik','Tanzanian',
  'Thai','Togolese','Trinidadian','Tunisian','Turkish','Turkmen','Ugandan','Ukrainian',
  'Emirati','Uruguayan','Uzbek','Venezuelan','Vietnamese','Yemeni',
  'Zambian','Zimbabwean','Other',
];

const ETHNICITIES = [
  'English / Welsh / Scottish / Northern Irish / British',
  'Irish',
  'Gypsy or Irish Traveller',
  'Any other White background',
  'White and Black Caribbean',
  'White and Black African',
  'White and Asian',
  'Any other Mixed / Multiple ethnic background',
  'Indian',
  'Pakistani',
  'Bengladeshi',
  'Chinese',
  'Any Other Asian Background',
  'African',
  'Caribbean',
  'Any other Black / African / Caribbean background',
  'Arab',
  'Any other ethnic group',
];

const VISA_STATUSES = [
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
  'Skilled Worker Leave To Remain',
];

const SHARE_CODE_VISA = [
  'Pre-settled status (EU settlement scheme )',
  'Fully Settled in the UK',
  'Pre Settled',
];

const COURSES = [
  'ESOL (English for Speakers of Other Languages)',
  'NCFE & Open Awards Level 2 in English',
  'NCFE & Open Awards Level 1 in English',
  'IELTS - Exam Preparation',
];

// ── Field helper ────────────────────────────────────────────────────────────────
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

// ── Initial state ───────────────────────────────────────────────────────────────
const initialState = {
  title: '', firstName: '', lastName: '',
  sex: '', dob: '', mobile: '', email: '', emergencyContact: '',
  addressLine1: '', addressLine2: '', city: '', stateProvince: '', postCode: '', country: '',
  nextOfKinName: '', nextOfKinRelationship: '', nextOfKinTelephone: '',
  nationalInsurance: '', passportNumber: '', ukResident3Years: '',
  nationality: '', ethnicity: '', visaStatus: '', shareCode: '',
  course: '',
  privacyAgreed: false,
};

export default function EnglishIELTSFormPage() {
  const navigate = useNavigate();
  const [form, setForm]         = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [errors, setErrors]         = useState({});

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.title)                       e.title = 'Required';
    if (!form.firstName.trim())            e.firstName = 'Required';
    if (!form.lastName.trim())             e.lastName = 'Required';
    if (!form.sex)                         e.sex = 'Required';
    if (!form.dob)                         e.dob = 'Required';
    if (!form.mobile.trim())               e.mobile = 'Required';
    if (!form.email.trim())                e.email = 'Required';
    if (!form.emergencyContact.trim())     e.emergencyContact = 'Required';
    if (!form.nextOfKinName.trim())        e.nextOfKinName = 'Required';
    if (!form.nextOfKinRelationship.trim()) e.nextOfKinRelationship = 'Required';
    if (!form.nextOfKinTelephone.trim())   e.nextOfKinTelephone = 'Required';
    if (!form.passportNumber.trim())       e.passportNumber = 'Required';
    if (!form.ukResident3Years)            e.ukResident3Years = 'Required';
    if (!form.nationality)                 e.nationality = 'Required';
    if (!form.ethnicity)                   e.ethnicity = 'Required';
    if (!form.visaStatus)                  e.visaStatus = 'Required';
    if (!form.course)                      e.course = 'Required';
    if (!form.privacyAgreed)               e.privacyAgreed = 'You must agree to the terms and conditions';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setSubmitting(true);
    try {
      const entry = saveSubmission('English & IELTS Application', { ...form });
      saveSubmissionToDB(entry).catch(console.error);
      await exportToSheets(entry);
      sendEmailNotification(entry).catch(console.error);
      sendConfirmationEmail(entry).catch(console.error);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success ─────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="inner-page page-enter">
        <div className="container inner-content">
          <div className="nsf-success">
            <div className="nsf-success-icon">✓</div>
            <h2>Application Received!</h2>
            <p>Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your application has been successfully submitted.</p>
            <p>A confirmation has been sent to <strong>{form.email}</strong>. Our team will be in touch shortly.</p>
            <button className="nsf-btn-primary" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="inner-page page-enter">
      <div className="container inner-content">

        {Object.keys(errors).length > 0 && (
          <div style={{
            background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 10,
            padding: '12px 18px', marginBottom: 20, color: '#dc2626',
            fontSize: '0.88rem', fontWeight: 600,
          }}>
            ⚠ Please fill in all required fields before submitting.
          </div>
        )}

        <div className="nsf-page-header">
          <h1 className="nsf-page-title">English & IELTS Application</h1>
          <p className="nsf-page-sub">Please complete all required fields marked with *</p>
        </div>
        <form className="nsf-form" onSubmit={handleSubmit} noValidate>

          {/* ── 1. Personal Details ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Personal Details</h2>

            <Field label="Title" required>
              <div className="nsf-radio-group">
                {['Dr.','Miss','Mr.','Mrs.','Ms.','Prof.','Rev.'].map(t => (
                  <label key={t} className={`nsf-radio${errors.title ? ' nsf-input-error' : ''}`}>
                    <input type="radio" name="title" value={t} checked={form.title === t} onChange={() => set('title', t)} />
                    {t}
                  </label>
                ))}
              </div>
              {errors.title && <span className="nsf-error">{errors.title}</span>}
            </Field>

            <div className="nsf-grid-3" style={{ marginTop: 20 }}>
              <Field label="First Name" required>
                <input className={`nsf-input${errors.firstName ? ' nsf-input-error' : ''}`}
                  value={form.firstName} onChange={e => set('firstName', e.target.value)} />
                {errors.firstName && <span className="nsf-error">{errors.firstName}</span>}
              </Field>
              <Field label="Surname" required>
                <input className={`nsf-input${errors.lastName ? ' nsf-input-error' : ''}`}
                  value={form.lastName} onChange={e => set('lastName', e.target.value)} />
                {errors.lastName && <span className="nsf-error">{errors.lastName}</span>}
              </Field>
              <Field label="Gender" required>
                <div className={`nsf-radio-group${errors.sex ? ' nsf-radio-error' : ''}`}>
                  {['Male','Female','Other'].map(g => (
                    <label key={g} className="nsf-radio">
                      <input type="radio" name="sex" value={g} checked={form.sex === g} onChange={() => set('sex', g)} />
                      {g}
                    </label>
                  ))}
                </div>
                {errors.sex && <span className="nsf-error">{errors.sex}</span>}
              </Field>
            </div>

            <div className="nsf-grid-3">
              <Field label="Date of Birth" required>
                <input type="date" className={`nsf-input${errors.dob ? ' nsf-input-error' : ''}`}
                  value={form.dob} onChange={e => set('dob', e.target.value)} />
                {errors.dob && <span className="nsf-error">{errors.dob}</span>}
              </Field>
              <Field label="Mobile" required>
                <input className={`nsf-input${errors.mobile ? ' nsf-input-error' : ''}`}
                  value={form.mobile} onChange={e => set('mobile', e.target.value)} />
                {errors.mobile && <span className="nsf-error">{errors.mobile}</span>}
              </Field>
              <Field label="Email" required>
                <input type="email" className={`nsf-input${errors.email ? ' nsf-input-error' : ''}`}
                  value={form.email} onChange={e => set('email', e.target.value)} />
                {errors.email && <span className="nsf-error">{errors.email}</span>}
              </Field>
            </div>

            <Field label="Emergency Contact" required hint="Name, relationship and phone number">
              <input className={`nsf-input${errors.emergencyContact ? ' nsf-input-error' : ''}`}
                value={form.emergencyContact} onChange={e => set('emergencyContact', e.target.value)} />
              {errors.emergencyContact && <span className="nsf-error">{errors.emergencyContact}</span>}
            </Field>
          </div>

          {/* ── 2. Address ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Address</h2>
            <div className="nsf-grid-2">
              <Field label="Street Address">
                <input className="nsf-input" value={form.addressLine1}
                  onChange={e => set('addressLine1', e.target.value)} />
              </Field>
              <Field label="Address Line 2">
                <input className="nsf-input" value={form.addressLine2}
                  onChange={e => set('addressLine2', e.target.value)} />
              </Field>
            </div>
            <div className="nsf-grid-3">
              <Field label="City">
                <input className="nsf-input" value={form.city}
                  onChange={e => set('city', e.target.value)} />
              </Field>
              <Field label="State / Province">
                <input className="nsf-input" value={form.stateProvince}
                  onChange={e => set('stateProvince', e.target.value)} />
              </Field>
              <Field label="ZIP / Postal Code">
                <input className="nsf-input" value={form.postCode}
                  onChange={e => set('postCode', e.target.value)} />
              </Field>
            </div>
            <Field label="Country">
              <select className="nsf-input" value={form.country}
                onChange={e => set('country', e.target.value)}>
                <option value="">Select country</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          {/* ── 3. Next of Kin ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Next of Kin</h2>
            <div className="nsf-grid-3">
              <Field label="Full Name" required>
                <input className={`nsf-input${errors.nextOfKinName ? ' nsf-input-error' : ''}`}
                  value={form.nextOfKinName} onChange={e => set('nextOfKinName', e.target.value)} />
                {errors.nextOfKinName && <span className="nsf-error">{errors.nextOfKinName}</span>}
              </Field>
              <Field label="Relationship" required>
                <input className={`nsf-input${errors.nextOfKinRelationship ? ' nsf-input-error' : ''}`}
                  value={form.nextOfKinRelationship} onChange={e => set('nextOfKinRelationship', e.target.value)} />
                {errors.nextOfKinRelationship && <span className="nsf-error">{errors.nextOfKinRelationship}</span>}
              </Field>
              <Field label="Telephone" required>
                <input className={`nsf-input${errors.nextOfKinTelephone ? ' nsf-input-error' : ''}`}
                  value={form.nextOfKinTelephone} onChange={e => set('nextOfKinTelephone', e.target.value)} />
                {errors.nextOfKinTelephone && <span className="nsf-error">{errors.nextOfKinTelephone}</span>}
              </Field>
            </div>
          </div>

          {/* ── 4. Identification ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Identification</h2>
            <div className="nsf-grid-3">
              <Field label="National Insurance Number">
                <input className="nsf-input" value={form.nationalInsurance}
                  onChange={e => set('nationalInsurance', e.target.value)} />
              </Field>
              <Field label="Passport Number" required>
                <input className={`nsf-input${errors.passportNumber ? ' nsf-input-error' : ''}`}
                  value={form.passportNumber} onChange={e => set('passportNumber', e.target.value)} />
                {errors.passportNumber && <span className="nsf-error">{errors.passportNumber}</span>}
              </Field>
              <Field label="UK Resident 3+ Years?" required>
                <div className={`nsf-radio-group${errors.ukResident3Years ? ' nsf-radio-error' : ''}`}>
                  {['Yes','No'].map(v => (
                    <label key={v} className="nsf-radio">
                      <input type="radio" name="ukResident3Years" value={v} checked={form.ukResident3Years === v} onChange={() => set('ukResident3Years', v)} />
                      {v}
                    </label>
                  ))}
                </div>
                {errors.ukResident3Years && <span className="nsf-error">{errors.ukResident3Years}</span>}
              </Field>
            </div>
          </div>

          {/* ── 5. Background ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Background</h2>
            <div className="nsf-grid-3">
              <Field label="Nationality" required>
                <select className={`nsf-input${errors.nationality ? ' nsf-input-error' : ''}`}
                  value={form.nationality} onChange={e => set('nationality', e.target.value)}>
                  <option value="">Select nationality</option>
                  {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                {errors.nationality && <span className="nsf-error">{errors.nationality}</span>}
              </Field>
              <Field label="Ethnicity" required>
                <select className={`nsf-input${errors.ethnicity ? ' nsf-input-error' : ''}`}
                  value={form.ethnicity} onChange={e => set('ethnicity', e.target.value)}>
                  <option value="">Select ethnicity</option>
                  {ETHNICITIES.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                {errors.ethnicity && <span className="nsf-error">{errors.ethnicity}</span>}
              </Field>
              <Field label="Visa Status" required>
                <select className={`nsf-input${errors.visaStatus ? ' nsf-input-error' : ''}`}
                  value={form.visaStatus} onChange={e => set('visaStatus', e.target.value)}>
                  <option value="">Select visa status</option>
                  {VISA_STATUSES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                {errors.visaStatus && <span className="nsf-error">{errors.visaStatus}</span>}
              </Field>
            </div>
            {SHARE_CODE_VISA.includes(form.visaStatus) && (
              <Field label="Share Code">
                <input className="nsf-input" value={form.shareCode}
                  onChange={e => set('shareCode', e.target.value)}
                  placeholder="Enter your share code" />
              </Field>
            )}
          </div>

          {/* ── 6. Course Selection ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Course Selection</h2>
            <Field label="Which course are you applying for?" required>
              <select className={`nsf-input${errors.course ? ' nsf-input-error' : ''}`}
                value={form.course} onChange={e => set('course', e.target.value)}>
                <option value="">Select a course</option>
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.course && <span className="nsf-error">{errors.course}</span>}
            </Field>
          </div>

          {/* ── 7. Terms & Conditions ── */}
          <div className="nsf-section">
            <h2 className="nsf-section-title">Terms & Conditions</h2>
            <label className="nsf-checkbox-label">
              <input type="checkbox" checked={form.privacyAgreed}
                onChange={e => set('privacyAgreed', e.target.checked)} />
              I agree to the{' '}
              <a href="/assets/documents/terms/terms-conditions-el.pdf"
                target="_blank" rel="noopener noreferrer">
                terms and conditions
              </a>.
            </label>
            {errors.privacyAgreed && (
              <span className="nsf-checkbox-error">{errors.privacyAgreed}</span>
            )}
          </div>

          {/* ── Submit ── */}
          <div className="nsf-submit-row">
            <button type="submit" className="nsf-btn-primary" disabled={submitting}>
              {submitting ? <><span className="nsf-spinner" /> Submitting…</> : 'Submit Application →'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
