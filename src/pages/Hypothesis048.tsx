import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, AlertTriangle, Flag, Search } from 'lucide-react';

const FRAUD_OPTIONS = [
  { id: 'advance_fee',      label: 'Advance Fee Fraud',         desc: 'Pay upfront fees for a promised service',     emoji: '💸' },
  { id: 'fake_recruitment',  label: 'Fake Recruitment Scam',     desc: 'Impersonating recruiters/companies',          emoji: '🎭' },
  { id: 'identity_theft',   label: 'Identity Theft',            desc: 'Stealing personal info via fake job apps',    emoji: '🔓' },
  { id: 'impersonation',    label: 'Corporate Impersonation',   desc: 'Posing as a real company for credibility',    emoji: '🏢' },
];

const BIAS_OPTIONS = [
  { id: 'authority',    label: 'Authority Bias',          desc: '"We\'re Deloitte\'s exclusive partner"' },
  { id: 'urgency',      label: 'Urgency & Scarcity',     desc: '"Only 5 slots, interview starts next week"' },
  { id: 'sunk_cost',    label: 'Sunk Cost Fallacy',      desc: 'Keep paying to protect earlier payments' },
  { id: 'social_proof', label: 'Social Proof',           desc: '"2,300+ placements, 98% success rate"' },
  { id: 'fomo',         label: 'Professional FOMO',      desc: '₹18 LPA dream job — can\'t miss this' },
];

