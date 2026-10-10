import * as React from 'react'
import { cn } from '@/lib/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'animate-pulse rounded-[var(--radius-xs)] bg-[var(--surface-raised)] border border-[var(--border)]',
        className,
      )}
      {...props}
    />
  ),
)
Skeleton.displayName = 'Skeleton'
