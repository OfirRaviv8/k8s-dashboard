/**
 * Sidebar — "Midnight Ops" design
 * Deep dark background, teal active indicator, Space Grotesk font
 * Collapsible via Zustand store
 */

import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '@/hooks/useMobile';
import {
  LayoutDashboard,
  Server,
  ShieldCheck,
  Activity,
  FileText,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/inventory', label: 'Inventory', icon: Server },
  { to: '/posture', label: 'Posture', icon: ShieldCheck },
  { to: '/activity', label: 'Activity', icon: Activity },
  { to: '/policies', label: 'Policies', icon: FileText },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();
  const isMobile = useIsMobile();
  const isCollapsed = isMobile || sidebarCollapsed;

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-200 ease-in-out shrink-0',
        isCollapsed ? 'w-[60px]' : 'w-[220px]'
      )}
    >
      {/* Mobile backdrop */}
      {isMobile && !isCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar} />
      )}
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-sidebar-border h-[60px]">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/20 shrink-0">
          <Layers className="w-4 h-4 text-primary" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <span className="text-sm font-semibold text-sidebar-foreground tracking-tight whitespace-nowrap">
              K8s Dashboard
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              <span className="text-[10px] text-muted-foreground font-mono">LIVE</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <Tooltip key={to} delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-2.5 py-2 rounded-sm text-sm font-medium transition-colors duration-100 group',
                    'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent',
                    isActive && 'nav-item-active text-sidebar-accent-foreground',
                    isCollapsed && 'justify-center px-0'
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{label}</span>}
              </NavLink>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="text-xs">
                {label}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full h-8 rounded-sm text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Collapse</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}

// Mobile sheet version (for small screens)
export function SidebarMobile() {
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Toggle sidebar"
      >
        <Layers className="w-5 h-5" />
      </button>
    </div>
  );
}
