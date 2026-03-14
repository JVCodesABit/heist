import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, AlertTriangle, Flag, Search } from 'lucide-react';

const FRAUD_OPTIONS = [
  { id: 'ponzi',        label: 'Ponzi Scheme',              desc: 'Returns paid from new investors',       emoji: '🔄' },
  { id: 'advance_fee',  label: 'Advance Fee Fraud',         desc: 'Pay upfront for promised service',      emoji: '💸' },
  { id: 'fake_sebi',    label: 'Fake SEBI Registration',    desc: 'Fraudulent regulatory claims',          emoji: '🏛️' },
  { id: 'task_scam',    label: 'Investment Advisory Scam',  desc: 'Fake advisor exploiting trust',         emoji: '🎭' },
];

const BIAS_OPTIONS = [
  { id: 'urgency',      label: 'Urgency & Scarcity',   desc: '"Only 3 spots left, decide by Thursday"' },
  { id: 'authority',    label: 'Authority Bias',        desc: '"I\'m SEBI registered, 3 years experience"' },
  { id: 'social_proof', label: 'Social Proof',          desc: '"Client from Google made 8% in 3 weeks"' },
  { id: 'sunk_cost',    label: 'Sunk Cost Fallacy',     desc: 'Keep investing to protect earlier losses' },
  { id: 'anchoring',    label: 'Anchoring Bias',        desc: 'Big return % sets unrealistic expectations' },
];

