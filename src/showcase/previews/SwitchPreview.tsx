import * as React from 'react'
import { Switch } from '@/components/ui/Switch'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'checked',
    type: 'boolean',
    default: 'false',
    description: 'Controlled active state of the toggle.',
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    default: 'false',
    description: 'Initial state for uncontrolled usage.',
  },
  {
    name: 'onCheckedChange',
    type: '(checked: boolean) => void',
    default: '-',
    description: 'Callback executed whenever toggle state flips.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Track dimension scale (sm: 28px, md: 36px, lg: 44px length).',
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    default: '-',
    description: 'Primary text label displayed beside toggle.',
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
    description: 'Prevents user interaction.',
  },
]

const usageCode = `import { Switch } from '@/components/ui/Switch'

export function Example() {
  const [maintenance, setMaintenance] = useState(false)

  return (
    <Switch
      checked={maintenance}
      onCheckedChange={setMaintenance}
      label="Maintenance Mode"
      description="Returns HTTP 503 to all incoming public requests."
    />
  )
}`

const switchToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'interactive', label: 'Interactive Demos' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'disabled', label: 'Disabled State' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function SwitchPreview() {
  const [sw1, setSw1] = React.useState(true)
  const [sw2, setSw2] = React.useState(false)

  return (
    <ComponentDoc
      title="Switch"
      description="Immediate toggle control for binary operational settings. Zero-lag physical switch aesthetic with inverted tokens."
      componentPath="src/components/ui/Switch"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={switchToc}
    >
      {/* 1. Interactive Demo */}
      <div id="interactive" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Settings & Feature Flags
        </span>
        <div className="flex flex-col gap-3">
          <Switch
            checked={sw1}
            onCheckedChange={setSw1}
            label="Real-time Webhook Streaming"
            description="Push raw JSON events to configured external receiver endpoints."
          />
          <Switch
            checked={sw2}
            onCheckedChange={setSw2}
            label="Aggressive Edge Caching"
            description="Cache dynamic query responses at CDN edge for 300 seconds."
          />
        </div>
      </div>

      {/* 2. Sizes */}
      <div id="sizes" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Sizes
        </span>
        <div className="flex flex-col gap-3">
          <Switch size="sm" defaultChecked label="Small Switch (16px track)" />
          <Switch size="md" defaultChecked label="Medium Switch (20px track, default)" />
          <Switch size="lg" defaultChecked label="Large Switch (24px track)" />
        </div>
      </div>

      {/* 3. Disabled */}
      <div id="disabled" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Disabled State
        </span>
        <div className="flex flex-col gap-3">
          <Switch
            disabled
            defaultChecked
            label="Locked In Active State"
            description="This policy is mandated by organization-level compliance."
          />
          <Switch
            disabled
            defaultChecked={false}
            label="Locked In Inactive State"
            description="Requires enterprise subscription to toggle."
          />
        </div>
      </div>
    </ComponentDoc>
  )
}
