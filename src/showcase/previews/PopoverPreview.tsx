import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Field } from '@/components/ui/Field'
import { Settings2 } from 'lucide-react'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: 'Alignment along the trigger boundary.',
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: '4',
    description: 'Offset gap from trigger button.',
  },
]

const usageCode = `import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Filter Options</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-xs">Filter parameters</p>
      </PopoverContent>
    </Popover>
  )
}`

const popoverToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'interactive', label: 'Interactive Popover' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function PopoverPreview() {
  return (
    <ComponentDoc
      title="Popover"
      description="Radix UI primitive for arbitrary floating content (filters, mini forms, picker widgets). Floating layer elevation with hairline border."
      componentPath="src/components/ui/Popover"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={popoverToc}
    >
      <div id="interactive" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Configuration Flyout
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="secondary" leftIcon={<Settings2 className="h-3.5 w-3.5" />}>
              Concurrency Limits
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="space-y-3">
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-[var(--text)]">Max Burst Requests</h4>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Tune the rate limiting window per unique client IP address.
              </p>
            </div>
            <Field label="Burst Limit (req/sec)">
              <Input size="sm" defaultValue="120" />
            </Field>
            <Button size="sm" variant="primary" className="w-full">
              Apply Limit
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </ComponentDoc>
  )
}
