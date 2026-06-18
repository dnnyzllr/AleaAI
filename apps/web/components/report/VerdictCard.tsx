import { AnalysisResult } from '@/lib/types';
import ConfidenceGauge from './ConfidenceGauge';

export default function VerdictCard({ analysis }: { analysis: AnalysisResult }) {
  return (
    <div className="grid grid-cols-1 items-center gap-5 rounded-[18px] border border-mint/25 bg-gradient-to-br from-mint/[0.07] to-mint/[0.01] p-[26px] md:grid-cols-[auto_1fr] md:gap-[30px]">
      <ConfidenceGauge value={analysis.confidence} />
      <div>
        <div className="mb-[13px] inline-flex items-center gap-2 rounded-lg border border-mint/30 bg-mint/[0.14] px-[13px] py-1.5">
          <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_8px_#2fe6a8]" />
          <span className="font-mono text-[11px] uppercase tracking-[1.5px] text-mint">
            {analysis.riskLabel}
          </span>
        </div>

        <div className="mb-3 flex items-baseline gap-3.5">
          <div className="font-mono text-[46px] font-bold tracking-[-1.5px] text-mint">
            {analysis.edge}
          </div>
          <div className="text-sm leading-tight text-mid">
            ahead of market price
            <br />
            <span className="text-lo">based on recent game history</span>
          </div>
        </div>

        <p className="max-w-[520px] text-pretty text-[14.5px] leading-relaxed text-[#cbd3de]">
          {analysis.summary}
        </p>
      </div>
    </div>
  );
}
