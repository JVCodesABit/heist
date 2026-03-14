import AnnotationToolbar from '@/components/AnnotationToolbar';
import { useInvestigationStore } from '@/store/investigationStore';
import { useEffect } from 'react';

export default function WebsiteEvidence() {
  const { viewEvidence } = useInvestigationStore();
  useEffect(() => { viewEvidence('website'); }, []);

  return (
    <div className="max-w-[800px] mx-auto">
      <p className="font-mono text-[11px] text-heist-amber mb-3">
        ⚠ WEBSITE SCREENSHOT — wealthgrow.in — CAPTURED NOVEMBER 3, 2024
      </p>

      {/* Browser chrome */}
      <div className="border border-border rounded-sm overflow-hidden shadow-md">
        {/* Tab bar — light grey like a real browser */}
        <div className="bg-[#E8E8E8] flex items-center px-3 py-2 gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 bg-white border border-[#D0D0D0] rounded-md px-3 py-1 ml-3 flex items-center gap-1.5">
            <span className="text-[#22C55E] text-[11px]">🔒</span>
            <span className="text-[11px] text-[#444]">https://wealthgrow.in</span>
          </div>
        </div>

        {/* Website content — light theme */}
        <div className="bg-white text-[#1A1A1A]">
          {/* Navbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#16A34A] flex items-center justify-center">
                <span className="text-white text-xs font-bold">W</span>
              </div>
              <span className="text-lg font-bold text-[#16A34A]">WealthGrow</span>
            </div>
            <div className="hidden md:flex gap-6 text-sm text-[#6B7280]">
              <span className="cursor-pointer hover:text-[#16A34A]">About</span>
              <span className="cursor-pointer hover:text-[#16A34A]">Services</span>
              <span className="cursor-pointer hover:text-[#16A34A]">Returns</span>
              <span className="cursor-pointer hover:text-[#16A34A]">Contact</span>
            </div>
            <span className="text-sm bg-[#16A34A] text-white px-4 py-1.5 rounded-md font-semibold cursor-pointer">
              Start Investing →
            </span>
          </div>

          {/* Hero */}
          <div className="px-6 py-14 text-center bg-gradient-to-b from-[#F0FDF4] to-white">
            <div className="inline-block bg-[#DCFCE7] text-[#16A34A] text-[11px] font-semibold px-3 py-1 rounded-full mb-4">
              SEBI REGISTERED · TRUSTED BY 12,000+ INVESTORS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4 leading-tight">
              Grow your wealth with<br />AI-powered advisory
            </h2>
            <p className="text-sm text-[#6B7280] mb-8 max-w-md mx-auto leading-relaxed">
              India's most trusted investment platform. SEBI registered. AI-driven insights. Guaranteed returns for serious investors.
            </p>
            <div className="flex justify-center gap-10 mb-8">
              {[
                { val: '₹850 Cr', label: 'AUM Managed' },
                { val: '34%', label: 'Avg Annual Returns' },
                { val: '4.9★', label: 'Client Rating' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-[#16A34A]">{s.val}</div>
                  <div className="text-[11px] text-[#9CA3AF] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust logos strip */}
          <div className="text-center py-4 bg-[#F9FAFB] border-t border-b border-[#E5E7EB]">
            <p className="text-[10px] text-[#9CA3AF] tracking-widest font-semibold">
              AS FEATURED IN: ECONOMIC TIMES · MINT · YOURSTORY · INC42
            </p>
          </div>

          {/* Regulatory badges */}
          <div className="flex justify-center gap-6 py-8 bg-white">
            {['SEBI Registered', 'RBI Compliant', 'ISO 27001'].map((badge) => (
              <AnnotationToolbar
                key={badge}
                evidenceType="website"
                itemId={badge === 'SEBI Registered' ? 'sebi_badge' : badge.toLowerCase().replace(' ', '_')}
              >
                <div className="text-center px-5 py-3 border border-[#D1FAE5] bg-[#F0FDF4] rounded-md cursor-pointer hover:shadow-sm transition-shadow">
                  <div className="text-base text-[#16A34A] mb-1">✓</div>
                  <div className="text-[11px] text-[#374151] font-medium">{badge}</div>
                </div>
              </AnnotationToolbar>
            ))}
          </div>

          {/* Testimonials */}
          <div className="px-6 py-8 bg-[#F9FAFB]">
            <h3 className="text-xl font-bold text-center text-[#111827] mb-6">What our clients say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Rahul S.', text: 'Started with ₹1L, now at ₹3.4L in just 8 months. WealthGrow is the real deal.', role: 'Software Engineer' },
                { name: 'Priya M.', text: 'Their AI picks are consistently beating the market. My portfolio is up 42% this year.', role: 'Product Manager' },
                { name: 'Karthik R.', text: 'Best decision I ever made. Vikram personally manages my portfolio.', role: 'Data Scientist' },
              ].map((t) => (
                <div key={t.name} className="bg-white p-4 rounded-md border border-[#E5E7EB] shadow-sm">
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(i => <span key={i} className="text-[#FBBF24] text-xs">★</span>)}
                  </div>
                  <p className="text-sm text-[#4B5563] mb-3 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#D1FAE5] flex items-center justify-center text-xs font-bold text-[#16A34A]">
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
          </div>
        </div>
      </div>

      <p className="font-mono text-[11px] text-heist-amber mt-3">
        ⚠ This is a screenshot of the website Arjun visited before investing. Examine carefully.
      </p>
    </div>
  );
}
