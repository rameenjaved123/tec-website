# Trent Education Centre (TEC) Website — Full Technical Documentation

**Version:** 2.0 (FastAPI Migration)
**Last Updated:** June 2026
**GitHub Repo:** `rameenjaved123/tec-website`
**Live Site:** `https://trenteducation.co.uk`
**Dev/Staging:** `https://dev.trenteducation.co.uk`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Code Structure](#3-code-structure)
4. [Infrastructure Overview](#4-infrastructure-overview)
5. [CI/CD Pipeline](#5-cicd-pipeline)
6. [Domain & DNS Setup — Route 53 & cPanel](#6-domain--dns-setup)
7. [Authentication — Keycloak](#7-authentication--keycloak)
8. [Backend — FastAPI](#8-backend--fastapi)
9. [Database — MySQL on AWS RDS](#9-database--mysql-on-aws-rds)
10. [Email — AWS SES](#10-email--aws-ses)
11. [File Storage — AWS S3](#11-file-storage--aws-s3)
12. [Analytics — CloudWatch RUM](#12-analytics--cloudwatch-rum)
13. [Forms System](#13-forms-system)
14. [Frontend Architecture](#14-frontend-architecture)
15. [Chatbot System](#15-chatbot-system)
16. [GDPR & Privacy Compliance](#16-gdpr--privacy-compliance)
17. [What Has Been Achieved](#17-what-has-been-achieved)
18. [Known Issues & Limitations](#18-known-issues--limitations)
19. [Future Roadmap](#19-future-roadmap)
20. [Runbook — How to Replicate This Project](#20-runbook--how-to-replicate-this-project)

---

## 1. Project Overview

Trent Education Centre (TEC) is a UK further and higher education college based in Nottingham. This project is the college's primary public-facing website.

### What the Website Does

- Presents TEC's course catalogue across English language, further education, and higher education
- Allows prospective students to apply, enquire, and enrol online
- Handles HR forms (job applications, new staff onboarding)
- Manages partnership/collaboration enquiries
- Provides an international student application pipeline
- Includes a floating AI-assisted chatbot widget
- All form management and admin functionality has moved to the **TEC Management VLE** (`tec-cms`)

### Environments

| Environment | URL | Branch | Purpose |
|---|---|---|---|
| **Development** | `http://localhost:5173` | `feature/fastapi-migration` | Local development |
| **Staging** | `https://dev.trenteducation.co.uk` | `feature/fastapi-migration` | Testing against live backend |
| **Production** | `https://trenteducation.co.uk` | `main` (at go-live) | Public-facing live site |

---

## 2. Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3.1 | UI framework |
| **Vite** | 5.4.8 | Build tool & dev server |
| **React Router DOM** | 6.26.2 | Client-side routing (SPA) |
| **Lucide React** | 0.383.0 | Icon library |
| **aws-rum-web** | 3.1.0 | CloudWatch RUM analytics |

### Backend (TEC Management — FastAPI)

| Service | Purpose |
|---|---|
| **FastAPI** | REST API — all website endpoints at `/api/v1/website/*` |
| **Keycloak** | Authentication & authorisation (JWT RS256) |
| **MySQL on AWS RDS** | Relational database — 9 form tables + chatbot tables |
| **AWS SES** | Transactional emails (notifications, confirmations) |
| **AWS S3** | File storage (CVs, ID documents, P45s) — bucket `tec-form-uploads` |
| **Docker** | FastAPI + Keycloak run in Docker on the EC2 instance |

### Hosting & Infrastructure

| Service | Purpose |
|---|---|
| **AWS Amplify** | Static site hosting (React build) + CI/CD |
| **AWS CloudFront** | CDN (served via Amplify) |
| **AWS Route 53** | DNS hosting |
| **AWS ACM** | SSL/TLS certificates |
| **AWS EC2** | Server running Docker (FastAPI on :8000, Keycloak on :8080) |

### Dev Tooling

| Tool | Purpose |
|---|---|
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
│   │   ├── Footer.jsx         # Site footer
│   │   ├── PageHero.jsx       # Hero banner used on all inner pages
│   │   ├── CookieConsent.jsx  # GDPR cookie banner
│   │   ├── ErrorBoundary.jsx  # React error boundary
│   │   └── ChatWidget/
│   │       ├── ChatWidget.jsx # Floating chatbot widget
│   │       └── ChatWidget.css
│   │
│   ├── pages/                 # Pages organised by domain
│   │   ├── home/
│   │   ├── about/
│   │   ├── approvals/
│   │   ├── courses/
│   │   │   ├── english/
│   │   │   ├── higher-education/
│   │   │   └── further-education/
│   │   ├── admissions/
│   │   ├── forms/             # 9 public-facing form pages
│   │   ├── jobs/
│   │   ├── policies/
│   │   ├── contact/
│   │   └── international/
│   │
│   ├── config/
│   │   └── forms.js           # Form registry, API calls, email builders
│   │
│   └── utils/
│       ├── api.js             # Central API client — Keycloak service account token
│       │                      # management + all public backend calls
│       ├── rum.js             # CloudWatch RUM initialisation (gated on cookie consent)
│       └── errorReporter.js   # JS error reporting → FastAPI /website/errors
│
├── vite.config.js             # Vite config — port 5173, uploads folder excluded from watcher
├── package.json
└── index.html
```

### Removed From Previous Version

The following no longer exist in this branch:

| Removed | Reason |
|---|---|
| `lambda/` folder | Lambda functions replaced by FastAPI |
| `src/utils/cognitoAuth.js` | Cognito replaced by Keycloak |
| `src/pages/admin/` | Admin dashboard moved to VLE frontend (`tec-cms`) |
| `amazon-cognito-identity-js` package | Cognito removed |

### CSS Architecture

CSS is **not** CSS Modules — each page has its own `.css` file imported directly in the JSX. Global variables in `src/index.css`:

```css
:root {
  --tec-green:       #2d6a4f;
  --tec-green-dark:  #1a3a2a;
  --tec-gold:        #c9a84c;
  --tec-text-light:  #555;
}
```

---

## 4. Infrastructure Overview

```
trenteducation.co.uk (domain via cPanel → Route 53)
        │
        ▼
User Browser
    │
    ├── Static Assets ────────────── AWS Amplify (S3 + CloudFront CDN)
    │                                (React build, no server-side rendering)
    │
    ├── API Calls ────────────────── AWS EC2 (Docker)
    │                                    │
    │                               FastAPI :8000
    │                               Keycloak :8080
    │                                    │
    │                               MySQL RDS (tec_management DB)
    │
    ├── File Uploads ──────────────── AWS S3 (tec-form-uploads bucket)
    │                                (presigned URLs from FastAPI)
    │
    ├── Transactional Email ───────── AWS SES (us-east-1)
    │                                (sent server-side by FastAPI on form submit)
    │
    └── Analytics ────────────────── CloudWatch RUM (cookie-consent gated)
```

### AWS Regions

| Resource | Region |
|---|---|
| Amplify / CloudFront | `us-east-1` (migrate to `eu-west-2` at go-live) |
| EC2 (FastAPI + Keycloak) | `eu-west-2` |
| RDS MySQL | `eu-west-2` ✅ |
| S3 (`tec-form-uploads`) | `eu-west-2` ✅ |
| SES | `us-east-1` (identity verified here — keep) |

---

## 5. CI/CD Pipeline

```
Developer pushes code
        │
        ▼
GitHub (rameenjaved123/tec-website)
        │
        ▼  [webhook trigger]
AWS Amplify
        │
        ▼
npm install → npm run build (Vite)
        │
        ▼
/dist deployed to CloudFront CDN
        │
        ▼
Live at dev.trenteducation.co.uk (~2–4 minutes)
```

### Amplify Build Spec

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

### Environment Variables in Amplify

All `VITE_*` variables must be set in Amplify Console → App settings → Environment variables:

```
VITE_API_URL              https://api.trenteducation.co.uk/api/v1
VITE_KC_URL               https://auth.trenteducation.co.uk
VITE_KC_REALM             tec
VITE_KC_CLIENT_ID         tec-website
VITE_KC_SVC_USERNAME      website.service
VITE_KC_SVC_PASSWORD      <prod password — store in Amplify env, not git>
VITE_RECAPTCHA_SITE_KEY   <reCAPTCHA v3 site key>
VITE_S3_WEBSITE_BUCKET    tec-form-uploads
VITE_AWS_REGION           eu-west-2
```

### SPA Redirect Rule

In Amplify Console → Rewrites and Redirects:

```
Source:   </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>
Target:   /index.html
Type:     200 (Rewrite)
```

---

## 6. Domain & DNS Setup

### DNS Architecture

```
trenteducation.co.uk (registered via cPanel)
        │
        │ Nameservers delegated to Route 53
        ▼
AWS Route 53 (Hosted Zone)
        │
        ├── trenteducation.co.uk       ──► AWS Amplify (Alias record)
        ├── www.trenteducation.co.uk   ──► AWS Amplify
        ├── dev.trenteducation.co.uk   ──► AWS Amplify
        ├── api.trenteducation.co.uk   ──► EC2 (FastAPI :8000)
        ├── auth.trenteducation.co.uk  ──► EC2 (Keycloak :8080)
        ├── _amazonses TXT             ──► SES domain verification
        ├── DKIM CNAMEs (×3)           ──► SES email signing
        └── SPF TXT                    ──► SES sending authorisation
```

### SES Domain Verification

To send from `noreply@trenteducation.co.uk`:

1. AWS SES → Verified identities → Verify domain
2. Add DNS records in Route 53: 1× TXT, 3× DKIM CNAMEs, 1× SPF TXT
3. Request SES production access (out of sandbox — required before sending to external addresses)

---

## 7. Authentication — Keycloak

### Overview

Authentication is handled by **Keycloak** (`tec` realm) running on EC2. The website does not have user login — instead it uses a **dedicated service account** (`website.service`) to authenticate API calls.

### Website Service Account

| Setting | Value |
|---|---|
| **Keycloak Client** | `tec-website` (public, ROPC enabled) |
| **Username** | `website.service` |
| **Email** | `website.service@tec.ac.uk` |
| **Role** | `website_public` |
| **Password** | Stored in `VITE_KC_SVC_PASSWORD` env var |

The `website_public` role grants access **only** to public website endpoints:
- `POST /website/forms/{type}` — submit forms
- `POST /website/upload-url` — S3 presigned URL
- `POST /website/send-email` — raw email
- `POST /website/chat` — log chat
- `POST /website/chat/lead` — save pre-chat data
- `POST /website/errors` — report errors

It does **not** grant access to staff/student/admin data, VLE endpoints, or form management.

### Token Flow

```
Website loads for the first time
        │
        ▼
api.js getToken() → POST /realms/tec/protocol/openid-connect/token
  { grant_type: "password", client_id: "tec-website",
    username: "website.service", password: "..." }
        │
        ▼
Keycloak returns access_token (expires 30 min) + refresh_token
        │
        ▼
Token cached in memory (not localStorage)
        │
        ▼
All publicFetch() calls include: Authorization: Bearer <token>
        │
        ▼
Token auto-refreshed 60s before expiry using the refresh_token
If refresh fails → re-login automatically
```

### Admin / Staff Access

Form management (view submissions, update status, export data) is handled in the **VLE frontend** (`tec-cms`), not this website. Staff with `website_admin`, `admin`, or `staff` Keycloak roles log into tec-cms separately.

### Security Note

The service account credentials (`VITE_KC_SVC_USERNAME`, `VITE_KC_SVC_PASSWORD`) are bundled into the JavaScript build. This is an accepted trade-off — the `website_public` role is scoped to POST-only public endpoints. Defence-in-depth still applies: CORS origin allowlist + IP rate limiting + optional reCAPTCHA.

---

## 8. Backend — FastAPI

### Base URL

```
http://localhost:8000/api/v1       # development
https://api.trenteducation.co.uk/api/v1  # production
```

### Website Endpoints (`/website/`)

All endpoints require `Authorization: Bearer <token>` with at minimum the `website_public` role. Public-access admin endpoints (GET/PATCH/DELETE) require `admin`, `staff`, or `website_admin` role (managed in tec-cms).

#### Form Submission

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/website/forms/{type}` | `website_public`+ | Submit a form; auto-sends SES notification + confirmation |
| `GET` | `/website/forms/{type}` | `admin`/`staff`/`website_admin` | List submissions (paginated, filterable) |
| `GET` | `/website/forms/{type}/{id}` | `admin`/`staff`/`website_admin` | Get single submission |
| `PATCH` | `/website/forms/{type}/{id}` | `admin`/`staff`/`website_admin` | Update status or notes |
| `DELETE` | `/website/forms/{type}/{id}` | `admin` only | Delete a submission |

Valid `type` values: `enquiry` `application` `enrolment` `international-application` `job-application` `new-starter` `partnerships` `english-ielts` `complaint`

#### File Storage

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/website/upload-url` | `website_public`+ | Get S3 presigned PUT URL |
| `POST` | `/website/view-url` | `admin`/`staff`/`website_admin` | Get S3 presigned GET URL |

#### Email

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/website/send-email` | `website_public`+ | Send raw email via SES |
| `POST` | `/website/admin/send-email` | `admin`/`staff`/`website_admin` | Re-send/forward submission email |

#### Chatbot

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/website/chat` | `website_public`+ | Log a chat turn |
| `POST` | `/website/chat/lead` | `website_public`+ | Save pre-chat form data |
| `GET` | `/website/chat/analytics` | `admin`/`staff`/`website_admin` | Usage stats |
| `GET` | `/website/chat/conversations` | `admin`/`staff`/`website_admin` | Paginated conversation history |
| `GET` | `/website/chat/leads` | `admin`/`staff`/`website_admin` | Pre-chat leads (auto-purges >30 days) |

#### Errors

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/website/errors` | `website_public`+ | Report a JS error |

### Server-side Security

Beyond JWT auth, public endpoints are further protected:

| Layer | Detail |
|---|---|
| **CORS origin check** | `_require_website_origin()` — rejects requests from non-whitelisted origins |
| **IP rate limiting** | In-memory per-IP: 20/min, 100/hr, 200/day (returns 429) |
| **reCAPTCHA v3** | Optional — enabled via `RECAPTCHA_ENABLED=true` + `RECAPTCHA_SECRET_KEY` in backend `.env` |

### FastAPI Project Location

```
~/Trent Projects/tec-management/
├── app/
│   ├── modules/website/
│   │   ├── routes.py      # All /website/* endpoints
│   │   ├── schemas.py     # Pydantic request/response models
│   │   ├── service.py     # Business logic
│   │   └── models.py      # SQLAlchemy ORM models
│   └── core/
│       └── security.py    # JWT validation, require_roles(), website_public role
└── docker-compose.yml     # Runs tec_app (FastAPI) container
```

---

## 9. Database — MySQL on AWS RDS

### Connection

```
Host:     tec-management.cte60kycgv9o.eu-west-2.rds.amazonaws.com
Database: tec_management
User:     admin
Region:   eu-west-2 ✅
```

### Form Tables (9 separate tables)

Each form type has its own MySQL table. All share the same schema:

```sql
CREATE TABLE enquiry (    -- one per form type
  id            VARCHAR(36) PRIMARY KEY,
  status        ENUM('new','in_progress','completed','rejected','archived') DEFAULT 'new',
  data          JSON NOT NULL,         -- all form fields as JSON
  notes         TEXT,
  reviewed_by_staff_id  VARCHAR(36),  -- FK to staffs.id
  submitted_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME ON UPDATE CURRENT_TIMESTAMP
);
```

Form types: `enquiry` | `application` | `enrolment` | `international_application` | `job_application` | `new_starter` | `partnerships` | `english_ielts` | `complaint`

### Chatbot Tables

```sql
CREATE TABLE chatbot_sessions (
  id              VARCHAR(36) PRIMARY KEY,  -- UUID, same as session_id in conversations
  created_at      DATETIME DEFAULT NOW(),
  last_message_at DATETIME DEFAULT NOW(),
  message_count   INT DEFAULT 0
);

CREATE TABLE chatbot_conversations (
  id              VARCHAR(36) PRIMARY KEY,
  session_id      VARCHAR(36) NOT NULL,
  user_message    TEXT,
  bot_answer      TEXT,
  created_at      DATETIME DEFAULT NOW()
);
```

Data retention: handled by Alembic or a cron script — chatbot data older than 90 days can be purged.

### Migrations

Schema is managed by **Alembic** in the `tec-management` project:

```bash
# Apply all pending migrations
docker exec tec_app alembic upgrade head

# Check current version
docker exec tec_app alembic current
```

---

## 10. Email — AWS SES

### Configuration

| Setting | Value |
|---|---|
| **From address** | `noreply@trenteducation.co.uk` |
| **From name** | `Trent Education Centre` |
| **Region** | `us-east-1` (identity verified here) |
| **Mode** | Production (out of sandbox) |

### Email Flow

When a form is submitted via `POST /website/forms/{type}`:

1. FastAPI saves the record to MySQL
2. FastAPI calls `WebsiteEmailService.send_submission_notification()` — staff notification to the relevant department (best-effort, errors logged but don't fail the HTTP response)
3. FastAPI calls `WebsiteEmailService.send_applicant_confirmation()` — confirmation to the applicant

### Notification Recipients

| Form | Recipient |
|---|---|
| Application Form | `digitaladmissions@trenteducation.co.uk` |
| Enrolment Form | `digitaladmissions@trenteducation.co.uk` |
| Enquiry Form | `digitaladmissions@trenteducation.co.uk` |
| Job Application | `hr@trenteducation.co.uk` |
| New Starter Form | `hr@trenteducation.co.uk` |
| English & IELTS | `internationaladmissions@trenteducation.co.uk` |
| International Application | `internationaladmissions@trenteducation.co.uk` |
| Partnerships | `partnerships@trenteducation.co.uk` |
| Complaint / Default | `info@trenteducation.co.uk` |

---

## 11. File Storage — AWS S3

### Bucket

| Setting | Value |
|---|---|
| **Bucket name** | `tec-form-uploads` |
| **Region** | `eu-west-2` ✅ |
| **Public access** | Blocked (private) |
| **Access method** | Presigned URLs only |

### Upload Flow

1. Frontend calls `POST /website/upload-url` with `{ file_name, file_type, folder }` + Bearer token
2. FastAPI generates a presigned PUT URL (S3 SDK) and returns it
3. Browser uploads file directly to S3 using the PUT URL — file never touches FastAPI
4. File key (S3 path) stored in the form's JSON `data` field in MySQL

### View Flow (admin, via tec-cms)

1. Staff clicks "View File" in tec-cms
2. tec-cms calls `POST /website/view-url` with `{ file_key }` + staff JWT
3. FastAPI generates a presigned GET URL (15-minute expiry)
4. Browser opens the file in a new tab

---

## 12. Analytics — CloudWatch RUM

### Configuration

| Setting | Value |
|---|---|
| **Monitor name** | `tec-website` |
| **Region** | `us-east-1` |
| **Telemetry** | `performance`, `errors`, `http` |

### GDPR Integration

RUM is **only initialised after the user accepts cookies**. The `CookieConsent` component calls `initRUM()` on accept. If the user declines, RUM is never loaded.

### What It Tracks

- Page views and navigation
- Web Vitals (LCP, FID, CLS)
- JavaScript errors
- HTTP request performance
- Device type, browser, country

---

## 13. Forms System

### Central Configuration (`src/config/forms.js`)

All form configuration lives in one file:

- `FORM_REGISTRY` — Master list of all forms with paths, icons, field mappings
- `NOTIFY_EMAILS` — Which email gets notified per form type
- API call wrappers that use `src/utils/api.js`

### Forms Built

| Form | URL | Stores Files |
|---|---|---|
| Application Form | `/application-form` | No |
| Enrolment Form | `/enrolment-form` | No |
| Enquiry Form | `/enquiry-form` | No |
| Job Application | `/job-application` | Yes (CV) |
| New Starter Form | `/new-starter-form` | Yes (ID, P45) |
| English & IELTS Application | `/english-ielts-application` | No |
| International Application | `/international-application` | No |
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
api.js getToken() — ensures a valid Bearer token is cached
        │
        ▼
If file upload:
  POST /website/upload-url → S3 presigned PUT URL
  → Browser uploads directly to S3
  → File key stored as field value
        │
        ▼
POST /website/forms/{type}
  Authorization: Bearer <website_public token>
  { data: { ...formFields }, recaptcha_token: "..." }
        │
        ▼
FastAPI:
  → Saves to MySQL (form-type table)
  → Sends staff notification via SES (best-effort)
  → Sends applicant confirmation via SES (best-effort)
  → Returns { id, status }
        │
        ▼
Success message shown to user
```

---

## 14. Frontend Architecture

### Routing

All routes defined in `src/App.jsx` using React Router v6:

```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/application-form" element={<ApplicationFormPage />} />
  <Route path="/policies" element={<PoliciesPage />} />
  // ... 50+ routes total
</Routes>
```

### Navbar

The `Navbar` component supports **3-level dropdown menus** on desktop and **fully collapsible accordion menus** on mobile.

Mobile nav behaviour:
- Parent items **with children**: render as `<span>` with `onClick` to toggle (does not navigate — prevents menu closing before submenu shows)
- Parent items **without children**: render as `<Link>` for normal navigation
- Location change auto-closes mobile menu

### PageHero

Every inner page starts with `<PageHero>`:

```jsx
<PageHero
  title="Admission"
  bgImage="/assets/images/general/student-book.jpg"
/>
```

### Dev Search Tool

A `<DevSearch>` component is shown in the navbar **only in development mode** (`import.meta.env.DEV`). Invisible in production builds.

### Cookie Consent

`CookieConsent.jsx` shows a banner on first visit:
- **Accept**: stores `tecCookiesAccepted=true` in `localStorage`, calls `initRUM()`
- **Decline**: stores `tecCookiesAccepted=false`, RUM never loads

### Error Boundary

`ErrorBoundary.jsx` wraps the entire app. Caught errors are reported to `errorReporter.js` which sends them to `POST /website/errors`.

### API Client (`src/utils/api.js`)

The central API client handles:

1. **Token management**: ROPC login on first call using `VITE_KC_SVC_*` env vars; access token cached in memory; auto-refreshed using the refresh token 60 seconds before expiry; concurrent calls deduplicated via an in-flight promise
2. **`publicFetch(path, options)`**: internal wrapper that attaches `Authorization: Bearer <token>` to every request
3. **Public exports**: `submitForm`, `uploadToS3`, `getS3ViewUrl`, `sendEmail`, `logChat`, `reportError`

```javascript
// Simplified token lifecycle
getToken()
  → if cached + not expiring soon → return cached token
  → if refresh_token available → POST /token with refresh_token
  → else → POST /token with username + password (ROPC)
```

---

## 15. Chatbot System

The TEC website includes a floating chat widget that answers common student questions using keyword matching — no AI, no external API calls for answers. Conversations are logged to the TEC Management MySQL database.

### Architecture

```
User visits TEC website
        │
        ▼
ChatWidget.jsx (always mounted, every page)
        │
        ├── User types a question
        │       ▼
        │   findAnswer(input) ← pure keyword matching (no API)
        │       ▼
        │   Match found → show answer from FAQs array
        │   No match  → show FALLBACK (phone + email)
        │
        └── After every answer: logChat() ──► POST /website/chat
                                                  │
                                            Bearer token (website_public)
                                                  │
                                            FastAPI saves to MySQL:
                                            chatbot_conversations
                                            chatbot_sessions (upsert)
```

### Frontend — ChatWidget

**File:** `src/components/ChatWidget/ChatWidget.jsx`

#### How Answers Work

```javascript
// 1. User types a question
// 2. findAnswer() lowercases input and scores each FAQ entry
// 3. Each FAQ has an array of keywords — multi-word keywords score higher
// 4. Highest-scoring FAQ returned if score > 0
// 5. If no FAQ scores, FALLBACK is shown

const FALLBACK = "I don't have information about that. Please contact "
               + "(+44) 1157950171 / info@trenteducation.co.uk";
```

#### FAQ Topics (15 entries)

| Topic | Keywords include |
|---|---|
| Courses available | course, study, offer, programme |
| GCSEs | gcse — explicitly states TEC does NOT offer GCSEs |
| How to apply | apply, application, enrol, sign up |
| Fees | fee, cost, price, pay, tuition |
| Locations | location, centre, address, nottingham |
| Entry requirements | requirement, qualify, eligible, level |
| Scholarships & bursaries | scholarship, bursary, funding |
| English language courses | english, esol, ielts, language |
| BTEC HND | btec, hnd, higher national, level 4, level 5 |
| Contact | contact, phone, email, call, reach |
| International students | international, overseas, visa |
| Digital Skills | digital, computer, it skills |
| SIA / Door Supervisors | sia, door supervisor, security |
| Maths | maths, mathematics, functional skills |
| ATHE Level 3 | athe, level 3, diploma, business |

#### Session ID

Each widget mount generates a UUID (`crypto.randomUUID()`). This UUID groups all messages from one browser visit into one session in the database.

#### Conversation Logging

Fire-and-forget — never blocks the UI:

```javascript
async function logConversation(userMessage, botAnswer, sessionId) {
  try {
    await logChat(userMessage, botAnswer, sessionId) // api.js
  } catch { /* silent */ }
}
```

### Backend — FastAPI

**Endpoint:** `POST /api/v1/website/chat`
**Auth:** `website_public` Bearer token
**DB:** MySQL `chatbot_conversations` + `chatbot_sessions`

On receive:
1. Inserts row into `chatbot_conversations`
2. Upserts `chatbot_sessions` (increments `message_count`, updates `last_message_at`)

### Admin — Chatbot Management (via tec-cms)

| Endpoint | Who can access | Purpose |
|---|---|---|
| `GET /website/chat/analytics` | `admin`, `staff`, `website_admin` | Total sessions, today's message count |
| `GET /website/chat/conversations` | `admin`, `staff`, `website_admin` | Paginated session list with messages |
| `GET /website/chat/leads` | `admin`, `staff`, `website_admin` | Pre-chat lead form submissions |

### Data Retention

Chatbot data older than 30 days is automatically purged on every `GET /website/chat/leads` call (GDPR — implemented in `WebsiteChatLeadService.list()`). A separate cron job or Alembic migration can extend this to all chatbot tables on a schedule.

---

## 16. GDPR & Privacy Compliance

### What Has Been Done

| Measure | Status |
|---|---|
| Cookie consent banner | ✅ |
| Privacy Policy page (`/privacy-policy`) | ✅ |
| Analytics only after consent | ✅ RUM gated behind cookie accept |
| No third-party tracking scripts | ✅ |
| Data stored in EU region (RDS, S3 in `eu-west-2`) | ✅ |
| Form submissions limited to staff via Keycloak RBAC | ✅ |
| S3 files private (presigned URL access only) | ✅ |
| Chatbot leads auto-purged after 30 days | ✅ |

### Still Needed

| Action | Priority |
|---|---|
| Amplify/CloudFront migration to `eu-west-2` | 🔴 High |
| ICO Registration Number in Privacy Policy | 🔴 High |
| Privacy notice on each form (above submit button) | 🟡 Medium |
| Data retention policy for form submissions (auto-archive) | 🟡 Medium |
| Cookie preferences management (granular) | 🟡 Medium |
| DPA with AWS | 🟡 Medium |

### Data Collected Per Form

| Form | Personal Data | Special Category |
|---|---|---|
| Application Form | Name, DOB, address, email, mobile, NI, disability, ethnicity | Yes |
| Job Application | Name, DOB, address, email, mobile, ethnicity, disability, CV | Yes |
| New Starter Form | Full employment + bank details | Sensitive (bank) |
| Enrolment Form | Name, DOB, nationality, visa status | Potentially |
| Enquiry Form | Name, email, mobile | No |

---

## 17. What Has Been Achieved

### Infrastructure

- ✅ AWS Amplify static hosting with automatic CI/CD from GitHub
- ✅ AWS Route 53 DNS with nameserver delegation from cPanel
- ✅ Custom domain with SSL (HTTPS via ACM)
- ✅ FastAPI backend (replacing all Lambda functions) — running on EC2 via Docker
- ✅ MySQL RDS (`eu-west-2`) replacing DynamoDB
- ✅ Keycloak SSO replacing AWS Cognito
- ✅ Dedicated `website_public` service account — all API calls authenticated
- ✅ S3 file storage (`eu-west-2`) for form attachments

### Website

- ✅ 50+ pages — all courses, policies, approvals, careers, international
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ 3-level navigation (desktop dropdown + mobile accordion)
- ✅ GDPR-compliant cookie consent
- ✅ Privacy Policy page
- ✅ All `wp-content` and `trenteducation.co.uk` hard-coded links replaced with local paths
- ✅ Policy PDFs updated (Student Disciplinary V2, Fitness to Study, Equality Diversity Inclusion)

### Forms

- ✅ 9 forms — all migrated from Lambda/DynamoDB to FastAPI/MySQL
- ✅ File uploads to S3 (CV, ID, P45) via presigned URLs
- ✅ Email notifications + applicant confirmations via SES (now server-side on FastAPI)
- ✅ All form submissions authenticated via `website_public` Keycloak role

### Security

- ✅ All public API calls require a valid Bearer token (website_public role)
- ✅ CORS origin allowlist enforced server-side
- ✅ IP rate limiting (20/min, 100/hr, 200/day)
- ✅ Optional reCAPTCHA v3 support

---

## 18. Known Issues & Limitations

| Issue | Impact | Fix |
|---|---|---|
| `VITE_KC_SVC_PASSWORD` bundled in JS build | Credential visible in bundle — mitigated by `website_public` scope | Accept trade-off or add a token-proxy edge function |
| Amplify/CloudFront in `us-east-1` | GDPR concern | Migrate to `eu-west-2` at go-live |
| No sitemap.xml or robots.txt | SEO impact | Generate and serve from `/public` |
| No meta SEO tags on pages | Poor search visibility | Add `<meta>` tags |
| ICO number missing from Privacy Policy | Legal gap | Add once registered |
| reCAPTCHA not enabled in dev | Forms submittable without challenge | Set `VITE_RECAPTCHA_SITE_KEY` for prod |

---

## 19. Future Roadmap

### Short Term (Before Full Go-Live)

- [ ] **AWS region migration** — Amplify/CloudFront to `eu-west-2`
- [ ] **reCAPTCHA** — Enable `VITE_RECAPTCHA_SITE_KEY` + `RECAPTCHA_ENABLED=true` in prod
- [ ] **SEO meta tags** — `<title>`, `<meta description>`, Open Graph on every page
- [ ] **sitemap.xml + robots.txt**
- [ ] **ICO number** — Add to Privacy Policy
- [ ] **Privacy notice** — Short notice above each form's submit button

### Medium Term

- [ ] **Token-proxy** — Move KC ROPC call server-side (edge function) so client secret isn't bundled
- [ ] **Form submission data retention** — Auto-archive/delete old records (configurable TTL per form)
- [ ] **Student portal** — Authenticated area to track application status

### Long Term

- [ ] **CMS** — Allow non-technical staff to edit page content
- [ ] **AI chatbot upgrade** — Replace keyword matching with a language model
- [ ] **Ofsted/Awarding body reporting exports** — Structured data exports for regulators

---

## 20. Runbook — How to Replicate This Project

### Step 1 — Set Up the React SPA

```bash
npm create vite@latest tec-website -- --template react
cd tec-website
npm install react-router-dom lucide-react
```

### Step 2 — Set Up FastAPI Backend

Deploy `tec-management` on EC2:

```bash
git clone https://github.com/rameenjaved123/tec-management
cd tec-management
cp .env.example .env   # fill in DB, Keycloak, SES, S3 values
docker compose up -d
docker exec tec_app alembic upgrade head
```

### Step 3 — Set Up Keycloak

```bash
# From tec-management project
python scripts/setup_keycloak_dev.py
```

This creates the `tec` realm, all roles (including `website_public`), and the `website.service` user.

### Step 4 — Set Up AWS Amplify Hosting

1. Push code to GitHub
2. AWS Amplify Console → New app → Host web app → Connect GitHub
3. Build: `npm run build`, artifact: `dist`
4. Add SPA redirect rule: all paths → `index.html` (200 rewrite)
5. Set all `VITE_*` environment variables in Amplify Console

### Step 5 — Set Up Route 53 & Custom Domain

1. Create hosted zone for `trenteducation.co.uk`
2. Delegate nameservers from cPanel to Route 53
3. Add A/CNAME records pointing to Amplify
4. Add `api.trenteducation.co.uk` → EC2 IP (FastAPI)
5. Add `auth.trenteducation.co.uk` → EC2 IP (Keycloak)
6. In Amplify → Domain management → Add domain → Amplify auto-creates ACM validation records in Route 53

### Step 6 — Set Up SES

1. Verify domain `trenteducation.co.uk` in SES (`us-east-1`)
2. Add DNS records to Route 53 (TXT + 3× DKIM CNAMEs + SPF)
3. Request SES production access
4. Set `SES_REGION`, `SES_FROM_EMAIL`, `SES_FROM_NAME` in FastAPI `.env`

### Step 7 — Set Up S3 File Uploads

1. Bucket `tec-form-uploads` — block all public access
2. Set CORS on bucket:
   ```json
   [{"AllowedOrigins": ["https://trenteducation.co.uk"], "AllowedMethods": ["PUT"], "AllowedHeaders": ["*"]}]
   ```
3. IAM role on EC2 with `s3:PutObject`, `s3:GetObject` on `tec-form-uploads`

### Step 8 — Set Up CloudWatch RUM

1. CloudWatch → RUM → Create app monitor
2. Set domain to `trenteducation.co.uk`
3. Copy App ID + Identity Pool ID into `src/utils/rum.js`
4. RUM is only initialised after cookie consent is accepted

---

## Appendix A — Environment Variables

| Variable | Dev value | Production |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8000/api/v1` | `https://api.trenteducation.co.uk/api/v1` |
| `VITE_KC_URL` | `http://localhost:8080` | `https://auth.trenteducation.co.uk` |
| `VITE_KC_REALM` | `tec` | `tec` |
| `VITE_KC_CLIENT_ID` | `tec-website` | `tec-website` |
| `VITE_KC_SVC_USERNAME` | `website.service` | `website.service` |
| `VITE_KC_SVC_PASSWORD` | `Website@TEC2024!` | Set in Amplify env (not in git) |
| `VITE_RECAPTCHA_SITE_KEY` | _(blank — disabled)_ | reCAPTCHA v3 site key |
| `VITE_S3_WEBSITE_BUCKET` | `tec-form-uploads` | `tec-form-uploads` |
| `VITE_AWS_REGION` | `eu-west-2` | `eu-west-2` |

---

## Appendix B — Useful Links

| Resource | URL |
|---|---|
| GitHub Repo | `https://github.com/rameenjaved123/tec-website` |
| Backend Repo | `https://github.com/rameenjaved123/tec-management` |
| AWS Amplify Console | `https://console.aws.amazon.com/amplify` |
| AWS SES Console | `https://console.aws.amazon.com/ses` |
| AWS S3 Console | `https://console.aws.amazon.com/s3` |
| AWS CloudWatch RUM | `https://console.aws.amazon.com/cloudwatch/home#rum` |
| Keycloak Admin | `http://localhost:8080` (dev) |
| Live Dev Site | `https://dev.trenteducation.co.uk` |

---

*Last updated: June 2026 — v2.0 FastAPI migration complete.*
