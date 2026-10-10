import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Trigger control height (28px sm, 32px md, 36px lg).',
  },
  {
    name: 'hasError',
    type: 'boolean',
    default: 'false',
    description: 'Displays error styling on the trigger element.',
  },
  {
    name: 'value',
    type: 'string',
    default: '-',
    description: 'Controlled value of the selected item.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    default: '-',
    description: 'Event callback fired when an item is selected.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables trigger interaction.',
  },
]

const usageCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

export function Example() {
  return (
    <Select defaultValue="cloudflare">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select target platform" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="cloudflare">Cloudflare Workers</SelectItem>
        <SelectItem value="fastly">Fastly Compute@Edge</SelectItem>
        <SelectItem value="deno">Deno Deploy</SelectItem>
      </SelectContent>
    </Select>
  )
}`

const selectToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'interactive', label: 'Interactive Dropdown' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'states', label: 'States (Error & Disabled)' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function SelectPreview() {
  const [platform, setPlatform] = React.useState('cloudflare')

  return (
    <ComponentDoc
      title="Select"
      description="Radix UI primitive wrapper for accessible, keyboard-first dropdown menus. High information density with zero decorative shadows."
      componentPath="src/components/ui/Select"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={selectToc}
    >
      {/* 1. Interactive Demo */}
      <div id="interactive" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Target Cloud Edge Platform
        </span>
        <div className="max-w-sm">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="Choose runtime..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Global Edge Runtimes</SelectLabel>
                <SelectItem value="cloudflare">Cloudflare Workers (V8 Isolates)</SelectItem>
                <SelectItem value="fastly">Fastly Compute@Edge (Wasm)</SelectItem>
                <SelectItem value="deno">Deno Deploy (V8 Subhosting)</SelectItem>
                <SelectItem value="aws">AWS Lambda@Edge (NodeJS)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 2. Sizes */}
      <div id="sizes" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Trigger Sizes
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Select defaultValue="sm">
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small Trigger (28px)</SelectItem>
              <SelectItem value="opt2">Option 2</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="md">
            <SelectTrigger size="md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="md">Medium Trigger (32px)</SelectItem>
              <SelectItem value="opt2">Option 2</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="lg">
            <SelectTrigger size="lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lg">Large Trigger (36px)</SelectItem>
              <SelectItem value="opt2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 3. States */}
      <div id="states" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          States
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select defaultValue="err">
            <SelectTrigger hasError>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="err">Invalid Region Selected</SelectItem>
            </SelectContent>
          </Select>

          <Select disabled defaultValue="dis">
            <SelectTrigger disabled>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dis">Disabled Trigger</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </ComponentDoc>
  )
}
