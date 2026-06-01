# TEC Website — Test Cases
> Last updated: June 2026  
> Purpose: Regression reference. If a future change breaks any of these, revert or fix before deploying.

---

## HOW TO USE
1. Run `npm run dev` → open `http://localhost:5173`
2. Go through each section below
3. Mark ✅ PASS or ❌ FAIL next to each case
4. Any ❌ FAIL = do NOT push until fixed

---

## 1. GLOBAL — NAVBAR

| # | Test | Expected Result |
|---|------|----------------|
| N-01 | Load any page | Navbar is sticky at top, dark green background |
| N-02 | Desktop (>1280px) | Logo left, nav items centered, no hamburger visible |
| N-03 | Mobile (≤1280px) | Only logo + hamburger icon visible, no nav links |
| N-04 | Click hamburger on mobile | Mobile menu drops down with all 6 nav items |
| N-05 | Click hamburger again | Mobile menu closes |
| N-06 | Mobile menu — click item with chevron (e.g. About) | Sub-items expand below |
| N-07 | Mobile menu — navigate to a page | Menu closes, correct page loads |
| N-08 | Desktop — hover "Admission" | Dropdown appears with Overview, Enrolment |
| N-09 | Desktop — hover "Higher Education Courses" | Dropdown with ATHE Level 4&5, BTEC HND |
| N-10 | Desktop — hover "About" | Dropdown with all About sub-pages |
| N-11 | Desktop — hover "About" → hover "Approvals" | Nested sub-dropdown appears (Awarding Orgs, Accreditations, Approved Supplier Status) |
| N-12 | Click TEC logo | Navigates to `/` (Home) |
| N-13 | Search DEV button visible | Only visible at `localhost` (dev mode), NOT on `dev.trenteducation.co.uk` |
| N-14 | Search DEV — type a page name | Matching pages appear in dropdown |
| N-15 | Search DEV — click a result | Navigates to correct page |
| N-16 | Navigate between pages | Page scrolls to top on each navigation |

---

## 2. GLOBAL — FOOTER

| # | Test | Expected Result |
|---|------|----------------|
| F-01 | Footer visible on all pages | Dark green footer at bottom of every page |
| F-02 | Footer — social icons | Facebook, LinkedIn, YouTube, Instagram icons visible and clickable |
| F-03 | Footer — address/contact info | Phone and email visible |
| F-04 | Footer links | Quick links navigate to correct pages |
| F-05 | Footer not on `/admin` | Admin page has no footer |

---

## 3. HOME PAGE (`/`)

| # | Test | Expected Result |
|---|------|----------------|
| H-01 | Hero slider visible | Rotating banner with slides visible |
| H-02 | Slider arrows | Left/right arrows navigate slides |
| H-03 | Slider dots | Dots at bottom indicate current slide |
| H-04 | Banner ticker below slider | "See our Latest Access and Participation Statement 2026-27" link visible |
| H-05 | About section | Text about TEC establishing in 2012 visible |
| H-06 | Course cards section | HE, FE, EL course cards visible with links |
| H-07 | Stats/numbers section | Key numbers (students, years, etc.) visible |
| H-08 | Study centres section | Centres listed or shown |
| H-09 | News/events section | News cards or section visible |
| H-10 | Page loads without errors | No console errors, no broken images |

---

## 4. ADMISSION (`/admission`)

| # | Test | Expected Result |
|---|------|----------------|
| A-01 | PageHero banner visible | Full-width banner with "Admission" title |
| A-02 | Banner image loads | No broken image placeholder |
| A-03 | Page content visible | Admission info text present |
| A-04 | Apply/Enrol link | Button or link to `/apply` works |
| A-05 | Two-column layout on desktop | Sidebar and main content side by side |
| A-06 | Single column on mobile | Stacks vertically below 768px |

---

## 5. ENROLMENT / APPLY (`/apply`)

| # | Test | Expected Result |
|---|------|----------------|
| AP-01 | PageHero visible | Banner with title |
| AP-02 | Application form or info visible | Form fields or enrolment instructions shown |
| AP-03 | Form links work | External form links open in new tab |

