import { Badge } from '@/components/ui/Badge'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'variant',
    type: "'neutral' | 'outline' | 'success' | 'warning' | 'danger' | 'info'",
    default: "'neutral'",
    description: 'Semantic status role. Muted and low-saturation.',
  },
  {
    name: 'size',
    type: "'sm' | 'md'",
    default: "'md'",
    description: 'Compact height (16px sm, 20px md).',
  },
  {
    name: 'shape',
    type: "'rounded' | 'pill'",
    default: "'rounded'",
    description: 'Border radius style (rounded: 2px, pill: 9999px).',
  },
  {
    name: 'dot',
    type: 'boolean',
    default: 'false',
    description: 'Renders a live status dot before the text label.',
  },
]

const usageCode = `import { Badge } from '@/components/ui/Badge'

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="success" dot>Operational</Badge>
      <Badge variant="warning">Maintenance</Badge>
      <Badge variant="danger" dot>Degraded</Badge>
      <Badge variant="neutral">v1.4.2</Badge>
    </div>
  )
}`

export function BadgePreview() {
  return (
    <ComponentDoc
      title="Badge"
      description="Status indicator pill. Utilitarian, low-saturation colors reserved strictly for status communication, never for decoration."
      componentPath="src/components/ui/Badge"
      propsSpec={propsSpec}
      usageCode={usageCode}
    >
      {/* 1. Variants */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          Semantic Status Variants
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">Neutral (Default)</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      {/* 2. With Status Dot */}
      <div className="space-y-2 pt-2 border-t border-[var(--border)]">
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          With Status Dot Indicator
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" dot>
            Healthy (99.98%)
          </Badge>
          <Badge variant="warning" dot>
            High Latency
          </Badge>
          <Badge variant="danger" dot>
            Unreachable
          </Badge>
          <Badge variant="info" dot>
            Syncing
          </Badge>
          <Badge variant="neutral" dot>
            Standby
          </Badge>
        </div>
      </div>

      {/* 3. Sizes & Shapes */}
      <div className="space-y-2 pt-2 border-t border-[var(--border)]">
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          Sizes & Shapes (Rectangular Restrained vs Pill)
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm" variant="neutral">
            SM (16px)
          </Badge>
          <Badge size="md" variant="neutral">
            MD (20px)
          </Badge>
          <Badge size="sm" shape="pill" variant="success" dot>
            Pill SM
          </Badge>
          <Badge size="md" shape="pill" variant="success" dot>
            Pill MD
          </Badge>
        </div>
      </div>
    </ComponentDoc>
  )
}
