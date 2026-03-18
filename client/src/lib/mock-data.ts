/**
 * Mock data for Kubernetes monitoring dashboard.
 * All data is static — no backend required.
 */

export type ResourceStatus = 'Running' | 'Pending' | 'Failed' | 'Unknown';
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';

// ─── Clusters ────────────────────────────────────────────────────────────────

export interface Cluster {
  id: string;
  name: string;
  provider: 'EKS' | 'GKE' | 'AKS' | 'On-Prem';
  region: string;
  version: string;
  nodeCount: number;
  status: ResourceStatus;
}

export const mockClusters: Cluster[] = [
  { id: 'c1', name: 'prod-us-east', provider: 'EKS', region: 'us-east-1', version: '1.29', nodeCount: 12, status: 'Running' },
  { id: 'c2', name: 'prod-eu-west', provider: 'GKE', region: 'europe-west1', version: '1.28', nodeCount: 8, status: 'Running' },
  { id: 'c3', name: 'staging-us', provider: 'EKS', region: 'us-west-2', version: '1.29', nodeCount: 4, status: 'Running' },
  { id: 'c4', name: 'dev-cluster', provider: 'AKS', region: 'eastus', version: '1.27', nodeCount: 3, status: 'Pending' },
];

// ─── Namespaces ───────────────────────────────────────────────────────────────

export interface Namespace {
  id: string;
  name: string;
  clusterId: string;
  status: ResourceStatus;
  podCount: number;
  cpuUsage: number; // percentage
  memUsage: number; // percentage
}

export const mockNamespaces: Namespace[] = [
  { id: 'ns1', name: 'default', clusterId: 'c1', status: 'Running', podCount: 14, cpuUsage: 42, memUsage: 58 },
  { id: 'ns2', name: 'kube-system', clusterId: 'c1', status: 'Running', podCount: 9, cpuUsage: 18, memUsage: 31 },
  { id: 'ns3', name: 'monitoring', clusterId: 'c1', status: 'Running', podCount: 6, cpuUsage: 22, memUsage: 44 },
  { id: 'ns4', name: 'production', clusterId: 'c2', status: 'Running', podCount: 21, cpuUsage: 67, memUsage: 72 },
  { id: 'ns5', name: 'staging', clusterId: 'c3', status: 'Pending', podCount: 8, cpuUsage: 15, memUsage: 28 },
  { id: 'ns6', name: 'dev', clusterId: 'c4', status: 'Running', podCount: 5, cpuUsage: 9, memUsage: 19 },
];

// ─── Pods ─────────────────────────────────────────────────────────────────────

export interface Pod {
  id: string;
  name: string;
  namespace: string;
  clusterId: string;
  status: ResourceStatus;
  restarts: number;
  age: string;
  image: string;
  node: string;
}

export const mockPods: Pod[] = [
  { id: 'p1', name: 'api-server-7d9f8b-xk2p4', namespace: 'production', clusterId: 'c2', status: 'Running', restarts: 0, age: '14d', image: 'api-server:2.1.4', node: 'node-01' },
  { id: 'p2', name: 'frontend-6c8d9f-mn3q7', namespace: 'production', clusterId: 'c2', status: 'Running', restarts: 1, age: '14d', image: 'frontend:3.0.1', node: 'node-02' },
  { id: 'p3', name: 'worker-5b7c8d-pq4r8', namespace: 'production', clusterId: 'c2', status: 'Failed', restarts: 7, age: '2d', image: 'worker:1.9.2', node: 'node-03' },
  { id: 'p4', name: 'postgres-0', namespace: 'default', clusterId: 'c1', status: 'Running', restarts: 0, age: '30d', image: 'postgres:15', node: 'node-04' },
  { id: 'p5', name: 'redis-master-0', namespace: 'default', clusterId: 'c1', status: 'Running', restarts: 0, age: '30d', image: 'redis:7.2', node: 'node-01' },
  { id: 'p6', name: 'prometheus-0', namespace: 'monitoring', clusterId: 'c1', status: 'Running', restarts: 0, age: '21d', image: 'prometheus:2.48', node: 'node-02' },
  { id: 'p7', name: 'grafana-7f8d9c-rs5t9', namespace: 'monitoring', clusterId: 'c1', status: 'Running', restarts: 2, age: '21d', image: 'grafana:10.2', node: 'node-03' },
  { id: 'p8', name: 'ingress-nginx-controller-uv6w0', namespace: 'kube-system', clusterId: 'c1', status: 'Running', restarts: 0, age: '45d', image: 'ingress-nginx:1.9', node: 'node-01' },
  { id: 'p9', name: 'coredns-5d78c9b8d-xy7z1', namespace: 'kube-system', clusterId: 'c1', status: 'Pending', restarts: 3, age: '1d', image: 'coredns:1.11', node: 'node-04' },
  { id: 'p10', name: 'batch-job-a2b3c-wx8y2', namespace: 'staging', clusterId: 'c3', status: 'Running', restarts: 0, age: '3d', image: 'batch-job:0.5.1', node: 'node-01' },
];

