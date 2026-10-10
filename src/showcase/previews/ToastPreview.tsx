import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'title',
    type: 'React.ReactNode',
    default: '-',
    description: 'Header text of the toast message.',
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    default: '-',
    description: 'Supporting text describing the completed action.',
  },
  {
    name: 'variant',
    type: "'default' | 'success' | 'danger' | 'warning'",
    default: "'default'",
    description: 'Status accent border and icon indicator.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '4000',
    description: 'Auto-dismiss timeout in milliseconds (0 for persistent).',
  },
]

const usageCode = `import { ToastProvider, useToast } from '@/components/ui/Toast'

export function ActionButton() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() =>
        toast({
          title: 'Config Saved',
          description: 'Production routing changes updated.',
          variant: 'success',
        })
      }
    >
      Save
    </Button>
  )
}`

const toastToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'interactive', label: 'Trigger Notifications' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function ToastPreview() {
  const { toast } = useToast()

  return (
    <ComponentDoc
      title="Toast"
      description="Non-intrusive floating feedback messages triggered imperatively via `useToast()`. Stacked neatly at the bottom-right viewport edge."
      componentPath="src/components/ui/Toast"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={toastToc}
    >
      <div id="interactive" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Trigger Notifications
        </span>
        <div className="flex flex-wrap gap-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Build Succeeded',
                description: 'Static assets uploaded to Cloudflare Workers.',
                variant: 'success',
              })
            }
          >
            Trigger Success Toast
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Deployment Failed',
                description: 'Syntax error detected in wrangler configuration.',
                variant: 'danger',
              })
            }
          >
            Trigger Danger Toast
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              toast({
                title: 'New Event Received',
                description: 'WebSocket connection re-established with primary shard.',
                variant: 'default',
              })
            }
          >
            Trigger Default Toast
          </Button>
        </div>
      </div>
    </ComponentDoc>
  )
}
