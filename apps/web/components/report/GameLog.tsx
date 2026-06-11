import { GameLogEntry } from '@/lib/types';

const PX_PER_POINT = 3.4;

export default function GameLog({
  games,
  cleared,
}: {
  games: GameLogEntry[];
  cleared: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-panel p-[22px]">
      <div className="mb-1 flex items-start justify-between">
        <div className="text-[15px] font-semibold">Last 10 game log</div>
        <div className="font-mono text-xs text-mint">{cleared} cleared</div>
      </div>
      <div className="mb-5 text-[13px] text-mid">Points scored vs the 20+ line.</div>

      <div className="relative flex h-[130px] items-end gap-[7px] pb-0.5">
        <div className="absolute inset-x-0 bottom-[68px] border-t border-dashed border-mint/45" />
        <div className="absolute bottom-[71px] right-0 font-mono text-[9px] text-mint">20 line</div>
        {games.map((g, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end">
            <div
              className="w-full rounded-t"
              style={{
                height: `${g.pts * PX_PER_POINT}px`,
                background: g.hit
                  ? 'linear-gradient(180deg,#2fe6a8,#1ea97a)'
                  : 'rgba(255,255,255,0.11)',
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-[7px] flex gap-[7px]">
        {games.map((g, i) => (
          <div
            key={i}
            className={`flex-1 text-center font-mono text-[11px] ${g.hit ? 'text-[#cbd3de]' : 'text-lo'}`}
          >
            {g.pts}
          </div>
        ))}
      </div>

      <div className="mt-[18px] flex gap-[18px] border-t border-white/[0.07] pt-4">
        <div className="flex items-center gap-[7px] text-xs text-mid">
          <span className="h-[11px] w-[11px] rounded-[3px] bg-gradient-to-b from-mint to-[#1ea97a]" />
          Cleared 20+
        </div>
        <div className="flex items-center gap-[7px] text-xs text-mid">
          <span className="h-[11px] w-[11px] rounded-[3px] bg-white/[0.12]" />
          Missed
        </div>
      </div>
    </div>
  );
}
