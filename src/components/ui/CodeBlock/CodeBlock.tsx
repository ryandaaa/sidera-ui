import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, children, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        'rounded-[var(--radius-xs)] bg-[var(--surface-raised)] px-1.5 py-0.5 font-mono text-[11px] font-medium text-[var(--text)] border border-[var(--border)]',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  ),
)
Code.displayName = 'Code'

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      code,
      language,
      filename,
      showLineNumbers = false,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const lines = code.trim().split('\n')

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-left',
          'transition-colors duration-200 hover:border-[var(--border-hover)]',
          className,
        )}
        {...props}
      >
        {(filename || language) && (
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-raised)]/60 px-3 py-1.5 text-[11px]">
            <span className="font-mono text-[var(--text-secondary)]">
              {filename || language}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus-visible:outline-none"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-[var(--success)]" />
                  <span>copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>copy</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="relative overflow-x-auto p-3 text-xs font-mono leading-relaxed select-text">
          {!filename && !language && (
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-3 top-3 p-1 rounded-[var(--radius-xs)] bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus-visible:outline-none"
              title="Copy code"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-[var(--success)]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          )}

          {showLineNumbers ? (
            <div className="table w-full">
              {lines.map((line, idx) => (
                <div key={idx} className="table-row">
                  <span className="table-cell select-none pr-4 text-right text-[11px] text-[var(--text-muted)] font-mono opacity-50 w-8">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre text-[var(--text)]">
                    {line}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <pre className="text-[var(--text)] whitespace-pre font-mono">
              {code}
            </pre>
          )}
        </div>
      </div>
    )
  },
)
CodeBlock.displayName = 'CodeBlock'
