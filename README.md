# Karthik Reddy — Portfolio

A Next.js portfolio built for hiring managers: pick the role you're hiring for and the projects, evidence and toolkit re-rank to match. Every project opens into a short case study (problem, what I built, results, honest limitations), every tool links to the projects that use it, and a Gemini assistant answers screening questions from the same data.

**Live:** set after the Vercel deploy (see `NEXT_PUBLIC_SITE_URL`).

## How the content works

All content lives in three data files, so the page, the toolkit evidence and the chat assistant can't drift apart:

| File | What it holds |
|---|---|
| `lib/projects.ts` | Every project: status, metrics, case study, tools, links, and a fit score per role |
| `lib/skills.ts` | Tools & technologies, tiered Production / Shipped / Coursework |
| `lib/roles.ts` | The five hiring roles for the role lens, with pitch and focus tools |

`lib/knowledge-base.ts` generates the assistant's system prompt from those files. Shareable links: `?role=ds` pre-selects a role, `?project=gridcast` opens a case study.

---

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript (strict mode)
- **Styling:** Tailwind CSS v3.4
- **AI:** Google Gemini (default `gemini-2.5-flash-lite`, override with `GEMINI_MODEL`) via Vercel AI SDK
- **Rate limiting:** Upstash Redis (free tier) with in-memory fallback
- **Forms:** Formspree (free tier)
- **Analytics:** Vercel Web Analytics
- **Hosting:** Vercel (free Hobby tier)
- **Fonts:** Instrument Serif (display), Inter (body), JetBrains Mono (code/labels) — all via `next/font/google`

Monthly cost at portfolio traffic levels: **AUD $0**.

---

## Local development

### Prerequisites
- Node.js 20+ ([nodejs.org](https://nodejs.org))
- A code editor (VS Code recommended)
- A terminal

### Setup

```bash
# 1. Clone or download
git clone https://github.com/YOUR-USERNAME/karthik-portfolio
cd karthik-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Then edit .env.local with your real keys (see below)

# 4. Resume lives at public/Karthik-Reddy-Resume.pdf (replace it to update)

# 5. Run the dev server
npm run dev

# 6. Open http://localhost:3000
```

### Required environment variables

| Variable | Where to get | Why |
|---|---|---|
| `GEMINI_API_KEY` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — free, 1,500 req/day | Powers the hero chat |
| `UPSTASH_REDIS_REST_URL` | [console.upstash.com](https://console.upstash.com) — free Redis tier | Rate-limits chat to 20/hr per IP |
| `UPSTASH_REDIS_REST_TOKEN` | Same console as above | Same |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | [formspree.io](https://formspree.io) — free, 50 submissions/mo | Contact form |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL (optional on Vercel: falls back to the production domain) | For OG tags + canonical |
| `GEMINI_MODEL` | Optional | Override the Gemini model id |

Without `UPSTASH_*` vars, the chat falls back to an in-memory rate limiter — fine for local dev, less robust in production (resets on each cold start).

Without `GEMINI_API_KEY`, the chat shows a graceful "email me directly" fallback. Without `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, the contact form is replaced by a screening-facts card.

---

## Project structure