# Trent Education Centre — Website

The official website and admin dashboard for [Trent Education Centre](https://trenteducation.co.uk), a UK further and higher education college based in Nottingham.

**Live (dev):** [dev.trenteducation.co.uk](https://dev.trenteducation.co.uk)  
**Production:** [trenteducation.co.uk](https://trenteducation.co.uk)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Routing | React Router v6 (SPA) |
| Hosting & CI/CD | AWS Amplify (auto-deploy from `main`) |
| DNS | AWS Route 53 (delegated from cPanel) |
| Auth | AWS Cognito (admin dashboard) |
| API | AWS API Gateway + Lambda (Node.js ESM) |
| Database | AWS DynamoDB |
| Email | AWS SES |
| File Storage | AWS S3 (presigned URLs) |
| Analytics | AWS CloudWatch RUM (consent-gated) |
| Icons | Lucide React |
| PDF Export | jsPDF |
| Excel Export | xlsx |
| Tests | Playwright |

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → /dist
npm run test       # Playwright e2e tests
```

---

## Project Structure

```
src/
├── components/          # Shared UI
│   ├── Navbar            — sticky header, 3-level dropdowns, mobile accordion
│   ├── Footer            — links, contact, socials
│   ├── PageHero          — hero banner used on all inner pages
│   ├── CookieConsent     — GDPR cookie banner (gates analytics)
│   └── ErrorBoundary     — React error boundary
│
├── pages/               # Pages organised into subdirectories by domain
│   ├── InnerPage.css     — shared inner-page base styles
│   ├── CoursePage.css    — shared course-page styles
│   ├── GenericPage.jsx   — generic 404 / fallback page
│   ├── home/             — HomePage
│   ├── about/            — About, Mission & Values, Study Centres, Carbon Reduction,
│   │                       Student Life, Strategic Plan, News & Events, Careers
│   ├── approvals/        — Approvals, Awarding Orgs, Accreditations,
│   │                       Approved Supplier Status, Memberships
│   ├── courses/
│   │   ├── english/           — EnglishCourses, EnglishPolicies
│   │   ├── higher-education/  — HigherEducation, ATHE L4, ATHE L5, BTEC HND
│   │   └── further-education/ — FurtherEducation, ATHE L3, NCFE Maths L1/L2,
│   │                            SIA Door Supervisors, Digital Skills
│   ├── admissions/       — Admission overview, Apply / Enrolment
│   ├── forms/            — Enquiry, Enrolment, Job Application, International,
│   │                       English IELTS, Partnerships, New Starter
│   ├── jobs/             — 11 individual job-listing pages
│   ├── policies/         — Policies, Privacy Policy, Complaint
│   ├── contact/          — Contact page
│   └── admin/            — AdminPage (Cognito auth + DynamoDB dashboard)
│
├── config/
│   └── forms.js          — central config: API URLs, form registry, SES config
│
└── utils/
    ├── cognitoAuth.js    — Cognito sign-in, sign-up, session management
    ├── rum.js            — CloudWatch RUM initialisation (post-consent only)
    └── errorReporter.js  — JS error reporting to CloudWatch

lambda/                  # AWS Lambda source (manually deployed)
├── tec-submissions-api  — DynamoDB CRUD (save/get/update/delete)
├── tec-send-email       — SES email notifications
├── tec-presigned-url-generator — S3 presigned URLs for file upload/view
└── tec-website-error-reporter  — error logging handler

tests/                   # Playwright e2e tests
```

---

## Deployment

The site auto-deploys via **AWS Amplify** on every push to `main`. No manual steps needed.

```bash
git push origin main    # triggers Amplify build → live in ~2–4 min
```

Lambda functions are deployed separately (manual zip upload to AWS Console).

---

## Admin Dashboard

Available at `/admin`. Requires a Cognito account with an assigned group.

- Staff sign up → pending approval → admin assigns a Cognito group
- Each group restricts access to specific form types (RBAC)
- `admin` group = unrestricted access to all submissions

---

## Color Scheme

| Variable | Value | Usage |
|---|---|---|
| `--tec-green-dark` | `#1a3a2a` | Navbar, footer, headings |
| `--tec-green` | `#2d6a4f` | Buttons, accents, icons |
| `--tec-green-mid` | `#2d5a3d` | Hero overlays |
| `--tec-gold` | `#c9a84c` | CTA buttons, highlights |
| `--tec-text-light` | `#555` | Body text |

---

## Full Technical Documentation

See **[TEC-TECHNICAL-DOCUMENTATION.md](./TEC-TECHNICAL-DOCUMENTATION.md)** for the complete project reference covering all AWS services, CI/CD pipeline, DNS setup, Cognito RBAC, GDPR compliance, and a full runbook for replicating the project.
