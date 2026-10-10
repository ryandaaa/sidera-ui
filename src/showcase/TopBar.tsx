import * as React from 'react'
import { Sun, Moon, Maximize2, Minimize2, Menu } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CommandSearch } from '@/components/ui/CommandSearch'

export interface TopBarProps {
  theme: 'dark' | 'light'
  onThemeChange: (theme: 'dark' | 'light') => void
  density: 'compact' | 'comfortable'
  onDensityChange: (density: 'compact' | 'comfortable') => void
  brand?: 'default' | 'cloudflare' | 'linear'
  onBrandChange?: (brand: 'default' | 'cloudflare' | 'linear') => void
  zoom: '100%' | '110%' | '125%'
  onZoomChange: (zoom: '100%' | '110%' | '125%') => void
  isSidebarCollapsed: boolean
  onToggleSidebar: () => void
  onRouteChange?: (route: string) => void
}

const searchableItems = [
  { id: 'tokens', label: 'Design Tokens', group: 'Overview' },
  { id: 'button', label: 'Button', group: 'Foundation' },
  { id: 'input', label: 'Input', group: 'Foundation' },
  { id: 'textarea', label: 'Textarea', group: 'Foundation' },
  { id: 'select', label: 'Select', group: 'Foundation' },
  { id: 'checkbox', label: 'Checkbox', group: 'Foundation' },
  { id: 'radio', label: 'Radio', group: 'Foundation' },
  { id: 'switch', label: 'Switch', group: 'Foundation' },
  { id: 'field', label: 'Field', group: 'Foundation' },
  { id: 'badge', label: 'Badge', group: 'Display' },
  { id: 'tag', label: 'Tag', group: 'Display' },
  { id: 'avatar', label: 'Avatar', group: 'Display' },
  { id: 'card', label: 'Card', group: 'Display' },
  { id: 'table', label: 'Table', group: 'Display' },
  { id: 'desc-list', label: 'Description List', group: 'Display' },
  { id: 'code-block', label: 'Code & Code Block', group: 'Display' },
  { id: 'display-utils', label: 'Kbd, Separator, Empty', group: 'Display' },
  { id: 'alert', label: 'Alert', group: 'Feedback' },
  { id: 'toast', label: 'Toast', group: 'Feedback' },
  { id: 'progress-spinner', label: 'Progress & Spinner', group: 'Feedback' },
  { id: 'tooltip', label: 'Tooltip', group: 'Feedback' },
  { id: 'dialog', label: 'Dialog', group: 'Overlay' },
  { id: 'popover', label: 'Popover', group: 'Overlay' },
  { id: 'dropdown-menu', label: 'Dropdown Menu', group: 'Overlay' },
  { id: 'tabs', label: 'Tabs', group: 'Navigation' },
  { id: 'breadcrumb-pagination', label: 'Breadcrumb & Pages', group: 'Navigation' },
  { id: 'command-search', label: 'Command Search', group: 'Navigation' },
  { id: 'layout', label: 'Layout Primitives', group: 'Layout' },
]

export function TopBar({
  theme,
  onThemeChange,
  density,
  onDensityChange,
  zoom,
  onZoomChange,
  isSidebarCollapsed,
  onToggleSidebar,
  onRouteChange,
}: TopBarProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Filter components by search query
  const filteredItems = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return []
    return searchableItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q),
    )
  }, [searchQuery])

  // Global Ctrl+K / Cmd+K shortcut to focus search input
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
        setIsSearchOpen(true)
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false)
        searchInputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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
    onRouteChange?.(routeId)
    setSearchQuery('')
    setIsSearchOpen(false)
    searchInputRef.current?.blur()
  }

  return (
    <header className="h-12 border-b border-[var(--border)] bg-[var(--surface)] pl-2.5 pr-4 sm:pr-6 flex items-center justify-between sticky top-0 z-30 select-none gap-3">
      {/* Left: Sidebar Toggle, Title (sidera-ui), and Version Tag */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="h-7 w-7 rounded-[var(--radius-xs)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors active:scale-95 cursor-pointer"
          title={isSidebarCollapsed ? 'Expand sidebar (Ctrl+B)' : 'Collapse sidebar (Ctrl+B)'}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu className="h-4 w-4 stroke-[1.75]" />
        </button>

        <a
          href="#tokens"
          className="text-[var(--text)] font-semibold text-sm tracking-tight hover:opacity-80 transition-opacity"
        >
          sidera-ui
        </a>
        <span className="font-mono text-[11px] text-[var(--text-muted)] ml-1 hidden sm:inline-block select-none">
          v0.1.0
        </span>
      </div>

      {/* Center: Full-width responsive Command Search bar */}
      <div className="flex-1 max-w-2xl mx-4 sm:mx-8 md:mx-12 relative min-w-[140px]">
        <CommandSearch
          ref={searchInputRef}
          size="sm"
          placeholder="Search components... (Ctrl+K)"
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
            if (e.key === 'Enter' && filteredItems.length > 0) {
              e.preventDefault()
              handleSelectRoute(filteredItems[0].id)
            }
          }}
        />

        {/* Live Search Results Dropdown */}
        {isSearchOpen && searchQuery.trim() && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full mt-1.5 bg-[var(--surface-overlay)] border border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-overlay)] z-50 max-h-72 overflow-y-auto p-1 text-xs"
          >
            {filteredItems.length === 0 ? (
              <div className="py-3 px-3 text-center text-[var(--text-muted)] text-xs font-mono">
                No components matching "{searchQuery}"
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectRoute(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-[var(--radius-xs)] text-left hover:bg-[var(--surface-hover)] transition-colors ${
                    index === 0
                      ? 'bg-[var(--surface-raised)] text-[var(--text)] font-medium'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                  }`}
                >
                  <span className="font-medium text-[var(--text)]">{item.label}</span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                    {item.group}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Right: Controls (Zoom, Density, Theme) */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* UI Zoom Controller */}
        <div className="flex items-center gap-0.5 text-xs font-mono hidden sm:flex">
          {(['100%', '110%', '125%'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onZoomChange(level)}
              className={`px-2 py-0.5 rounded-[var(--radius-xs)] text-[11px] transition-colors ${
                zoom === level
                  ? 'text-[var(--text)] font-semibold bg-[var(--surface-hover)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
              title={`Scale UI to ${level}`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="h-3.5 w-px bg-[var(--border)] mx-1 hidden sm:block" aria-hidden="true" />

        {/* Borderless Density Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            onDensityChange(density === 'compact' ? 'comfortable' : 'compact')
          }
          leftIcon={
            density === 'compact' ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )
          }
          title={`Switch to ${density === 'compact' ? 'comfortable' : 'compact'} density`}
        >
          <span className="capitalize hidden md:inline">{density}</span>
        </Button>

        {/* Borderless Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
          leftIcon={
            theme === 'dark' ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )
          }
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="capitalize hidden md:inline">{theme}</span>
        </Button>
      </div>
    </header>
  )
}
