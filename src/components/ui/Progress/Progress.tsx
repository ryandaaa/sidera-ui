import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-[var(--surface-raised)] border border-[var(--border)]',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  indeterminate?: boolean
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      size,
      value = 0,
      max = 100,
      indeterminate = false,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : Math.round(value)}
        className={cn(progressVariants({ size, className }))}
        {...props}
      >
        {indeterminate ? (
          <div className="h-full w-1/3 bg-[var(--primary)] animate-[pulse_1.2s_ease-in-out_infinite]" />
        ) : (
          <div
            className="h-full bg-[var(--primary)] transition-all duration-200 ease-out"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    )
  },
)

Progress.displayName = 'Progress'
