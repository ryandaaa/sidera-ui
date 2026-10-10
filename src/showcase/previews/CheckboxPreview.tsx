import * as React from 'react'
import { Checkbox } from '@/components/ui/Checkbox'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'checked',
    type: 'boolean',
    default: 'false',
    description: 'Whether the checkbox is selected.',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    default: 'false',
    description: 'Displays a minus icon representing a mixed child state.',
  },
  {
    name: 'onCheckedChange',
    type: '(checked: boolean) => void',
    default: '-',
    description: 'Callback when checked state toggles.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Box dimension scale (14px sm, 16px md, 20px lg).',
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    default: '-',
    description: 'Primary text label displayed next to the box.',
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    default: '-',
    description: 'Secondary muted helper description.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction.',
  },
]

const usageCode = `import { Checkbox } from '@/components/ui/Checkbox'

export function Example() {
  const [checked, setChecked] = useState(true)

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      label="Enable Strict Mode"
      description="Halts build immediately on type or lint violations."
    />
  )
}`

const checkboxToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'interactive', label: 'Interactive Demo' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'states', label: 'States (Indeterminate & Disabled)' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function CheckboxPreview() {
  const [val1, setVal1] = React.useState(true)
  const [val2, setVal2] = React.useState(false)

  return (
    <ComponentDoc
      title="Checkbox"
      description="Accessible binary selection control. Inverted primary fill on checked, crisp hairline border on unchecked, supports mixed/indeterminate state."
      componentPath="src/components/ui/Checkbox"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={checkboxToc}
    >
      {/* 1. Interactive Demo */}
      <div id="interactive" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Interactive Options
        </span>
        <div className="flex flex-col gap-3">
          <Checkbox
            checked={val1}
            onCheckedChange={setVal1}
            label="Automatic Production Deployments"
            description="Trigger Cloudflare Worker asset sync on every push to main."
          />
          <Checkbox
            checked={val2}
            onCheckedChange={setVal2}
            label="Require Pull Request Approval"
            description="Block merging unless at least one review has passed."
          />
        </div>
      </div>

      {/* 2. Sizes */}
      <div id="sizes" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Sizes
        </span>
        <div className="flex flex-col gap-3">
          <Checkbox size="sm" checked label="Small Checkbox (14px)" />
          <Checkbox size="md" checked label="Medium Checkbox (16px, default)" />
          <Checkbox size="lg" checked label="Large Checkbox (20px)" />
        </div>
      </div>

      {/* 3. States */}
      <div id="states" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Special States
        </span>
        <div className="flex flex-col gap-3">
          <Checkbox
            indeterminate
            label="Indeterminate / Mixed"
            description="Indicates partial selection across child tree items."
          />
          <Checkbox
            disabled
            checked
            label="Disabled & Checked"
          />
          <Checkbox
            disabled
            label="Disabled & Unchecked"
          />
        </div>
      </div>
    </ComponentDoc>
  )
}
