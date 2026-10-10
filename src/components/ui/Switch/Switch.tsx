import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const switchTrackVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer items-center rounded-full',
    'border border-transparent transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
    'disabled:cursor-not-allowed disabled:opacity-45',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
        lg: 'h-6 w-11',
      },
      checked: {
        true: 'bg-[var(--primary)]',
        false: 'bg-[var(--surface-raised)] border-[var(--border-strong)]',
      },
    },
    defaultVariants: {
      size: 'md',
      checked: false,
    },
  },
)

export const switchThumbVariants = cva(
  [
    'pointer-events-none block rounded-full transition-transform duration-150',
    'shadow-none',
  ],
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-3.5 w-3.5',
        lg: 'h-4.5 w-4.5',
      },
      checked: {
        true: 'bg-[var(--primary-foreground)]',
        false: 'bg-[var(--text-secondary)]',
      },
    },
    defaultVariants: {
      size: 'md',
      checked: false,
    },
  },
)

const thumbTranslate = {
  sm: { true: 'translate-x-3.5', false: 'translate-x-0.5' },
  md: { true: 'translate-x-4.5', false: 'translate-x-0.5' },
  lg: { true: 'translate-x-5.5', false: 'translate-x-0.5' },
}

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'onChange'>,
    VariantProps<typeof switchTrackVariants> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: React.ReactNode
  description?: React.ReactNode
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size = 'md',
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      label,
      description,
      id,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked

    const generatedId = React.useId()
    const switchId = id || generatedId

    const toggle = () => {
      if (disabled) return
      const next = !isChecked
      if (!isControlled) {
        setUncontrolledChecked(next)
      }
      onCheckedChange?.(next)
    }

    const currentSize = size || 'md'
    const translateClass = thumbTranslate[currentSize][isChecked ? 'true' : 'false']

    const button = (
      <button
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        className={cn(
          switchTrackVariants({ size: currentSize, checked: isChecked }),
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            switchThumbVariants({ size: currentSize, checked: isChecked }),
            translateClass,
          )}
        />
      </button>
    )

    if (label || description) {
      return (
        <div
          className={cn(
            'inline-flex items-start gap-2.5 cursor-pointer select-none text-left',
            disabled && 'cursor-not-allowed opacity-50',
          )}
          onClick={toggle}
        >
          {button}
          <div className="flex flex-col leading-tight -mt-0.5">
            {label && (
              <span className="text-xs font-medium text-[var(--text)]">
                {label}
              </span>
            )}
            {description && (
              <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
                {description}
              </span>
            )}
          </div>
        </div>
      )
    }

    return button
  },
)

Switch.displayName = 'Switch'
