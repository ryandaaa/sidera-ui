import { Sun, Moon, Maximize2, Minimize2, Menu } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface TopBarProps {
  theme: 'dark' | 'light'
  onThemeChange: (theme: 'dark' | 'light') => void
  density: 'compact' | 'comfortable'
  onDensityChange: (density: 'compact' | 'comfortable') => void
  brand: 'default' | 'cloudflare' | 'linear'
  onBrandChange: (brand: 'default' | 'cloudflare' | 'linear') => void
  zoom: '100%' | '110%' | '125%'
  onZoomChange: (zoom: '100%' | '110%' | '125%') => void
  isSidebarCollapsed: boolean
  onToggleSidebar: () => void
}

export function TopBar({
  theme,
  onThemeChange,
  density,
  onDensityChange,
  brand,
  onBrandChange,
  zoom,
  onZoomChange,
  isSidebarCollapsed,
  onToggleSidebar,
}: TopBarProps) {
  return (
    <header className="h-12 border-b border-[var(--border)] bg-[var(--surface)] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Sidebar Hamburger Toggle Button */}
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
          className="flex items-center gap-2.5 text-[var(--text)] font-semibold text-sm tracking-tight hover:opacity-80 transition-opacity"
        >
          <div className="h-5 w-5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius-xs)] flex items-center justify-center font-mono text-[10px] font-bold">
            S
          </div>
          <span>SIDERA UI</span>
        </a>
        <span className="font-mono text-xs text-[var(--text-muted)] hidden sm:inline-block">
          v0.1.0
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Borderless Brand Switcher */}
        <div className="flex items-center gap-0.5 text-xs">
          <button
            type="button"
            onClick={() => onBrandChange('default')}
            className={`px-2.5 py-1 rounded-[var(--radius-xs)] text-xs transition-colors ${
              brand === 'default'
                ? 'text-[var(--text)] font-semibold bg-[var(--surface-hover)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Monochrome
          </button>
          <button
            type="button"
            onClick={() => onBrandChange('cloudflare')}
            className={`px-2.5 py-1 rounded-[var(--radius-xs)] text-xs transition-colors flex items-center gap-1.5 ${
              brand === 'cloudflare'
                ? 'text-[var(--text)] font-semibold bg-[var(--surface-hover)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: '#f6821f' }}
              aria-hidden="true"
            />
            Cloudflare
          </button>
          <button
            type="button"
            onClick={() => onBrandChange('linear')}
            className={`px-2.5 py-1 rounded-[var(--radius-xs)] text-xs transition-colors flex items-center gap-1.5 ${
              brand === 'linear'
                ? 'text-[var(--text)] font-semibold bg-[var(--surface-hover)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: '#5e6ad2' }}
              aria-hidden="true"
            />
            Linear
          </button>
        </div>

        <div className="h-3.5 w-px bg-[var(--border)] mx-1" aria-hidden="true" />

        {/* UI Zoom Controller */}
        <div className="flex items-center gap-0.5 text-xs font-mono">
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

        <div className="h-3.5 w-px bg-[var(--border)] mx-1" aria-hidden="true" />

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
          <span className="capitalize">{density}</span>
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
          <span className="capitalize">{theme}</span>
        </Button>
      </div>
    </header>
  )
}
