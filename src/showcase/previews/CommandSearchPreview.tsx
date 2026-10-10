import * as React from 'react'
import { CommandSearch } from '@/components/ui/CommandSearch'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'shortcutKey',
    type: 'string',
    default: "'K'",
    description: 'Key letter displayed in the hardware badge (e.g. ⌘K or Ctrl+K).',
  },
  {
    name: 'size',
    type: "'sm' | 'md'",
    default: "'md'",
    description: 'Control height (28px sm, 32px md).',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Search or jump to...'",
    description: 'Muted placeholder prompt.',
  },
  {
    name: 'onClear',
    type: '() => void',
    default: '-',
    description: 'Callback when user clicks the clear X button.',
  },
]

const usageCode = `import { CommandSearch } from '@/components/ui/CommandSearch'

export function Example() {
  const [query, setQuery] = useState('')

  return (
    <CommandSearch
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Type a command or search documentation..."
      shortcutKey="K"
    />
  )
}`

const csToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'interactive', label: 'Interactive Command Input' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function CommandSearchPreview() {
  const [val, setVal] = React.useState('')

  return (
    <ComponentDoc
      title="Command Search"
      description="Quick-switcher command palette input with search icon, Kbd keybinding badge, and immediate clear button."
      componentPath="src/components/ui/CommandSearch"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={csToc}
    >
      {/* 1. Interactive Demo */}
      <div id="interactive" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Interactive Command Search
        </span>
        <div className="max-w-md">
          <CommandSearch
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onClear={() => setVal('')}
            placeholder="Search API endpoints or deploy commands..."
            shortcutKey="K"
          />
          {val && (
            <p className="mt-2 text-xs font-mono text-[var(--text-secondary)]">
              Filtering for: <span className="text-[var(--text)] font-semibold">{val}</span>
            </p>
          )}
        </div>
      </div>

      {/* 2. Sizes */}
      <div id="sizes" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Sizes
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">Small (28px)</span>
            <CommandSearch size="sm" placeholder="Filter..." shortcutKey="F" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">Medium (32px, default)</span>
            <CommandSearch size="md" placeholder="Search..." shortcutKey="K" />
          </div>
        </div>
      </div>
    </ComponentDoc>
  )
}