---

## 6. ENGLISH LANGUAGE COURSES (`/english-language-courses`)

| # | Test | Expected Result |
|---|------|----------------|
| EL-01 | PageHero visible | Banner with title |
| EL-02 | Course listings visible | EL courses listed with details |
| EL-03 | Course levels shown | ESOL Entry 1–3, Level 1, Level 2 mentioned |
| EL-04 | Apply/enquire links work | Links navigate or open correctly |

---

## 7. ENGLISH LANGUAGE POLICIES (`/policies-english`)

| # | Test | Expected Result |
|---|------|----------------|
| EP-01 | PageHero visible | Banner with title |
| EP-02 | Policy list visible | EL-specific policies listed |
| EP-03 | PDF links work | "View PDF" opens PDF in new tab |

---

## 8. HIGHER EDUCATION COURSES (`/higher-education`)

| # | Test | Expected Result |
|---|------|----------------|
| HE-01 | PageHero visible | Banner with title |
| HE-02 | Course cards or list | ATHE and BTEC courses shown |
| HE-03 | Links to individual courses | Clicking course navigates to correct page |

---

## 9. ATHE LEVEL 4 (`/athe-level-4`)

| # | Test | Expected Result |
|---|------|----------------|
| AT4-01 | PageHero visible | Banner with course title |
| AT4-02 | Course details visible | Modules, entry requirements, duration shown |
| AT4-03 | Apply button | Links to enrolment/apply page |
| AT4-04 | ATHE logo visible | ATHE awarding body logo shown |

---

## 10. ATHE LEVEL 5 (`/athe-level-5`)

| # | Test | Expected Result |
|---|------|----------------|
| AT5-01 | PageHero visible | Banner with course title |
| AT5-02 | Course details visible | Level 5 specific content shown |
| AT5-03 | Apply button works | Navigates correctly |

---

## 11. BTEC HND (`/btec-hnd`)

| # | Test | Expected Result |
|---|------|----------------|
| BT-01 | PageHero visible | Banner with course title |
| BT-02 | Pearson/BTEC branding | Pearson logo visible |
| BT-03 | Level 4 & Level 5 info | Both levels described |
| BT-04 | Apply button works | Navigates correctly |

---

## 12. FURTHER EDUCATION (`/further-education`)

| # | Test | Expected Result |
|---|------|----------------|
| FE-01 | PageHero visible | Banner with title |
| FE-02 | FE course list | ATHE L3, NCFE, SIA, Digital Skills listed |
| FE-03 | Course links work | Navigate to individual course pages |

---

## 13. ATHE LEVEL 3 (`/athe-level-3`)

| # | Test | Expected Result |
|---|------|----------------|
| AT3-01 | PageHero visible | Banner with course title |
| AT3-02 | Course content visible | Level 3 details shown |

---

## 14. NCFE MATHS L1 (`/ncfe-maths-l1`) & L2 (`/ncfe-maths-l2`)

| # | Test | Expected Result |
|---|------|----------------|
| NM-01 | PageHero visible on both | Banners with correct titles |
| NM-02 | NCFE branding | NCFE logo visible |
| NM-03 | Correct level content | L1 and L2 show different content |

---

## 15. SIA DOOR SUPERVISORS (`/sia-door-supervisors`)

| # | Test | Expected Result |
|---|------|----------------|
| SIA-01 | PageHero visible | Banner with course title |
| SIA-02 | SIA course details | Qualification info visible |
| SIA-03 | Apply link works | Links correctly |

---

## 16. DIGITAL SKILLS (`/digital-skills`)

| # | Test | Expected Result |
|---|------|----------------|
| DS-01 | PageHero visible | Banner with title |
| DS-02 | Course content visible | Digital skills info shown |

---

## 17. ABOUT (`/about`)

| # | Test | Expected Result |
|---|------|----------------|
| AB-01 | PageHero visible | Banner with "About" title |
| AB-02 | About TEC content | History, overview text present |
| AB-03 | Links to sub-pages | Mission, Study Centres, etc. links work |

---

## 18. MISSION & VALUES (`/mission-values`)

