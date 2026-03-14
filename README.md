# HEIST — Financial Crime Investigation Game

> Real scams. Real evidence. You investigate.

HEIST is a financial literacy game that puts you inside a real fraud case and makes you figure out how it happened. No tutorials. No multiple choice. Pure investigation.

Built in 24 hours for the IIIT Delhi Hackathon 2026 — Gamifying Finance track.

---

## The Problem

Every financial literacy solution in India describes fraud from the outside. RBI campaigns. SEBI alerts. YouTube explainers. None of them work — because being warned is not the same as being prepared.

HEIST puts you inside a real fraud case. You examine the same WhatsApp messages the victim received. You read the same contract they signed. You find the red flags they missed. Because you never forget something you solved yourself.

---

## How It Works

1. **Open the case file** — victim profile, evidence folder, investigator briefing
2. **Study the evidence** — 5 real-looking artifacts per case
3. **Annotate red flags** — mark suspicious items directly on the evidence
4. **Ask Meera** — your AI investigator responds only with Socratic questions, never answers
5. **Submit your hypothesis** — fraud type, first red flag, psychological biases, intervention point
6. **See the breakdown** — every manipulation tactic revealed, green if you caught it, red if you missed it
7. **Get your profile** — investigator archetype, cognitive blind spot, what to watch for next time

---

## Cases

### Case #047 — The Friendly Broker
- **Victim:** Arjun Mehta, 23, Software Engineer, Bangalore
- **Lost:** ₹2,40,000 over 4 months
- **Scammer:** Vikram Khanna, fake SEBI-registered investment advisor
- **Evidence:** WhatsApp thread, UPI transactions, investment contract, company website, bank statement
- **Tactics:** Manufactured scarcity, guaranteed returns, sunk cost escalation, buried contract clause, fake SEBI registration

### Case #048 — The Dream Job
- **Victim:** Priya Sharma, 26, MBA Graduate, Delhi
- **Lost:** ₹85,000 over 6 weeks
- **Scammer:** "TalentBridge Consulting" — fake HR placement firm
- **Evidence:** WhatsApp thread, transactions, fake offer letter, fake LinkedIn page, email thread
- **Tactics:** Advance fee fraud, fake company credentials, authority bias, escalating commitment, domain spoofing

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Vite |
| State | Zustand with persist middleware |
| Animations | Framer Motion |
| UI | Tailwind CSS with custom design tokens |
| AI Engine | Gemini 2.5 Flash |
| Backend | Node.js + Express |
| HTTP Client | Native fetch |

---

## Project Structure

```
case-file-investigator/
├── src/
│   ├── pages/
│   │   ├── Landing.tsx          — Hero + CTA
│   │   ├── CaseFile.tsx         — Case overview + evidence folder
│   │   ├── EvidenceViewer.tsx   — 5-panel evidence viewer
│   │   ├── Hypothesis.tsx       — 4-question hypothesis form
│   │   ├── Breakdown.tsx        — Timeline + tactic reveal
│   │   └── Profile.tsx          — Investigator profile + blind spot
│   ├── components/
│   │   ├── NavBar.tsx            — Progress indicator + theme toggle
│   │   ├── MeeraPanel.tsx        — AI investigator sidebar
│   │   ├── AnnotationToolbar.tsx — Red flag / suspicious / verify
│   │   └── evidence/
│   │       ├── WhatsAppEvidence.tsx
│   │       ├── TransactionsEvidence.tsx
│   │       ├── ContractEvidence.tsx
│   │       ├── WebsiteEvidence.tsx
│   │       └── BankStatementEvidence.tsx
│   ├── store/
│   │   └── investigationStore.ts — Full Zustand store
│   └── lib/
│       └── api.ts                — Meera API client
└── server/
    ├── index.js                  — Express server
    └── routes/
        └── meera.js              — Gemini integration + fallback chain
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Gemini API key from [Google AI Studio](https://aistudio.google.com)

### Frontend

```bash
# Clone the repo
git clone https://github.com/your-team/heist
cd heist

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:3001" > .env