const TIMELINE_NODES = [
  { id: 'week1',   label: 'Week 1',   sublabel: 'LinkedIn DM' },
  { id: 'week2',   label: 'Week 2',   sublabel: 'Background fee' },
  { id: 'week3',   label: 'Week 3',   sublabel: 'Training fee' },
  { id: 'week4',   label: 'Week 4',   sublabel: 'Security deposit' },
  { id: 'week6',   label: 'Week 6',   sublabel: 'Offer processing' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hypothesis048() {
  const navigate = useNavigate();
  const {
    caseStarted, hypothesis, evidenceViewed, annotations,
    setHypothesisField, submitHypothesis,
  } = useInvestigationStore();

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!caseStarted) navigate('/case-048/evidence');
  }, [caseStarted, navigate]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const canSubmit =
    hypothesis.trapType &&
    hypothesis.firstRedFlag.trim().length > 0 &&
    hypothesis.biasTrap.length > 0 &&
    hypothesis.interventionPoint;

  const handleSubmit = () => {
    submitHypothesis();
    navigate('/case-048/breakdown');
  };

  const toggleBias = (id: string) => {
    const current = hypothesis.biasTrap;
    setHypothesisField(
      'biasTrap',
      current.includes(id) ? current.filter((b) => b !== id) : [...current, id]
    );
  };

  const annotationCount = annotations.length;
  const evidenceCount = evidenceViewed.length;

  return (
    <motion.div
      className="min-h-[calc(100vh-56px)] px-4 md:px-8 py-8 max-w-[820px] mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-6">
        <span className="font-mono text-[10px] text-text-tertiary tracking-[0.3em]">CASE #048 · THE DREAM JOB</span>
        <h1 className="font-typewriter text-2xl md:text-[32px] text-foreground mt-1">Build Your Hypothesis</h1>
        <p className="font-body text-[13px] text-text-secondary mt-2">
          Based on your investigation, identify the fraud type, manipulation tactics, and when Priya should have stopped.
        </p>
      </motion.div>

      {/* Stats bar */}
      <motion.div variants={fadeUp} className="flex gap-3 mb-8">
        {[
          { label: 'Evidence', val: `${evidenceCount}/5`, color: 'text-heist-amber' },
          { label: 'Annotations', val: String(annotationCount), color: 'text-heist-blue' },
        ].map((s) => (
          <div key={s.label} className="form-field px-4 py-2 flex items-center gap-2">
            <span className={`font-mono text-sm font-bold ${s.color}`}>{s.val}</span>
            <span className="font-mono text-[10px] text-text-tertiary">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* 1. Fraud Type */}
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Flag size={14} className="text-heist-red" />
          <h2 className="font-typewriter text-sm tracking-wider text-foreground">1. IDENTIFY THE FRAUD TYPE</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {FRAUD_OPTIONS.map((opt) => {
            const selected = hypothesis.trapType === opt.id;
            return (
              <motion.button
                key={opt.id}
                onClick={() => setHypothesisField('trapType', opt.id as any)}
                className={`form-field p-4 text-left flex items-start gap-3 transition-all ${
                  selected ? 'ring-2 ring-heist-red border-heist-red/40' : 'hover:border-heist-red/20'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl mt-0.5">{opt.emoji}</span>
                <div>
                  <div className="font-typewriter text-xs text-foreground flex items-center gap-2">
                    {opt.label}
                    {selected && <CheckCircle2 size={14} className="text-heist-red" />}
                  </div>
                  <div className="font-mono text-[10px] text-text-tertiary mt-0.5">{opt.desc}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* 2. First Red Flag */}
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={14} className="text-heist-amber" />
          <h2 className="font-typewriter text-sm tracking-wider text-foreground">2. FIRST RED FLAG</h2>
        </div>
        <textarea
          value={hypothesis.firstRedFlag}
          onChange={(e) => setHypothesisField('firstRedFlag', e.target.value)}
          placeholder="What was the first suspicious detail you noticed?"
          className="form-field w-full p-4 h-24 resize-none font-mono text-[13px] text-foreground placeholder:text-text-tertiary outline-none"
        />
      </motion.div>

      {/* 3. Biases */}
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Search size={14} className="text-heist-blue" />
          <h2 className="font-typewriter text-sm tracking-wider text-foreground">3. MANIPULATION TACTICS USED</h2>
          <span className="font-mono text-[10px] text-text-tertiary">(select all that apply)</span>
        </div>
        <div className="space-y-2">
          {BIAS_OPTIONS.map((opt) => {
            const selected = hypothesis.biasTrap.includes(opt.id);
            return (
              <motion.button
                key={opt.id}
                onClick={() => toggleBias(opt.id)}
                className={`form-field w-full p-3 text-left flex items-center gap-3 transition-all ${
                  selected ? 'ring-1 ring-heist-blue border-heist-blue/40' : 'hover:border-heist-blue/20'
                }`}
                whileTap={{ scale: 0.99 }}
              >
                {selected
                  ? <CheckCircle2 size={16} className="text-heist-blue flex-shrink-0" />
                  : <Circle size={16} className="text-text-tertiary flex-shrink-0" />}
                <div>
                  <span className="font-typewriter text-xs text-foreground">{opt.label}</span>
                  <span className="font-mono text-[10px] text-text-tertiary ml-2">{opt.desc}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* 4. Intervention Point */}
      <motion.div variants={fadeUp} className="mb-10">
        <h2 className="font-typewriter text-sm tracking-wider text-foreground mb-3">
          4. WHEN SHOULD PRIYA HAVE STOPPED?
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {TIMELINE_NODES.map((node) => {
            const selected = hypothesis.interventionPoint === node.id;
            return (
              <motion.button
                key={node.id}
                onClick={() => setHypothesisField('interventionPoint', node.id)}
                className={`flex-shrink-0 text-center px-4 py-3 rounded-sm border transition-all ${
                  selected
                    ? 'border-heist-red bg-heist-red/10 shadow-sm'
                    : 'border-border hover:border-heist-red/30'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`font-typewriter text-xs ${selected ? 'text-heist-red' : 'text-foreground'}`}>
                  {node.label}
                </div>
                <div className="font-mono text-[9px] text-text-tertiary mt-0.5">{node.sublabel}</div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div variants={fadeUp}>
        {!showConfirm ? (
          <motion.button
            onClick={() => canSubmit && setShowConfirm(true)}
            disabled={!canSubmit}
            className={`btn-stamp w-full py-4 text-sm ${!canSubmit ? 'opacity-40 cursor-not-allowed' : ''}`}
            whileHover={canSubmit ? { scale: 1.01 } : {}}
            whileTap={canSubmit ? { scale: 0.98 } : {}}
          >
            SUBMIT HYPOTHESIS & SEE RESULTS →
          </motion.button>
        ) : (
          <div className="paper-card p-5 text-center">
            <p className="font-body text-sm text-text-secondary mb-4">
              Once you submit, you'll see how your analysis compares to the actual case breakdown.<br />
              <strong>This cannot be undone.</strong>
            </p>
            <div className="flex justify-center gap-3">
              <motion.button
                onClick={handleSubmit}
                className="btn-stamp px-6 py-2 text-sm"
                whileTap={{ scale: 0.97 }}
              >
                CONFIRM & SUBMIT
              </motion.button>
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-ghost text-xs"
              >
                GO BACK
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
