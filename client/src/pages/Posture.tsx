/**
 * Posture page — security findings and compliance
 * Design: "Midnight Ops" — findings table with severity, status, remediation
 */

import { useState } from 'react';
import { useFindings } from '@/hooks/useK8sData';
import { SeverityBadge } from '@/components/ui/StatusBadge';
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
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Download, AlertTriangle, CheckCircle2, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

export default function Posture() {
  const { data: findings, isLoading: findingsLoading } = useFindings();

  // Filter states
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filter findings
  const filteredFindings = findings
    ?.filter((f) => {
      const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase());
      const matchesSeverity = severityFilter === 'all' || f.severity === severityFilter;
      const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;
      return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      const severityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      return (severityOrder[a.severity as keyof typeof severityOrder] ?? 4) - (severityOrder[b.severity as keyof typeof severityOrder] ?? 4);
    }) ?? [];

  // Get unique categories
  const categories = Array.from(new Set(findings?.map((f) => f.category) ?? []));

  // Summary stats
  const stats = {
    total: findings?.length ?? 0,
    critical: findings?.filter((f) => f.severity === 'Critical' && f.status === 'Open').length ?? 0,
    high: findings?.filter((f) => f.severity === 'High' && f.status === 'Open').length ?? 0,
    open: findings?.filter((f) => f.status === 'Open').length ?? 0,
    resolved: findings?.filter((f) => f.status === 'Resolved').length ?? 0,
  };

  const handleExport = () => {
      const csv = [
      ['Title', 'Severity', 'Status', 'Category', 'Resource', 'Namespace'].join(','),
      ...filteredFindings.map((f) =>
        [
          `"${f.title}"`,
          f.severity,
          f.status,
          f.category,
          f.resource,
          f.namespace,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `posture-findings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Findings</p>
                <p className="text-2xl font-semibold font-mono text-foreground">{stats.total}</p>
              </div>
              <div className="p-2 rounded-md bg-slate-500/10">
                <ShieldAlert className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Critical</p>
                <p className="text-2xl font-semibold font-mono text-red-400">{stats.critical}</p>
              </div>
              <div className="p-2 rounded-md bg-red-500/10">
                <ShieldX className="w-4 h-4 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">High</p>
                <p className="text-2xl font-semibold font-mono text-orange-400">{stats.high}</p>
              </div>
              <div className="p-2 rounded-md bg-orange-500/10">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Open</p>
                <p className="text-2xl font-semibold font-mono text-amber-400">{stats.open}</p>
              </div>
              <div className="p-2 rounded-md bg-amber-500/10">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Resolved</p>
                <p className="text-2xl font-semibold font-mono text-emerald-400">{stats.resolved}</p>
              </div>
              <div className="p-2 rounded-md bg-emerald-500/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Findings table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3 pt-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="text-sm font-medium text-foreground">Security Findings</CardTitle>
            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1.5"
            >
              <Download className="w-3 h-3" />
              Export CSV
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search findings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs bg-secondary border-border"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="h-8 text-xs bg-secondary border-border">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All severity</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 text-xs bg-secondary border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-8 text-xs bg-secondary border-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
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
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Title</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Severity</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Category</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Resource</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Namespace</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Detected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {findingsLoading ? (
                  <>
                    <SkeletonTableRow columns={7} />
                    <SkeletonTableRow columns={7} />
                    <SkeletonTableRow columns={7} />
                  </>
                ) : filteredFindings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-xs text-muted-foreground">
                      No findings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFindings.map((finding) => (
                    <TableRow key={finding.id} className="border-b border-border/40 hover:bg-secondary/20 transition-colors">
                      <TableCell className="text-xs font-mono text-foreground py-2 px-3 max-w-[180px] truncate">
                        {finding.title}
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        <SeverityBadge severity={finding.severity} />
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-medium border ${
                            finding.status === 'Open'
                              ? 'bg-red-500/10 border-red-500/20 text-red-400'
                              : finding.status === 'Acknowledged'
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {finding.status === 'Resolved' && <CheckCircle2 className="w-2.5 h-2.5 mr-1" />}
                          {finding.status === 'Open' && <AlertTriangle className="w-2.5 h-2.5 mr-1" />}
                          {finding.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground py-2 px-3">{finding.category}</TableCell>
                      <TableCell className="text-xs text-muted-foreground py-2 px-3 font-mono max-w-[140px] truncate">
                        {finding.resource}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground py-2 px-3 font-mono">{finding.namespace}</TableCell>
                      <TableCell className="text-xs text-muted-foreground py-2 px-3 font-mono">
                        {new Date(finding.detectedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Showing {filteredFindings.length} of {findings?.length ?? 0} findings
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
