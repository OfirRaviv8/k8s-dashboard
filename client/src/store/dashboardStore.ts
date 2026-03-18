/**
 * Zustand store for global dashboard state.
 * Manages selected cluster, sidebar collapse state, and active filters.
 */

import { create } from 'zustand';

interface DashboardState {
  selectedClusterId: string | null;
  sidebarCollapsed: boolean;
  setSelectedCluster: (id: string | null) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedClusterId: null,
  sidebarCollapsed: false,
  setSelectedCluster: (id) => set({ selectedClusterId: id }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}));
