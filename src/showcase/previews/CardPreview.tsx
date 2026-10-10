import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'Card',
    type: 'React.HTMLAttributes<HTMLDivElement>',
    default: '-',
    description: 'Flat container with 1px hairline border, surface background, no drop-shadow.',
  },
  {
    name: 'CardHeader',
    type: 'React.HTMLAttributes<HTMLDivElement>',
    default: '-',
    description: 'Header section with dense padding and border-bottom separator.',
  },
  {
    name: 'CardTitle',
    type: 'React.HTMLAttributes<HTMLHeadingElement>',
    default: '-',
    description: 'Title heading (text-xs/sm, font-semibold, tight tracking).',
  },
  {
    name: 'CardDescription',
    type: 'React.HTMLAttributes<HTMLParagraphElement>',
    default: '-',
    description: 'Secondary metadata / description text in text-secondary.',
  },
  {
    name: 'CardContent',
    type: 'React.HTMLAttributes<HTMLDivElement>',
    default: '-',
    description: 'Main body section with compact padding.',
  },
  {
    name: 'CardFooter',
    type: 'React.HTMLAttributes<HTMLDivElement>',
    default: '-',
    description: 'Footer section with border-top separator and action slot.',
  },
]

const usageCode = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cloudflare Worker Status</CardTitle>
        <CardDescription>Edge deployment statistics and request count.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="font-mono text-xs">Requests: 1,482,901</div>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="secondary">View Logs</Button>
      </CardFooter>
    </Card>
  )
}`

const cardToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'examples', label: 'Modular Card Examples' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function CardPreview() {
  return (
    <ComponentDoc
      title="Card"
      description="Flat structural surface. Strictly 1px hairline border, 2-4px radius, NO drop shadows. Designed for dense information hierarchy."
      componentPath="src/components/ui/Card"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={cardToc}
    >
      <div id="examples" className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-mt-24">
        {/* Sample 1: Service Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Edge Worker: auth-gateway</CardTitle>
              <Badge variant="success" dot size="sm">
                Active
              </Badge>
            </div>
            <CardDescription>
              Deployed to 310 data centers across the Cloudflare edge network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2.5 bg-[var(--surface-raised)] border border-[var(--border)] rounded-[var(--radius-xs)]">
                <span className="text-[var(--text-secondary)] block text-[11px] font-medium">
                  CPU TIME
                </span>
                <span className="text-[var(--text)] font-bold text-sm">1.82 ms</span>
              </div>
              <div className="p-2.5 bg-[var(--surface-raised)] border border-[var(--border)] rounded-[var(--radius-xs)]">
                <span className="text-[var(--text-secondary)] block text-[11px] font-medium">
                  P99 LATENCY
                </span>
                <span className="text-[var(--text)] font-bold text-sm">24 ms</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Last deployed 12m ago
            </span>
            <div className="flex items-center gap-1.5">
              <Button size="sm" variant="ghost">
                Metrics
              </Button>
              <Button size="sm" variant="secondary">
                Inspect
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Sample 2: Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Bindings</CardTitle>
            <CardDescription>
              Secrets and KV namespace references for production release.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-[var(--border)] text-[11px] font-mono">
              <li className="py-1.5 flex items-center justify-between">
                <span className="text-[var(--text)]">KV_SESSIONS</span>
                <Badge variant="neutral" size="sm">
                  KV_NAMESPACE
                </Badge>
              </li>
              <li className="py-1.5 flex items-center justify-between">
                <span className="text-[var(--text)]">DB_HYPERDRIVE</span>
                <Badge variant="neutral" size="sm">
                  HYPERDRIVE
                </Badge>
              </li>
              <li className="py-1.5 flex items-center justify-between">
                <span className="text-[var(--text)]">JWT_SECRET_KEY</span>
                <Badge variant="outline" size="sm">
                  ENCRYPTED
                </Badge>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <span className="text-[10px] text-[var(--text-muted)]">
              3 active bindings
            </span>
            <Button size="sm" variant="primary">
              Manage Secrets
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ComponentDoc>
  )
}