# Start development server
npm run dev
```

App runs on `http://localhost:5173`

### Backend

```bash
cd server

# Install dependencies
npm install

# Create environment file
echo "GEMINI_API_KEY=your_key_here" > .env

# Start server
node index.js
```

Server runs on `http://localhost:3001`

---

## Scoring

Every annotation is evaluated against a list of correct targets. Only annotations on meaningful red flags count toward your score.

```
Score = (Tactics Caught / 8) × 50 + (Hypothesis Accuracy / 4) × 50
```

**Investigator Archetypes**

| Score | Archetype |
|-------|-----------|
| 90–100 | The Forensic Mind |
| 70–89 | The Pattern Tracker |
| 50–69 | The Learning Investigator |
| 30–49 | The Vulnerable Observer |
| 0–29 | The Perfect Victim |

**Cognitive Blind Spots**

| Missed | Blind Spot |
|--------|-----------|
| Contract clause | Fine Print Blindness |
| Urgency messages | Authority Trust |
| Transaction pattern | Number Avoidance |

---

## Meera — The AI Investigator

Meera Krishnan is a senior financial crimes investigator powered by Gemini 2.5 Flash. She sits in the evidence sidebar and responds to every user observation with a Socratic question — never an answer.

Her constraint is the product. The moment an AI tells you what to look for, you stop thinking. Meera is engineered to push you deeper into what you're already examining.

**Multi-model fallback chain:** If Gemini 2.5 Flash is rate-limited or unavailable, the server automatically falls back to Gemini 2.0 Flash Lite, then Gemini 1.5 Flash, then hardcoded responses. Meera never goes silent.

---

## The Case Generation Pipeline

The two cases today are handcrafted. The pipeline behind them is designed to generate new cases automatically from live regulatory data.

**Sources:** RBI enforcement orders, SEBI fraud alerts, MHA cyber crime reports, CERT-In advisories — all public, all updated continuously.

**Process:**
1. **Classify** — Gemini extracts fraud type, victim profile, tactics, difficulty level from raw enforcement document
2. **Generate** — Produces 5 evidence artifacts with correct annotation targets and deliberate red herrings
3. **Score** — Maps 8 manipulation tactics, builds Meera hint map, writes breakdown timeline
4. **Validate** — Checks scoring ambiguity, difficulty accuracy, source traceability before publishing

New case from raw enforcement document: under 2 hours.

---

## Design System

Dark mode default, light mode available via NavBar toggle.

| Token | Value |
|-------|-------|
| Background | `#09090E` |
| Card | `#18181F` |
| Accent Red | `#E8394A` |
| Accent Amber | `#F5A623` |
| Accent Blue | `#4A9EFF` |
| Accent Green | `#2DD4A0` |

Fonts: Inter (body), JetBrains Mono (labels/code), Crimson Pro italic (Meera quotes)

---

## Business Model

| Layer | Customer | Price | Example |
|-------|----------|-------|---------|
| B2C Freemium | Individual users | ₹99/month | 0.1% of 650M smartphones = ₹6.4 Cr MRR |
| B2B Licensing | Banks / NBFCs | ₹15/user/month | 50L customer bank = ₹75L/month |
| Enterprise | Listed companies | ₹500/employee/year | 10K employee company = ₹50L/year |

RBI mandates banks to run financial literacy programs. SEBI mandates listed companies to run employee financial education. HEIST is the product both are looking for.

---

## The Insight

Financial literacy fails because it teaches concepts, not consequences. You can teach someone what a Ponzi scheme is — they'll define it correctly on an exam and fall for one at 24.

HEIST doesn't teach the definition. It puts you inside the experience. The learning only happens if you find it yourself.

> *Every financial literacy app tells you what scams look like. HEIST puts you inside one — and makes you figure out how it worked yourself. Because you never forget something you solved.*

---

## Team

Built at IIIT Delhi Hackathon 2026 — Gamifying Finance Track.

---

## License

MIT
