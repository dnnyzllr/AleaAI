'use client';

import { ReactNode, useSyncExternalStore } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const SIDEBAR_STORAGE_KEY = 'sidebar-open';
const SIDEBAR_CHANGE_EVENT = 'sidebar-open-change';

function getStoredSidebarOpen() {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(SIDEBAR_STORAGE_KEY) !== 'false';
}

function subscribeToSidebarChange(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(SIDEBAR_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(SIDEBAR_CHANGE_EVENT, onStoreChange);
  };
}

export default function AppShell({ children }: { children: ReactNode }) {
  const sidebarOpen = useSyncExternalStore(
    subscribeToSidebarChange,
    getStoredSidebarOpen,
    () => true,
  );

  function toggleSidebar() {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(!sidebarOpen));
    window.dispatchEvent(new Event(SIDEBAR_CHANGE_EVENT));
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-ink bg-[radial-gradient(900px_500px_at_75%_-10%,rgba(47,230,168,0.08),transparent_60%),radial-gradient(700px_500px_at_0%_110%,rgba(47,230,168,0.04),transparent_55%)]">
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <section className="min-h-0 flex-1 overflow-y-auto pb-16 md:pb-0">{children}</section>
      </main>
    </div>
  );
}
