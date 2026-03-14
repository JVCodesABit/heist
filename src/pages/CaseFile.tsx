import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvestigationStore, EvidenceType } from '@/store/investigationStore';
import { useEffect } from 'react';
import { MessageSquare, BarChart2, FileText, Globe, Landmark, ChevronRight } from 'lucide-react';

const EVIDENCE_ITEMS: Array<{
  type: EvidenceType;
  Icon: React.ElementType;
  title: string;
  subtitle: string;
  rotation: string;
  color: string;
}> = [
  { type: 'whatsapp',     Icon: MessageSquare, title: 'WhatsApp Thread',        subtitle: 'Arjun & Vikram · 47 messages · 4 months',   rotation: '-0.5deg', color: '#25D366' },
  { type: 'transactions', Icon: BarChart2,     title: 'UPI Transaction History', subtitle: 'HDFC Bank export · 6 months',               rotation: '0.4deg',  color: '#3B82F6' },
  { type: 'contract',     Icon: FileText,      title: 'Investment Agreement',    subtitle: 'WealthGrow Solutions Pvt Ltd · 4 pages',    rotation: '-0.3deg', color: '#F59E0B' },
  { type: 'website',      Icon: Globe,         title: 'Company Website',         subtitle: 'wealthgrow.in · Captured Nov 2024',          rotation: '0.5deg',  color: '#8B5CF6' },
  { type: 'bankstatement',Icon: Landmark,      title: 'Bank Statement',          subtitle: 'HDFC Savings · Sept–Dec 2024',              rotation: '-0.4deg', color: '#EF4444' },
];

