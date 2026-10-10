import * as React from 'react'
import { cn } from '@/lib/cn'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon,
      title,
      description,
      action,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center border border-dashed border-[var(--border-strong)] rounded-[var(--radius-sm)] bg-[var(--surface)]',
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[var(--radius-xs)] border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--text-muted)]">
          {icon}
        </div>
      )}
      <h3 className="text-xs font-semibold text-[var(--text)] tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="mt-1 max-w-sm text-[11px] text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  ),
)
EmptyState.displayName = 'EmptyState'
