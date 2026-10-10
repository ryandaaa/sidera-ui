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

  React.useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      },
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="w-56 shrink-0 hidden xl:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-8 pr-4 select-none">
      <div className="space-y-3">
        <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-[var(--text-muted)]">
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
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    setActiveId(item.id)
                  }
                }}
                className={`transition-colors py-0.5 leading-snug block truncate ${
                  item.level === 2 ? 'pl-2 text-[11px]' : ''
                } ${
                  isActive
                    ? 'text-[var(--text)] font-medium -ml-[13px] border-l-2 border-[var(--primary)] pl-2.5'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
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
