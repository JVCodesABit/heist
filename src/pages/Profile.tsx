import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Share2, RotateCcw, Lock, TrendingUp, Target, BookOpen, AlertOctagon } from 'lucide-react';

const ARCHETYPE_DESCRIPTIONS: Record<string, string> = {
  'The Forensic Mind':          "You see what others miss. Every detail, every inconsistency, every buried clause — you caught them all. In a world of sophisticated financial manipulation, you represent the rare individual who cannot be easily deceived. Your analytical instincts are exceptional.",
  'The Pattern Tracker':        "You identified the majority of manipulation tactics and understood the psychological framework behind them. You have strong investigative instincts and a healthy skepticism that protects you from most deception. A few subtle details slipped past, but your overall pattern recognition is impressive.",
  'The Learning Investigator':  "You caught several key tactics but missed others — especially the subtle ones embedded in fine print or disguised as legitimate business practices. You're building awareness, and this investigation has sharpened your ability to detect manipulation.",
  'The Vulnerable Observer':    "You identified some warning signs but missed critical manipulation tactics. This isn't a failure — it's exactly how these scams work. They exploit the blind spots that exist in all of us. The fact that you're investigating means you're already ahead of most people.",
  'The Perfect Victim':         "You missed most of the manipulation tactics — and that's precisely the point. These scams are designed to bypass rational analysis. They use urgency, authority, and emotional engagement to prevent exactly the kind of scrutiny you're now learning to apply.",
};

const BLIND_SPOT_TEXT: Record<string, { title: string; text: string }> = {
  fine_print_blindness: { title: 'Fine Print Blindness',   text: "You didn't catch Clause 7.1 — the 24-month lock-in with a 35% withdrawal penalty. Always read the withdrawal and termination clauses first. Scammers deliberately make contracts long and boring, hiding the trap in dense legal language." },
  authority_trust:      { title: 'Authority Trust',        text: "You missed the urgency and manipulation in Vikram's messages. When someone claims authority (SEBI registration, client success stories), we tend to trust their communication style as well. Urgency from an 'authority' feels legitimate when it shouldn't." },
  number_avoidance:     { title: 'Number Avoidance',       text: "You didn't closely examine the transaction patterns. The escalating amounts (₹50k → ₹70k → ₹20k → ₹1L) and the complete absence of returns tell the entire story. Following the money is the single most effective fraud detection technique." },
};

const ARCHETYPE_COLOR: Record<string, string> = {
  'The Forensic Mind':          'from-heist-green/20 to-transparent border-heist-green/40',
  'The Pattern Tracker':        'from-heist-blue/20  to-transparent border-heist-blue/40',
  'The Learning Investigator':  'from-heist-amber/20 to-transparent border-heist-amber/40',
  'The Vulnerable Observer':    'from-heist-amber/15 to-transparent border-heist-amber/30',
  'The Perfect Victim':         'from-heist-red/15   to-transparent border-heist-red/30',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

function AnimatedCount({ target, delay = 0 }: { target: number; delay?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        setCount(start);
        if (start >= target) clearInterval(timer);
      }, 25);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return <>{count}</>;
}

