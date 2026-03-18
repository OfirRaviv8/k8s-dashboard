/**
 * Policies page — security and compliance policy management
 * Design: "Midnight Ops" — policy cards with enforcement badges, search and filtering
 */

import { useState } from 'react';
import { usePolicies } from '@/hooks/useK8sData';
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
import { FileText, ShieldCheck, AlertCircle, EyeOff, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Policy } from '@/lib/mock-data';

const categoryColors: Record<string, string> = {
  Security: 'text-red-400 bg-red-500/10 border-red-500/20',
  Compliance: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Best Practice': 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  Custom: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
};

const enforcementConfig: Record<Policy['enforcement'], { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  Enforce: {
    label: 'Enforce',
    icon: <ShieldCheck className="w-3 h-3" />,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  Audit: {
    label: 'Audit',
    icon: <AlertCircle className="w-3 h-3" />,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  Disabled: {
    label: 'Disabled',
    icon: <EyeOff className="w-3 h-3" />,
    color: 'text-muted-foreground',
    bg: 'bg-secondary border-border',
  },
};

export default function Policies() {
  const { data: policies, isLoading } = usePolicies();

  // Filter states
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [enforcementFilter, setEnforcementFilter] = useState('all');

  // Filter policies
  const filteredPolicies = policies
    ?.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesEnforcement = enforcementFilter === 'all' || p.enforcement === enforcementFilter;
      return matchesSearch && matchesCategory && matchesEnforcement;
    })
    .sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  // Get unique categories
  const categories = Array.from(new Set(policies?.map((p) => p.category) ?? []));

  // Summary stats
  const enforced = policies?.filter((p) => p.enforcement === 'Enforce').length ?? 0;
  const audited = policies?.filter((p) => p.enforcement === 'Audit').length ?? 0;
  const disabled = policies?.filter((p) => p.enforcement === 'Disabled').length ?? 0;
  const totalViolations = policies?.reduce((sum, p) => sum + p.violations, 0) ?? 0;

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Policies</p>
                <p className="text-2xl font-semibold font-mono text-foreground">{policies?.length ?? 0}</p>
              </div>
              <div className="p-2 rounded-md bg-slate-500/10">
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Enforced</p>
                <p className="text-2xl font-semibold font-mono text-emerald-400">{enforced}</p>
              </div>
              <div className="p-2 rounded-md bg-emerald-500/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Audit Mode</p>
                <p className="text-2xl font-semibold font-mono text-amber-400">{audited}</p>
              </div>
              <div className="p-2 rounded-md bg-amber-500/10">
                <AlertCircle className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Violations</p>
                <p className="text-2xl font-semibold font-mono text-red-400">{totalViolations}</p>
              </div>
              <div className="p-2 rounded-md bg-red-500/10">
                <FileText className="w-4 h-4 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policies table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3 pt-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Policies
            </CardTitle>
            <span className="text-xs text-muted-foreground font-mono">{filteredPolicies.length} policies</span>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search policies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs bg-secondary border-border"
              />
            </div>
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
            <Select value={enforcementFilter} onValueChange={setEnforcementFilter}>
              <SelectTrigger className="h-8 text-xs bg-secondary border-border">
                <SelectValue placeholder="Enforcement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All enforcement</SelectItem>
                <SelectItem value="Enforce">Enforce</SelectItem>
                <SelectItem value="Audit">Audit</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4">
          <div className="border border-border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 bg-secondary/30 hover:bg-secondary/30">
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Name</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Description</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Category</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Enforcement</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Scope</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Violations</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground py-2 px-3">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <>
                    <SkeletonTableRow columns={7} />
                    <SkeletonTableRow columns={7} />
                    <SkeletonTableRow columns={7} />
                  </>
                ) : filteredPolicies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-xs text-muted-foreground">
                      No policies found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPolicies.map((p) => {
                    const enf = enforcementConfig[p.enforcement];
                    return (
                      <TableRow key={p.id} className="border-b border-border/40 hover:bg-secondary/20 transition-colors">
                        <TableCell className="text-xs font-mono text-foreground py-2 px-3 max-w-[180px] truncate">
                          {p.name}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground py-2 px-3 max-w-[240px] truncate">
                          {p.description}
                        </TableCell>
                        <TableCell className="py-2 px-3">
                          <span className={cn('inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-mono border', categoryColors[p.category])}>
                            {p.category}
                          </span>
                        </TableCell>
                        <TableCell className="py-2 px-3">
                          <span className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono border', enf.bg, enf.color)}>
                            {enf.icon}
                            {enf.label}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground py-2 px-3">{p.scope}</TableCell>
                        <TableCell className="text-xs font-mono py-2 px-3">
                          <span className={p.violations > 0 ? 'text-red-400' : 'text-emerald-400'}>
                            {p.violations}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground py-2 px-3 font-mono">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </TableCell>
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
