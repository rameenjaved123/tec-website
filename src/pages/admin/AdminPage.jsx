import { useState, useEffect } from 'react';
import './AdminPage.css';
import {
  getAllSubmissionsFromDB,
  deleteSubmissionFromDB,
  exportToSheets,
  updateSubmissionStatusInDB,
  updateSubmissionInDB,
  getS3ViewUrl,
  FORM_REGISTRY,
  NOTIFY_EMAILS,
  sendEmailNotification,
  sendConfirmationEmail,
} from '../../config/forms';
import {
  getCurrentSession,
  signIn,
  signUp,
  verifyEmail,
  resendCode,
  signOut,
  completeNewPassword,
} from '../../utils/cognitoAuth';

// ── Group → Form mapping for RBAC ─────────────────────────
const FORM_GROUP_MAP = {
  'New Starter Form':              'new-starter-form',
  'Partnerships & Collaborations': 'partnerships',
  'Application Form':              'application-form',
  'Job Application':               'job-application',
  'English & IELTS Application':   'english-ielts',
  'Enquiry Form':                  'enquiry-form',
  'Enrolment Form':                'enrolment-form',
  'International Application':     'international-application',
  'Complaint':                     'complaint',
};

// Returns array of allowed form names, or null if admin (all access)
function getAllowedForms(groups = []) {
  if (groups.includes('admin')) return null; // null = unrestricted
  return Object.keys(FORM_REGISTRY).filter(name => {
    const g = FORM_GROUP_MAP[name];
    return g && groups.includes(g);
  });
}

