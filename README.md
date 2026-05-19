# Karthik Reddy — Portfolio

A production-ready Next.js portfolio with an embedded AI assistant trained on Karthik's professional background. Built to convert Australian recruiters in under 30 seconds.

**Live:** [karthik-reddy.vercel.app](https://karthik-reddy.vercel.app)

---

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript (strict mode)
- **Styling:** Tailwind CSS v3.4
- **AI:** Google Gemini 2.0 Flash via Vercel AI SDK
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

# 4. Drop your resume PDF into /public
# File must be named: Karthik-Reddy-Resume.pdf

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
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL | For OG tags + canonical |

Without `UPSTASH_*` vars, the chat falls back to an in-memory rate limiter — fine for local dev, less robust in production (resets on each cold start).

Without `GEMINI_API_KEY`, the chat shows a graceful "email me directly" fallback.

---

## Project structure