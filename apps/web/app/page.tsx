'use client';

import { useRouter } from 'next/navigation';
import UploadDropzone from '@/components/upload/UploadDropzone';

const HOW_IT_WORKS = [
  { n: '01', t: 'Extract', d: 'Reads your screenshot and pulls the contract details.' },
  { n: '02', t: 'Analyze', d: 'Historical hit rates vs implied probability.' },
  { n: '03', t: 'Report', d: 'A clear edge signal and risk label.' },
];

export default function UploadPage() {
  const router = useRouter();
  const goVerify = () => router.push('/verify');

  return (
    <div className="mx-auto max-w-[760px] px-4 pb-14 pt-8 sm:px-8 sm:pt-16">
      <div className="text-center font-mono text-xs tracking-[3px] text-mint">KALSHI EDGE TOOL</div>
      <h1 className="mx-auto mb-3 mt-4 text-balance text-center text-[26px] font-bold leading-[1.12] tracking-[-0.5px] sm:text-[40px] sm:tracking-[-1px]">
        Turn a Kalshi screenshot into a historical edge report.
      </h1>
      <p className="mx-auto mb-10 max-w-[520px] text-center text-base leading-relaxed text-mid">
        Upload any Kalshi NBA market screenshot. AleaAI pulls the game log, calculates the
        historical hit rate, and compares it to what the market is pricing in.
      </p>

      <UploadDropzone onSelect={goVerify} />

      <div className="mt-[22px] text-center">
        <button
          onClick={goVerify}
          className="inline-flex items-center gap-[9px] rounded-[11px] border border-white/[0.14] px-[22px] py-[13px] text-sm font-medium text-hi transition-colors hover:bg-white/5"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-mint" /> Try the sample market —
          Karl-Anthony Towns 20+
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-3.5">
        {HOW_IT_WORKS.map((s) => (
          <div key={s.n} className="rounded-2xl border border-white/[0.07] p-[18px]">
            <div className="mb-2 font-mono text-[13px] text-mint">{s.n}</div>
            <div className="mb-1 text-sm font-semibold">{s.t}</div>
            <div className="text-[13px] leading-snug text-mid">{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