// ── Auth UI ───────────────────────────────────────────────
function AdminAuth({ onAuthed }) {
  const [screen, setScreen]       = useState('login');   // login | signup | verify | new-password | pending
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [newPass, setNewPass]     = useState('');
  const [code, setCode]           = useState('');
  const [error, setError]         = useState('');
  const [info, setInfo]           = useState('');
  const [busy, setBusy]           = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);
  const [userAttrs, setUserAttrs] = useState({});

  const err = (msg) => { setError(msg); setBusy(false); };

  // ── Login ──────────────────────────────────────────────
  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      const result = await signIn(email, password);
      if (result.status === 'new-password') {
        setCognitoUser(result.cognitoUser);
        setUserAttrs(result.userAttributes);
        setScreen('new-password');
        setBusy(false);
        return;
      }
      if (result.groups.length === 0) { setBusy(false); setScreen('pending'); return; }
      onAuthed({ email: result.email, name: result.name, groups: result.groups });
    } catch (e) {
      err(e.message || 'Sign in failed');
    }
  }

  // ── Set new password (first login) ────────────────────
  async function handleNewPassword(e) {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      const result = await completeNewPassword(cognitoUser, newPass, userAttrs);
      if (result.groups.length === 0) { setBusy(false); setScreen('pending'); return; }
      onAuthed(result);
    } catch (e) {
      err(e.message || 'Failed to set password');
    }
  }

  // ── Sign up ────────────────────────────────────────────
  async function handleSignup(e) {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      await signUp(name, email, password);
      setBusy(false);
      setScreen('verify');
      setInfo('A verification code has been sent to ' + email);
    } catch (e) {
      err(e.message || 'Sign up failed');
    }
  }

  // ── Verify email ───────────────────────────────────────
  async function handleVerify(e) {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      await verifyEmail(email, code);
      setBusy(false);
      setScreen('pending');
    } catch (e) {
      err(e.message || 'Verification failed — check your code');
    }
  }

  async function handleResend() {
    setError(''); setInfo('');
    try {
      await resendCode(email);
      setInfo('A new code has been sent to ' + email);
    } catch (e) {
      setError(e.message);
    }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 6, fontSize: '0.92rem',
    border: '1px solid #d0d5d0', outline: 'none', marginBottom: 12,
    fontFamily: 'inherit', boxSizing: 'border-box',
  };
  const btnStyle = {
    width: '100%', padding: '12px', background: '#1a2e1a', color: '#c9a84c',
    border: 'none', borderRadius: 6, fontWeight: 700, fontSize: '0.95rem',
    cursor: busy ? 'not-allowed' : 'pointer', opacity: busy ? 0.7 : 1,
    fontFamily: 'inherit',
  };
  const linkStyle = {
    background: 'none', border: 'none', color: '#1a6a3a',
    cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem', padding: 0,
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-box" style={{ maxWidth: 400 }}>
        <img src="/assets/logos/tec-crest.png" alt="TEC" style={{ width: 52, margin: '0 auto 12px', display: 'block' }} />
        <h2 style={{ textAlign: 'center', color: '#1a2e1a', margin: '0 0 4px', fontSize: '1.3rem' }}>TEC Admin</h2>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', margin: '0 0 24px' }}>Forms Dashboard</p>

        {/* ── LOGIN ── */}
        {screen === 'login' && (
          <form onSubmit={handleLogin}>
            <input style={inputStyle} type="email" placeholder="Email address" value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }} required autoFocus />
            <input style={inputStyle} type="password" placeholder="Password" value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }} required />
            {error && <p className="adm-login-error" style={{ color: '#c0392b', fontSize: '0.82rem', margin: '-6px 0 10px' }}>{error}</p>}
            <button className="adm-login-btn" style={btnStyle} type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign In →'}</button>
            <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.85rem', color: '#666' }}>
              Don't have an account?{' '}
              <button type="button" style={linkStyle} onClick={() => { setScreen('signup'); setError(''); }}>Request access</button>
            </p>
          </form>
        )}

        {/* ── SIGN UP ── */}
        {screen === 'signup' && (
          <form onSubmit={handleSignup}>
            <input style={inputStyle} type="text" placeholder="Full name" value={name}
              onChange={e => { setName(e.target.value); setError(''); }} required autoFocus />
            <input style={inputStyle} type="email" placeholder="Work email address" value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }} required />
            <input style={inputStyle} type="password" placeholder="Choose a password (min 8 chars)" value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }} required minLength={8} />
            {error && <p style={{ color: '#c0392b', fontSize: '0.82rem', margin: '-6px 0 10px' }}>{error}</p>}
            <button style={btnStyle} type="submit" disabled={busy}>{busy ? 'Creating account…' : 'Request Access →'}</button>
            <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.85rem', color: '#666' }}>
              Already have an account?{' '}
              <button type="button" style={linkStyle} onClick={() => { setScreen('login'); setError(''); }}>Sign in</button>
            </p>
          </form>
        )}

        {/* ── VERIFY EMAIL ── */}
        {screen === 'verify' && (
          <form onSubmit={handleVerify}>
            {info && <p style={{ background: '#f0f7f0', border: '1px solid #c0ddc0', borderRadius: 6, padding: '10px 14px', fontSize: '0.83rem', color: '#2a5a2a', marginBottom: 14 }}>{info}</p>}
            <input style={inputStyle} type="text" placeholder="Enter 6-digit verification code" value={code}
              onChange={e => { setCode(e.target.value); setError(''); }} required autoFocus maxLength={6} />
            {error && <p style={{ color: '#c0392b', fontSize: '0.82rem', margin: '-6px 0 10px' }}>{error}</p>}
            <button style={btnStyle} type="submit" disabled={busy}>{busy ? 'Verifying…' : 'Verify Email →'}</button>
            <p style={{ textAlign: 'center', marginTop: 12, fontSize: '0.82rem', color: '#666' }}>
              Didn't receive it?{' '}
              <button type="button" style={linkStyle} onClick={handleResend}>Resend code</button>
            </p>
          </form>
        )}

        {/* ── SET NEW PASSWORD ── */}
        {screen === 'new-password' && (
          <form onSubmit={handleNewPassword}>
            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: 14 }}>
              You're using a temporary password. Please set a permanent one to continue.
            </p>
            <input style={inputStyle} type="password" placeholder="New password (min 8 chars)" value={newPass}
              onChange={e => { setNewPass(e.target.value); setError(''); }} required minLength={8} autoFocus />
            {error && <p style={{ color: '#c0392b', fontSize: '0.82rem', margin: '-6px 0 10px' }}>{error}</p>}
            <button style={btnStyle} type="submit" disabled={busy}>{busy ? 'Setting password…' : 'Set Password →'}</button>
          </form>
        )}

        {/* ── PENDING APPROVAL ── */}
        {screen === 'pending' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            <h3 style={{ color: '#1a2e1a', margin: '0 0 8px' }}>Awaiting Approval</h3>
            <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.7 }}>
              Your account has been created and your email is verified.<br />
              An admin will review and grant you access shortly.
            </p>
            <button
              style={{ ...btnStyle, marginTop: 20, width: 'auto', padding: '10px 28px' }}
              onClick={() => { signOut(); setScreen('login'); setPassword(''); }}
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Generate PDF for a single entry ──────────────────────
async function generatePDF(entry) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const PAGE_W = 210;
  const ML = 15; // left margin
  const MR = 15; // right margin
  const CW = PAGE_W - ML - MR; // 180mm content width
  const GAP = 3;  // gap between columns
  const LBL_H = 4.5; // label text height
  const BOX_H = 7;   // value box height
  const ROW_H = LBL_H + BOX_H + 2; // total per row

  let y = ML;

  // ── Load logo ────────────────────────────────────────────
  let logoData = null;
  try {
    const resp = await fetch('/assets/logos/tec-logo.png');
    const blob = await resp.blob();
    logoData = await new Promise(resolve => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.readAsDataURL(blob);
    });
  } catch (_) { /* logo optional */ }

  // ── Header: logo + form title ─────────────────────────
  if (logoData) doc.addImage(logoData, 'PNG', ML, y, 28, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(20, 20, 20);
  doc.text(entry.formType || 'Form Submission', ML + 32, y + 13);
  y += 26;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.line(ML, y, PAGE_W - MR, y);
  y += 6;

  // ── Field drawing ─────────────────────────────────────
  const drawField = (label, value, fx, fw, fh = BOX_H) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(10, 10, 10);
    doc.text(String(label).toUpperCase(), fx, y + LBL_H - 0.5);
    doc.setDrawColor(170, 170, 170);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.rect(fx, y + LBL_H, fw, fh, 'FD');
    if (value !== null && value !== undefined && value !== '') {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 15, 15);
      const lines = doc.splitTextToSize(String(value), fw - 3);
      doc.text(lines[0], fx + 2, y + LBL_H + 4.5);
    }
  };

  // Draw a row of [{label, val, cols?}] — cols is span out of row total
  const drawRow = (fields) => {
    const totalSpan = fields.reduce((s, f) => s + (f.cols || 1), 0);
    const unitW = (CW - GAP * (totalSpan - 1)) / totalSpan;
    // Determine row box height (taller for long text)
    const maxLines = fields.reduce((mx, f) => {
      if (!f.val) return mx;
      const lines = doc.splitTextToSize(String(f.val), unitW * (f.cols || 1) - 3);
      return Math.max(mx, lines.length);
    }, 1);
    const fh = Math.max(BOX_H, maxLines * 4 + 3);
    const rh = LBL_H + fh + 2;
    if (y + rh > 280) { doc.addPage(); y = ML; }
    let fx = ML;
    for (const f of fields) {
      const span = f.cols || 1;
      const fw = unitW * span + GAP * (span - 1);
      drawField(f.label, f.val, fx, fw, fh);
      fx += fw + GAP;
    }
    y += rh;
  };

  const e = entry;
  const fullName = [e.title, e.firstName, e.middleName, e.lastName].filter(Boolean).join(' ')
    || [e.firstName, e.lastName].filter(Boolean).join(' ');

  // ── Application Form ──────────────────────────────────
  if (e.formType === 'Application Form') {
    drawRow([{ label: 'Name', val: fullName }]);
    drawRow([{ label: 'Sex', val: e.sex || e.gender }, { label: 'Date of Birth', val: e.dob }]);
    drawRow([{ label: 'Mobile', val: e.mobile }, { label: 'Email', val: e.email }]);
    drawRow([{ label: 'Emergency Contact', val: e.emergencyContact }]);
    drawRow([{ label: 'National Insurance Number', val: e.nationalInsurance }, { label: 'Have you been a UK resident for 3 years or more?', val: e.ukResident3Years }]);
    drawRow([{ label: 'First Line of Address', val: e.addressLine1 }, { label: 'Second Line of Address', val: e.addressLine2 }]);
    drawRow([{ label: 'City', val: e.city }, { label: 'Country', val: e.country }, { label: 'Postal Code', val: e.postCode }]);
    drawRow([{ label: 'Previous Qualification Level', val: e.prevQualification }, { label: 'Country of Birth', val: e.countryOfBirth }, { label: 'Nationality', val: e.nationality }]);
    drawRow([{ label: 'Ethnicity', val: e.ethnicity }, { label: 'Visa Status', val: e.visaStatus }]);
    drawRow([{ label: 'Which course are you applying for?', val: e.course }]);
    drawRow([{ label: 'When would you like to start study?', val: e.startDate }]);
    drawRow([{ label: 'Passport Number', val: e.passportNumber }]);
    if (e.shareCode || e.dateOfArrival) drawRow([{ label: 'Share Code', val: e.shareCode }, { label: 'Date of Arrival', val: e.dateOfArrival }]);
    drawRow([{ label: 'Preferred Study Centre Location', val: e.studyCentre }, { label: 'Employment Status', val: e.employmentStatus }]);
    if (e.employerName) drawRow([{ label: 'Name of Employer', val: e.employerName }, { label: 'Date of Employment', val: e.dateOfEmployment }, { label: 'Length of Employment', val: e.lengthOfEmployment }]);
    if (e.lengthOfUnemployment) drawRow([{ label: 'Length of Unemployment', val: e.lengthOfUnemployment }]);
    drawRow([{ label: 'Have you applied for student finance?', val: e.studentFinance }, { label: 'Disability / Medical Condition', val: e.disability }]);
    if (e.disabilityDetails) drawRow([{ label: 'Disability Details', val: e.disabilityDetails }]);
    drawRow([{ label: 'Criminal Conviction', val: e.criminalConviction }, { label: 'Benefits', val: e.benefits }]);
    if (e.benefitsType) drawRow([{ label: 'Type of Benefits', val: e.benefitsType }]);
    drawRow([{ label: 'How did you hear about us?', val: e.hearAbout }, { label: 'Referral Name', val: e.referralName }]);
    if (e.notes) drawRow([{ label: 'Notes (Staff Use Only)', val: e.notes }]);

  // ── Job Application ───────────────────────────────────
  } else if (e.formType === 'Job Application') {
    if (e.jobTitle) drawRow([{ label: 'Job Title', val: e.jobTitle }]);
    drawRow([{ label: 'Name', val: fullName }]);
    drawRow([{ label: 'Gender', val: e.gender }, { label: 'Date of Birth', val: e.dob }]);
    drawRow([{ label: 'Mobile', val: e.mobile }, { label: 'Email', val: e.email }]);
    drawRow([{ label: 'Emergency Contact', val: e.emergencyContact }]);
    drawRow([{ label: 'First Line of Address', val: e.addressLine1 }, { label: 'Second Line of Address', val: e.addressLine2 }]);
    drawRow([{ label: 'City', val: e.city }, { label: 'Country', val: e.country }, { label: 'Post Code', val: e.postCode }]);
    drawRow([{ label: 'Country of Birth', val: e.countryOfBirth }, { label: 'Nationality', val: e.nationality }]);
    if (e.qualifications) drawRow([{ label: 'Qualifications', val: e.qualifications }]);
    drawRow([{ label: 'Ethnicity', val: e.ethnicity }, { label: 'Visa Status', val: e.visaStatus }]);
    drawRow([{ label: 'Preferred Working Location', val: e.siteLocation }]);
    drawRow([{ label: 'Disability / Medical Condition', val: e.disability }, { label: 'Criminal Conviction', val: e.criminalConviction }]);
    if (e.disabilityDetails) drawRow([{ label: 'Disability Details', val: e.disabilityDetails }]);
    if (e.convictionDetails) drawRow([{ label: 'Conviction Details', val: e.convictionDetails }]);
    drawRow([{ label: 'CV', val: e.cvFileUrl ? 'Uploaded (see file)' : 'Not provided' }]);

  // ── New Starter Form ──────────────────────────────────
  } else if (e.formType === 'New Starter Form') {
    drawRow([{ label: 'Name', val: fullName }]);
    drawRow([{ label: 'Gender', val: e.gender }, { label: 'Date of Birth', val: e.dob }]);
    drawRow([{ label: 'Marital Status', val: e.maritalStatus }, { label: 'Mobile', val: e.mobile }]);
    drawRow([{ label: 'Email', val: e.email }]);
    drawRow([{ label: 'Street Address', val: e.streetAddress }, { label: 'City', val: e.city }]);
    drawRow([{ label: 'Post Code', val: e.postCode }, { label: 'Country', val: e.country }]);
    drawRow([{ label: 'Job Title', val: e.jobTitle }, { label: 'Start Date', val: e.startDate }]);
    drawRow([{ label: 'Site Location', val: e.siteLocation }, { label: 'NI Number', val: e.nationalInsurance }]);
    drawRow([{ label: 'Annual Salary', val: e.annualSalary }]);
    drawRow([{ label: 'Emergency Contact Name', val: e.emergencyName }, { label: 'Emergency Mobile', val: e.emergencyMobile }]);
    drawRow([{ label: 'Emergency Relationship', val: e.emergencyRelationship }]);
    drawRow([{ label: 'Account Holder', val: e.accountHolder }, { label: 'Bank Name', val: e.bankName }]);
    drawRow([{ label: 'Sort Code', val: e.sortCode }, { label: 'Account Number', val: e.accountNumber }]);
    drawRow([{ label: 'Contract Type', val: e.contractType }, { label: 'Starter Type', val: e.starterType }]);
    if (e.starterDeclaration) drawRow([{ label: 'Starter Declaration', val: e.starterDeclaration }]);
    drawRow([{ label: 'Proof of ID', val: e.proofOfIdUrl ? 'Uploaded' : 'Not provided' }, { label: 'P45', val: e.p45Url ? 'Uploaded' : 'Not provided' }]);

  // ── Enrolment Form ────────────────────────────────────
  } else if (e.formType === 'Enrolment Form') {
    drawRow([{ label: 'Name', val: fullName }]);
    drawRow([{ label: 'Date of Birth', val: e.dob }, { label: 'Gender', val: e.gender }]);
    drawRow([{ label: 'Mobile', val: e.mobile }, { label: 'Email', val: e.email }]);
    drawRow([{ label: 'Address', val: e.addressLine1 }, { label: 'City', val: e.city }]);
    drawRow([{ label: 'Post Code', val: e.postCode }, { label: 'Country', val: e.country }]);
    drawRow([{ label: 'Nationality', val: e.nationality }, { label: 'Ethnicity', val: e.ethnicity }]);
    drawRow([{ label: 'Visa Status', val: e.visaStatus }]);
    drawRow([{ label: 'Course', val: e.course }]);
    drawRow([{ label: 'Study Centre', val: e.studyCentre }, { label: 'Start Date', val: e.startDate }]);
    if (e.disability) drawRow([{ label: 'Disability', val: e.disability }]);
    if (e.criminalConviction) drawRow([{ label: 'Criminal Conviction', val: e.criminalConviction }]);

  // ── Enquiry Form ──────────────────────────────────────
  } else if (e.formType === 'Enquiry Form') {
    drawRow([{ label: 'Name', val: fullName }]);
    drawRow([{ label: 'Mobile', val: e.mobile }, { label: 'Email', val: e.email }]);
    if (e.message || e.enquiry) drawRow([{ label: 'Message', val: e.message || e.enquiry }]);
    if (e.course) drawRow([{ label: 'Course', val: e.course }]);
    if (e.studyCentre) drawRow([{ label: 'Study Centre', val: e.studyCentre }]);

  // ── Partnerships & Collaborations ─────────────────────
  } else if (e.formType === 'Partnerships & Collaborations') {
    drawRow([{ label: 'Name', val: fullName }]);
    drawRow([{ label: 'Company Name', val: e.companyName }, { label: 'Legal Status', val: e.legalStatus }]);
    drawRow([{ label: 'Phone', val: e.phone }, { label: 'Email', val: e.email }]);
    drawRow([{ label: 'Street Address', val: e.streetAddress }, { label: 'City', val: e.city }]);
    drawRow([{ label: 'Post Code', val: e.postCode }, { label: 'Country', val: e.country }]);
    if (e.service) drawRow([{ label: 'Service', val: e.service }]);
    if (e.tellUsMore) drawRow([{ label: 'Tell Us More', val: e.tellUsMore }]);

  // ── International / English & IELTS ──────────────────
  } else {
    const skip = new Set(['id', 'formType', 'submittedAt', 'status']);
    const fields = Object.entries(e)
      .filter(([k, v]) => !skip.has(k) && v !== null && v !== undefined && v !== '')
      .map(([k, v]) => ({ label: k.replace(/([A-Z])/g, ' $1').trim(), val: typeof v === 'boolean' ? (v ? 'Yes' : 'No') : String(v) }));
    // Lay out in pairs
    for (let i = 0; i < fields.length; i += 2) {
      if (fields[i + 1]) drawRow([fields[i], fields[i + 1]]);
      else drawRow([fields[i]]);
    }
  }

  // ── Footer ─────────────────────────────────────────────
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text(`Generated by TEC Admin Dashboard • ${new Date().toLocaleDateString('en-GB')}`, ML, 291);
    doc.text(`Page ${p} of ${pageCount}  •  Entry ID: ${e.id}`, PAGE_W - MR, 291, { align: 'right' });
  }

  doc.save(`TEC-${(e.formType || 'form').replace(/\s+/g, '-')}-${e.id}.pdf`);
}

