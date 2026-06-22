// ════════════════════════════════════════════════════════════
//  TEC Forms — Central Configuration
//  All forms, credentials, and utilities in one place.
//  To add a new form: add an entry to FORM_REGISTRY below.
// ════════════════════════════════════════════════════════════
import {
  submitForm as apiSubmitForm,
  uploadToS3 as apiUploadToS3,
  getS3ViewUrl as apiGetS3ViewUrl,
  sendEmail as apiSendEmail,
  listSubmissions,
  updateSubmission as apiUpdateSubmission,
  deleteSubmission as apiDeleteSubmission,
  getRecaptchaToken,
} from '../utils/api';

// ── Form type → FastAPI slug mapping ─────────────────────────
const FORM_SLUG = {
  'Enquiry Form':                'enquiry',
  'Application Form':            'application',
  'Enrolment Form':              'enrolment',
  'International Application':   'international-application',
  'Job Application':             'job-application',
  'New Starter Form':            'new-starter',
  'Partnerships & Collaborations': 'partnerships',
  'English & IELTS Application': 'english-ielts',
  'Complaint Form':              'complaint',
};

// ── Notification emails ───────────────────────────────────────
// Who gets emailed when each form is submitted
export const NOTIFY_EMAILS = {
  'New Starter Form':               'hr@trenteducation.co.uk',
  'Partnerships & Collaborations':  'partnerships@trenteducation.co.uk',
  'Application Form':               'digitaladmissions@trenteducation.co.uk',
  'Job Application':                'hr@trenteducation.co.uk',
  'English & IELTS Application':    'internationaladmissions@trenteducation.co.uk',
  'Enquiry Form':                   'digitaladmissions@trenteducation.co.uk',
  'Enrolment Form':                 'digitaladmissions@trenteducation.co.uk',
  'International Application':      'internationaladmissions@trenteducation.co.uk',
  'Contact':                        'info@trenteducation.co.uk',
  'default':                        'info@trenteducation.co.uk',
};

// ── Google Sheets (Apps Script) ───────────────────────────────
// Each form has its own Apps Script deployment → its own sheet
export const SHEETS_CONFIG = {
  // New Starter Form sheet
  newStarterUrl: 'https://script.google.com/a/macros/trenteducation.co.uk/s/AKfycbz4j3qZbDzx7QA8bRRF2LM3Oq6W4JaZzxGa59gYk4Q3bf01IQ30ZY9w3YFU0M01qFOu-A/exec',
  // Partnerships & Collaborations sheet
  partnershipsUrl: 'https://script.google.com/macros/s/AKfycbyWOGd-pSDR8mZkzrRh6u9E1NJIjkEotKu6Xscbbfj5XpgEm64Baho80Qz-zJkfQhlo/exec',
};

