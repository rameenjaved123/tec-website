# TEC Website — CLAUDE.md

## What This Is
React/Vite static website for Trent Education Centre. Deployed on S3/CloudFront.
Public-facing: marketing pages, 9 form types, chatbot widget, error reporting, admin dashboard.

## Stack
- **Framework**: React 18 + Vite
- **Router**: React Router v6
- **Auth (admin)**: Keycloak PKCE (`tec-website` client in `tec` realm)
- **Backend API**: TEC Management FastAPI at `/api/v1` (replaces AWS Lambda functions)

## Branch for FastAPI migration
`feature/fastapi-migration` — replaces all Lambda URLs + Cognito with FastAPI + Keycloak.

## Security Architecture (feature/fastapi-migration branch)
- **Website service calls** (form submit, chat, error report, S3 upload, email send): authenticated via Keycloak `website_public` role (ROPC service account `website.service`). `api.js` obtains a Bearer token on first call and caches/refreshes it automatically. Additionally protected by CORS origin allowlist + IP rate limiting + optional reCAPTCHA v3.
- **Admin calls** (list/update/delete submissions, chat analytics): moved to VLE frontend (tec-cms) — no admin UI remains on this site
- reCAPTCHA enabled by setting `VITE_RECAPTCHA_SITE_KEY` (frontend) and `RECAPTCHA_ENABLED=true` + `RECAPTCHA_SECRET_KEY` (backend)

## Key Files
- `src/utils/api.js` — central API client (public calls, reCAPTCHA helper) — no X-API-Key, no admin calls
- `src/config/forms.js` — form registry, all API calls, email builders (no more Lambda URLs)
- `src/utils/errorReporter.js` — JS error reporter → FastAPI `/website/errors`
- `src/components/ChatWidget/ChatWidget.jsx` — chatbot → FastAPI `/website/chat`

> Admin/form management has moved entirely to the VLE frontend (`tec-cms` at `website_admin` role).

## Environment Variables
```
VITE_API_URL=http://localhost:8000/api/v1
VITE_KC_URL=http://localhost:8080
VITE_KC_REALM=tec
VITE_KC_CLIENT_ID=tec-website
VITE_KC_SVC_USERNAME=website.service      # KC service account username
VITE_KC_SVC_PASSWORD=Website@TEC2024!    # KC service account password
VITE_RECAPTCHA_SITE_KEY=                  # reCAPTCHA v3 site key (leave blank for dev)
VITE_S3_WEBSITE_BUCKET=tec-form-uploads
VITE_AWS_REGION=eu-west-2
```

## Form Type → FastAPI Slug Mapping
| Form name | FastAPI slug |
|---|---|
| Enquiry Form | enquiry |
| Application Form | application |
| Enrolment Form | enrolment |
| International Application | international-application |
| Job Application | job-application |
| New Starter Form | new-starter |
| Partnerships & Collaborations | partnerships |
| English & IELTS Application | english-ielts |
| Complaint Form | complaint |
