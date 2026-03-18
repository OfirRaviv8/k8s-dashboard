/**
 * DashboardLayout — wraps all dashboard pages
 * Sidebar (fixed, responsive) + Header (fixed) + scrollable content area
 * On mobile: sidebar collapses to icon-only (60px)
 */

import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useIsMobile } from '@/hooks/useMobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar: always visible, responsive width */}
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
