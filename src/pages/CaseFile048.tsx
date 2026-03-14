import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvestigationStore, EvidenceType } from '@/store/investigationStore';
import { useEffect } from 'react';
import { MessageSquare, Mail, CreditCard, Globe, FileText, ChevronRight } from 'lucide-react';

const EVIDENCE_ITEMS: Array<{
  type: EvidenceType;
  Icon: React.ElementType;
  title: string;
  subtitle: string;
  rotation: string;
  color: string;
}> = [
  { type: 'linkedin',      Icon: MessageSquare, title: 'LinkedIn DMs',           subtitle: 'Ananya Mehta & Priya · 12 messages',          rotation: '-0.5deg', color: '#0A66C2' },
  { type: 'email',         Icon: Mail,          title: 'Offer Letter Email',     subtitle: 'From hr@deloitte-careers.in',                  rotation: '0.4deg',  color: '#EA4335' },
  { type: 'payment',       Icon: CreditCard,    title: 'Payment Log',            subtitle: 'SBI Bank · 4 transfers to TalentBridge',       rotation: '-0.3deg', color: '#3B82F6' },
  { type: 'talentbridge',  Icon: Globe,         title: 'Company Website',        subtitle: 'talentbridge-consulting.com',                  rotation: '0.5deg',  color: '#8B5CF6' },
  { type: 'offerletter',   Icon: FileText,      title: 'Offer Letter PDF',       subtitle: 'Deloitte India · 3 pages',                    rotation: '-0.4deg', color: '#F59E0B' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function CaseFile048() {
  const navigate = useNavigate();
  const { caseStarted, evidenceViewed } = useInvestigationStore();

  useEffect(() => {
    if (!caseStarted) navigate('/case-048');
  }, [caseStarted, navigate]);

  const reviewedCount = evidenceViewed.length;

  return (
    <div className="min-h-[calc(100vh-52px)] px-4 md:px-8 py-8 max-w-[860px] mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-mono text-[10px] text-text-tertiary tracking-[0.3em]">CASE #048</span>
        <h1 className="font-typewriter text-2xl md:text-[32px] text-foreground mt-1">The Dream Job</h1>
        <p className="font-body text-sm text-text-secondary mt-2 max-w-[600px]">
          Priya Sharma, 26, MBA graduate from Delhi, was job hunting for 3 months when she received a LinkedIn message
          from "Ananya Mehta, Senior Recruiter" at TalentBridge Consulting — offering an ₹18 LPA role at Deloitte.
          She lost ₹85,000 in "placement fees" over 6 weeks.
        </p>
      </motion.div>

      {/* Progress */}
      <motion.div
        className="flex items-center gap-3 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex-1 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-heist-red rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(reviewedCount / 5) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <span className="font-mono text-[11px] text-text-tertiary">{reviewedCount}/5</span>
      </motion.div>

      {/* Evidence grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {EVIDENCE_ITEMS.map((item) => {
          const viewed = evidenceViewed.includes(item.type);
          return (
            <motion.div
              key={item.type}
              variants={fadeUp}
              onClick={() => navigate(`/case-048/evidence/${item.type}`)}
              className="paper-card p-5 cursor-pointer group relative overflow-hidden"
              style={{ rotate: item.rotation }}
              whileHover={{ rotate: '0deg', y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <item.Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-typewriter text-sm text-foreground">{item.title}</h3>
                    {viewed && (
                      <span className="font-mono text-[9px] text-heist-green bg-heist-green/10 px-1.5 py-0.5 rounded-sm">
                        VIEWED
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-text-tertiary">{item.subtitle}</p>
                </div>
                <ChevronRight size={16} className="text-text-tertiary group-hover:text-foreground transition-colors mt-3" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Submit hypothesis CTA */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => navigate('/case-048/hypothesis')}
          className={`btn-stamp w-full py-3 text-sm ${reviewedCount < 3 ? 'opacity-50' : ''}`}
          disabled={reviewedCount < 3}
          whileHover={reviewedCount >= 3 ? { scale: 1.01 } : {}}
          whileTap={reviewedCount >= 3 ? { scale: 0.98 } : {}}
        >
          {reviewedCount < 3
            ? `REVIEW ${3 - reviewedCount} MORE EVIDENCE TO SUBMIT HYPOTHESIS`
            : 'SUBMIT YOUR HYPOTHESIS →'}
        </motion.button>
        <p className="font-mono text-[10px] text-text-tertiary text-center mt-2">
          Review at least 3 pieces of evidence before forming your hypothesis
        </p>
      </motion.div>
    </div>
  );
}
