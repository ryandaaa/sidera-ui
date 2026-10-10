import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

interface RadioGroupContextValue {
  name?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled,
      size = 'md',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const isControlled = controlledValue !== undefined
    const currentValue = isControlled ? controlledValue : uncontrolledValue

    const handleChange = React.useCallback(
      (val: string) => {
        if (!isControlled) {
          setUncontrolledValue(val)
        }
        onValueChange?.(val)
      },
      [isControlled, onValueChange],
    )

    return (
      <RadioGroupContext.Provider
        value={{
          name,
          value: currentValue,
          onChange: handleChange,
          disabled,
          size,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn('flex flex-col gap-2.5', className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'

export const radioCircleVariants = cva(
  [
    'shrink-0 rounded-full flex items-center justify-center border transition-all duration-100',
    'bg-[var(--surface)] border-[var(--border-strong)]',
    'group-hover:border-[var(--text-secondary)]',
    'group-focus-within:ring-2 group-focus-within:ring-[var(--focus-ring)] group-focus-within:ring-offset-1 group-focus-within:ring-offset-[var(--bg)]',
    'data-[state=checked]:border-[var(--primary)]',
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

export interface RadioItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioCircleVariants> {
  value: string
  label?: React.ReactNode
  description?: React.ReactNode
}

export const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  (
    {
      className,
      value,
      size: itemSize,
      disabled: itemDisabled,
      label,
      description,
      id,
      ...props
    },
    ref,
  ) => {
    const context = React.useContext(RadioGroupContext)
    const generatedId = React.useId()
    const inputId = id || generatedId

    const isChecked = context?.value === value
    const isDisabled = itemDisabled || context?.disabled
    const size = itemSize || context?.size || 'md'

    const dotSizeClass =
      size === 'sm' ? 'h-1.5 w-1.5' : size === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2'

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'group inline-flex items-start gap-2.5 cursor-pointer select-none text-left',
          isDisabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="radio"
          name={context?.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => context?.onChange?.(value)}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(radioCircleVariants({ size }))}
          data-state={isChecked ? 'checked' : 'unchecked'}
          data-disabled={isDisabled ? 'true' : 'false'}
        >
          {isChecked && (
            <span
              className={cn(
                'rounded-full bg-[var(--primary)]',
                dotSizeClass,
              )}
            />
          )}
        </div>
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

RadioItem.displayName = 'RadioItem'