// ── Open S3 file via presigned URL ───────────────────────────
async function openS3File(fileUrl) {
  if (!fileUrl) return;
  try {
    const lower = fileUrl.toLowerCase();
    let fileKey;

    if (!lower.startsWith('http')) {
      // Bare S3 key (e.g. "migrated/job-application/file.docx") — use directly
      fileKey = fileUrl;
    } else if (lower.includes('amazonaws.com')) {
      // Full S3 URL — extract key from path
      fileKey = new URL(fileUrl).pathname.slice(1);
    } else {
      // Legacy wp-content / gravity_forms URL — open directly
      window.open(fileUrl, '_blank');
      return;
    }

    const viewUrl = await getS3ViewUrl(fileKey);
    window.open(viewUrl, '_blank');
  } catch (err) {
    alert('Could not open file: ' + err.message);
  }
}

// ── Short label for a file field key ──────────────────────
function fileLabel(key, index) {
  const map = {
    proofOfIdUrl: 'ID', p45Url: 'P45', cvFileUrl: 'CV',
    passportFileUrl: 'Passport', qualificationsFileUrl: 'Qualifications',
    experienceLetterUrl: 'Experience',
  };
  const base = map[key] || key.replace(/Url$/i, '').replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();
  return index ? `${base} ${index}` : base;
}

