# COPY AND PASTE THIS GEMINI API KEY IN ENV- AIzaSyD2dauvW4DVQTCK3Tf3rF_xcFOtIVJfHds

# 🕵️ HEIST — Financial Crime Investigation Game

> **Real scams. Real evidence. You investigate.**

HEIST is an immersive financial literacy game that puts you inside a real fraud case. No tutorials. No multiple choice. Just pure investigation. Find the red flags before it's too late.

Built in 24 hours for the **IIIT Delhi Hackathon 2026** — *Gamifying Finance* track.

---

## 🔍 How It Works

1.  **📂 Open the Case File** – Review victim profiles, evidence folders, and investigator briefings.
2.  **🧐 Study the Evidence** – Examine real-looking artifacts like WhatsApp chats and bank statements.
3.  **🚩 Annotate Red Flags** – Mark suspicious items directly on the evidence.
4.  **🤖 Ask Meera** – Your AI investigator assistant who pushes you to think deeper with Socratic questions.
5.  **📝 Submit Hypothesis** – Identify the fraud type, tactics, and psychological biases involved.
6.  **📊 See the Breakdown** – Review a full timeline reveal of the scam.
7.  **🏆 Get Your Profile** – Discover your investigator archetype and cognitive blind spots.

---

## 📁 Cases

### 🏢 Case #047 — The Friendly Broker
*   **Victim:** Arjun Mehta, 23, Software Engineer, Bangalore
*   **Damage:** ₹2,40,000 lost over 4 months
*   **Scammer:** Vikram Khanna (Fake SEBI-registered advisor)
*   **Tactics:** Manufactured scarcity, guaranteed returns, sunk cost escalation.

### 🎓 Case #048 — The Dream Job
*   **Victim:** Priya Sharma, 26, MBA Graduate, Delhi
*   **Damage:** ₹85,000 lost over 6 weeks
*   **Scammer:** "TalentBridge Consulting" (Fake HR placement firm)
*   **Tactics:** Advance fee fraud, authority bias, domain spoofing.

---

## 🛠️ The Tech Stack: Why These Tools?

| Layer | Technology | Why? |
| :--- | :--- | :--- |
| **Frontend** | React + TypeScript | Type-safe components for complex game state. |
| **Build Tool** | Vite | Lightning-fast HMR for a reactive dev experience. |
| **Animations** | Framer Motion | Essential for the "investigation" feel (staggered UI, smooth transitions). |
| **State** | Zustand + Persist | Lightweight state that survives page refreshes automatically. |
| **UI** | Tailwind + Shadcn | Rapid prototyping of professional-grade, accessible components. |
| **AI Engine** | Gemini 2.0 Flash | High-speed reasoning for real-time Socratic feedback. |
| **Backend** | Node.js + Express | Simple, scalable proxy for AI and case management. |

---

## 🧠 Core Systems

### 📂 The Evidence Engine
HEIST isn't just text. Our Evidence Engine renders custom UI for different artifacts:
- **WhatsAppEvidence**: Real-time chat bubbles with interactive timestamps.
- **TransactionsEvidence**: A searchable, filterable digital bank statement.
- **ContractEvidence**: A formal document viewer optimized for finding "hidden" clauses.
- **WebsiteEvidence**: A simulated browser environment for uncovering spoofed domains.

### 🤖 Meera — Socratic AI Assistant
Meera Krishnan is your senior investigator partner. Powered by **Gemini 2.0 Flash**, she follows a strict philosophy: **The learning stops the moment the AI gives you the answer.** 
- ❌ She will never tell you what the scam is.
- ✅ She will ask questions like: *"Why does this SEBI registration number look different from the one on their website?"*

### 🚩 Annotation & Scoring
Every investigation is evaluated based on precision:
- **Red Flags**: Annotating a real manipulation tactic increases your score.
- **Red Herrings**: Marking harmless information as suspicious will lower your "Forensics" rating.
- **Hypothesis**: The final 4-question form tests your ability to connect the dots, not just find clues.

---

## 🚀 Quick Start

### 1️⃣ Frontend Setup
```bash
# Install dependencies
npm install

# Setup environment
echo "VITE_API_URL=http://localhost:3001" > .env

# Start development server
npm run dev
```
*App runs on `http://localhost:5173`*

### 2️⃣ Backend Setup
```bash
cd server

# Install dependencies
npm install

# Setup environment (Add your Gemini API Key)
echo "GEMINI_API_KEY=your_key_here" > .env

# Start server
npm run dev
```
*Server runs on `http://localhost:3001`*

---

## 🤖 Meera — The AI Investigator

Meera Krishnan is your senior investigator partner. Powered by **Gemini 2.0 Flash**, she helps you without giving away the answers. She responds with Socratic questions to guide your intuition, ensuring the learning stays with you.

---

## 📈 Scoring & Archetypes

| Score | Archetype |
| :--- | :--- |
| **90–100** | 🧠 The Forensic Mind |
| **70–89** | 🕵️ The Pattern Tracker |
| **50–69** | 🎓 The Learning Investigator |
| **30–49** | ⚠️ The Vulnerable Observer |
| **0–29** | 💸 The Perfect Victim |

---

## 📜 License
HEIST is open-source software licensed under the **MIT License**.
