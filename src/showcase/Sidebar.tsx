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
  Globe,
  ExternalLink,
} from 'lucide-react'

import { CommandSearch } from '@/components/ui/CommandSearch'
import { searchComponents } from './searchIndex'
import { GithubIcon } from './icons/GithubIcon'
import { EXTERNAL_LINKS } from '@/config/links'

export interface SidebarProps {
  currentRoute: string
  onRouteChange: (route: string) => void
  width: number
  onWidthChange: (width: number) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
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

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim()
  if (!trimmed || !text) return <>{text}</>

  const words = trimmed.split(/\s+/).filter(Boolean)
  if (words.length === 0) return <>{text}</>

  const escapedWords = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi')
  const parts = text.split(regex)
  const lowerWords = new Set(words.map((w) => w.toLowerCase()))

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        if (lowerWords.has(part.toLowerCase())) {
          return (
            <span
              key={i}
              className="text-[var(--text)] font-semibold underline underline-offset-2 decoration-1 decoration-current"
            >
              {part}
            </span>
          )
        }
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}

export function Sidebar({
  currentRoute,
  onRouteChange,
  width,
  onWidthChange,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const searchResults = React.useMemo(() => {
    return searchComponents(searchQuery)
  }, [searchQuery])

  React.useEffect(() => {
    setSelectedIndex(0)
    itemRefs.current = []
  }, [searchQuery])

  React.useEffect(() => {
    if (isSearchOpen && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex, isSearchOpen])

  // Global Ctrl+K / Cmd+K shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isCollapsed) {
          onToggleCollapse()
        }
        setTimeout(() => {
          searchInputRef.current?.focus()
          setIsSearchOpen(true)
        }, 50)
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false)
        searchInputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCollapsed, onToggleCollapse])

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectRoute = (routeId: string) => {
    onRouteChange(routeId)
    setSearchQuery('')
    setIsSearchOpen(false)
    searchInputRef.current?.blur()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)

    const startX = e.clientX
    const startWidth = width

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX
      const newWidth = Math.min(Math.max(startWidth + delta, 200), 480)
      onWidthChange(newWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleDoubleClick = () => {
    onWidthChange(256) // Reset to standard default width (256px)
  }

  return (
    <aside
      style={{
        width: isCollapsed ? 0 : `${width}px`,
        transition: isDragging
          ? 'none'
          : 'width 200ms cubic-bezier(0.2, 0, 0, 1), opacity 150ms ease',
      }}
      className={`relative shrink-0 bg-[var(--surface)] h-[calc(100vh-3rem)] sticky top-12 overflow-hidden flex flex-col select-none ${
        isCollapsed
          ? 'border-r-0 opacity-0 pointer-events-none'
          : 'border-r border-[var(--border)] opacity-100'
      }`}
    >
      {/* Pinned Search Header at Top of Sidebar */}
      <div
        className="px-4 py-3 border-b border-[var(--border)] relative shrink-0 z-20"
        style={{ width: `${width}px` }}
      >
        <CommandSearch
          ref={searchInputRef}
          size="sm"
          placeholder="Search components..."
          shortcutKey="K"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setIsSearchOpen(true)
          }}
          onFocus={() => {
            if (searchQuery.trim()) setIsSearchOpen(true)
          }}
          onClear={() => {
            setSearchQuery('')
            setIsSearchOpen(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setIsSearchOpen(true)
              setSelectedIndex((prev) =>
                searchResults.length > 0 ? (prev + 1) % searchResults.length : 0,
              )
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setIsSearchOpen(true)
              setSelectedIndex((prev) =>
                searchResults.length > 0
                  ? (prev - 1 + searchResults.length) % searchResults.length
                  : 0,
              )
            } else if (e.key === 'Enter') {
              if (searchResults.length > 0 && searchResults[selectedIndex]) {
                e.preventDefault()
                handleSelectRoute(searchResults[selectedIndex].item.id)
              }
            } else if (e.key === 'Escape') {
              setIsSearchOpen(false)
              searchInputRef.current?.blur()
            }
          }}
        />

        {/* Live Search Results Dropdown within Sidebar */}
        {isSearchOpen && searchQuery.trim() && (
          <div
            ref={dropdownRef}
            className="absolute left-4 right-4 top-full mt-1.5 bg-[var(--surface-overlay)] border border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-overlay)] z-50 max-h-80 overflow-y-auto p-1 text-xs"
          >
            {searchResults.length === 0 ? (
              <div className="py-3 px-3 text-center text-[var(--text-muted)] text-xs font-mono">
                No components matching "{searchQuery}"
              </div>
            ) : (
              searchResults.map(({ item, matchSnippet }, index) => {
                const isSelected = index === selectedIndex
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[index] = el
                    }}
                    type="button"
                    onClick={() => handleSelectRoute(item.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex flex-col px-2.5 py-1.5 rounded-[var(--radius-xs)] text-left transition-colors cursor-pointer gap-0.5 ${
                      isSelected
                        ? 'bg-[var(--surface-raised)]'
                        : 'hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    {/* Line 1: Title (left) + Category (right) */}
                    <div className="flex items-center justify-between w-full gap-2">
                      <span
                        className={`text-xs truncate ${
                          isSelected
                            ? 'font-semibold text-[var(--text)]'
                            : 'font-medium text-[var(--text)]'
                        }`}
                      >
                        <HighlightMatch text={item.label} query={searchQuery} />
                      </span>
                      <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider shrink-0">
                        {item.group}
                      </span>
                    </div>

                    {/* Line 2: Context snippet with highlighted match */}
                    <div
                      className={`text-[11px] truncate leading-tight ${
                        isSelected
                          ? 'text-[var(--text-secondary)]'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      <HighlightMatch text={matchSnippet} query={searchQuery} />
                    </div>
                  </button>
                )
              })
            )}
          </div>
        )}
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 flex flex-col min-w-[200px]"
        style={{ width: `${width}px` }}
      >
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

      </div>

      {/* Pinned Sticky Footer at Bottom of Sidebar */}
      <div
        className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface)] shrink-0 z-20 flex flex-col gap-1"
        style={{ width: `${width}px` }}
      >
        {/* Link 1: Personal Web */}
        <a
          href={EXTERNAL_LINKS.personalSpace.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-[var(--radius-xs)] text-xs text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors group cursor-pointer"
          title={`Visit personal website (${EXTERNAL_LINKS.personalSpace.label})`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Globe className="h-3.5 w-3.5 shrink-0 stroke-[1.75] text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors" />
            <span className="truncate font-mono text-[11px]">{EXTERNAL_LINKS.personalSpace.label}</span>
          </div>
          <ExternalLink className="h-3 w-3 shrink-0 stroke-[1.75] text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors opacity-60 group-hover:opacity-100" />
        </a>

        {/* Link 2: GitHub Profile */}
        <a
          href={EXTERNAL_LINKS.githubProfile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-[var(--radius-xs)] text-xs text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors group cursor-pointer"
          title={`Visit GitHub profile (${EXTERNAL_LINKS.githubProfile.label})`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <GithubIcon className="h-3.5 w-3.5 shrink-0 stroke-[1.75] text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors" />
            <span className="truncate font-mono text-[11px]">{EXTERNAL_LINKS.githubProfile.label}</span>
          </div>
          <ExternalLink className="h-3 w-3 shrink-0 stroke-[1.75] text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors opacity-60 group-hover:opacity-100" />
        </a>
      </div>

      {/* Manual Resize Handle on Right Border */}
      {!isCollapsed && (
        <div
          role="separator"
          aria-orientation="vertical"
          title="Drag to resize sidebar (Double click to reset width)"
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
          className={`absolute top-0 right-0 bottom-0 w-2 cursor-col-resize z-20 group flex justify-end ${
            isDragging ? 'bg-[var(--border-strong)]' : 'hover:bg-[var(--surface-hover)]'
          }`}
        >
          <div
            className={`w-0.5 h-full transition-colors ${
              isDragging ? 'bg-[var(--text)]' : 'group-hover:bg-[var(--border-strong)]'
            }`}
          />
        </div>
      )}
    </aside>
  )
}
