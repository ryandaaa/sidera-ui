import * as React from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useToc, type TocItem } from './TableOfContents'

export interface PropSpec {
  name: string
  type: string
  default?: string
  description: string
}

export interface ComponentDocProps {
  title: string
  description: string
  componentPath: string
  children: React.ReactNode
  propsSpec?: PropSpec[]
  usageCode: string
  tocItems?: TocItem[]
}

export function ComponentDoc({
  title,
  description,
  componentPath,
  children,
  propsSpec = [],
  usageCode,
  tocItems,
}: ComponentDocProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(usageCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const defaultToc: TocItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'preview', label: 'Live Preview' },
    { id: 'usage', label: 'Usage' },
    ...(propsSpec.length > 0 ? [{ id: 'props', label: 'Props Specification' }] : []),
  ]

  const activeToc = tocItems || defaultToc
  useToc(activeToc)

  return (
    <div className="w-full max-w-4xl space-y-10 text-left">
      {/* Component Header / Overview */}
      <div id="overview" className="space-y-2 border-b border-[var(--border)] pb-5 scroll-mt-20">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text)]">
            {title}
          </h1>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {componentPath}
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Live Interactive Previews */}
      <section id="preview" className="space-y-4 scroll-mt-20">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">
            Live Preview & State Ladder
          </h2>
        </div>
        <div className="p-6 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] space-y-6 transition-colors duration-200 hover:border-[var(--border-hover)]">
          {children}
        </div>
      </section>

      {/* Code Usage */}
      <section id="usage" className="space-y-3 scroll-mt-20">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">
            Usage Snippet
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            leftIcon={
              copied ? (
                <Check className="h-3 w-3 text-[var(--success)]" />
              ) : (
                <Copy className="h-3 w-3" />
              )
            }
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
        <div className="relative rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg)] p-4 overflow-x-auto font-mono text-xs text-[var(--text-secondary)] leading-relaxed transition-colors duration-200 hover:border-[var(--border-hover)]">
          <pre>{usageCode}</pre>
        </div>
      </section>

      {/* Props Specification Table */}
      {propsSpec.length > 0 && (
        <section id="props" className="space-y-3 scroll-mt-20">
          <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">
            Props Specification
          </h2>
          <div className="border-y border-[var(--border)] overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-xs text-[var(--text)] font-semibold font-mono">
                  <th className="py-2.5 px-2 font-medium">Prop</th>
                  <th className="py-2.5 px-2 font-medium">Type</th>
                  <th className="py-2.5 px-2 font-medium">Default</th>
                  <th className="py-2.5 px-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-xs">
                {propsSpec.map((spec) => (
                  <tr key={spec.name} className="hover:bg-[var(--surface-hover)]">
                    <td className="py-2.5 px-2 font-mono font-medium text-[var(--text)]">
                      {spec.name}
                    </td>
                    <td className="py-2.5 px-2 font-mono text-[var(--text-secondary)]">
                      {spec.type}
                    </td>
                    <td className="py-2.5 px-2 font-mono text-[var(--text-muted)]">
                      {spec.default || '-'}
                    </td>
                    <td className="py-2.5 px-2 text-[var(--text-secondary)]">
                      {spec.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
