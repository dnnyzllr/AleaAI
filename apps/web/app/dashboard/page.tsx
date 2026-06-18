'use client';

import { useRouter } from 'next/navigation';
import { useAnalysis } from '@/context/AnalysisContext';
import { DASHBOARD_STATS } from '@/lib/mock-data';
import StatTile from '@/components/dashboard/StatTile';
import ReportsTable from '@/components/dashboard/ReportsTable';

export default function DashboardPage() {
  const router = useRouter();
  const { saved } = useAnalysis();

  return (
    <div className="mx-auto max-w-[1080px] px-4 pb-14 pt-[34px] md:px-8">
      <div className="mb-6 flex items-center gap-4">
        <div>
          <h2 className="mb-[5px] text-[25px] font-bold tracking-[-0.5px]">Saved reports</h2>
          <p className="text-[15px] text-mid">Your tracked NBA markets and their historical edge.</p>
        </div>
        <button
          onClick={() => router.push('/')}
          className="ml-auto flex items-center gap-2 rounded-[11px] bg-mint px-[18px] py-3 text-sm font-semibold text-ink transition-colors hover:bg-[#39f2b5]"
        >
          <span className="text-[17px] leading-none">+</span> New analysis
        </button>
      </div>

      <div className="mb-[22px] grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <StatTile label="ANALYSES RUN" value={String(DASHBOARD_STATS.analysesRun)} />
        <StatTile label="AVG GAP" value={DASHBOARD_STATS.avgEdge} accent />
        <StatTile label="ABOVE MARKET" value={String(DASHBOARD_STATS.positiveSignals)} />
        <StatTile label="PLAYERS TRACKED" value={String(DASHBOARD_STATS.playersTracked)} />
      </div>

      <ReportsTable reports={saved} onOpen={() => router.push('/report')} />
    </div>
  );
}
