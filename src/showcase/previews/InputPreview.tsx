import { Search, KeyRound } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Control height (28px sm, 32px md, 36px lg).',
  },
  {
    name: 'hasError',
    type: 'boolean',
    default: 'false',
    description: 'Activates danger border and focus-ring indicator.',
  },
  {
    name: 'leftElement',
    type: 'React.ReactNode',
    default: '-',
    description: 'Element (icon, label) pinned to the left edge.',
  },
  {
    name: 'rightElement',
    type: 'React.ReactNode',
    default: '-',
    description: 'Element (icon, clear button) pinned to the right edge.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Standard disabled state.',
  },
]

const usageCode = `import { Input } from '@/components/ui/Input'
import { Search } from 'lucide-react'

export function Example() {
  return (
    <Input
      size="md"
      placeholder="Search records..."
      leftElement={<Search className="h-3.5 w-3.5" />}
    />
  )
}`

export function InputPreview() {
  return (
    <ComponentDoc
      title="Input"
      description="Single-line text input control. Token-bound surface, 1px border-strong, clear focus ring, optional icon slots."
      componentPath="src/components/ui/Input"
      propsSpec={propsSpec}
      usageCode={usageCode}
    >
      {/* 1. Sizes */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          Sizes
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input size="sm" placeholder="Small (28px)" />
          <Input size="md" placeholder="Medium (32px)" />
          <Input size="lg" placeholder="Large (36px)" />
        </div>
      </div>

      {/* 2. With Icons */}
      <div className="space-y-2 pt-2 border-t border-[var(--border)]">
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          With Left & Right Elements
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder="Search API endpoints..."
            leftElement={<Search className="h-3.5 w-3.5" />}
          />
          <Input
            placeholder="API Access Token"
            leftElement={<KeyRound className="h-3.5 w-3.5" />}
            rightElement={
              <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--surface-raised)] px-1.5 py-0.5 rounded-[var(--radius-xs)] border border-[var(--border)]">
                CMD+K
              </span>
            }
          />
        </div>
      </div>

      {/* 3. States */}
      <div className="space-y-2 pt-2 border-t border-[var(--border)]">
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          States (Default &bull; Error &bull; Disabled)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input placeholder="Default state" />
          <Input hasError defaultValue="invalid_token_format" />
          <Input disabled defaultValue="read-only-environment" />
        </div>
      </div>
    </ComponentDoc>
  )
}