// ── Form Registry ─────────────────────────────────────────────
// Register every form here. Used by Admin dashboard for labels,
// routing hints, and future validation.
export const FORM_REGISTRY = {
  'New Starter Form': {
    path: '/new-starter-form',
    icon: '📋',
    color: '#1a4d2e',
    notifyEmail: NOTIFY_EMAILS['New Starter Form'],
    sheetsTab: 'New Starters',
    sheetsUrl: '', // paste your Google Sheet URL here
    scriptUrl: 'https://script.google.com/a/macros/trenteducation.co.uk/s/AKfycbz4j3qZbDzx7QA8bRRF2LM3Oq6W4JaZzxGa59gYk4Q3bf01IQ30ZY9w3YFU0M01qFOu-A/exec',
    // Maps our internal field names → exact Excel column names (matching Gravity Forms)
    columnMap: {
      title:                'Name (Title)',
      firstName:            'Name (First)',
      middleName:           'Name (Middle)',
      lastName:             'Name (Last)',
      gender:               'Gender',
      dob:                  'Date of Birth',
      maritalStatus:        'Marital Status',
      streetAddress:        'Address (Street Address)',
      city:                 'Address (City)',
      postCode:             'Address (Post Code)',
      country:              'Address (Country)',
      jobTitle:             'Job Title',
      startDate:            'Start Date',
      mobile:               'Mobile Number',
      email:                'Email',
      nationalInsurance:    'National Insurance Number',
      annualSalary:         'Annual Salary',
      siteLocation:         'Site Location',
      emergencyName:        'Emergency Contact Name',
      emergencyRelationship:'Emergency Relationship',
      emergencyMobile:      'Emergency Mobile',
      accountHolder:        'Account Holder Name',
      sortCode:             'Sort Code',
      accountNumber:        'Account Number',
      bankName:             'Bank Name',
      contractType:         'Contract Type',
      starterType:          'Starter Type',
      starterDeclaration:   'Starter Declaration',
      proofOfIdUrl:         'Proof of ID',
      p45Url:               'P45',
      submittedAt:          'Submitted At',
    },
  },
  'Partnerships & Collaborations': {
    path: '/partnerships-form',
    icon: '🤝',
    color: '#1565c0',
    notifyEmail: NOTIFY_EMAILS['Partnerships & Collaborations'],
    notificationTemplateId: 'template_hqbm6qt',
    sheetsTab: 'Partnerships',
    sheetsUrl: '', // paste your Google Sheet URL here
    scriptUrl: 'https://script.google.com/macros/s/AKfycbyWOGd-pSDR8mZkzrRh6u9E1NJIjkEotKu6Xscbbfj5XpgEm64Baho80Qz-zJkfQhlo/exec',
    columnMap: {
      title:         'Title',
      firstName:     'First Name',
      lastName:      'Last Name',
      companyName:   'Company Name',
      legalStatus:   'Legal Status',
      streetAddress: 'Street Address',
      addressLine2:  'Address Line 2',
      city:          'City',
      stateProvince: 'State / Province',
      postCode:      'Post Code',
      country:       'Country',
      phone:         'Phone',
      email:         'Email',
      service:       'Service',
      tellUsMore:    'Tell Us More',
      submittedAt:   'Submitted At',
    },
  },
  'Application Form': {
    path: '/application-form',
    icon: '📝',
    color: '#6a1b9a',
    notifyEmail: NOTIFY_EMAILS['Application Form'],
    sheetsTab: 'Sheet1',
    sheetsUrl: 'https://docs.google.com/spreadsheets/d/1U4YaBleh1BUVYvkV69xwVng-gfwqKUqVMcQCs8nsugk/edit',
    scriptUrl: 'https://script.google.com/macros/s/AKfycbznkDqOkpRsPkLqccgbn5yEfR9HIl-mXdsoGKdtfn-R-b_O_gL3gptufxnZy6XP1Zo-/exec',
    columnMap: {
      // ── Personal ──────────────────────────────────────────────
      title:                  'Title',
      firstName:              'Name (First Name)',
      lastName:               'Name (Surname)',
      sex:                    'Gender',
      dob:                    'Date of birth',
      email:                  'Email',
      mobile:                 'Mobile',
      emergencyContact:       'Emergency Contact',
      nationalInsurance:      'National Insurance Number',
      ukResident3Years:       'Have you been a UK resident for 3 years or more ?',
      // ── Address ───────────────────────────────────────────────
      addressLine1:           'First Line of Address',
      addressLine2:           'Second Line of Address',
      city:                   'City',
      country:                'Country',
      postCode:               'Postal Code',
      // ── Background ───────────────────────────────────────────
      prevQualification:      'Previous Qualification Level',
      countryOfBirth:         'Country of birth',
      nationality:            'Nationality',
      ethnicity:              'Ethnicity',
      visaStatus:             'Visa Status',
      shareCode:              'Share Code',
      dateOfArrival:          'Date of Arrival',
      // ── Course ───────────────────────────────────────────────
      course:                 'Which course are you applying for?',
      otherCourses:           'Other Courses',
      passportNumber:         'Passport Number',
      startDate:              'When would you like to start study?',
      studyCentre:            'Preferred Study Centre Location',
      // ── Employment ───────────────────────────────────────────
      employmentStatus:       'Employment Status',
      employerName:           'Name of Employer',
      dateOfEmployment:       'Date of Employment',
      lengthOfEmployment:     'Length of Employment',
      lengthOfUnemployment:   'Length Of Unemployment',
      studentFinance:         'Have you ever applied for student finance ?',
      studentFinanceDetails:  'If yes, please specify when and for what course ?',
      disability:             'Disclose any disability/medical condition',
      disabilityDetails:      'If other, please give details',
      criminalConviction:     'Do you have any spent/unspent criminal conviction?',
      benefits:               'Are you in receipt of any benefits?*',
      benefitsType:           'If yes, what type of benefits you are recieving*',
      hearAbout:              'How did you hear about us?',
      referralName:           'Referral Name',
      // ── Documents (file uploads) ─────────────────────────────
      passportFileUrl:        'Passport / National ID',
      idBackFileUrl:          'ID Back Picture',
      qualificationsFileUrl:  'Qualifications / Work reference / P60',
      certificatesFileUrl:    'Certificates / Transcripts',
      proofOfAddressUrl:      'Proof of Address',
      proofOfAddress2Url:     'Proof of Address (second)',
      rightToStudyUrl:        'Right to Study',
      ninFileUrl:             'National Insurance Number (file)',
      cvFileUrl:              'CV',
      workReferenceUrl:       'Work Reference',
      // ── Declarations ─────────────────────────────────────────
      signature:              'Signature',
      signatureDate:          'Signature Date',
      privacyAgreed:          'Terms & Conditions',
      notes:                  'Notes (Staff Use Only)',
    },
  },
  'Job Application': {
    path: '/job-application',
    icon: '',
    color: '#37474f',
    notifyEmail: NOTIFY_EMAILS['Job Application'],
    sheetsTab: 'Job Applications',
    sheetsUrl: '',
    scriptUrl: '',
    columnMap: {
      jobTitle:             'Job Title',
      title:                'Name (Title)',
      firstName:            'Name (First Name)',
      middleName:           'Name (Middle)',
      lastName:             'Name (Surname)',
      gender:               'Gender',
      dob:                  'Date of birth',
      mobile:               'Mobile',
      email:                'Email',
      emergencyContact:     'Emergency Contact',
      addressLine1:         'First Line of Address',
      addressLine2:         'Second Line of Address',
      city:                 'City',
      country:              'Country',
      postCode:             'Postal Code',
      countryOfBirth:       'Country of birth',
      nationality:          'Nationality',
      qualifications:       'Qualifications',
      ethnicity:            'Ethnicity',
      visaStatus:           'Visa Status',
      siteLocation:         'Preferred Working Location',
      disability:           'Disclose any disability/medical condition',
      disabilityDetails:    'If other, please give details',
      criminalConviction:   'Do you have any spent/unspent criminal conviction?',
      convictionDetails:    'If yes, please give details',
      cvFileUrl:            'CV',
      submittedAt:          'Entry Date',
    },
  },

  'English & IELTS Application': {
    path: '/english-ielts-application',
    icon: '🌍',
    color: '#0d47a1',
    notifyEmail: NOTIFY_EMAILS['English & IELTS Application'],
    sheetsTab: 'Sheet1',
    sheetsUrl: '', // paste your Google Sheet URL here
    scriptUrl: '', // paste your Apps Script URL here
    columnMap: {
      title:                  'Name (Title)',
      firstName:              'Name (First Name)',
      lastName:               'Name (Surname)',
      sex:                    'Gender',
      dob:                    'Date of birth',
      mobile:                 'Mobile',
      email:                  'Email',
      emergencyContact:       'Emergency Contact',
      addressLine1:           'Address (Street Address)',
      addressLine2:           'Address (Address Line 2)',
      city:                   'Address (City)',
      stateProvince:          'Address (State / Province)',
      postCode:               'Address (ZIP / Postal Code)',
      country:                'Address (Country)',
      nextOfKinName:          'Next of Kin Name:',
      nextOfKinRelationship:  'Next of Kin Relationship:',
      nextOfKinTelephone:     'Next of Kin Telephone',
      nationalInsurance:      'National Insurance Number',
      passportNumber:         'Passport Number',
      ukResident3Years:       'Have you been a UK resident for 3 years or more ?',
      nationality:            'Nationality',
      ethnicity:              'Ethnicity',
      visaStatus:             'Visa Status',
      shareCode:              'Share Code',
      course:                 'Which course are you applying for?',
      privacyAgreed:          'Terms & Conditions (Consent)',
      coursePrice:            'Courses Price',
      submittedAt:            'Entry Date',
    },
  },
  'Enquiry Form': {
    path: '/enquiry-form',
    icon: '💬',
    color: '#e65100',
    notifyEmail: NOTIFY_EMAILS['Enquiry Form'],
    sheetsTab: 'Sheet1',
    sheetsUrl: '', // paste your Google Sheet URL here
    scriptUrl: '', // paste your Apps Script URL here
    columnMap: {
      title:          'Name (Title)',
      firstName:      'Name (First Name)',
      lastName:       'Name (Surname)',
      email:          'Email',
      mobile:         'Mobile',
      enquiringAbout: 'Enquiring About',
      otherCourses:   'Other Courses',
      submittedAt:    'Entry Date',
    },
  },
  'Enrolment Form': {
    path: '/enrolment-form',
    icon: '🎓',
    color: '#1a3c6e',
    notifyEmail: NOTIFY_EMAILS['Enrolment Form'],
    sheetsTab: 'Enrolments',
    sheetsUrl: '',
    scriptUrl: '',
    columnMap: {
      title:                      'Name (Title)',
      firstName:                  'Name (First Name)',
      middleName:                 'Name (Middle)',
      lastName:                   'Name (Surname)',
      gender:                     'Gender',
      dob:                        'Date of birth',
      addressLine1:               'First Line of Address',
      addressLine2:               'Second Line of Address',
      postCode:                   'Postcode',
      city:                       'City',
      mobile:                     'Phone Number',
      email:                      'Email',
      nextOfKinName:              'Next of Kin Name',
      nextOfKinRelationship:      'Next of Kin Relationship',
      nextOfKinTelephone:         'Next of Kin Telephone',
      accommodationType:          'Accommodation Type',
      permAddressLine1:           'Perm Address Line 1',
      permAddressLine2:           'Perm Address Line 2',
      permAddressLine3:           'Perm Address Line 3',
      permAddressLine4:           'Perm Address Line 4',
      permPostCode:               'Perm Postcode',
      permCountry:                'Perm Country',
      ukResident3Years:           'UK Resident 3 Years',
      studentFinance:             'Applied for Student Finance',
      feesPayer:                  'Fees Payer',
      studentLoansCRN:            'Student Loans CRN',
      requiresStudentVisa:        'Requires Student Visa',
      nonBritishInfo:             'Non-British Citizen Info',
      immigrationStatus:          'Immigration Status',
      passportNumber:             'Passport Number',
      passportValidFrom:          'Passport Valid From',
      passportValidTo:            'Passport Valid To',
      passportCountry:            'Passport Country',
      visaBRPNumber:              'VISA/BRP Number',
      visaValidFrom:              'Visa Valid From',
      visaValidTo:                'Visa Valid To',
      englishFirstLanguage:       'English First Language',
      firstLanguage:              'First Language',
      englishQualification:       'English Qualification',
      mathsQualification:         'Maths Qualification',
      highestQualification:       'Highest Qualification',
      qualificationLevel:         'Qualification Level',
      previousEducationProvider:  'Previous Education Provider',
      jobTitle:                   'Job Title',
      organisation:               'Organisation',
      employmentType:             'Employment Type',
      employmentStartDate:        'Employment Start',
      employmentEndDate:          'Employment End',
      criminalConvictions:        'Criminal Convictions',
      sexIdentifier:              'Sex Identifier',
      religion:                   'Religion',
      parentalEducation:          'Parental Education',
      careLeaverStatus:           'Care Leaver Status',
      genderIdentity:             'Gender Identity',
      sexualOrientation:          'Sexual Orientation',
      ethnicity:                  'Ethnicity',
      disability:                 'Disability',
      programmeTitle:             'Programme Title',
      plannedStartDate:           'Planned Start Date',
      plannedEndDate:             'Planned End Date',
      contract:                   'Contract',
      holdEquivalentQualification:'Hold Equivalent Qualification',
      tuitionFeeYear1:            'Tuition Fee Year 1',
      tuitionFeeYear2:            'Tuition Fee Year 2',
      tuitionFeeYear3:            'Tuition Fee Year 3',
      tuitionFeeTotal:            'Tuition Fee Total',
      signature:                  'Signature',
      signatureDate:              'Signature Date',
      submittedAt:                'Entry Date',
    },
  },

  'International Application': {
    path: '/international-application',
    icon: '✈️',
    color: '#1565c0',
    notifyEmail: NOTIFY_EMAILS['International Application'],
    sheetsTab: 'International',
    sheetsUrl: '',
    scriptUrl: '',
    columnMap: {
      title:                       'Name (Title)',
      firstName:                   'Name (First Name)',
      middleName:                  'Name (Middle)',
      lastName:                    'Name (Surname)',
      gender:                      'Gender',
      dob:                         'Date of birth',
      mobile:                      'Mobile',
      email:                       'Email',
      emergencyContact:            'Emergency Contact',
      addressLine1:                'First Line of Address',
      addressLine2:                'Second Line of Address',
      city:                        'City',
      country:                     'Country',
      postCode:                    'Postal Code',
      countryOfBirth:              'Country of birth',
      countryOfPermanentResidence: 'Country of Permanent Residence',
      nationality:                 'Nationality',
      ethnicity:                   'Ethnicity',
      ukCitizen:                   'Are you a UK citizen?',
      requiresVisa:                'Do you require a visa to study in the UK?',
      passportNumber:              'Passport Number',
      passportPlaceOfIssue:        'Passport Place of Issue',
      passportIssuedDate:          'Passport Issued Date',
      passportExpiryDate:          'Passport Expiry Date',
      visaRefused:                 'Have you been refused a visa?',
      qual1Type:                   'Qualification 1 Type',
      qual1OtherDetails:           'Qualification 1 Other Details',
      qual1Subject:                'Qualification 1 Subject',
      qual1Grade:                  'Qualification 1 Grade',
      qual1DateAchieved:           'Qualification 1 Date Achieved',
      qual1Institution:            'Qualification 1 Institution',
      qual2Type:                   'Qualification 2 Type',
      qual2OtherDetails:           'Qualification 2 Other Details',
      qual2Subject:                'Qualification 2 Subject',
      qual2Grade:                  'Qualification 2 Grade',
      qual2YearAchieved:           'Qualification 2 Year Achieved',
      qual2MonthAchieved:          'Qualification 2 Month Achieved',
      qual2Institution:            'Qualification 2 Institution',
      course:                      'Which course are you applying for?',
      startDate:                   'When would you like to start study?',
      studyCentre:                 'Preferred Study Centre Location',
      employmentStatus:            'Employment Status',
      employerName:                'Name of Employer',
      dateOfEmployment:            'Date of Employment',
      lengthOfEmployment:          'Length of Employment',
      lengthOfUnemployment:        'Length of Unemployment',
      disability:                  'Disclose any disability/medical condition',
      disabilityDetails:           'Disability details',
      criminalConviction:          'Do you have any spent/unspent criminal conviction?',
      criminalConvictionDetails:   'Criminal conviction details',
      hearAbout:                   'How did you hear about us?',
      referralName:                'Referral Name',
      submittedAt:                 'Entry Date',
    },
  },

  // ─── Add more forms here as needed ───────────────────────
  // 'Form Name': {
  //   path: '/route',
  //   icon: '📝',
  //   color: '#hex',
  //   notifyEmail: 'recipient@trenteducation.co.uk',
  //   sheetsTab: 'Sheet Tab Name',
  // },
};

