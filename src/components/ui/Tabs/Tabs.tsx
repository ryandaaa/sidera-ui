import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const Tabs = TabsPrimitive.Root

type TabsVariant = 'pills' | 'line'

const TabsListContext = React.createContext<{ variant: TabsVariant }>({
  variant: 'pills',
})

export const tabsListVariants = cva(
  'relative inline-flex items-center text-[var(--text-secondary)] select-none',
  {
    variants: {
      variant: {
        pills:
          'rounded-[var(--radius-xs)] bg-[var(--surface-raised)] border border-[var(--border)] p-0.5 gap-0.5',
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
>(({ className, variant = 'pills', children, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const isInitial = React.useRef(true)
  const [indicator, setIndicator] = React.useState<{
    left: number
    top: number
    width: number
    height: number
    visible: boolean
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  })

  const updateIndicator = React.useCallback(() => {
    const listEl = listRef.current
    if (!listEl) return

    const activeEl = listEl.querySelector<HTMLElement>(
      '[role="tab"][data-state="active"]',
    )
    if (!activeEl) {
      setIndicator((prev) => (prev.visible ? { ...prev, visible: false } : prev))
      return
    }

    const listRect = listEl.getBoundingClientRect()
    const activeRect = activeEl.getBoundingClientRect()

    setIndicator({
      left: activeRect.left - listRect.left,
      top: activeRect.top - listRect.top,
      width: activeRect.width,
      height: activeRect.height,
      visible: true,
    })
  }, [])

  React.useEffect(() => {
    const listEl = listRef.current
    if (!listEl) return

    updateIndicator()

    const observer = new MutationObserver(() => {
      updateIndicator()
    })
    observer.observe(listEl, {
      attributes: true,
      attributeFilter: ['data-state'],
      subtree: true,
    })

    const resizeObserver = new ResizeObserver(() => {
      updateIndicator()
    })
    resizeObserver.observe(listEl)

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        isInitial.current = false
      })
      return () => cancelAnimationFrame(raf2)
    })

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      cancelAnimationFrame(raf1)
    }
  }, [updateIndicator])

  const effectiveVariant = variant || 'pills'

  return (
    <TabsListContext.Provider value={{ variant: effectiveVariant }}>
      <TabsPrimitive.List
        ref={(node) => {
          listRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn(tabsListVariants({ variant: effectiveVariant, className }))}
        {...props}
      >
        {/* Animated Sliding Active Indicator */}
        {indicator.visible && (
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute z-0',
              !isInitial.current &&
                'transition-[left,width,top,height] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
              effectiveVariant === 'pills' &&
                'rounded-[var(--radius-xs)] bg-[var(--surface-overlay)] border border-[var(--border-strong)] shadow-2xs',
              effectiveVariant === 'line' &&
                'bottom-[-1px] h-[2px] bg-[var(--primary)]',
            )}
            style={{
              left: `${indicator.left}px`,
              width: `${indicator.width}px`,
              ...(effectiveVariant === 'pills'
                ? {
                    top: `${indicator.top}px`,
                    height: `${indicator.height}px`,
                  }
                : {}),
            }}
          />
        )}
        {children}
      </TabsPrimitive.List>
    </TabsListContext.Provider>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

export const tabsTriggerVariants = cva(
  [
    'relative z-10 inline-flex items-center justify-center whitespace-nowrap text-xs font-medium transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]',
    'disabled:pointer-events-none disabled:opacity-45',
  ],
  {
    variants: {
      variant: {
        pills:
          'px-2.5 py-1 rounded-[var(--radius-xs)] text-[var(--text-secondary)] data-[state=active]:text-[var(--text)] data-[state=active]:font-semibold hover:text-[var(--text)]',
        line:
          'px-1 py-2 text-[var(--text-secondary)] data-[state=active]:text-[var(--text)] data-[state=active]:font-semibold hover:text-[var(--text)]',
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
>(({ className, variant, ...props }, ref) => {
  const context = React.useContext(TabsListContext)
  const effectiveVariant = variant || context.variant || 'pills'

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant: effectiveVariant, className }))}
      {...props}
    />
  )
})
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
