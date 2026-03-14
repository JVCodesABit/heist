import { useState } from 'react';
import { useInvestigationStore, AnnotationType } from '@/store/investigationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Phone, Video, Search, MoreVertical } from 'lucide-react';

const MESSAGES = [
  { id: 'msg1',  date: 'September 3, 2024',  sender: 'vikram', text: "Hi Arjun! I saw your post on the Bangalore Tech Investors group. Really impressive portfolio thinking for someone your age. I'm Vikram — I help young professionals build wealth through smart advisory. Would love to chat sometime." },
  { id: 'msg2',  date: null,                  sender: 'arjun',  text: "Hey Vikram, thanks! Yeah I've been trying to learn about investing. What kind of advisory do you do?" },
  { id: 'msg3',  date: null,                  sender: 'vikram', text: "I run WealthGrow Solutions — we're SEBI registered, been operating for 3 years. I focus on high-growth portfolios for IT professionals. Many of my clients are from Infosys, Wipro, TCS. Seeing 28-34% annual returns consistently." },
  { id: 'msg4',  date: 'September 8, 2024',  sender: 'vikram', text: "Arjun, quick update — I have a spot opening up in our premium advisory tier next week. We only take 50 clients per quarter to maintain quality. Current batch is almost full. If you're interested, I'd need to know by Thursday." },
  { id: 'msg5',  date: null,                  sender: 'arjun',  text: "That sounds interesting. What's the minimum investment?" },
  { id: 'msg6',  date: 'September 15, 2024', sender: 'vikram', text: "For our premium tier, ₹50,000 to start. But honestly Arjun, the guys who see the best returns start with ₹80k-1L. I had a client last month — software engineer at Google, started with 1L, already seeing 8% in 3 weeks. I can share his portfolio report if you want." },
  { id: 'msg7',  date: null,                  sender: 'arjun',  text: "8% in 3 weeks?? That's really good. Let me think about it. Can I start with 50k first and add more later?" },
  { id: 'msg8',  date: 'September 18, 2024', sender: 'vikram', text: "Of course! Smart approach. I'll set up your account today. Just transfer ₹50,000 to our business account — I'll send you the details. Also sending you our investment agreement. It's standard SEBI-compliant stuff. Welcome aboard! 🎉" },
  { id: 'msg9',  date: 'October 5, 2024',    sender: 'vikram', text: "Arjun! Great news — your portfolio is up 12% already. The AI model picked some excellent mid-caps. However, I'd strongly recommend averaging down on a position that dipped. If you can add another ₹70k, I can lock in a really strong entry point. This opportunity closes by EOD tomorrow." },
  { id: 'msg10', date: null,                  sender: 'arjun',  text: "12% already! That's amazing. Let me transfer the 70k today." },
];

const ANNOTATION_CONFIG = {
  red_flag:   { emoji: '🚩', color: 'bg-heist-red/20 text-heist-red',     dot: 'bg-heist-red'   },
  suspicious: { emoji: '⚠️', color: 'bg-heist-amber/20 text-heist-amber', dot: 'bg-heist-amber' },
  verify:     { emoji: '🔍', color: 'bg-heist-blue/20 text-heist-blue',   dot: 'bg-heist-blue'  },
};