// ── Display labels (DB stores internal form-type strings; show these instead) ─
const FORM_LABEL = {
  'Application Form': 'Student Application Form',
};
const labelFor = (formType) => FORM_LABEL[formType] || formType;

// ── Form-specific table columns ───────────────────────────
// Each form shows its own relevant columns (besides Name / Date / Files).
// key = entry field, label = column header.
const FORM_COLUMNS = {
  'New Starter Form': [
    { key: 'jobTitle',     label: 'Job Title' },
    { key: 'siteLocation', label: 'Site Location' },
  ],
  'Partnerships & Collaborations': [
    { key: 'companyName', label: 'Company' },
    { key: 'service',     label: 'Service' },
  ],
  'Application Form': [
    { key: 'course',      label: 'Course' },
    { key: 'studyCentre', label: 'Study Centre' },
  ],
  'Job Application': [
    { key: 'jobTitle',     label: 'Job Title' },
    { key: 'siteLocation', label: 'Preferred Location' },
  ],
  'English & IELTS Application': [
    { key: 'course', label: 'Course' },
  ],
  'Enquiry Form': [
    { key: 'enquiringAbout', label: 'Enquiring About' },
  ],
  'Enrolment Form': [
    { key: 'programmeTitle', label: 'Programme' },
  ],
  'International Application': [
    { key: 'course',      label: 'Course' },
    { key: 'studyCentre', label: 'Study Centre' },
  ],
};

// ── Status badge ──────────────────────────────────────────
const STATUS_CONFIG = {
  new:      { label: 'New',      bg: '#e8f5e9', color: '#2e7d32' },
  reviewed: { label: 'Reviewed', bg: '#e3f2fd', color: '#1565c0' },
  actioned: { label: 'Actioned', bg: '#f3e5f5', color: '#6a1b9a' },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return (
    <span style={{
      background: cfg.bg,
      color: cfg.color,
      fontSize: '0.72rem',
      fontWeight: 700,
      padding: '2px 9px',
      borderRadius: 50,
      whiteSpace: 'nowrap',
    }}>
      {cfg.label}
    </span>
  );
}

