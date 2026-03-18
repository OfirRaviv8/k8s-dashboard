/**
 * Header — "Midnight Ops" design
 * 60px height, breadcrumb, cluster selector, status indicators
 */

import { useDashboardStore } from '@/store/dashboardStore';
import { useClusters, useStats } from '@/hooks/useK8sData';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bell, RefreshCw, AlertTriangle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const routeLabels: Record<string, string> = {
  '/': 'Overview',
  '/inventory': 'Inventory',
  '/posture': 'Posture',
  '/activity': 'Activity',
  '/policies': 'Policies',
};

export function Header() {
  const { selectedClusterId, setSelectedCluster } = useDashboardStore();
  const { data: clusters } = useClusters();
  const { data: stats } = useStats();
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs();

  const pageTitle = routeLabels[location.pathname] ?? 'Dashboard';

  return (
    <header className="flex items-center justify-between px-5 h-[60px] border-b border-border bg-background/80 backdrop-blur-sm shrink-0 gap-4">
      {/* Left: breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Center: page title and date */}
      <div className="flex items-center gap-2 flex-1 justify-center min-w-0">
        <h1 className="text-sm font-semibold text-foreground tracking-tight whitespace-nowrap">
          {pageTitle}
        </h1>
        <span className="text-border">|</span>
        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Critical findings badge */}
        {stats && stats.criticalFindings > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs font-mono text-red-400">
              {stats.criticalFindings} critical
            </span>
          </div>
        )}

        {/* Cluster selector */}
        <Select
          value={selectedClusterId ?? 'all'}
          onValueChange={(v) => setSelectedCluster(v === 'all' ? null : v)}
        >
          <SelectTrigger className="h-8 w-[140px] text-xs bg-secondary border-border font-mono hidden sm:flex">
            <SelectValue placeholder="All clusters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All clusters</SelectItem>
            {clusters?.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Refresh button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label="Refresh data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground relative"
          aria-label="Notifications"
        >
          <Bell className="w-3.5 h-3.5" />
          {stats && stats.openFindings > 0 && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </Button>

        {/* User avatar */}
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-semibold">
          K
        </div>
      </div>
    </header>
  );
}
