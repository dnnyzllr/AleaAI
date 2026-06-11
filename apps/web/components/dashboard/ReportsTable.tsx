import { SavedReport } from '@/lib/types';
import { initials, TONE_CLASSES } from '@/lib/mock-data';

const COLS =
  'grid grid-cols-[2fr_1.4fr_0.7fr_0.8fr_0.8fr_1.6fr_0.9fr] gap-3';

export default function ReportsTable({
  reports,
  onOpen,
}: {
  reports: SavedReport[];
  onOpen: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-panel">
      <div className={`${COLS} border-b border-white/[0.07] px-5 py-[13px] font-mono text-[10.5px] tracking-[1px] text-lo`}>
        <span>PLAYER</span>
        <span>MARKET</span>
        <span>SIDE</span>
        <span>PRICE</span>
        <span>EDGE</span>
        <span>RISK SIGNAL</span>
        <span className="text-right">WHEN</span>
      </div>

      {reports.map((r) => {
        const tone = TONE_CLASSES[r.tone];
        return (
          <button
            key={r.id}
            onClick={() => onOpen(r.id)}
            className={`${COLS} w-full items-center border-b border-white/[0.04] px-5 py-[15px] text-left transition-colors last:border-b-0 hover:bg-white/[0.025]`}
          >
            <div className="flex min-w-0 items-center gap-[11px]">
              <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#2a3a4a] to-[#18222d] text-xs font-semibold text-[#cbd3de]">
                {initials(r.player)}
              </div>
              <span className="truncate text-sm font-semibold">{r.player}</span>
            </div>
            <span className="font-mono text-[13px] text-[#cbd3de]">{r.market}</span>
            <span className="font-mono text-xs font-semibold text-mid">{r.side}</span>
            <span className="font-mono text-[13px] text-[#cbd3de]">{r.price}</span>
            <span className={`font-mono text-[13px] font-semibold ${tone.text}`}>{r.edge}</span>
            <span>
              <span className={`inline-block rounded-[7px] px-[11px] py-[5px] text-xs font-semibold ${tone.bg} ${tone.text}`}>
                {r.risk}
              </span>
            </span>
            <span className="text-right font-mono text-xs text-lo">{r.when}</span>
          </button>
        );
      })}
    </div>
  );
}
