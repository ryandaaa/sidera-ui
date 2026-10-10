import { Sun, Moon, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface TopBarProps {
  theme: 'dark' | 'light'
  onThemeChange: (theme: 'dark' | 'light') => void
  density: 'compact' | 'comfortable'
  onDensityChange: (density: 'compact' | 'comfortable') => void
  brand: 'default' | 'linear'
  onBrandChange: (brand: 'default' | 'linear') => void
}

export function TopBar({
  theme,
  onThemeChange,
  density,
  onDensityChange,
  brand,
  onBrandChange,
}: TopBarProps) {
  return (
    <header className="h-12 border-b border-[var(--border)] bg-[var(--surface)] px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      <div className="flex items-center gap-3">
        <a
          href="#tokens"
          className="flex items-center gap-2.5 text-[var(--text)] font-semibold text-sm tracking-tight hover:opacity-80 transition-opacity"
        >
          <div className="h-5 w-5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius-xs)] flex items-center justify-center font-mono text-[10px] font-bold">
            S
          </div>
          <span>SIDERA UI</span>
        </a>
        <span className="font-mono text-xs text-[var(--text-muted)]">
          v0.1.0
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Brand Theme Switcher */}
        <div className="flex items-center border border-[var(--border-strong)] rounded-[var(--radius-xs)] bg-[var(--bg)] p-0.5 text-[11px]">
          <span className="text-[10px] text-[var(--text-muted)] px-1.5 font-mono uppercase tracking-wider">
            Brand
          </span>
          <button
            type="button"
            onClick={() => onBrandChange('default')}
            className={`px-2 py-0.5 rounded-[var(--radius-none)] transition-colors ${
              brand === 'default'
                ? 'bg-[var(--surface-overlay)] text-[var(--text)] font-medium shadow-none'
                : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
            }`}
          >
            Monochrome
          </button>
          <button
            type="button"
            onClick={() => onBrandChange('linear')}
            className={`px-2 py-0.5 rounded-[var(--radius-none)] transition-colors flex items-center gap-1 ${
              brand === 'linear'
                ? 'bg-[var(--surface-overlay)] text-[var(--text)] font-medium'
                : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
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

        {/* Density Toggle */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            onDensityChange(density === 'compact' ? 'comfortable' : 'compact')
          }
          leftIcon={
            density === 'compact' ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )
          }
          title={`Switch to ${density === 'compact' ? 'comfortable' : 'compact'} density`}
        >
          <span className="capitalize">{density}</span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
          leftIcon={
            theme === 'dark' ? (
              <Sun className="h-3 w-3" />
            ) : (
              <Moon className="h-3 w-3" />
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
