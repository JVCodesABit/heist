import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInvestigationStore } from '@/store/investigationStore';
import { FolderOpen, Search, Brain, BarChart2, User } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  { key: 'case',       label: 'Case File',  path: '/case',       Icon: FolderOpen },
  { key: 'evidence',   label: 'Evidence',   path: '/evidence',   Icon: Search     },
  { key: 'hypothesis', label: 'Hypothesis', path: '/hypothesis', Icon: Brain      },
  { key: 'breakdown',  label: 'Breakdown',  path: '/breakdown',  Icon: BarChart2  },
  { key: 'profile',    label: 'Profile',    path: '/profile',    Icon: User       },
];

export default function NavBar() {
  const { caseStarted, hypothesis } = useInvestigationStore();
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentStep = () => {
    const path = location.pathname;
    if (path.startsWith('/evidence')) return 1;
    const idx = STEPS.findIndex((s) => path.startsWith(s.path));
    return idx;
  };

  const currentStep = getCurrentStep();
  const showProgress = caseStarted && location.pathname !== '/';

  return (
    <nav className="sticky top-0 z-50 h-[56px] flex items-center justify-between px-4 md:px-6 bg-card/95 border-b border-border backdrop-blur-md">

      {/* Left: brand */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="relative">
          <span className="w-[10px] h-[10px] rounded-full bg-heist-red block animate-pulse-glow" />
        </div>
        <span className="font-typewriter text-base tracking-[0.45em] text-foreground select-none">
          HEIST
        </span>
      </div>

      {/* Center: progress stepper */}
      {showProgress && (
        <div className="hidden md:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
          {STEPS.map((step, i) => {
            const isCompleted = i < currentStep || (i === 4 && hypothesis.submitted);
            const isCurrent   = i === currentStep;
            const isPast      = i < currentStep;
            const { Icon }    = step;

            // Only allow navigating to completed or current steps
            const canNavigate = isCompleted || isCurrent;

            return (
              <div key={step.key} className="flex items-center">
                {/* Connector line */}
                {i > 0 && (
                  <div className="w-8 h-px mx-0.5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-border" />
                    {isPast && (
                      <motion.div
                        className="absolute inset-0 bg-heist-green"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        style={{ transformOrigin: 'left' }}
                      />
                    )}
                  </div>
                )}

                {/* Step pill */}
                <button
                  onClick={() => canNavigate && navigate(step.path)}
                  disabled={!canNavigate}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-typewriter tracking-wide transition-all duration-200 ${
                    isCurrent
                      ? 'bg-heist-red text-white shadow-sm shadow-heist-red/30'
                      : isCompleted
                      ? 'bg-heist-green/15 text-heist-green hover:bg-heist-green/25 cursor-pointer'
                      : 'text-muted-foreground opacity-40 cursor-not-allowed'
                  }`}
                >
                  <Icon size={11} strokeWidth={isCurrent ? 2.5 : 2} />
                  <span className={isCurrent ? 'font-bold' : ''}>{step.label}</span>
                  {isCompleted && !isCurrent && (
                    <span className="text-heist-green text-[10px] leading-none">✓</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile: step dots */}
      {showProgress && (
        <div className="flex md:hidden items-center gap-1.5">
          {STEPS.map((step, i) => {
            const isCompleted = i < currentStep;
            const isCurrent   = i === currentStep;
            return (
              <span
                key={step.key}
                className={`rounded-full transition-all duration-200 ${
                  isCurrent
                    ? 'w-5 h-2 bg-heist-red rounded-full'
                    : isCompleted
                    ? 'w-2 h-2 bg-heist-green'
                    : 'w-2 h-2 bg-border'
                }`}
              />
            );
          })}
        </div>
      )}

      {/* Right: case badge */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {caseStarted && (
          <span className="hidden sm:flex font-mono text-[10px] text-heist-red bg-heist-red/10 border border-heist-red/30 px-2.5 py-1 rounded-sm tracking-wider">
            CASE #047
          </span>
        )}
      </div>
    </nav>
  );
}
