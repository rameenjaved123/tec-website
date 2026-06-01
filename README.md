# Trent Education Centre — React Website

A full React + Vite rebuild of [trenteducation.co.uk](https://trenteducation.co.uk), using React Router for multi-page navigation, CSS variables for theming, and a mobile-responsive layout.

## Project Structure

```
src/
  components/
    Navbar.jsx / Navbar.css      — sticky header with dropdowns
    Footer.jsx / Footer.css      — links, contact, socials
  pages/
    HomePage.jsx / HomePage.css  — hero slider, courses, CTA
    AdmissionPage.jsx            — admission overview + steps
    EnglishCoursesPage.jsx       — ESOL & Functional Skills
    HigherEducationPage.jsx      — ATHE / BTEC courses
    FurtherEducationPage.jsx     — Level 3, Maths, SIA, Digital
    AboutPage.jsx                — about TEC, vision, values
    PoliciesPage.jsx             — policy documents list
    ContactPage.jsx              — contact info & social links
    ApplyPage.jsx                — application form redirect
    GenericPage.jsx              — placeholder for sub-pages
    InnerPage.css                — shared inner page styles
  index.css                      — global CSS variables & resets
  App.jsx                        — router + layout shell
  main.jsx                       — React entry point
```

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → /dist
```

## Deploying to GitHub + Netlify/Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: TEC React site"
git remote add origin https://github.com/YOUR_USERNAME/tec-website.git
git push -u origin main
```

### 2a. Deploy to Netlify (recommended)

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connect your GitHub account, select `tec-website`
3. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy site**
5. In **Site settings → Domain management**, add your custom domain (`trenteducation.co.uk`)
6. Update your domain's DNS:
   - Add a CNAME record: `www` → `[your-netlify-site].netlify.app`
   - Add an A record: `@` → Netlify's load balancer IPs (shown in Netlify dashboard)

### 2b. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → import from GitHub
2. Framework: **Vite** (auto-detected)
3. Click **Deploy**
4. In **Settings → Domains**, add your custom domain

## Color Scheme

| Variable | Value | Usage |
|---|---|---|
| `--tec-green-dark` | `#122618` | Navbar, footer, hero overlay |
| `--tec-green` | `#1a3a2a` | Headings, buttons, accents |
| `--tec-gold` | `#c9a227` | Highlights, CTA buttons |
| `--tec-gray` | `#f5f5f5` | Section backgrounds |
