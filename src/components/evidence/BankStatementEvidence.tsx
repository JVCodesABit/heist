import AnnotationToolbar from '@/components/AnnotationToolbar';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CHART_DATA = [
  { month: 'Sep', opening: 154450, closing: 111011 },
  { month: 'Oct', opening: 153011, closing: 97631 },
  { month: 'Nov', opening: 139631, closing: 74631 },
  { month: 'Dec', opening: 116631, closing: 3391 },
];

interface Transaction {
  id: string;
  date: string;
  desc: string;
  debit: string;
  credit: string;
  balance: string;
  isWealthGrow: boolean;
}

const TRANSACTIONS: Transaction[] = [
  { id: 'bs-sep5',   date: 'Sep 05', desc: 'SALARY CREDIT',              debit: '',          credit: '₹42,000',   balance: '₹1,54,450', isWealthGrow: false },
  { id: 'bs-sep8',   date: 'Sep 08', desc: 'UPI/WEALTHGROW SOLUTIONS',   debit: '₹20,000',  credit: '',          balance: '₹1,34,450', isWealthGrow: false },
  { id: 'bs-sep10',  date: 'Sep 10', desc: 'SWIGGY',                     debit: '₹450',      credit: '',          balance: '₹1,34,000', isWealthGrow: false },
  { id: 'bs-sep14',  date: 'Sep 14', desc: 'AMAZON PAY',                 debit: '₹2,340',    credit: '',          balance: '₹1,31,660', isWealthGrow: false },
  { id: 'sep20',     date: 'Sep 20', desc: 'UPI/WEALTHGROW SOLUTIONS',   debit: '₹20,000',   credit: '',          balance: '₹1,11,660', isWealthGrow: true },
  { id: 'bs-sep25',  date: 'Sep 25', desc: 'NETFLIX',                    debit: '₹649',      credit: '',          balance: '₹1,11,011', isWealthGrow: false },
  { id: 'bs-oct3',   date: 'Oct 03', desc: 'SALARY CREDIT',              debit: '',          credit: '₹42,000',   balance: '₹1,53,011', isWealthGrow: false },
  { id: 'oct8',      date: 'Oct 08', desc: 'UPI/WEALTHGROW SOLUTIONS',   debit: '₹40,000',  credit: '',          balance: '₹1,13,011', isWealthGrow: true },
  { id: 'bs-oct15',  date: 'Oct 15', desc: 'UPI/ZOMATO',                 debit: '₹380',      credit: '',          balance: '₹1,12,631', isWealthGrow: false },
  { id: 'bs-oct22',  date: 'Oct 22', desc: 'HDFC CREDIT CARD PAYMENT',   debit: '₹15,000',  credit: '',          balance: '₹97,631',   isWealthGrow: false },
  { id: 'bs-nov4',   date: 'Nov 04', desc: 'SALARY CREDIT',              debit: '',          credit: '₹42,000',   balance: '₹1,39,631', isWealthGrow: false },
  { id: 'nov10',     date: 'Nov 10', desc: 'UPI/WEALTHGROW SOLUTIONS',   debit: '₹60,000',  credit: '',          balance: '₹79,631',   isWealthGrow: true },
  { id: 'bs-nov20',  date: 'Nov 20', desc: 'ATM WITHDRAWAL',             debit: '₹5,000',    credit: '',          balance: '₹74,631',   isWealthGrow: false },
  { id: 'bs-dec3',   date: 'Dec 03', desc: 'SALARY CREDIT',              debit: '',          credit: '₹42,000',   balance: '₹1,16,631', isWealthGrow: false },
  { id: 'dec9',      date: 'Dec 09', desc: 'UPI/WEALTHGROW SOLUTIONS',   debit: '₹1,00,000', credit: '',          balance: '₹16,631',   isWealthGrow: true },
  { id: 'bs-dec15',  date: 'Dec 15', desc: 'RENT/LANDLORD',              debit: '₹12,000',  credit: '',          balance: '₹4,631',    isWealthGrow: false },
  { id: 'bs-dec20',  date: 'Dec 20', desc: 'BIGBASKET',                  debit: '₹1,240',    credit: '',          balance: '₹3,391',    isWealthGrow: false },
];