function ChatMessage({ msg }: { msg: typeof MESSAGES[0] }) {
  const [show, setShow] = useState(false);
  const { annotations, addAnnotation, removeAnnotation } = useInvestigationStore();
  const isVikram = msg.sender === 'vikram';

  const existing = annotations.find(
    (a) => a.evidenceType === 'whatsapp' && a.itemId === msg.id
  );

  const handleAnnotate = (type: AnnotationType) => {
    if (existing) {
      removeAnnotation(existing.id);
      if (existing.annotationType === type) return;
    }
    addAnnotation({ evidenceType: 'whatsapp', itemId: msg.id, annotationType: type, text: '' });
  };

  const cfg = existing ? ANNOTATION_CONFIG[existing.annotationType] : null;

  return (
    <div
      className={`relative group ${isVikram ? 'pr-10' : 'pl-10'}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={`max-w-[80%] ${isVikram ? '' : 'ml-auto'}`}>
        {/* Message bubble */}
        <div className="relative">
          <div
            className={`px-3 py-2 rounded-xl text-[14px] leading-relaxed relative ${
              isVikram
                ? `bg-white rounded-tl-sm ${existing ? 'ring-1 ' + (
                    existing.annotationType === 'red_flag' ? 'ring-heist-red/50' :
                    existing.annotationType === 'suspicious' ? 'ring-heist-amber/50' :
                    'ring-heist-blue/50'
                  ) : ''}`
                : 'bg-[#D9FDD3] rounded-tr-sm'
            }`}
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            {msg.text}

            {/* Flag badge on annotated messages */}
            {cfg && (
              <span
                className={`absolute -top-2 ${isVikram ? '-right-2' : '-left-2'} text-sm leading-none`}
                title={existing?.annotationType.replace('_', ' ')}
              >
                {cfg.emoji}
              </span>
            )}
          </div>
        </div>

        {/* Annotation label below bubble */}
        {cfg && (
          <div className={`mt-0.5 ${isVikram ? '' : 'text-right'}`}>
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
            className={`absolute top-0 ${isVikram ? 'right-0' : 'left-0'} flex items-center gap-1 bg-card border border-border shadow-lg px-2 py-1 rounded-sm z-10`}
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

export default function WhatsAppEvidence() {
  const { viewEvidence } = useInvestigationStore();
  useEffect(() => { viewEvidence('whatsapp'); }, []);

  return (
    <div className="max-w-[600px] mx-auto">
      {/* Phone / WhatsApp frame */}
      <div className="rounded-xl border border-border overflow-hidden shadow-lg">

        {/* ── Improved Header ── */}
        <div className="bg-[#075E54] px-4 py-0 flex flex-col">
          {/* Status bar */}
          <div className="flex items-center justify-between pt-2 pb-1 opacity-60">
            <span className="text-[10px] text-white font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white">●●●</span>
            </div>
          </div>

          {/* Main nav row */}
          <div className="flex items-center gap-3 pb-3">
            {/* Back arrow + avatar */}
            <div className="flex items-center gap-2">
              <span className="text-white text-lg leading-none">‹</span>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">VK</span>
                </div>
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
              </div>
            </div>

            {/* Name + status */}
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-[15px] leading-tight">Vikram Khanna</div>
              <div className="text-[#B2DFDB] text-[11px] leading-tight">Financial Advisor · WealthGrow · online</div>
            </div>

            {/* Action icons */}
            <div className="flex items-center gap-3 text-white opacity-80">
              <Video size={18} />
              <Phone size={17} />
              <MoreVertical size={18} />
            </div>
          </div>
        </div>

        {/* Encryption banner */}
        <div className="bg-[#FFF8E1] px-4 py-1.5 flex items-center gap-2">
          <span className="text-[10px]">🔒</span>
          <p className="text-[10px] text-[#7C6F00]">
            Messages are end-to-end encrypted. No one outside this chat can read them.
          </p>
        </div>

        {/* Chat area */}
        <div className="bg-[#ECE5DD] p-4 space-y-3 max-h-[600px] overflow-y-auto">
          {MESSAGES.map((msg) => (
            <div key={msg.id}>
              {msg.date && (
                <div className="flex justify-center my-2">
                  <span className="font-mono text-[11px] text-[#667781] bg-white/70 px-3 py-1 rounded-full shadow-sm">
                    {msg.date}
                  </span>
                </div>
              )}
              <ChatMessage msg={msg} />
            </div>
          ))}
        </div>

        {/* Input bar (decorative) */}
        <div className="bg-[#F0F2F5] px-3 py-2 flex items-center gap-2 border-t border-[#D1D5DB]">
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-[13px] text-[#8696A0]">
            Type a message
          </div>
          <div className="w-9 h-9 rounded-full bg-[#00A884] flex items-center justify-center">
            <span className="text-white text-sm">🎤</span>
          </div>
        </div>
      </div>
    </div>
  );
}
