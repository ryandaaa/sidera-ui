import * as React from 'react'
import { cn } from '@/lib/cn'

export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  layout?: 'horizontal' | 'stacked'
}

export const DescriptionList = React.forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ className, layout = 'horizontal', ...props }, ref) => (
    <dl
      ref={ref}
      className={cn(
        'divide-y divide-[var(--border)] border-y border-[var(--border)] w-full text-xs',
        className,
      )}
      data-layout={layout}
      {...props}
    />
  ),
)
DescriptionList.displayName = 'DescriptionList'

export const DescriptionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'py-2.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4',
      className,
    )}
    {...props}
  />
))
DescriptionItem.displayName = 'DescriptionItem'

export const DescriptionTerm = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <dt
    ref={ref}
    className={cn(
      'text-xs font-medium text-[var(--text-secondary)] shrink-0 font-mono text-[11px]',
      className,
    )}
    {...props}
  />
))
DescriptionTerm.displayName = 'DescriptionTerm'

export const DescriptionDetails = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <dd
    ref={ref}
    className={cn(
      'text-xs text-[var(--text)] text-left sm:text-right font-normal leading-normal',
      className,
    )}
    {...props}
  />
))
DescriptionDetails.displayName = 'DescriptionDetails'
