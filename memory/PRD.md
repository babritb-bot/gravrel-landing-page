# Gravrel — Green Data Solutions (Rebuild)

## Original Problem Statement
User has an existing Hostinger-built website at **gravrel.com** and wants to completely change the UI to match the look-and-feel of **gravrelaetherops.com** (the GravRel AetherOps admin console). Content & links from gravrel.com must remain intact. An eye-catching top button must link to gravrelaetherops.com (opens in new tab). Contact form should email submissions to support@gravrel.com via Resend.

## User Choices
- **Option A** — rebuild as a new Emergent web app (React + FastAPI + MongoDB)
- **Design** — replicate gravrelaetherops.com as closely as possible (based on user-supplied screenshots of the AetherOps console)
- **Backend feature** — contact form via **Resend**
- **Console button** — opens https://gravrelaetherops.com in a **new tab**, must visually stand out from regular nav buttons
- **Logo** — user will add later (placeholder green-circle mark in use)

## Architecture
- **Frontend**: React 19 + Tailwind + Bricolage Grotesque (display) / Manrope (body) / JetBrains Mono (accents)
- **Backend**: FastAPI on port 8001, all routes prefixed `/api`
- **DB**: MongoDB (collections: `contact_submissions`, `newsletter_subscribers`)
- **Email**: Resend SDK (async via `asyncio.to_thread`)
- **Routing**: Single-page with anchor sections (#about, #services, #certifications, #contact)

## Design Language (matches AetherOps screenshots)
- Background: `#050708` (near-black) with subtle grid + emerald radial glow
- Primary accent: emerald `#10b981` → `#14d399` (pill buttons, badges, live dots)
- Cards: dark navy panels (`#0f1419`) with subtle white borders, white "stat cards" inside the hero console mock (matches the dashboard look)
- Eye-catching **Launch AetherOps** button: gradient-filled pill, animated shine sweep, pulsing inner dot, soft glow ring
- Sections reveal on scroll via IntersectionObserver

## What's Been Implemented (Jan 2026)
- ✅ Full single-page marketing site mirroring gravrel.com content (hero, about, stats, services, certifications, contact, footer)
- ✅ Navbar with eye-catching glowing **Launch AetherOps** CTA (target=_blank → gravrelaetherops.com), mobile menu
- ✅ Hero with console-style stat preview card (Running VMs, Solar output, CO₂ saved, This month)
- ✅ About section with image + 4 feature cards
- ✅ Stats grid (150+, 15, 100+, 0 litres water)
- ✅ Services (Water-Free Hosting, Energy Efficient) + 4-product strip (VMs, DBs, Storage, ML/GPU)
- ✅ Certifications cards (DPDP, Carbon-Aware, ISO-aligned)
- ✅ Newsletter subscribe form + main contact form (name/email/phone/message)
- ✅ Footer with socials, contact details, secondary Launch AetherOps button
- ✅ Backend endpoints: `GET /api/health`, `GET /api/`, `POST /api/contact`, `POST /api/newsletter`
- ✅ Resend integration with HTML email template, graceful sandbox-mode handling (stores in DB even if Resend rejects)
- ✅ MongoDB persistence verified via 9/9 pytest cases
- ✅ Frontend critical flows verified 100% (Playwright)

## Core Requirements (Static)
- All gravrel.com content preserved
- Visual parity with gravrelaetherops.com console aesthetic
- Single, prominent CTA to launch the AetherOps console
- Contact form → support@gravrel.com via Resend + persisted in MongoDB

## Prioritized Backlog
- **P0** — User must verify `gravrel.com` domain at https://resend.com/domains and update `SENDER_EMAIL` in `/app/backend/.env` to e.g. `noreply@gravrel.com` to enable actual email delivery (currently in Resend sandbox mode → emails stored only)
- **P1** — Upload final brand logo (replace placeholder green circle in `Navbar.jsx` + `Footer.jsx`)
- **P2** — Add `/admin` view to browse contact submissions
- **P2** — Newsletter dedup (unique index on email)
- **P2** — Pricing page
- **P2** — Student-credit onboarding flow
- **P3** — Move `logger` definition above route declarations (style only)

## Next Tasks
1. User verifies domain in Resend → switch `SENDER_EMAIL`
2. User shares final logo → swap placeholder mark
3. Deploy via Emergent → point gravrel.com DNS to the new app

## Test Credentials
N/A — public marketing site, no auth.
