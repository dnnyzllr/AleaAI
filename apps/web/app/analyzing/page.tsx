'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnalysis } from '@/context/AnalysisContext';
import { ANALYSIS_STEPS } from '@/lib/mock-data';

const STEP_MS = 620;

export default function AnalyzingPage() {
  const router = useRouter();
  const { market } = useAnalysis();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= ANALYSIS_STEPS.length) {
          clearInterval(timer);
          setTimeout(() => router.push('/report'), 700);
          return ANALYSIS_STEPS.length;
        }
        return next;
      });
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [router]);

  const progress = Math.min(100, Math.round((step / ANALYSIS_STEPS.length) * 100));

  return (
    <div className="mx-auto max-w-[520px] px-8 py-[90px] text-center">
      <div className="relative mx-auto mb-9 h-[140px] w-[140px]">
        <div
          className="absolute inset-0 animate-spin rounded-full border-[5px] border-white/[0.06] border-t-mint"
          style={{ animationDuration: '1s' }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-mono text-[30px] font-semibold">{progress}%</div>
          <div className="font-mono text-[10px] tracking-[1.5px] text-lo">ANALYZING</div>
        </div>
      </div>

      <h2 className="mb-1 text-[22px] font-semibold">Pulling game logs and crunching the numbers...</h2>
      <p className="mb-[34px] font-mono text-sm text-mid">
        {market.player} · {market.marketType} {market.line} · {market.side}
      </p>

      <div className="rounded-2xl border border-white/[0.07] bg-panel p-2.5 text-left">
        {ANALYSIS_STEPS.map((label, i) => {
          const on = i < step || step >= ANALYSIS_STEPS.length;
          const active = i === step && step < ANALYSIS_STEPS.length;
          return (
            <div key={label} className="flex items-center gap-3.5 px-3.5 py-3.5">
              <span
                className={`flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  on
                    ? 'bg-mint text-ink'
                    : active
                      ? 'animate-pulse border-2 border-mint shadow-[0_0_0_4px_rgba(47,230,168,0.14)]'
                      : 'border-2 border-white/[0.14]'
                }`}
              >
                {on ? '✓' : ''}
              </span>
              <span className={`text-sm font-medium ${on || active ? 'text-hi' : 'text-lo'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
