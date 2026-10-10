import { Textarea } from '@/components/ui/Textarea'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Padding and minimum height scale.',
  },
  {
    name: 'hasError',
    type: 'boolean',
    default: 'false',
    description: 'Activates danger border and focus-ring indicator.',
  },
  {
    name: 'resize',
    type: "'none' | 'vertical' | 'both'",
    default: "'vertical'",
    description: 'Controls the resize handle behavior.',
  },
  {
    name: 'rows',
    type: 'number',
    default: '3',
    description: 'Visible number of text lines.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Standard disabled state.',
  },
]

const usageCode = `import { Textarea } from '@/components/ui/Textarea'

export function Example() {
  return (
    <Textarea
      placeholder="Enter system prompt or deployment instructions..."
      rows={4}
    />
  )
}`

const textareaToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'resize-modes', label: 'Resize Modes' },
  { id: 'states', label: 'States (Error & Disabled)' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function TextareaPreview() {
  return (
    <ComponentDoc
      title="Textarea"
      description="Multi-line plain text editor for longform input, code snippets, or system prompts. Token-bound surface, 1px border-strong, clear focus ring."
      componentPath="src/components/ui/Textarea"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={textareaToc}
    >
      {/* 1. Sizes */}
      <div id="sizes" className="space-y-2.5 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Sizes
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Textarea size="sm" rows={2} placeholder="Small textarea (2 lines)" />
          <Textarea size="md" rows={3} placeholder="Medium textarea (3 lines)" />
          <Textarea size="lg" rows={4} placeholder="Large textarea (4 lines)" />
        </div>
      </div>

      {/* 2. Resize modes */}
      <div id="resize-modes" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Resize Modes
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Textarea resize="none" placeholder="Fixed size (resize: none)" />
          <Textarea resize="vertical" placeholder="Vertical only (resize: vertical, default)" />
        </div>
      </div>

      {/* 3. States */}
      <div id="states" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          States
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Textarea hasError defaultValue="Invalid config payload syntax error at line 4" />
          <Textarea disabled defaultValue="Disabled content is read-only and muted" />
        </div>
      </div>
    </ComponentDoc>
  )
}
