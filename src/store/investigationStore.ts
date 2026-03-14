import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EvidenceType = 'whatsapp' | 'transactions' | 'contract' | 'website' | 'bankstatement';
export type FraudType = 'ponzi' | 'advance_fee' | 'fake_sebi' | 'task_scam';
export type AnnotationType = 'red_flag' | 'suspicious' | 'verify';
export type InvestigatorType = 'The Forensic Mind' | 'The Pattern Tracker' | 'The Learning Investigator' | 'The Vulnerable Observer' | 'The Perfect Victim';

export interface Annotation {
  id: string;
  evidenceType: EvidenceType;
  itemId: string;
  annotationType: AnnotationType;
  text: string;
  timestamp: number;
}

interface Hypothesis {
  trapType: FraudType | null;
  firstRedFlag: string;
  biasTrap: string[];
  interventionPoint: string | null;
  submitted: boolean;
}

interface Results {
  tacticsTotal: number;
  tacticsCaught: number;
  tacticsMissed: number;
  hypothesisAccuracy: number;
  investigatorType: InvestigatorType | null;
  blindSpot: string | null;
  score: number;
}

interface InvestigationState {
  currentScreen: string;
  caseStarted: boolean;
  evidenceViewed: EvidenceType[];
  annotations: Annotation[];
  hypothesis: Hypothesis;
  results: Results;
  meeraMessages: Record<string, Array<{ role: 'meera' | 'user'; text: string }>>;
  meeraLoading: Record<string, boolean>;
  geminiApiKey: string | null;
  theme: 'dark' | 'light';

  setScreen: (screen: string) => void;
  startCase: () => void;
  viewEvidence: (type: EvidenceType) => void;
  addAnnotation: (annotation: Omit<Annotation, 'id' | 'timestamp'>) => void;
  removeAnnotation: (id: string) => void;
  setHypothesisField: <K extends keyof Hypothesis>(key: K, value: Hypothesis[K]) => void;
  submitHypothesis: () => void;
  addMeeraMessage: (evidenceType: string, message: { role: 'meera' | 'user'; text: string }) => void;
  updateLastMeeraMessage: (evidenceType: string, chunk: string) => void;
  setMeeraLoading: (evidenceType: string, loading: boolean) => void;
  setGeminiApiKey: (key: string) => void;
  toggleTheme: () => void;
  calculateResults: () => void;
}

const CORRECT_ANNOTATIONS = ['msg4', 'msg6', 'msg8', 'sep20', 'oct8', 'nov10', 'dec9', 'clause71', 'sebi_badge'];

export const useInvestigationStore = create<InvestigationState>()(
  persist(
    (set, get) => ({
      currentScreen: 'landing',
      caseStarted: false,
      evidenceViewed: [],
      annotations: [],
      hypothesis: {
        trapType: null,
        firstRedFlag: '',
        biasTrap: [],
        interventionPoint: null,
        submitted: false,
      },
      results: {
        tacticsTotal: 8,
        tacticsCaught: 0,
        tacticsMissed: 0,
        hypothesisAccuracy: 0,
        investigatorType: null,
        blindSpot: null,
        score: 0,
      },
      meeraMessages: {},
      meeraLoading: {},
      geminiApiKey: null,
      theme: 'dark',

      setScreen: (screen) => set({ currentScreen: screen }),
      startCase: () => set({ caseStarted: true, currentScreen: 'case' }),
      viewEvidence: (type) => set((state) => ({
        evidenceViewed: state.evidenceViewed.includes(type)
          ? state.evidenceViewed
          : [...state.evidenceViewed, type],
      })),
      addAnnotation: (annotation) => set((state) => ({
        annotations: [
          ...state.annotations,
          { ...annotation, id: crypto.randomUUID(), timestamp: Date.now() },
        ],
      })),
      removeAnnotation: (id) => set((state) => ({
        annotations: state.annotations.filter((a) => a.id !== id),
      })),
      setHypothesisField: (key, value) => set((state) => ({
        hypothesis: { ...state.hypothesis, [key]: value },
      })),
      submitHypothesis: () => {
        const state = get();
        set((s) => ({ hypothesis: { ...s.hypothesis, submitted: true } }));
        get().calculateResults();
      },
      addMeeraMessage: (evidenceType, message) => set((state) => ({
        meeraMessages: {
          ...state.meeraMessages,
          [evidenceType]: [...(state.meeraMessages[evidenceType] || []), message],
        },
      })),
      updateLastMeeraMessage: (evidenceType, chunk) => set((state) => {
        const msgs = [...(state.meeraMessages[evidenceType] || [])];
        if (msgs.length === 0) return {};
        const last = msgs[msgs.length - 1];
        msgs[msgs.length - 1] = { ...last, text: last.text + chunk };
        return { meeraMessages: { ...state.meeraMessages, [evidenceType]: msgs } };
      }),
      setMeeraLoading: (evidenceType, loading) => set((state) => ({
        meeraLoading: { ...state.meeraLoading, [evidenceType]: loading },
      })),
      setGeminiApiKey: (key) => set({ geminiApiKey: key }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      calculateResults: () => {
        const state = get();
        const tacticsCaught = state.annotations.filter((a) =>
          CORRECT_ANNOTATIONS.includes(a.itemId)
        ).length;
        const tacticsMissed = 8 - Math.min(tacticsCaught, 8);

        const hypothesisChecks = [
          state.hypothesis.trapType === 'task_scam',
          state.hypothesis.firstRedFlag.trim() !== '',
          state.hypothesis.biasTrap.includes('urgency'),
          state.hypothesis.interventionPoint === 'week1',
        ];
        const hypothesisAccuracy = hypothesisChecks.filter(Boolean).length;

        const score = Math.round(
          (Math.min(tacticsCaught, 8) / 8) * 50 + (hypothesisAccuracy / 4) * 50
        );

        let investigatorType: InvestigatorType;
        if (score >= 90) investigatorType = 'The Forensic Mind';
        else if (score >= 70) investigatorType = 'The Pattern Tracker';
        else if (score >= 50) investigatorType = 'The Learning Investigator';
        else if (score >= 30) investigatorType = 'The Vulnerable Observer';
        else investigatorType = 'The Perfect Victim';

        const annotatedIds = state.annotations.map((a) => a.itemId);
        let blindSpot: string | null = null;
        if (!annotatedIds.includes('clause71')) blindSpot = 'fine_print_blindness';
        else if (!annotatedIds.includes('msg4') && !annotatedIds.includes('msg6'))
          blindSpot = 'authority_trust';
        else if (!annotatedIds.includes('sep20') && !annotatedIds.includes('oct8'))
          blindSpot = 'number_avoidance';

        set({
          results: {
            tacticsTotal: 8,
            tacticsCaught: Math.min(tacticsCaught, 8),
            tacticsMissed,
            hypothesisAccuracy,
            investigatorType,
            blindSpot,
            score,
          },
        });
      },
    }),
    { name: 'heist-investigation' }
  )
);
