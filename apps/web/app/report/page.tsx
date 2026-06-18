'use client';

import { useRouter } from 'next/navigation';
import { useAnalysis } from '@/context/AnalysisContext';
import { MOCK_ANALYSIS } from '@/lib/mock-data';
import VerdictCard from '@/components/report/VerdictCard';
import ComparisonBars from '@/components/report/ComparisonBars';
import MetricTile from '@/components/report/MetricTile';
import GameLog from '@/components/report/GameLog';

export default function ReportPage() {
  const router = useRouter();
  const { market } = useAnalysis();
  const analysis = MOCK_ANALYSIS;

  return (
    <div className="mx-auto max-w-[1080px] px-4 pb-14 pt-[34px] md:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <div className="mb-[5px] font-mono text-xs tracking-[2px] text-lo">REPORT</div>
          <h2 className="text-[22px] font-bold tracking-[-0.5px]">
            {market.player} · {market.marketType} {market.line} · {market.side}
          </h2>
        </div>
        <button
          onClick={() => router.push('/')}
          className="ml-auto rounded-[11px] border border-white/[0.14] px-[18px] py-3 text-sm font-medium text-hi transition-colors hover:bg-white/5"
        >
          New analysis
        </button>
      </div>

      <VerdictCard analysis={analysis} />

      <div className="mt-5 grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <MetricTile label="LAST 10" value={`${analysis.last10}%`} sub={analysis.last10Cleared} accent />
        <MetricTile label="LAST 20" value={`${analysis.last20}%`} sub={analysis.last20Cleared} accent />
        <MetricTile label="KALSHI IMPLIED" value={`${analysis.impliedProb}%`} sub="implied probability" />
        <MetricTile label="MARKET GAP" value={analysis.edge} sub="history vs. price" highlight />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <ComparisonBars analysis={analysis} />
        <GameLog games={analysis.games} cleared={analysis.last10Cleared} />
      </div>
    </div>
  );
}
