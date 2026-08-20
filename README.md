# Jil Padua — Developer Portfolio

Recruiter-focused portfolio built with Next.js 16 and Sanity CMS.

## Structure

- `web/` — Next.js frontend
- `studio/` — Sanity Studio for content management

## Setup

1. Copy `.env.example` values into:
   - `web/.env.local`
   - `studio/.env`
2. Install dependencies:

```bash
cd web && npm install
cd ../studio && npm install
```

3. Run locally:

```bash
# Terminal 1
cd studio && npm run dev

# Terminal 2
cd web && npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3333

## Content

Edit content in Sanity Studio. Key document types:

- Site Settings
- Projects (with case-study fields)
- Experience
- Skill Groups
- About

## Analytics and notifications

- Enable **Web Analytics** in the Vercel project dashboard. `@vercel/analytics` is already mounted in the Next.js root layout.
- High-intent actions (Recruiter Mode entered, resume click, case study view, contact click) can email you via `POST /api/portfolio-notify`.
- Set the server-only SMTP, Upstash, and `NOTIFICATIONS_ENABLED=true` variables from `.env.example` in `web/.env.local` and Vercel. `NEXT_PUBLIC_SITE_URL` must match the deployed origin.
- Local rate limits use in-memory storage and reset on restart. Production anti-spam requires Upstash Redis.
- Rollback: set `NOTIFICATIONS_ENABLED=false` to stop emails immediately without removing analytics.

## Deploy

- **Web:** Vercel (set env vars from `.env.example`; Root Directory `web`)
- **Studio:** `cd studio && npm run deploy`

## Content gaps to fill in Studio

- **Email** and **LinkedIn** in Site Settings (currently empty)
- **Engineering challenges** for all three projects (left empty intentionally — add real problem/investigation/solution/result stories)
- **Project screenshots** via hero images in Sanity
- **Live URLs** where applicable

## Sanity project

- Project ID: `x6umjhs1`
- Dataset: `production`