// ── Entry detail modal ────────────────────────────────────
function EntryModal({ entry, onClose, onDelete, onStatusChange, onUpdate }) {
  const [emailTo, setEmailTo]       = useState('');
  const [emailSent, setEmailSent]       = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [sheetsStatus, setSheetsStatus] = useState('');
  const [resendStatus, setResendStatus]         = useState(''); // '', 'sending', 'sent', 'error'
  const [resendUserStatus, setResendUserStatus] = useState(''); // '', 'sending', 'sent', 'error'
  const [currentStatus, setCurrentStatus] = useState(entry.status || 'new');
  const [editing, setEditing]       = useState(false);
  const [editData, setEditData]     = useState({ ...entry });
  const [saving, setSaving]         = useState(false);

  // ── Staff notes (independent of full edit mode) ─────────
  const [notesDraft, setNotesDraft]   = useState(entry.notes || '');
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesSaved, setNotesSaved]   = useState(false);
  const notesChanged = (notesDraft || '') !== (entry.notes || '');

  const saveNotes = async () => {
    setNotesSaving(true);
    try {
      // Send the FULL entry merged with the new notes so the still-deployed
      // replace-Lambda doesn't wipe other fields.
      const merged = { ...entry, notes: notesDraft.trim() };
      const ok = await updateSubmissionInDB(merged);
      if (ok) {
        setNotesSaved(true);
        onUpdate?.(merged);
        setTimeout(() => setNotesSaved(false), 2500);
      } else {
        alert('Failed to save note.');
      }
    } catch (err) {
      alert('Failed to save note: ' + err.message);
    } finally {
      setNotesSaving(false);
    }
  };

  const INTERNAL = new Set(['id', 'formType', 'submittedAt']);
  const isFileKey = (k) => k.toLowerCase().endsWith('url');

  const handleDelete = () => {
    if (window.confirm('Delete this entry? This cannot be undone.')) {
      deleteSubmissionFromDB(entry.id).catch(console.error);
      onDelete();
      onClose();
    }
  };

  const handleEmail = async () => {
    if (!emailTo) { alert('Enter an email address'); return; }
    setEmailSending(true);
    setEmailSent(false);
    try {
      // Reuse the notification email builder but send to the custom address
      const { SES_CONFIG, FORM_REGISTRY: FR } = await import('../../config/forms');
      const formConfig = FR[entry.formType] || {};
      const labelMap = {};
      if (formConfig.columnMap) {
        Object.entries(formConfig.columnMap).forEach(([k, label]) => { labelMap[k] = label; });
      }
      const toLabel = k => labelMap[k] || k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
      const isUrl   = v => typeof v === 'string' && (v.startsWith('http://') || v.startsWith('https://'));
      const fmtVal  = v => {
        if (!v && v !== 0) return '<em style="color:#999">—</em>';
        if (typeof v === 'boolean') return v ? 'Yes' : 'No';
        if (Array.isArray(v)) return v.join(', ');
        if (isUrl(v)) return `<a href="${v}" style="color:#1a56a0">View File</a>`;
        return String(v);
      };
      const skip = new Set(['id', 'status', 'formType', 'wpEntryId']);

      // Order by columnMap definition, remainder at end — same as admin modal
      const mapKeys   = Object.keys(labelMap).filter(k => !skip.has(k));
      const extraKeys = Object.keys(entry).filter(k => !skip.has(k) && !mapKeys.includes(k));
      const allKeys   = [...mapKeys, ...extraKeys];

      const rows = allKeys
        .map(k => [k, entry[k]])
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v], i) => `<tr style="background:${i%2===0?'#f7f7f7':'#fff'}">
          <td style="padding:9px 14px;font-weight:600;color:#333;width:38%;border-bottom:1px solid #eee">${toLabel(k)}</td>
          <td style="padding:9px 14px;color:#444;border-bottom:1px solid #eee">${fmtVal(v)}</td>
        </tr>`).join('');
      const logo = 'https://vlebucket.s3.eu-west-2.amazonaws.com/Untitled+design+(12).jpg';
      const html = `<div style="max-width:680px;margin:auto;font-family:Arial,sans-serif;background:#fff;border:1px solid #ddd;border-radius:8px;overflow:hidden">
        <img src="${logo}" alt="TEC" style="width:100%;height:auto;display:block"/>
        <div style="padding:24px">
          <h2 style="color:#333399;margin:0 0 4px">${entry.formType} — ${entry.firstName || ''} ${entry.lastName || ''}</h2>
          <p style="color:#777;font-size:13px;margin:0 0 20px">Submitted: ${entry.submittedAt ? new Date(entry.submittedAt).toLocaleString('en-GB') : 'N/A'}</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
          <p style="font-size:12px;color:#aaa;margin-top:20px">Sent from Trent Education Centre Admin Dashboard</p>
        </div>
      </div>`;
      const res = await fetch(SES_CONFIG.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: emailTo,
          from: SES_CONFIG.fromEmail,
          fromName: 'TEC Admin',
          replyTo: SES_CONFIG.fromEmail,
          subject: `${entry.formType} — ${entry.firstName || ''} ${entry.lastName || ''}`,
          html,
        }),
      });
      setEmailSending(false);
      if (res.ok) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 3000);
      } else {
        alert('Failed to send email — check the address and try again.');
      }
    } catch (err) {
      setEmailSending(false);
      console.error('handleEmail error:', err);
      alert('Something went wrong sending the email.');
    }
  };

  const handleSheets = async () => {
    setSheetsStatus('Exporting…');
    const ok = await exportToSheets(entry);
    setSheetsStatus(ok ? '✅ Exported!' : '❌ Failed — check Sheets config');
    setTimeout(() => setSheetsStatus(''), 3000);
  };

  const handleStatusChange = (newStatus) => {
    updateSubmissionStatusInDB(entry.id, newStatus).catch(console.error);
    setCurrentStatus(newStatus);
    if (onStatusChange) onStatusChange(entry.id, newStatus);
  };

  const handleSave = async () => {
    setSaving(true);
    const updated = { ...editData, status: currentStatus };
    const dbOk = await updateSubmissionInDB(updated);
    exportToSheets(updated).catch(console.error);
    if (onUpdate) onUpdate(updated);
    setEditData({ ...updated });
    setEditing(false);
    setSaving(false);
    if (!dbOk) {
      alert('⚠️ Database update failed — make sure the Lambda ZIP has been uploaded to AWS, then refresh to verify.');
    }
  };

  const handleCancelEdit = () => {
    setEditData({ ...entry });
    setEditing(false);
  };

  const fmt = (key, val) => {
    if (typeof val === 'boolean') return val ? 'Yes' : 'No';
    if (!val || val === '') return '—';
    return String(val);
  };

  // Fields to always hide from the detail view
  const skip = ['id', 'status', 'formType', 'wpEntryId'];

  // Order fields by columnMap definition order; anything not in columnMap goes at the end
  const formConfig  = FORM_REGISTRY[entry.formType];
  const columnMap   = formConfig?.columnMap || {};
  const orderedKeys = Object.keys(columnMap).filter(k => !skip.includes(k));
  const dataKeys    = Object.keys(editing ? editData : entry).filter(k => !skip.includes(k) && !orderedKeys.includes(k));
  const allKeys     = [...orderedKeys, ...dataKeys];

  const rows = allKeys
    .map(k => [k, (editing ? editData : entry)[k]])
    .filter(([, v]) => v !== undefined);

  return (
    <div className="adm-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal">
        <div className="adm-modal-header">
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {labelFor(entry.formType)}
              {editing && <span style={{ fontSize: '0.72rem', background: '#fff3e0', color: '#e65100', padding: '2px 8px', borderRadius: 50, fontWeight: 700 }}>Editing</span>}
            </h3>
            <span className="adm-modal-sub">
              {entry.firstName} {entry.lastName} •{' '}
              {new Date(entry.submittedAt).toLocaleString('en-GB')}
            </span>
          </div>
          <button className="adm-modal-close" onClick={onClose}>✕</button>
        </div>


        <div className="adm-modal-actions">
          {!editing ? (
            <>
              {/* Edit */}
              <button className="adm-action-btn adm-btn-edit" onClick={() => setEditing(true)}>
                ✏️ Edit
              </button>

              {/* PDF */}
              <button className="adm-action-btn adm-btn-pdf" onClick={() => generatePDF(entry)}>
                📄 PDF
              </button>

              {/* Sheets — only shown if this form has a linked sheet */}
              {FORM_REGISTRY[entry.formType]?.sheetsUrl && (
                <>
                  <button className="adm-action-btn adm-btn-sheets" onClick={handleSheets}>
                    📊 {sheetsStatus || 'Export Sheet'}
                  </button>
                  <a
                    className="adm-action-btn adm-btn-sheets"
                    href={FORM_REGISTRY[entry.formType].sheetsUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    🔗 Open Sheet
                  </a>
                </>
              )}

              {/* Resend notification to staff */}
              <button
                className="adm-action-btn adm-btn-resend-staff"
                disabled={resendStatus === 'sending'}
                title={`Resend to ${FORM_REGISTRY[entry.formType]?.notifyEmail || NOTIFY_EMAILS.default}`}
                onClick={async () => {
                  setResendStatus('sending');
                  const ok = await sendEmailNotification(entry);
                  setResendStatus(ok ? 'sent' : 'error');
                  setTimeout(() => setResendStatus(''), 3500);
                }}
              >
                {resendStatus === 'sending' ? <><span className="adm-spinner" /> Sending…</>
                  : resendStatus === 'sent'  ? '✅ Notified!'
                  : resendStatus === 'error' ? '❌ Failed'
                  : '📨 Notify Staff'}
              </button>

              {/* Resend confirmation to the applicant */}
              {entry.email && (
                <button
                  className="adm-action-btn adm-btn-resend-user"
                  disabled={resendUserStatus === 'sending'}
                  title={`Resend confirmation to ${entry.email}`}
                  onClick={async () => {
                    setResendUserStatus('sending');
                    const ok = await sendConfirmationEmail(entry);
                    setResendUserStatus(ok ? 'sent' : 'error');
                    setTimeout(() => setResendUserStatus(''), 3500);
                  }}
                >
                  {resendUserStatus === 'sending' ? <><span className="adm-spinner" /> Sending…</>
                    : resendUserStatus === 'sent'  ? '✅ Sent!'
                    : resendUserStatus === 'error' ? '❌ Failed'
                    : '✉️ Email Applicant'}
                </button>
              )}

              {/* Delete */}
              <button className="adm-action-btn adm-btn-delete" onClick={handleDelete}>
                🗑 Delete
              </button>
            </>
          ) : (
            <>
              <button
                className="adm-action-btn"
                style={{ background: '#e8f5e9', color: '#2e7d32', border: '1px solid #2e7d32', fontWeight: 700 }}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? '⏳ Saving…' : '💾 Save Changes'}
              </button>
              <button
                className="adm-action-btn"
                style={{ background: '#fafafa', color: '#555', border: '1px solid #ccc' }}
                onClick={handleCancelEdit}
                disabled={saving}
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {!editing && (
          <div className="adm-modal-email">
            <input
              className="adm-email-input"
              type="email"
              placeholder="Forward this entry to any email address…"
              value={emailTo}
              onChange={e => setEmailTo(e.target.value)}
            />
            <button className="adm-action-btn adm-btn-email" onClick={handleEmail} disabled={emailSending || emailSent}>
              {emailSending ? <><span className="adm-spinner" /> Sending…</> : emailSent ? '✅ Sent!' : '📤 Send'}
            </button>
          </div>
        )}

        {/* Staff notes — quick, independent of full edit mode */}
        <div className="adm-notes">
          <div className="adm-notes-header">
            <span className="adm-notes-label">📝 Staff Notes</span>
            <span className="adm-notes-hint">e.g. “Passport missing — needs uploading”</span>
          </div>
          <textarea
            className="adm-notes-input"
            placeholder="Add a note for this applicant…"
            value={notesDraft}
            onChange={e => setNotesDraft(e.target.value)}
            rows={2}
          />
          <div className="adm-notes-actions">
            {notesSaved && <span className="adm-notes-saved">✓ Saved</span>}
            <button
              className="adm-action-btn adm-btn-notes"
              onClick={saveNotes}
              disabled={!notesChanged || notesSaving}
            >
              {notesSaving ? <><span className="adm-spinner" /> Saving…</>
                : notesChanged ? '💾 Save Note'
                : '✓ Up to date'}
            </button>
          </div>
        </div>

        <div className="adm-modal-body">
          {rows
            // The dedicated notes panel above handles this field — skip it from the generic list.
            .filter(([key]) => key !== 'notes')
            .map(([key, val]) => (
            <div key={key} className="adm-detail-row">
              <span className="adm-detail-key">
                {columnMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()}
              </span>
              <span className="adm-detail-val">
                {isFileKey(key) && val ? (
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {String(val).split(',').map(u => u.trim()).filter(Boolean).map((u, i) => (
                      <button
                        key={i}
                        className="adm-file-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                        onClick={() => openS3File(u)}
                      >
                        📎 View File {String(val).split(',').length > 1 ? i + 1 : ''}
                      </button>
                    ))}
                  </span>
                ) : editing && !INTERNAL.has(key) && !isFileKey(key) ? (
                  <input
                    style={{
                      width: '100%', border: '1px solid #bbb', borderRadius: 4,
                      padding: '4px 8px', fontSize: '0.85rem', boxSizing: 'border-box',
                    }}
                    value={editData[key] ?? ''}
                    onChange={e => setEditData(d => ({ ...d, [key]: e.target.value }))}
                  />
                ) : fmt(key, val)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Export filtered entries to Excel (.xlsx) ──────────────
async function exportToExcel(entries, label) {
  const { utils, writeFile } = await import('xlsx');

  // Group by form type, one sheet each
  const byType = {};
  entries.forEach(e => {
    const t = e.formType || 'Other';
    if (!byType[t]) byType[t] = [];
    byType[t].push(e);
  });

  const wb = utils.book_new();

  Object.entries(byType).forEach(([formType, rows]) => {
    // Collect all unique keys across rows (excluding id)
    const skip = ['id'];
    const keys = [...new Set(rows.flatMap(r => Object.keys(r).filter(k => !skip.includes(k))))];
    const data = rows.map(r => {
      const row = {};
      keys.forEach(k => { row[k] = r[k] ?? ''; });
      return row;
    });
    const ws = utils.json_to_sheet(data, { header: keys });
    utils.book_append_sheet(wb, ws, formType.slice(0, 31)); // Excel tab max 31 chars
  });

  const filename = `TEC-Submissions-${label.replace(/\s+/g, '-')}-${new Date().toISOString().slice(0,10)}.xlsx`;
  writeFile(wb, filename);
}

// ── Main Dashboard ────────────────────────────────────────
export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState(null);  // { email, name, groups }
  const [authChecked, setAuthChecked] = useState(false);
  const [entries, setEntries]         = useState([]);
  const [selected, setSelected]       = useState(null);
  const [filter, setFilter]           = useState('');
  const [search, setSearch]           = useState('');
  const [loading, setLoading]         = useState(false);
  const [dbMode, setDbMode]           = useState(false);
  const [entriesOpen, setEntriesOpen] = useState(true);
  const [formsOpen, setFormsOpen]     = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage]               = useState(1);
  const PER_PAGE                      = 25;

  // Which form names this user can see (null = all)
  const allowedForms = currentUser ? getAllowedForms(currentUser.groups) : [];


  const CACHE_KEY = 'tec_admin_cache';
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  const readCache = () => {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const { items, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) return null;
      return items;
    } catch { return null; }
  };

  const writeCache = (items) => {
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ items, ts: Date.now() })); }
    catch {}
  };

  // ── Load entries — paginated fetch, show data as pages arrive ──
  const load = async ({ silent = false, retry = true } = {}) => {
    if (!silent) setLoading(true);

    const onProgress = (partial) => {
      // Show first page of results immediately while rest loads
      setEntries([...partial]);
      setDbMode(true);
    };

    let dbItems = await getAllSubmissionsFromDB(silent ? null : onProgress);

    // Auto-retry once on failure (handles Lambda cold starts)
    if (dbItems === null && retry) {
      await new Promise(r => setTimeout(r, 1500));
      dbItems = await getAllSubmissionsFromDB(silent ? null : onProgress);
    }

    if (dbItems !== null) {
      setEntries(dbItems);
      setDbMode(true);
      writeCache(dbItems);
    } else if (!silent) {
      setEntries([]);
      setDbMode(false);
    }
    if (!silent) setLoading(false);
  };

  // Check existing Cognito session on mount
  useEffect(() => {
    getCurrentSession().then(session => {
      if (session && session.groups.length > 0) setCurrentUser(session);
      setAuthChecked(true);
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    // 1. Show cached data immediately (zero wait)
    const cached = readCache();
    if (cached) {
      setEntries(cached);
      setDbMode(true);
      // 2. Silently refresh in background
      load({ silent: true });
    } else {
      // No cache — show spinner once
      load();
    }

    // 3. Background refresh every 5 minutes
    const interval = setInterval(() => load({ silent: true }), CACHE_TTL);
    return () => clearInterval(interval);
  }, [currentUser]);

  // All form types visible to this user — sorted A→Z by DISPLAY label,
  // so renamed forms (e.g. "Student Application Form") sit in their visible alphabetical spot.
  const visibleFormTypes = [
    ...new Set(
      entries
        .map(e => e.formType)
        .filter(t => allowedForms === null || allowedForms.includes(t))
    ),
  ].sort((a, b) => labelFor(a).localeCompare(labelFor(b)));

  // Once entries load, default to the first available form (instead of "All")
  useEffect(() => {
    if (!filter && visibleFormTypes.length > 0) {
      setFilter(visibleFormTypes[0]);
    }
  }, [visibleFormTypes.length, filter]);

  const filtered = entries.filter(e => {
    // RBAC: hide entries the user has no permission to see
    if (allowedForms !== null && !allowedForms.includes(e.formType)) return false;
    const matchType = filter === 'All' || e.formType === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || JSON.stringify(e).toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage    = Math.min(page, totalPages);
  const paginated   = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  // Reset to page 1 whenever filter or search changes
  const setFilterAndReset = (f) => { setFilter(f); setPage(1); };
  const setSearchAndReset = (s) => { setSearch(s); setPage(1); };

  // Still checking Cognito session
  if (!authChecked) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6f4' }}>
      <div style={{ color: '#1a2e1a', fontSize: '0.9rem' }}>Loading…</div>
    </div>
  );

  if (!currentUser) return (
    <AdminAuth onAuthed={(user) => { setCurrentUser(user); }} />
  );

  return (
    <div className="adm-page">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="adm-mobile-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`adm-sidebar${sidebarOpen ? ' adm-sidebar--open' : ''}`}>
        {/* Mobile close button */}
        <button className="adm-sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
        <div className="adm-sidebar-logo">
          <img
            src="/assets/logos/tec-crest.png"
            alt="Trent Education Centre"
            className="adm-sidebar-logo-img"
          />
          <div>
            <div className="adm-sidebar-title">Trent Education Centre</div>
            <div className="adm-sidebar-sub">Admin Dashboard</div>
          </div>
        </div>
        <nav className="adm-nav">

          {/* ── ENTRIES (collapsible) ── */}
          <button
            className="adm-nav-section adm-nav-section--toggle"
            onClick={() => setEntriesOpen(o => !o)}
          >
            <span>ENTRIES</span>
            <span className="adm-nav-chevron">{entriesOpen ? '▾' : '▸'}</span>
          </button>

          {entriesOpen && visibleFormTypes.map(t => (
            <button
              key={t}
              className={`adm-nav-item${filter === t ? ' active' : ''}`}
              onClick={() => { setFilterAndReset(t); setSidebarOpen(false); }}
            >
              <span>{labelFor(t)}</span>
              <span className="adm-badge">{entries.filter(e => e.formType === t && (allowedForms === null || allowedForms.includes(e.formType))).length}</span>
            </button>
          ))}

          {/* ── FORM LINKS (collapsible) ── */}
          <button
            className="adm-nav-section adm-nav-section--toggle"
            onClick={() => setFormsOpen(o => !o)}
            style={{ marginTop: 8 }}
          >
            <span>FORM LINKS</span>
            <span className="adm-nav-chevron">{formsOpen ? '▾' : '▸'}</span>
          </button>

          {formsOpen && Object.entries(FORM_REGISTRY)
            .filter(([, cfg]) => cfg.path)
            .sort(([a], [b]) => labelFor(a).localeCompare(labelFor(b)))
            .map(([name, cfg]) => (
              <a
                key={name}
                href={cfg.path}
                target="_blank"
                rel="noreferrer"
                className="adm-nav-item adm-nav-link"
              >
                <span>{labelFor(name)}</span>
                <span className="adm-nav-arrow">↗</span>
              </a>
            ))}


        </nav>

        {/* ── User info ── */}
        <div style={{
          margin: '8px 10px 0',
          padding: '10px 12px',
          borderRadius: 8,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentUser.name}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentUser.email}
          </div>
          <div style={{ fontSize: '0.65rem', color: '#c9a84c', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700 }}>
            {currentUser.groups.includes('admin') ? '★ Admin' : currentUser.groups.join(', ')}
          </div>
        </div>

        <button className="adm-logout" onClick={() => { signOut(); setCurrentUser(null); sessionStorage.removeItem(CACHE_KEY); }}>
          Sign Out
        </button>
      </aside>

      {/* Main */}
      <main className="adm-main">
        <div className="adm-topbar">
          {/* Mobile sidebar toggle */}
          <button className="adm-sidebar-toggle" onClick={() => setSidebarOpen(true)}>☰</button>
          <div>
            <h1 className="adm-title">{filter ? labelFor(filter) : 'Loading…'}</h1>
            <p className="adm-subtitle">
              {loading ? 'Refreshing…' : `${filtered.length} entries`}
            </p>
          </div>
          <div className="adm-topbar-right">
            <input
              className="adm-search"
              type="text"
              placeholder="Search entries…"
              value={search}
              onChange={e => setSearchAndReset(e.target.value)}
            />
            <button
              className="adm-export-btn"
              onClick={() => { sessionStorage.removeItem(CACHE_KEY); load(); }}
              disabled={loading}
              title="Refresh from DynamoDB"
            >
              {loading ? <><span className="adm-spinner" /> Refreshing…</> : '🔄 Refresh'}
            </button>
            {filtered.length > 0 && (
              <button
                className="adm-export-btn"
                onClick={() => exportToExcel(filtered, filter)}
                title="Download as Excel"
              >
                📥 Export Excel
              </button>
            )}
          </div>
        </div>


        {loading && entries.length === 0 ? (
          <div className="adm-loading">
            <div className="adm-spinner adm-spinner--lg" />
            <p>Loading submissions…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="adm-empty">
            <div className="adm-empty-icon">📭</div>
            <p>No submissions yet.</p>
            <p className="adm-empty-sub">Entries will appear here after forms are submitted.</p>
          </div>
        ) : (() => {
          // Form-specific columns (only when a single form is selected)
          const formCols = (FORM_COLUMNS[filter] || []);
          // Collect any file URLs from an entry (fields ending in "url")
          const getFiles = (entry) =>
            Object.entries(entry)
              .filter(([k, v]) => k.toLowerCase().endsWith('url') && typeof v === 'string' && v)
              .flatMap(([k, v]) =>
                String(v).split(',').map(u => u.trim()).filter(Boolean)
                  .map((u, i, arr) => ({ url: u, label: fileLabel(k, arr.length > 1 ? i + 1 : null) }))
              );
          // Files column: always shown so missing uploads are visible (empty = needs upload).
          // Hidden only for forms that genuinely have no file fields at all.
          const FORMS_WITHOUT_FILES = new Set([
            'Partnerships & Collaborations',
            'Enquiry Form',
          ]);
          const showFiles = !FORMS_WITHOUT_FILES.has(filter);

          return (
          <div className="adm-table-wrap" style={{ position: 'relative' }}>
            {loading && (
              <div className="adm-table-overlay">
                <div className="adm-spinner adm-spinner--lg" />
                <span>Refreshing…</span>
              </div>
            )}
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Name</th>
                  {filter === 'All' && <th>Form</th>}
                  <th>Date</th>
                  {formCols.map(c => <th key={c.key}>{c.label}</th>)}
                  {showFiles && <th>Files</th>}
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(entry => {
                  const files = getFiles(entry);
                  return (
                  <tr key={entry.id} onClick={() => setSelected(entry)} className="adm-row">
                    <td className="adm-td-name">
                      <div className="adm-avatar">{(entry.firstName?.[0] || '?').toUpperCase()}</div>
                      <div>
                        <div className="adm-name">{entry.firstName} {entry.lastName}</div>
                        <div className="adm-email">{entry.email || '—'}</div>
                      </div>
                    </td>
                    {filter === 'All' && <td><span className="adm-tag">{entry.formType}</span></td>}
                    <td className="adm-date">{new Date(entry.submittedAt).toLocaleDateString('en-GB')}</td>
                    {formCols.map(c => <td key={c.key}>{entry[c.key] || '—'}</td>)}
                    {showFiles && (
                      <td onClick={e => e.stopPropagation()}>
                        {files.length === 0 ? (
                          <span className="adm-files-missing" title="No files uploaded">⚠ Missing</span>
                        ) : files.map((f, i) => (
                          <button key={i} className="adm-file-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'block', textAlign: 'left' }} onClick={() => openS3File(f.url)}>📎 {f.label}</button>
                        ))}
                      </td>
                    )}
                    <td className="adm-td-notes">
                      {entry.notes
                        ? <span className="adm-notes-cell" title={entry.notes}>{entry.notes}</span>
                        : <span className="adm-notes-cell adm-notes-cell--empty">—</span>}
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="adm-row-actions">
                        <button className="adm-row-btn" onClick={() => setSelected(entry)} title="View">👁</button>
                        <button className="adm-row-btn" onClick={() => generatePDF(entry)} title="PDF">📄</button>
                        <button className="adm-row-btn adm-row-del" onClick={() => { if (window.confirm(`Delete ${entry.firstName || ''} ${entry.lastName || ''}? This cannot be undone.`)) { deleteSubmissionFromDB(entry.id).catch(console.error); load(); } }} title="Delete">🗑</button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="adm-pagination">
                <span className="adm-pagination-info">
                  Showing {(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, filtered.length)} of {filtered.length}
                </span>
                <div className="adm-pagination-controls">
                  <button
                    className="adm-page-btn"
                    onClick={() => setPage(1)}
                    disabled={safePage === 1}
                  >«</button>
                  <button
                    className="adm-page-btn"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                  >‹</button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2)
                    .reduce((acc, p, idx, arr) => {
                      if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === '…'
                        ? <span key={`ellipsis-${i}`} className="adm-page-ellipsis">…</span>
                        : <button
                            key={p}
                            className={`adm-page-btn${safePage === p ? ' adm-page-btn--active' : ''}`}
                            onClick={() => setPage(p)}
                          >{p}</button>
                    )}

                  <button
                    className="adm-page-btn"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={safePage === totalPages}
                  >›</button>
                  <button
                    className="adm-page-btn"
                    onClick={() => setPage(totalPages)}
                    disabled={safePage === totalPages}
                  >»</button>
                </div>
              </div>
            )}
          </div>
          );
        })()}
      </main>

      {selected && (
        <EntryModal
          entry={selected}
          onClose={() => setSelected(null)}
          onDelete={load}
          onStatusChange={(id, status) => {
            setEntries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
          }}
          onUpdate={(updated) => {
            setEntries(prev => {
              const next = prev.map(e => e.id === updated.id ? updated : e);
              writeCache(next);
              return next;
            });
            setSelected(updated);
          }}
        />
      )}
    </div>
  );
}
