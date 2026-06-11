import { Market, AnalysisResult, SavedReport, Tone } from './types';

export const DEFAULT_MARKET: Market = {
  player: 'Karl-Anthony Towns',
  marketType: 'Points',
  line: '20+',
  side: 'YES',
  price: '68',
};

export const MOCK_ANALYSIS: AnalysisResult = {
  confidence: 72,
  edge: '+7%',
  riskLabel: 'Moderate Positive Historical Signal',
  tone: 'pos',
  impliedProb: 68,
  last10: 80,
  last20: 75,
  last10Cleared: '8 of 10',
  last20Cleared: '15 of 20',
  games: [
    { pts: 24, hit: true },
    { pts: 18, hit: false },
    { pts: 31, hit: true },
    { pts: 22, hit: true },
    { pts: 27, hit: true },
    { pts: 15, hit: false },
    { pts: 29, hit: true },
    { pts: 21, hit: true },
    { pts: 26, hit: true },
    { pts: 23, hit: true },
  ],
  summary:
    "Karl-Anthony Towns has cleared 20+ points in 8 of his last 10 games (80%) and 75% over 20. Kalshi's 68¢ YES price implies a 68% probability — leaving a positive but sample-limited edge. Monitor minutes and matchup before sizing.",
};

export const ANALYSIS_STEPS = [
  'Extracting market details',
  'Matching player game logs',
  'Computing historical hit rates',
  'Comparing vs Kalshi implied',
  'Building risk model',
];

export const SAVED_REPORTS: SavedReport[] = [
  { id: 'kat-pts-20', player: 'Karl-Anthony Towns', market: 'Points 20+', side: 'YES', price: '68¢', edge: '+7%', risk: 'Moderate Positive', tone: 'pos', when: 'Just now' },
  { id: 'brunson-pts-24', player: 'Jalen Brunson', market: 'Points 24+', side: 'YES', price: '55¢', edge: '+11%', risk: 'Strong Positive', tone: 'pos', when: '2h ago' },
  { id: 'hali-ast-9', player: 'Tyrese Haliburton', market: 'Assists 9+', side: 'YES', price: '48¢', edge: '+9%', risk: 'Moderate Positive', tone: 'pos', when: 'Yesterday' },
  { id: 'jokic-reb-12', player: 'Nikola Jokić', market: 'Rebounds 12+', side: 'YES', price: '72¢', edge: '+2%', risk: 'Neutral Signal', tone: 'neu', when: 'Yesterday' },
  { id: 'ant-ast-5', player: 'Anthony Edwards', market: 'Assists 5+', side: 'NO', price: '61¢', edge: '-3%', risk: 'Weak Negative', tone: 'neg', when: '2d ago' },
  { id: 'lebron-pts-25', player: 'LeBron James', market: 'Points 25+', side: 'NO', price: '58¢', edge: '-5%', risk: 'Negative Signal', tone: 'neg', when: '3d ago' },
];

export const DASHBOARD_STATS = {
  analysesRun: 6,
  avgEdge: '+3.5%',
  positiveSignals: 3,
  playersTracked: 6,
};

export function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
}

export const TONE_CLASSES: Record<Tone, { text: string; bg: string }> = {
  pos: { text: 'text-mint', bg: 'bg-mint/[0.12]' },
  neg: { text: 'text-rose', bg: 'bg-rose/[0.12]' },
  neu: { text: 'text-amber', bg: 'bg-amber/[0.12]' },
};
