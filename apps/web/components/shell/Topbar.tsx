'use client';

import { usePathname } from 'next/navigation';
import StepIndicator from './StepIndicator';

const FLOW_PATHS = ['/', '/verify', '/analyzing', '/report'];

export default function Topbar() {
  const pathname = usePathname();
  const inFlow = FLOW_PATHS.some((p) =>
    p === '/' ? pathname === '/' : pathname.startsWith(p)
  );

  return (
    <header className="flex h-[58px] flex-shrink-0 items-center justify-center border-b border-white/[0.07] px-6">
      {inFlow && <StepIndicator />}
    </header>
  );
}
