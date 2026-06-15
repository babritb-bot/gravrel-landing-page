# Gravrel — Green Data Solutions (Rebuild)

## Original Problem Statement
User has an existing Hostinger-built website at **gravrel.com** and wants to completely change the UI to match the look-and-feel of **gravrelaetherops.com** (the AetherOps admin console). Content & links from gravrel.com must remain intact. An eye-catching top button must link to gravrelaetherops.com (opens in new tab). Contact form should email submissions to support@gravrel.com via Resend.

## User Choices
- **Option A** — rebuild as a new Emergent web app
- **Design** — replicate gravrelaetherops.com closely (based on user-supplied console screenshots)
- **Backend** — contact form via Resend
- **Console button** — opens https://gravrelaetherops.com in new tab, visually stands out
- **Logo** — user adds later

## Pages from gravrel.com (Hostinger source) — all included
1. **Home** — Hero, About, Stats, Services, Newsletter
2. **About** — About copy, Stats, Our Projects (4 cards), Contact
3. **Team** — Babrit Behera CEO & CTO, Stats, Testimonials (Anita Roy + Ravi Kumar), Contact
4. **Contact** — Email/phone/socials/form

All consolidated into a single-page React app with anchor sections (`#about`, `#services`, `#projects`, `#team`, `#testimonials`, `#certifications`, `#contact`).

## Architecture
- **Frontend**: React 19 + Tailwind + Bricolage Grotesque / Manrope / JetBrains Mono
- **Backend**: FastAPI on port 8001, `/api/*` routes
- **DB**: MongoDB (`contact_submissions`, `newsletter_subscribers`)
- **Email**: Resend SDK (async via `asyncio.to_thread`)

## What's Been Implemented (Jan 2026)
### v1 (initial)
- ✅ Full single-page marketing site (hero, about, stats, services, certifications, contact, footer)
- ✅ Navbar with eye-catching Launch AetherOps CTA
- ✅ Backend endpoints + Resend email + Mongo persistence
- ✅ 9/9 backend pytest, 100% frontend critical flows passed

### v2 (this iteration — content parity with gravrel.com)
- ✅ **Tagline bar** at very top: "Gravrel — where gravity meets relativity..."
- ✅ **Hero redesigned** — removed awkward fake console card, now uses real gravrel.com futuristic-tech background image, gradient text effect, 4 feature chips
- ✅ **Projects section** — 4 cards (Green Hosting, Student Support, Small Business, Sustainability) with real Unsplash images from gravrel.com
- ✅ **Team section** — Babrit Behera portrait, quote, 4 fact-cards (Based in, Stack, Mission, Believes in)
- ✅ **Testimonials section** — Anita Roy (Mumbai, Founder) + Ravi Kumar (Delhi, CS Student) with photos & 5-star ratings
- ✅ **About section** — uses the actual `gemini_generated_image` from gravrel.com
- ✅ Navbar now shows: About · Services · Projects · Team · Contact

## Design Language
- Deep dark bg `#050708` + emerald `#10b981` accents
- Bricolage Grotesque display + Manrope body
- Pill buttons, animated shine on Launch AetherOps CTA, pulsing live dots, scroll-reveal IntersectionObserver
- Console-aesthetic styling everywhere — matches the AetherOps screenshots

## Prioritized Backlog
- **P0** — Verify `gravrel.com` domain at https://resend.com/domains → switch `SENDER_EMAIL` to enable real email delivery
- **P1** — Replace placeholder logo + replace stock portrait of Babrit Behera with real photo
- **P2** — Admin view for contact submissions
- **P2** — Newsletter dedupe (unique index on email)
- **P3** — Pricing page, student-credit onboarding

## Next Tasks
1. User verifies domain in Resend → switch `SENDER_EMAIL`
2. User shares final logo + Babrit's real photo → swap placeholders
3. Deploy via Emergent → point gravrel.com DNS

## Test Credentials
N/A — public marketing site, no auth.
