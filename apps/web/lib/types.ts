export type Tone = 'pos' | 'neg' | 'neu';

export interface Market {
  player: string;
  marketType: string;
  line: string;
  side: string;
  price: string;
}

export interface GameLogEntry {
  pts: number;
  hit: boolean;
}

export interface AnalysisResult {
  confidence: number;
  edge: string;
  riskLabel: string;
  tone: Tone;
  impliedProb: number;
  last10: number;
  last20: number;
  last10Cleared: string;
  last20Cleared: string;
  games: GameLogEntry[];
  summary: string;
}

export interface SavedReport {
  id: string;
  player: string;
  market: string;
  side: string;
  price: string;
  edge: string;
  risk: string;
  tone: Tone;
  when: string;
}
