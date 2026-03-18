/**
 * useBreadcrumbs — Hook to generate breadcrumb items from current route
 */

import { useLocation } from 'react-router-dom';
import type { BreadcrumbItem } from '@/components/ui/Breadcrumb';

const routeBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  '/': [],
  '/inventory': [{ label: 'Inventory' }],
  '/posture': [{ label: 'Posture' }],
  '/activity': [{ label: 'Activity' }],
  '/policies': [{ label: 'Policies' }],
};

export function useBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation();
  return routeBreadcrumbs[location.pathname] ?? [];
}
