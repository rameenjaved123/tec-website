import { useState, useEffect } from 'react';
import './AdminPage.css';
import {
  getAllSubmissionsFromDB,
  deleteSubmissionFromDB,
  exportToSheets,
  updateSubmissionStatusInDB,
  updateSubmissionInDB,
  getS3ViewUrl,
  ADMIN_PASSWORD,
  FORM_REGISTRY,
} from '../config/forms';

// ── Login ─────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('tec_admin', '1');
      onLogin();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="adm-login-wrap">
      <form className="adm-login-box" onSubmit={submit}>
        <div className="adm-login-logo">🔐</div>
        <h2>Admin Access</h2>
        <p>TEC Forms Dashboard</p>
        <input
          type="password"
          className="adm-login-input"
          placeholder="Enter password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(''); }}
          autoFocus
        />
        {error && <span className="adm-login-error">{error}</span>}
        <button type="submit" className="adm-login-btn">Sign In →</button>
      </form>
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
    // WordPress / legacy URLs — open directly (may break when WP is deleted)
    if (fileUrl.includes('wp-content') || fileUrl.includes('gravity_forms') || !fileUrl.includes('amazonaws.com')) {
      window.open(fileUrl, '_blank');
      return;
    }
    // S3 URLs — generate a presigned view URL
    const url = new URL(fileUrl);
    const fileKey = url.pathname.slice(1); // remove leading /
    const viewUrl = await getS3ViewUrl(fileKey);
    window.open(viewUrl, '_blank');
  } catch (err) {
    alert('Could not open file: ' + err.message);
  }
}

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
  const [emailSent, setEmailSent]   = useState(false);
  const [sheetsStatus, setSheetsStatus] = useState('');
  const [currentStatus, setCurrentStatus] = useState(entry.status || 'new');
  const [editing, setEditing]       = useState(false);
  const [editData, setEditData]     = useState({ ...entry });
  const [saving, setSaving]         = useState(false);

  const INTERNAL = new Set(['id', 'formType', 'submittedAt']);
  const isFileKey = (k) => k.toLowerCase().endsWith('url');

  const handleDelete = () => {
    if (window.confirm('Delete this entry? This cannot be undone.')) {
      deleteSubmissionFromDB(entry.id).catch(console.error);
      onDelete();
      onClose();
    }
  };

  const handleEmail = () => {
    if (!emailTo) { alert('Enter an email address'); return; }
    const subject = encodeURIComponent(`TEC ${entry.formType} - ${entry.firstName || ''} ${entry.lastName || ''}`);
    const body = encodeURIComponent(
      Object.entries(entry)
        .filter(([k]) => !['id'].includes(k))
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    );
    window.open(`mailto:${emailTo}?subject=${subject}&body=${body}`);
    setEmailSent(true);
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

  const skip = ['id'];
  const rows = Object.entries(editing ? editData : entry).filter(([k]) => !skip.includes(k));

  return (
    <div className="adm-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal">
        <div className="adm-modal-header">
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {entry.formType}
              <StatusBadge status={currentStatus} />
              {editing && <span style={{ fontSize: '0.72rem', background: '#fff3e0', color: '#e65100', padding: '2px 8px', borderRadius: 50, fontWeight: 700 }}>Editing</span>}
            </h3>
            <span className="adm-modal-sub">
              {entry.firstName} {entry.lastName} •{' '}
              {new Date(entry.submittedAt).toLocaleString('en-GB')}
            </span>
          </div>
          <button className="adm-modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Status management */}
        <div className="adm-modal-status">
          <span className="adm-status-label">Status:</span>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              className={`adm-status-btn${currentStatus === key ? ' adm-status-btn--active' : ''}`}
              style={currentStatus === key ? { background: cfg.bg, color: cfg.color, borderColor: cfg.color } : {}}
              onClick={() => handleStatusChange(key)}
            >
              {cfg.label}
            </button>
          ))}
        </div>

        <div className="adm-modal-actions">
          {!editing ? (
            <>
              <button className="adm-action-btn" style={{ background: '#e3f2fd', color: '#1565c0', border: '1px solid #1565c0' }} onClick={() => setEditing(true)}>
                ✏️ Edit
              </button>
              <button className="adm-action-btn adm-btn-pdf" onClick={() => generatePDF(entry)}>
                📄 PDF
              </button>
              <button className="adm-action-btn adm-btn-sheets" onClick={handleSheets}>
                📊 {sheetsStatus || 'Sheets'}
              </button>
              {FORM_REGISTRY[entry.formType]?.sheetsUrl && (
                <a
                  className="adm-action-btn adm-btn-sheets"
                  href={FORM_REGISTRY[entry.formType].sheetsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  🔗 Open Sheet
                </a>
              )}
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
              placeholder="Send entry to email address…"
              value={emailTo}
              onChange={e => setEmailTo(e.target.value)}
            />
            <button className="adm-action-btn adm-btn-email" onClick={handleEmail}>
              ✉️ {emailSent ? 'Sent!' : 'Send'}
            </button>
          </div>
        )}

        <div className="adm-modal-body">
          {rows.map(([key, val]) => (
            <div key={key} className="adm-detail-row">
              <span className="adm-detail-key">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
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
  const [authed, setAuthed]           = useState(!!sessionStorage.getItem('tec_admin'));
  const [entries, setEntries]         = useState([]);
  const [selected, setSelected]       = useState(null);
  const [filter, setFilter]           = useState('All');
  const [search, setSearch]           = useState('');
  const [loading, setLoading]         = useState(false);
  const [dbMode, setDbMode]           = useState(false);
  const [entriesOpen, setEntriesOpen] = useState(true);
  const [page, setPage]               = useState(1);
  const PER_PAGE                      = 25;


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

  useEffect(() => {
    if (!authed) return;

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

    // 3. Background refresh every 5 minutes (not 30 seconds)
    const interval = setInterval(() => load({ silent: true }), CACHE_TTL);
    return () => clearInterval(interval);
  }, [authed]);

  const formTypes = ['All', ...new Set(entries.map(e => e.formType))];

  const filtered = entries.filter(e => {
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

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  return (
    <div className="adm-page">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">
          <img
            src="/assets/logos/tec-crest.png"
            alt="Trent Education Centre"
            className="adm-sidebar-logo-img"
          />
          <div>
            <div className="adm-sidebar-title">TEC Admin</div>
            <div className="adm-sidebar-sub">Forms Dashboard</div>
          </div>
        </div>
        <nav className="adm-nav">

          {/* ── FORM LINKS (first) ── */}
          <div className="adm-nav-section">FORM LINKS</div>
          {Object.entries(FORM_REGISTRY).map(([name, cfg]) => cfg.path ? (
            <a
              key={name}
              href={cfg.path}
              target="_blank"
              rel="noreferrer"
              className="adm-nav-item adm-nav-link"
            >
              <span>{name}</span>
              <span className="adm-nav-arrow">↗</span>
            </a>
          ) : null)}

          {/* ── ENTRIES (collapsible) ── */}
          <button
            className="adm-nav-section adm-nav-section--toggle"
            onClick={() => setEntriesOpen(o => !o)}
          >
            <span>ENTRIES</span>
            <span className="adm-nav-chevron">{entriesOpen ? '▾' : '▸'}</span>
          </button>

          {entriesOpen && (
            <>
              <button
                className={`adm-nav-item${filter === 'All' ? ' active' : ''}`}
                onClick={() => setFilterAndReset('All')}
              >
                <span>All Submissions</span>
                <span className="adm-badge">{entries.length}</span>
              </button>
              {formTypes.slice(1).map(t => (
                <button
                  key={t}
                  className={`adm-nav-item${filter === t ? ' active' : ''}`}
                  onClick={() => setFilterAndReset(t)}
                >
                  <span>{t}</span>
                  <span className="adm-badge">{entries.filter(e => e.formType === t).length}</span>
                </button>
              ))}
            </>
          )}

          {/* ── SHEETS ── */}
          {Object.entries(FORM_REGISTRY).some(([, cfg]) => cfg.sheetsUrl) && (
            <>
              <div className="adm-nav-section" style={{ marginTop: 16 }}>SHEETS</div>
              {Object.entries(FORM_REGISTRY).map(([name, cfg]) => cfg.sheetsUrl ? (
                <a
                  key={name}
                  href={cfg.sheetsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="adm-nav-item adm-nav-link"
                >
                  <span>{name}</span>
                  <span className="adm-nav-arrow">↗</span>
                </a>
              ) : null)}
            </>
          )}
        </nav>
        <button className="adm-logout" onClick={() => { sessionStorage.removeItem('tec_admin'); setAuthed(false); }}>
          Sign Out
        </button>
      </aside>

      {/* Main */}
      <main className="adm-main">
        <div className="adm-topbar">
          <div>
            <h1 className="adm-title">
              {filter === 'All' ? 'All Submissions' : filter}
            </h1>
            <p className="adm-subtitle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {loading ? (
                <span style={{ color: '#888' }}>Loading…</span>
              ) : (
                <>
                  {filtered.length} entries
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 600, padding: '2px 10px', borderRadius: 20,
                    background: '#f0f0f0', color: '#666', border: '1px solid #e0e0e0',
                  }}>
                    {dbMode ? 'DynamoDB' : 'Local'}
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="adm-topbar-right">
            <input
              className="adm-search"
              type="text"
              placeholder="🔍  Search entries…"
              value={search}
              onChange={e => setSearchAndReset(e.target.value)}
            />
            <button
              className="adm-export-btn"
              onClick={() => { sessionStorage.removeItem(CACHE_KEY); load(); }}
              title="Refresh from DynamoDB"
            >
              🔄 Refresh
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

        {/* Stat cards */}
        {entries.length > 0 && (
          <div className="adm-stats">
            {[
              { label: 'Total',    value: entries.length },
              { label: 'New',      value: entries.filter(e => (e.status || 'new') === 'new').length },
              { label: 'Reviewed', value: entries.filter(e => e.status === 'reviewed').length },
              { label: 'Actioned', value: entries.filter(e => e.status === 'actioned').length },
            ].map(s => (
              <div key={s.label} className="adm-stat-card">
                <div className="adm-stat-val">{s.value}</div>
                <div className="adm-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="adm-empty">
            <div className="adm-empty-icon">📭</div>
            <p>No submissions yet.</p>
            <p className="adm-empty-sub">Entries will appear here after forms are submitted.</p>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Form</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Files</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(entry => (
                  <tr key={entry.id} onClick={() => setSelected(entry)} className="adm-row">
                    <td className="adm-td-name">
                      <div className="adm-avatar">{(entry.firstName?.[0] || '?').toUpperCase()}</div>
                      <div>
                        <div className="adm-name">{entry.firstName} {entry.lastName}</div>
                        <div className="adm-email">{entry.email || '—'}</div>
                      </div>
                    </td>
                    <td><span className="adm-tag">{entry.formType}</span></td>
                    <td><StatusBadge status={entry.status || 'new'} /></td>
                    <td className="adm-date">{new Date(entry.submittedAt).toLocaleDateString('en-GB')}</td>
                    <td>{entry.siteLocation || '—'}</td>
                    <td onClick={e => e.stopPropagation()}>
                      {entry.proofOfIdUrl && <button className="adm-file-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => openS3File(entry.proofOfIdUrl)}>📎 ID</button>}
                      {entry.p45Url && <button className="adm-file-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => openS3File(entry.p45Url)}>📎 P45</button>}
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="adm-row-actions">
                        <button className="adm-row-btn" onClick={() => setSelected(entry)} title="View">👁</button>
                        <button className="adm-row-btn" onClick={() => generatePDF(entry)} title="PDF">📄</button>
                        <button className="adm-row-btn adm-row-del" onClick={() => { if (window.confirm(`Delete ${entry.firstName || ''} ${entry.lastName || ''}? This cannot be undone.`)) { deleteSubmissionFromDB(entry.id).catch(console.error); load(); } }} title="Delete">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
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
        )}
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
