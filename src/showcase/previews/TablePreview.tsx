import * as React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'dense',
    type: 'boolean',
    default: 'true',
    description: 'Enables high-density 12px font scale and compact padding.',
  },
  {
    name: 'stickyHeader',
    type: 'boolean',
    default: 'false',
    description: 'Enables vertical scroll container with pinned header.',
  },
  {
    name: 'sortable',
    type: 'boolean',
    default: 'false',
    description: 'Displays sort direction arrows and trigger button on TableHead.',
  },
  {
    name: 'numeric',
    type: 'boolean',
    default: 'false',
    description: 'Right-aligns cell content and applies monospace tabular numbers.',
  },
]

const usageCode = `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'

export function Example() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deployment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead numeric>Latency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell mono>prod-worker-01</TableCell>
          <TableCell>Ready</TableCell>
          <TableCell numeric>14ms</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`

const tableToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'dense-table', label: 'Dense Tabular Records' },
  { id: 'sticky-table', label: 'Sticky Header' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

interface WorkerDeployment {
  id: string
  branch: string
  status: 'ready' | 'building' | 'failed'
  requests: string
  latency: string
  updated: string
}

const mockDeployments: WorkerDeployment[] = [
  { id: 'cf-app-83f1', branch: 'main', status: 'ready', requests: '1,429,081', latency: '12ms', updated: '2m ago' },
  { id: 'cf-app-18b4', branch: 'feat/tokens', status: 'ready', requests: '41,200', latency: '14ms', updated: '15m ago' },
  { id: 'cf-app-99c0', branch: 'fix/scroll', status: 'failed', requests: '102', latency: '89ms', updated: '1h ago' },
  { id: 'cf-app-33a7', branch: 'feat/radix', status: 'building', requests: '-', latency: '-', updated: 'Just now' },
  { id: 'cf-app-77d2', branch: 'v1.4.0', status: 'ready', requests: '8,920,441', latency: '11ms', updated: '2d ago' },
]

export function TablePreview() {
  const [sortCol, setSortCol] = React.useState<string>('id')
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc')

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCol(col)
      setSortDir('asc')
    }
  }

  return (
    <ComponentDoc
      title="Table"
      description="Data table with edge-to-edge hairlines, tabular monospace numbers, sortable header triggers, and optional sticky column pinning."
      componentPath="src/components/ui/Table"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={tableToc}
    >
      {/* 1. Dense Tabular Records */}
      <div id="dense-table" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Edge Worker Deployments
        </span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                sortable
                sortDirection={sortCol === 'id' ? sortDir : false}
                onSort={() => handleSort('id')}
              >
                Deployment ID
              </TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead
                numeric
                sortable
                sortDirection={sortCol === 'requests' ? sortDir : false}
                onSort={() => handleSort('requests')}
              >
                Total Req
              </TableHead>
              <TableHead numeric>P95 Latency</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDeployments.map((d) => (
              <TableRow key={d.id}>
                <TableCell mono className="font-semibold">{d.id}</TableCell>
                <TableCell mono className="text-[var(--text-secondary)]">{d.branch}</TableCell>
                <TableCell>
                  <Badge
                    size="sm"
                    variant={d.status === 'ready' ? 'success' : d.status === 'failed' ? 'danger' : 'warning'}
                    dot
                  >
                    {d.status}
                  </Badge>
                </TableCell>
                <TableCell numeric>{d.requests}</TableCell>
                <TableCell numeric>{d.latency}</TableCell>
                <TableCell className="text-[var(--text-muted)] font-mono text-[11px]">{d.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 2. Sticky Table */}
      <div id="sticky-table" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Sticky Header View
        </span>
        <Table stickyHeader>
          <TableHeader sticky>
            <TableRow>
              <TableHead>Shard</TableHead>
              <TableHead>Status</TableHead>
              <TableHead numeric>CPU Usage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 12 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell mono>shard-0{i + 1}.edge.internal</TableCell>
                <TableCell>Active</TableCell>
                <TableCell numeric>{(12 + i * 4.2).toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ComponentDoc>
  )
}
