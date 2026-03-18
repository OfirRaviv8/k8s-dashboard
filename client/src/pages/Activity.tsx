/**
 * Activity page — audit log and event timeline
 * Design: "Midnight Ops" — timeline with type-coded events, search and filtering
 */

import { useState } from 'react';
import { useActivity } from '@/hooks/useK8sData';
import { SkeletonTableRow } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Activity as ActivityIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  Deploy: { label: 'Deploy', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  Scale: { label: 'Scale', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  Alert: { label: 'Alert', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  Policy: { label: 'Policy', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  Scan: { label: 'Scan', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  Restart: { label: 'Restart', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
};

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
  };
}

export default function Activity() {
  const { data: events, isLoading } = useActivity();

  // Filter states
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [namespaceFilter, setNamespaceFilter] = useState('all');

  // Filter events
  const filteredEvents = events
    ?.filter((e) => {
      const matchesSearch =
        e.message.toLowerCase().includes(search.toLowerCase()) ||
        e.resource.toLowerCase().includes(search.toLowerCase()) ||
        e.actor.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || e.type === typeFilter;
      const matchesNamespace = namespaceFilter === 'all' || e.namespace === namespaceFilter;
      return matchesSearch && matchesType && matchesNamespace;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) ?? [];

  // Get unique namespaces
  const namespaces = Array.from(new Set(events?.map((e) => e.namespace) ?? []));

  // Type counts
  const typeCounts = events?.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>) ?? {};

  return (
    <div className="space-y-6">
      {/* Type summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {Object.entries(typeConfig).map(([type, cfg]) => (
          <div
            key={type}
            className={cn('flex items-center justify-between px-2.5 py-2 rounded-sm border text-xs font-mono', cfg.bg, cfg.border)}
          >
            <span className={cfg.color}>{cfg.label}</span>
            <span className="text-muted-foreground font-semibold">{typeCounts[type] ?? 0}</span>
          </div>
        ))}
      </div>

      {/* Events table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3 pt-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <ActivityIcon className="w-4 h-4 text-primary" />
              Event Log
            </CardTitle>
            <span className="text-xs text-muted-foreground font-mono">{filteredEvents.length} events</span>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs bg-secondary border-border"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-8 text-xs bg-secondary border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {Object.keys(typeConfig).map((type) => (
                  <SelectItem key={type} value={type}>
                    {typeConfig[type].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={namespaceFilter} onValueChange={setNamespaceFilter}>
              <SelectTrigger className="h-8 text-xs bg-secondary border-border">
                <SelectValue placeholder="Namespace" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All namespaces</SelectItem>
                {namespaces.map((ns) => (
                  <SelectItem key={ns} value={ns}>
                    {ns}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4">
          <div className="border border-border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 bg-secondary/30 hover:bg-secondary/30">
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Timestamp</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Type</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Message</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Resource</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Namespace</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Actor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <>
                    <SkeletonTableRow columns={6} />
                    <SkeletonTableRow columns={6} />
                    <SkeletonTableRow columns={6} />
                  </>
                ) : filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-xs text-muted-foreground">
                      No events found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((event) => {
                    const ts = formatTimestamp(event.timestamp);
                    const cfg = typeConfig[event.type];
                    return (
                      <TableRow key={event.id} className="border-b border-border/40 hover:bg-secondary/20 transition-colors">
                        <TableCell className="text-xs font-mono text-muted-foreground py-2 px-3 whitespace-nowrap">
                          <span className="text-foreground">{ts.date}</span>
                          <span className="ml-1.5">{ts.time}</span>
                        </TableCell>
                        <TableCell className="py-2 px-3">
                          <span className={cn('inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-mono border', cfg.bg, cfg.border, cfg.color)}>
                            {cfg.label}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-foreground py-2 px-3 max-w-[280px] truncate">
                          {event.message}
                        </TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground py-2 px-3 max-w-[140px] truncate">
                          {event.resource}
                        </TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground py-2 px-3">{event.namespace}</TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground py-2 px-3">{event.actor}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