// ════════════════════════════════════════════════════════════
//  UTILITIES — used by all forms, do not edit below
// ════════════════════════════════════════════════════════════

// ── Get presigned view URL for a file in S3 ──────────────────
export async function getS3ViewUrl(fileKey) {
  return apiGetS3ViewUrl(fileKey);
}

// ── Upload file to S3 ────────────────────────────────────────
export async function uploadToS3(file, folder = 'uploads') {
  return apiUploadToS3(file, folder);
}

// ════════════════════════════════════════════════════════════
//  DATA LAYER  — DynamoDB (primary store)
// ════════════════════════════════════════════════════════════

// ── Entry builder ────────────────────────────────────────────
export function saveSubmission(formType, data) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    formType,
    submittedAt: new Date().toISOString(),
    status: 'new',
    ...data,
  };
}

// ── DynamoDB helpers ─────────────────────────────────────────

/**
 * Submit a form entry to the FastAPI backend.
 * `entry` must have a `formType` field matching a key in FORM_REGISTRY.
 * Returns { id, status } on success, false on failure.
 */
export async function saveSubmissionToDB(entry) {
  try {
    const slug = FORM_SLUG[entry.formType];
    if (!slug) throw new Error(`Unknown form type: ${entry.formType}`);
    const recaptchaToken = await getRecaptchaToken('form_submit');
    const result = await apiSubmitForm(slug, entry, recaptchaToken);
    return result?.data ?? result ?? true;
  } catch (err) {
    console.error('Form submission failed:', err);
    return false;
  }
}

