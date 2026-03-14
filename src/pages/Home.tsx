import { motion, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════
   CYBER WEB — orbiting images + web lines
   Free x/y positioning, web traces images
   ═══════════════════════════════════════════ */

const WEB_IMAGES = [
  // Positioned in a circle: top-left, top-right, right, bottom-right, bottom-left, left
  { src: '/landingPage1.jpg', x: 30, y: 15.4, size: 240, lineDelay: 0.3 }, // Top Left
  { src: '/landingPage2.jpg', x: 70, y: 15.4, size: 240, lineDelay: 0.6 }, // Top Right
  { src: '/landingPage6.jpg', x: 90, y: 50, size: 245, lineDelay: 0.9 }, // Right
  { src: '/landingPage4.png', x: 70, y: 84.6, size: 250, lineDelay: 1.2 }, // Bottom Right
  { src: '/landingPage3.jpg', x: 30, y: 84.6, size: 240, lineDelay: 1.5 }, // Bottom Left
  { src: '/landingPage5.jpeg', x: 10, y: 50, size: 245, ineDelay: 1.8 }, // Left
];

const NODES = WEB_IMAGES.map((img) => ({ x: img.x, y: img.y }));

function HeroBackground() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isHovered = hoveredIdx !== null;

  const rotationRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const frozenAngleRef = useRef(0);
  const ORBIT_DURATION = 60;

  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (!isHovered) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        rotationRef.current = frozenAngleRef.current + (elapsed / ORBIT_DURATION) * 360;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  const handleHover = useCallback((idx: number | null) => {
    if (idx !== null) {
      frozenAngleRef.current = rotationRef.current % 360;
    } else {
      startTimeRef.current = Date.now();
    }
    setHoveredIdx(idx);
  }, []);

  const cx = 50, cy = 50;

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        opacity: 0.08 + Math.random() * 0.15,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* ── Giant ₹ symbol in background center ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-[0] select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.span
          className="font-mono font-bold pointer-events-none"
          style={{
            fontSize: 'clamp(500px, 80vw, 1100px)',
            color: 'hsl(var(--accent-red))',
            opacity: 0.07,
            lineHeight: 1,
            fontWeight: 900,
            marginTop: '350px',
          }}
          animate={{ opacity: [0.07, 0.12, 0.07] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ₹
        </motion.span>
      </motion.div>

      {/* ── Orbiting container: static now ── */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-auto"
        initial={{ rotate: 0 }}
        style={{ transformOrigin: '50% 50%' }}
      >
        {/* ── SVG web lines (rotate with images) ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="web-glow">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Center pulse */}
          <motion.circle
            cx={`${cx}%`} cy={`${cy}%`} r="5"
            fill="hsl(var(--accent-red))" fillOpacity="0.4" filter="url(#web-glow)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ delay: 0.1, duration: 3, repeat: Infinity }}
          />

          {/* Lines center → nodes */}
          {NODES.map((node, i) => {
            const isHorizontal = i === 2 || i === 5 || Math.abs(node.y - cy) < 2;
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${cx}%`} y1={`${cy}%`}
                x2={`${node.x}%`} y2={`${node.y}%`}
                stroke="hsl(var(--accent-red))"
                strokeWidth={isHorizontal ? "3" : "1.3"} 
                strokeOpacity={isHorizontal ? "0.95" : "0.35"}
                filter="url(#web-glow)" strokeDasharray={isHorizontal ? "0" : "6 4"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: isHorizontal ? [0.7, 1, 0.7] : 1 
                }}
                transition={isHorizontal ? { 
                  delay: WEB_IMAGES[i].lineDelay,
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  pathLength: {
                    duration: 1.5,
                    ease: "easeInOut"
                  }
                } : { 
                  delay: WEB_IMAGES[i].lineDelay, 
                  duration: 1, 
                  ease: "easeInOut" 
                }}
              />
            );
          })}

          {/* Hexagon perimeter connections */}
          {[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]].map(([a, b], i) => (
            <motion.line
              key={`cross-${i}`}
              x1={`${NODES[a].x}%`} y1={`${NODES[a].y}%`}
              x2={`${NODES[b].x}%`} y2={`${NODES[b].y}%`}
              stroke="hsl(var(--accent-red))"
              strokeWidth="1.8" strokeOpacity="0.3" strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 2.0 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
            />
          ))}

          {/* Inner star connections */}
          {[[0, 3], [1, 4], [2, 5], [0, 2], [2, 4], [4, 0], [5, 1], [5, 3]].map(([a, b], i) => {
            const is5and6 = (a === 2 && b === 5) || (a === 5 && b === 2);
            return (
              <motion.line
                key={`diag-${i}`}
                x1={`${NODES[a].x}%`} y1={`${NODES[a].y}%`}
                x2={`${NODES[b].x}%`} y2={`${NODES[b].y}%`}
                stroke="hsl(var(--accent-red))"
                strokeWidth={is5and6 ? "3" : "1.2"}
                strokeOpacity={is5and6 ? "0.95" : "0.2"}
                strokeDasharray={is5and6 ? "0" : "3 7"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={is5and6 ? { 
                  pathLength: 1, 
                  opacity: [0.7, 1, 0.7] 
                } : { pathLength: 1, opacity: 1 }}
                transition={is5and6 ? { 
                  delay: 2.8 + i * 0.15, 
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  pathLength: {
                    duration: 1.5,
                    ease: "easeInOut"
                  }
                } : { delay: 2.8 + i * 0.15, duration: 0.7, ease: 'easeOut' }}
              />
            );
          })}

          {/* Node dots */}
          {NODES.map((node, i) => (
            <motion.circle
              key={`dot-${i}`}
              cx={`${node.x}%`} cy={`${node.y}%`} r="4.5"
              fill="hsl(var(--accent-red))" fillOpacity="0.8" filter="url(#web-glow)"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.5, 1], 
                opacity: [0.6, 1, 0.6],
                boxShadow: "0px 0px 15px 5px rgba(255,0,0,0.8)" 
              }}
              transition={{ delay: WEB_IMAGES[i].lineDelay + 1.0, duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* ── Image nodes ── */}
        {WEB_IMAGES.map((img, i) => {
          const pos = NODES[i];
          // For node 5, delay is 1.25s. For node 2 (landingPage6), it appears immediately.
          const imageRevealDelay = i === 5 ? 1.25 : (i === 2 ? 0 : img.lineDelay + 1.0);
          const isThisHovered = hoveredIdx === i;
          return (
            <motion.div
              key={`img-${i}`}
              className="absolute cursor-pointer"
              style={{
                left: `${pos.x}%`, top: `${pos.y}%`,
                width: img.size, height: img.size * 0.65,
                zIndex: isThisHovered ? 20 : 1,
              }}
              initial={{ opacity: 0, scale: 0.3, filter: 'blur(12px)', x: '-50%', y: '-50%' }}
              animate={{
                opacity: 1,
                scale: isThisHovered ? 1.18 : 1,
                filter: 'blur(0px)',
                x: '-50%', y: '-50%',
              }}
              transition={isThisHovered
                ? { scale: { duration: 0.3, ease: 'easeOut' } }
                : { delay: imageRevealDelay, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }
              }
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleHover(null)}
            >
              {/* Counter-rotate to stay upright - now static */}
              <motion.div
                className="w-full h-full"
                initial={{ rotate: 0 }}
              >
                <img
                  src={img.src} alt=""
                  className="w-full h-full object-cover shadow-2xl"
                  style={{
                    opacity: isThisHovered ? 1 : 0.85,
                    filter: isThisHovered
                      ? 'contrast(1.2) saturate(1.1) brightness(1.1)'
                      : 'sepia(0.3) saturate(0.2) contrast(1.3) brightness(0.85)',
                    transition: 'opacity 0.4s ease, filter 0.4s ease',
                    boxShadow: isThisHovered ? '0 0 20px 2px rgba(255, 0, 0, 0.3)' : '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(0,0,0,0.2)'
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Floating particles ── */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-heist-red"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{
            y: [0, -35, -15, -40, 0],
            x: [0, 12, -8, 6, 0],
            opacity: [p.opacity, p.opacity + 0.12, p.opacity, p.opacity + 0.08, p.opacity],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}



/* Case card data */
const CASES = [
  {
    id: '047',
    title: 'The Friendly Broker',
    status: 'ACTIVE',
    category: 'Investment Fraud',
    amount: '₹2,40,000',
    difficulty: 'INTERMEDIATE',
    description: 'A SEBI-registered advisor. Guaranteed 34% returns. Personal UPI transfers. By the time the victim noticed, four months and four tranches had passed.',
    tags: ['Urgency Tactics', 'Authority Bias', 'Fine Print Trap'],
    available: true,
    path: '/case-047',
  },
  {
    id: '048',
    title: 'The Dream Job',
    status: 'LOCKED',
    category: 'Recruitment Scam',
    amount: '₹1,80,000',
    difficulty: 'BEGINNER',
    description: 'A LinkedIn recruiter with a perfect profile. A job offer with double your salary. All they need is a "refundable" processing fee to start your onboarding.',
    tags: ['Social Engineering', 'Impersonation', 'Advance Fee'],
    available: false,
    path: '#',
  },
  {
    id: '049',
    title: 'The Crypto Oracle',
    status: 'LOCKED',
    category: 'Crypto Pump & Dump',
    amount: '₹5,00,000+',
    difficulty: 'ADVANCED',
    description: 'A Telegram group with 10,000 members. An "insider" with leaked token launches. Screenshots of 500% gains. Everyone is making money — except you.',
    tags: ['Herd Mentality', 'FOMO', 'Phantom Wealth'],
    available: false,
    path: '#',
  },
  {
    id: '050',
    title: 'The Wedding Gift',
    status: 'LOCKED',
    category: 'Romance Scam',
    amount: '₹3,20,000',
    difficulty: 'INTERMEDIATE',
    description: 'Eight months of daily video calls. A connection that felt real. Then the emergency. Then the loan. Then the second emergency. Love makes you blind — by design.',
    tags: ['Emotional Manipulation', 'Isolation', 'Sunk Cost'],
    available: false,
    path: '#',
  },
];

const STATS = [
  { value: '₹21,367 Cr', label: 'fraud losses', sub: 'H1 2024' },
  { value: '7,000+', label: 'complaints', sub: 'per day' },
  { value: '25×', label: 'fraud jump', sub: '2023–24' },
  { value: '82%', label: 'under 35', sub: 'targeted' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-52px)]">
      {/* ===== HERO SECTION ===== */}
      <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden bg-[#e8e1d5]" style={{
        backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.15) 100%), var(--noise-pattern, none)'
      }}>
        <HeroBackground />

        {/* Top badge */}
        <motion.div
          className="flex items-center gap-2 mb-8 relative z-10 bg-[#d9d0c1] px-4 py-1.5 rounded-sm border border-[#c4b9a3] shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-heist-red"
            animate={{ boxShadow: ['0 0 4px hsl(var(--accent-red) / 0.5)', '0 0 12px hsl(var(--accent-red) / 0.8)', '0 0 4px hsl(var(--accent-red) / 0.5)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-typewriter text-[11px] tracking-[0.3em] font-bold text-heist-red">
            FINANCIAL CRIMES INVESTIGATION UNIT
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          className="text-center max-w-[800px] relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.h1 
            className="font-typewriter text-6xl md:text-[100px] md:leading-[1] text-[#1a120e] font-black tracking-tight mb-2 cursor-pointer transition-colors duration-300" 
            style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.3)' }}
            whileHover={{ 
              scale: 1.05, 
              color: 'hsl(var(--accent-red))',
              textShadow: '0px 0px 20px rgba(255,0,0,0.5)' 
            }}
          >
            HEIST
          </motion.h1>
          <motion.p
            className="font-serif italic text-xl md:text-2xl text-[#3a2c24] font-medium mb-4 cursor-pointer transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ 
              scale: 1.02, 
              color: 'hsl(var(--accent-red))' 
            }}
          >
            Real scams. Real evidence. You investigate.
          </motion.p>
          <motion.p
            className="font-serif italic text-base md:text-lg text-[#5a483d] max-w-[500px] mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            "Step into an investigator's shoes. Examine real evidence. See if you can spot the manipulation."
          </motion.p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-14 mt-12 relative z-10 max-w-[800px] mx-auto pt-6 border-t border-[#c4b9a3]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
            >
              <div className="font-mono text-xl md:text-2xl font-bold text-[#1a120e] mb-1">{stat.value}</div>
              <div className="font-typewriter text-[9px] text-[#5a483d] uppercase tracking-widest">{stat.label}</div>
              <div className="font-typewriter text-[8px] text-[#7a6a5d] uppercase tracking-wider">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>


      </div>

      {/* ===== CASE FILES SECTION ===== */}
      <div className="px-4 md:px-8 py-16 max-w-[1100px] mx-auto">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-typewriter text-[11px] tracking-[0.3em] text-heist-red">ACTIVE CASE FILES</span>
          <h2 className="font-typewriter text-2xl md:text-3xl text-foreground mt-2">Choose your investigation</h2>
          <p className="font-body text-sm text-text-secondary mt-2">
            Each case is based on real fraud patterns reported in India. Your job: find the manipulation before the victim does.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASES.map((caseItem, i) => (
            <motion.div
              key={caseItem.id}
              className={`paper-card overflow-hidden relative group ${!caseItem.available ? 'opacity-50' : ''}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: caseItem.available ? 1 : 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={caseItem.available ? { y: -4, scale: 1.01 } : {}}
            >
              {/* Header */}
              <div className="bg-bg-elevated p-4 flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] text-text-tertiary">CASE #{caseItem.id}</span>
                  <h3 className="font-typewriter text-lg text-foreground mt-0.5">{caseItem.title}</h3>
                </div>
                <motion.span
                  className={`text-[9px] font-typewriter tracking-wider px-2 py-1 rounded-sm border-2 ${
                    caseItem.status === 'ACTIVE'
                      ? 'text-heist-red border-heist-red'
                      : 'text-text-tertiary border-text-tertiary'
                  }`}
                  initial={caseItem.available ? { scale: 2, opacity: 0, rotate: -5 } : {}}
                  whileInView={caseItem.available ? { scale: 1, opacity: 1, rotate: 3 } : {}}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.35 }}
                >
                  {caseItem.status}
                </motion.span>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="font-mono text-[10px] text-heist-amber bg-heist-amber/10 px-2 py-0.5 rounded-sm">{caseItem.category}</span>
                  <span className="font-mono text-[10px] text-text-secondary bg-secondary px-2 py-0.5 rounded-sm">{caseItem.difficulty}</span>
                  <span className="font-mono text-[10px] text-heist-red bg-heist-red/10 px-2 py-0.5 rounded-sm">{caseItem.amount}</span>
                </div>

                <p className="font-body text-[13px] text-text-secondary leading-relaxed mb-4">
                  {caseItem.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {caseItem.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[9px] text-text-tertiary border border-border px-1.5 py-0.5 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {caseItem.available ? (
                  <motion.button
                    onClick={() => navigate(caseItem.path)}
                    className="btn-stamp w-full text-xs py-2.5"
                    whileTap={{ scale: 0.97 }}
                  >
                    OPEN CASE FILE →
                  </motion.button>
                ) : (
                  <button
                    disabled
                    className="btn-stamp-outline w-full text-xs py-2.5 opacity-40 cursor-not-allowed border-text-tertiary text-text-tertiary"
                  >
                    🔒 COMING SOON
                  </button>
                )}
              </div>

              {/* Locked overlay texture */}
              {!caseItem.available && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <span className="font-typewriter text-4xl text-text-tertiary/[0.06] rotate-[-15deg]">CLASSIFIED</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <div className="px-4 md:px-8 py-16 max-w-[900px] mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-typewriter text-[11px] tracking-[0.3em] text-heist-amber">INVESTIGATOR BRIEFING</span>
          <h2 className="font-typewriter text-2xl md:text-3xl text-foreground mt-2">How it works</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'EXAMINE', desc: 'Review real evidence — WhatsApp chats, bank statements, contracts, and websites. Every detail matters.', icon: '🔍' },
            { step: '02', title: 'ANNOTATE', desc: 'Flag suspicious patterns, red flags, and psychological manipulation tactics as you find them.', icon: '🚩' },
            { step: '03', title: 'SUBMIT', desc: 'Build your hypothesis. Identify the fraud type, biases exploited, and when the victim should have exited.', icon: '📋' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              className="paper-card p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -3 }}
            >
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <span className="font-mono text-[10px] text-heist-red tracking-wider">STEP {item.step}</span>
              <h3 className="font-typewriter text-base text-foreground mt-1 mb-2">{item.title}</h3>
              <p className="font-body text-[13px] text-text-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="px-4 md:px-8 py-10 border-t border-border text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.span
              className="w-3 h-3 rounded-full bg-heist-red"
              animate={{ boxShadow: ['0 0 4px hsl(var(--accent-red) / 0.3)', '0 0 10px hsl(var(--accent-red) / 0.5)', '0 0 4px hsl(var(--accent-red) / 0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-typewriter text-sm tracking-[0.3em] text-foreground">HEIST</span>
          </div>
          <p className="font-mono text-[11px] text-text-tertiary">
            A financial investigation game. Built for those who think they'd never fall for it.
          </p>
          <p className="font-mono text-[10px] text-text-tertiary mt-2">
            Built for Hack4Impact · IIIT Hackathon 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}
