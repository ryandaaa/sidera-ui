import * as React from 'react'
import {
  Palette,
  MousePointerClick,
  TextCursorInput,
  AlignLeft,
  ChevronsUpDown,
  CheckSquare,
  CircleDot,
  ToggleLeft,
  FileText,
  Shield,
  Tag,
  User,
  RectangleHorizontal,
  Table,
  ListCollapse,
  Code2,
  Keyboard,
  AlertCircle,
  Bell,
  Loader2,
  MessageSquare,
  AppWindow,
  Layers,
  Menu,
  Columns2,
  Navigation,
  Search,
  LayoutGrid,
} from 'lucide-react'

export interface SidebarProps {
  currentRoute: string
  onRouteChange: (route: string) => void
}

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const groups: NavGroup[] = [
  {
    title: 'Overview',
    items: [{ id: 'tokens', label: 'Design Tokens', icon: Palette }],
  },
  {
    title: 'Foundation',
    items: [
      { id: 'button', label: 'Button', icon: MousePointerClick },
      { id: 'input', label: 'Input', icon: TextCursorInput },
      { id: 'textarea', label: 'Textarea', icon: AlignLeft },
      { id: 'select', label: 'Select', icon: ChevronsUpDown },
      { id: 'checkbox', label: 'Checkbox', icon: CheckSquare },
      { id: 'radio', label: 'Radio', icon: CircleDot },
      { id: 'switch', label: 'Switch', icon: ToggleLeft },
      { id: 'field', label: 'Field', icon: FileText },
    ],
  },
  {
    title: 'Display',
    items: [
      { id: 'badge', label: 'Badge', icon: Shield },
      { id: 'tag', label: 'Tag', icon: Tag },
      { id: 'avatar', label: 'Avatar', icon: User },
      { id: 'card', label: 'Card', icon: RectangleHorizontal },
      { id: 'table', label: 'Table', icon: Table },
      { id: 'desc-list', label: 'Description List', icon: ListCollapse },
      { id: 'code-block', label: 'Code & Code Block', icon: Code2 },
      { id: 'display-utils', label: 'Kbd, Separator, Empty', icon: Keyboard },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { id: 'alert', label: 'Alert', icon: AlertCircle },
      { id: 'toast', label: 'Toast', icon: Bell },
      { id: 'progress-spinner', label: 'Progress & Spinner', icon: Loader2 },
      { id: 'tooltip', label: 'Tooltip', icon: MessageSquare },
    ],
  },
  {
    title: 'Overlay',
    items: [
      { id: 'dialog', label: 'Dialog', icon: AppWindow },
      { id: 'popover', label: 'Popover', icon: Layers },
      { id: 'dropdown-menu', label: 'Dropdown Menu', icon: Menu },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { id: 'tabs', label: 'Tabs', icon: Columns2 },
      { id: 'breadcrumb-pagination', label: 'Breadcrumb & Pages', icon: Navigation },
      { id: 'command-search', label: 'Command Search', icon: Search },
    ],
  },
  {
    title: 'Layout',
    items: [
      { id: 'layout', label: 'Layout Primitives', icon: LayoutGrid },
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
                const Icon = item.icon

                if (isUpcoming) {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-2.5 py-1.5 text-xs text-[var(--text-tertiary)] cursor-not-allowed"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-3.5 w-3.5 shrink-0 stroke-[1.75] opacity-40" />
                        <span>{item.label.split(' ')[0]}</span>
                      </div>
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
                    className={`group flex w-full items-center justify-between px-2.5 py-1.5 rounded-[var(--radius-xs)] text-left text-[13px] border transition-all duration-100 active:scale-[0.98] active:translate-y-[0.5px] select-none ${
                      isActive
                        ? 'bg-[var(--surface-raised)] border-[var(--border)] text-[var(--text)] font-semibold'
                        : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`h-3.5 w-3.5 shrink-0 stroke-[1.75] transition-colors duration-100 ${
                          isActive
                            ? 'text-[var(--text)]'
                            : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
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
