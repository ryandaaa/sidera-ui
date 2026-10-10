import * as React from 'react'

export interface TocItem {
  id: string
  label: string
  level?: number
}

export interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id || '')
  const isManualClickRef = React.useRef(false)
  const timeoutRef = React.useRef<number | undefined>(undefined)

  React.useEffect(() => {
    if (items.length === 0) return

    // Set first item as active initially if none
    if (!activeId && items[0]) {
      setActiveId(items[0].id)
    }

    const updateActiveSection = () => {
      if (isManualClickRef.current) return

      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // If scrolled to the bottom of the page, activate the last TOC section
      if (scrollY + windowHeight >= documentHeight - 50) {
        const lastItem = items[items.length - 1]
        if (lastItem) setActiveId(lastItem.id)
        return
      }

      // Find the last section whose top edge has scrolled past the top threshold
      // 120px threshold accounts for sticky header (48px) + comfortable viewing offset
      const offsetThreshold = 120
      let currentActive = items[0]?.id || ''

      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= offsetThreshold) {
            currentActive = items[i].id
          } else {
            break
          }
        }
      }

      setActiveId(currentActive)
    }

    updateActiveSection()

    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        updateActiveSection()
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [items, activeId])

  if (items.length === 0) return null

  return (
    <nav className="w-56 shrink-0 hidden xl:block sticky top-12 h-[calc(100vh-48px)] overflow-y-auto py-6 pr-4 select-none">
      <div className="space-y-3">
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)]">
          On this page
        </h4>

        <div className="border-l border-[var(--border)] pl-3 flex flex-col gap-1.5 text-xs">
          {items.map((item) => {
            const isActive = activeId === item.id

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.getElementById(item.id)
                  if (target) {
                    setActiveId(item.id)
                    isManualClickRef.current = true
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
                    timeoutRef.current = window.setTimeout(() => {
                      isManualClickRef.current = false
                    }, 800)
                  }
                }}
                className={`transition-colors duration-150 py-0.5 leading-snug block truncate ${
                  item.level === 2 ? 'pl-2 text-[11px]' : ''
                } ${
                  isActive
                    ? 'text-[var(--text)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
