import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type OverlayName = 'menu' | 'contact' | 'search';

interface OverlayContextValue {
  active: OverlayName | null;
  open: (name: OverlayName) => void;
  close: () => void;
  isOpen: (name: OverlayName) => boolean;
}

const OverlayContext = createContext<OverlayContextValue | null>(null);

/**
 * Holds which slide-in overlay (menu / contact / search) is open.
 * Only one can be open at a time — matching the original site's behaviour.
 */
export function OverlayProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<OverlayName | null>(null);

  const open = useCallback((name: OverlayName) => setActive(name), []);
  const close = useCallback(() => setActive(null), []);
  const isOpen = useCallback((name: OverlayName) => active === name, [active]);

  const value = useMemo(() => ({ active, open, close, isOpen }), [active, open, close, isOpen]);

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}

export function useOverlay(): OverlayContextValue {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error('useOverlay must be used within an OverlayProvider');
  return ctx;
}
