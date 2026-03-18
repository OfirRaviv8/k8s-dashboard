/**
 * Skeleton — loading placeholder component
 * Used to show loading state while data is being fetched
 */

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function Skeleton({ className, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-secondary/50 animate-pulse rounded-md',
        className
      )}
      style={style}
      {...props}
    />
  );
}

/**
 * SkeletonCard — loading state for card components
 */
export function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

/**
 * SkeletonTable — loading state for table rows
 */
export function SkeletonTableRow({ columns = 6 }: { columns?: number }) {
  return (
    <tr className="border-b border-border/40">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-2.5">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

/**
 * SkeletonTable — loading state for entire table
 */
export function SkeletonTable({ rows = 5, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonTableRow key={i} columns={columns} />
      ))}
    </>
  );
}

/**
 * SkeletonGrid — loading state for grid layout
 */
export function SkeletonGrid({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
