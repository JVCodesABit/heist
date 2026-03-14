import { useState } from 'react';
import { useInvestigationStore, AnnotationType } from '@/store/investigationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const TRANSACTIONS = [
  { id: 'pay_sal1',   date: '01 Mar 2025', desc: 'SALARY — PREVIOUS EMPLOYER',       debit: '',          credit: '₹32,000',  balance: '₹1,18,400', highlight: '' },
  { id: 'pay_rent',   date: '05 Mar 2025', desc: 'RENT — UPI/TRANSFER',              debit: '₹12,000',  credit: '',          balance: '₹1,06,400', highlight: '' },
  { id: 'pay_bg',     date: '09 Mar 2025', desc: 'UPI/TALENTBRIDGE CONSULTING',      debit: '₹15,000',  credit: '',          balance: '₹91,400',   highlight: 'bg-heist-amber/10' },
  { id: 'pay_misc1',  date: '12 Mar 2025', desc: 'SWIGGY/AMAZON/MISC',               debit: '₹3,200',   credit: '',          balance: '₹88,200',   highlight: '' },
  { id: 'pay_train',  date: '14 Mar 2025', desc: 'UPI/TALENTBRIDGE — TRAINING FEE',  debit: '₹20,000',  credit: '',          balance: '₹68,200',   highlight: 'bg-heist-red/10' },
  { id: 'pay_dep',    date: '20 Mar 2025', desc: 'UPI/TALENTBRIDGE — SECURITY DEP',  debit: '₹25,000',  credit: '',          balance: '₹43,200',   highlight: 'bg-heist-red/15' },
  { id: 'pay_misc2',  date: '22 Mar 2025', desc: 'FLIPKART/ZOMATO',                  debit: '₹1,800',   credit: '',          balance: '₹41,400',   highlight: '' },
  { id: 'pay_offer',  date: '23 Mar 2025', desc: 'UPI/TALENTBRIDGE — OFFER PROC',    debit: '₹25,000',  credit: '',          balance: '₹16,400',   highlight: 'bg-heist-red/25' },
  { id: 'pay_sal2',   date: '01 Apr 2025', desc: 'SALARY — PREVIOUS EMPLOYER',       debit: '',          credit: '₹32,000',  balance: '₹48,400',   highlight: '' },
  { id: 'pay_misc3',  date: '10 Apr 2025', desc: 'VARIOUS EXPENSES',                  debit: '₹8,400',   credit: '',          balance: '₹40,000',   highlight: '' },
];

function AnnotatableRow({ t, i }: { t: typeof TRANSACTIONS[0]; i: number }) {
  const [show, setShow] = useState(false);
  const { annotations, addAnnotation, removeAnnotation } = useInvestigationStore();

  const existing = annotations.find(
    (a) => a.evidenceType === 'payment' && a.itemId === t.id
  );

  const handleAnnotate = (type: AnnotationType) => {
    if (existing) {
      removeAnnotation(existing.id);
      if (existing.annotationType === type) return;
    }
    addAnnotation({ evidenceType: 'payment', itemId: t.id, annotationType: type, text: '' });
  };

  const borderColor = existing
    ? existing.annotationType === 'red_flag' ? 'border-l-heist-red'
    : existing.annotationType === 'suspicious' ? 'border-l-heist-amber'
    : 'border-l-heist-blue'
    : '';

  return (
    <tr
      className={`border-b border-border/50 relative ${t.highlight} ${i % 2 === 0 ? '' : 'bg-bg-elevated/30'} ${existing ? `border-l-2 ${borderColor}` : ''}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <td className="font-mono text-[12px] text-text-secondary py-2 px-2 whitespace-nowrap relative">
        {t.date}
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              className="absolute -top-8 left-0 flex items-center gap-1 bg-card border border-border shadow-lg px-2 py-1 rounded-sm z-20"
            >
              {[
                { type: 'red_flag' as AnnotationType, emoji: '🚩' },
                { type: 'suspicious' as AnnotationType, emoji: '⚠️' },
                { type: 'verify' as AnnotationType, emoji: '🔍' },
              ].map(({ type, emoji }) => (
                <button
                  key={type}
                  onClick={() => handleAnnotate(type)}
                  className={`text-xs px-2 py-0.5 rounded-sm transition-colors ${
                    existing?.annotationType === type
                      ? type === 'red_flag' ? 'bg-heist-red/20 text-heist-red'
                      : type === 'suspicious' ? 'bg-heist-amber/20 text-heist-amber'
                      : 'bg-heist-blue/20 text-heist-blue'
                      : 'hover:bg-secondary'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </td>
      <td className="font-mono text-[12px] text-foreground py-2 px-2">{t.desc}</td>
      <td className="font-mono text-[12px] text-heist-red py-2 px-2 text-right">{t.debit}</td>
      <td className="font-mono text-[12px] text-heist-green py-2 px-2 text-right">{t.credit}</td>
      <td className="font-mono text-[12px] text-foreground py-2 px-2 text-right">{t.balance}</td>
    </tr>
  );
}

export default function PaymentEvidence() {
  const { viewEvidence } = useInvestigationStore();
  useEffect(() => { viewEvidence('payment'); }, []);

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="paper-card p-6">
        <div className="mb-4">
          <h3 className="font-typewriter text-base text-foreground">SBI Bank — Account Statement</h3>
          <p className="font-mono text-[11px] text-text-tertiary">A/C: XXXX-XXXX-7832 · Period: Mar 2025 — Apr 2025</p>
          <p className="font-mono text-xs text-text-secondary mt-1">Account Holder: Priya Sharma · Opening Balance: ₹86,400</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                {[
                  { label: 'Date',        align: 'text-left'  },
                  { label: 'Description', align: 'text-left'  },
                  { label: 'Debit',       align: 'text-right' },
                  { label: 'Credit',      align: 'text-right' },
                  { label: 'Balance',     align: 'text-right' },
                ].map(({ label, align }) => (
                  <th key={label} className={`font-typewriter text-[10px] tracking-wider text-text-tertiary py-2 px-2 ${align}`}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t, i) => (
                <AnnotatableRow key={t.id} t={t} i={i} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {[
            'Total to TalentBridge: ₹85,000',
            'Over 3 weeks',
            '4 separate transfers',
          ].map((s) => (
            <span key={s} className="font-mono text-[11px] text-text-secondary bg-bg-elevated px-3 py-1 rounded-sm border border-border">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 text-right">
          <span className="font-mono text-sm font-bold text-heist-red">Balance after scam: ₹16,400</span>
        </div>
      </div>
    </div>
  );
}