export default function BankStatementEvidence() {
  const { viewEvidence } = useInvestigationStore();
  useEffect(() => { viewEvidence('bankstatement'); }, []);

  const renderRow = (t: Transaction, i: number) => {
    const row = (
      <tr className={`border-b border-border/50 ${t.isWealthGrow ? 'bg-heist-red/5' : i % 2 === 0 ? '' : 'bg-bg-elevated/30'}`}>
        <td className="font-mono text-[12px] text-text-secondary py-2 px-2 whitespace-nowrap">{t.date}</td>
        <td className="font-mono text-[12px] text-foreground py-2 px-2">{t.desc}</td>
        <td className="font-mono text-[12px] text-heist-red py-2 px-2">{t.debit || '—'}</td>
        <td className="font-mono text-[12px] text-heist-green py-2 px-2">{t.credit || '—'}</td>
        <td className="font-mono text-[12px] text-foreground py-2 px-2">{t.balance}</td>
      </tr>
    );

    if (t.isWealthGrow) {
      return (
        <AnnotationToolbar key={t.id} evidenceType="bankstatement" itemId={t.id}>
          {row}
        </AnnotationToolbar>
      );
    }

    return <tbody key={t.id}>{row}</tbody>;
  };

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="bg-secondary p-4 md:p-6 rounded-sm">
        <div className="paper-card p-8 max-w-[680px] mx-auto">
          {/* HDFC Letterhead */}
          <div className="text-center border-b-2 border-border pb-4 mb-6">
            <h3 className="font-typewriter text-xl text-foreground">HDFC BANK</h3>
            <p className="font-mono text-[11px] text-text-tertiary">Account Statement — Savings Account</p>
            <p className="font-mono text-[11px] text-text-tertiary">Arjun Mehta · XXXX XXXX XXXX 4821</p>
            <p className="font-mono text-[11px] text-text-tertiary">Period: 01 Sep 2024 – 31 Dec 2024</p>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Opening Balance', value: '₹1,12,450', red: false },
              { label: 'Total Credits', value: '₹1,68,000', red: false },
              { label: 'Total Debits', value: '₹2,77,059', red: false },
              { label: 'Closing Balance', value: '₹3,391', red: true },
            ].map((s) => (
              <div key={s.label} className="form-field text-center">
                <div className={`font-mono text-base font-bold ${s.red ? 'text-heist-red' : 'text-foreground'}`}>{s.value}</div>
                <div className="font-typewriter text-[9px] text-text-tertiary tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bar Chart */}
          <div className="mb-8">
            <h4 className="font-typewriter text-sm text-foreground mb-4">MONTHLY BALANCE — SEP TO DEC 2024</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Courier Prime' }} stroke="hsl(var(--text-tertiary))" />
                <YAxis tick={{ fontSize: 10, fontFamily: 'Courier Prime' }} stroke="hsl(var(--text-tertiary))" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '2px',
                    fontFamily: 'Courier Prime',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                />
                <Legend
                  formatter={(value) => <span style={{ fontFamily: 'Courier Prime', fontSize: '10px' }}>{value}</span>}
                />
                <Bar dataKey="opening" name="Salary-adjusted Opening" fill="hsl(var(--accent-blue))" radius={[2, 2, 0, 0]} />
                <Bar dataKey="closing" name="Month-end Balance" fill="hsl(var(--accent-red))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="font-mono text-[11px] text-text-tertiary mt-3 leading-relaxed">
              Despite ₹42,000 monthly salary, balance collapsed due to 4 WealthGrow transfers totalling ₹2,40,000
            </p>
          </div>

          {/* Transaction table */}
          <h4 className="font-typewriter text-sm text-foreground mb-3">TRANSACTION DETAILS</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-border">
                  {['Date', 'Description', 'Debit', 'Credit', 'Balance'].map((h) => (
                    <th key={h} className="font-typewriter text-[10px] tracking-wider text-text-tertiary py-2 px-2">{h}</th>
                  ))}
                </tr>
              </thead>
              {TRANSACTIONS.map((t, i) => renderRow(t, i))}
            </table>
          </div>

          {/* Closing balance */}
          <div className="mt-4 text-right">
            <span className="font-mono text-sm font-bold text-heist-red">Closing Balance: ₹3,391</span>
          </div>
        </div>
      </div>
    </div>
  );
}