// ─── Findings / Posture ───────────────────────────────────────────────────────

export interface Finding {
  id: string;
  title: string;
  severity: Severity;
  category: 'RBAC' | 'Network' | 'Image' | 'Config' | 'Secrets' | 'Runtime';
  resource: string;
  namespace: string;
  clusterId: string;
  status: 'Open' | 'Acknowledged' | 'Resolved';
  detectedAt: string;
}

export const mockFindings: Finding[] = [
  { id: 'f1', title: 'Privileged container running in production', severity: 'Critical', category: 'Runtime', resource: 'worker-5b7c8d', namespace: 'production', clusterId: 'c2', status: 'Open', detectedAt: '2026-03-17T08:23:00Z' },
  { id: 'f2', title: 'Container image using :latest tag', severity: 'High', category: 'Image', resource: 'frontend-6c8d9f', namespace: 'production', clusterId: 'c2', status: 'Open', detectedAt: '2026-03-16T14:10:00Z' },
  { id: 'f3', title: 'Secret exposed as environment variable', severity: 'High', category: 'Secrets', resource: 'api-server-7d9f8b', namespace: 'production', clusterId: 'c2', status: 'Acknowledged', detectedAt: '2026-03-15T09:45:00Z' },
  { id: 'f4', title: 'ClusterRole with wildcard permissions', severity: 'Critical', category: 'RBAC', resource: 'cluster-admin-binding', namespace: 'kube-system', clusterId: 'c1', status: 'Open', detectedAt: '2026-03-14T11:30:00Z' },
  { id: 'f5', title: 'Pod without resource limits', severity: 'Medium', category: 'Config', resource: 'batch-job-a2b3c', namespace: 'staging', clusterId: 'c3', status: 'Open', detectedAt: '2026-03-17T16:00:00Z' },
  { id: 'f6', title: 'Network policy allows all ingress', severity: 'High', category: 'Network', resource: 'default-netpol', namespace: 'default', clusterId: 'c1', status: 'Open', detectedAt: '2026-03-13T07:15:00Z' },
  { id: 'f7', title: 'Container running as root', severity: 'Medium', category: 'Runtime', resource: 'grafana-7f8d9c', namespace: 'monitoring', clusterId: 'c1', status: 'Resolved', detectedAt: '2026-03-10T12:00:00Z' },
  { id: 'f8', title: 'Deprecated API version in use', severity: 'Low', category: 'Config', resource: 'legacy-deployment', namespace: 'dev', clusterId: 'c4', status: 'Open', detectedAt: '2026-03-12T10:20:00Z' },
];

// ─── Activity / Events ────────────────────────────────────────────────────────

export interface ActivityEvent {
  id: string;
  type: 'Deploy' | 'Scale' | 'Alert' | 'Policy' | 'Scan' | 'Restart';
  message: string;
  resource: string;
  namespace: string;
  clusterId: string;
  timestamp: string;
  actor: string;
}

