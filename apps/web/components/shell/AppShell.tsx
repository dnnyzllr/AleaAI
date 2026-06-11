import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-ink bg-[radial-gradient(900px_500px_at_75%_-10%,rgba(47,230,168,0.08),transparent_60%),radial-gradient(700px_500px_at_0%_110%,rgba(47,230,168,0.04),transparent_55%)]">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <section className="min-h-0 flex-1 overflow-y-auto">{children}</section>
      </main>
    </div>
  );
}
