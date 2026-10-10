import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/Tabs'
import { Card, CardContent } from '@/components/ui/Card'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'defaultValue',
    type: 'string',
    default: '-',
    description: 'Initial active tab key.',
  },
  {
    name: 'TabsList.variant',
    type: "'pills' | 'line'",
    default: "'pills'",
    description: 'Visual treatment: enclosed compact pill strip or underline indicator.',
  },
  {
    name: 'TabsTrigger.variant',
    type: "'pills' | 'line'",
    default: "'pills'",
    description: 'Tab button style matching the parent list.',
  },
]

const usageCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

export function Example() {
  return (
    <Tabs defaultValue="build">
      <TabsList variant="pills">
        <TabsTrigger value="build">Build Logs</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
      </TabsList>
      <TabsContent value="build">
        <p className="text-xs">Build output log...</p>
      </TabsContent>
      <TabsContent value="metrics">
        <p className="text-xs">Metrics graph...</p>
      </TabsContent>
    </Tabs>
  )
}`

const tabsToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'pills', label: 'Pill Tabs (Default)' },
  { id: 'line', label: 'Line / Underline Tabs' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function TabsPreview() {
  return (
    <ComponentDoc
      title="Tabs"
      description="Radix UI primitive for organizing related content across multiple pane views. Includes compact pills and border-line indicator modes."
      componentPath="src/components/ui/Tabs"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={tabsToc}
    >
      {/* 1. Pill Tabs */}
      <div id="pills" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Pill Tabs
        </span>
        <Tabs defaultValue="deployments" className="w-full">
          <TabsList variant="pills">
            <TabsTrigger variant="pills" value="deployments">Deployments</TabsTrigger>
            <TabsTrigger variant="pills" value="routes">Routes (3)</TabsTrigger>
            <TabsTrigger variant="pills" value="variables">Env Vars</TabsTrigger>
            <TabsTrigger variant="pills" value="settings" disabled>Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="deployments">
            <Card>
              <CardContent className="p-4 text-xs text-[var(--text-secondary)]">
                Active revision: <span className="font-mono text-[var(--text)]">cf-worker-99a2</span> (production). Ready and accepting traffic.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="routes">
            <Card>
              <CardContent className="p-4 text-xs text-[var(--text-secondary)]">
                Configured zone patterns: <span className="font-mono text-[var(--text)]">api.example.com/*</span>, <span className="font-mono text-[var(--text)]">*.pages.dev/*</span>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="variables">
            <Card>
              <CardContent className="p-4 text-xs text-[var(--text-secondary)]">
                12 environment variables encrypted in Cloudflare Key Management Service.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 2. Line Tabs */}
      <div id="line" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Line Tabs
        </span>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList variant="line">
            <TabsTrigger variant="line" value="overview">Overview</TabsTrigger>
            <TabsTrigger variant="line" value="analytics">Analytics</TabsTrigger>
            <TabsTrigger variant="line" value="logs">Real-time Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-xs text-[var(--text-secondary)] pt-2">
              Edge runtime overview with request volume and global CPU execution time.
            </p>
          </TabsContent>
          <TabsContent value="analytics">
            <p className="text-xs text-[var(--text-secondary)] pt-2">
              P50, P90, and P99 latency percentiles aggregated across edge regions.
            </p>
          </TabsContent>
          <TabsContent value="logs">
            <p className="text-xs text-[var(--text-secondary)] pt-2">
              Connected to real-time log tail isolate.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </ComponentDoc>
  )
}