export default function Profile() {
  const navigate = useNavigate();
  const { hypothesis, results, evidenceViewed, annotations } = useInvestigationStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!hypothesis.submitted) navigate('/breakdown');
  }, [hypothesis.submitted, navigate]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const circumference = 2 * Math.PI * 38;
  const offset = circumference - (results.score / 100) * circumference;

  const ringColor =
    results.score >= 90 ? '#22C55E' :
    results.score >= 70 ? '#3B82F6' :
    results.score >= 50 ? '#F59E0B' :
    '#EF4444';

  const archetypeGradient = ARCHETYPE_COLOR[results.investigatorType] ?? 'from-heist-blue/15 to-transparent border-heist-blue/30';

  const shareText = `🔍 HEIST — Case #047: The Friendly Broker\n\nInvestigator Type: ${results.investigatorType}\nScore: ${results.score}/100\nTactics Caught: ${results.tacticsCaught}/8\nEvidence Reviewed: ${evidenceViewed.length}/5\n\nCan you do better? Play at heist.app`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    toast.success('Copied to clipboard ✓');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const blindSpot = results.blindSpot ? BLIND_SPOT_TEXT[results.blindSpot] : null;

  const STATS = [
    { value: results.tacticsCaught, total: 8,    label: 'Tactics Caught',    Icon: Target,   color: 'text-heist-green' },
    { value: results.score,         total: 100,   label: 'Score',             Icon: TrendingUp, color: ringColor.startsWith('#') ? undefined : 'text-heist-blue' },
    { value: evidenceViewed.length, total: 5,     label: 'Evidence',          Icon: BookOpen, color: 'text-heist-amber' },
    { value: annotations.length,    total: null,  label: 'Annotations',       Icon: AlertOctagon, color: 'text-heist-blue' },
  ];

  return (
    <motion.div
      className="min-h-[calc(100vh-56px)] px-4 md:px-8 py-8 max-w-[820px] mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* ── Header ── */}
      <motion.div variants={fadeUp} className="mb-8">
        <motion.span
          className="font-mono text-[10px] tracking-[0.3em] text-heist-green flex items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-heist-green inline-block"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
          INVESTIGATION COMPLETE
        </motion.span>
        <h1 className="font-typewriter text-2xl md:text-[32px] text-foreground mt-1">Your Investigator Profile</h1>
      </motion.div>

      {/* ── Archetype Card ── */}
      <motion.div
        variants={fadeUp}
        className={`paper-card overflow-hidden mb-8 bg-gradient-to-br ${archetypeGradient}`}
      >
        <div className="p-6 flex items-center gap-6">
          {/* Animated score ring */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 220, damping: 16 }}
          >
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="38" fill="none" stroke="hsl(var(--border))" strokeWidth="5" />
              <motion.circle
                cx="44" cy="44" r="38"
                fill="none"
                stroke={ringColor}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-2xl font-bold text-foreground leading-none">
                <AnimatedCount target={results.score} delay={0.5} />
              </span>
              <span className="font-mono text-[10px] text-text-tertiary">/100</span>
            </div>
          </motion.div>

          <div>
            <motion.h2
              className="font-typewriter text-xl md:text-2xl text-foreground"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {results.investigatorType}
            </motion.h2>
            <motion.div
              className="flex flex-wrap gap-2 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <span className="font-mono text-[10px] text-heist-green bg-heist-green/10 px-2 py-0.5 rounded-sm">
                {results.tacticsCaught}/8 tactics caught
              </span>
            </motion.div>
          </div>
        </div>
        <div className="px-6 pb-6 border-t border-border/40 pt-5">
          <p className="font-handwritten text-[15px] text-text-secondary leading-[1.8]">
            {results.investigatorType ? ARCHETYPE_DESCRIPTIONS[results.investigatorType] : ''}
          </p>
        </div>
      </motion.div>

      {/* ── Stats Grid ── */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {STATS.map(({ value, total, label, Icon, color }, i) => (
          <motion.div
            key={label}
            className="form-field text-center p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.07 }}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
          >
            <Icon size={16} className={`mx-auto mb-2 ${color ?? 'text-foreground'}`} />
            <div className="font-mono text-xl font-bold text-foreground">
              <AnimatedCount target={value} delay={0.55 + i * 0.07} />
              {total && <span className="text-text-tertiary text-sm">/{total}</span>}
            </div>
            <div className="font-typewriter text-[9px] text-text-tertiary tracking-wider mt-1">{label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Blind Spot ── */}
      <AnimatePresence>
        {blindSpot && (
          <motion.div
            className="evidence-card p-5 mb-8 border-l-4 border-l-heist-amber"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <span className="font-typewriter text-[10px] text-heist-amber tracking-[0.2em]">YOUR BLIND SPOT</span>
            <h3 className="font-typewriter text-base text-foreground mt-2 mb-2">{blindSpot.title}</h3>
            <p className="font-body text-[13px] text-text-secondary leading-relaxed">{blindSpot.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── What You Learned ── */}
      <motion.div variants={fadeUp} className="mb-8">
        <h3 className="font-typewriter text-sm tracking-wider text-text-tertiary mb-4">WHAT YOU LEARNED</h3>
        <div className="space-y-3">
          {[
            { color: 'border-l-heist-amber', dot: 'bg-heist-amber', title: 'Urgency is Always a Red Flag',  text: "Legitimate investments don't have expiring spots or 24-hour deadlines. Any pressure to act fast is designed to bypass your critical thinking." },
            { color: 'border-l-heist-red',   dot: 'bg-heist-red',   title: 'Verify Before You Trust',       text: "SEBI registration numbers can be checked on sebi.gov.in in 30 seconds. Company registration on MCA. Always verify credentials before transferring money." },
            { color: 'border-l-heist-blue',  dot: 'bg-heist-blue',  title: 'Follow the Money',              text: "Legitimate advisors manage money through registered mutual funds or demat accounts — never personal UPI transfers. If money flows to a personal account, it's not a real investment." },
          ].map((lesson, i) => (
            <motion.div
              key={lesson.title}
              className={`paper-card p-5 border-l-4 ${lesson.color}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75 + i * 0.1 }}
              whileHover={{ x: 4, transition: { duration: 0.15 } }}
            >
              <h4 className="font-typewriter text-sm text-foreground mb-1">{lesson.title}</h4>
              <p className="font-body text-[13px] text-text-secondary leading-relaxed">{lesson.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Next Case Teaser ── */}
      <motion.div
        variants={fadeUp}
        className="paper-card p-5 mb-8 relative overflow-hidden"
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-elevated/50 pointer-events-none" />
        <div className="flex items-center gap-3 mb-2">
          <Lock size={14} className="text-text-tertiary" />
          <span className="font-mono text-[10px] text-text-tertiary tracking-wider">NEXT CASE — LOCKED</span>
        </div>
        <h4 className="font-typewriter text-sm text-foreground">Case #048 — The Dream Job</h4>
        <p className="font-body text-[13px] text-text-secondary mt-1">A job offer too good to be true. Coming soon.</p>
        <button disabled className="btn-stamp-outline text-xs mt-3 opacity-40 cursor-not-allowed">
          COMING SOON
        </button>
      </motion.div>

      {/* ── Share ── */}
      <motion.div variants={fadeUp} className="paper-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Share2 size={13} className="text-text-tertiary" />
          <span className="font-typewriter text-xs text-text-tertiary tracking-wider">SHARE YOUR PROFILE</span>
        </div>
        <pre className="font-mono text-[11px] text-text-secondary bg-bg-elevated p-4 rounded-sm whitespace-pre-wrap overflow-x-auto border border-border leading-relaxed">
          {shareText}
        </pre>
        <div className="flex gap-3 mt-3">
          <motion.button
            onClick={handleCopy}
            className="btn-stamp-outline text-xs flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span key="copied" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  COPIED ✓
                </motion.span>
              ) : (
                <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Share2 size={12} /> COPY RESULT
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            onClick={() => navigate('/case')}
            className="btn-ghost text-xs flex items-center gap-1.5 font-typewriter"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw size={12} /> PLAY AGAIN
          </motion.button>
          <motion.button
            onClick={() => navigate('/')}
            className="btn-ghost text-xs flex items-center gap-1.5 font-typewriter"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            🏠 HOME
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
