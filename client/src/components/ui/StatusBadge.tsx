/**
 * StatusBadge — displays Kubernetes resource status with color coding
 */

import { cn } from '@/lib/utils';
import type { ResourceStatus, Severity } from '@/lib/mock-data';

interface StatusBadgeProps {
  status: ResourceStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-mono font-medium',
        status === 'Running' && 'status-running',
        status === 'Pending' && 'status-pending',
        status === 'Failed' && 'status-failed',
        status === 'Unknown' && 'status-unknown',
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          status === 'Running' && 'bg-emerald-400',
          status === 'Pending' && 'bg-amber-400',
          status === 'Failed' && 'bg-red-400',
          status === 'Unknown' && 'bg-slate-400',
        )}
      />
      {status}
    </span>
  );
}

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-mono font-medium',
        severity === 'Critical' && 'bg-red-500/15 text-red-400 border border-red-500/30',
        severity === 'High' && 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
        severity === 'Medium' && 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
        severity === 'Low' && 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
        severity === 'Info' && 'bg-slate-500/15 text-slate-400 border border-slate-500/30',
        className
      )}
    >
      {severity}
    </span>
  );
}
