import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const inputVariants = cva(
  [
    'flex w-full select-text text-[var(--text)] bg-transparent',
    'border-0 border-b border-[var(--border-strong)] rounded-none',
    'placeholder:text-[var(--text-muted)]',
    'transition-colors duration-150',
    'hover:border-[var(--border-hover)]',
    'outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0',
    'disabled:pointer-events-none disabled:opacity-40 disabled:border-dashed',
  ],
  {
    variants: {
      size: {
        sm: 'h-[var(--control-h-sm)] text-[11px] pb-1 pt-1',
        md: 'h-[var(--control-h-md)] text-xs pb-1.5 pt-1.5',
        lg: 'h-[var(--control-h-lg)] text-sm pb-2 pt-2',
      },
      hasError: {
        true: 'border-[var(--danger)]',
        false: '',
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
      size = 'md',
      hasError = false,
      leftElement,
      rightElement,
      disabled,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'group relative flex items-center w-full',
          disabled && 'opacity-40 pointer-events-none',
          className,
        )}
      >
        {leftElement && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-[var(--text-muted)] group-focus-within:text-[var(--text)] transition-colors duration-150">
            {leftElement}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          style={{ outline: 'none', ...props.style }}
          className={cn(
            inputVariants({ size, hasError }),
            leftElement ? 'pl-6' : 'pl-0.5',
            rightElement ? 'pr-7' : 'pr-0.5',
          )}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center text-[var(--text-muted)] group-focus-within:text-[var(--text)] transition-colors duration-150">
            {rightElement}
          </div>
        )}

        {/* Smooth animated active bottom line */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none origin-left transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)]',
            hasError
              ? 'bg-[var(--danger)] scale-x-100'
              : 'bg-[var(--primary)] scale-x-0 group-focus-within:scale-x-100',
          )}
        />
      </div>
    )
  },
)

Input.displayName = 'Input'
