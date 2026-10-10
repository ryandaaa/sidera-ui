import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const Tabs = TabsPrimitive.Root

export const tabsListVariants = cva(
  'inline-flex items-center text-[var(--text-secondary)] select-none',
  {
    variants: {
      variant: {
        pills: 'rounded-[var(--radius-xs)] bg-[var(--surface-raised)] border border-[var(--border)] p-0.5 gap-0.5',
        line: 'w-full justify-start border-b border-[var(--border)] gap-4 p-0',
      },
    },
    defaultVariants: {
      variant: 'pills',
    },
  },
)

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = 'pills', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, className }))}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

export const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap text-xs font-medium transition-all duration-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]',
    'disabled:pointer-events-none disabled:opacity-45',
  ],
  {
    variants: {
      variant: {
        pills:
          'px-2.5 py-1 rounded-[var(--radius-xs)] data-[state=active]:bg-[var(--surface-overlay)] data-[state=active]:text-[var(--text)] data-[state=active]:font-semibold hover:text-[var(--text)]',
        line:
          'px-1 py-2 border-b-2 border-transparent -mb-px data-[state=active]:border-[var(--primary)] data-[state=active]:text-[var(--text)] data-[state=active]:font-semibold hover:text-[var(--text)]',
      },
    },
    defaultVariants: {
      variant: 'pills',
    },
  },
)

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant = 'pills', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, className }))}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName
