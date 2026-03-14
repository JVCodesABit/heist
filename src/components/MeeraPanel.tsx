import { useState, useRef, useEffect } from 'react';
import { useInvestigationStore } from '@/store/investigationStore';
import { Send } from 'lucide-react';
import { streamMeeraResponse } from '@/lib/gemini';
import { toast } from 'sonner';
import ApiKeyDialog from '@/components/ApiKeyDialog';

interface MeeraPanelProps {
  evidenceType: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

function TypingIndicator() {
  return (
    <div className="bg-bg-elevated p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl rounded-tl-sm max-w-[90%] flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-heist-amber/60 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
        />
      ))}
    </div>
  );
}

export default function MeeraPanel({ evidenceType, collapsed, onToggle }: MeeraPanelProps) {
  const [input, setInput] = useState('');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    meeraMessages,
    meeraLoading,
    geminiApiKey,
    addMeeraMessage,
    updateLastMeeraMessage,
    setMeeraLoading,
  } = useInvestigationStore();

  const messages = meeraMessages[evidenceType] || [];
  const isLoading = meeraLoading[evidenceType] ?? false;

  // Resolve API key: env var first, then runtime store
  const resolvedApiKey =
    import.meta.env.VITE_GEMINI_API_KEY || geminiApiKey || null;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const dispatchMessage = async (userText: string, apiKey: string) => {
    // Add user message
    addMeeraMessage(evidenceType, { role: 'user', text: userText });
    setMeeraLoading(evidenceType, true);

    // Get updated history (including the user message we just added)
    const currentMessages = [
      ...(meeraMessages[evidenceType] || []),
      { role: 'user' as const, text: userText },
    ];

    // Add empty placeholder for Meera's response (will be filled via streaming)
    addMeeraMessage(evidenceType, { role: 'meera', text: '' });

    try {
      const stream = await streamMeeraResponse(evidenceType, currentMessages, apiKey);
      for await (const chunk of stream) {
        updateLastMeeraMessage(evidenceType, chunk);
      }
    } catch (err) {
      console.error('Meera stream error:', err);
      // Replace the empty placeholder with an error note
      updateLastMeeraMessage(
        evidenceType,
        'I seem to be having connectivity issues. Could you check the API key and try again?'
      );
      toast.error('Failed to connect to Meera. Check your API key.', {
        className: 'font-typewriter bg-bg-elevated border-border text-foreground',
      });
    } finally {
      setMeeraLoading(evidenceType, false);
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');

    if (!resolvedApiKey) {
      // Store the message to send after key is saved
      setPendingMessage(text);
      setShowApiKeyDialog(true);
      return;
    }

    dispatchMessage(text, resolvedApiKey);
  };

  const handleApiKeySaved = () => {
    setShowApiKeyDialog(false);
    // After saving, the store will have updated; re-read from store
    const newKey = useInvestigationStore.getState().geminiApiKey;
    const finalKey = import.meta.env.VITE_GEMINI_API_KEY || newKey;
    if (pendingMessage && finalKey) {
      dispatchMessage(pendingMessage, finalKey);
      setPendingMessage(null);
    }
  };

  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-40 btn-stamp text-xs px-4 py-2 shadow-lg"
      >
        Ask Meera
      </button>
    );
  }

  return (
    <>
      <div className="w-full lg:w-[320px] flex flex-col paper-card h-[calc(100vh-52px)] sticky top-[52px]">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-heist-amber flex items-center justify-center">
              <span className="font-typewriter text-sm text-primary-foreground">MK</span>
            </div>
            <div>
              <div className="font-body text-[13px] text-foreground">Meera Krishnan</div>
              <div className="font-mono text-[11px] text-text-secondary flex items-center gap-1.5">
                Senior Investigator{' '}
                <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-heist-amber animate-pulse' : 'bg-heist-green'}`} />
                {isLoading ? 'thinking...' : 'online'}
              </div>
            </div>
          </div>
          {onToggle && (
            <button onClick={onToggle} className="btn-ghost text-xs mt-2 lg:hidden">
              ✕ Close
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Initial greeting */}
          <div className="bg-bg-elevated p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl rounded-tl-sm max-w-[90%]">
            <p className="font-body italic text-[13px] text-text-secondary leading-relaxed">
              Detective, I'm reviewing this case alongside you. Share your thoughts or ask me anything about the evidence.
            </p>
          </div>

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[90%] p-3 ${
                msg.role === 'meera'
                  ? 'bg-bg-elevated rounded-tr-xl rounded-br-xl rounded-bl-xl rounded-tl-sm'
                  : 'bg-card ml-auto rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-sm border border-border'
              }`}
            >
              {msg.role === 'meera' && msg.text === '' ? (
                <TypingIndicator />
              ) : (
                <p
                  className={`text-[13px] leading-relaxed ${
                    msg.role === 'meera'
                      ? 'font-body italic text-text-secondary'
                      : 'font-mono text-foreground'
                  }`}
                >
                  {msg.text}
                  {/* Blinking cursor while this is the last meera message and still loading */}
                  {msg.role === 'meera' && isLoading && i === messages.length - 1 && (
                    <span className="inline-block w-[2px] h-[13px] bg-heist-amber ml-0.5 animate-pulse align-middle" />
                  )}
                </p>
              )}
            </div>
          ))}

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isLoading ? 'Meera is thinking...' : 'Ask Meera...'}
              disabled={isLoading}
              className="flex-1 bg-bg-elevated border border-border rounded-sm px-3 py-2 font-mono text-[13px] text-foreground placeholder:text-text-tertiary outline-none focus:border-heist-amber/50 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="btn-ghost p-2 disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </div>
          {!resolvedApiKey && (
            <p className="font-mono text-[10px] text-text-tertiary mt-1.5 text-center">
              ⚠ No API key — Meera will prompt for one
            </p>
          )}
        </div>
      </div>

      <ApiKeyDialog
        open={showApiKeyDialog}
        onClose={() => {
          setShowApiKeyDialog(false);
          setPendingMessage(null);
        }}
        onSaved={handleApiKeySaved}
      />
    </>
  );
}
