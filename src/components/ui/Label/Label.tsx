import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const labelVariants = cva(
  'font-medium text-[var(--text)] tracking-tight select-none leading-none inline-flex items-center gap-1 cursor-default',
  {
    variants: {
      size: {
        sm: 'text-[11px]',
        md: 'text-xs',
        lg: 'text-sm',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  },
)

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size, disabled, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ size, disabled, className }))}
        {...props}
      >
        {children}
        {required && (
          <span className="text-[var(--danger)] text-xs font-normal" aria-hidden="true">
            *
          </span>
        )}
      </label>
    )
  },
)

Label.displayName = 'Label'
