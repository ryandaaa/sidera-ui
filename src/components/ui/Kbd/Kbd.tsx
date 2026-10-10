import * as React from 'react'
import { cn } from '@/lib/cn'

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md'
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size = 'md', children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-mono font-medium select-none',
        'rounded-[var(--radius-xs)] border border-[var(--border-strong)] bg-[var(--surface-raised)] text-[var(--text)]',
        size === 'sm' ? 'h-4 min-w-4 px-1 text-[10px]' : 'h-5 min-w-5 px-1.5 text-[11px]',
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  ),
)
Kbd.displayName = 'Kbd'
