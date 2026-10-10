import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const stackVariants = cva('flex flex-col w-full', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    divider: {
      true: 'divide-y divide-[var(--border)]',
      false: '',
    },
  },
  defaultVariants: {
    gap: 'md',
    align: 'stretch',
    divider: false,
  },
})

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap, align, divider, as: Component = 'div', ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Comp = Component as any
    return (
      <Comp
        ref={ref}
        className={cn(stackVariants({ gap, align, divider, className }))}
        {...props}
      />
    )
  },
)

Stack.displayName = 'Stack'
