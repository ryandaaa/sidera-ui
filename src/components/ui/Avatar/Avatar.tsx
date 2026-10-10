import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden border border-[var(--border)]',
    'bg-[var(--surface-raised)] text-[var(--text)] font-mono font-medium',
  ],
  {
    variants: {
      size: {
        sm: 'h-6 w-6 text-[10px]',
        md: 'h-8 w-8 text-xs',
        lg: 'h-10 w-10 text-sm',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-[var(--radius-xs)]',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'square',
    },
  },
)

const statusIndicator = {
  online: 'bg-[var(--success)]',
  busy: 'bg-[var(--danger)]',
  away: 'bg-[var(--warning)]',
  offline: 'bg-[var(--text-muted)]',
}

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  status?: 'online' | 'offline' | 'busy' | 'away'
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size = 'md',
      shape = 'square',
      src,
      alt = '',
      fallback,
      status,
      ...props
    },
    ref,
  ) => {
    const [hasError, setHasError] = React.useState(false)

    return (
      <div className="relative inline-flex">
        <div
          ref={ref}
          className={cn(avatarVariants({ size, shape, className }))}
          {...props}
        >
          {src && !hasError ? (
            <img
              src={src}
              alt={alt}
              onError={() => setHasError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="uppercase tracking-wider">
              {fallback || alt.slice(0, 2) || '?'}
            </span>
          )}
        </div>
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 block rounded-full ring-2 ring-[var(--surface)]',
              statusIndicator[status],
              size === 'sm' ? 'h-1.5 w-1.5' : size === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2',
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