| # | Test | Expected Result |
|---|------|----------------|
| MV-01 | PageHero banner | Photo banner visible (photo-1531403009284) |
| MV-02 | Banner position | `bgPosition: center 40%` — faces/people centred |
| MV-03 | Mission statement | TEC mission text visible |
| MV-04 | Values list | Core values listed |
| MV-05 | Page layout clean | No overflow, no broken layout |

---

## 19. STUDY CENTRES (`/study-centres`)

| # | Test | Expected Result |
|---|------|----------------|
| SC-01 | PageHero banner | Digital House 2.3 entrance photo visible |
| SC-02 | Banner position | Building top/sign visible (`center 20%`) |
| SC-03 | All 5 centres listed | Nottingham HQ, SC1, SC2, Leicester, Birmingham |
| SC-04 | Centre photos load | Each centre has a photo, no broken images |
| SC-05 | Address info correct | Each centre shows correct address |
| SC-06 | Photo gallery/tabs | If tabs exist, switching works |

---

## 20. CARBON REDUCTION PLAN (`/carbon-reduction-plan`)

| # | Test | Expected Result |
|---|------|----------------|
| CR-01 | PageHero banner | Green/nature image (photo-1542601906990) |
| CR-02 | Banner zoom | `bgSize: 70%` — image zoomed out, not too close |
| CR-03 | Plan content visible | Carbon reduction commitments listed |
| CR-04 | PDF download link | Links to carbon plan PDF if present |

---

## 21. STUDENT LIFE (`/student-life`)

| # | Test | Expected Result |
|---|------|----------------|
| SL-01 | PageHero visible | Banner with title |
| SL-02 | Student activities content | Activities, events, support info shown |
| SL-03 | Images load | No broken images |

---

## 22. STRATEGIC PLAN (`/strategic-plan`)

| # | Test | Expected Result |
|---|------|----------------|
| SP-01 | PageHero visible | Banner with title |
| SP-02 | 2024–2028 plan content | Strategic goals/pillars visible |
| SP-03 | PDF download | Link to strategic plan PDF works |

---

## 23. APPROVALS (`/approvals`)

| # | Test | Expected Result |
|---|------|----------------|
| APR-01 | PageHero banner | Professional/office image (photo-1600880292203) |
| APR-02 | Banner centred | `bgPosition: center center` |
| APR-03 | Approval logos visible | Partner/awarding body logos shown |
| APR-04 | Sub-page links | Links to Awarding Orgs, Accreditations, Approved Supplier Status work |

---

## 24. AWARDING ORGANISATIONS (`/awarding-organisations`)

| # | Test | Expected Result |
|---|------|----------------|
| AO-01 | PageHero banner | Handshake image (photo-1521791136064) |
| AO-02 | Banner position | `center 40%` — hands visible |
| AO-03 | Awarding body logos | ATHE, Pearson, NCFE, etc. logos visible |
| AO-04 | Organisation descriptions | Each awarding body has description |

---

## 25. ACCREDITATIONS (`/accreditations`)

| # | Test | Expected Result |
|---|------|----------------|
| ACC-01 | PageHero banner | Office image (photo-1600880292203) |
| ACC-02 | ASIC accreditation shown | ASIC logo and details visible |
| ACC-03 | Other accreditations | All accreditations listed |

---

## 26. APPROVED SUPPLIER STATUS (`/approved-supplier-status`)

| # | Test | Expected Result |
|---|------|----------------|
| ASS-01 | PageHero banner | Pen-signing-document image (photo-1450101499163) |
| ASS-02 | Banner position | `center 40%` |
| ASS-03 | DWP/SFA logos | Government supplier logos visible |
| ASS-04 | Status description | Approved supplier info text present |

---

## 27. MEMBERSHIPS / PSRB (`/memberships`)

| # | Test | Expected Result |
|---|------|----------------|
| MB-01 | PageHero banner | Modern/professional image (photo-1686771416282) |
| MB-02 | Banner position | `center center` |
| MB-03 | PSRB memberships listed | All membership bodies shown |
| MB-04 | Logos visible | Member body logos load correctly |

