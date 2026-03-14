import { useState } from 'react';
import { useInvestigationStore, AnnotationType } from '@/store/investigationStore';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnotationToolbarProps {
  evidenceType: string;
  itemId: string;
  children: React.ReactNode;
}

export default function AnnotationToolbar({ evidenceType, itemId, children }: AnnotationToolbarProps) {
  const [showToolbar, setShowToolbar] = useState(false);
  const { annotations, addAnnotation, removeAnnotation } = useInvestigationStore();

  const existing = annotations.find(
    (a) => a.evidenceType === evidenceType && a.itemId === itemId
  );

  const handleAnnotate = (type: AnnotationType) => {
    if (existing) {
      removeAnnotation(existing.id);
      if (existing.annotationType === type) return;
    }
    addAnnotation({
      evidenceType: evidenceType as any,
      itemId,
      annotationType: type,
      text: '',
    });
  };

  const borderColor = existing
    ? existing.annotationType === 'red_flag'
      ? 'border-l-heist-red'
      : existing.annotationType === 'suspicious'
      ? 'border-l-heist-amber'
      : 'border-l-heist-blue'
    : '';

  return (
    <div
      className={`relative annotatable group ${existing ? `border-l-2 ${borderColor} pl-2` : ''}`}
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => setShowToolbar(false)}
    >
      {children}

      {/* Corner dot for annotated items */}
      {existing && (
        <span
          className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
            existing.annotationType === 'red_flag'
              ? 'bg-heist-red'
              : existing.annotationType === 'suspicious'
              ? 'bg-heist-amber'
              : 'bg-heist-blue'
          }`}
        />
      )}

      <AnimatePresence>
        {showToolbar && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-card border border-border shadow-lg px-2 py-1 rounded-sm z-10"
          >
            <button
              onClick={() => handleAnnotate('red_flag')}
              className={`text-xs px-2 py-0.5 rounded-sm transition-colors ${
                existing?.annotationType === 'red_flag' ? 'bg-heist-red/20 text-heist-red' : 'hover:bg-secondary'
              }`}
              title="Red Flag"
            >
              🚩
            </button>
            <button
              onClick={() => handleAnnotate('suspicious')}
              className={`text-xs px-2 py-0.5 rounded-sm transition-colors ${
                existing?.annotationType === 'suspicious' ? 'bg-heist-amber/20 text-heist-amber' : 'hover:bg-secondary'
              }`}
              title="Suspicious"
            >
              ⚠️
            </button>
            <button
              onClick={() => handleAnnotate('verify')}
              className={`text-xs px-2 py-0.5 rounded-sm transition-colors ${
                existing?.annotationType === 'verify' ? 'bg-heist-blue/20 text-heist-blue' : 'hover:bg-secondary'
              }`}
              title="Verify"
            >
              🔍
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
