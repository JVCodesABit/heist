import { useState } from 'react';
import { useInvestigationStore } from '@/store/investigationStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { KeyRound, AlertTriangle } from 'lucide-react';

interface ApiKeyDialogProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function ApiKeyDialog({ open, onClose, onSaved }: ApiKeyDialogProps) {
  const [key, setKey] = useState('');
  const { setGeminiApiKey } = useInvestigationStore();

  const handleSave = () => {
    const trimmed = key.trim();
    if (!trimmed) return;
    setGeminiApiKey(trimmed);
    setKey('');
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-card border border-border max-w-[420px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-full bg-heist-amber/20 flex items-center justify-center">
              <KeyRound size={18} className="text-heist-amber" />
            </div>
            <DialogTitle className="font-typewriter text-base text-foreground">
              GEMINI API KEY REQUIRED
            </DialogTitle>
          </div>
          <DialogDescription className="font-mono text-[12px] text-text-secondary leading-relaxed">
            Meera needs a Gemini API key to respond. Get one free at{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-heist-amber underline"
            >
              Google AI Studio
            </a>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="AIzaSy..."
            className="w-full bg-bg-elevated border border-border rounded-sm px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-text-tertiary outline-none focus:border-heist-amber/60"
            autoFocus
          />

          <div className="flex items-start gap-2 bg-heist-amber/5 border border-heist-amber/20 rounded-sm p-3">
            <AlertTriangle size={14} className="text-heist-amber mt-0.5 flex-shrink-0" />
            <p className="font-mono text-[11px] text-text-secondary leading-relaxed">
              Key is stored in your browser's localStorage. Never share this URL session with others.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={!key.trim()}
            className="btn-stamp w-full text-sm disabled:opacity-40"
          >
            CONNECT MEERA →
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
