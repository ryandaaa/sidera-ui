import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/Tooltip'
import { Button } from '@/components/ui/Button'
import { Terminal, Database } from 'lucide-react'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'sideOffset',
    type: 'number',
    default: '4',
    description: 'Distance in pixels between trigger element and tooltip.',
  },
  {
    name: 'side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'top'",
    description: 'Preferred placement edge relative to trigger.',
  },
]

const usageCode = `import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/Tooltip'

export function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Deploy</Button>
        </TooltipTrigger>
        <TooltipContent>
          Push commit to cloudflare edge
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`

const tooltipToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'interactive', label: 'Interactive Tooltips' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function TooltipPreview() {
  return (
    <ComponentDoc
      title="Tooltip"
      description="Radix UI primitive wrapper for rich contextual hover hints. Dense monospace label, hairline border, keyboard-accessible with ESC dismiss."
      componentPath="src/components/ui/Tooltip"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={tooltipToc}
    >
      <div id="interactive" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Hover or Focus Triggers
        </span>
        <TooltipProvider delayDuration={150}>
          <div className="flex flex-wrap items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" leftIcon={<Terminal className="h-3.5 w-3.5" />}>
                  Tail Logs
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Stream real-time isolate stdout / stderr
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" leftIcon={<Database className="h-3.5 w-3.5" />}>
                  D1 Database
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Serverless SQLite relational binding
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </ComponentDoc>
  )
}
