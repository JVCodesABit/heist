import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

const TIMELINE_ITEMS = [
  { id: 1, key: 'li_msg1',       date: 'Week 1',  title: 'Cold Approach — LinkedIn Flattery',                 explanation: "Ananya found Priya through LinkedIn and opened with a compliment about her \"impressive MBA from Symbiosis.\" This is target selection — scammers identify job-seekers showing urgency and reach out with personalized praise to build instant rapport.", bias: 'Social Engineering',         correct: ['li_msg1', 'li_msg2'] },
  { id: 2, key: 'li_msg5',       date: 'Week 1',  title: 'Manufactured Urgency — \"Only 5 Spots\"',           explanation: "\"We've already shortlisted 5 candidates\" and \"two slots are already taken\" are artificial scarcity tactics. There are no limited slots. The Thursday deadline is designed to prevent Priya from researching TalentBridge or contacting Deloitte directly.",                          bias: 'Urgency & Scarcity',        correct: ['li_msg5'] },
  { id: 3, key: 'pay_bg',        date: 'Week 2',  title: 'First Fee — ₹15,000 \"Background Check\"',          explanation: "The first payment is deliberately small enough to seem reasonable — \"₹15,000, fully refundable after joining.\" The refund promise is a lie. No legitimate company charges candidates for background verification. This is the foot-in-the-door technique.",                             bias: 'Anchoring Bias',            correct: ['pay_bg'] },
  { id: 4, key: 'pay_train',     date: 'Week 2-3', title: 'Second Fee — ₹20,000 \"Training Materials\"',      explanation: "After Priya has already paid ₹15,000, the next request for ₹20,000 feels incremental. She's now invested and doesn't want to lose her \"spot\" or the money she's already paid. This is classic sunk cost exploitation.",                                                              bias: 'Sunk Cost Fallacy',         correct: ['pay_train'] },
  { id: 5, key: 'email_domain',  date: 'Week 3',  title: 'Fake Email Domain — deloitte-careers.in',           explanation: "The offer letter email comes from hr@deloitte-careers.in — NOT from @deloitte.com. Legitimate Deloitte emails use @deloitte.com. The lookalike domain is designed to pass a quick glance but fails basic verification.",                                                               bias: 'False Authority',           correct: ['email_domain'] },
  { id: 6, key: 'ol_clause',     date: 'Week 4',  title: 'Hidden Clause 8.3 — Non-Refundable Fees',           explanation: "The offer letter's Clause 8.3 states all fees paid to TalentBridge are non-refundable \"under any circumstances\" — including rescinded offers. This is buried in dense legal language on page 2. It legally protects the scammer while Priya assumes she'll get refunds.",           bias: 'Fine Print Trap',           correct: ['ol_clause'] },
  { id: 7, key: 'tb_badge',      date: 'Ongoing', title: 'Fake Credentials — NASSCOM, ISO Badges',            explanation: "The TalentBridge website displays NASSCOM certification, ISO 27001, and Startup India badges — none are verifiable. The site also shows fabricated placement statistics (2,300+ placements, 98% success rate) and fake testimonials with generic names.",                               bias: 'Authority Bias',            correct: ['tb_badge'] },
  { id: 8, key: 'pay_offer',     date: 'Week 5-6', title: 'Final Extraction — ₹25,000 × 2',                   explanation: "The two largest payments come last — a ₹25,000 \"security deposit\" and ₹25,000 \"offer letter processing.\" By now Priya has paid ₹60,000 and is psychologically committed. The final ₹50,000 extracts everything before the scammer disappears.",                               bias: 'Escalation of Commitment',  correct: ['pay_dep', 'pay_offer'] },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Breakdown048() {
  const navigate = useNavigate();
  const { hypothesis, results, annotations } = useInvestigationStore();
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (!hypothesis.submitted) navigate('/case-048/hypothesis');
  }, [hypothesis.submitted, navigate]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const annotatedIds = annotations.map(a => a.itemId);
  const isCaught = (item: typeof TIMELINE_ITEMS[0]) =>
    item.correct.some(id => annotatedIds.includes(id));

  const caughtCount = TIMELINE_ITEMS.filter(isCaught).length;
  const scoreColor =
    results.score >= 80 ? 'text-heist-green' :
    results.score >= 50 ? 'text-heist-amber' :
    'text-heist-red';

  return (
    <div className="min-h-[calc(100vh-56px)] px-4 md:px-8 py-8 max-w-[820px] mx-auto">

      {/* Header */}
      <div className="relative mb-12">
        <motion.div
          className="absolute -top-2 right-0 md:right-8 z-10"
          initial={{ scale: 2.5, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: -4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <span className="font-typewriter text-2xl md:text-4xl text-heist-red border-[3px] border-heist-red px-4 py-1.5 tracking-widest inline-block opacity-90">
            CASE CLOSED
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mt-14"
        >
          <p className="font-mono text-[10px] text-text-tertiary tracking-[0.3em] mb-1">CASE #048 · THE DREAM JOB</p>
          <h1 className="font-typewriter text-2xl md:text-[32px] text-foreground">Here's what actually happened.</h1>

          <div className="flex flex-wrap items-end gap-4 mt-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, type: 'spring', stiffness: 260, damping: 16 }}
            >
              <span className={`font-mono text-6xl font-bold ${scoreColor}`}>{results.score}</span>
              <span className="font-mono text-2xl text-text-tertiary">/100</span>
            </motion.div>

            <div className="flex flex-col gap-1.5 mb-1.5">
              {[
                { val: `${caughtCount} caught`,        bg: 'bg-heist-green/12  text-heist-green' },
                { val: `${8 - caughtCount} missed`,    bg: 'bg-heist-red/12    text-heist-red'   },
                { val: `${results.hypothesisAccuracy * 25}% hypothesis accuracy`, bg: 'bg-heist-blue/12 text-heist-blue' },
              ].map(({ val, bg }, i) => (
                <motion.span
                  key={val}
                  className={`font-mono text-xs px-3 py-1 rounded-sm ${bg}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.08 }}
                >
                  {val}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        className="relative ml-4 md:ml-0"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {TIMELINE_ITEMS.map((item) => {
          const caught = isCaught(item);
          const isOpen = expanded === item.id;
          return (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="flex gap-4 md:gap-6 mb-4 last:mb-0"
            >
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center flex-shrink-0 w-8">
                <motion.div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    caught ? 'bg-heist-green/15' : 'bg-heist-red/15'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + item.id * 0.08, type: 'spring' }}
                >
                  {caught
                    ? <CheckCircle2 size={16} className="text-heist-green" />
                    : <XCircle size={16} className="text-heist-red" />}
                </motion.div>
                {item.id < 8 && <div className={`w-px flex-1 mt-1 ${caught ? 'bg-heist-green/20' : 'bg-border'}`} />}
              </div>

              {/* Card */}
              <div
                className={`paper-card flex-1 p-4 cursor-pointer transition-all ${
                  caught ? 'border-l-2 border-l-heist-green' : 'border-l-2 border-l-heist-red/40 opacity-80'
                }`}
                onClick={() => setExpanded(isOpen ? null : item.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-text-tertiary">{item.date}</span>
                    <h3 className="font-typewriter text-sm text-foreground mt-0.5">{item.title}</h3>
                    <span className={`inline-block font-mono text-[9px] px-2 py-0.5 rounded-sm mt-1 ${
                      caught ? 'bg-heist-green/10 text-heist-green' : 'bg-heist-red/10 text-heist-red'
                    }`}>
                      {caught ? '✓ YOU CAUGHT THIS' : '✗ MISSED'}
                    </span>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-text-tertiary" /> : <ChevronDown size={16} className="text-text-tertiary" />}
                </div>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-border"
                  >
                    <p className="font-body text-[13px] text-text-secondary leading-relaxed">
                      {item.explanation}
                    </p>
                    <span className="font-mono text-[10px] text-heist-amber bg-heist-amber/10 px-2 py-0.5 rounded-sm mt-2 inline-block">
                      TACTIC: {item.bias}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* What you learned */}
      <motion.div
        className="mt-12 mb-8"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h3 className="font-typewriter text-sm tracking-wider text-text-tertiary mb-4">WHAT YOU LEARNED</h3>
        <div className="space-y-3">
          {[
            { color: 'border-l-heist-amber', title: 'Legitimate Companies Never Charge Candidates', text: "No real company — especially Big4 — charges placement fees, background check fees, or \"training material\" costs. If a recruiter asks you to pay money to get a job, it's a scam. Period." },
            { color: 'border-l-heist-red',   title: 'Verify Email Domains',                          text: "Always check the sender's domain. deloitte-careers.in is NOT deloitte.com. Scammers register lookalike domains that pass a quick glance. Verify company emails through official websites." },
            { color: 'border-l-heist-blue',  title: 'Contact the Company Directly',                  text: "If you receive a job offer through a \"recruitment partner,\" call the company's official HR department to verify. Use the phone number from the company's official website — never the one provided by the recruiter." },
          ].map((lesson) => (
            <motion.div
              key={lesson.title}
              className={`paper-card p-5 border-l-4 ${lesson.color}`}
              whileHover={{ x: 4, transition: { duration: 0.15 } }}
            >
              <h4 className="font-typewriter text-sm text-foreground mb-1">{lesson.title}</h4>
              <p className="font-body text-[13px] text-text-secondary leading-relaxed">{lesson.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          onClick={() => navigate('/profile')}
          className="btn-stamp w-full py-4 text-sm"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
        >
          VIEW YOUR INVESTIGATOR PROFILE →
        </motion.button>
      </motion.div>
    </div>
  );
}
