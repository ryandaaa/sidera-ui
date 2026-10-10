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
      { id: 'textarea', label: 'Textarea' },
      { id: 'select', label: 'Select' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio', label: 'Radio' },
      { id: 'switch', label: 'Switch' },
      { id: 'field', label: 'Field' },
    ],
  },
  {
    title: 'Display',
    items: [
      { id: 'badge', label: 'Badge' },
      { id: 'tag', label: 'Tag' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'card', label: 'Card' },
      { id: 'table', label: 'Table' },
      { id: 'desc-list', label: 'Description List' },
      { id: 'code-block', label: 'Code & Code Block' },
      { id: 'display-utils', label: 'Kbd, Separator, Empty' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { id: 'alert', label: 'Alert' },
      { id: 'toast', label: 'Toast' },
      { id: 'progress-spinner', label: 'Progress & Spinner' },
      { id: 'tooltip', label: 'Tooltip' },
    ],
  },
  {
    title: 'Overlay',
    items: [
      { id: 'dialog', label: 'Dialog' },
      { id: 'popover', label: 'Popover' },
      { id: 'dropdown-menu', label: 'Dropdown Menu' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { id: 'tabs', label: 'Tabs' },
      { id: 'breadcrumb-pagination', label: 'Breadcrumb & Pages' },
      { id: 'command-search', label: 'Command Search' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { id: 'layout', label: 'Layout Primitives' },
    ],
  },
]

export function Sidebar({ currentRoute, onRouteChange }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] h-[calc(100vh-48px)] sticky top-12 overflow-y-auto flex flex-col p-4 select-none">
      <nav className="flex flex-col gap-6 text-[13px]">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-1.5">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text)] px-2.5">
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
                      className="flex items-center justify-between px-2.5 py-1.5 text-xs text-[var(--text-tertiary)] cursor-not-allowed"
                    >
                      <span>{item.label.split(' ')[0]}</span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
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
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-[var(--radius-xs)] text-left text-[13px] transition-colors ${
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
