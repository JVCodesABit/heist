import { useState } from 'react';
import { useInvestigationStore, AnnotationType } from '@/store/investigationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Briefcase, MoreHorizontal } from 'lucide-react';

const MESSAGES = [
  { id: 'li_msg1',  date: 'March 5, 2025', sender: 'ananya', text: "Hi Priya! I came across your profile — really impressive MBA from Symbiosis. I'm Ananya Mehta, Senior Recruiter at TalentBridge Consulting. We're currently handling exclusive placements for Deloitte India. Your profile matches a role we're filling — ₹18 LPA, Strategy Consultant. Would you be interested in learning more?" },
  { id: 'li_msg2',  date: null, sender: 'priya', text: "Hi Ananya! Thank you so much, that sounds amazing. I've been actively looking — yes, I'd love to know more about the role!" },
  { id: 'li_msg3',  date: null, sender: 'ananya', text: "Great! We've already shortlisted 5 candidates and interviews start next week. Let me send you the JD. Quick heads up — Deloitte requires a third-party background verification before the interview. It's standard for all Big 4 placements. The verification fee is ₹15,000, fully refundable after joining." },
  { id: 'li_msg4',  date: 'March 8, 2025', sender: 'priya', text: "₹15,000 for a background check? That seems a bit high. Is this standard?" },
  { id: 'li_msg5',  date: null, sender: 'ananya', text: "Completely standard, Priya. Deloitte uses ClearTrust Verifications — they're NASSCOM certified. All Big 4 firms require this. I can share the receipt immediately. Also, I should mention — two of the five interview slots are already taken. We need to lock yours by Thursday." },
  { id: 'li_msg6',  date: 'March 10, 2025', sender: 'ananya', text: "Good news! Your background verification came back clean ✅ You're cleared for the interview round. Next step — Deloitte requires all shortlisted candidates to complete their pre-placement training module. It's a 2-day online program. The training material fee is ₹20,000." },
  { id: 'li_msg7',  date: null, sender: 'priya', text: "Another fee? I've already paid 15k. When is the actual interview?" },
  { id: 'li_msg8',  date: null, sender: 'ananya', text: "I completely understand your concern. This is the last step before the interview. The training is mandatory — Deloitte's HR policy. Think of it as an investment in your career. At ₹18 LPA, you'll recover this in your first week 😊 I've placed 23 candidates this quarter alone." },
  { id: 'li_msg9',  date: 'March 18, 2025', sender: 'ananya', text: "Priya, congratulations! 🎉 You've cleared the interview panel! The offer letter is being prepared. HR needs a security deposit of ₹25,000 for the laptop and equipment kit. This gets deducted from your first salary." },
  { id: 'li_msg10', date: null, sender: 'priya', text: "That's amazing!! But another payment? Can't they just deduct everything from my salary directly?" },
  { id: 'li_msg11', date: null, sender: 'ananya', text: "Company policy, unfortunately. All new hires go through this. I've attached the equipment agreement. The deposit is fully refundable — it's in clause 4.2. Also, your offer letter processing requires a final fee of ₹25,000. After this, you're done — welcome to Deloitte! 🎊" },
  { id: 'li_msg12', date: 'March 25, 2025', sender: 'priya', text: "Ananya, it's been a week since I paid. The joining date has passed and nobody from Deloitte has contacted me. Your number is switched off. What's going on??" },
];

const ANNOTATION_CONFIG = {
  red_flag:   { emoji: '🚩', color: 'bg-heist-red/20 text-heist-red',     dot: 'bg-heist-red'   },
  suspicious: { emoji: '⚠️', color: 'bg-heist-amber/20 text-heist-amber', dot: 'bg-heist-amber' },
  verify:     { emoji: '🔍', color: 'bg-heist-blue/20 text-heist-blue',   dot: 'bg-heist-blue'  },
};

