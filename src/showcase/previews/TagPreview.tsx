import * as React from 'react'
import { Tag } from '@/components/ui/Tag'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'variant',
    type: "'default' | 'outline' | 'interactive'",
    default: "'default'",
    description: 'Visual treatment and interactivity styling.',
  },
  {
    name: 'size',
    type: "'sm' | 'md'",
    default: "'md'",
    description: 'Tag height (20px sm, 24px md).',
  },
  {
    name: 'onRemove',
    type: '() => void',
    default: '-',
    description: 'Renders an accessible X button and calls function when clicked.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables interaction.',
  },
]

const usageCode = `import { Tag } from '@/components/ui/Tag'

export function Example() {
  const [tags, setTags] = useState(['cloudflare', 'typescript', 'vite'])

  return (
    <div className="flex gap-2">
      {tags.map((t) => (
        <Tag key={t} onRemove={() => setTags(tags.filter(x => x !== t))}>
          {t}
        </Tag>
      ))}
    </div>
  )
}`

const tagToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'removable', label: 'Removable Tags' },
  { id: 'variants', label: 'Variants & Sizes' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function TagPreview() {
  const [activeTags, setActiveTags] = React.useState([
    'region:apac-south',
    'runtime:v8-isolate',
    'env:production',
  ])

  return (
    <ComponentDoc
      title="Tag"
      description="Monospace filter and metadata chip with optional dismissal button. Used for applied filters, route parameters, and query facets."
      componentPath="src/components/ui/Tag"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={tagToc}
    >
      {/* 1. Removable Tags */}
      <div id="removable" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Removable Filter Tags
        </span>
        <div className="flex flex-wrap gap-2">
          {activeTags.map((tag) => (
            <Tag
              key={tag}
              onRemove={() => setActiveTags(activeTags.filter((t) => t !== tag))}
            >
              {tag}
            </Tag>
          ))}
          {activeTags.length === 0 && (
            <button
              type="button"
              onClick={() => setActiveTags(['region:apac-south', 'runtime:v8-isolate', 'env:production'])}
              className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] underline"
            >
              Reset tags
            </button>
          )}
        </div>
      </div>

      {/* 2. Variants & Sizes */}
      <div id="variants" className="space-y-2.5 pt-4 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Variants & Sizes
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="default" size="sm">default-sm</Tag>
          <Tag variant="default" size="md">default-md</Tag>
          <Tag variant="outline" size="sm">outline-sm</Tag>
          <Tag variant="outline" size="md">outline-md</Tag>
          <Tag variant="interactive" size="md">interactive-click</Tag>
        </div>
      </div>
    </ComponentDoc>
  )
}
