import * as React from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Field } from '@/components/ui/Field'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'open',
    type: 'boolean',
    default: '-',
    description: 'Controlled visibility state.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '-',
    description: 'Callback when open state changes.',
  },
  {
    name: 'hideClose',
    type: 'boolean',
    default: 'false',
    description: 'Hides the top-right X dismiss button.',
  },
]

const usageCode = `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deploy Revision</DialogTitle>
          <DialogDescription>
            This action will route live traffic to the latest build isolate.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="primary">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`

const dialogToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'interactive', label: 'Interactive Dialog' },
  { id: 'destructive', label: 'Destructive Confirmation' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function DialogPreview() {
  const [open, setOpen] = React.useState(false)

  return (
    <ComponentDoc
      title="Dialog"
      description="Radix UI primitive modal overlay with background backdrop dimming, automatic keyboard focus trapping, and ESC key cancellation."
      componentPath="src/components/ui/Dialog"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={dialogToc}
    >
      {/* 1. Interactive Form Dialog */}
      <div id="interactive" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Form Modal
        </span>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="secondary">
              Create Environment Variable
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Secret Variable</DialogTitle>
              <DialogDescription>
                Encrypted environment variables are injected into edge isolate runtimes at initialization.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <Field label="Key Name" required>
                <Input placeholder="DATABASE_URL" size="sm" />
              </Field>
              <Field label="Secret Value" required>
                <Input type="password" placeholder="postgres://user:pass@host/db" size="sm" />
              </Field>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button size="sm" variant="ghost">Cancel</Button>
              </DialogClose>
              <Button size="sm" variant="primary" onClick={() => setOpen(false)}>
                Save Variable
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 2. Destructive Dialog */}
      <div id="destructive" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Destructive Confirmation
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="danger">
              Purge Global Cache
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purge Everything?</DialogTitle>
              <DialogDescription>
                This invalidates all cached HTML, JS, and image assets across all regional edge data centers. Origin servers will experience an immediate traffic spike.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button size="sm" variant="ghost">Abort</Button>
              </DialogClose>
              <Button size="sm" variant="danger">
                Yes, Purge Global Cache
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ComponentDoc>
  )
}