function ChatMessage({ msg }: { msg: typeof MESSAGES[0] }) {
  const [show, setShow] = useState(false);
  const { annotations, addAnnotation, removeAnnotation } = useInvestigationStore();
  const isAnanya = msg.sender === 'ananya';

  const existing = annotations.find(
    (a) => a.evidenceType === 'linkedin' && a.itemId === msg.id
  );

  const handleAnnotate = (type: AnnotationType) => {
    if (existing) {
      removeAnnotation(existing.id);
      if (existing.annotationType === type) return;
    }
    addAnnotation({ evidenceType: 'linkedin', itemId: msg.id, annotationType: type, text: '' });
  };

  const cfg = existing ? ANNOTATION_CONFIG[existing.annotationType] : null;

  return (
    <div
      className={`relative group ${isAnanya ? 'pr-10' : 'pl-10'}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={`max-w-[80%] ${isAnanya ? '' : 'ml-auto'}`}>
        {/* Message bubble */}
        <div className="relative">
          <div
            className={`px-3 py-2 rounded-xl text-[14px] leading-relaxed relative ${
              isAnanya
                ? `bg-white rounded-tl-sm ${existing ? 'ring-1 ' + (
                    existing.annotationType === 'red_flag' ? 'ring-heist-red/50' :
                    existing.annotationType === 'suspicious' ? 'ring-heist-amber/50' :
                    'ring-heist-blue/50'
                  ) : ''}`
                : 'bg-[#D4E8FF] dark:bg-[#1B365D] rounded-tr-sm'
            }`}
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', color: '#1a1a1a' }}
          >
            {msg.text}
            {cfg && (
              <span
                className={`absolute -top-2 ${isAnanya ? '-right-2' : '-left-2'} text-sm leading-none`}
                title={existing?.annotationType.replace('_', ' ')}
              >
                {cfg.emoji}
              </span>
            )}
          </div>
        </div>

        {/* Annotation label */}
        {cfg && (
          <div className={`mt-0.5 ${isAnanya ? '' : 'text-right'}`}>
            <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded-sm ${cfg.color}`}>
              {existing?.annotationType.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Floating annotation toolbar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className={`absolute top-0 ${isAnanya ? 'right-0' : 'left-0'} flex items-center gap-1 bg-card border border-border shadow-lg px-2 py-1 rounded-sm z-10`}
          >
            {(Object.entries(ANNOTATION_CONFIG) as [AnnotationType, typeof ANNOTATION_CONFIG[keyof typeof ANNOTATION_CONFIG]][]).map(([type, c]) => (
              <button
                key={type}
                onClick={() => handleAnnotate(type)}
                className={`text-xs px-2 py-0.5 rounded-sm transition-colors ${
                  existing?.annotationType === type ? c.color : 'hover:bg-secondary'
                }`}
              >
                {c.emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LinkedInEvidence() {
  const { viewEvidence } = useInvestigationStore();
  useEffect(() => { viewEvidence('linkedin'); }, []);

  return (
    <div className="max-w-[600px] mx-auto">
      <div className="rounded-xl border border-border overflow-hidden shadow-lg">
        {/* LinkedIn header */}
        <div className="bg-[#0A66C2] px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center shadow-sm border-2 border-white/20">
                <span className="text-white font-bold text-sm">AM</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#31A24C] border-2 border-[#0A66C2]" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-semibold text-[15px] leading-tight">Ananya Mehta</div>
            <div className="text-blue-200 text-[11px] leading-tight">Senior Recruiter · TalentBridge Consulting · 1st</div>
          </div>
          <div className="flex items-center gap-3 text-white opacity-80">
            <Briefcase size={17} />
            <MoreHorizontal size={18} />
          </div>
        </div>

        {/* Connection info */}
        <div className="bg-[#EEF3F8] px-4 py-1.5 flex items-center gap-2">
          <span className="text-[10px]">💼</span>
          <p className="text-[10px] text-[#666666]">
            You and Ananya Mehta are 1st degree connections
          </p>
        </div>

        {/* Chat area */}
        <div className="bg-[#F3F2EF] dark:bg-[#1B1F23] p-4 space-y-3 max-h-[600px] overflow-y-auto">
          {MESSAGES.map((msg) => (
            <div key={msg.id}>
              {msg.date && (
                <div className="flex justify-center my-2">
                  <span className="font-mono text-[11px] text-[#666] bg-white/70 dark:bg-[#2D2D2D]/80 px-3 py-1 rounded-full shadow-sm">
                    {msg.date}
                  </span>
                </div>
              )}
              <ChatMessage msg={msg} />
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="bg-white dark:bg-[#1B1F23] px-3 py-2 flex items-center gap-2 border-t border-[#E0E0E0]">
          <div className="flex-1 bg-[#EEF3F8] dark:bg-[#38434F] rounded-full px-4 py-2 text-[13px] text-[#8696A0]">
            Write a message...
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center">
            <span className="text-white text-sm">➤</span>
          </div>
        </div>
      </div>
    </div>
  );
}
