import * as React from 'react'
import { cn } from '@/lib/cn'

export interface SidebarNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  icon?: React.ReactNode
  label: React.ReactNode
  badge?: React.ReactNode
  count?: number | string
}

export const SidebarNavItem = React.forwardRef<HTMLButtonElement, SidebarNavItemProps>(
  (
    {
      className,
      active = false,
      icon,
      label,
      badge,
      count,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'group flex w-full items-center justify-between px-2.5 py-1.5 rounded-[var(--radius-xs)] text-left text-[13px] transition-colors select-none',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)]',
          active
            ? 'bg-[var(--surface-overlay)] text-[var(--text)] font-semibold'
            : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]',
          disabled && 'opacity-40 pointer-events-none',
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && (
            <span
              className={cn(
                'shrink-0 text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors',
                active && 'text-[var(--text)]',
              )}
            >
              {icon}
            </span>
          )}
          <span className="truncate">{label}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {count !== undefined && (
            <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--surface-raised)] px-1.5 py-0.2 rounded-[var(--radius-xs)] border border-[var(--border)]">
              {count}
            </span>
          )}
          {badge && (
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              {badge}
            </span>
          )}
          {active && (
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
          )}
        </div>
      </button>
    )
  },
)

SidebarNavItem.displayName = 'SidebarNavItem'
