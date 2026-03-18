/**
 * Inventory page — browse clusters, namespaces, and pods
 * Design: "Midnight Ops" — dense tables, monospace data, status badges
 */

import { useState } from 'react';
import { useClusters, useNamespaces, usePods } from '@/hooks/useK8sData';
import { useDashboardStore } from '@/store/dashboardStore';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SkeletonTableRow } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Server, Box, Layers, Search } from 'lucide-react';

function ProgressBar({ value, color = 'bg-primary' }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">{value}%</span>
    </div>
  );
}

export default function Inventory() {
  const { selectedClusterId } = useDashboardStore();
  const { data: clusters, isLoading: clustersLoading } = useClusters();
  const { data: namespaces, isLoading: nsLoading } = useNamespaces(selectedClusterId);
  const { data: pods, isLoading: podsLoading } = usePods(selectedClusterId);

  // Search and filter states
  const [clusterSearch, setClusterSearch] = useState('');
  const [nsSearch, setNsSearch] = useState('');
  const [podSearch, setPodSearch] = useState('');
  const [podStatusFilter, setPodStatusFilter] = useState('all');

  // Filter and sort clusters
  const filteredClusters = clusters
    ?.filter((c) => c.name.toLowerCase().includes(clusterSearch.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  // Filter and sort namespaces
  const filteredNamespaces = namespaces
    ?.filter((ns) => ns.name.toLowerCase().includes(nsSearch.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  // Filter and sort pods
  const filteredPods = pods
    ?.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(podSearch.toLowerCase());
      const matchesStatus = podStatusFilter === 'all' || p.status === podStatusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Browse all Kubernetes resources across your clusters.
        {selectedClusterId && <span className="text-primary ml-1">Filtered by selected cluster.</span>}
      </p>

      <Tabs defaultValue="clusters">
        <TabsList className="bg-secondary border border-border h-8">
          <TabsTrigger value="clusters" className="text-xs h-6 px-3">
            <Layers className="w-3 h-3 mr-1.5" />
            Clusters
          </TabsTrigger>
          <TabsTrigger value="namespaces" className="text-xs h-6 px-3">
            <Server className="w-3 h-3 mr-1.5" />
            Namespaces
          </TabsTrigger>
          <TabsTrigger value="pods" className="text-xs h-6 px-3">
            <Box className="w-3 h-3 mr-1.5" />
            Pods
          </TabsTrigger>
        </TabsList>

        {/* Clusters tab */}
        <TabsContent value="clusters" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Clusters</CardTitle>
                <span className="text-xs text-muted-foreground font-mono">{filteredClusters.length} total</span>
              </div>
              <div className="mt-3 relative">
                <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search clusters..."
                  value={clusterSearch}
                  onChange={(e) => setClusterSearch(e.target.value)}
                  className="pl-8 h-8 text-xs bg-secondary border-border"
                />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left px-4 py-2 font-medium">Name</th>
                      <th className="text-left px-4 py-2 font-medium">Provider</th>
                      <th className="text-left px-4 py-2 font-medium">Region</th>
                      <th className="text-left px-4 py-2 font-medium">Version</th>
                      <th className="text-left px-4 py-2 font-medium">Nodes</th>
                      <th className="text-left px-4 py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clustersLoading ? (
                      <>
                        <SkeletonTableRow columns={6} />
                        <SkeletonTableRow columns={6} />
                        <SkeletonTableRow columns={6} />
                      </>
                    ) : filteredClusters.length === 0 ? (
                      <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No clusters found</td></tr>
                    ) : filteredClusters.map((c) => (
                      <tr key={c.id} className="border-b border-border/40 hover:bg-secondary/50 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-foreground">{c.name}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{c.provider}</td>
                        <td className="px-4 py-2.5 font-mono text-muted-foreground">{c.region}</td>
                        <td className="px-4 py-2.5 font-mono text-muted-foreground">v{c.version}</td>
                        <td className="px-4 py-2.5 font-mono text-foreground">{c.nodeCount}</td>
                        <td className="px-4 py-2.5"><StatusBadge status={c.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Namespaces tab */}
        <TabsContent value="namespaces" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Namespaces</CardTitle>
                <span className="text-xs text-muted-foreground font-mono">{filteredNamespaces.length} total</span>
              </div>
              <div className="mt-3 relative">
                <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search namespaces..."
                  value={nsSearch}
                  onChange={(e) => setNsSearch(e.target.value)}
                  className="pl-8 h-8 text-xs bg-secondary border-border"
                />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left px-4 py-2 font-medium">Name</th>
                      <th className="text-left px-4 py-2 font-medium">Cluster</th>
                      <th className="text-left px-4 py-2 font-medium">Pods</th>
                      <th className="text-left px-4 py-2 font-medium w-36">CPU Usage</th>
                      <th className="text-left px-4 py-2 font-medium w-36">Memory Usage</th>
                      <th className="text-left px-4 py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nsLoading ? (
                      <>
                        <SkeletonTableRow columns={6} />
                        <SkeletonTableRow columns={6} />
                        <SkeletonTableRow columns={6} />
                      </>
                    ) : filteredNamespaces.length === 0 ? (
                      <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No namespaces found</td></tr>
                    ) : filteredNamespaces.map((ns) => {
                      const cluster = clusters?.find(c => c.id === ns.clusterId);
                      return (
                        <tr key={ns.id} className="border-b border-border/40 hover:bg-secondary/50 transition-colors">
                          <td className="px-4 py-2.5 font-mono text-foreground">{ns.name}</td>
                          <td className="px-4 py-2.5 font-mono text-muted-foreground">{cluster?.name ?? ns.clusterId}</td>
                          <td className="px-4 py-2.5 font-mono text-foreground">{ns.podCount}</td>
                          <td className="px-4 py-2.5 w-36">
                            <ProgressBar
                              value={ns.cpuUsage}
                              color={ns.cpuUsage > 70 ? 'bg-red-400' : ns.cpuUsage > 50 ? 'bg-amber-400' : 'bg-primary'}
                            />
                          </td>
                          <td className="px-4 py-2.5 w-36">
                            <ProgressBar
                              value={ns.memUsage}
                              color={ns.memUsage > 70 ? 'bg-red-400' : ns.memUsage > 50 ? 'bg-amber-400' : 'bg-blue-400'}
                            />
                          </td>
                          <td className="px-4 py-2.5"><StatusBadge status={ns.status} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pods tab */}
        <TabsContent value="pods" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Pods</CardTitle>
                <span className="text-xs text-muted-foreground font-mono">{filteredPods.length} total</span>
              </div>
              <div className="mt-3 flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search pods..."
                    value={podSearch}
                    onChange={(e) => setPodSearch(e.target.value)}
                    className="pl-8 h-8 text-xs bg-secondary border-border"
                  />
                </div>
                <Select value={podStatusFilter} onValueChange={setPodStatusFilter}>
                  <SelectTrigger className="h-8 w-[120px] text-xs bg-secondary border-border">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All status</SelectItem>
                    <SelectItem value="Running">Running</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left px-4 py-2 font-medium">Name</th>
                      <th className="text-left px-4 py-2 font-medium">Namespace</th>
                      <th className="text-left px-4 py-2 font-medium">Image</th>
                      <th className="text-left px-4 py-2 font-medium">Node</th>
                      <th className="text-left px-4 py-2 font-medium">Restarts</th>
                      <th className="text-left px-4 py-2 font-medium">Age</th>
                      <th className="text-left px-4 py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {podsLoading ? (
                      <>
                        <SkeletonTableRow columns={7} />
                        <SkeletonTableRow columns={7} />
                        <SkeletonTableRow columns={7} />
                      </>
                    ) : filteredPods.length === 0 ? (
                      <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No pods found</td></tr>
                    ) : filteredPods.map((pod) => (
                      <tr key={pod.id} className="border-b border-border/40 hover:bg-secondary/50 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-foreground max-w-[200px] truncate">{pod.name}</td>
                        <td className="px-4 py-2.5 font-mono text-muted-foreground">{pod.namespace}</td>
                        <td className="px-4 py-2.5 font-mono text-muted-foreground max-w-[160px] truncate">{pod.image}</td>
                        <td className="px-4 py-2.5 font-mono text-muted-foreground">{pod.node}</td>
                        <td className="px-4 py-2.5 font-mono">
                          <span className={pod.restarts > 3 ? 'text-red-400' : pod.restarts > 0 ? 'text-amber-400' : 'text-muted-foreground'}>
                            {pod.restarts}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 font-mono text-muted-foreground">{pod.age}</td>
                        <td className="px-4 py-2.5"><StatusBadge status={pod.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
