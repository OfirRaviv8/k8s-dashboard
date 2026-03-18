/**
 * React Query hooks for Kubernetes mock data.
 * Simulates async data fetching with artificial delays.
 */

import { useQuery } from '@tanstack/react-query';
import {
  mockClusters,
  mockNamespaces,
  mockPods,
  mockFindings,
  mockActivity,
  mockPolicies,
  mockStats,
} from '@/lib/mock-data';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function useClusters() {
  return useQuery({
    queryKey: ['clusters'],
    queryFn: async () => {
      await delay(300);
      return mockClusters;
    },
    staleTime: 30_000,
  });
}

export function useNamespaces(clusterId?: string | null) {
  return useQuery({
    queryKey: ['namespaces', clusterId],
    queryFn: async () => {
      await delay(200);
      return clusterId
        ? mockNamespaces.filter((ns) => ns.clusterId === clusterId)
        : mockNamespaces;
    },
    staleTime: 30_000,
  });
}

export function usePods(clusterId?: string | null) {
  return useQuery({
    queryKey: ['pods', clusterId],
    queryFn: async () => {
      await delay(250);
      return clusterId
        ? mockPods.filter((p) => p.clusterId === clusterId)
        : mockPods;
    },
    staleTime: 30_000,
  });
}

export function useFindings() {
  return useQuery({
    queryKey: ['findings'],
    queryFn: async () => {
      await delay(200);
      return mockFindings;
    },
    staleTime: 30_000,
  });
}

export function useActivity() {
  return useQuery({
    queryKey: ['activity'],
    queryFn: async () => {
      await delay(150);
      return mockActivity;
    },
    staleTime: 30_000,
  });
}

export function usePolicies() {
  return useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      await delay(200);
      return mockPolicies;
    },
    staleTime: 30_000,
  });
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      await delay(100);
      return mockStats;
    },
    staleTime: 30_000,
  });
}
