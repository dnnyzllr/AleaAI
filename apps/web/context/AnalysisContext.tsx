'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Market, SavedReport } from '@/lib/types';
import { DEFAULT_MARKET, SAVED_REPORTS } from '@/lib/mock-data';

interface AnalysisContextValue {
  market: Market;
  setMarket: (m: Market) => void;
  updateField: <K extends keyof Market>(key: K, value: Market[K]) => void;
  resetMarket: () => void;
  saved: SavedReport[];
}

const AnalysisContext = createContext<AnalysisContextValue | null>(null);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [market, setMarket] = useState<Market>(DEFAULT_MARKET);
  const [saved] = useState<SavedReport[]>(SAVED_REPORTS);

  const updateField = <K extends keyof Market>(key: K, value: Market[K]) =>
    setMarket((m) => ({ ...m, [key]: value }));

  const resetMarket = () => setMarket(DEFAULT_MARKET);

  return (
    <AnalysisContext.Provider value={{ market, setMarket, updateField, resetMarket, saved }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis(): AnalysisContextValue {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis must be used within an AnalysisProvider');
  return ctx;
}