/**
 * Fetch all submissions from the FastAPI backend for all form types.
 * Calls onProgress with accumulated items after each form type loads.
 * Returns sorted array on success, null on error.
 */
export async function getAllSubmissionsFromDB(onProgress) {
  try {
    const formTypes = Object.keys(FORM_SLUG);
    const allItems = [];

    for (const label of formTypes) {
      const slug = FORM_SLUG[label];
      try {
        let offset = 0;
        const PAGE = 50;
        while (true) {
          const res = await listSubmissions(slug, { offset, limit: PAGE });
          const items = (res?.data?.items || []).map(item => ({
            ...item.data,
            id:          item.id,
            formType:    label,
            status:      item.status,
            notes:       item.notes,
            submittedAt: item.submitted_at,
            _fapiId:     item.id,
            _fapiSlug:   slug,
          }));
          allItems.push(...items);
          if (onProgress) onProgress([...allItems]);
          if (items.length < PAGE) break;
          offset += PAGE;
        }
      } catch {
        // skip form types that fail (e.g. no table yet)
      }
    }

    allItems.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    return allItems;
  } catch (err) {
    console.error('Submissions fetch failed:', err);
    return null;
  }
}

/** Update full entry — patches notes and status via FastAPI */
export async function updateSubmissionInDB(entry) {
  try {
    const slug = entry._fapiSlug || FORM_SLUG[entry.formType];
    if (!slug) return false;
    await apiUpdateSubmission(slug, entry._fapiId || entry.id, {
      notes: entry.notes,
      status: entry.status,
    });
    return true;
  } catch (err) {
    console.error('Submission update failed:', err);
    return false;
  }
}

