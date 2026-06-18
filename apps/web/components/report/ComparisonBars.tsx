import { AnalysisResult } from '@/lib/types';

function Bar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="mb-[18px] last:mb-0">
      <div className="mb-[7px] flex justify-between">
        <span className="text-[13px] text-[#cbd3de]">{label}</span>
        <span className="font-mono text-[13px] font-semibold" style={{ color }}>
          {pct}%
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-md bg-white/[0.06]">
        <div className="h-full rounded-md" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function ComparisonBars({ analysis }: { analysis: AnalysisResult }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-panel p-[22px]">
      <div className="mb-1 text-[15px] font-semibold">Past results vs. market price</div>
      <div className="mb-[22px] text-[13px] text-mid">
        How often this happened recently, vs. what Kalshi&apos;s price suggests.
      </div>

      <Bar label="Last 10 hit rate" pct={analysis.last10} color="#2fe6a8" />
      <Bar label="Last 20 hit rate" pct={analysis.last20} color="#2fe6a8" />
      <Bar label="Kalshi implied" pct={analysis.impliedProb} color="rgba(255,255,255,0.28)" />

      <div className="mt-[18px] flex items-center gap-2.5 border-t border-white/[0.07] pt-4">
        <span className="font-mono text-[11px] text-lo">DIFFERENCE</span>
        <span className="font-mono text-sm font-semibold text-mint">+7 to +12 pts</span>
      </div>
    </div>
  );
}
