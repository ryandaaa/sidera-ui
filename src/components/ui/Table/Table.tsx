import * as React from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  stickyHeader?: boolean
  dense?: boolean
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, stickyHeader, dense = true, ...props }, ref) => (
    <div
      className={cn(
        'relative w-full overflow-auto border-y border-[var(--border)]',
        stickyHeader && 'max-h-[400px]',
      )}
    >
      <table
        ref={ref}
        className={cn(
          'w-full caption-bottom text-left border-collapse',
          dense ? 'text-xs' : 'text-sm',
          className,
        )}
        {...props}
      />
    </div>
  ),
)
Table.displayName = 'Table'

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { sticky?: boolean }
>(({ className, sticky, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'border-b border-[var(--border)] bg-[var(--surface-raised)]',
      sticky && 'sticky top-0 z-10',
      className,
    )}
    {...props}
  />
))
TableHeader.displayName = 'TableHeader'

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('divide-y divide-[var(--border)]', className)}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-[var(--border)] bg-[var(--surface-raised)] font-medium',
      className,
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'transition-colors hover:bg-[var(--surface-hover)] data-[state=selected]:bg-[var(--surface-overlay)]',
      className,
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: 'asc' | 'desc' | false
  onSort?: () => void
  numeric?: boolean
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      sortable,
      sortDirection,
      onSort,
      numeric,
      children,
      ...props
    },
    ref,
  ) => {
    if (sortable) {
      return (
        <th
          ref={ref}
          className={cn(
            'py-2 px-3 text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text)] select-none',
            numeric && 'text-right',
            className,
          )}
          {...props}
        >
          <button
            type="button"
            onClick={onSort}
            className={cn(
              'inline-flex items-center gap-1.5 hover:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)]',
              numeric && 'justify-end w-full',
            )}
          >
            <span>{children}</span>
            {sortDirection === 'asc' ? (
              <ArrowUp className="h-3 w-3 stroke-[2.5]" />
            ) : sortDirection === 'desc' ? (
              <ArrowDown className="h-3 w-3 stroke-[2.5]" />
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-40 hover:opacity-100" />
            )}
          </button>
        </th>
      )
    }

    return (
      <th
        ref={ref}
        className={cn(
          'py-2 px-3 text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text)]',
          numeric && 'text-right',
          className,
        )}
        {...props}
      >
        {children}
      </th>
    )
  },
)
TableHead.displayName = 'TableHead'

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & { mono?: boolean; numeric?: boolean }
>(({ className, mono, numeric, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'py-2 px-3 text-xs text-[var(--text)] align-middle',
      mono && 'font-mono text-[11px]',
      numeric && 'font-mono text-right tabular-nums',
      className,
    )}
    {...props}
  />
))
TableCell.displayName = 'TableCell'
