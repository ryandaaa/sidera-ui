import * as React from 'react'
import { cn } from '@/lib/cn'

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode
  description?: React.ReactNode
  breadcrumbs?: React.ReactNode
  actions?: React.ReactNode
  badge?: React.ReactNode
  borderBottom?: boolean
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      className,
      title,
      description,
      breadcrumbs,
      actions,
      badge,
      borderBottom = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          'flex flex-col gap-3 pb-6 w-full text-left',
          borderBottom && 'border-b border-[var(--border)]',
          className,
        )}
        {...props}
      >
        {breadcrumbs && <div>{breadcrumbs}</div>}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)]">
                {title}
              </h1>
              {badge && <div>{badge}</div>}
            </div>
            {description && (
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-2 shrink-0 sm:self-start">
              {actions}
            </div>
          )}
        </div>

        {children}
      </header>
    )
  },
)

PageHeader.displayName = 'PageHeader'