/** Update just the status field of a submission */
export async function updateSubmissionStatusInDB(id, newStatus, formTypeLabel) {
  try {
    const slug = FORM_SLUG[formTypeLabel];
    if (!slug) return false;
    await apiUpdateSubmission(slug, id, { status: newStatus });
    return true;
  } catch (err) {
    console.error('Status update failed:', err);
    return false;
  }
}

/** Permanently delete a submission */
export async function deleteSubmissionFromDB(id, formTypeLabel) {
  try {
    const slug = FORM_SLUG[formTypeLabel];
    if (!slug) return false;
    await apiDeleteSubmission(slug, id);
    return true;
  } catch (err) {
    console.error('Submission delete failed:', err);
    return false;
  }
}

/** Push all localStorage entries to the FastAPI backend (one-time migration). */
export async function migrateLocalStorageToDB(onProgress) {
  const all = getAllSubmissions();
  let success = 0;
  let failed = 0;
  for (let i = 0; i < all.length; i++) {
    const ok = await saveSubmissionToDB(all[i]);
    if (ok) success++; else failed++;
    if (onProgress) onProgress(i + 1, all.length);
  }
  return { success, failed };
}

// ── Export to Google Sheets (Apps Script) ────────────────────
export async function exportToSheets(entry) {
  const formConfig = FORM_REGISTRY[entry.formType];
  const scriptUrl  = formConfig?.scriptUrl;

  if (!scriptUrl) {
    console.warn('No Google Sheets script URL configured for', entry.formType);
    return false;
  }
  try {
    const columnMap = formConfig?.columnMap;

    let payload;
    if (columnMap) {
      payload = {};
      Object.entries(columnMap).forEach(([internalKey, colName]) => {
        const val = entry[internalKey];
        // Convert booleans to readable strings
        payload[colName] = typeof val === 'boolean' ? (val ? 'Agreed' : 'Not Agreed') : (val ?? '');
      });
    } else {
      payload = { ...entry };
    }

    console.log('Sending to Sheets:', payload);

    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    });

    console.log('Sheets request sent');
    return true;
  } catch (err) {
    console.error('Sheets export failed:', err);
    return false;
  }
}

// ── Confirmation email HTML templates ────────────────────────
function buildSummaryTable(entry, columnMap, { skipKeys = [], fileKeys = [] } = {}) {
  const internalSkip = new Set(['id', 'status', 'formType', 'submittedAt', 'privacyAgreed', 'notes', ...skipKeys]);
  const fileSet      = new Set(fileKeys);

  const rows = Object.entries(columnMap)
    .filter(([k]) => !internalSkip.has(k))
    .map(([k, label], i) => {
      const v   = entry[k];
      const bg  = i % 2 === 0 ? '#f7f7f7' : '#ffffff';
      let display;
      if (fileSet.has(k)) {
        display = v ? '&#10003; Uploaded' : '<em style="color:#999;">Not uploaded</em>';
      } else if (v === null || v === undefined || v === '') {
        display = '<em style="color:#999;">—</em>';
      } else if (typeof v === 'boolean') {
        display = v ? 'Yes' : 'No';
      } else if (Array.isArray(v)) {
        display = v.join(', ') || '<em style="color:#999;">—</em>';
      } else {
        display = String(v);
      }
      return `<tr style="background:${bg};">
        <td style="padding:8px 12px;font-weight:600;color:#444;width:40%;border-bottom:1px solid #eee;font-size:13px;">${label}</td>
        <td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee;font-size:13px;">${display}</td>
      </tr>`;
    })
    .join('');

  return `<table style="width:100%;border-collapse:collapse;margin-top:16px;">${rows}</table>`;
}

