import { Avatar } from '@/components/ui/Avatar'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'src',
    type: 'string',
    default: '-',
    description: 'Image URL. Renders initials fallback on load failure.',
  },
  {
    name: 'fallback',
    type: 'string',
    default: '-',
    description: 'Monospace initials fallback text.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Avatar dimension (24px sm, 32px md, 40px lg).',
  },
  {
    name: 'shape',
    type: "'square' | 'circle'",
    default: "'square'",
    description: 'Utilitarian square with radius-xs or traditional circle.',
  },
  {
    name: 'status',
    type: "'online' | 'offline' | 'busy' | 'away'",
    default: '-',
    description: 'Status indicator badge positioned at bottom-right.',
  },
]

const usageCode = `import { Avatar } from '@/components/ui/Avatar'

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <Avatar fallback="CF" status="online" />
      <Avatar fallback="GH" size="lg" shape="circle" />
    </div>
  )
}`

const avatarToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'shapes-sizes', label: 'Shapes & Sizes' },
  { id: 'statuses', label: 'Status Indicators' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function AvatarPreview() {
  return (
    <ComponentDoc
      title="Avatar"
      description="Dense user or service identity element with uppercase initials fallback and optional status dot. Defaulted to square shape for utilitarian aesthetics."
      componentPath="src/components/ui/Avatar"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={avatarToc}
    >
      {/* 1. Shapes & Sizes */}
      <div id="shapes-sizes" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Shapes & Sizes
        </span>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Avatar fallback="SM" size="sm" />
            <Avatar fallback="MD" size="md" />
            <Avatar fallback="LG" size="lg" />
            <span className="text-xs font-mono text-[var(--text-muted)] ml-2">Square (Default)</span>
          </div>

          <div className="flex items-center gap-2">
            <Avatar fallback="SM" size="sm" shape="circle" />
            <Avatar fallback="MD" size="md" shape="circle" />
            <Avatar fallback="LG" size="lg" shape="circle" />
            <span className="text-xs font-mono text-[var(--text-muted)] ml-2">Circle</span>
          </div>
        </div>
      </div>

      {/* 2. Statuses */}
      <div id="statuses" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Presence Indicators
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar fallback="ON" status="online" />
            <span className="text-xs font-mono text-[var(--text-secondary)]">online</span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar fallback="BY" status="busy" />
            <span className="text-xs font-mono text-[var(--text-secondary)]">busy</span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar fallback="AW" status="away" />
            <span className="text-xs font-mono text-[var(--text-secondary)]">away</span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar fallback="OF" status="offline" />
            <span className="text-xs font-mono text-[var(--text-secondary)]">offline</span>
          </div>
        </div>
      </div>
    </ComponentDoc>
  )
}
