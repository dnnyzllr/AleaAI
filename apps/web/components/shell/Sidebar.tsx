'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FLOW_PATHS = ['/', '/verify', '/analyzing', '/report'];

function inAnalysisFlow(pathname: string): boolean {
  return FLOW_PATHS.some((p) => (p === '/' ? pathname === '/' : pathname.startsWith(p)));
}

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const flowActive = inAnalysisFlow(pathname);
  const dashActive = pathname.startsWith('/dashboard');

  const itemBase =
    'flex items-center rounded-[10px] px-3 py-[11px] text-sm font-medium transition-colors md:mb-1';

  return (
    <aside
      className={`fixed inset-x-0 bottom-0 z-30 flex h-16 flex-shrink-0 flex-row items-center gap-2 border-t border-white/[0.07] bg-ink/95 px-3 py-2 backdrop-blur md:relative md:inset-auto md:z-auto md:h-auto md:flex-col md:items-stretch md:gap-0 md:border-r md:border-t-0 md:bg-ink/50 md:p-4 md:pt-[22px] md:transition-[width] md:duration-200 md:backdrop-blur-0 ${
        open ? 'md:w-[220px]' : 'md:w-[60px]'
      }`}
    >
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-white/[0.1] bg-ink text-lo transition-colors hover:text-hi md:flex"
        aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <span className="text-[11px] leading-none">{open ? '<' : '>'}</span>
      </button>

      <Link
        href="/"
        className={`hidden items-center pb-[22px] pt-1.5 md:flex ${
          open ? 'gap-[11px] px-2' : 'justify-center'
        }`}
      >
        <span className="h-[30px] w-[30px] flex-shrink-0 rotate-45 rounded-lg bg-gradient-to-br from-mint to-[#1ea97a] shadow-[0_0_22px_rgba(47,230,168,0.45)]" />
        {open && (
          <span className="text-[19px] font-bold tracking-[-0.3px]">
            Alea<span className="text-mint">AI</span>
          </span>
        )}
      </Link>


      <Link
        href="/"
        title={!open ? 'New Analysis' : undefined}
        className={`${itemBase} flex-1 justify-center gap-2 md:flex-none ${
          open ? 'md:gap-[11px]' : 'md:justify-center'
        } ${
          flowActive ? 'bg-mint/10 text-hi' : 'text-mid hover:bg-white/5'
        }`}
      >
        <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] border-[1.6px] border-current text-[13px] leading-none">
          +
        </span>
        <span className="text-xs md:hidden">New</span>
        {open && <span className="hidden md:inline">New Analysis</span>}
      </Link>

      <Link
        href="/dashboard"
        title={!open ? 'Dashboard' : undefined}
        className={`${itemBase} flex-1 justify-center gap-2 md:flex-none ${
          open ? 'md:gap-[11px]' : 'md:justify-center'
        } ${
          dashActive ? 'bg-mint/10 text-hi' : 'text-mid hover:bg-white/5'
        }`}
      >
        <span className="grid h-[18px] w-[18px] flex-shrink-0 grid-cols-2 gap-0.5">
          <span className="rounded-[1.5px] bg-current" />
          <span className="rounded-[1.5px] bg-current opacity-50" />
          <span className="rounded-[1.5px] bg-current opacity-50" />
          <span className="rounded-[1.5px] bg-current" />
        </span>
        <span className="text-xs md:hidden">Dash</span>
        {open && <span className="hidden md:inline">Dashboard</span>}
      </Link>

      {open ? (
        <div className="hidden px-2.5 pb-2 pt-[22px] font-mono text-[10px] tracking-[2px] text-lo md:block">
          LEAGUES
        </div>
      ) : (
        <div className="hidden md:mt-3 md:block md:border-t md:border-white/[0.05]" />
      )}

      <div
        title={!open ? 'NBA' : undefined}
        className={`hidden items-center rounded-[10px] px-3 py-[11px] text-sm font-medium text-hi md:flex ${
          open ? 'md:gap-[11px]' : 'md:justify-center'
        }`}
      >
        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-mint shadow-[0_0_10px_#2fe6a8]" />
        {open && (
          <>
            <span>NBA</span>
            <span className="ml-auto font-mono text-[11px] text-lo">live</span>
          </>
        )}
      </div>

      {['NFL', 'MLB'].map((league) => (
        <div
          key={league}
          title={!open ? league : undefined}
          className={`hidden items-center rounded-[10px] px-3 py-[11px] text-sm text-lo md:flex ${
            open ? 'md:gap-[11px]' : 'md:justify-center'
          }`}
        >
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-white/20" />
          {open && (
            <>
              <span>{league}</span>
              <span className="ml-auto font-mono text-[11px]">soon</span>
            </>
          )}
        </div>
      ))}

    </aside>
  );
}
