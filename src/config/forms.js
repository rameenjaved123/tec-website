// ════════════════════════════════════════════════════════════
//  TEC Forms — Central Configuration
//  All forms, credentials, and utilities in one place.
//  To add a new form: add an entry to FORM_REGISTRY below.
// ════════════════════════════════════════════════════════════

// ── AWS Config ───────────────────────────────────────────────
export const AWS_CONFIG = {
  apiUrl:          'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com',
  bucket:          'tec-form-uploads',
  region:          'us-east-1',
  // ── DynamoDB API ──────────────────────────────────────────────
  dynamoSaveUrl:   'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com/save-submission',
  dynamoGetUrl:    'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com/get-submissions',
  dynamoUpdateUrl: 'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com/update-submission',
  dynamoDeleteUrl: 'https://0yx963nwb7.execute-api.us-east-1.amazonaws.com/delete-submission',
};

// ── Admin password ────────────────────────────────────────────
// Change this before going live
export const ADMIN_PASSWORD = 'tec-admin-2024';

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

// ── AWS SES (via Lambda) ──────────────────────────────────────
export const SES_CONFIG = {
  endpoint: 'https://ouu9vyqahf.execute-api.us-east-1.amazonaws.com/tec-send-email',
  fromEmail: 'noreply@trenteducation.co.uk',
  fromName:  'Trent Education Centre',
};

// ── EmailJS (kept for fallback / non-SES forms) ───────────────
export const EMAILJS_CONFIG = {
  serviceId:              'service_s8x2vr8',
  templateId:             'template_m18dzgr',
  publicKey:              'LA-HTtbwGeLCXG5e8',
  confirmationServiceId:     'service_msx2pzc',
  confirmationTemplateId:    'template_cakcc3g',
  confirmationPublicKey:     'Disl7IjBDWIhIZIj-',
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
      status:               'Status',
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
      status:        'Status',
    },
  },
  'Application Form': {
    path: '/application-form',
    icon: '📝',
    color: '#6a1b9a',
    notifyEmail: NOTIFY_EMAILS['Application Form'],
    // ── EmailJS template IDs ──────────────────────────────────────────────────
    notificationTemplateId:  'template_3h149cl',  // admin → digitaladmissions@ (No Reply account)
    confirmationTemplateId:  'template_3auadfc',  // → applicant (HR account)
    notificationServiceId:   'service_msx2pzc',   // No Reply
    notificationPublicKey:   'Disl7IjBDWIhIZIj-',
    confirmationServiceId:   'service_s8x2vr8',   // HR
    confirmationPublicKey:   'LA-HTtbwGeLCXG5e8',
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
      status:               'Status',
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
      status:                 'Status',
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
      status:         'Status',
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
      status:                     'Status',
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
      status:                      'Status',
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
  const res = await fetch(`${AWS_CONFIG.apiUrl}/get-upload-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'get-view-url', fileKey }),
  });
  if (!res.ok) throw new Error('Failed to get view URL');
  const { viewUrl } = await res.json();
  return viewUrl;
}

// ── Upload file to S3 ────────────────────────────────────────
export async function uploadToS3(file, folder = 'uploads') {
  const res = await fetch(`${AWS_CONFIG.apiUrl}/get-upload-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
      folder,
    }),
  });
  if (!res.ok) throw new Error('Failed to get S3 upload URL. Check your Lambda function is deployed.');
  const { uploadUrl, fileKey } = await res.json();

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!uploadRes.ok) throw new Error('File upload to S3 failed. Check bucket CORS settings.');

  const fileUrl = `https://${AWS_CONFIG.bucket}.s3.${AWS_CONFIG.region}.amazonaws.com/${fileKey}`;
  return { fileKey, fileUrl };
}

// ════════════════════════════════════════════════════════════
//  DATA LAYER  — DynamoDB (primary) + localStorage (fallback/cache)
//
//  How it works:
//    • On submit  → save to localStorage immediately (fast, offline-safe)
//                 → also POST to DynamoDB asynchronously
//    • On load    → fetch from DynamoDB if configured; otherwise localStorage
//    • On delete  → remove from localStorage + DynamoDB
//    • On status  → update in localStorage + DynamoDB
// ════════════════════════════════════════════════════════════

const STORAGE_KEY = 'tec_form_submissions_v2';

// ── Entry builder (no localStorage) ─────────────────────────
export function saveSubmission(formType, data) {
  // Builds the entry object only — DynamoDB is the store (saveSubmissionToDB)
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    formType,
    submittedAt: new Date().toISOString(),
    status: 'new',
    ...data,
  };
}

