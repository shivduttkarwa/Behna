import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface ReadyContextValue {
  /** True once the preloader has finished (or was skipped on a return visit). */
  ready: boolean;
  markReady: () => void;
}

const ReadyContext = createContext<ReadyContextValue | null>(null);

/**
 * Signals when intro animations are allowed to run. The original site fired a
 * `behnaReady` event after the preloader; this context is the React equivalent.
 */
export function ReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const value = useMemo(() => ({ ready, markReady }), [ready, markReady]);
  return <ReadyContext.Provider value={value}>{children}</ReadyContext.Provider>;
}

export function useReady(): ReadyContextValue {
  const ctx = useContext(ReadyContext);
  if (!ctx) throw new Error('useReady must be used within a ReadyProvider');
  return ctx;
}
