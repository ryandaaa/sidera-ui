import * as React from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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
}

export function ComponentDoc({
  title,
  description,
  componentPath,
  children,
  propsSpec = [],
  usageCode,
}: ComponentDocProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(usageCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-5xl text-left">
      {/* Component Header */}
      <div className="space-y-1.5 border-b border-[var(--border)] pb-4">
        <div className="flex items-baseline gap-2.5">
          <h1 className="text-xl font-bold tracking-tight text-[var(--text)]">
            {title}
          </h1>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {componentPath}
          </span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Live Interactive Previews */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
            Live Preview & State Ladder
          </h2>
        </div>
        <div className="p-5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] space-y-6">
          {children}
        </div>
      </section>

      {/* Code Usage */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
            Usage
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
            {copied ? 'Copied' : 'Copy Snippet'}
          </Button>
        </div>
        <div className="relative rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--bg)] p-3 overflow-x-auto font-mono text-[11px] text-[var(--text-secondary)] leading-relaxed">
          <pre>{usageCode}</pre>
        </div>
      </section>

      {/* Props Specification Table */}
      {propsSpec.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
            Props Specification
          </h2>
          <div className="rounded-[var(--radius-sm)] border border-[var(--border)] overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-raised)]/60 text-[11px] text-[var(--text-muted)] font-mono">
                  <th className="py-2 px-3 font-medium">Prop</th>
                  <th className="py-2 px-3 font-medium">Type</th>
                  <th className="py-2 px-3 font-medium">Default</th>
                  <th className="py-2 px-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)] text-[11px]">
                {propsSpec.map((spec) => (
                  <tr key={spec.name} className="hover:bg-[var(--surface-hover)]">
                    <td className="py-2 px-3 font-mono font-medium text-[var(--text)]">
                      {spec.name}
                    </td>
                    <td className="py-2 px-3 font-mono text-[var(--text-secondary)]">
                      {spec.type}
                    </td>
                    <td className="py-2 px-3 font-mono text-[var(--text-muted)]">
                      {spec.default || '-'}
                    </td>
                    <td className="py-2 px-3 text-[var(--text-secondary)]">
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
