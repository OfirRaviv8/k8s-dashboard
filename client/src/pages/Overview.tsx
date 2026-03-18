/**
 * Overview page — dashboard home
 * Design: "Midnight Ops" — stat cards, cluster health, recent activity
 */

import { useStats, useClusters, useActivity, useFindings } from '@/hooks/useK8sData';
import { StatusBadge, SeverityBadge } from '@/components/ui/StatusBadge';
import { SkeletonGrid, SkeletonCard, SkeletonTableRow } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Server,
  Layers,
  Box,
  ShieldAlert,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, ResponsiveContainer, Cell } from 'recharts';

const activityTypeColors: Record<string, string> = {
  Deploy: 'text-blue-400',
  Scale: 'text-teal-400',
  Alert: 'text-red-400',
  Policy: 'text-purple-400',
  Scan: 'text-amber-400',
  Restart: 'text-orange-400',
};

const activityTypeBg: Record<string, string> = {
  Deploy: 'bg-blue-500/10 border-blue-500/20',
  Scale: 'bg-teal-500/10 border-teal-500/20',
  Alert: 'bg-red-500/10 border-red-500/20',
  Policy: 'bg-purple-500/10 border-purple-500/20',
  Scan: 'bg-amber-500/10 border-amber-500/20',
  Restart: 'bg-orange-500/10 border-orange-500/20',
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const diff = today.getDate() - d.getDate();
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function Overview() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: clusters, isLoading: clustersLoading } = useClusters();
  const { data: activity, isLoading: activityLoading } = useActivity();
  const { data: findings, isLoading: findingsLoading } = useFindings();

  const podChartData = stats
    ? [
        { name: 'Running', value: stats.runningPods, color: '#34d399' },
        { name: 'Pending', value: stats.pendingPods, color: '#fbbf24' },
        { name: 'Failed', value: stats.failedPods, color: '#f87171' },
      ]
    : [];

  const findingsBySeverity = findings
    ? [
        { name: 'Critical', value: findings.filter(f => f.severity === 'Critical' && f.status === 'Open').length, color: '#f87171' },
        { name: 'High', value: findings.filter(f => f.severity === 'High' && f.status === 'Open').length, color: '#fb923c' },
        { name: 'Medium', value: findings.filter(f => f.severity === 'Medium' && f.status === 'Open').length, color: '#fbbf24' },
        { name: 'Low', value: findings.filter(f => f.severity === 'Low' && f.status === 'Open').length, color: '#60a5fa' },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      {statsLoading ? (
        <SkeletonGrid count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Clusters */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Clusters</p>
                  <p className="text-2xl font-semibold font-mono text-foreground">
                    {stats?.totalClusters}
                  </p>
                  <p className="text-xs text-emerald-400 mt-1">
                    {stats?.healthyClusters} healthy
                  </p>
                </div>
                <div className="p-2 rounded-md bg-primary/10">
                  <Layers className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Namespaces */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Namespaces</p>
                  <p className="text-2xl font-semibold font-mono text-foreground">
                    {stats?.totalNamespaces}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">across all clusters</p>
                </div>
                <div className="p-2 rounded-md bg-blue-500/10">
                  <Server className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pods */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Pods</p>
                  <p className="text-2xl font-semibold font-mono text-foreground">
                    {stats?.totalPods}
                  </p>
                  <p className="text-xs mt-1">
                    <span className="text-red-400">{stats?.failedPods} failed</span>
                    <span className="text-muted-foreground mx-1">·</span>
                    <span className="text-amber-400">{stats?.pendingPods} pending</span>
                  </p>
                </div>
                <div className="p-2 rounded-md bg-teal-500/10">
                  <Box className="w-4 h-4 text-teal-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Findings */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Open Findings</p>
                  <p className="text-2xl font-semibold font-mono text-foreground">
                    {stats?.openFindings}
                  </p>
                  <p className="text-xs text-red-400 mt-1">
                    {stats?.criticalFindings} critical
                  </p>
                </div>
                <div className="p-2 rounded-md bg-red-500/10">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts + Clusters row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pod status chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-foreground">Pod Status</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {statsLoading ? (
              <div className="h-[140px] bg-secondary/30 rounded-md animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={podChartData} barSize={32}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <ReTooltip
                    contentStyle={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, fontSize: 12 }}
                    labelStyle={{ color: '#e2e8f0' }}
                    itemStyle={{ color: '#94a3b8' }}
                  />
                  <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                    {podChartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Findings by severity */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-foreground">Open Findings by Severity</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {findingsLoading ? (
              <div className="h-[140px] bg-secondary/30 rounded-md animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={findingsBySeverity} barSize={32}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <ReTooltip
                    contentStyle={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, fontSize: 12 }}
                    labelStyle={{ color: '#e2e8f0' }}
                    itemStyle={{ color: '#94a3b8' }}
                  />
                  <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                    {findingsBySeverity.map((entry, i) => (
                      <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Cluster list */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-foreground">Clusters</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {clustersLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              clusters?.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-xs font-mono text-foreground">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground">{c.provider} · {c.region}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">{c.nodeCount} nodes</span>
                    <StatusBadge status={c.status} />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Recent Activity
            </CardTitle>
            <span className="text-xs text-muted-foreground">Last 24h</span>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          {activityLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3 py-2">
                  <div className="w-12 h-6 bg-secondary/30 rounded animate-pulse shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 bg-secondary/30 rounded w-2/3 animate-pulse" />
                    <div className="h-2 bg-secondary/30 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {activity?.slice(0, 6).map((event) => (
                <div key={event.id} className="flex items-start gap-3 py-2 border-b border-border/40 last:border-0">
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-medium border shrink-0 mt-0.5 ${activityTypeBg[event.type]}`}
                  >
                    <span className={activityTypeColors[event.type]}>{event.type}</span>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground truncate">{event.message}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      {event.actor} · {formatDate(event.timestamp)} {formatTime(event.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
