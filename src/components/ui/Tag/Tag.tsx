import * as React from 'react'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const tagVariants = cva(
  [
    'inline-flex items-center gap-1 font-mono text-[11px] font-medium select-none',
    'rounded-[var(--radius-xs)] border transition-colors duration-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]',
  ],
  {
    variants: {
      variant: {
        default: 'bg-[var(--surface-raised)] border-[var(--border)] text-[var(--text)]',
        outline: 'bg-transparent border-[var(--border-strong)] text-[var(--text-secondary)]',
        interactive: 'bg-[var(--surface-raised)] border-[var(--border)] text-[var(--text)] hover:border-[var(--text-secondary)] hover:bg-[var(--surface-hover)] cursor-pointer',
      },
      size: {
        sm: 'h-5 px-1.5 text-[10px]',
        md: 'h-6 px-2 text-[11px]',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      disabled: false,
    },
  },
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void
  removeAriaLabel?: string
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      children,
      onRemove,
      removeAriaLabel = 'Remove tag',
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant: onRemove ? (variant || 'default') : variant, size, disabled, className }))}
        {...props}
      >
        <span>{children}</span>
        {onRemove && (
          <button
            type="button"
            aria-label={removeAriaLabel}
            disabled={disabled || false}
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="p-0.5 -mr-0.5 rounded-[var(--radius-none)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)]"
          >
            <X className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} />
          </button>
        )}
      </span>
    )
  },
)

Tag.displayName = 'Tag'
