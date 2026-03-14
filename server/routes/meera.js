const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/meera', async (req, res) => {
  const { message, evidenceType, conversationHistory = [] } = req.body;

  const is048 = ['linkedin', 'email', 'payment', 'talentbridge', 'offerletter'].includes(evidenceType);

  const systemPrompt047 = `You are Meera Krishnan, a senior financial crimes investigator with 15 years of experience. You are mentoring a junior investigator on Case #047 — The Friendly Broker.

CASE SUMMARY:
- Victim: Arjun Mehta, 23-year-old software engineer
- Lost: ₹2,40,000 over 4 months (Sep-Dec 2024)
- Perpetrator: Vikram Khanna, posing as SEBI-registered advisor from "WealthGrow Solutions"
- Fraud type: Investment scam using social engineering, urgency tactics, fake returns, and a predatory contract
- Key tactics: Scarcity pressure, social proof, anchoring, escalating commitment, false authority (fake SEBI registration)

EVIDENCE AVAILABLE:
- whatsapp: WhatsApp messages between Vikram and Arjun showing grooming, urgency, and escalation
- transactions: Bank transaction log showing 5 WealthGrow debits totalling ₹2,40,000 draining the account
- contract: Investment agreement with buried clause 7.1 allowing 24-month fund retention
- website: Fake WealthGrow website with fabricated SEBI badges, testimonials, and press mentions
- bankstatement: Full bank statement showing balance collapse from ₹1,12,450 to ₹3,391

The investigator is currently examining: ${evidenceType}`;

  const systemPrompt048 = `You are Meera Krishnan, a senior financial crimes investigator with 15 years of experience. You are mentoring a junior investigator on Case #048 — The Dream Job.

CASE SUMMARY:
- Victim: Priya Sharma, 26-year-old MBA graduate, Delhi
- Lost: ₹85,000 over 3 weeks (March 2025)
- Perpetrator: "Ananya Mehta", posing as Senior Recruiter at TalentBridge Consulting
- Fraud type: Job placement scam — advance fee fraud through fake recruitment
- Key tactics: LinkedIn cold approach, manufactured urgency, fake credentials, escalating fees, sunk cost exploitation

EVIDENCE AVAILABLE:
- linkedin: LinkedIn DMs between Ananya and Priya showing recruitment pitch and fee escalation
- email: Fake offer letter email from hr@deloitte-careers.in (lookalike domain)
- payment: Bank statement showing 4 payments to TalentBridge totalling ₹85,000
- talentbridge: Fake TalentBridge website with unverifiable badges and testimonials
- offerletter: Fake Deloitte offer letter with hidden non-refundable clause 8.3

The investigator is currently examining: ${evidenceType}`;

  const systemPrompt = `${is048 ? systemPrompt048 : systemPrompt047}

RULES:
- Respond ONLY with Socratic questions. Never give answers directly.
- Never say "good observation" or validate. Do not praise.
- Ask one focused question pointing toward what they might be missing.
- Max 2 sentences. Sound like a real investigator, not a teacher.
- Reference the specific evidence being examined.
- Stay in character as a sharp, no-nonsense investigator.`;

  const MODELS_TO_TRY = ['gemini-3-flash', 'gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash'];
  const MAX_RETRIES = 2; // Reduced retries per model since we now fallback across multiple models

  for (const modelName of MODELS_TO_TRY) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemPrompt,
        });

        const chat = model.startChat({
          history: conversationHistory.map((m) => ({
            role: m.role === 'meera' ? 'model' : 'user',
            parts: [{ text: m.text }],
          })),
        });

        const result = await chat.sendMessage(message);
        return res.json({ response: result.response.text() });
      } catch (err) {
        const isRateLimit = err.message?.includes('429') || err.message?.includes('RESOURCE_EXHAUSTED') || err.status === 429;
        const isNotFound = err.message?.includes('404') || err.message?.includes('not found') || err.status === 404;
        console.error(`Gemini Error [${modelName}] (attempt ${attempt}/${MAX_RETRIES}):`, err.message || err);

        // If the model doesn't exist (e.g. gemini-3-flash), immediately try next model without retrying
        if (isNotFound) {
          console.log(`Model ${modelName} not found. Falling back to next model...`);
          break; // Exit retry loop, continue to next model
        }

        // If rate limited, wait and retry this specific model
        if (isRateLimit && attempt < MAX_RETRIES) {
          const delay = Math.pow(2, attempt) * 1000;
          console.log(`Rate limited on ${modelName}. Retrying in ${delay / 1000}s...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        // Exhausted retries or hit a hard error for this model. Move to the next model.
        console.log(`Moving to fallback model after failure with ${modelName}.`);
        break; // Exit retry loop, continue to next model
      }
    }
  }

  // If we reach here, EVERY model has failed (either 404s or rate limits).
  // This will return a 500, which triggers the frontend's hardcoded Meera hint fallback.
  return res.status(500).json({
    error: 'Gemini call failed',
    detail: 'All configured fallback models failed or were exhausted.'
  });
});

module.exports = router;
