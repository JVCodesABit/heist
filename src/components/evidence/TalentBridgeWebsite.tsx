import AnnotationToolbar from '@/components/AnnotationToolbar';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect } from 'react';

export default function TalentBridgeWebsite() {
  const { viewEvidence } = useInvestigationStore();
  useEffect(() => { viewEvidence('talentbridge'); }, []);

  return (
    <div className="max-w-[800px] mx-auto">
      <p className="font-mono text-[11px] text-heist-amber mb-3">
        ⚠ WEBSITE SCREENSHOT — talentbridge-consulting.com — CAPTURED MARCH 2025
      </p>

      <div className="border border-border rounded-sm overflow-hidden shadow-md">
        {/* Browser chrome */}
        <div className="bg-[#E8E8E8] flex items-center px-3 py-2 gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 bg-white border border-[#D0D0D0] rounded-md px-3 py-1 ml-3 flex items-center gap-1.5">
            <span className="text-[#22C55E] text-[11px]">🔒</span>
            <span className="text-[11px] text-[#444]">https://talentbridge-consulting.com</span>
          </div>
        </div>

        {/* Website content */}
        <div className="bg-white text-[#1A1A1A]">
          {/* Navbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#1E40AF] flex items-center justify-center">
                <span className="text-white text-xs font-bold">TB</span>
              </div>
              <span className="text-lg font-bold text-[#1E40AF]">TalentBridge</span>
              <span className="text-[11px] text-[#6B7280]">Consulting</span>
            </div>
            <div className="hidden md:flex gap-6 text-sm text-[#6B7280]">
              <span className="cursor-pointer hover:text-[#1E40AF]">About</span>
              <span className="cursor-pointer hover:text-[#1E40AF]">Placements</span>
              <span className="cursor-pointer hover:text-[#1E40AF]">Testimonials</span>
              <span className="cursor-pointer hover:text-[#1E40AF]">Contact</span>
            </div>
            <span className="text-sm bg-[#1E40AF] text-white px-4 py-1.5 rounded-md font-semibold cursor-pointer">
              Apply Now →
            </span>
          </div>

          {/* Hero */}
          <div className="px-6 py-14 text-center bg-gradient-to-b from-[#EFF6FF] to-white">
            <div className="inline-block bg-[#DBEAFE] text-[#1E40AF] text-[11px] font-semibold px-3 py-1 rounded-full mb-4">
              🏆 #1 RECRUITMENT PARTNER FOR BIG 4 IN INDIA
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4 leading-tight">
              Your Dream Career<br />Starts Here
            </h2>
            <p className="text-sm text-[#6B7280] mb-8 max-w-md mx-auto leading-relaxed">
              India's premier placement consultancy. Exclusive partnerships with Deloitte, PwC, EY, and KPMG. 
              Guaranteed placements for qualified candidates.
            </p>

            <AnnotationToolbar evidenceType="talentbridge" itemId="tb_stats">
              <div className="flex justify-center gap-10 mb-8">
                {[
                  { val: '2,300+', label: 'Placements' },
                  { val: '₹18L', label: 'Avg Package' },
                  { val: '98%', label: 'Success Rate' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-bold text-[#1E40AF]">{s.val}</div>
                    <div className="text-[11px] text-[#9CA3AF] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnnotationToolbar>
          </div>

          {/* Partner logos */}
          <div className="text-center py-4 bg-[#F9FAFB] border-t border-b border-[#E5E7EB]">
            <p className="text-[10px] text-[#9CA3AF] tracking-widest font-semibold mb-3">
              EXCLUSIVE RECRUITMENT PARTNER
            </p>
            <div className="flex justify-center gap-8 items-center opacity-60">
              {['Deloitte', 'PwC', 'EY', 'KPMG', 'McKinsey'].map((name) => (
                <span key={name} className="text-[14px] font-bold text-[#374151]">{name}</span>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="flex justify-center gap-6 py-8 bg-white">
            {['NASSCOM Certified', 'ISO 27001', 'Startup India'].map((badge) => (
              <AnnotationToolbar
                key={badge}
                evidenceType="talentbridge"
                itemId={badge === 'NASSCOM Certified' ? 'tb_badge' : badge.toLowerCase().replace(' ', '_')}
              >
                <div className="text-center px-5 py-3 border border-[#DBEAFE] bg-[#EFF6FF] rounded-md cursor-pointer hover:shadow-sm transition-shadow">
                  <div className="text-base text-[#1E40AF] mb-1">✓</div>
                  <div className="text-[11px] text-[#374151] font-medium">{badge}</div>
                </div>
              </AnnotationToolbar>
            ))}
          </div>

          {/* Testimonials */}
          <div className="px-6 py-8 bg-[#F9FAFB]">
            <h3 className="text-xl font-bold text-center text-[#111827] mb-6">Success Stories</h3>
            <AnnotationToolbar evidenceType="talentbridge" itemId="tb_testimonial">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Akash P.', text: 'Got placed at Deloitte with ₹16 LPA package. TalentBridge made the entire process seamless!', role: 'MBA, IIM Indore' },
                  { name: 'Sneha R.', text: 'From apply to offer letter in just 3 weeks. Ananya personally guided me through every step.', role: 'B.Tech, VIT Vellore' },
                  { name: 'Vikash M.', text: 'Best investment I ever made. ₹15k for placement at PwC — thats a no-brainer!', role: 'MBA, XLRI' },
                ].map((t) => (
                  <div key={t.name} className="bg-white p-4 rounded-md border border-[#E5E7EB] shadow-sm">
                    <div className="flex gap-1 mb-2">
                      {[1,2,3,4,5].map(i => <span key={i} className="text-[#FBBF24] text-xs">★</span>)}
                    </div>
                    <p className="text-sm text-[#4B5563] mb-3 leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#DBEAFE] flex items-center justify-center text-xs font-bold text-[#1E40AF]">
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#111827]">{t.name}</div>
                        <div className="text-[10px] text-[#9CA3AF]">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnnotationToolbar>
          </div>
        </div>
      </div>

      <p className="font-mono text-[11px] text-heist-amber mt-3">
        ⚠ This is a screenshot of the TalentBridge website Priya visited. How would you verify these claims?
      </p>
    </div>
  );
}
