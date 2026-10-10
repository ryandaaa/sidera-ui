import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center select-none font-medium text-xs',
    'rounded-[var(--radius-sm)] border transition-colors duration-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg)]',
    'disabled:pointer-events-none disabled:opacity-45',
    'active:scale-[0.99] transition-transform duration-75',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent',
          'hover:bg-[var(--primary-hover)]',
          'active:opacity-90',
        ],
        secondary: [
          'bg-[var(--surface)] text-[var(--text)] border-[var(--border-strong)]',
          'hover:bg-[var(--surface-hover)] hover:border-[var(--text-secondary)]',
          'active:bg-[var(--surface-active)]',
        ],
        ghost: [
          'bg-transparent text-[var(--text-secondary)] border-transparent',
          'hover:bg-[var(--surface-hover)] hover:text-[var(--text)]',
          'active:bg-[var(--surface-active)]',
        ],
        danger: [
          'bg-[var(--danger-bg)] text-[var(--danger)] border-[var(--danger-border)]',
          'hover:bg-[var(--danger)] hover:text-white hover:border-[var(--danger)]',
          'active:opacity-90',
        ],
      },
      size: {
        sm: 'h-[var(--control-h-sm)] px-[var(--control-px-sm)] gap-1 text-[11px]',
        md: 'h-[var(--control-h-md)] px-[var(--control-px-md)] gap-1.5 text-xs',
        lg: 'h-[var(--control-h-lg)] px-[var(--control-px-lg)] gap-2 text-xs',
        'icon-sm': 'h-[var(--control-h-sm)] w-[var(--control-h-sm)] p-0',
        'icon-md': 'h-[var(--control-h-md)] w-[var(--control-h-md)] p-0',
        'icon-lg': 'h-[var(--control-h-lg)] w-[var(--control-h-lg)] p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        aria-busy={isLoading}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