// Kept for seedData migration compatibility — reads legacy localStorage if present
export function getAllSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function deleteSubmission() {}          // no-op, DB handles it
export function updateSubmissionStatus() {}    // no-op, DB handles it
export function getSubmissionById() {}         // no-op

// ── DynamoDB helpers ─────────────────────────────────────────

/** POST one entry to DynamoDB. Called fire-and-forget on submit. */
export async function saveSubmissionToDB(entry) {
  if (!AWS_CONFIG.dynamoSaveUrl) return false;
  try {
    const res = await fetch(AWS_CONFIG.dynamoSaveUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  } catch (err) {
    console.error('DynamoDB save failed:', err);
    return false;
  }
}

/**
 * Fetch ALL entries from DynamoDB using server-side pagination.
 * Makes multiple small requests (500 records each) instead of one
 * giant request — avoids Lambda/API Gateway timeout regardless of
 * how many records exist.
 * Returns sorted array on success, null on error.
 */
export async function getAllSubmissionsFromDB(onProgress) {
  if (!AWS_CONFIG.dynamoGetUrl) return null;
  try {
    const PAGE = 500;
    let allItems = [];
    let nextKey  = null;

    do {
      const url = new URL(AWS_CONFIG.dynamoGetUrl);
      url.searchParams.set('limit', PAGE);
      if (nextKey) url.searchParams.set('startKey', nextKey);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();

      allItems = allItems.concat(body.items || []);
      nextKey  = body.nextKey || null;

      // Optional progress callback so the UI can update as pages arrive
      if (onProgress) onProgress(allItems);
    } while (nextKey);

    // Sort newest first (client-side, across all pages)
    allItems.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    return allItems;
  } catch (err) {
    console.error('DynamoDB fetch failed:', err);
    return null;
  }
}

/** Update full entry in DynamoDB (no emails sent) */
export async function updateSubmissionInDB(entry) {
  if (!AWS_CONFIG.dynamoUpdateUrl) return false;
  try {
    const res = await fetch(AWS_CONFIG.dynamoUpdateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    return res.ok;
  } catch (err) {
    console.error('DynamoDB full update failed:', err);
    return false;
  }
}

/** Update status in DynamoDB */
export async function updateSubmissionStatusInDB(id, status) {
  if (!AWS_CONFIG.dynamoUpdateUrl) return false;
  try {
    const res = await fetch(AWS_CONFIG.dynamoUpdateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    return res.ok;
  } catch (err) {
    console.error('DynamoDB update failed:', err);
    return false;
  }
}

/** Delete from DynamoDB */
export async function deleteSubmissionFromDB(id) {
  if (!AWS_CONFIG.dynamoDeleteUrl) return false;
  try {
    const res = await fetch(AWS_CONFIG.dynamoDeleteUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    return res.ok;
  } catch (err) {
    console.error('DynamoDB delete failed:', err);
    return false;
  }
}

/** Push all localStorage entries to DynamoDB (one-time migration). */
export async function migrateLocalStorageToDB(onProgress) {
  if (!AWS_CONFIG.dynamoSaveUrl) return { success: 0, failed: 0, error: 'No endpoint configured' };
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

// ── Send confirmation email to the submitter (via SES Lambda) ─
export async function sendConfirmationEmail(entry) {
  if (!entry.email) {
    console.warn('No submitter email — skipping confirmation.');
    return false;
  }
  try {
    const { subject, fromName, html } = buildConfirmationHtml(entry);
    const res = await fetch(SES_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to:       entry.email,
        from:     SES_CONFIG.fromEmail,
        fromName,
        replyTo:  'hr@trenteducation.co.uk',
        subject,
        html,
      }),
    });
    console.log('Confirmation email sent to', entry.email);
    return res.ok;
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

    const skip = new Set(['id', 'status', 'formType']);

    const rows = Object.entries(entry)
      .filter(([k]) => !skip.has(k))
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

    const res = await fetch(SES_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to:       notifyEmail,
        from:     SES_CONFIG.fromEmail,
        fromName: 'Trent Enrol Admissions',
        replyTo:  entry.email || SES_CONFIG.fromEmail,
        subject:  `New ${entry.formType || 'Form'} Submission`,
        html,
      }),
    });
    console.log('Notification sent to', notifyEmail);
    return res.ok;
  } catch (err) {
    console.error('Email notification failed:', err);
    return false;
  }
}
