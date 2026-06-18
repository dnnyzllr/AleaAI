'use client';

import { useRouter } from 'next/navigation';
import { useAnalysis } from '@/context/AnalysisContext';
import { Market } from '@/lib/types';

const FIELDS: { label: string; key: keyof Market }[] = [
  { label: 'PLAYER', key: 'player' },
  { label: 'MARKET TYPE', key: 'marketType' },
  { label: 'LINE', key: 'line' },
  { label: 'SIDE', key: 'side' },
  { label: 'PRICE', key: 'price' },
];

export default function VerifyPage() {
  const router = useRouter();
  const { market, setMarket } = useAnalysis();

  return (
    <div className="mx-auto max-w-[680px] px-4 pb-14 pt-12 sm:px-8">
      <h2 className="mb-1 text-[22px] font-bold tracking-[-0.5px]">Verify market details</h2>
      <p className="mb-8 text-[15px] text-mid">
        Confirm the extracted fields before running the analysis.
      </p>

      <div className="mb-6 space-y-3 rounded-[18px] border border-white/[0.07] bg-panel p-6">
        {FIELDS.map(({ label, key }) => (
          <div key={key} className="flex items-center gap-4">
            <span className="w-[90px] shrink-0 font-mono text-[11px] tracking-[1px] text-lo sm:w-[130px]">
              {label}
            </span>
            <input
              value={market[key]}
              onChange={(e) => setMarket({ ...market, [key]: e.target.value })}
              className="flex-1 rounded-[10px] border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-sm text-hi outline-none focus:border-mint/40"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push('/analyzing')}
        className="w-full rounded-[13px] bg-mint py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-[#39f2b5]"
      >
        Run analysis
      </button>
    </div>
  );
}
