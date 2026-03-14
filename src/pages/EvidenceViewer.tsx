import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvestigationStore, EvidenceType } from '@/store/investigationStore';
import MeeraPanel from '@/components/MeeraPanel';
import WhatsAppEvidence from '@/components/evidence/WhatsAppEvidence';
import TransactionsEvidence from '@/components/evidence/TransactionsEvidence';
import ContractEvidence from '@/components/evidence/ContractEvidence';
import WebsiteEvidence from '@/components/evidence/WebsiteEvidence';
import BankStatementEvidence from '@/components/evidence/BankStatementEvidence';
import LinkedInEvidence from '@/components/evidence/LinkedInEvidence';
import EmailEvidence from '@/components/evidence/EmailEvidence';
import PaymentEvidence from '@/components/evidence/PaymentEvidence';
import TalentBridgeWebsite from '@/components/evidence/TalentBridgeWebsite';
import OfferLetterEvidence from '@/components/evidence/OfferLetterEvidence';

const EVIDENCE_ORDER_047: EvidenceType[] = ['whatsapp', 'transactions', 'contract', 'website', 'bankstatement'];
const EVIDENCE_LABELS_047: Record<string, string> = {
  whatsapp: 'WhatsApp Thread',
  transactions: 'UPI Transactions',
  contract: 'Investment Agreement',
  website: 'Company Website',
  bankstatement: 'Bank Statement',
};

const EVIDENCE_ORDER_048: EvidenceType[] = ['linkedin', 'email', 'payment', 'talentbridge', 'offerletter'];
const EVIDENCE_LABELS_048: Record<string, string> = {
  linkedin: 'LinkedIn DMs',
  email: 'Offer Letter Email',
  payment: 'Payment Log',
  talentbridge: 'Company Website',
  offerletter: 'Offer Letter PDF',
};

export default function EvidenceViewer() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { caseStarted, annotations } = useInvestigationStore();
  const [meeraOpen, setMeeraOpen] = useState(false);

  const is048 = location.pathname.startsWith('/case-048');
  const EVIDENCE_ORDER = is048 ? EVIDENCE_ORDER_048 : EVIDENCE_ORDER_047;
  const EVIDENCE_LABELS = is048 ? EVIDENCE_LABELS_048 : EVIDENCE_LABELS_047;
  const casePrefix = is048 ? '/case-048' : '';
  const caseNum = is048 ? '048' : '047';

  useEffect(() => {
    if (!caseStarted) navigate(is048 ? '/case-048/evidence' : '/case');
  }, [caseStarted, navigate, is048]);


  if (!type || !EVIDENCE_ORDER.includes(type as EvidenceType)) {
    navigate(is048 ? '/case-048/evidence' : '/case');
    return null;
  }

  const currentIdx = EVIDENCE_ORDER.indexOf(type as EvidenceType);
  const prevType = currentIdx > 0 ? EVIDENCE_ORDER[currentIdx - 1] : null;
  const nextType = currentIdx < EVIDENCE_ORDER.length - 1 ? EVIDENCE_ORDER[currentIdx + 1] : null;
  const annotationCount = (et: string) => annotations.filter(a => a.evidenceType === et).length;

  const renderEvidence = () => {
    switch (type) {
      case 'whatsapp': return <WhatsAppEvidence />;
      case 'transactions': return <TransactionsEvidence />;
      case 'contract': return <ContractEvidence />;
      case 'website': return <WebsiteEvidence />;
      case 'bankstatement': return <BankStatementEvidence />;
      case 'linkedin': return <LinkedInEvidence />;
      case 'email': return <EmailEvidence />;
      case 'payment': return <PaymentEvidence />;
      case 'talentbridge': return <TalentBridgeWebsite />;
      case 'offerletter': return <OfferLetterEvidence />;
      default: return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-52px)] overflow-hidden">
      {/* Left sidebar — desktop only */}
      <div className="hidden lg:block w-[200px] border-r border-border p-4 flex-shrink-0">
        <span className="font-typewriter text-[11px] tracking-[0.3em] text-text-tertiary block mb-4">EVIDENCE</span>
        <div className="space-y-1">
          {EVIDENCE_ORDER.map((et) => {
            const isActive = et === type;
            const count = annotationCount(et);
            return (
              <button
                key={et}
                onClick={() => navigate(`${casePrefix}/evidence/${et}`)}
                className={`w-full text-left px-3 py-2.5 rounded-sm transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-bg-elevated border-l-[3px] border-l-heist-red'
                    : 'hover:bg-bg-elevated/50'
                }`}
              >
                <span className={`font-typewriter text-xs ${isActive ? 'text-foreground' : 'text-text-secondary'}`}>
                  {EVIDENCE_LABELS[et]}
                </span>
                {count > 0 && (
                  <span className="font-mono text-[9px] bg-heist-amber/20 text-heist-amber px-1.5 py-0.5 rounded-sm">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => navigate(`${casePrefix}/hypothesis`)}
          className="btn-stamp-outline w-full mt-6 text-[10px] py-2"
        >
          SUBMIT HYPOTHESIS →
        </button>
      </div>

      {/* Center */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* Breadcrumb */}
        <div className="font-mono text-[11px] text-text-tertiary mb-4">
          CASE #{caseNum} → EVIDENCE → {EVIDENCE_LABELS[type]?.toUpperCase()}
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => prevType && navigate(`${casePrefix}/evidence/${prevType}`)}
            disabled={!prevType}
            className="btn-ghost font-typewriter text-xs disabled:opacity-30"
          >
            ← PREV
          </button>
          <span className="font-mono text-[11px] text-text-tertiary">
            {currentIdx + 1} OF {EVIDENCE_ORDER.length}
          </span>
          <button
            onClick={() => nextType && navigate(`${casePrefix}/evidence/${nextType}`)}
            disabled={!nextType}
            className="btn-ghost font-typewriter text-xs disabled:opacity-30"
          >
            NEXT →
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {renderEvidence()}
          </motion.div>
        </AnimatePresence>

        {/* Mobile bottom nav */}
        <div className="lg:hidden flex gap-2 mt-6 overflow-x-auto pb-2">
          {EVIDENCE_ORDER.map((et) => (
            <button
              key={et}
              onClick={() => navigate(`${casePrefix}/evidence/${et}`)}
              className={`flex-shrink-0 font-typewriter text-[10px] px-3 py-1.5 rounded-sm border ${
                et === type ? 'border-heist-red text-heist-red' : 'border-border text-text-secondary'
              }`}
            >
              {EVIDENCE_LABELS[et]}
            </button>
          ))}
        </div>
      </div>

      {/* Right — Meera */}
      <div className="hidden lg:block">
        <MeeraPanel evidenceType={type} />
      </div>

      {/* Mobile Meera */}
      <div className="lg:hidden">
        {meeraOpen ? (
          <div className="fixed inset-x-0 bottom-0 z-50 h-[70vh] bg-card border-t border-border">
            <MeeraPanel evidenceType={type} onToggle={() => setMeeraOpen(false)} />
          </div>
        ) : (
          <MeeraPanel evidenceType={type} collapsed onToggle={() => setMeeraOpen(true)} />
        )}
      </div>
    </div>
  );
}
