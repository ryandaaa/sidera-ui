import * as React from 'react'
import { RadioGroup, RadioItem } from '@/components/ui/Radio'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'value',
    type: 'string',
    default: '-',
    description: 'Controlled value of selected radio item.',
  },
  {
    name: 'defaultValue',
    type: 'string',
    default: '-',
    description: 'Default value for uncontrolled usage.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    default: '-',
    description: 'Triggered when a different radio item is picked.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Circle diameter scale (14px sm, 16px md, 20px lg).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables entire radio group or individual item.',
  },
]

const usageCode = `import { RadioGroup, RadioItem } from '@/components/ui/Radio'

export function Example() {
  const [tier, setTier] = useState('pro')

  return (
    <RadioGroup value={tier} onValueChange={setTier}>
      <RadioItem value="hobby" label="Hobby" description="Free tier for personal experiments." />
      <RadioItem value="pro" label="Pro" description="Unlimited bandwidth and custom domains." />
      <RadioItem value="enterprise" label="Enterprise" description="Dedicated SLA and SOC2 compliance." />
    </RadioGroup>
  )
}`

const radioToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'interactive', label: 'Interactive Group' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'disabled', label: 'Disabled Items' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function RadioPreview() {
  const [selected, setSelected] = React.useState('production')

  return (
    <ComponentDoc
      title="Radio"
      description="Mutually exclusive single-choice option group. High contrast bullet indicator with full keyboard navigation and accessible roles."
      componentPath="src/components/ui/Radio"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={radioToc}
    >
      {/* 1. Interactive Demo */}
      <div id="interactive" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Target Environment
        </span>
        <RadioGroup value={selected} onValueChange={setSelected}>
          <RadioItem
            value="preview"
            label="Ephemeral Preview"
            description="Created per pull request branch, torn down after merge."
          />
          <RadioItem
            value="staging"
            label="Staging Replica"
            description="Mirrors production data schema for regression validation."
          />
          <RadioItem
            value="production"
            label="Live Production"
            description="Direct traffic served by Cloudflare global edge network."
          />
        </RadioGroup>
      </div>

      {/* 2. Sizes */}
      <div id="sizes" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Sizes
        </span>
        <div className="flex flex-col gap-3">
          <RadioGroup defaultValue="1" size="sm">
            <RadioItem value="1" label="Small Radio (14px)" />
          </RadioGroup>
          <RadioGroup defaultValue="2" size="md">
            <RadioItem value="2" label="Medium Radio (16px, default)" />
          </RadioGroup>
          <RadioGroup defaultValue="3" size="lg">
            <RadioItem value="3" label="Large Radio (20px)" />
          </RadioGroup>
        </div>
      </div>

      {/* 3. Disabled */}
      <div id="disabled" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Disabled Options
        </span>
        <RadioGroup defaultValue="dis-1">
          <RadioItem
            value="dis-1"
            disabled
            label="Disabled Selected"
            description="Read-only system role that cannot be altered."
          />
          <RadioItem
            value="dis-2"
            disabled
            label="Disabled Unselected"
            description="Feature unavailable on your current billing tier."
          />
        </RadioGroup>
      </div>
    </ComponentDoc>
  )
}
