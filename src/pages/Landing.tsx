import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvestigationStore } from '@/store/investigationStore';
import { useState, useEffect, useMemo, useCallback } from 'react';

/* ═══════════════════════════════════════════
   BACKGROUND — grid + radar sweep
   ═══════════════════════════════════════════ */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192,57,43,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,57,43,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      />
      {/* Radar sweep */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, hsl(var(--accent-red) / 0.06) 30deg, transparent 60deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 3,
        duration: 5 + Math.random() * 10,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-heist-red/25"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, -12, -35, 0],
            x: [0, 10, -6, 4, 0],
            opacity: [0.1, 0.4, 0.2, 0.5, 0.1],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   GLITCH TEXT COMPONENT
   ═══════════════════════════════════════════ */
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 z-0"
        style={{ color: 'hsl(var(--accent-red))', clipPath: 'inset(0 0 65% 0)' }}
        animate={{ x: [0, -2, 3, -1, 0], opacity: [1, 0.8, 1, 0.9, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
        aria-hidden
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 z-0"
        style={{ color: 'hsl(var(--accent-blue))', clipPath: 'inset(65% 0 0 0)' }}
        animate={{ x: [0, 2, -3, 1, 0], opacity: [1, 0.9, 1, 0.8, 1] }}
        transition={{ duration: 3, delay: 0.1, repeat: Infinity, repeatDelay: 4 }}
        aria-hidden
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ═══════════════════════════════════════════
   TYPEWRITER WITH CURSOR
   ═══════════════════════════════════════════ */
function TypewriterText({ text, delay = 0, speed = 40 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          className="inline-block w-[3px] h-[0.85em] bg-heist-red ml-0.5 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      )}
    </span>
  );
}

/* ═══════════════════════════════════════════
   SCANNING LINE EFFECT
   ═══════════════════════════════════════════ */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] z-[2] pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, transparent, hsl(var(--accent-red) / 0.4), transparent)',
        boxShadow: '0 0 15px hsl(var(--accent-red) / 0.3)',
      }}
      initial={{ top: '-2px' }}
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    />
  );
}

/* ═══════════════════════════════════════════
   MAIN LANDING PAGE
   ═══════════════════════════════════════════ */
