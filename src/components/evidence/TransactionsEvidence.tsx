import { useState } from 'react';
import { useInvestigationStore, AnnotationType } from '@/store/investigationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const TRANSACTIONS = [
  { id: 'jul1',  date: '01 Jul 2024', desc: 'SALARY — INFOSYS LTD',        debit: '',          credit: '₹85,000',    balance: '₹1,42,391', highlight: '' },
  { id: 'jul15', date: '15 Jul 2024', desc: 'RENT — UPI/TRANSFER',          debit: '₹18,000',  credit: '',           balance: '₹1,24,391', highlight: '' },
  { id: 'aug1',  date: '01 Aug 2024', desc: 'SALARY — INFOSYS LTD',        debit: '',          credit: '₹85,000',    balance: '₹2,09,391', highlight: '' },
  { id: 'aug20', date: '20 Aug 2024', desc: 'SWIGGY/AMAZON/MISC',           debit: '₹12,400',  credit: '',           balance: '₹1,96,991', highlight: '' },
  { id: 'sep1',  date: '01 Sep 2024', desc: 'SALARY — INFOSYS LTD',        debit: '',          credit: '₹85,000',    balance: '₹2,81,991', highlight: '' },
  { id: 'sep20', date: '20 Sep 2024', desc: 'UPI/WEALTHGROW SOLUTIONS',     debit: '₹50,000',  credit: '',           balance: '₹2,31,991', highlight: 'bg-heist-amber/10' },
  { id: 'oct1',  date: '01 Oct 2024', desc: 'SALARY — INFOSYS LTD',        debit: '',          credit: '₹85,000',    balance: '₹3,16,991', highlight: '' },
  { id: 'oct8',  date: '08 Oct 2024', desc: 'UPI/WEALTHGROW — AVG DOWN',   debit: '₹70,000',  credit: '',           balance: '₹2,46,991', highlight: 'bg-heist-red/10' },
  { id: 'nov1',  date: '01 Nov 2024', desc: 'SALARY — INFOSYS LTD',        debit: '',          credit: '₹85,000',    balance: '₹3,31,991', highlight: '' },
  { id: 'nov10', date: '10 Nov 2024', desc: 'UPI/WEALTHGROW — PREMIUM',    debit: '₹20,000',  credit: '',           balance: '₹3,11,991', highlight: 'bg-heist-red/15' },
  { id: 'dec1',  date: '01 Dec 2024', desc: 'SALARY — INFOSYS LTD',        debit: '',          credit: '₹85,000',    balance: '₹3,96,991', highlight: '' },
  { id: 'dec9',  date: '09 Dec 2024', desc: 'UPI/WEALTHGROW — FINAL',      debit: '₹1,00,000', credit: '',          balance: '₹2,96,991', highlight: 'bg-heist-red/25' },
  { id: 'dec31', date: '31 Dec 2024', desc: 'VARIOUS EXPENSES',             debit: '₹93,600',  credit: '',           balance: '₹3,391',    highlight: '' },
];

// Inline annotation row — avoids wrapping <tr> with a <div> which breaks table layout
function AnnotatableRow({ t, i }: { t: typeof TRANSACTIONS[0]; i: number }) {
  const [show, setShow] = useState(false);
  const { annotations, addAnnotation, removeAnnotation } = useInvestigationStore();

  const existing = annotations.find(
    (a) => a.evidenceType === 'transactions' && a.itemId === t.id
  );

  const handleAnnotate = (type: AnnotationType) => {
    if (existing) {
      removeAnnotation(existing.id);
      if (existing.annotationType === type) return;
    }
    addAnnotation({ evidenceType: 'transactions', itemId: t.id, annotationType: type, text: '' });
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
        {/* Annotation toolbar — floats above the row */}
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

export default function TransactionsEvidence() {
  const { viewEvidence } = useInvestigationStore();
  useEffect(() => { viewEvidence('transactions'); }, []);

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="paper-card p-6">
        <div className="mb-4">
          <h3 className="font-typewriter text-base text-foreground">HDFC Bank — Account Statement</h3>
          <p className="font-mono text-[11px] text-text-tertiary">A/C: XXXX-XXXX-4521 · Period: Jul 2024 — Dec 2024</p>
          <p className="font-mono text-xs text-text-secondary mt-1">Opening Balance: ₹57,391</p>
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
            'Total to WealthGrow: ₹2,40,000',
            'Over 4 months',
            'Avg: ₹60k/transfer',
          ].map((s) => (
            <span key={s} className="font-mono text-[11px] text-text-secondary bg-bg-elevated px-3 py-1 rounded-sm border border-border">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 text-right">
          <span className="font-mono text-sm font-bold text-heist-red">Closing Balance: ₹3,391</span>
        </div>
      </div>
    </div>
  );
}
