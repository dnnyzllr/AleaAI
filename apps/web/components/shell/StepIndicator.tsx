'use client';

import { usePathname } from 'next/navigation';

const STEPS = [
  { label: 'Upload', path: '/' },
  { label: 'Verify', path: '/verify' },
  { label: 'Analyze', path: '/analyzing' },
  { label: 'Report', path: '/report' },
];

export default function StepIndicator() {
  const pathname = usePathname();
  const current = STEPS.findIndex((s) =>
    s.path === '/' ? pathname === '/' : pathname.startsWith(s.path)
  );

  return (
    <div className="flex items-center gap-1.5">
      {STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step.label} className="flex items-center">
            <div className="flex items-center gap-2.5 px-1">
              <span
                className={`flex h-[22px] w-[22px] items-center justify-center rounded-full font-mono text-xs font-semibold ${
                  done
                    ? 'bg-mint text-ink'
                    : active
                      ? 'border border-mint/50 bg-mint/[0.14] text-mint'
                      : 'border border-white/10 text-lo'
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-sm font-medium ${i <= current ? 'text-hi' : 'text-lo'}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && <span className="mx-0.5 h-px w-5 bg-white/10" />}
          </div>
        );
      })}
    </div>
  );
}