export default function Landing() {
  const navigate = useNavigate();
  const { startCase } = useInvestigationStore();

  // Phased reveal
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),   // Show top bar
      setTimeout(() => setPhase(2), 900),   // Show title
      setTimeout(() => setPhase(3), 2200),  // Show subtitle
      setTimeout(() => setPhase(4), 3000),  // Show description
      setTimeout(() => setPhase(5), 3800),  // Show stats
      setTimeout(() => setPhase(6), 4600),  // Show CTA
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleOpenCase = useCallback(() => {
    startCase();
    navigate('/case');
  }, [startCase, navigate]);

  return (
    <div className="min-h-[calc(100vh-52px)] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden bg-background">
      <GridBackground />
      <FloatingParticles />
      <ScanLine />

      {/* Cinematic letterbox bars */}
      <motion.div
        className="fixed top-0 left-0 right-0 bg-black z-[3] pointer-events-none"
        initial={{ height: '50vh' }}
        animate={{ height: '0vh' }}
        transition={{ delay: 0.1, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-black z-[3] pointer-events-none"
        initial={{ height: '50vh' }}
        animate={{ height: '0vh' }}
        transition={{ delay: 0.1, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      />

      <div className="max-w-[860px] w-full relative z-[2]">
        {/* ── Top status bar ── */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="flex items-center justify-between mb-10"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 rounded-full bg-heist-red"
                  animate={{
                    boxShadow: ['0 0 4px hsl(var(--accent-red) / 0.4)', '0 0 15px hsl(var(--accent-red) / 0.8)', '0 0 4px hsl(var(--accent-red) / 0.4)'],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.span
                  className="font-typewriter text-xs tracking-[0.3em] text-heist-red"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  CASE PENDING
                </motion.span>
              </div>
              <span className="font-mono text-[11px] text-text-tertiary">
                FINANCIAL CRIMES UNIT · DIVISION 7
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main card ── */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="paper-card p-8 md:p-14 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Corner markers */}
              <span className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-heist-red/40" />
              <span className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-heist-red/40" />
              <span className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-heist-red/40" />
              <span className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-heist-red/40" />

              {/* File info */}
              <motion.div
                className="flex items-end gap-5 mb-8"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div>
                  <span className="font-typewriter text-[11px] text-text-tertiary tracking-wider">FILE NO</span>
                  <div className="font-mono text-lg text-foreground border-b-2 border-heist-red/30 pb-0.5 mt-0.5">4729-B</div>
                </div>
                <div>
                  <span className="font-typewriter text-[11px] text-text-tertiary tracking-wider">STATUS</span>
                  <motion.div
                    className="mt-0.5"
                    initial={{ scale: 3, opacity: 0, rotate: -12, filter: 'blur(6px)' }}
                    animate={{ scale: 1, opacity: 1, rotate: 3, filter: 'blur(0px)' }}
                    transition={{ delay: 0.6, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <span className="red-stamp text-xs">UNRESOLVED</span>
                  </motion.div>
                </div>
                <div className="ml-auto">
                  <span className="font-typewriter text-[11px] text-text-tertiary tracking-wider">CLASSIFICATION</span>
                  <motion.div
                    className="font-mono text-[11px] text-heist-amber border border-heist-amber/40 px-2.5 py-1 mt-0.5 text-center"
                    animate={{ borderColor: ['hsl(var(--accent-amber) / 0.4)', 'hsl(var(--accent-amber) / 0.8)', 'hsl(var(--accent-amber) / 0.4)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    TOP SECRET
                  </motion.div>
                </div>
              </motion.div>

              {/* ── Title + subtitle ── */}
              <AnimatePresence>
                {phase >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
                    <h1 className="font-typewriter text-4xl md:text-[60px] md:leading-[1.1] mb-3 text-foreground">
                      <GlitchText text="Someone just lost" />
                      <br />
                      <span className="text-heist-red">
                        <TypewriterText text="₹2,40,000." delay={1200} speed={60} />
                      </span>
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {phase >= 3 && (
                  <motion.p
                    className="font-typewriter text-2xl md:text-[42px] text-text-secondary mb-10"
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    Figure out how.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* ── Description ── */}
              <AnimatePresence>
                {phase >= 4 && (
                  <motion.div
                    className="mb-12 pl-5 border-l-2 border-heist-amber/40"
                    initial={{ opacity: 0, x: -15, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <p className="font-handwritten text-lg md:text-[19px] text-text-secondary leading-[1.8]">
                      "Real evidence. Real psychological manipulation.
                      <br />
                      You investigate — no tutorials, no multiple choice.
                      <br />
                      You either see the pattern or you don't."
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Stats ── */}
              <AnimatePresence>
                {phase >= 5 && (
                  <motion.div
                    className="grid grid-cols-3 gap-5 mb-12"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {[
                      { value: '₹21,367 Cr', label: 'lost to fraud', sub: 'India H1 2024' },
                      { value: '7,000/day', label: 'cyber fraud', sub: 'complaints daily' },
                      { value: '25×', label: 'jump in investment', sub: 'fraud 2023–24' },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        className="text-center p-4 rounded-sm bg-bg-elevated/50 border border-border/50"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        whileHover={{ scale: 1.03, borderColor: 'hsl(var(--accent-red) / 0.3)' }}
                      >
                        <div className="font-mono text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="font-mono text-[11px] text-text-tertiary">{stat.label}</div>
                        <div className="font-mono text-[10px] text-text-tertiary">{stat.sub}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── CTA ── */}
              <AnimatePresence>
                {phase >= 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <motion.button
                      onClick={handleOpenCase}
                      className="btn-stamp text-lg w-full py-5 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      animate={{
                        boxShadow: [
                          '0 0 0px hsl(var(--accent-red) / 0)',
                          '0 0 30px hsl(var(--accent-red) / 0.3)',
                          '0 0 0px hsl(var(--accent-red) / 0)',
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      {/* Sweep shine */}
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <span>OPEN CASE FILE</span>
                        <motion.span
                          animate={{ x: [0, 6, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.button>

                    <div className="flex items-center justify-center gap-3 mt-4">
                      <motion.span
                        className="w-8 h-px bg-border"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3 }}
                      />
                      <p className="font-mono text-[10px] text-text-tertiary tracking-[0.2em]">
                        CASE #047 · THE FRIENDLY BROKER
                      </p>
                      <motion.span
                        className="w-8 h-px bg-border"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom terminal line ── */}
        <AnimatePresence>
          {phase >= 6 && (
            <motion.div
              className="mt-6 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-mono text-[10px] text-text-tertiary">$</span>
              <span className="font-mono text-[10px] text-heist-green">
                <TypewriterText
                  text="system ready — awaiting investigator input..."
                  delay={200}
                  speed={25}
                />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom tagline */}
      <AnimatePresence>
        {phase >= 6 && (
          <motion.p
            className="font-mono text-[11px] text-text-tertiary text-center mt-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
          >
            A financial investigation game · Built for those who think they'd never fall for it
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