// Shared stagger config
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function CaseFile() {
  const navigate = useNavigate();
  const { caseStarted, evidenceViewed } = useInvestigationStore();

  useEffect(() => {
    if (!caseStarted) navigate('/');
  }, [caseStarted, navigate]);

  const reviewedCount = evidenceViewed.length;

  return (
    <div className="min-h-[calc(100vh-56px)] px-4 md:px-8 py-8 max-w-[1200px] mx-auto">
      <motion.div
        className="flex flex-col lg:flex-row gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* ── LEFT COLUMN ── */}
        <div className="lg:w-[55%] space-y-5">

          {/* Case Header */}
          <motion.div variants={fadeUp} className="paper-card p-5 relative overflow-hidden">
            {/* Subtle red glow top-right */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-heist-red/10 blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="font-mono text-[10px] text-text-tertiary tracking-[0.3em]">FILE NO: 4729-B</span>
                <h1 className="font-typewriter text-2xl text-foreground mt-0.5">THE FRIENDLY BROKER</h1>
              </div>
              <motion.span
                className="red-stamp text-[10px]"
                initial={{ rotate: -6, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 5, opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 14 }}
              >
                ACTIVE
              </motion.span>
            </div>
            <div className="border-t border-border pt-3 flex flex-wrap gap-x-8 gap-y-1">
              <span className="font-typewriter text-xs text-muted-foreground">OPENED: September 2024</span>
              <span className="font-typewriter text-xs text-muted-foreground flex items-center gap-1.5">
                STATUS:
                <motion.span
                  className="w-2 h-2 rounded-full bg-heist-red inline-block"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                />
                ACTIVE INVESTIGATION
              </span>
            </div>
          </motion.div>

          {/* Victim Profile */}
          <motion.div variants={fadeUp} className="paper-card p-5 bg-bg-elevated relative">
            {/* Paperclip staples */}
            <div className="absolute top-2 left-4 w-3 h-6 bg-muted-foreground/20 rounded-sm" />
            <div className="absolute top-2 right-4 w-3 h-6 bg-muted-foreground/20 rounded-sm" />
            <div className="flex items-start gap-4 pt-2">
              <motion.div
                className="w-[52px] h-[52px] rounded-full bg-heist-blue flex items-center justify-center flex-shrink-0"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 300, damping: 18 }}
              >
                <span className="font-typewriter text-lg text-primary-foreground">AM</span>
              </motion.div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-typewriter text-base text-foreground">Arjun Mehta</span>
                  {['INVESTMENT FRAUD', 'VICTIM', 'ONGOING'].map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="font-mono text-[9px] text-muted-foreground border border-border px-1.5 py-0.5 rounded-sm"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <p className="font-mono text-xs text-text-secondary">23 · Software engineer · Bangalore</p>
              </div>
            </div>
          </motion.div>

          {/* Handwritten case summary */}
          <motion.div
            variants={fadeUp}
            className="paper-card p-5"
            style={{ transform: 'rotate(-0.3deg)' }}
            whileHover={{ rotate: 0, scale: 1.005, transition: { duration: 0.2 } }}
          >
            <span className="text-heist-red text-5xl font-body leading-none">"</span>
            <p className="font-handwritten text-base text-text-secondary leading-[1.85] -mt-4 ml-4">
              Arjun believes he made a legitimate investment. He is still waiting for returns that will never come.
              He trusted a man named Vikram Khanna, who called himself a SEBI-registered advisor.
              The money moved in four tranches over four months. Each time, Vikram had a reason. Each time, Arjun believed him.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
            {[
              { value: '₹2,40,000', label: 'AMOUNT LOST',      color: 'text-heist-red'   },
              { value: '4 months',  label: 'DURATION',          color: 'text-heist-amber' },
              { value: '₹0',        label: 'RETURNS RECEIVED',  color: 'text-text-secondary' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="form-field text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
              >
                <div className={`font-mono text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="font-typewriter text-[10px] text-text-tertiary tracking-wider mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Briefing */}
          <motion.div variants={fadeUp} className="evidence-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="stamp-badge text-heist-amber border-heist-amber">⚠ BRIEFING</span>
            </div>
            <p className="font-mono text-[13px] text-text-secondary leading-relaxed">
              You are assigned as lead investigator. Review each piece of evidence carefully.
              Annotate anything suspicious — red flags, psychological tactics, or claims worth verifying.
              When ready, submit your hypothesis about what happened and how.
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — Evidence Folder ── */}
        <motion.div variants={fadeUp} className="lg:w-[45%]">
          {/* Folder tab */}
          <div className="folder-tab inline-block mb-0">📁 EVIDENCE FOLDER — 5 ITEMS</div>

          <div className="paper-card p-5">
            {/* Progress bar */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[11px] text-text-tertiary">{reviewedCount} of 5 reviewed</span>
                <span className="font-mono text-[11px] text-heist-green">{Math.round((reviewedCount / 5) * 100)}%</span>
              </div>
              <div className="w-full h-[4px] bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-heist-green to-heist-green/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(reviewedCount / 5) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Evidence items */}
            <div className="space-y-2.5">
              {EVIDENCE_ITEMS.map((item, i) => {
                const isViewed = evidenceViewed.includes(item.type);
                const { Icon } = item;
                return (
                  <motion.button
                    key={item.type}
                    onClick={() => navigate(`/evidence/${item.type}`)}
                    className="w-full paper-card p-3.5 flex items-center gap-3 text-left relative overflow-hidden group"
                    style={{ transform: `rotate(${item.rotation})` }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{
                      rotate: 0,
                      scale: 1.015,
                      transition: { duration: 0.18, ease: 'easeOut' },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Hover shimmer */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(135deg, ${item.color}08, transparent)` }}
                    />

                    {/* Paper clip */}
                    <div className="absolute -top-1 right-4 w-3.5 h-5 border-2 border-muted-foreground/25 rounded-t-full" />

                    {/* Icon box */}
                    <div
                      className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}18` }}
                    >
                      <Icon size={17} style={{ color: item.color }} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-typewriter text-sm text-foreground">{item.title}</div>
                      <div className="font-mono text-[10px] text-text-tertiary truncate mt-0.5">{item.subtitle}</div>
                    </div>

                    {/* Status + chevron */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isViewed ? (
                        <span className="green-stamp rotate-[-2deg] text-[8px]">REVIEWED ✓</span>
                      ) : (
                        <span className="red-stamp text-[8px] rotate-[6deg] py-0.5 px-1.5">UNREAD</span>
                      )}
                      <ChevronRight size={14} className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Begin button */}
            <motion.button
              onClick={() => navigate('/evidence/whatsapp')}
              className="btn-stamp w-full mt-5 text-sm relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.4 }}
            >
              BEGIN INVESTIGATION →
            </motion.button>
            <p className="font-mono text-[11px] text-text-tertiary text-center mt-2">
              Start with any piece of evidence above
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
