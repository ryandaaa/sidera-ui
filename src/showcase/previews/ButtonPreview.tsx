import * as React from 'react'
import { Plus, Trash2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'ghost' | 'danger'",
    default: "'primary'",
    description: 'Visual priority and intent style ladder.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'",
    default: "'md'",
    description: 'Control height and padding (token-driven: 28/32/36px).',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    default: 'false',
    description: 'Renders loading spinner and sets aria-busy / disabled state.',
  },
  {
    name: 'leftIcon',
    type: 'React.ReactNode',
    default: '-',
    description: 'Icon element rendered before button content.',
  },
  {
    name: 'rightIcon',
    type: 'React.ReactNode',
    default: '-',
    description: 'Icon element rendered after button content.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Standard HTML disabled state (45% opacity, non-interactive).',
  },
]

const usageCode = `import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="primary">Deploy Worker</Button>
      <Button variant="secondary" rightIcon={<ArrowRight className="h-3 w-3" />}>
        Documentation
      </Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">Terminate</Button>
    </div>
  )
}`

export function ButtonPreview() {
  const [loading, setLoading] = React.useState(false)

  return (
    <ComponentDoc
      title="Button"
      description="Fundamental action control. Inversion-based contrast emphasis, strict 2-4px radius, compact token heights."
      componentPath="src/components/ui/Button"
      propsSpec={propsSpec}
      usageCode={usageCode}
    >
      {/* 1. Variants */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          Variants
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="ghost">Ghost Action</Button>
          <Button variant="danger">Danger Action</Button>
        </div>
      </div>

      {/* 2. Sizes */}
      <div className="space-y-2 pt-2 border-t border-[var(--border)]">
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          Sizes (sm: 28px &bull; md: 32px &bull; lg: 36px)
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Small (28px)</Button>
          <Button size="md">Medium (32px)</Button>
          <Button size="lg">Large (36px)</Button>
        </div>
      </div>

      {/* 3. Icons & Icon-Only */}
      <div className="space-y-2 pt-2 border-t border-[var(--border)]">
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          Icons & Square Icon-Only
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Plus className="h-3 w-3" />}
          >
            Create Issue
          </Button>
          <Button
            variant="secondary"
            size="md"
            rightIcon={<ArrowRight className="h-3 w-3" />}
          >
            Next Step
          </Button>
          <Button
            variant="secondary"
            size="icon-sm"
            aria-label="Add entry"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="secondary"
            size="icon-md"
            aria-label="Delete entry"
          >
            <Trash2 className="h-3.5 w-3.5 text-[var(--danger)]" />
          </Button>
        </div>
      </div>

      {/* 4. States */}
      <div className="space-y-2 pt-2 border-t border-[var(--border)]">
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          States (Default &bull; Disabled &bull; Interactive Loading)
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" disabled>
            Primary Disabled
          </Button>
          <Button variant="secondary" disabled>
            Secondary Disabled
          </Button>
          <Button
            variant="secondary"
            isLoading={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 1200)
            }}
          >
            {loading ? 'Processing...' : 'Click To Load'}
          </Button>
        </div>
      </div>
    </ComponentDoc>
  )
}
