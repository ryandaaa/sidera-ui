import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, page, totalPages, onPageChange, ...props }, ref) => {
    // Generate visible page numbers
    const getVisiblePages = () => {
      const delta = 1
      const pages: (number | 'ellipsis')[] = []

      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= page - delta && i <= page + delta)
        ) {
          pages.push(i)
        } else if (pages[pages.length - 1] !== 'ellipsis') {
          pages.push('ellipsis')
        }
      }

      return pages
    }

    const pages = getVisiblePages()

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="pagination"
        className={cn('flex items-center gap-1 select-none text-xs font-mono', className)}
        {...props}
      >
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="inline-flex h-[var(--control-h-sm)] items-center justify-center rounded-[var(--radius-xs)] border border-[var(--border)] bg-[var(--surface)] px-2 text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] disabled:pointer-events-none disabled:opacity-40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)]"
        >
          <ChevronLeft className="h-3.5 w-3.5 mr-0.5" />
          <span>Prev</span>
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="flex h-[var(--control-h-sm)] w-[var(--control-h-sm)] items-center justify-center text-[var(--text-muted)]"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </span>
              )
            }

            const isCurrent = p === page

            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(
                  'h-[var(--control-h-sm)] min-w-[var(--control-h-sm)] px-2 rounded-[var(--radius-xs)] text-center text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)]',
                  isCurrent
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold'
                    : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]',
                )}
              >
                {p}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="inline-flex h-[var(--control-h-sm)] items-center justify-center rounded-[var(--radius-xs)] border border-[var(--border)] bg-[var(--surface)] px-2 text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] disabled:pointer-events-none disabled:opacity-40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)]"
        >
          <span>Next</span>
          <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
        </button>
      </nav>
    )
  },
)

Pagination.displayName = 'Pagination'
