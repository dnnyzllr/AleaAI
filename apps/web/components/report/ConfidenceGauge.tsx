export default function ConfidenceGauge({ value }: { value: number }) {
  const r = 72;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative h-[172px] w-[172px]">
      <svg width="172" height="172" viewBox="0 0 172 172">
        <circle cx="86" cy="86" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="13" />
        <circle
          cx="86"
          cy="86"
          r={r}
          fill="none"
          stroke="#2fe6a8"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 86 86)"
          style={{ filter: 'drop-shadow(0 0 6px rgba(47,230,168,0.5))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-mono text-[34px] font-semibold">{value}%</div>
        <div className="font-mono text-[9px] tracking-[1.5px] text-mid">CONFIDENCE</div>
      </div>
    </div>
  );
}
