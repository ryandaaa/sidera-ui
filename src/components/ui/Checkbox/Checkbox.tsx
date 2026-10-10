import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const checkboxBoxVariants = cva(
  [
    'peer shrink-0 flex items-center justify-center',
    'rounded-[var(--radius-xs)] border transition-all duration-200 ease-out active:scale-90',
    'group-focus-within:ring-2 group-focus-within:ring-[var(--focus-ring)] group-focus-within:ring-offset-1 group-focus-within:ring-offset-[var(--bg)]',
    'data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)] data-[state=checked]:text-[var(--primary-foreground)]',
    'data-[state=indeterminate]:bg-[var(--primary)] data-[state=indeterminate]:border-[var(--primary)] data-[state=indeterminate]:text-[var(--primary-foreground)]',
    'data-[state=unchecked]:bg-transparent data-[state=unchecked]:border-[var(--border-strong)] group-hover:data-[state=unchecked]:border-[var(--border-hover)]',
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

    const svgSizeClass = size === 'sm' ? 'h-2.5 w-2.5' : size === 'lg' ? 'h-3.5 w-3.5' : 'h-3 w-3'

    const content = (
      <div
        className={cn(
          checkboxBoxVariants({ size }),
          className,
        )}
        data-state={state}
        data-disabled={disabled ? 'true' : 'false'}
      >
        <svg
          viewBox="0 0 16 16"
          className={cn(
            'overflow-visible select-none pointer-events-none fill-none',
            svgSizeClass,
          )}
          aria-hidden="true"
        >
          {/* Indeterminate Minus Bar */}
          <path
            d="M3.5 8h9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ transformOrigin: '8px 8px' }}
            className={cn(
              'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
              indeterminate
                ? 'scale-100 opacity-100'
                : 'scale-0 opacity-0 pointer-events-none',
            )}
          />
          {/* Checkmark with SVG Dashoffset Path Draw & Spring Pop */}
          <path
            d="M3.5 8.25L6.5 11.25L12.5 4.75"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="16"
            style={{ transformOrigin: '8px 8px' }}
            className={cn(
              'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
              !indeterminate && checked
                ? '[stroke-dashoffset:0] scale-100 opacity-100 rotate-0'
                : '[stroke-dashoffset:16] scale-50 opacity-0 -rotate-12 pointer-events-none',
            )}
          />
        </svg>
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
