export interface SidebarProps {
  currentRoute: string
  onRouteChange: (route: string) => void
}

interface NavItem {
  id: string
  label: string
  badge?: string
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const groups: NavGroup[] = [
  {
    title: 'Overview',
    items: [{ id: 'tokens', label: 'Design Tokens' }],
  },
  {
    title: 'Foundation',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'input', label: 'Input' },
      { id: 'field', label: 'Field' },
    ],
  },
  {
    title: 'Display',
    items: [
      { id: 'badge', label: 'Badge' },
      { id: 'card', label: 'Card' },
    ],
  },
  {
    title: 'Upcoming (Phase 2)',
    items: [
      { id: 'feedback', label: 'Feedback (Alert, Toast, Spinner)', badge: 'next' },
      { id: 'overlay', label: 'Overlay (Dialog, Popover, Menu)', badge: 'next' },
      { id: 'navigation', label: 'Navigation (Tabs, Breadcrumb)', badge: 'next' },
      { id: 'layout', label: 'Layout (Stack, Inline, PageHeader)', badge: 'next' },
    ],
  },
]

export function Sidebar({ currentRoute, onRouteChange }: SidebarProps) {
  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] min-h-[calc(100vh-40px)] flex flex-col p-3 select-none">
      <nav className="flex flex-col gap-5 text-xs">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-[var(--text-muted)] px-2">
              {group.title}
            </span>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = currentRoute === item.id
                const isUpcoming = Boolean(item.badge)

                if (isUpcoming) {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-2 py-1 text-[11px] text-[var(--text-tertiary)] cursor-not-allowed"
                    >
                      <span>{item.label.split(' ')[0]}</span>
                      <span className="text-[9px] font-mono text-[var(--text-muted)]">
                        soon
                      </span>
                    </div>
                  )
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onRouteChange(item.id)}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-[var(--radius-xs)] text-left text-xs transition-colors ${
                      isActive
                        ? 'bg-[var(--surface-overlay)] text-[var(--text)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-[var(--border)] text-[10px] text-[var(--text-muted)] px-2 space-y-1">
        <p className="font-mono">Dense &bull; Monochromatic</p>
        <p>WCAG AA Compliant</p>
      </div>
    </aside>
  )
}
