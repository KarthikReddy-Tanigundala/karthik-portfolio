# DEPLOY.md — From Zero to Live in 30 Minutes

This guide assumes you've never used Vercel or GitHub before. Every step is explicit.

---

## Part 1 — One-Time Setup (15 min)

### Step 1.1 — Create a GitHub account (3 min)

1. Go to [github.com](https://github.com)
2. Click **Sign up**
3. Use your `karthikreddytanigundala@gmail.com` email
4. Pick a username — `KarthikReddy-Tanigundala` to match your existing GitHub
5. Verify your email

### Step 1.2 — Install Node.js + Git (5 min)

**On Windows:**
1. Download Node.js LTS from [nodejs.org](https://nodejs.org) → run installer → click Next on everything
2. Download Git from [git-scm.com](https://git-scm.com/download/win) → run installer → Next on everything

**On Mac:**
1. Open Terminal (Cmd+Space, type "terminal")
2. Paste this and press Enter — installs everything:
```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   brew install node git
```

**Verify it worked:**
Open a fresh Terminal/Command Prompt and run:
```bash
node --version
git --version
```
Both should print version numbers. If yes — done.

### Step 1.3 — Install VS Code (2 min)

Download from [code.visualstudio.com](https://code.visualstudio.com). Run installer. Default settings.

### Step 1.4 — Get all 3 free API keys (5 min)

You'll paste these into Vercel later. Keep them in a notepad temporarily.

**Gemini API key:**
1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **Create API key** → **Create API key in new project**
4. Copy the key (starts with `AIza...`)
5. Paste into your notepad as `GEMINI_API_KEY=AIza...`

**Upstash Redis (for rate limiting):**
1. Go to [console.upstash.com](https://console.upstash.com)
2. Sign up with Google
3. Click **Create Database**
4. Name: `karthik-portfolio-ratelimit`
5. Type: Regional
6. Region: pick **Sydney** (closest to your traffic)
7. Plan: Free
8. Click **Create**
9. Scroll down to **REST API** section
10. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
11. Paste both into your notepad

**Formspree (for the contact form):**
1. Go to [formspree.io](https://formspree.io) → Sign up free
2. Click **+ New Form**
3. Name: `Portfolio Contact`
4. Your email: `karthikreddytanigundala@gmail.com`
5. Click **Create Form**
6. Copy the endpoint URL (looks like `https://formspree.io/f/xyzabc123`)
7. Paste into your notepad as `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xyzabc123`

---

## Part 2 — Build the Project Locally (10 min)

### Step 2.1 — Create the project folder

On your Desktop, make a new folder called `karthik-portfolio`. Right-click → "Open with VS Code" (or open VS Code → File → Open Folder → pick it).

### Step 2.2 — Open the VS Code terminal

In VS Code, press **Ctrl+`** (or **Cmd+`** on Mac). A terminal opens at the bottom.

### Step 2.3 — Create the folder structure

Paste this into the terminal and press Enter:

```bash
mkdir -p app/api/chat components/chat components/sections components/ui lib public
```

### Step 2.4 — Create every file from Responses 1, 2, 3, and 4

Now you'll create each file one by one. In VS Code:

1. Click the **New File** icon (top-left, looks like a page with a +) next to the folder name
2. Type the filename including its folder path (e.g. `lib/utils.ts`)
3. Press Enter
4. Paste the contents I gave you in the responses
5. Save with **Ctrl+S** (Cmd+S on Mac)
6. Repeat for every file

**Full file list** (in order — easiest to do them in this sequence):

**Root files (Response 1):**
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `.env.example`
- `.gitignore`

**Library files (Response 1):**
- `lib/utils.ts`
- `lib/knowledge-base.ts`
- `lib/rate-limit.ts`
- `lib/projects.ts`

**App shell (Response 1):**
- `app/layout.tsx`
- `app/page.tsx` (use the version from Response 3)
- `app/globals.css`
- `app/opengraph-image.tsx`
- `app/icon.tsx` (Response 4)

**API route (Response 2):**
- `app/api/chat/route.ts`

**Chat components (Response 2):**
- `components/chat/chat-panel.tsx`
- `components/chat/message-list.tsx`
- `components/chat/message-bubble.tsx`
- `components/chat/chat-input.tsx`
- `components/chat/example-chips.tsx`
- `components/chat/typing-indicator.tsx`

**UI primitives (Response 3):**
- `components/ui/animated-number.tsx`
- `components/ui/dot-grid.tsx`
- `components/ui/work-rights-badge.tsx`
- `components/ui/nav.tsx`
- `components/ui/project-modal.tsx`

**Page sections (Response 3):**
- `components/sections/hero.tsx`
- `components/sections/pitch.tsx`
- `components/sections/numbers.tsx`
- `components/sections/selected-work.tsx`
- `components/sections/how-i-work.tsx`
- `components/sections/background.tsx`
- `components/sections/currently.tsx`
- `components/sections/contact.tsx`
- `components/sections/footer.tsx`

**Documentation (Response 4):**
- `README.md`
- `DEPLOY.md`
- `public/ASSETS-CHECKLIST.md`

### Step 2.5 — Create your `.env.local` file

In VS Code root, create a new file called `.env.local`. Paste: