import { SavedReport } from '@/lib/types';
import { initials, TONE_CLASSES } from '@/lib/mock-data';

const COLS =
  'grid grid-cols-[2fr_1.4fr_0.7fr_0.8fr_0.8fr_1.6fr_0.9fr] gap-2';

export default function ReportsTable({
  reports,
  onOpen,
}: {
  reports: SavedReport[];
  onOpen: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-panel">
    <div className="overflow-x-auto">
    <div className="min-w-[680px]">
      <div className={`${COLS} border-b border-white/[0.07] px-4 py-[10px] font-mono text-[10px] tracking-[1px] text-lo`}>
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
            className={`${COLS} w-full items-center border-b border-white/[0.04] px-4 py-[10px] text-left transition-colors last:border-b-0 hover:bg-white/[0.025]`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-[7px] bg-gradient-to-br from-[#2a3a4a] to-[#18222d] text-[11px] font-semibold text-[#cbd3de]">
                {initials(r.player)}
              </div>
              <span className="truncate text-xs font-semibold">{r.player}</span>
            </div>
            <span className="font-mono text-[12px] text-[#cbd3de]">{r.market}</span>
            <span className="font-mono text-[11px] font-semibold text-mid">{r.side}</span>
            <span className="font-mono text-[12px] text-[#cbd3de]">{r.price}</span>
            <span className={`font-mono text-[12px] font-semibold ${tone.text}`}>{r.edge}</span>
            <span>
              <span className={`inline-block rounded-[6px] px-[8px] py-[3px] text-[11px] font-semibold ${tone.bg} ${tone.text}`}>
                {r.risk}
              </span>
            </span>
            <span className="text-right font-mono text-[11px] text-lo">{r.when}</span>
          </button>
        );
      })}
    </div>
    </div>
    </div>
  );
}
