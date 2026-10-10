import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const textareaVariants = cva(
  [
    'flex w-full select-text text-xs text-[var(--text)] bg-[var(--surface)]',
    'rounded-[var(--radius-sm)] border border-[var(--border-strong)]',
    'placeholder:text-[var(--text-muted)]',
    'transition-colors duration-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:border-transparent',
    'disabled:pointer-events-none disabled:opacity-45',
  ],
  {
    variants: {
      size: {
        sm: 'p-2 text-[11px] min-h-[64px]',
        md: 'p-2.5 text-xs min-h-[80px]',
        lg: 'p-3 text-xs min-h-[96px]',
      },
      hasError: {
        true: 'border-[var(--danger)] focus-visible:ring-[var(--danger)]',
        false: 'hover:border-[var(--text-secondary)]',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        both: 'resize',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
      resize: 'vertical',
    },
  },
)

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, hasError, resize, disabled, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        aria-invalid={hasError ? 'true' : undefined}
        className={cn(textareaVariants({ size, hasError, resize, className }))}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
