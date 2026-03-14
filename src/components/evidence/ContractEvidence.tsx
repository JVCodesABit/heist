import AnnotationToolbar from '@/components/AnnotationToolbar';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect, useState } from 'react';

export default function ContractEvidence() {
  const { viewEvidence } = useInvestigationStore();
  const [page, setPage] = useState(1);
  useEffect(() => { viewEvidence('contract'); }, []);

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="bg-secondary p-4 md:p-6 rounded-sm">
        <div className="paper-card p-8 md:p-12 max-w-[680px] mx-auto">
          {page === 1 && (
            <>
              <div className="text-center mb-6">
                <h2 className="font-typewriter text-xl text-foreground">WealthGrow Solutions Pvt Ltd</h2>
                <p className="font-mono text-[11px] text-text-tertiary mt-1">SEBI Registered Investment Advisor | Reg. No. INA000000847</p>
                <div className="border-t border-border mt-4" />
              </div>
              <h3 className="font-typewriter text-2xl text-center text-foreground mb-8">Investment Advisory Agreement</h3>

              <div className="space-y-6 font-body text-sm text-text-secondary leading-relaxed">
                <div>
                  <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 1.1 — SERVICES</span>
                  <p className="mt-1">The Advisor shall provide personalized investment advisory services including portfolio management, market analysis, and strategic allocation recommendations. The minimum investment per tranche shall be ₹20,000 (Rupees Twenty Thousand only).</p>
                </div>
                <div>
                  <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 2.1 — RETURNS</span>
                  <p className="mt-1">
                    The Advisor{' '}
                    <span className="text-heist-amber font-semibold">targets</span>
                    {' '}a monthly return of 3%. Returns are not guaranteed and are subject to market conditions.
                  </p>
                </div>
              </div>
            </>
          )}

          {page === 2 && (
            <div className="space-y-6 font-body text-sm text-text-secondary leading-relaxed">
              <div>
                <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 3.1 — FEE STRUCTURE</span>
                <p className="mt-1">The Investor agrees to a performance-based fee of 2% of assets under management annually, plus 20% of profits exceeding the benchmark index performance.</p>
              </div>
              <div>
                <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 4.1 — REPRESENTATIONS</span>
                <p className="mt-1">The Advisor represents that it holds valid SEBI registration and complies with all applicable regulations under the Securities and Exchange Board of India Act, 1992.</p>
              </div>
              <div>
                <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 5.1 — RISK DISCLOSURE</span>
                <p className="mt-1">Investments are subject to market risks. Past performance is not indicative of future results. The Investor acknowledges understanding these risks and agrees that the Advisor shall not be held liable for any losses incurred due to market fluctuations.</p>
              </div>
              <div>
                <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 6.1 — COMMUNICATION</span>
                <p className="mt-1">All communication regarding investment decisions, portfolio updates, and performance reports shall be conducted via WhatsApp, email, or telephone. The Investor acknowledges that WhatsApp communications shall constitute valid record of advisory instructions.</p>
              </div>
            </div>
          )}

          {page === 3 && (
            <div className="space-y-6 font-body text-sm text-text-secondary leading-relaxed">
              <AnnotationToolbar evidenceType="contract" itemId="clause71">
                <div className="bg-heist-amber/5 p-4 rounded-sm relative">
                  <span className="absolute top-2 left-2 text-heist-amber text-lg">●</span>
                  <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 7.1 — FUND RETENTION</span>
                  <p className="mt-1 font-body text-[11px] text-text-secondary leading-relaxed">
                    In cases of market volatility, regulatory review, or systemic risk events as determined solely by the Advisor, WealthGrow Solutions reserves the right to retain Client funds for a period of up to 24 (twenty-four) months without obligation to provide returns or interim statements during said period. The Client agrees that such retention does not constitute a breach of this Agreement.
                  </p>
                </div>
              </AnnotationToolbar>
              <div>
                <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 7.2 — DISPUTE RESOLUTION</span>
                <p className="mt-1">Any disputes arising from this agreement shall be resolved through private arbitration in Mumbai. The Investor waives the right to pursue legal action in any other jurisdiction.</p>
              </div>
              <div>
                <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 7.3 — LIMITATION OF LIABILITY</span>
                <p className="mt-1 font-body text-[11px]">WealthGrow Solutions' total liability under this agreement shall not exceed the advisory fees collected, explicitly excluding any invested principal or returns. The Advisor is not liable for market losses, third-party defaults, or investment outcomes.</p>
              </div>
            </div>
          )}

          {page === 4 && (
            <div className="space-y-6">
              <div>
                <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 8.1 — CONFIDENTIALITY</span>
                <p className="mt-1 font-body text-sm text-text-secondary">The Investor agrees not to disclose the terms of this agreement, portfolio strategies, or performance data to any third party without written consent from the Advisor.</p>
              </div>
              <div>
                <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 9.1 — GOVERNING LAW</span>
                <p className="mt-1 font-body text-sm text-text-secondary">This agreement shall be governed by the laws of India.</p>
              </div>
              <div className="border-t border-border pt-8 mt-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="font-typewriter text-xs text-text-tertiary mb-6">FOR WEALTHGROW SOLUTIONS</p>
                    <div className="font-handwritten text-xl text-foreground mb-1">V. Khanna</div>
                    <div className="border-t border-border pt-1 font-mono text-[10px] text-text-tertiary">Authorized Signatory</div>
                  </div>
                  <div>
                    <p className="font-typewriter text-xs text-text-tertiary mb-6">INVESTOR</p>
                    <div className="font-handwritten text-xl text-foreground mb-1">A. Mehta</div>
                    <div className="border-t border-border pt-1 font-mono text-[10px] text-text-tertiary">Client Signature</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Page navigation */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="btn-ghost font-typewriter text-xs disabled:opacity-30"
            >
              ← PREV
            </button>
            <span className="font-mono text-[10px] text-text-tertiary">Page {page} of 4</span>
            <button
              onClick={() => setPage(Math.min(4, page + 1))}
              disabled={page === 4}
              className="btn-ghost font-typewriter text-xs disabled:opacity-30"
            >
              NEXT →
            </button>
          </div>

          <p className="font-mono text-[10px] text-text-tertiary text-center mt-4">
            Page {page} of 4 · WealthGrow Solutions Pvt Ltd · Investment Advisory Agreement
          </p>
        </div>
      </div>
    </div>
  );
}
