import * as React from 'react'
import { Check, Minus } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const checkboxBoxVariants = cva(
  [
    'peer shrink-0 flex items-center justify-center',
    'rounded-[var(--radius-xs)] border transition-all duration-100',
    'bg-[var(--surface)] border-[var(--border-strong)]',
    'group-hover:border-[var(--text-secondary)]',
    'group-focus-within:ring-2 group-focus-within:ring-[var(--focus-ring)] group-focus-within:ring-offset-1 group-focus-within:ring-offset-[var(--bg)]',
    'data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)] data-[state=checked]:text-[var(--primary-foreground)]',
    'data-[state=indeterminate]:bg-[var(--primary)] data-[state=indeterminate]:border-[var(--primary)] data-[state=indeterminate]:text-[var(--primary-foreground)]',
    'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-45',
  ],
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
    VariantProps<typeof checkboxBoxVariants> {
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: React.ReactNode
  description?: React.ReactNode
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = 'md',
      checked = false,
      indeterminate = false,
      onCheckedChange,
      disabled,
      label,
      description,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(indeterminate)
      }
    }, [indeterminate])

    const state = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'

    const iconSizeClass = size === 'sm' ? 'h-2.5 w-2.5' : size === 'lg' ? 'h-3.5 w-3.5' : 'h-3 w-3'

    const content = (
      <div
        className={cn(
          checkboxBoxVariants({ size }),
          className,
        )}
        data-state={state}
        data-disabled={disabled ? 'true' : 'false'}
      >
        {indeterminate ? (
          <Minus className={cn(iconSizeClass, 'stroke-[2.5]')} />
        ) : checked ? (
          <Check className={cn(iconSizeClass, 'stroke-[2.5]')} />
        ) : null}
      </div>
    )

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'group inline-flex items-start gap-2.5 cursor-pointer select-none text-left',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="sr-only"
          {...props}
        />
        {content}
        {(label || description) && (
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
        )}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