function buildConfirmationHtml(entry) {
  const firstName = entry.firstName || '';
  const lastName  = entry.lastName  || '';
  const name      = `${firstName} ${lastName}`.trim() || 'there';
  const logo      = 'https://vlebucket.s3.eu-west-2.amazonaws.com/Untitled+design+(12).jpg';
  const wrapper   = (body) => `
    <div style="max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:8px;border:1px solid #ddd;font-family:Arial,sans-serif;">
      <img style="width:100%;height:auto;margin-bottom:20px;" src="${logo}" alt="Trent Education Centre" />
      ${body}
      <p style="font-size:15px;color:#555;">Thank you,</p>
      <p style="font-size:15px;color:#333;"><strong>Trent Education Centre</strong></p>
    </div>`;

  switch (entry.formType) {
    case 'Application Form': {
      const appMap = FORM_REGISTRY['Application Form']?.columnMap || {};
      const appTable = buildSummaryTable(entry, appMap, {
        skipKeys: ['notes', 'referralName'],
        fileKeys: ['passportUrl', 'proofOfAddressUrl', 'qualificationUrl'],
      });
      return {
        subject: 'Application Received — Trent Education Centre',
        fromName: 'Admission Team - Trent Education Centre',
        html: `
          <div style="max-width:680px;margin:auto;background:#fff;border:1px solid #ddd;border-radius:8px;overflow:hidden;font-family:Arial,sans-serif;">
            <img style="width:100%;height:auto;display:block;" src="${logo}" alt="Trent Education Centre" />
            <div style="padding:24px;">
              <h2 style="color:#4caf50;font-size:22px;text-align:center;margin:0 0 8px;">Application Received</h2>
              <p style="font-size:15px;color:#333;">Dear <strong>${firstName} ${lastName}</strong>,</p>
              <p style="font-size:15px;color:#555;line-height:1.6;">Thank you for submitting your application to Trent Education Centre. We are pleased to confirm that your application has been successfully received and is now being reviewed.</p>
              <p style="font-size:15px;color:#555;line-height:1.6;">Below is a summary of the information you submitted:</p>
              ${appTable}
              <p style="font-size:15px;color:#555;line-height:1.6;margin-top:20px;">If you have any questions, please contact us at <a href="mailto:digitaladmissions@trenteducation.co.uk" style="color:#4caf50;">digitaladmissions@trenteducation.co.uk</a></p>
              <p style="font-size:15px;color:#555;">Thank you,</p>
              <p style="font-size:15px;color:#333;"><strong>Trent Education Centre</strong></p>
            </div>
          </div>`,
      };
    }

    case 'Job Application': {
      const jobMap = FORM_REGISTRY['Job Application']?.columnMap || {};
      const jobTable = buildSummaryTable(entry, jobMap, {
        skipKeys: ['submittedAt', 'status'],
        fileKeys: ['cvFileUrl'],
      });
      return {
        subject: 'Job Application Received — Trent Education Centre',
        fromName: 'HR Team - Trent Education Centre',
        html: `
          <div style="max-width:680px;margin:auto;background:#fff;border:1px solid #ddd;border-radius:8px;overflow:hidden;font-family:Arial,sans-serif;">
            <img style="width:100%;height:auto;display:block;" src="${logo}" alt="Trent Education Centre" />
            <div style="padding:24px;">
              <h2 style="color:#4caf50;font-size:22px;text-align:center;margin:0 0 8px;">Thank You for Your Application</h2>
              <p style="font-size:15px;color:#333;">Dear <strong>${firstName} ${lastName}</strong>,</p>
              <p style="font-size:15px;color:#555;line-height:1.6;">Thank you for submitting your job application to Trent Education Centre. We have received your application and our HR team will review it and be in touch with you shortly.</p>
              <p style="font-size:15px;color:#555;line-height:1.6;">Below is a summary of the information you submitted:</p>
              ${jobTable}
              <p style="font-size:15px;color:#555;line-height:1.6;margin-top:20px;">If you have any questions in the meantime, please contact us at <a href="mailto:hr@trenteducation.co.uk" style="color:#4caf50;">hr@trenteducation.co.uk</a></p>
              <p style="font-size:15px;color:#555;">Thank you,</p>
              <p style="font-size:15px;color:#333;"><strong>Trent Education Centre</strong></p>
            </div>
          </div>`,
      };
    }

    case 'Enquiry Form':
      return {
        subject: 'Your Enquiry Has Been Received',
        fromName: 'Admissions Team - Trent Education Centre',
        html: wrapper(`
          <h2 style="color:#4caf50;font-size:22px;text-align:center;">Thank You for Your Enquiry</h2>
          <p style="font-size:16px;color:#333;">Dear <strong>${name}</strong>,</p>
          <p style="font-size:15px;color:#555;line-height:1.6;">Thank you for contacting Trent Education Centre. We have received your enquiry and a member of our admissions team will be in touch with you shortly.</p>
          <p style="font-size:15px;color:#555;line-height:1.6;">If you have any immediate questions, please contact us at <a href="mailto:info@trenteducation.co.uk" style="color:#4caf50;">info@trenteducation.co.uk</a></p>`),
      };

    case 'English & IELTS Application': {
      const ieltsMap = FORM_REGISTRY['English & IELTS Application']?.columnMap || {};
      const ieltsTable = buildSummaryTable(entry, ieltsMap, {
        skipKeys: ['coursePrice'],
        fileKeys: ['passportUrl', 'proofOfAddressUrl'],
      });
      return {
        subject: 'English & IELTS Application Received — Trent Education Centre',
        fromName: 'Admission Team - Trent Education Centre',
        html: `
          <div style="max-width:680px;margin:auto;background:#fff;border:1px solid #ddd;border-radius:8px;overflow:hidden;font-family:Arial,sans-serif;">
            <img style="width:100%;height:auto;display:block;" src="${logo}" alt="Trent Education Centre" />
            <div style="padding:24px;">
              <h2 style="color:#4caf50;font-size:22px;text-align:center;margin:0 0 8px;">Application Received</h2>
              <p style="font-size:15px;color:#333;">Dear <strong>${firstName} ${lastName}</strong>,</p>
              <p style="font-size:15px;color:#555;line-height:1.6;">Thank you for submitting your English & IELTS application to Trent Education Centre. Your application has been successfully received and is now being reviewed.</p>
              <p style="font-size:15px;color:#555;line-height:1.6;">Below is a summary of the information you submitted:</p>
              ${ieltsTable}
              <p style="font-size:15px;color:#555;line-height:1.6;margin-top:20px;">If you have any questions, please contact us at <a href="mailto:internationaladmissions@trenteducation.co.uk" style="color:#4caf50;">internationaladmissions@trenteducation.co.uk</a></p>
              <p style="font-size:15px;color:#555;">Thank you,</p>
              <p style="font-size:15px;color:#333;"><strong>Trent Education Centre</strong></p>
            </div>
          </div>`,
      };
    }

    case 'New Starter Form':
      return {
        subject: 'New Starter Form Received',
        fromName: 'HR Team - Trent Education Centre',
        html: wrapper(`
          <h2 style="color:#1a4d2e;font-size:22px;text-align:center;">Your New Starter Form Has Been Received</h2>
          <p style="font-size:16px;color:#333;">Dear <strong>${name}</strong>,</p>
          <p style="font-size:15px;color:#555;line-height:1.6;">Thank you for completing your new starter form. Our HR team has received your submission and will be in touch shortly to complete your onboarding.</p>
          <p style="font-size:15px;color:#555;line-height:1.6;">If you have any questions, please contact us at <a href="mailto:hr@trenteducation.co.uk" style="color:#1a4d2e;">hr@trenteducation.co.uk</a></p>`),
      };

    case 'International Application': {
      const intlMap = FORM_REGISTRY['International Application']?.columnMap || {};
      const intlTable = buildSummaryTable(entry, intlMap, {
        skipKeys: ['referralName'],
        fileKeys: ['passportUrl', 'proofOfAddressUrl', 'qualificationUrl'],
      });
      return {
        subject: 'International Application Received — Trent Education Centre',
        fromName: 'Admission Team - Trent Education Centre',
        html: `
          <div style="max-width:680px;margin:auto;background:#fff;border:1px solid #ddd;border-radius:8px;overflow:hidden;font-family:Arial,sans-serif;">
            <img style="width:100%;height:auto;display:block;" src="${logo}" alt="Trent Education Centre" />
            <div style="padding:24px;">
              <h2 style="color:#4caf50;font-size:22px;text-align:center;margin:0 0 8px;">International Application Received</h2>
              <p style="font-size:15px;color:#333;">Dear <strong>${firstName} ${lastName}</strong>,</p>
              <p style="font-size:15px;color:#555;line-height:1.6;">Thank you for submitting your international application to Trent Education Centre. Your application has been successfully received and is now being reviewed by our admissions team.</p>
              <p style="font-size:15px;color:#555;line-height:1.6;">Below is a summary of the information you submitted:</p>
              ${intlTable}
              <p style="font-size:15px;color:#555;line-height:1.6;margin-top:20px;">If you have any questions, please contact us at <a href="mailto:internationaladmissions@trenteducation.co.uk" style="color:#4caf50;">internationaladmissions@trenteducation.co.uk</a></p>
              <p style="font-size:15px;color:#555;">Thank you,</p>
              <p style="font-size:15px;color:#333;"><strong>Trent Education Centre</strong></p>
            </div>
          </div>`,
      };
    }

    case 'Enrolment Form':
      return {
        subject: 'Enrolment Form Received — Trent Education Centre',
        fromName: 'Admissions Team - Trent Education Centre',
        html: `
          <div style="max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:8px;border:1px solid #ddd;font-family:Arial,sans-serif;">
            <img style="width:100%;height:auto;margin-bottom:20px;" src="${'https://vlebucket.s3.eu-west-2.amazonaws.com/Untitled+design+(12).jpg'}" alt="Trent Education Centre" />
            <h2 style="color:#1a3c6e;font-size:22px;text-align:center;">Thank You for Enrolling</h2>
            <p style="font-size:16px;color:#333;">Dear <strong>${name}</strong>,</p>
            <p style="font-size:15px;color:#555;line-height:1.6;">Thank you for submitting your enrolment form to Trent Education Centre. We have received your application and our admissions team will review your details and be in touch with you shortly.</p>
            <p style="font-size:15px;color:#555;line-height:1.6;">If you have any questions in the meantime, please contact us at <a href="mailto:digitaladmissions@trenteducation.co.uk" style="color:#1a3c6e;">digitaladmissions@trenteducation.co.uk</a></p>
            <p style="font-size:15px;color:#555;">Thank you,</p>
            <p style="font-size:15px;color:#333;"><strong>Trent Education Centre</strong></p>
          </div>`,
      };

    case 'Partnerships & Collaborations':
      return {
        subject: 'Partnership Enquiry Received',
        fromName: 'Partnerships Team - Trent Education Centre',
        html: wrapper(`
          <h2 style="color:#1565c0;font-size:22px;text-align:center;">Thank You for Your Partnership Enquiry</h2>
          <p style="font-size:16px;color:#333;">Dear <strong>${name}</strong>,</p>
          <p style="font-size:15px;color:#555;line-height:1.6;">Thank you for reaching out to Trent Education Centre regarding a potential partnership. We have received your enquiry and a member of our partnerships team will be in touch with you soon.</p>
          <p style="font-size:15px;color:#555;line-height:1.6;">If you have any immediate questions, please contact us at <a href="mailto:partnerships@trenteducation.co.uk" style="color:#1565c0;">partnerships@trenteducation.co.uk</a></p>`),
      };

    default:
      return {
        subject: 'Form Submission Received',
        fromName: 'Trent Education Centre',
        html: wrapper(`
          <h2 style="color:#4caf50;font-size:22px;text-align:center;">Thank You for Contacting Trent Education Centre</h2>
          <p style="font-size:16px;color:#333;">Dear <strong>${name}</strong>,</p>
          <p style="font-size:15px;color:#555;line-height:1.6;">We have received your submission and will get back to you as soon as possible.</p>
          <p style="font-size:15px;color:#555;line-height:1.6;">If you have any questions, please contact us at <a href="mailto:info@trenteducation.co.uk" style="color:#4caf50;">info@trenteducation.co.uk</a></p>`),
      };
  }
}

