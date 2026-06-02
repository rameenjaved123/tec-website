# Trent Education Centre (TEC) Website — Full Technical Documentation

**Version:** 1.0  
**Last Updated:** June 2026  
**GitHub Repo:** `rameenjaved123/tec-website`  
**Live Site:** `https://trenteducation.co.uk`  
**Dev/Staging:** `https://dev.trenteducation.co.uk`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Code Structure](#3-code-structure)
4. [AWS Infrastructure](#4-aws-infrastructure)
5. [CI/CD Pipeline](#5-cicd-pipeline)
6. [Domain & DNS Setup — Route 53 & cPanel](#6-domain--dns-setup)
7. [Authentication — AWS Cognito](#7-authentication--aws-cognito)
8. [Backend — API Gateway & Lambda](#8-backend--api-gateway--lambda)
9. [Database — DynamoDB](#9-database--dynamodb)
10. [Email — AWS SES](#10-email--aws-ses)
11. [File Storage — AWS S3](#11-file-storage--aws-s3)
12. [Analytics — CloudWatch RUM](#12-analytics--cloudwatch-rum)
13. [Admin Dashboard](#13-admin-dashboard)
14. [Forms System](#14-forms-system)
15. [Frontend Architecture](#15-frontend-architecture)
16. [GDPR & Privacy Compliance](#16-gdpr--privacy-compliance)
17. [What Has Been Achieved](#17-what-has-been-achieved)
18. [Known Issues & Limitations](#18-known-issues--limitations)
19. [Future Roadmap](#19-future-roadmap)
20. [Runbook — How to Replicate This Project](#20-runbook--how-to-replicate-this-project)

---

## 1. Project Overview

Trent Education Centre (TEC) is a UK further and higher education college based in Nottingham. This project is the college's primary public-facing website and internal admin system.

### What the Website Does

- Presents TEC's course catalogue across English language, further education, and higher education
- Allows prospective students to apply, enquire, and enrol online
- Handles HR forms (job applications, new staff onboarding)
- Manages partnership/collaboration enquiries
- Provides an international student application pipeline
- Includes a fully custom **admin dashboard** for staff to manage all form submissions
- Tracks real-user behaviour via AWS CloudWatch RUM (analytics)

### Environments

| Environment | URL | Branch | Purpose |
|---|---|---|---|
| **Development** | `https://dev.trenteducation.co.uk` | `main` | Current live staging / testing |
| **Production** | `https://trenteducation.co.uk` | `main` (when promoted) | Public-facing live site |

> **Note:** At the time of writing, `dev.trenteducation.co.uk` is the working live site. `trenteducation.co.uk` is the intended production domain to switch to at go-live.

---

## 2. Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3.1 | UI framework |
| **Vite** | 5.4.8 | Build tool & dev server |
| **React Router DOM** | 6.26.2 | Client-side routing (SPA) |
| **Lucide React** | 0.383.0 | Icon library |
| **jsPDF** | 4.2.1 | PDF generation in admin panel |
| **xlsx** | 0.18.5 | Excel export in admin panel |
| **aws-rum-web** | 3.1.0 | CloudWatch RUM analytics |
| **amazon-cognito-identity-js** | 6.3.16 | Cognito auth (no Amplify lib) |

### Backend (AWS Serverless)

| Service | Purpose |
|---|---|
| **AWS Amplify** | Hosting + CI/CD |
| **AWS Route 53** | DNS hosting, domain delegation, SSL validation |
| **AWS Cognito** | Admin user authentication & RBAC |
| **AWS API Gateway** | REST API endpoints for all form operations |
| **AWS Lambda** | Serverless functions (Node.js ESM) |
| **AWS DynamoDB** | NoSQL database for all form submissions |
| **AWS SES** | Transactional emails (form notifications, confirmations) |
| **AWS S3** | File storage (CVs, ID documents, P45s) |
| **AWS CloudWatch RUM** | Real-user analytics and error monitoring |

### Dev Tooling

| Tool | Purpose |
|---|---|
| **Playwright** | End-to-end tests |
| **GitHub** | Version control + CI/CD trigger |
| **cPanel** | Domain management / DNS |

---

## 3. Code Structure

```
tec-website/
├── public/
│   └── assets/
│       ├── logos/             # TEC logos (transparent, crest, etc.)
│       ├── images/            # Page images (hero, general, team)
│       └── documents/         # PDFs (policies, terms, accreditations)
│
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Router + route definitions
│   ├── index.css              # Global styles + CSS variables
│   │
│   ├── components/            # Shared UI components
│   │   ├── Navbar.jsx         # Top navigation (desktop + mobile)
│   │   ├── Navbar.css
│   │   ├── Footer.jsx         # Site footer
│   │   ├── Footer.css
│   │   ├── PageHero.jsx       # Hero banner used on all inner pages
│   │   ├── PageHero.css
│   │   ├── CookieConsent.jsx  # GDPR cookie banner
│   │   ├── CookieConsent.css
│   │   └── ErrorBoundary.jsx  # React error boundary
│   │
│   ├── pages/                 # Pages organised by domain into subdirectories
│   │   ├── InnerPage.css           # Shared inner-page base styles
│   │   ├── CoursePage.css          # Shared course-page styles
│   │   ├── GenericPage.jsx         # Generic 404 / fallback
│   │   │
│   │   ├── home/
│   │   │   └── HomePage.jsx / .css
│   │   │
│   │   ├── about/
│   │   │   ├── AboutPage.jsx
│   │   │   ├── MissionValuesPage.jsx / .css
│   │   │   ├── StudyCentresPage.jsx / .css
│   │   │   ├── CarbonReductionPage.jsx
│   │   │   ├── StudentLifePage.jsx / .css
│   │   │   ├── StrategicPlanPage.jsx / .css
│   │   │   ├── NewsEventsPage.jsx
│   │   │   └── CareersPage.jsx
│   │   │
│   │   ├── approvals/
│   │   │   ├── ApprovalsPage.jsx / .css
│   │   │   ├── AwardingOrganisationsPage.jsx
│   │   │   ├── AccreditationsPage.jsx
│   │   │   ├── ApprovedSupplierStatusPage.jsx
│   │   │   └── MembershipsPage.jsx / .css
│   │   │
│   │   ├── courses/
│   │   │   ├── english/
│   │   │   │   ├── EnglishCoursesPage.jsx / .css
│   │   │   │   └── EnglishPoliciesPage.jsx / .css
│   │   │   ├── higher-education/
│   │   │   │   ├── HigherEducationPage.jsx
│   │   │   │   ├── ATHELevel4Page.jsx / .css
│   │   │   │   ├── ATHELevel5Page.jsx
│   │   │   │   └── BTECHNDPage.jsx / .css
│   │   │   └── further-education/
│   │   │       ├── FurtherEducationPage.jsx
│   │   │       ├── ATHELevel3Page.jsx
│   │   │       ├── NCFEMathsL1Page.jsx
│   │   │       ├── NCFEMathsL2Page.jsx
│   │   │       ├── SIADoorSupervisorsPage.jsx
│   │   │       └── DigitalSkillsPage.jsx
│   │   │
│   │   ├── admissions/
│   │   │   ├── AdmissionPage.jsx / .css
│   │   │   └── ApplyPage.jsx / .css
│   │   │
│   │   ├── forms/
│   │   │   ├── EnquiryFormPage.jsx
│   │   │   ├── EnrolmentFormPage.jsx
│   │   │   ├── JobApplicationFormPage.jsx
│   │   │   ├── InternationalApplicationFormPage.jsx
│   │   │   ├── EnglishIELTSFormPage.jsx
│   │   │   ├── PartnershipsFormPage.jsx
│   │   │   └── NewStarterFormPage.jsx / .css
│   │   │
│   │   ├── jobs/
│   │   │   ├── LecturerPage.jsx
│   │   │   ├── TeachingAssistantPage.jsx
│   │   │   ├── StudentSupportOfficerPage.jsx
│   │   │   ├── OfficeAdminManagerPage.jsx
│   │   │   ├── OfficeAdminITAssistantPage.jsx
│   │   │   ├── HumanResourceOfficerPage.jsx
│   │   │   ├── FinancialAccountManagerPage.jsx
│   │   │   ├── MarketingExecutivePage.jsx
│   │   │   ├── DigitalMarketingExecutivePage.jsx
│   │   │   ├── EducationOfficerPage.jsx
│   │   │   └── AcademicManagerPage.jsx
│   │   │
│   │   ├── policies/
│   │   │   ├── PoliciesPage.jsx
│   │   │   ├── PrivacyPolicyPage.jsx / .css
│   │   │   └── ComplaintPage.jsx
│   │   │
│   │   ├── contact/
│   │   │   └── ContactPage.jsx
│   │   │
│   │   └── admin/
│   │       ├── AdminPage.jsx       # Full admin dashboard
│   │       └── AdminPage.css
│   │
│   ├── config/
│   │   └── forms.js               # Central config: API URLs, form registry,
│   │                              # SES config, notify emails
│   │
│   └── utils/
│       ├── cognitoAuth.js         # Cognito sign-in, sign-up, sessions
│       ├── rum.js                 # CloudWatch RUM initialisation
│       └── errorReporter.js       # JS error reporting to CloudWatch
│
├── lambda/                        # Lambda function source code
│   ├── tec-submissions-api/       # Main CRUD API (DynamoDB)
│   │   └── index.mjs
│   ├── tec-send-email/            # SES email notifications
│   │   └── index.mjs
│   ├── tec-presigned-url-generator/  # S3 presigned URL generator
│   │   └── index.mjs
│   └── tec-website-error-reporter/   # Error reporting handler
│       └── index.mjs
│
├── scripts/                       # Utility/migration scripts
├── tests/                         # Playwright e2e tests
├── vite.config.js
├── package.json
└── index.html
```

### CSS Architecture

CSS is **not** CSS Modules. Each page has its own `.css` file imported directly in the JSX. Global variables are defined in `src/index.css`:

```css
:root {
  --tec-green:       #2d6a4f;
  --tec-green-dark:  #1a3a2a;
  --tec-green-mid:   #2d5a3d;
  --tec-gold:        #c9a84c;
  --tec-text-light:  #555;
}
```

Shared inner-page base styles (hero height, page-enter animation, container width) live in `InnerPage.css` and are imported alongside page-specific CSS.

---

## 4. AWS Infrastructure

### Overview Diagram

```
trenteducation.co.uk (domain via cPanel)
        │
        │ NS delegation
        ▼
AWS Route 53 (DNS)
        │
        ▼
User Browser
    │
    ├── Static Assets ────────────── AWS Amplify (CDN + Hosting)
    │                                      │
    │                                  CloudFront
    │
    ├── Form Submissions ─────────── API Gateway (REST)
    │                                      │
    │                          ┌───────────┴────────────┐
    │                          │                        │
    │                     Lambda (CRUD)           Lambda (Email)
    │                          │                        │
    │                       DynamoDB                  AWS SES
    │
    ├── File Uploads ──────────────── S3 (presigned URLs)
    │                                      │
    │                             Lambda (presigned URL generator)
    │
    ├── Admin Auth ────────────────── AWS Cognito (User Pool)
    │
    └── Analytics ────────────────── CloudWatch RUM
```

### AWS Region

| Resource | Region | Notes |
|---|---|---|
| Amplify | `us-east-1` | **Migrate to `eu-west-2` at go-live** (GDPR) |
| Route 53 | Global | DNS is global — no region applies |
| API Gateway | `us-east-1` | **Migrate to `eu-west-2` at go-live** |
| Lambda | `us-east-1` | **Migrate to `eu-west-2` at go-live** |
| DynamoDB | `us-east-1` | **Migrate to `eu-west-2` at go-live** |
| SES | `us-east-1` | **Migrate to `eu-west-2` at go-live** |
| S3 | `us-east-1` | **Migrate to `eu-west-2` at go-live** |
| CloudWatch RUM | `us-east-1` | Can stay US or move to EU |
| Cognito | `eu-west-2` | ✅ Already in EU |

> **⚠️ GDPR Action Required:** All AWS resources handling personal data should be in `eu-west-2` (London) before collecting real student data at scale. This is especially important for DynamoDB (stores all form submissions), SES (handles personal data in email), and S3 (stores identity documents).

---

## 5. CI/CD Pipeline

### How It Works

```
Developer writes code locally
        │
        ▼
git push origin main
        │
        ▼
GitHub (rameenjaved123/tec-website)
        │
        ▼  [webhook trigger]
AWS Amplify picks up new commit
        │
        ▼
npm install → npm run build (Vite)
        │
        ▼
/dist folder deployed to CloudFront CDN
        │
        ▼
Live at dev.trenteducation.co.uk (within ~2–4 minutes)
```

### Amplify Build Settings

In the Amplify Console, the build spec is:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### SPA Redirect Rule

Because this is a React SPA (single-page app), all routes must redirect to `index.html`. In Amplify Console → Rewrites and Redirects:

```
Source:   </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>
Target:   /index.html
Type:     200 (Rewrite)
```

This ensures `/about`, `/admission`, `/admin` etc. all serve `index.html` and React Router handles the routing.

### Lambda Deployment

Lambda functions are **not** automatically deployed via CI/CD. They must be manually deployed:

1. Navigate to `lambda/<function-name>/`
2. Zip the contents: `zip -r function.zip .`
3. Upload to AWS Lambda Console → Code → Upload from .zip

> **TODO for future:** Set up GitHub Actions to auto-deploy Lambda functions on changes.

---

## 6. Domain & DNS Setup

### Domain Provider

The domain `trenteducation.co.uk` is registered and managed via **cPanel** (the college's existing hosting provider). DNS is managed in two places depending on the record type:

- **cPanel DNS** — Legacy DNS zone for email (MX) and any records not yet migrated
- **AWS Route 53** — Used for domain delegation and routing traffic to AWS services (Amplify, SES)

### AWS Route 53

**Route 53** is AWS's managed DNS service. It was used in this project to:

1. **Delegate DNS from cPanel to AWS** — The domain's nameservers were pointed from cPanel to Route 53 NS records, giving AWS full control of the DNS zone
2. **Route traffic to Amplify** — CNAME/A records in Route 53 pointing to the Amplify CloudFront distribution
3. **SES domain verification records** — TXT and DKIM CNAME records added directly in Route 53 rather than cPanel once delegation was complete
4. **ACM certificate validation** — Route 53 automatically validates ACM SSL certificates via DNS (CNAME records auto-created by Amplify)

#### How to Set Up Route 53 for This Project

1. **Create a Hosted Zone** in Route 53:
   - AWS Console → Route 53 → Hosted zones → Create hosted zone
   - Enter domain: `trenteducation.co.uk`
   - Type: Public
   - Route 53 assigns 4 nameservers (NS records)

2. **Update nameservers in cPanel**:
   - Log in to cPanel → Domains → Nameservers
   - Replace the existing nameservers with the 4 Route 53 NS values
   - DNS propagation takes up to 48 hours

3. **Add DNS records in Route 53** (not cPanel, once delegated):

| Record Type | Name | Value | Purpose |
|---|---|---|---|
| `CNAME` | `dev.trenteducation.co.uk` | `[Amplify].amplifyapp.com` | Dev subdomain → Amplify |
| `CNAME` | `www.trenteducation.co.uk` | `[Amplify].amplifyapp.com` | WWW → Amplify |
| `A` (Alias) | `trenteducation.co.uk` | Amplify distribution | Apex domain → Amplify |
| `TXT` | `trenteducation.co.uk` | `_amazonses=...` | SES domain ownership proof |
| `CNAME` | `_dkim1._domainkey...` | SES DKIM value 1 | Email DKIM signing |
| `CNAME` | `_dkim2._domainkey...` | SES DKIM value 2 | Email DKIM signing |
| `CNAME` | `_dkim3._domainkey...` | SES DKIM value 3 | Email DKIM signing |
| `MX` | `trenteducation.co.uk` | Mail server | Email routing |
| `TXT` | `trenteducation.co.uk` | `v=spf1 include:amazonses.com ~all` | SPF record (SES sending) |

> **Why Route 53 over cPanel DNS?**  
> Route 53 integrates natively with Amplify and ACM. Amplify can automatically insert certificate validation CNAMEs into Route 53, which it cannot do with third-party DNS providers. Route 53 also offers alias records for apex domains (e.g. `trenteducation.co.uk` without `www`), which standard CNAME records don't support at the root level.

### Custom Domain in Amplify

1. AWS Amplify Console → App → Domain management
2. Add domain: `trenteducation.co.uk`
3. If Route 53 hosts the zone: Amplify auto-creates validation records ✅
4. If using cPanel DNS: manually add the CNAME records Amplify provides
5. Amplify issues an ACM SSL certificate automatically (HTTPS)
6. Both `trenteducation.co.uk` and `www.trenteducation.co.uk` are configured as aliases

### SES Domain Verification

To send emails from `noreply@trenteducation.co.uk` via SES:

1. AWS SES → Verified identities → Verify domain
2. SES provides DNS records to add — add these in **Route 53** (or cPanel if not yet delegated):
   - 1× TXT record (`_amazonses=...`)
   - 3× CNAME records (DKIM keys)
   - 1× TXT SPF record (`v=spf1 include:amazonses.com ~all`)
3. Request SES production access (moves out of sandbox — required before sending to unverified emails)
4. Production access approval takes ~24 hours (AWS review)

### DNS Architecture Summary

```
trenteducation.co.uk (domain registered via cPanel)
        │
        │ nameservers delegated to Route 53
        ▼
AWS Route 53 (Hosted Zone)
        │
        ├── dev.trenteducation.co.uk  ──► AWS Amplify (CloudFront)
        ├── www.trenteducation.co.uk  ──► AWS Amplify (CloudFront)
        ├── trenteducation.co.uk      ──► AWS Amplify (Alias record)
        ├── _amazonses TXT            ──► SES domain verification
        ├── DKIM CNAMEs (×3)          ──► SES email signing
        ├── SPF TXT                   ──► SES sending authorisation
        └── MX records                ──► College email server
```

---

## 7. Authentication — AWS Cognito

### User Pool Configuration

| Setting | Value |
|---|---|
| **User Pool ID** | `eu-west-2_sbCIAMB5c` |
| **App Client ID** | `7ksedbont2d0annicgrp3jeua5` |
| **Region** | `eu-west-2` (London) ✅ |
| **Sign-in method** | Email + password |
| **MFA** | Not configured (optional to add) |

### Groups & RBAC

Access to the admin dashboard is role-based. Each Cognito group maps to specific forms:

| Cognito Group | Forms Visible |
|---|---|
| `admin` | All forms (unrestricted) |
| `new-starter-form` | New Starter Form only |
| `partnerships` | Partnerships & Collaborations only |
| `application-form` | Application Form only |
| `job-application` | Job Application only |
| `english-ielts` | English & IELTS Application only |
| `enquiry-form` | Enquiry Form only |
| `enrolment-form` | Enrolment Form only |
| `international-application` | International Application only |
| `complaint` | Complaint form only |

> Users with **no group** land on a "Pending Approval" screen after signing up. An admin must assign them to a group in the Cognito console.

### Auth Flow

```
User enters email + password
        │
        ▼
cognitoAuth.js → signIn()
        │
        ▼
Cognito User Pool authenticates
        │
   ┌────┴────┐
   │         │
New-password  Success
challenge     │
   │         ▼
   │   JWT token returned (IdToken, AccessToken, RefreshToken)
   │         │
   ▼         ▼
Set new     Groups extracted from IdToken payload
password    ("cognito:groups" claim)
            │
            ▼
        Admin dashboard loads with correct RBAC
```

### Token Usage

- **IdToken** is sent as `Authorization: Bearer <token>` header on every API request to API Gateway
- API Gateway validates the token against Cognito automatically (JWT Authorizer)
- Lambda reads `event.requestContext.authorizer.jwt.claims['cognito:groups']` to enforce RBAC server-side

### Session Persistence

`amazon-cognito-identity-js` stores tokens in `localStorage`. On page load, `getCurrentSession()` is called to restore the session. Tokens refresh automatically when expired.

---

## 8. Backend — API Gateway & Lambda

### API Gateway

**Base URL:** `https://0yx963nwb7.execute-api.us-east-1.amazonaws.com`

All routes are protected by a **Cognito JWT Authorizer** (except OPTIONS for CORS preflight).

| Method | Path | Lambda | Description |
|---|---|---|---|
| `POST` | `/save-submission` | `tec-submissions-api` | Save a new form submission to DynamoDB |
| `GET` | `/get-submissions` | `tec-submissions-api` | Fetch paginated submissions (RBAC filtered) |
| `POST` | `/update-submission` | `tec-submissions-api` | Update a submission (edit fields or status) |
| `DELETE` | `/delete-submission` | `tec-submissions-api` | Delete a submission by ID |

**Email API Base URL:** `https://ouu9vyqahf.execute-api.us-east-1.amazonaws.com`

| Method | Path | Lambda | Description |
|---|---|---|---|
| `POST` | `/tec-send-email` | `tec-send-email` | Send SES email notification |

### Lambda Functions

#### `tec-submissions-api` (Main CRUD)

- Runtime: Node.js 20.x, ESM (`index.mjs`)
- Uses `@aws-sdk/client-dynamodb` and `@aws-sdk/lib-dynamodb`
- Handles all four CRUD operations in a single function (routes by `event.rawPath`)
- Enforces RBAC: extracts groups from Cognito JWT and filters DynamoDB results
- Paginated fetch: scans DynamoDB page-by-page and streams results back

```javascript
// Simplified routing logic
if (path.includes('save-submission'))   return handleSave(event);
if (path.includes('get-submissions'))   return handleGet(event);
if (path.includes('update-submission')) return handleUpdate(event);
if (path.includes('delete-submission')) return handleDelete(event);
```

#### `tec-send-email`

- Runtime: Node.js 20.x, ESM
- Uses `@aws-sdk/client-ses`
- Sends HTML email to the relevant department when a form is submitted
- Sends a confirmation email to the applicant
- Looks up recipient from `NOTIFY_EMAILS` map based on `formType`

#### `tec-presigned-url-generator`

- Generates short-lived S3 presigned URLs for viewing uploaded files
- Admin panel calls this when staff click "View File" on an entry
- URLs expire after 15 minutes (security — files never directly publicly accessible)

#### `tec-website-error-reporter`

- Receives JavaScript error reports from the frontend (`errorReporter.js`)
- Logs errors to CloudWatch Logs for debugging

### CORS Configuration

All Lambda responses include:

```javascript
const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
};
```

> **Security note:** `Allow-Origin: *` is acceptable for an authenticated API (tokens required), but can be tightened to `https://trenteducation.co.uk` at go-live.

---

## 9. Database — DynamoDB

### Table

| Setting | Value |
|---|---|
| **Table name** | `tec-form-submissions` |
| **Region** | `us-east-1` (migrate to `eu-west-2`) |
| **Primary key** | `id` (String) — UUID v4 |
| **Billing mode** | On-demand (pay per request) |
| **Indexes** | None (full table scan with filter) |

### Item Schema

All form types share the same table. A typical item looks like:

```json
{
  "id":           "uuid-v4",
  "formType":     "Application Form",
  "submittedAt":  "2024-03-15T10:30:00.000Z",
  "status":       "new",
  "firstName":    "Jane",
  "lastName":     "Smith",
  "email":        "jane@example.com",
  "mobile":       "07700000000",
  "course":       "ATHE Level 4 Extended Diploma in Business",
  ...all other form fields...
}
```

### Pagination

The admin dashboard fetches in pages of 50 items using DynamoDB's `LastEvaluatedKey`. The Lambda streams each page back to the frontend as it arrives, so the UI shows results progressively without waiting for all 800+ records to load.

### Caching

The admin dashboard caches DynamoDB results in `sessionStorage` with a 5-minute TTL. On load:
1. If cache is fresh → show immediately, silently refresh in background
2. If cache is stale or missing → show spinner, fetch, write cache

---

## 10. Email — AWS SES

### Configuration

| Setting | Value |
|---|---|
| **From address** | `noreply@trenteducation.co.uk` |
| **From name** | `Trent Education Centre` |
| **Region** | `us-east-1` |
| **Mode** | Production (out of sandbox) |

### Email Flow

When a form is submitted:

1. Frontend calls `POST /tec-send-email` with form data
2. Lambda (`tec-send-email`) looks up recipient from `NOTIFY_EMAILS` map
3. Sends **staff notification email** (HTML) to the relevant department
4. Sends **applicant confirmation email** to the person who submitted the form

### Notification Email Recipients

| Form | Recipient |
|---|---|
| Application Form | `digitaladmissions@trenteducation.co.uk` |
| Enrolment Form | `digitaladmissions@trenteducation.co.uk` |
| Enquiry Form | `digitaladmissions@trenteducation.co.uk` |
| Job Application | `hr@trenteducation.co.uk` |
| New Starter Form | `hr@trenteducation.co.uk` |
| English & IELTS Application | `internationaladmissions@trenteducation.co.uk` |
| International Application | `internationaladmissions@trenteducation.co.uk` |
| Partnerships & Collaborations | `partnerships@trenteducation.co.uk` |
| Contact / Default | `info@trenteducation.co.uk` |


---

## 11. File Storage — AWS S3

### Bucket

| Setting | Value |
|---|---|
| **Bucket name** | `tec-form-uploads` |
| **Region** | `us-east-1` |
| **Public access** | Blocked (private) |
| **Access method** | Presigned URLs only |

### File Types Stored

| Field | Forms Using It |
|---|---|
| CV (`cvFileUrl`) | Job Application |
| Proof of ID (`proofOfIdUrl`) | New Starter Form |
| P45 (`p45Url`) | New Starter Form |

### Upload Flow

1. Frontend requests a presigned PUT URL from `tec-presigned-url-generator` Lambda
2. Browser uploads file directly to S3 using the presigned URL (no file touches the Lambda)
3. S3 URL stored in DynamoDB as the field value

### View Flow

1. Admin clicks "📎 View File" in dashboard
2. Frontend calls `tec-presigned-url-generator` with the S3 key
3. Lambda returns a presigned GET URL (15-minute expiry)
4. Browser opens the file in a new tab

---

## 12. Analytics — CloudWatch RUM

### Configuration

| Setting | Value |
|---|---|
| **Monitor name** | `tec-website` |
| **Application ID** | `2188d62a-dc82-4a16-90a5-e9af6d50c7a6` |
| **Region** | `us-east-1` |
| **Identity Pool** | `us-east-1:2752baff-2a47-408c-bf26-4d303532a5c5` |
| **Sample rate** | 100% (`sessionSampleRate: 1`) |
| **Telemetry** | `performance`, `errors`, `http` |

### GDPR Integration

RUM is **only initialised after the user accepts cookies**. The `CookieConsent` component calls `initRUM()` on accept. If the user declines, RUM is never loaded.

```javascript
// CookieConsent.jsx
if (accepted) {
  initRUM();  // only fires after consent
}
```

### What It Tracks

- Page views and navigation
- Web Vitals (LCP, FID, CLS)
- JavaScript errors
- HTTP request performance
- Device type, browser, country

---

## 13. Admin Dashboard

The admin dashboard is accessible at `/admin`. It is a fully custom-built React application within the same SPA.

### Features

| Feature | Description |
|---|---|
| **Auth** | Cognito login (email + password), sign up, email verification, first-login password reset |
| **RBAC** | Users only see forms they are assigned to via Cognito groups |
| **All Submissions view** | Paginated table of all entries with avatars, status badges, dates |
| **Filter by form type** | Sidebar nav filters the table by form |
| **Search** | Real-time search across all fields |
| **Status management** | Mark entries as New / Reviewed / Actioned |
| **Entry detail modal** | Full field-by-field view of any submission |
| **Edit entries** | Edit any field directly in the modal |
| **Delete entries** | With confirmation dialog |
| **PDF export** | Generate a formatted A4 PDF for any entry (jsPDF) |
| **Excel export** | Export filtered view to .xlsx, one sheet per form type |
| **Google Sheets sync** | Push entry to connected Google Sheet (Apps Script) |
| **File viewing** | View uploaded files (CV, ID, P45) via S3 presigned URLs |
| **Email forwarding** | Forward any entry to a custom email address |
| **Session cache** | 5-min sessionStorage cache for instant load |
| **Mobile sidebar** | Collapsible drawer sidebar on mobile |
| **Refresh** | Manual re-fetch from DynamoDB, clears cache |

### Status Workflow

```
New (green) → Reviewed (blue) → Actioned (purple)
```

Staff change status by clicking the buttons in the entry modal. Status is persisted to DynamoDB.

### PDF Generation

Uses `jsPDF` to draw a professional A4 form:
- TEC logo header
- Form type + submission date
- All fields in labelled boxes (auto-wraps long text)
- Multi-page support
- Page number + Entry ID footer

Handles all form types with different field layouts.

---

## 14. Forms System

### Central Configuration (`src/config/forms.js`)

All form configuration lives in one file:

- `AWS_CONFIG` — API endpoint URLs
- `SES_CONFIG` — Email sending config
- `NOTIFY_EMAILS` — Which email gets notified per form type
- `FORM_REGISTRY` — Master list of all forms with paths, icons, Sheets URLs, field mappings

### Forms Built

| Form | URL | Stores Files |
|---|---|---|
| Application Form | `/apply` | No |
| Enrolment Form | `/enrolment-form` | No |
| Enquiry Form | `/enquiry-form` | No |
| Job Application | `/job-application-form` | Yes (CV) |
| New Starter Form | `/new-starter-form` | Yes (ID, P45) |
| English & IELTS Application | `/english-ielts-form` | No |
| International Application | `/international-application-form` | No |
| Partnerships & Collaborations | `/partnerships-form` | No |
| Complaint | `/complaint` | No |

### Form Submission Flow

```
User fills form → Submit
        │
        ▼
Frontend validates fields
        │
        ▼
If file upload: request presigned URL → upload to S3
        │
        ▼
POST to /save-submission (API Gateway)
  → Bearer token from Cognito NOT required for public forms
  → Lambda saves to DynamoDB
  → Returns { success: true, id: "uuid" }
        │
        ▼
POST to /tec-send-email (API Gateway)
  → Staff notification email via SES
  → Applicant confirmation email via SES
        │
        ▼
Success message shown to user
```

### Google Sheets Integration

Some forms (New Starter, Partnerships) also push data to Google Sheets via an Apps Script web app URL. This allows staff to view submissions in a spreadsheet alongside the admin dashboard.

---

## 15. Frontend Architecture

### Routing

All routes defined in `src/App.jsx` using React Router v6:

```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/admission" element={<AdmissionPage />} />
  <Route path="/apply" element={<ApplyPage />} />
  <Route path="/admin" element={<AdminPage />} />
  // ... 40+ routes total
</Routes>
```

### Navbar

The `Navbar` component supports **3-level dropdown menus** on desktop and **fully collapsible accordion menus** on mobile.

Mobile nav key behaviour:
- Parent items **with children**: render as `<span>` with `onClick` to toggle — does NOT navigate (prevents menu closing before submenu shows)
- Parent items **without children**: render as `<Link>` for normal navigation
- Location change auto-closes mobile menu (`useEffect` on `location`)

### PageHero

Every inner page starts with a `<PageHero>` component:

```jsx
<PageHero
  title="Admission"
  bgImage="/assets/images/general/student-book.jpg"
/>
```

The heading box is: `width: 78%; max-width: 1040px` — this is the reference width for all intro text paragraphs below the hero.

### Dev Search Tool

A `<DevSearch>` component is shown in the navbar **only in development mode** (`import.meta.env.DEV`). It provides a quick page-search overlay to navigate to any route — invisible in production.

### Cookie Consent

`CookieConsent.jsx` shows a banner on first visit:
- **Accept**: stores `tecCookiesAccepted=true` in `localStorage`, calls `initRUM()`
- **Decline**: stores `tecCookiesAccepted=false`, RUM never loads
- Banner never shows again once a choice is made

### Error Boundary

`ErrorBoundary.jsx` wraps the app to catch React render errors. Errors are reported to `errorReporter.js` which sends them to a Lambda endpoint for CloudWatch logging.

---

## 16. GDPR & Privacy Compliance

### What Has Been Done

| Measure | Status |
|---|---|
| Cookie consent banner | ✅ Implemented |
| Privacy Policy page | ✅ Implemented (`/privacy-policy`) |
| Analytics only after consent | ✅ RUM gated behind cookie accept |
| No third-party tracking scripts | ✅ None added |
| Data stored in AWS (S3, DynamoDB) | ✅ — needs EU region migration |
| Form submissions limited to staff access | ✅ Cognito RBAC |
| S3 files private (presigned URL access only) | ✅ |
| Access and Participation Statement linked | ✅ |

### What Still Needs to Be Done

| Action | Priority |
|---|---|
| Migrate all AWS resources to `eu-west-2` (London) | 🔴 High |
| Add ICO Registration Number to Privacy Policy | 🔴 High |
| Implement data retention policy (auto-delete old submissions) | 🟡 Medium |
| Cookie preferences management (granular control) | 🟡 Medium |
| Data Subject Access Request (DSAR) process | 🟡 Medium |
| DPA (Data Processing Agreement) with AWS | 🟡 Medium |
| Staff data handling training | 🟡 Medium |
| Privacy notice on each form | 🟡 Medium |

### Data Collected Per Form

| Form | Personal Data | Special Category |
|---|---|---|
| Application Form | Name, DOB, address, email, mobile, NI number, disability, ethnicity | Yes (disability, ethnicity) |
| Job Application | Name, DOB, address, email, mobile, ethnicity, disability, CV | Yes (disability, ethnicity) |
| New Starter Form | Full employment + bank details | No (bank data) |
| Enrolment Form | Name, DOB, nationality, visa status | Potentially |
| Enquiry Form | Name, email, mobile | No |
| Others | Varies | Varies |

> **Special category data** (disability, ethnicity) requires explicit consent and heightened protection under UK GDPR.

---

## 17. What Has Been Achieved

### Infrastructure
- ✅ Full AWS serverless backend (API Gateway + Lambda + DynamoDB + SES + S3)
- ✅ AWS Amplify hosting with automatic CI/CD from GitHub
- ✅ AWS Route 53 DNS hosting with nameserver delegation from cPanel
- ✅ Custom domain with SSL (HTTPS via ACM)
- ✅ Dev and production environment separation
- ✅ AWS Cognito authentication with group-based access control
- ✅ CloudWatch RUM real-user analytics

### Website
- ✅ 40+ pages covering all courses, policies, approvals, careers
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ 3-level navigation (desktop dropdown + mobile accordion)
- ✅ Course pages with accordions, tabs, unit details, fee information
- ✅ Careers section with individual job description pages
- ✅ GDPR-compliant cookie consent
- ✅ Privacy Policy page
- ✅ Intro paragraphs centred and aligned with heading width across all pages

### Forms
- ✅ 9 forms collecting student/staff/partner data
- ✅ File uploads (CV, ID documents, P45) to S3
- ✅ Email notifications via AWS SES to correct departments
- ✅ Confirmation emails to applicants

### Admin Dashboard
- ✅ Secure login with Cognito (no shared passwords)
- ✅ Role-based access (staff only see their forms)
- ✅ 894+ submissions managed
- ✅ Status workflow (New → Reviewed → Actioned)
- ✅ PDF generation for any entry
- ✅ Excel export (multi-sheet, one per form type)
- ✅ Google Sheets sync
- ✅ File viewing via presigned S3 URLs
- ✅ Entry editing in-place
- ✅ Real-time search and filter
- ✅ Session cache for fast load
- ✅ Mobile-responsive with collapsible sidebar drawer

---

## 18. Known Issues & Limitations

| Issue | Impact | Fix |
|---|---|---|
| All AWS resources in `us-east-1` | GDPR risk for EU data subjects | Migrate to `eu-west-2` at go-live |
| No spam protection on forms | Bot submissions possible | Add Cloudflare Turnstile or honeypot fields |
| No sitemap.xml or robots.txt | SEO impact | Generate and deploy |
| No meta SEO tags on pages | Poor search engine visibility | Add `<meta>` tags to all pages |
| ICO number missing from Privacy Policy | Legal compliance gap | Add when registered |
| ADMIN_PASSWORD constant in forms.js | Legacy — Cognito now used | Remove or ignore |
| DynamoDB full table scan | Performance at very high volume | Add GSI on `formType` + `submittedAt` |
| Lambda cold starts | Occasional 1-2s delay on first request | Add provisioned concurrency if needed |

---

## 19. Future Roadmap

### Short Term (Before Full Go-Live)

- [ ] **AWS region migration** — move all services to `eu-west-2`
- [ ] **Spam protection** — Cloudflare Turnstile on all public forms
- [ ] **SEO meta tags** — Add `<title>`, `<meta description>`, Open Graph tags to every page
- [ ] **sitemap.xml + robots.txt** — Serve from `/public`
- [ ] **ICO number** — Add to Privacy Policy once registered
- [ ] **Privacy notice on forms** — Short notice above submit buttons

### Medium Term

- [ ] **GitHub Actions for Lambda** — Auto-deploy Lambda on push (currently manual)
- [ ] **DynamoDB TTL** — Auto-delete submissions older than N years (data retention)
- [ ] **Form spam analytics** — Dashboard section showing bot vs human submission ratio
- [ ] **Student portal** — Authenticated area for students to track application status
- [ ] **Two-factor authentication (MFA)** — On Cognito for admin users

### Long Term

- [ ] **CMS integration** — Allow non-technical staff to edit page content
- [ ] **Course application tracking** — Full CRM-style pipeline
- [ ] **International student document portal** — Secure document upload and verification
- [ ] **Ofsted/Awarding body reporting exports** — Structured data exports for regulators

---

## 20. Runbook — How to Replicate This Project

This section is a step-by-step guide for any developer (human or AI) building a similar project from scratch.

### Step 1 — Set Up the React SPA

```bash
npm create vite@latest my-website -- --template react
cd my-website
npm install react-router-dom lucide-react
```

Configure Vite for `global` polyfill (needed for `amazon-cognito-identity-js`):

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  define: { global: 'globalThis' },
});
```

### Step 2 — Set Up AWS Amplify Hosting

1. Push code to GitHub
2. Go to **AWS Amplify Console** → New app → Host web app
3. Connect GitHub repo, select branch (`main`)
4. Build settings: `npm run build`, artifact: `dist`
5. Deploy — Amplify provides a `.amplifyapp.com` URL immediately
6. Add SPA redirect rule: all paths → `index.html` (200 rewrite)

### Step 3 — Set Up Route 53 & Connect Custom Domain

#### Option A — Use Route 53 as your DNS (Recommended for AWS-hosted sites)

1. AWS Console → Route 53 → Hosted zones → Create hosted zone
2. Enter your domain (e.g. `trenteducation.co.uk`), type: Public
3. Note the 4 NS (nameserver) records Route 53 assigns
4. Log in to your domain registrar (cPanel) → Nameservers → Replace with Route 53 NS values
5. Wait up to 48 hours for global DNS propagation

#### Option B — Keep cPanel DNS (simpler but less integrated)

1. Skip Route 53 entirely
2. Add DNS records manually in cPanel when Amplify/SES provides them

#### Connect Domain to Amplify

1. AWS Amplify Console → App → Domain management → Add domain
2. Enter your domain
3. If using Route 53: Amplify auto-creates validation records ✅ (no manual work)
4. If using cPanel DNS: manually add the CNAME records Amplify provides
5. SSL certificate is issued automatically by ACM (HTTPS)
6. Both `example.co.uk` and `www.example.co.uk` can be configured as aliases

### Step 4 — Set Up DynamoDB

1. AWS Console → DynamoDB → Create table
2. Table name: `your-table-name`
3. Partition key: `id` (String)
4. Billing: On-demand
5. No indexes needed initially

### Step 5 — Set Up API Gateway + Lambda (CRUD)

1. Create Lambda function (Node.js 20.x)
2. Attach IAM role with `DynamoDB:*` permissions on your table
3. Upload your `index.mjs` (CRUD handler)
4. Create API Gateway → REST API
5. Add routes: `POST /save`, `GET /get`, `POST /update`, `DELETE /delete`
6. Attach Lambda integration to each route
7. Enable CORS on all routes
8. Deploy the API → copy the invoke URL

### Step 6 — Set Up Cognito

1. AWS Cognito → Create User Pool
2. Sign-in: Email
3. Password policy: min 8 chars
4. Create App Client (no secret — browser-side)
5. Note: User Pool ID + Client ID
6. Create groups matching your RBAC needs
7. In API Gateway → Authorizers → Create JWT Authorizer → point to Cognito User Pool
8. Attach authorizer to all protected routes

### Step 7 — Set Up SES

1. AWS SES → Verified identities → Verify your domain
2. SES provides DNS records — add them to **Route 53** (or cPanel if not delegated):
   - 1× TXT record for domain ownership
   - 3× CNAME records for DKIM email signing
   - 1× TXT SPF record: `v=spf1 include:amazonses.com ~all`
3. Request production access (takes 24h AWS review) — required to send to non-verified addresses
4. Create Lambda for sending emails (uses `@aws-sdk/client-ses`)
5. IAM role: `ses:SendEmail` permission
6. Create API Gateway route → attach Lambda

### Step 8 — Set Up S3 File Uploads

1. Create S3 bucket, block all public access
2. Create Lambda to generate presigned PUT URLs (for upload) and GET URLs (for viewing)
3. IAM role: `s3:PutObject`, `s3:GetObject` on the bucket
4. CORS on S3 bucket:
   ```json
   [{"AllowedOrigins": ["*"], "AllowedMethods": ["GET","PUT"], "AllowedHeaders": ["*"]}]
   ```

### Step 9 — Set Up CloudWatch RUM

1. AWS CloudWatch → RUM → Create app monitor
2. Set domain to your site URL
3. Copy the snippet config (App ID, Identity Pool ID)
4. Wrap `initRUM()` call behind cookie consent

### Step 10 — Build the Admin Dashboard

Key decisions:
- **Single page** at `/admin` within the SPA (no separate app needed)
- **Cognito auth** handled client-side via `amazon-cognito-identity-js`
- **RBAC enforced on both client and server** (client hides UI, Lambda filters DB results)
- **DynamoDB cache** in `sessionStorage` prevents slow loads on every navigation
- **jsPDF** for PDF export — no backend needed, runs in browser
- **xlsx** for Excel export — also runs in browser

### Key Patterns Used in This Project

#### 1. Dev-only features
```javascript
const IS_DEV = import.meta.env.DEV;
// Only renders in `npm run dev`, never in production build
{IS_DEV && <DevSearch />}
```

#### 2. CSS variables for consistent theming
```css
:root {
  --tec-green: #2d6a4f;
  --tec-gold:  #c9a84c;
}
```

#### 3. Centralised API config
All URLs, keys, and email addresses in one file (`config/forms.js`). Never scattered across components.

#### 4. Session cache pattern
```javascript
const cached = sessionStorage.getItem('cache_key');
if (cached && isFresh(cached)) {
  showData(cached);
  refreshInBackground();
} else {
  fetchAndCache();
}
```

#### 5. Progressive data loading
Stream DynamoDB pages to UI as they arrive — don't wait for full scan to complete before showing data.

#### 6. Mobile-first sidebar
On desktop: `position: sticky`. On mobile: `position: fixed; left: -260px` toggled to `left: 0` via class.

---

## Appendix A — Environment Variables

No `.env` file is used. All config is in `src/config/forms.js`. Sensitive values (API keys, Pool IDs) are acceptable in a public repo for this setup because:

- Cognito Pool is protected by user authentication (can't access data without valid login)
- API Gateway enforces Cognito JWT auth on all data routes
- S3 is private — presigned URLs have short TTLs

> For a higher-security setup, move API URLs and Cognito IDs to Amplify environment variables (exposed as `import.meta.env.VITE_*`).

---

## Appendix B — Useful Links

| Resource | URL |
|---|---|
| GitHub Repo | `https://github.com/rameenjaved123/tec-website` |
| AWS Amplify Console | `https://console.aws.amazon.com/amplify` |
| AWS Cognito Console | `https://console.aws.amazon.com/cognito` |
| AWS API Gateway Console | `https://console.aws.amazon.com/apigateway` |
| AWS Lambda Console | `https://console.aws.amazon.com/lambda` |
| AWS DynamoDB Console | `https://console.aws.amazon.com/dynamodb` |
| AWS SES Console | `https://console.aws.amazon.com/ses` |
| AWS S3 Console | `https://console.aws.amazon.com/s3` |
| AWS CloudWatch RUM | `https://console.aws.amazon.com/cloudwatch/home#rum` |
| Live Dev Site | `https://dev.trenteducation.co.uk` |
| Admin Dashboard | `https://dev.trenteducation.co.uk/admin` |

---

*This document was generated from the complete project implementation. Last updated: June 2026.*
