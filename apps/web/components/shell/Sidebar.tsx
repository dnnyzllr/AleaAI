'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FLOW_PATHS = ['/', '/verify', '/analyzing', '/report'];

function inAnalysisFlow(pathname: string): boolean {
  return FLOW_PATHS.some((p) => (p === '/' ? pathname === '/' : pathname.startsWith(p)));
}

export default function Sidebar() {
  const pathname = usePathname();
  const flowActive = inAnalysisFlow(pathname);
  const dashActive = pathname.startsWith('/dashboard');

  const itemBase =
    'mb-1 flex items-center gap-[11px] rounded-[10px] px-3 py-[11px] text-sm font-medium transition-colors';

  return (
    <aside className="flex w-[248px] flex-shrink-0 flex-col border-r border-white/[0.07] bg-ink/50 p-4 pt-[22px]">
      <Link href="/" className="flex items-center gap-[11px] px-2 pb-[22px] pt-1.5">
        <span className="h-[30px] w-[30px] rotate-45 rounded-lg bg-gradient-to-br from-mint to-[#1ea97a] shadow-[0_0_22px_rgba(47,230,168,0.45)]" />
        <span className="text-[19px] font-bold tracking-[-0.3px]">
          Alea<span className="text-mint">AI</span>
        </span>
      </Link>

      <div className="px-2.5 pb-2 pt-2 font-mono text-[10px] tracking-[2px] text-lo">WORKSPACE</div>

      <Link
        href="/"
        className={`${itemBase} ${flowActive ? 'bg-mint/10 text-hi' : 'text-mid hover:bg-white/5'}`}
      >
        <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] border-[1.6px] border-current text-[13px] leading-none">
          +
        </span>
        New Analysis
      </Link>

      <Link
        href="/dashboard"
        className={`${itemBase} ${dashActive ? 'bg-mint/10 text-hi' : 'text-mid hover:bg-white/5'}`}
      >
        <span className="grid h-[18px] w-[18px] flex-shrink-0 grid-cols-2 gap-0.5">
          <span className="rounded-[1.5px] bg-current" />
          <span className="rounded-[1.5px] bg-current opacity-50" />
          <span className="rounded-[1.5px] bg-current opacity-50" />
          <span className="rounded-[1.5px] bg-current" />
        </span>
        Dashboard
      </Link>

      <div className="px-2.5 pb-2 pt-[22px] font-mono text-[10px] tracking-[2px] text-lo">LEAGUES</div>

      <div className="flex items-center gap-[11px] rounded-[10px] px-3 py-[11px] text-sm font-medium text-hi">
        <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_10px_#2fe6a8]" /> NBA
        <span className="ml-auto font-mono text-[11px] text-lo">live</span>
      </div>
      {['NFL', 'MLB'].map((league) => (
        <div
          key={league}
          className="flex items-center gap-[11px] rounded-[10px] px-3 py-[11px] text-sm text-lo"
        >
          <span className="h-2 w-2 rounded-full bg-white/20" /> {league}
          <span className="ml-auto font-mono text-[11px]">soon</span>
        </div>
      ))}

      <div className="mt-auto flex items-center gap-[11px] rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#22303f] to-[#16202b] text-[13px] font-semibold text-mid">
          A
        </div>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-[13px] font-semibold">Analyst</div>
          <div className="font-mono text-[11px] text-lo">Pro plan</div>
        </div>
      </div>
    </aside>
  );
}
