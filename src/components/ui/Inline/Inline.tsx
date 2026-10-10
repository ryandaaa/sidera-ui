import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const inlineVariants = cva('flex flex-row', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    gap: 'sm',
    align: 'center',
    justify: 'start',
    wrap: true,
  },
})

export interface InlineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineVariants> {
  as?: React.ElementType
}

export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      className,
      gap,
      align,
      justify,
      wrap,
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Comp = Component as any
    return (
      <Comp
        ref={ref}
        className={cn(inlineVariants({ gap, align, justify, wrap, className }))}
        {...props}
      />
    )
  },
)

Inline.displayName = 'Inline'
