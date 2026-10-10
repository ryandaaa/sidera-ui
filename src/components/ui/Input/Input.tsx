import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const inputVariants = cva(
  [
    'flex w-full select-text text-xs text-[var(--text)] bg-[var(--surface-raised)]',
    'rounded-[var(--radius-sm)] border border-[var(--border-strong)]',
    'placeholder:text-[var(--text-muted)]',
    'transition-colors duration-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:border-transparent',
    'disabled:pointer-events-none disabled:opacity-45',
  ],
  {
    variants: {
      size: {
        sm: 'h-[var(--control-h-sm)] px-2 text-[11px]',
        md: 'h-[var(--control-h-md)] px-2.5 text-xs',
        lg: 'h-[var(--control-h-lg)] px-3 text-xs',
      },
      hasError: {
        true: 'border-[var(--danger)] focus-visible:ring-[var(--danger)]',
        false: 'hover:border-[var(--text-secondary)]',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  },
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      hasError,
      leftElement,
      rightElement,
      disabled,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    if (leftElement || rightElement) {
      return (
        <div
          className={cn(
            'relative flex items-center w-full',
            disabled && 'opacity-45 pointer-events-none',
          )}
        >
          {leftElement && (
            <div className="absolute left-2.5 flex items-center pointer-events-none text-[var(--text-muted)]">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            aria-invalid={hasError ? 'true' : undefined}
            className={cn(
              inputVariants({ size, hasError, className }),
              leftElement && 'pl-8',
              rightElement && 'pr-8',
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-2.5 flex items-center pointer-events-none text-[var(--text-muted)]">
              {rightElement}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        aria-invalid={hasError ? 'true' : undefined}
        className={cn(inputVariants({ size, hasError, className }))}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
