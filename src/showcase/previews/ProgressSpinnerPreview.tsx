import * as React from 'react'
import { Progress } from '@/components/ui/Progress'
import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'Progress.value',
    type: 'number',
    default: '0',
    description: 'Current progress value (0 to 100).',
  },
  {
    name: 'Progress.indeterminate',
    type: 'boolean',
    default: 'false',
    description: 'Enables continuous pulse animation for unknown durations.',
  },
  {
    name: 'Spinner.size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Diameter scale of the spinner (14px sm, 16px md, 24px lg).',
  },
]

const usageCode = `import { Progress, Spinner } from '@/components/ui'

// Determinate Progress:
<Progress value={65} />

// Indeterminate Progress:
<Progress indeterminate />

// Monochrome SVG Spinner:
<Spinner size="md" />`

const psToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'progress', label: 'Progress Bars' },
  { id: 'spinners', label: 'Spinners' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function ProgressSpinnerPreview() {
  const [val, setVal] = React.useState(45)

  return (
    <ComponentDoc
      title="Progress & Spinner"
      description="Deterministic and indeterminate visual loading indicators. Strictly monochrome, zero-glow aesthetics."
      componentPath="src/components/ui"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={psToc}
    >
      {/* 1. Progress */}
      <div id="progress" className="space-y-4 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Progress Bar
        </span>
        <div className="space-y-2 max-w-md">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[var(--text-secondary)]">Asset Upload Progress</span>
            <span className="text-[var(--text)] font-semibold">{val}%</span>
          </div>
          <Progress value={val} />
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setVal((v) => Math.max(v - 15, 0))}
            >
              -15%
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setVal((v) => Math.min(v + 15, 100))}
            >
              +15%
            </Button>
          </div>
        </div>

        <div className="space-y-1.5 max-w-md pt-2">
          <span className="text-[11px] font-mono text-[var(--text-muted)]">Indeterminate State</span>
          <Progress indeterminate />
        </div>
      </div>

      {/* 2. Spinners */}
      <div id="spinners" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Spinners
        </span>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs font-mono text-[var(--text-muted)]">sm (14px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Spinner size="md" />
            <span className="text-xs font-mono text-[var(--text-muted)]">md (16px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Spinner size="lg" />
            <span className="text-xs font-mono text-[var(--text-muted)]">lg (24px)</span>
          </div>
        </div>
      </div>
    </ComponentDoc>
  )
}
