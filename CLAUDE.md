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

## Production URLs
- Website: `https://trenteducation.ac.uk` (Amplify — branch `main`)
- API: `https://api.trenteducation.ac.uk/api/v1`
- Keycloak: `https://auth.trenteducation.ac.uk`

**Amplify environment variables (set in Amplify Console, NOT in git):**
```
VITE_API_URL=https://api.trenteducation.ac.uk/api/v1
VITE_KC_URL=https://auth.trenteducation.ac.uk
VITE_KC_REALM=tec
VITE_KC_CLIENT_ID=tec-website
VITE_KC_SVC_USERNAME=website.service
VITE_KC_SVC_PASSWORD=Website@TEC2024!
VITE_S3_WEBSITE_BUCKET=tec-form-uploads
VITE_AWS_REGION=eu-west-2
```

## Local Development Environment Variables
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

## Keycloak Client — tec-website (IMPORTANT after domain changes)

The `tec-website` Keycloak client must have `trenteducation.ac.uk` in its **Web Origins** and **Valid Redirect URIs**, otherwise the browser at `trenteducation.ac.uk` cannot obtain a token from Keycloak (CORS block). This causes form submissions to silently fail — the form shows "Enquiry Received!" but nothing is saved to the database.

**Fix:** Keycloak Admin → `tec` realm → Clients → `tec-website` → Settings:
- **Web origins**: `https://trenteducation.ac.uk`, `https://www.trenteducation.ac.uk`
- **Valid redirect URIs**: `https://trenteducation.ac.uk/*`, `https://www.trenteducation.ac.uk/*`

After any domain change, always update Keycloak client origins — the `allowed-origins` claim in the JWT shows what is currently configured.

## Application Form — added fields (src/pages/forms/ApplicationFormPage.jsx)
Three optional fields added to match the student record model:
- **Marital Status** (select, optional) — in Personal Information section
- **Preferred Contact Method** (select, optional) — in Personal Information section
- **Education History** (textarea, optional) — in Background section

Keys in the submitted payload: `maritalStatus`, `preferredContact`, `education` — matches `FORM_FIELD_MAP["application"]` in the backend and the `columnMap` in VLE WebsiteForms.

## Chatbot Lead Capture (src/components/ChatWidget/ChatWidget.jsx)
The chat widget now captures visitor contact details so TEC can follow up on enquiries.
- On first open, a **"How can we reach you?"** card asks for **Full name** (required), **Email** (required, validated), **Phone** (optional) and **Course interest** (optional), with **Start chat** and **Skip** buttons.
- On submit it POSTs to `/website/chat/lead` via `saveChatLead()` in `src/utils/api.js` (CORS + rate limit + reCAPTCHA action `chat_lead`), then shows a personalised confirmation message and reveals the normal chat/suggestions.
- The choice is remembered in `localStorage` (`tec_chat_lead`) so returning visitors aren't re-asked; **Skip** is also remembered. Saving never blocks chatting (failures are swallowed).
- Leads are viewable in the CMS (`vle-frontend`) under **Chatbot Leads** (`GET /website/chat/leads`, auto-purged after 30 days for GDPR). Backend sends an email notification to the admissions inbox (`digitaladmissions@trenteducation.ac.uk`) on each new lead.

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

## Strategic Plan page (src/pages/about/StrategicPlanPage.jsx) — updated to V04 (25 Mar 2026)
Narrative sections (Purpose, Aim, Mission, Vision, Values, Holistic Approach, Future Plans,
Strategic Priorities) now match the current Strategic Plan PDF
(`public/assets/documents/policies/strategic-plan.pdf`, V04):
- Purpose adds "including English language skills"; Mission adds "and international communities".
- Future Plans renamed to **Future Plans (2024-2026)** with new content (ATHE L5, Pearson HND,
  OfS application, English Language Study Centre, Ascentis ESOL, British Council IELTS/ASIC/
  Accreditation, IELTS/EAP from 2027).
- Strategic Priorities now **5** (added #5: develop quality/international recognition of English
  language courses).
The **Strategic Objectives tables** (photo-1…4), **Appendix ratio table** (photo-5) and
**References** section were removed from the page — per request, those belong in the PDF, not on a
webpage. The full detail remains in the downloadable Strategic Plan PDF (linked from the Policies
page). Unused CSS (`.sp-tables-section`, `.sp-table-img`) left in StrategicPlanPage.css.

`public/assets/documents/policies/internal-verification.pdf` replaced with the updated Internal
Verification & Quality Assurance Policy.

## Home hero responsiveness (src/pages/home/HomePage.css)
All hero slides are full pre-designed banner images (`heroSlides` in HomePage.jsx, all
`imageOnly`), sharing a ~2.665:1 ratio (2500×938 / 1700×638 / 1900×713). The hero previously
forced `height: 600px` on desktop (min-width:769px) while `.hero-full-img` used
`object-fit: cover` — at ~1280–1366px laptops the image was scaled up to cover 600px and the
left/right edges (headings like "Learn English with Confidence", "Apply Now" button) were
cropped. Fix: keep `aspect-ratio: 2500/938` on the `.hero` at every width (removed the fixed-height
desktop override) so the frame matches the banner ratio and `cover` fills it with no cropping —
fully responsive on all laptop/desktop widths. If future banners use a different ratio, update the
`.hero` aspect-ratio to match (or they will crop).

## Navbar course CTAs + Admission submenu (src/components/Navbar.jsx + Navbar.css)
- Added two course CTA links to the header: **Enquire about a course** (→ /enquiry-form,
  outlined gold) and **Apply for a course** (→ /application-form, filled gold). They sit on the
  right of the bar on desktop and in the mobile menu (`.mobile-cta`); hidden on desktop ≤1280px
  (where the nav collapses to the hamburger).
- Changed `.navbar-desktop` from an absolutely-centred full-width overlay to normal flow
  (`flex: 1`), so the centred menu no longer overlaps the logo or the new CTAs.
- Added **Enquire** (→ /enquiry-form) above **Apply** in the Admission dropdown (and mobile).