---

## 28. CAREERS (`/careers`)

| # | Test | Expected Result |
|---|------|----------------|
| CA-01 | PageHero banner | Office/team image (photo-1551434678) |
| CA-02 | Banner position | `center 40%` |
| CA-03 | "Current Vacancies" section | Open jobs with green "Now Hiring" badge |
| CA-04 | "Previous Vacancies" section | Closed jobs at 70% opacity with "Job Closed" badge |
| CA-05 | Open jobs — Apply Here button | External link opens in new tab |
| CA-06 | Open jobs — Learn More button | Navigates to job detail page |
| CA-07 | Closed jobs — no Apply button | Apply button absent on closed roles |
| CA-08 | Equal opportunities text | Present in intro paragraph |

---

## 29. COMPLAINT (`/complaint`)

| # | Test | Expected Result |
|---|------|----------------|
| CO-01 | PageHero banner | Professional image (photo-1758519288178) |
| CO-02 | Banner position | `center center` |
| CO-03 | "How to complain?" section | Email address `complaints@trenteducation.co.uk` visible |
| CO-04 | Online complaint form link | Gold link to Microsoft Forms opens in new tab |
| CO-05 | Three process cards | Acknowledgement, Investigation, Resolution cards with icons |
| CO-06 | Timelines correct | 3 working days (acknowledgement), 10–21 days (investigation) |
| CO-07 | Sidebar quick links | "Submit a Complaint" gold button + "Complaints Policy (PDF)" green button |
| CO-08 | "Contact Us" button | Links to `/contact` |
| CO-09 | Two-column layout desktop | Main + sidebar side by side |

---

## 30. CONTACT (`/contact`)

| # | Test | Expected Result |
|---|------|----------------|
| CT-01 | PageHero banner | Phone/contact image (photo-1512428559087) |
| CT-02 | Phone tile | (+44) 1157950171 visible and clickable |
| CT-03 | Email tile | info@trenteducation.co.uk visible and clickable |
| CT-04 | All 5 study centres shown | Nottingham HQ, SC1, SC2, Leicester, Birmingham |
| CT-05 | Centre photos load | No broken images |
| CT-06 | Addresses correct | Each centre has correct address |
| CT-07 | Bus info visible | Transport info shown per centre |
| CT-08 | Social media icons | Facebook, LinkedIn, YouTube, Instagram — 4 icons visible |
| CT-09 | Social links open correctly | Each opens correct social profile in new tab |
| CT-10 | Opening hours | Monday–Sunday 9am–6pm shown |
| CT-11 | Centre cards — desktop | Photo left, info right (grid layout) |
| CT-12 | Centre cards — mobile | Stacks vertically |

---

## 31. POLICIES (`/policies`)

| # | Test | Expected Result |
|---|------|----------------|
| PO-01 | PageHero banner | Document/pen image (photo-1450101499163) |
| PO-02 | Banner position | `center 40%` |
| PO-03 | All policies listed | ~26 policies visible |
| PO-04 | Policy sections grouped | General/HE, Fees & Terms, English Language sections |
| PO-05 | "View PDF" links | Each policy has gold "View PDF" link that opens PDF |
| PO-06 | FileText icon | Green icon shown next to each policy name |

---

## 32. NEWS & EVENTS (`/news-events`)

| # | Test | Expected Result |
|---|------|----------------|
| NE-01 | PageHero visible | Banner with title |
| NE-02 | News/event cards | Articles or events listed |
| NE-03 | Dates shown | Publication dates visible on cards |

---

## 33. JOB DETAIL PAGES

Covers: `/marketing-executive`, `/job-lecturer`, `/job-teaching-assistant`, `/job-student-support-officer`

| # | Test | Expected Result |
|---|------|----------------|
| JD-01 | Each page loads | No 404 error |
| JD-02 | Job title as heading | Correct role title shown |
| JD-03 | Job description visible | Responsibilities and requirements listed |
| JD-04 | Apply button | Links to external job application form |

---

## 34. FORM PAGES

