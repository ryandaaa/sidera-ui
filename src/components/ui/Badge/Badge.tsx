import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const badgeVariants = cva(
  [
    'inline-flex items-center select-none font-medium tabular-nums',
    'border transition-colors duration-75',
  ],
  {
    variants: {
      variant: {
        neutral: [
          'bg-[var(--surface-raised)] text-[var(--text-secondary)] border-[var(--border)]',
        ],
        outline: [
          'bg-transparent text-[var(--text)] border-[var(--border-strong)]',
        ],
        success: [
          'bg-[var(--success-bg)] text-[var(--success)] border-[var(--success-border)]',
        ],
        warning: [
          'bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning-border)]',
        ],
        danger: [
          'bg-[var(--danger-bg)] text-[var(--danger)] border-[var(--danger-border)]',
        ],
        info: [
          'bg-[var(--info-bg)] text-[var(--info)] border-[var(--info-border)]',
        ],
      },
      size: {
        sm: 'h-4 px-1.5 text-[10px] gap-1 leading-none',
        md: 'h-5 px-2 text-[11px] gap-1.5 leading-none',
      },
      shape: {
        rounded: 'rounded-[var(--radius-xs)]',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
      shape: 'rounded',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export function Badge({
  className,
  variant,
  size,
  shape,
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, shape, className }))}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'inline-block h-1.5 w-1.5 rounded-full shrink-0',
            variant === 'success' && 'bg-[var(--success)]',
            variant === 'warning' && 'bg-[var(--warning)]',
            variant === 'danger' && 'bg-[var(--danger)]',
            variant === 'info' && 'bg-[var(--info)]',
            variant === 'neutral' && 'bg-[var(--text-muted)]',
            variant === 'outline' && 'bg-[var(--text)]',
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
