import { Stack } from '@/components/ui/Stack'
import { Inline } from '@/components/ui/Inline'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { Plus, Download } from 'lucide-react'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'Stack.gap',
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Vertical spacing between stack children.',
  },
  {
    name: 'Stack.divider',
    type: 'boolean',
    default: 'false',
    description: 'Inserts hairline dividers between children.',
  },
  {
    name: 'Inline.gap',
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'sm'",
    description: 'Horizontal spacing between inline items.',
  },
  {
    name: 'Container.size',
    type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
    default: "'xl'",
    description: 'Max width constraining container.',
  },
  {
    name: 'PageHeader',
    type: 'title, description, badge, actions, breadcrumbs',
    default: '-',
    description: 'Top page landmark header block.',
  },
]

const usageCode = `import { Stack, Inline, Container, PageHeader, Button } from '@/components/ui'

export function Page() {
  return (
    <Container size="lg">
      <PageHeader
        title="Edge Deployments"
        description="Active Cloudflare Worker isolates serving live traffic."
        actions={<Button size="sm">Create Deployment</Button>}
      />
      <Stack gap="md">
        <Inline gap="sm">
          <Button variant="secondary" size="sm">Filter</Button>
          <Button variant="ghost" size="sm">Export</Button>
        </Inline>
      </Stack>
    </Container>
  )
}`

const layoutToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'page-header', label: 'Page Header' },
  { id: 'stack', label: 'Vertical Stack with Dividers' },
  { id: 'inline', label: 'Horizontal Inline Controls' },
  { id: 'container', label: 'Container Bounds' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function LayoutPreview() {
  return (
    <ComponentDoc
      title="Layout Primitives"
      description="Foundational structure building blocks (Stack, Inline, Container, PageHeader) ensuring consistent rhythm, responsive gutters, and zero layout drift."
      componentPath="src/components/ui"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={layoutToc}
    >
      {/* 1. Page Header */}
      <div id="page-header" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Page Header
        </span>
        <div className="p-4 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)]">
          <PageHeader
            title="Database Shards"
            description="Global geo-replicated read replicas synchronized with primary SQLite cluster in Frankfurt."
            badge={<Badge size="sm" variant="success" dot>Synchronized</Badge>}
            actions={
              <Inline gap="xs">
                <Button size="sm" variant="secondary" leftIcon={<Download className="h-3.5 w-3.5" />}>
                  Backup
                </Button>
                <Button size="sm" variant="primary" leftIcon={<Plus className="h-3.5 w-3.5" />}>
                  Create Replica
                </Button>
              </Inline>
            }
          />
        </div>
      </div>

      {/* 2. Stack with Dividers */}
      <div id="stack" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Stack with Dividers
        </span>
        <Card>
          <CardContent className="p-0">
            <Stack gap="none" divider>
              <div className="p-3 text-xs flex justify-between">
                <span className="font-mono text-[var(--text)]">shard-fra-01</span>
                <span className="font-mono text-[var(--text-secondary)]">0.4% CPU</span>
              </div>
              <div className="p-3 text-xs flex justify-between">
                <span className="font-mono text-[var(--text)]">shard-sin-01</span>
                <span className="font-mono text-[var(--text-secondary)]">1.2% CPU</span>
              </div>
              <div className="p-3 text-xs flex justify-between">
                <span className="font-mono text-[var(--text)]">shard-iad-01</span>
                <span className="font-mono text-[var(--text-secondary)]">0.8% CPU</span>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </div>

      {/* 3. Inline */}
      <div id="inline" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Inline Flex Row
        </span>
        <Inline gap="xs" wrap>
          <Badge size="sm" variant="outline">us-east-1</Badge>
          <Badge size="sm" variant="outline">eu-central-1</Badge>
          <Badge size="sm" variant="outline">ap-southeast-1</Badge>
          <Badge size="sm" variant="outline">sa-east-1</Badge>
          <Badge size="sm" variant="outline">me-south-1</Badge>
        </Inline>
      </div>

      {/* 4. Container */}
      <div id="container" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Container Bounds
        </span>
        <Container size="sm" className="p-4 rounded-[var(--radius-sm)] border border-dashed border-[var(--border-strong)] bg-[var(--surface)] text-center text-xs text-[var(--text-secondary)]">
          Constrained within <span className="font-mono text-[var(--text)]">Container size=&quot;sm&quot;</span> (max-w-screen-sm)
        </Container>
      </div>
    </ComponentDoc>
  )
}