Covers: `/apply`, `/enquiry-form`, `/enrolment-form`, `/international-application`, `/english-ielts-application`, `/job-application`, `/partnerships-form`

| # | Test | Expected Result |
|---|------|----------------|
| FM-01 | Each form page loads | No 404, page renders |
| FM-02 | Form fields visible | Input fields, dropdowns present |
| FM-03 | Required fields marked | Required indicator shown |
| FM-04 | Submit button present | Submit/Send button visible |
| FM-05 | Form validation | Empty required fields show error on submit |

---

## 35. ADMIN PAGE (`/admin`)

| # | Test | Expected Result |
|---|------|----------------|
| ADM-01 | `/admin` shows login | Login screen, no navbar/footer |
| ADM-02 | Wrong password | Error message shown |
| ADM-03 | Correct password | Logs in, shows dashboard |
| ADM-04 | Sidebar fixed | Dark sidebar stays on left when content scrolls |
| ADM-05 | Content scrolls inside container | Scrolling stays within content area, no white overflow outside |
| ADM-06 | Table contained | Table scrolls horizontally inside its card, not outside page |
| ADM-07 | Stat cards visible | 4 stat cards at top (totals by form type) |
| ADM-08 | Sidebar nav items | All form types listed with submission counts |
| ADM-09 | Click a nav item | Filters table to that form type |
| ADM-10 | Search bar | Filters submissions by name/email in real time |
| ADM-11 | Click a row | Modal opens with full submission details |
| ADM-12 | Modal — status buttons | New, Reviewed, Contacted, Rejected buttons change status |
| ADM-13 | Modal — close button | Modal closes |
| ADM-14 | Pagination | Page buttons navigate through submissions |
| ADM-15 | Logout button | Returns to login screen |
| ADM-16 | `/admin` not in navbar | Admin not listed in any nav menu |

---

## 36. RESPONSIVENESS (All Pages)

| # | Test | Expected Result |
|---|------|----------------|
| R-01 | 1440px (desktop) | Full navbar, two-column layouts, no overflow |
| R-02 | 1280px (breakpoint) | Hamburger menu appears, desktop nav hides |
| R-03 | 768px (tablet) | Single-column content, cards stack |
| R-04 | 375px (mobile) | All content readable, no horizontal scroll |
| R-05 | No horizontal scroll | At any viewport, page doesn't scroll horizontally |

---

## 37. PERFORMANCE & ASSETS

| # | Test | Expected Result |
|---|------|----------------|
| PA-01 | TEC logo visible | `/assets/logos/tec-logo-transparent.png` loads in navbar |
| PA-02 | All PageHero banners load | No grey/broken banner on any page |
| PA-03 | Campus photos load | Study Centres, Contact page photos all load |
| PA-04 | Unsplash images load | External Unsplash CDN images render (requires internet) |
| PA-05 | PDF files accessible | Policy PDFs open when "View PDF" clicked |
| PA-06 | No console errors | Browser DevTools console shows no red errors on any page |
| PA-07 | Page titles correct | Browser tab shows relevant page title |

---

## 38. LINKS INTEGRITY

| # | Test | Expected Result |
|---|------|----------------|
| LI-01 | All internal links | No link results in 404 (white "Page Not Found" screen) |
| LI-02 | External links | Open in new tab (`target="_blank"`) |
| LI-03 | Email links | `mailto:` links open mail client |
| LI-04 | Phone links | `tel:` links work on mobile |
| LI-05 | PDF links | Open PDF, not 404 |

---

## CHANGE LOG
> Record changes here so test impact can be assessed

| Date | Change | Pages Affected | Tested By |
|------|--------|---------------|-----------|
| Jun 2026 | Initial build | All | Claude |
| Jun 2026 | Removed DevSearch from navbar | Navbar | Claude |
| Jun 2026 | Restored DevSearch (dev-only) | Navbar | Claude |
| Jun 2026 | Admin scroll fix (overflow-y: auto, height: 100vh) | /admin | Claude |
| Jun 2026 | Added PageHero to ComplaintPage | /complaint | Claude |
| Jun 2026 | Updated all page banners with Unsplash images | All inner pages | Claude |
