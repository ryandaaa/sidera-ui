import * as React from 'react'
import { Sun, Moon, Maximize2, Minimize2, Menu } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CommandSearch } from '@/components/ui/CommandSearch'
import { searchComponents } from './searchIndex'

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
              className="text-[var(--text)] font-semibold bg-[var(--surface-active)] px-0.5 rounded-[2px] underline underline-offset-2 decoration-1 decoration-current"
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
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  // Enhanced search across labels, aliases, descriptions, and subcomponents
  const searchResults = React.useMemo(() => {
    return searchComponents(searchQuery)
  }, [searchQuery])

  // Reset selected index and item refs when search query updates
  React.useEffect(() => {
    setSelectedIndex(0)
    itemRefs.current = []
  }, [searchQuery])

  // Scroll selected item into view on keyboard navigation
  React.useEffect(() => {
    if (isSearchOpen && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex, isSearchOpen])

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

        {/* Live Search Results Dropdown */}
        {isSearchOpen && searchQuery.trim() && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full mt-1.5 bg-[var(--surface-overlay)] border border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-overlay)] z-50 max-h-80 overflow-y-auto p-1 text-xs"
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
                    className={`w-full flex flex-col px-3 py-1.5 rounded-[var(--radius-xs)] text-left transition-colors cursor-pointer gap-0.5 ${
                      isSelected
                        ? 'bg-[var(--surface-raised)]'
                        : 'hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    {/* Line 1: Component Title (Left) + Category (Right) */}
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
                      <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider shrink-0">
                        {item.group}
                      </span>
                    </div>

                    {/* Line 2: Matched location & context snippet */}
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