// ── Send confirmation email to the submitter (via FastAPI → SES) ─
export async function sendConfirmationEmail(entry) {
  if (!entry.email) {
    console.warn('No submitter email — skipping confirmation.');
    return false;
  }
  try {
    const { subject, fromName, html } = buildConfirmationHtml(entry);
    await apiSendEmail({
      to:       entry.email,
      subject,
      html,
      fromName,
      replyTo:  'hr@trenteducation.co.uk',
    });
    console.log('Confirmation email sent to', entry.email);
    return true;
  } catch (err) {
    console.error('Confirmation email failed:', err);
    return false;
  }
}

// ── Send email notification (via SES Lambda) ─────────────────
export async function sendEmailNotification(entry) {
  try {
    const formConfig  = FORM_REGISTRY[entry.formType];
    const notifyEmail = formConfig?.notifyEmail || NOTIFY_EMAILS.default;

    // Build reverse label map from columnMap (internal key → readable label)
    const labelMap = {};
    if (formConfig?.columnMap) {
      Object.entries(formConfig.columnMap).forEach(([k, label]) => { labelMap[k] = label; });
    }

    const toLabel = (k) => labelMap[k] || k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());

    const isUrl = (v) => typeof v === 'string' && (v.startsWith('http://') || v.startsWith('https://'));

    const formatValue = (v) => {
      if (v === null || v === undefined || v === '') return '<em style="color:#999;">—</em>';
      if (typeof v === 'boolean') return v ? 'Yes' : 'No';
      if (Array.isArray(v)) return v.join(', ') || '<em style="color:#999;">—</em>';
      if (isUrl(v)) return `<a href="${v}" style="color:#333399;">View File</a>`;
      return String(v);
    };

    const skip = new Set(['id', 'status', 'formType', 'wpEntryId']);

    // Order by columnMap definition; anything not in map goes at the end
    const mapKeys  = Object.keys(labelMap).filter(k => !skip.has(k));
    const extraKeys = Object.keys(entry).filter(k => !skip.has(k) && !mapKeys.includes(k));
    const allKeys  = [...mapKeys, ...extraKeys];

    const rows = allKeys
      .map(k => [k, entry[k]])
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v], i) => {
        const bg = i % 2 === 0 ? '#f7f7f7' : '#ffffff';
        return `<tr style="background:${bg};">
          <td style="padding:9px 14px;font-weight:600;color:#333;width:38%;border-bottom:1px solid #eee;">${toLabel(k)}</td>
          <td style="padding:9px 14px;color:#444;border-bottom:1px solid #eee;">${formatValue(v)}</td>
        </tr>`;
      })
      .join('');

    const logo = 'https://vlebucket.s3.eu-west-2.amazonaws.com/Untitled+design+(12).jpg';
    const html = `
      <div style="max-width:680px;margin:auto;font-family:Arial,sans-serif;background:#fff;border:1px solid #ddd;border-radius:8px;overflow:hidden;">
        <img src="${logo}" alt="Trent Education Centre" style="width:100%;height:auto;display:block;" />
        <div style="padding:24px;">
          <h2 style="color:#333399;margin:0 0 4px;">New ${entry.formType || 'Form'} Submission</h2>
          <p style="color:#777;font-size:13px;margin:0 0 20px;">Submitted: ${entry.submittedAt ? new Date(entry.submittedAt).toLocaleString('en-GB') : 'N/A'}</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${rows}
          </table>
          <p style="font-size:12px;color:#aaa;margin-top:20px;">This is an automated notification from the Trent Education Centre enrolment system.</p>
        </div>
      </div>`;

    await apiSendEmail({
      to:       notifyEmail,
      subject:  `New ${entry.formType || 'Form'} Submission`,
      html,
      fromName: 'Trent Enrol Admissions',
      replyTo:  entry.email || 'noreply@trenteducation.co.uk',
    });
    console.log('Notification sent to', notifyEmail);
    return true;
  } catch (err) {
    console.error('Email notification failed:', err);
    return false;
  }
}
