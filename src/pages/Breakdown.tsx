import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

const TIMELINE_ITEMS = [
  { id: 1, key: 'msg1',      date: 'Week 1',  title: 'Cold Approach — Personal Flattery',        explanation: "Vikram found Arjun through a public forum and opened with a compliment about his \"portfolio thinking.\" This isn't networking — it's target selection. Scammers identify young professionals showing interest in investing and initiate contact.", bias: 'Social Engineering',         correct: ['msg1'] },
  { id: 2, key: 'msg4',      date: 'Week 1',  title: 'Manufactured Scarcity — "Only 50 spots"',  explanation: '"We only take 50 clients per quarter" and "I\'d need to know by Thursday" are classic urgency tactics. There is no limited batch. The deadline is artificial pressure designed to prevent research.',                                                     bias: 'Urgency & Scarcity',           correct: ['msg4'] },
  { id: 3, key: 'msg6',      date: 'Week 2',  title: 'Guaranteed Returns — 34% Claims',           explanation: 'No legitimate advisor can guarantee 28-34% returns. Mentioning a "Google engineer" who got 8% in 3 weeks uses social proof and unrealistic benchmarks to overcome doubt.',                                                                              bias: 'Authority Bias',               correct: ['msg6'] },
  { id: 4, key: 'msg8',      date: 'Week 3',  title: 'Rapid First Transfer — ₹50,000',            explanation: 'The speed from introduction to first payment (under 3 weeks) is deliberate. Scammers move fast to prevent victims from doing due diligence or consulting others.',                                                                                      bias: 'Commitment',                  correct: ['msg8', 'sep20'] },
  { id: 5, key: 'clause71',  date: 'Month 1', title: 'Buried Clause 7.1 — 24-Month Lock-in',      explanation: 'The investment agreement contains a 24-month fund retention clause in fine print, with a 35% early withdrawal penalty. This ensures victims cannot recover money even if they realize the fraud.',                                                      bias: 'Fine Print Trap',             correct: ['clause71'] },
  { id: 6, key: 'oct8',      date: 'Month 2', title: 'Sunk Cost Escalation — "Average Down"',     explanation: 'After the initial investment, Vikram created a fictional portfolio gain (12%) then used it to justify requesting more money. "Averaging down" is real investing language weaponized to extract ₹70,000 more.',                                          bias: 'Sunk Cost Fallacy',           correct: ['oct8'] },
  { id: 7, key: 'sebi_badge',date: 'Ongoing', title: 'False Authority — Fake SEBI Registration',  explanation: 'The WealthGrow website displays SEBI registration, RBI compliance, and ISO certification badges. None are verifiable. The site also features fabricated testimonials and inflated AUM figures.',                                                         bias: 'Authority Bias',              correct: ['sebi_badge'] },
  { id: 8, key: 'dec9',      date: 'Month 4', title: 'Final Extraction — ₹1,00,000',              explanation: 'The largest single transfer came last, when Arjun was most committed. By this point, he had already invested ₹1,40,000 and was psychologically locked in. The "final opportunity" language mirrors early tactics.',                                     bias: 'Escalation of Commitment',    correct: ['dec9', 'nov10'] },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function Breakdown() {
  const navigate = useNavigate();
  const { hypothesis, results, annotations } = useInvestigationStore();
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (!hypothesis.submitted) navigate('/hypothesis');
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

      {/* ── Header ── */}
      <div className="relative mb-12">
        {/* CASE CLOSED stamp — springs in */}
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
          <p className="font-mono text-[10px] text-text-tertiary tracking-[0.3em] mb-1">CASE #047 · THE FRIENDLY BROKER</p>
          <h1 className="font-typewriter text-2xl md:text-[32px] text-foreground">Here's what actually happened.</h1>

          {/* Score counter */}
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

      {/* ── Timeline ── */}
      <motion.div
        className="relative ml-4 md:ml-0"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {TIMELINE_ITEMS.map((item, i) => {
          const caught = isCaught(item);
          const isOpen = expanded === item.id;
          return (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="flex gap-4 md:gap-6 mb-4 last:mb-0"
            >
              {/* Date */}
              <div className="w-[72px] md:w-[90px] flex-shrink-0 text-right pt-3">
                <span className="font-mono text-[10px] text-text-tertiary leading-tight">{item.date}</span>
              </div>

              {/* Node + connector */}
              <div className="flex flex-col items-center flex-shrink-0 pt-3">
                <motion.div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    caught ? 'bg-heist-green/20' : 'bg-heist-red/20'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.25, 1] }}
                  transition={{ delay: 0.45 + i * 0.08, type: 'spring', stiffness: 350 }}
                >
                  {caught
                    ? <CheckCircle2 size={16} className="text-heist-green" />
                    : <XCircle     size={16} className="text-heist-red"   />
                  }
                </motion.div>
                {i < TIMELINE_ITEMS.length - 1 && (
                  <motion.div
                    className={`w-px flex-1 mt-1 ${caught ? 'border-l-2 border-heist-green/30' : 'border-l-2 border-dashed border-border'}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.3, ease: 'easeOut' }}
                    style={{ transformOrigin: 'top', minHeight: 24 }}
                  />
                )}
              </div>

              {/* Card — collapsible */}
              <motion.div
                className={`flex-1 paper-card overflow-hidden cursor-pointer transition-colors ${
                  caught ? 'hover:border-heist-green/40' : 'hover:border-heist-red/40'
                } ${isOpen ? (caught ? 'border-heist-green/30' : 'border-heist-red/30') : ''}`}
                whileHover={{ scale: 1.008, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.998 }}
                onClick={() => setExpanded(isOpen ? null : item.id)}
              >
                <div className="p-4 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono text-[10px] tracking-wider ${caught ? 'text-heist-green' : 'text-heist-red'}`}>
                        {caught ? '✓ IDENTIFIED' : '✗ MISSED'}
                      </span>
                      <span className="font-mono text-[10px] text-heist-amber bg-heist-amber/10 px-1.5 py-0.5 rounded-sm">
                        {item.bias}
                      </span>
                    </div>
                    <h4 className="font-typewriter text-sm text-foreground">{item.title}</h4>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown size={15} className="text-text-tertiary" />
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className={`px-4 pb-4 pt-0 border-t ${caught ? 'border-heist-green/20 bg-heist-green/5' : 'border-heist-red/20 bg-heist-red/5'}`}>
                    <p className="font-body text-[13px] text-text-secondary leading-relaxed mt-3">
                      {item.explanation}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Correct Answers ── */}
      <motion.div
        className="paper-card p-6 bg-bg-elevated mt-10 mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.4 }}
      >
        <h3 className="font-typewriter text-sm tracking-wider text-text-tertiary mb-4">CORRECT ANSWERS</h3>
        <div className="space-y-3">
          {[
            { label: 'FRAUD TYPE',    value: 'Investment Advisory Scam (fake SEBI-registered advisor)' },
            { label: 'EARLIEST EXIT', value: 'Week 1 — after the "only 50 spots" urgency message' },
            { label: 'PRIMARY BIAS',  value: 'Urgency & Scarcity, combined with Sunk Cost Fallacy' },
          ].map(({ label, value }, i) => (
            <motion.div
              key={label}
              className="flex flex-col gap-0.5"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + i * 0.08 }}
            >
              <span className="font-typewriter text-[10px] text-text-tertiary tracking-wider">{label}</span>
              <span className="font-body text-sm text-text-secondary">{value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.55 }}
        className="text-center"
      >
        <motion.button
          onClick={() => navigate('/profile')}
          className="btn-stamp text-base"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          SEE YOUR INVESTIGATOR PROFILE →
        </motion.button>
      </motion.div>
    </div>
  );
}
