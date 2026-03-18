/**
 * Breadcrumb — navigation hierarchy component
 * Shows current page location in the app
 */

import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1">
        {/* Home link */}
        <li>
          <Link
            to="/"
            className="inline-flex items-center justify-center w-6 h-6 rounded-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>

        {/* Breadcrumb items */}
        {items.length > 0 && (
          <>
            <li className="text-muted-foreground">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            {items.map((item, idx) => {
              const isLast = idx === items.length - 1;
              return (
                <li key={idx} className="flex items-center gap-1">
                  {item.href && !isLast ? (
                    <Link
                      to={item.href}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors truncate max-w-[120px]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        'text-xs font-medium truncate max-w-[120px]',
                        isLast
                          ? 'text-foreground font-semibold'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                  {!isLast && (
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  )}
                </li>
              );
            })}
          </>
        )}
      </ol>
    </nav>
  );
}
