export default function StatTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-[14px] border border-white/[0.07] bg-panel p-[18px]">
      <div className="mb-2.5 font-mono text-[11px] tracking-[1px] text-lo">{label}</div>
      <div className={`font-mono text-[28px] font-bold ${accent ? 'text-mint' : 'text-hi'}`}>
        {value}
      </div>
    </div>
  );
}