const TIMELINE_NODES = [
  { id: 'week1',   label: 'Week 1',   sublabel: 'First contact' },
  { id: 'week2_3', label: 'Week 2–3', sublabel: 'SEBI claims' },
  { id: 'month2',  label: 'Month 2',  sublabel: '"Avg down"' },
  { id: 'month3',  label: 'Month 3',  sublabel: '"Premium tier"' },
  { id: 'month4',  label: 'Month 4',  sublabel: 'Final transfer' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hypothesis() {
  const navigate  = useNavigate();
  const { evidenceViewed, hypothesis, setHypothesisField, submitHypothesis, annotations } = useInvestigationStore();
  const [firstRedFlag, setFirstRedFlag] = useState(hypothesis.firstRedFlag);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (evidenceViewed.length === 0) navigate('/case');
  }, [evidenceViewed, navigate]);

  const canSubmit =
    hypothesis.trapType !== null &&
    firstRedFlag.trim() !== '' &&
    hypothesis.biasTrap.length > 0 &&
    hypothesis.interventionPoint !== null;

  const handleSubmit = () => {
    setHypothesisField('firstRedFlag', firstRedFlag);
    setSubmitted(true);
    setTimeout(() => {
      submitHypothesis();
      navigate('/breakdown');
    }, 800);
  };

  const redFlagCount   = annotations.filter(a => a.annotationType === 'red_flag').length;
  const suspiciousCount = annotations.filter(a => a.annotationType === 'suspicious').length;
  const verifyCount    = annotations.filter(a => a.annotationType === 'verify').length;
  const totalAnswered  =
    (hypothesis.trapType ? 1 : 0) +
    (firstRedFlag.trim() ? 1 : 0) +
    (hypothesis.biasTrap.length > 0 ? 1 : 0) +
    (hypothesis.interventionPoint ? 1 : 0);

  return (
    <motion.div
      className="min-h-[calc(100vh-56px)] px-4 md:px-8 py-8 max-w-[820px] mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* ── Header ── */}
      <motion.div variants={fadeUp} className="mb-8 relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] text-text-tertiary tracking-[0.3em] mb-1">CASE #047 · THE FRIENDLY BROKER</p>
            <h1 className="font-typewriter text-3xl text-foreground">HYPOTHESIS BOARD</h1>
          </div>
          {/* Progress ring / counter */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                <motion.circle
                  cx="24" cy="24" r="20"
                  fill="none"
                  stroke="hsl(var(--heist-green, 142 72% 45%))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - totalAnswered / 4) }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold text-foreground">
                {totalAnswered}/4
              </span>
            </div>
            <span className="font-mono text-[9px] text-text-tertiary tracking-wider">COMPLETE</span>
          </div>
        </div>

        <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
          <p className="font-body text-sm text-text-secondary">
            Reviewed <span className="text-foreground font-semibold">{evidenceViewed.length}</span> of 5 evidence items. Answer all 4 questions below.
          </p>
        </div>
      </motion.div>

      {/* ── Annotation Summary ── */}
      <motion.div
        variants={fadeUp}
        className="paper-card p-4 mb-8 bg-bg-elevated"
        style={{ transform: 'rotate(0.3deg)' }}
        whileHover={{ rotate: 0, transition: { duration: 0.2 } }}
      >
        <span className="font-typewriter text-[10px] text-text-tertiary tracking-wider">YOUR FIELD NOTES</span>
        <div className="flex flex-wrap gap-3 mt-2">
          {[
            { count: redFlagCount,    label: 'Red flags',  bg: 'bg-heist-red/15',   text: 'text-heist-red',   Icon: Flag         },
            { count: suspiciousCount, label: 'Suspicious', bg: 'bg-heist-amber/15', text: 'text-heist-amber', Icon: AlertTriangle },
            { count: verifyCount,     label: 'Verify',     bg: 'bg-heist-blue/15',  text: 'text-heist-blue',  Icon: Search       },
          ].map(({ count, label, bg, text, Icon }) => (
            <motion.span
              key={label}
              className={`font-mono text-xs ${bg} ${text} px-2.5 py-1 rounded-sm flex items-center gap-1.5`}
              whileHover={{ scale: 1.04 }}
            >
              <Icon size={11} />
              <span className="font-bold">{count}</span> {label}
            </motion.span>
          ))}
        </div>
        {annotations.length === 0 && (
          <div className="mt-3 evidence-card p-3">
            <p className="font-body text-sm text-heist-amber">You haven't annotated any evidence yet. Consider reviewing before submitting.</p>
            <button onClick={() => navigate('/evidence/whatsapp')} className="btn-ghost font-typewriter text-xs mt-2">
              ← BACK TO EVIDENCE
            </button>
          </div>
        )}
      </motion.div>

      {/* ── Q1: Fraud Type ── */}
      <motion.div variants={fadeUp} className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[9px] text-text-tertiary tracking-widest">QUESTION 1 OF 4</span>
          {hypothesis.trapType && <CheckCircle2 size={13} className="text-heist-green" />}
        </div>
        <h3 className="font-typewriter text-base text-foreground mb-4">What type of financial fraud was used?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FRAUD_OPTIONS.map((opt, i) => {
            const selected = hypothesis.trapType === opt.id;
            return (
              <motion.button
                key={opt.id}
                onClick={() => setHypothesisField('trapType', opt.id as any)}
                className={`paper-card p-4 text-left transition-all relative overflow-hidden ${
                  selected ? 'border-heist-red bg-heist-red/5' : 'hover:bg-bg-elevated'
                }`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                whileHover={{ scale: 1.015, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence>
                  {selected && (
                    <motion.div
                      className="absolute inset-0 bg-heist-red/5 pointer-events-none"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
                <div className="flex items-start gap-3">
                  <span className="text-xl leading-none mt-0.5">{opt.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-typewriter text-sm text-foreground">{opt.label}</div>
                    <div className="font-mono text-[10px] text-text-tertiary mt-0.5">{opt.desc}</div>
                  </div>
                  <motion.div
                    animate={selected ? { scale: [0.6, 1.1, 1], opacity: 1 } : { scale: 1, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <CheckCircle2 size={16} className="text-heist-red flex-shrink-0" />
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Q2: First Red Flag ── */}
      <motion.div variants={fadeUp} className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[9px] text-text-tertiary tracking-widest">QUESTION 2 OF 4</span>
          {firstRedFlag.trim() && <CheckCircle2 size={13} className="text-heist-green" />}
        </div>
        <h3 className="font-typewriter text-base text-foreground mb-4">What was the first red flag you noticed?</h3>
        <div className="relative">
          <textarea
            value={firstRedFlag}
            onChange={(e) => setFirstRedFlag(e.target.value)}
            placeholder="Describe the earliest warning sign you identified..."
            className="w-full h-32 bg-bg-elevated border border-border rounded-sm p-4 font-mono text-sm text-foreground placeholder:text-text-tertiary outline-none focus:border-heist-amber/60 resize-none transition-colors"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, hsl(var(--border)) 27px, hsl(var(--border)) 28px)',
              lineHeight: '28px',
              paddingTop: '6px',
            }}
          />
          {firstRedFlag.trim() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-2 right-2"
            >
              <CheckCircle2 size={16} className="text-heist-green" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ── Q3: Biases ── */}
      <motion.div variants={fadeUp} className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[9px] text-text-tertiary tracking-widest">QUESTION 3 OF 4</span>
          {hypothesis.biasTrap.length > 0 && <CheckCircle2 size={13} className="text-heist-green" />}
        </div>
        <h3 className="font-typewriter text-base text-foreground mt-1 mb-1">Which psychological biases were exploited?</h3>
        <p className="font-mono text-[11px] text-text-tertiary mb-4">Select all that apply</p>
        <div className="space-y-2">
          {BIAS_OPTIONS.map((opt, i) => {
            const selected = hypothesis.biasTrap.includes(opt.id);
            return (
              <motion.button
                key={opt.id}
                onClick={() => {
                  const newVal = selected
                    ? hypothesis.biasTrap.filter(b => b !== opt.id)
                    : [...hypothesis.biasTrap, opt.id];
                  setHypothesisField('biasTrap', newVal);
                }}
                className={`w-full paper-card p-3.5 text-left flex items-center gap-3 transition-all ${
                  selected ? 'border-heist-amber bg-heist-amber/5' : 'hover:bg-bg-elevated'
                }`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                whileHover={{ x: 3, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.99 }}
              >
                <motion.div
                  animate={selected ? { scale: [0.7, 1.15, 1] } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 14 }}
                >
                  {selected
                    ? <CheckCircle2 size={17} className="text-heist-amber flex-shrink-0" />
                    : <Circle size={17} className="text-muted-foreground flex-shrink-0" />
                  }
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="font-typewriter text-sm text-foreground">{opt.label}</div>
                  <div className="font-mono text-[10px] text-text-tertiary mt-0.5">{opt.desc}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Q4: Timeline ── */}
      <motion.div variants={fadeUp} className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[9px] text-text-tertiary tracking-widest">QUESTION 4 OF 4</span>
          {hypothesis.interventionPoint && <CheckCircle2 size={13} className="text-heist-green" />}
        </div>
        <h3 className="font-typewriter text-base text-foreground mt-1 mb-8">When should Arjun have exited?</h3>

        <div className="relative px-4">
          {/* Base dashed line */}
          <div className="absolute left-8 right-8 top-[13px] border-t-2 border-dashed border-border" />

          {/* Animated fill line up to selected node */}
          {hypothesis.interventionPoint && (() => {
            const idx = TIMELINE_NODES.findIndex(n => n.id === hypothesis.interventionPoint);
            return (
              <motion.div
                className="absolute top-[13px] border-t-2 border-heist-red"
                style={{ left: 32 }}
                initial={{ width: 0 }}
                animate={{ width: `${(idx / (TIMELINE_NODES.length - 1)) * (100 - 14)}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })()}

          <div className="flex items-start justify-between">
            {TIMELINE_NODES.map((node) => {
              const selected = hypothesis.interventionPoint === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setHypothesisField('interventionPoint', node.id)}
                  className="relative flex flex-col items-center gap-2 z-10 group"
                >
                  <motion.div
                    className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-colors ${
                      selected
                        ? 'bg-heist-red border-heist-red'
                        : 'bg-background border-muted-foreground group-hover:border-heist-red/60'
                    }`}
                    animate={selected ? { scale: [1, 1.3, 1.1] } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                  >
                    {selected && (
                      <motion.div
                        className="w-2 h-2 rounded-full bg-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                      />
                    )}
                  </motion.div>
                  <div className="flex flex-col items-center">
                    <span className={`font-mono text-[10px] whitespace-nowrap font-semibold ${selected ? 'text-heist-red' : 'text-text-tertiary group-hover:text-foreground'}`}>
                      {node.label}
                    </span>
                    <span className="font-mono text-[9px] text-text-tertiary whitespace-nowrap">{node.sublabel}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ── Submit ── */}
      <motion.div variants={fadeUp}>
        {/* Progress indicator */}
        <div className="flex gap-1.5 mb-4">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i < totalAnswered ? 'bg-heist-green' : 'bg-border'}`}
              animate={{ scaleX: i < totalAnswered ? 1 : 0.6 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            />
          ))}
        </div>

        <motion.button
          onClick={handleSubmit}
          disabled={!canSubmit || submitted}
          className="btn-stamp w-full text-base relative overflow-hidden"
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          animate={submitted ? { opacity: 0.7 } : { opacity: 1 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.span
                key="submitting"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                  ◌
                </motion.span>
                SUBMITTING...
              </motion.span>
            ) : (
              <motion.span key="submit" className="flex items-center justify-center gap-2">
                SUBMIT HYPOTHESIS →
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {!canSubmit && (
          <motion.p
            className="font-mono text-[11px] text-text-tertiary text-center mt-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            {4 - totalAnswered} question{4 - totalAnswered !== 1 ? 's' : ''} remaining
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
