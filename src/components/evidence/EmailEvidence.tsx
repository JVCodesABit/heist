import AnnotationToolbar from '@/components/AnnotationToolbar';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect } from 'react';
import { Paperclip, Star, Reply, MoreVertical } from 'lucide-react';

export default function EmailEvidence() {
  const { viewEvidence } = useInvestigationStore();
  useEffect(() => { viewEvidence('email'); }, []);

  return (
    <div className="max-w-[700px] mx-auto">
      <p className="font-mono text-[11px] text-heist-amber mb-3">
        ⚠ EMAIL RECOVERED FROM PRIYA'S INBOX — RECEIVED MARCH 22, 2025
      </p>

      <div className="border border-border rounded-sm overflow-hidden shadow-md">
        {/* Email client chrome */}
        <div className="bg-[#F6F8FC] px-4 py-3 border-b border-[#E0E0E0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-[#1F1F1F]">📧 Inbox</span>
            <span className="text-[10px] text-[#5F6368] bg-[#E8EAED] px-2 py-0.5 rounded">Important</span>
          </div>
          <div className="flex items-center gap-2 text-[#5F6368]">
            <Star size={16} />
            <Reply size={16} />
            <MoreVertical size={16} />
          </div>
        </div>

        {/* Email header */}
        <div className="bg-white px-6 py-4 border-b border-[#E8EAED]">
          <h3 className="text-[16px] font-semibold text-[#1F1F1F] mb-3">
            Offer Letter — Strategy Consultant, Deloitte India
          </h3>

          <div className="space-y-2">
            <AnnotationToolbar evidenceType="email" itemId="email_sender">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1D9BF0] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-[#1F1F1F]">Deloitte HR India</span>
                    <span className="text-[11px] text-[#5F6368]">•</span>
                    <span className="text-[11px] text-[#5F6368]">Mar 22, 2025, 10:34 AM</span>
                  </div>
                  <AnnotationToolbar evidenceType="email" itemId="email_domain">
                    <div className="flex items-center gap-1">
                      <span className="text-[12px] text-[#5F6368]">hr@</span>
                      <span className="text-[12px] text-[#D93025] font-medium">deloitte-careers.in</span>
                      <span className="text-[9px] bg-[#FCE8E6] text-[#D93025] px-1.5 py-0.5 rounded ml-1">
                        ⚠ Not deloitte.com
                      </span>
                    </div>
                  </AnnotationToolbar>
                  <div className="text-[11px] text-[#5F6368] mt-0.5">to: priya.sharma.mba@gmail.com</div>
                </div>
              </div>
            </AnnotationToolbar>
          </div>
        </div>

        {/* Email body */}
        <div className="bg-white px-6 py-5">
          <div className="space-y-4 text-[14px] leading-relaxed text-[#3C4043]" style={{ fontFamily: 'Arial, sans-serif' }}>
            <p>Dear Ms. Priya Sharma,</p>

            <p>Following your successful completion of the interview process facilitated through our recruitment partner, TalentBridge Consulting, we are pleased to extend this offer of employment for the position of <strong>Strategy Consultant</strong> at Deloitte India (Gurugram office).</p>

            <div className="bg-[#F8F9FA] p-4 rounded border border-[#E8EAED]">
              <p className="font-semibold text-[#1F1F1F] mb-2">Compensation Details:</p>
              <ul className="space-y-1 text-[13px]">
                <li>Base Salary: ₹12,00,000 per annum</li>
                <li>Performance Bonus: ₹3,00,000 (target)</li>
                <li>Variable Pay: ₹2,00,000</li>
                <li>Benefits & Allowances: ₹1,00,000</li>
                <li className="font-semibold text-[#1F1F1F] pt-1 border-t border-[#E8EAED]">Total CTC: ₹18,00,000 per annum</li>
              </ul>
            </div>

            <p>Your expected joining date is <strong>April 7, 2025</strong>. Please complete the following formalities:</p>

            <ol className="list-decimal ml-4 space-y-1 text-[13px]">
              <li>Sign and return this offer letter within 48 hours</li>
              <li>Complete onboarding documentation via our partner portal</li>
              <li>Submit equipment security deposit (₹25,000) — refundable after probation</li>
            </ol>

            <p>We look forward to welcoming you to the Deloitte family.</p>

            <div className="mt-6">
              <p className="text-[13px]">Warm regards,</p>
              <p className="font-semibold text-[#1F1F1F]">Rajesh Kumar</p>
              <p className="text-[12px] text-[#5F6368]">Head of Talent Acquisition, Deloitte India</p>
            </div>
          </div>

          {/* Attachment */}
          <AnnotationToolbar evidenceType="email" itemId="email_attachment">
            <div className="mt-6 flex items-center gap-3 p-3 bg-[#F8F9FA] border border-[#E8EAED] rounded cursor-pointer hover:bg-[#EEF0F2] transition-colors">
              <Paperclip size={16} className="text-[#5F6368]" />
              <div>
                <div className="text-[13px] font-medium text-[#1F1F1F]">Deloitte_Offer_Letter_Priya_Sharma.pdf</div>
                <div className="text-[11px] text-[#5F6368]">PDF · 142 KB · Scanned — no issues found</div>
              </div>
            </div>
          </AnnotationToolbar>
        </div>
      </div>

      <p className="font-mono text-[11px] text-heist-amber mt-3">
        ⚠ This email was sent to Priya after she paid ₹60,000 in "pre-placement" fees. Examine the sender carefully.
      </p>
    </div>
  );
}
