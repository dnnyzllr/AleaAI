interface MetricTileProps {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
  highlight?: boolean;
}

export default function MetricTile({ label, value, sub, accent, highlight }: MetricTileProps) {
  return (
    <div
      className={`rounded-[14px] border p-[18px] ${
        highlight ? 'border-mint/30 bg-mint/[0.06]' : 'border-white/[0.07] bg-panel'
      }`}
    >
      <div className={`mb-2.5 font-mono text-[11px] tracking-[1px] ${highlight ? 'text-mint' : 'text-lo'}`}>
        {label}
      </div>
      <div className={`font-mono text-[28px] font-bold ${accent || highlight ? 'text-mint' : 'text-hi'}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-mid">{sub}</div>
    </div>
  );
}
