import * as React from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const alertVariants = cva(
  [
    'relative w-full rounded-[var(--radius-sm)] border p-3 text-xs leading-normal',
    'flex items-start gap-2.5 select-text transition-colors',
  ],
  {
    variants: {
      variant: {
        default: 'bg-[var(--surface-raised)] border-[var(--border)] text-[var(--text)]',
        info: 'bg-[var(--surface)] border-[var(--info)] text-[var(--text)] [&>svg]:text-[var(--info)]',
        success: 'bg-[var(--surface)] border-[var(--success)] text-[var(--text)] [&>svg]:text-[var(--success)]',
        warning: 'bg-[var(--surface)] border-[var(--warning)] text-[var(--text)] [&>svg]:text-[var(--warning)]',
        danger: 'bg-[var(--surface)] border-[var(--danger)] text-[var(--text)] [&>svg]:text-[var(--danger)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const defaultIcons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
}

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode
  icon?: React.ReactNode
  onClose?: () => void
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'default',
      title,
      icon,
      onClose,
      children,
      ...props
    },
    ref,
  ) => {
    const IconComponent = defaultIcons[variant || 'default']

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        <span className="shrink-0 mt-0.5">
          {icon || <IconComponent className="h-4 w-4 stroke-[2]" />}
        </span>
        <div className="flex-1 min-w-0">
          {title && (
            <h5 className="font-semibold text-xs text-[var(--text)] mb-0.5 tracking-tight">
              {title}
            </h5>
          )}
          {children && (
            <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              {children}
            </div>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss alert"
            className="shrink-0 -mr-1 -mt-1 p-1 rounded-[var(--radius-xs)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    )
  },
)

Alert.displayName = 'Alert'