export const mockActivity: ActivityEvent[] = [
  { id: 'a1', type: 'Deploy', message: 'Deployed api-server:2.1.4 to production', resource: 'api-server', namespace: 'production', clusterId: 'c2', timestamp: '2026-03-18T09:15:00Z', actor: 'ci-bot' },
  { id: 'a2', type: 'Alert', message: 'Pod worker-5b7c8d restarted 7 times', resource: 'worker-5b7c8d', namespace: 'production', clusterId: 'c2', timestamp: '2026-03-18T08:50:00Z', actor: 'system' },
  { id: 'a3', type: 'Scan', message: 'Security scan completed — 3 new findings', resource: 'prod-us-east', namespace: '-', clusterId: 'c1', timestamp: '2026-03-18T07:00:00Z', actor: 'scanner' },
  { id: 'a4', type: 'Scale', message: 'Scaled frontend deployment from 3 to 5 replicas', resource: 'frontend', namespace: 'production', clusterId: 'c2', timestamp: '2026-03-17T18:30:00Z', actor: 'hpa-controller' },
  { id: 'a5', type: 'Policy', message: 'Policy "no-privileged-containers" enforced', resource: 'prod-us-east', namespace: '-', clusterId: 'c1', timestamp: '2026-03-17T14:00:00Z', actor: 'policy-engine' },
  { id: 'a6', type: 'Deploy', message: 'Deployed redis:7.2 to default namespace', resource: 'redis-master', namespace: 'default', clusterId: 'c1', timestamp: '2026-03-17T11:45:00Z', actor: 'devops-team' },
  { id: 'a7', type: 'Restart', message: 'Restarted coredns pods after config update', resource: 'coredns', namespace: 'kube-system', clusterId: 'c1', timestamp: '2026-03-17T10:20:00Z', actor: 'admin' },
  { id: 'a8', type: 'Alert', message: 'CPU usage exceeded 80% threshold in production ns', resource: 'production', namespace: 'production', clusterId: 'c2', timestamp: '2026-03-17T09:00:00Z', actor: 'system' },
  { id: 'a9', type: 'Scan', message: 'Image scan: worker:1.9.2 has 2 critical CVEs', resource: 'worker-5b7c8d', namespace: 'production', clusterId: 'c2', timestamp: '2026-03-16T22:00:00Z', actor: 'scanner' },
  { id: 'a10', type: 'Policy', message: 'New policy "require-resource-limits" created', resource: '-', namespace: '-', clusterId: 'c1', timestamp: '2026-03-16T15:30:00Z', actor: 'security-team' },
];

// ─── Policies ─────────────────────────────────────────────────────────────────

export interface Policy {
  id: string;
  name: string;
  description: string;
  category: 'Security' | 'Compliance' | 'Best Practice' | 'Custom';
  enforcement: 'Enforce' | 'Audit' | 'Disabled';
  violations: number;
  scope: string;
  createdAt: string;
}

export const mockPolicies: Policy[] = [
  { id: 'pol1', name: 'no-privileged-containers', description: 'Deny containers with privileged security context', category: 'Security', enforcement: 'Enforce', violations: 1, scope: 'All clusters', createdAt: '2026-01-10' },
  { id: 'pol2', name: 'require-resource-limits', description: 'All containers must define CPU and memory limits', category: 'Best Practice', enforcement: 'Audit', violations: 4, scope: 'Production', createdAt: '2026-02-01' },
  { id: 'pol3', name: 'no-latest-image-tag', description: 'Images must use explicit version tags, not :latest', category: 'Security', enforcement: 'Audit', violations: 2, scope: 'All clusters', createdAt: '2026-01-15' },
  { id: 'pol4', name: 'require-network-policy', description: 'Every namespace must have at least one NetworkPolicy', category: 'Compliance', enforcement: 'Enforce', violations: 0, scope: 'All clusters', createdAt: '2026-01-20' },
  { id: 'pol5', name: 'no-root-containers', description: 'Containers must not run as root user (UID 0)', category: 'Security', enforcement: 'Enforce', violations: 1, scope: 'Production', createdAt: '2026-02-15' },
  { id: 'pol6', name: 'restrict-hostpath-volumes', description: 'Deny pods that mount hostPath volumes', category: 'Security', enforcement: 'Enforce', violations: 0, scope: 'All clusters', createdAt: '2026-01-10' },
  { id: 'pol7', name: 'require-pod-disruption-budget', description: 'Deployments with >1 replica must have a PDB', category: 'Best Practice', enforcement: 'Audit', violations: 3, scope: 'Production', createdAt: '2026-03-01' },
  { id: 'pol8', name: 'cis-k8s-benchmark', description: 'CIS Kubernetes Benchmark v1.8 compliance checks', category: 'Compliance', enforcement: 'Audit', violations: 6, scope: 'All clusters', createdAt: '2026-01-05' },
];

// ─── Summary Stats ────────────────────────────────────────────────────────────

export const mockStats = {
  totalClusters: mockClusters.length,
  healthyClusters: mockClusters.filter(c => c.status === 'Running').length,
  totalNamespaces: mockNamespaces.length,
  totalPods: mockPods.length,
  runningPods: mockPods.filter(p => p.status === 'Running').length,
  failedPods: mockPods.filter(p => p.status === 'Failed').length,
  pendingPods: mockPods.filter(p => p.status === 'Pending').length,
  criticalFindings: mockFindings.filter(f => f.severity === 'Critical' && f.status === 'Open').length,
  highFindings: mockFindings.filter(f => f.severity === 'High' && f.status === 'Open').length,
  openFindings: mockFindings.filter(f => f.status === 'Open').length,
  totalPolicies: mockPolicies.length,
  enforcedPolicies: mockPolicies.filter(p => p.enforcement === 'Enforce').length,
  policyViolations: mockPolicies.reduce((sum, p) => sum + p.violations, 0),
};
