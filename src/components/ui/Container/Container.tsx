import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const containerVariants = cva('w-full mx-auto px-4 sm:px-6', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    size: 'xl',
  },
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, as: Component = 'div', ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Comp = Component as any
    return (
      <Comp
        ref={ref}
        className={cn(containerVariants({ size, className }))}
        {...props}
      />
    )
  },
)

Container.displayName = 'Container'
