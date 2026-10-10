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

const statusBorder: Record<NonNullable<AvatarProps['status']>, string> = {
  online: 'border-b-2 border-b-[var(--success)]',
  busy: 'border-b-2 border-b-[var(--danger)]',
  away: 'border-b-2 border-b-[var(--warning)]',
  offline: 'border-b-2 border-b-[var(--text-muted)]',
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
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const [hasError, setHasError] = React.useState(false)

    const computedAriaLabel =
      ariaLabel ||
      (status
        ? `${alt || fallback || 'User'} (${status})`
        : alt || fallback || undefined)

    return (
      <div
        ref={ref}
        className={cn(
          avatarVariants({ size, shape }),
          status && statusBorder[status],
          className,
        )}
        data-status={status}
        aria-label={computedAriaLabel}
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
    )
  },
)

Avatar.displayName = 'Avatar'
