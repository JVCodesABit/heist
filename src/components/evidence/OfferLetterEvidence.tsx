import AnnotationToolbar from '@/components/AnnotationToolbar';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect, useState } from 'react';

export default function OfferLetterEvidence() {
  const { viewEvidence } = useInvestigationStore();
  const [page, setPage] = useState(1);
  useEffect(() => { viewEvidence('offerletter'); }, []);

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="bg-secondary p-4 md:p-6 rounded-sm">
        <div className="paper-card p-8 md:p-12 max-w-[680px] mx-auto">
          {page === 1 && (
            <>
              <AnnotationToolbar evidenceType="offerletter" itemId="ol_logo">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded bg-[#86BC25] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">D.</span>
                    </div>
                    <h2 className="font-typewriter text-xl text-foreground">Deloitte.</h2>
                  </div>
                  <p className="font-mono text-[10px] text-text-tertiary mt-1">
                    Deloitte Touche Tohmatsu India LLP · Reg. No. AAB-8121
                  </p>
                  <p className="font-mono text-[9px] text-heist-amber mt-1">
                    ⚠ Logo appears slightly different from official Deloitte branding
                  </p>
                  <div className="border-t border-border mt-4" />
                </div>
              </AnnotationToolbar>

              <h3 className="font-typewriter text-lg text-center text-foreground mb-6">
                OFFER OF EMPLOYMENT
              </h3>

              <div className="space-y-4 font-body text-sm text-text-secondary leading-relaxed">
                <div className="flex justify-between text-[12px]">
                  <span><strong>Ref:</strong> DI/HR/2025/OL-4821</span>
                  <span><strong>Date:</strong> March 22, 2025</span>
                </div>

                <p>Dear <strong>Ms. Priya Sharma</strong>,</p>

                <p>
                  We are delighted to offer you the position of <strong>Strategy Consultant</strong> in our
                  Strategy & Operations practice at Deloitte India, Gurugram office.
                </p>

                <p>
                  This offer is made following the successful completion of your interview process,
                  coordinated through our authorized recruitment partner, TalentBridge Consulting
                  Private Limited.
                </p>

                <AnnotationToolbar evidenceType="offerletter" itemId="ol_ctc">
                  <div className="bg-bg-elevated p-4 rounded-sm border border-border">
                    <span className="font-typewriter text-xs text-text-tertiary">COMPENSATION SUMMARY</span>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-[13px]">
                      <span>Base Salary</span><span className="text-right">₹12,00,000</span>
                      <span>Performance Bonus</span><span className="text-right">₹3,00,000</span>
                      <span>Variable Pay</span><span className="text-right">₹2,00,000</span>
                      <span>Benefits & Allowances</span><span className="text-right">₹1,00,000</span>
                      <span className="font-semibold text-foreground border-t border-border pt-1">Total CTC</span>
                      <span className="font-semibold text-foreground text-right border-t border-border pt-1">₹18,00,000 p.a.</span>
                    </div>
                  </div>
                </AnnotationToolbar>
              </div>
            </>
          )}

          {page === 2 && (
            <div className="space-y-6 font-body text-sm text-text-secondary leading-relaxed">
              <div>
                <span className="font-typewriter text-xs text-text-tertiary">TERMS OF EMPLOYMENT</span>
                <div className="space-y-3 mt-2">
                  <p><strong>Designation:</strong> Strategy Consultant</p>
                  <p><strong>Reporting To:</strong> Senior Manager, Strategy & Operations</p>
                  <p><strong>Location:</strong> Deloitte India, Cyber City, Gurugram</p>
                  <p><strong>Joining Date:</strong> April 7, 2025</p>
                  <p><strong>Probation Period:</strong> 6 months</p>
                </div>
              </div>

              <div>
                <span className="font-typewriter text-xs text-text-tertiary">PRE-JOINING REQUIREMENTS</span>
                <ol className="list-decimal ml-4 space-y-2 mt-2 text-[13px]">
                  <li>Complete onboarding formalities via TalentBridge portal within 48 hours</li>
                  <li>Submit original degree certificates for verification</li>
                  <li>Equipment Security Deposit: ₹25,000 (refundable post-probation)</li>
                  <li>Complete pre-joining medical examination at any empaneled hospital</li>
                </ol>
              </div>

              <AnnotationToolbar evidenceType="offerletter" itemId="ol_clause">
                <div className="bg-heist-amber/5 p-4 rounded-sm relative">
                  <span className="absolute top-2 left-2 text-heist-amber text-lg">●</span>
                  <span className="font-typewriter text-xs text-text-tertiary">CLAUSE 8.3 — RECRUITMENT PARTNER FEES</span>
                  <p className="mt-1 font-body text-[11px] text-text-secondary leading-relaxed">
                    The Candidate acknowledges that placement facilitation fees, training material costs, background verification charges, and offer letter processing fees paid to TalentBridge Consulting Private Limited are non-refundable under any circumstances, including but not limited to: rescinded offers, failed probation, voluntary resignation within 12 months, or termination of this agreement by either party. The Company bears no responsibility for fees collected by its authorized recruitment partners.
                  </p>
                </div>
              </AnnotationToolbar>
            </div>
          )}

          {page === 3 && (
            <div className="space-y-6">
              <div className="font-body text-sm text-text-secondary leading-relaxed">
                <span className="font-typewriter text-xs text-text-tertiary">GENERAL CONDITIONS</span>
                <div className="space-y-3 mt-2">
                  <p>This offer is contingent upon successful completion of all pre-joining formalities and background verification.</p>
                  <p>Any misrepresentation of facts or withholding of information will result in immediate termination of this offer.</p>
                  <p>This offer letter is valid for 7 calendar days from the date of issuance. Failure to accept within this period will result in automatic withdrawal.</p>
                </div>
              </div>

              <div className="border-t border-border pt-8 mt-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="font-typewriter text-xs text-text-tertiary mb-6">FOR DELOITTE INDIA</p>
                    <div className="font-handwritten text-xl text-foreground mb-1">R. Kumar</div>
                    <div className="border-t border-border pt-1 font-mono text-[10px] text-text-tertiary">
                      Rajesh Kumar<br />Head of Talent Acquisition
                    </div>
                  </div>
                  <div>
                    <p className="font-typewriter text-xs text-text-tertiary mb-6">CANDIDATE</p>
                    <div className="font-handwritten text-xl text-foreground mb-1">P. Sharma</div>
                    <div className="border-t border-border pt-1 font-mono text-[10px] text-text-tertiary">
                      Priya Sharma<br />Accepted: March 22, 2025
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-bg-elevated rounded-sm border border-border">
                <p className="font-mono text-[10px] text-text-tertiary text-center">
                  Deloitte Touche Tohmatsu India LLP · 7th Floor, Building 10, Tower B, DLF Cyber City, Gurugram 122002
                </p>
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
            <span className="font-mono text-[10px] text-text-tertiary">Page {page} of 3</span>
            <button
              onClick={() => setPage(Math.min(3, page + 1))}
              disabled={page === 3}
              className="btn-ghost font-typewriter text-xs disabled:opacity-30"
            >
              NEXT →
            </button>
          </div>

          <p className="font-mono text-[10px] text-text-tertiary text-center mt-4">
            Page {page} of 3 · Offer Letter · Deloitte India
          </p>
        </div>
      </div>
    </div>
  );
}
