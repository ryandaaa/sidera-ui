import * as React from 'react'
import { Search, X } from 'lucide-react'
import { Kbd } from '@/components/ui/Kbd'
import { cn } from '@/lib/cn'

export interface CommandSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  shortcutKey?: string
  size?: 'sm' | 'md'
  onClear?: () => void
}

export const CommandSearch = React.forwardRef<HTMLInputElement, CommandSearchProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      onClear,
      placeholder = 'Search or jump to...',
      shortcutKey = 'K',
      size = 'md',
      disabled,
      ...props
    },
    ref,
  ) => {
    const [innerValue, setInnerValue] = React.useState(defaultValue || '')
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : innerValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInnerValue(e.target.value)
      }
      onChange?.(e)
    }

    const handleClear = () => {
      if (!isControlled) {
        setInnerValue('')
      }
      onClear?.()
    }

    return (
      <div
        className={cn(
          'relative flex items-center w-full',
          disabled && 'opacity-45 pointer-events-none',
          className,
        )}
      >
        <Search className="absolute left-2.5 h-3.5 w-3.5 pointer-events-none text-[var(--text-muted)]" />
        <input
          ref={ref}
          type="text"
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'flex w-full select-text text-xs text-[var(--text)] bg-[var(--surface-raised)]',
            'rounded-[var(--radius-sm)] border border-[var(--border-strong)] pl-8 pr-16',
            'placeholder:text-[var(--text-muted)] transition-colors duration-100',
            'hover:border-[var(--text-secondary)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:border-transparent',
            size === 'sm' ? 'h-[var(--control-h-sm)] text-[11px]' : 'h-[var(--control-h-md)] text-xs',
          )}
          {...props}
        />
        <div className="absolute right-2 flex items-center gap-1">
          {currentValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          {shortcutKey && (
            <div className="hidden sm:flex items-center gap-0.5">
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">{shortcutKey}</Kbd>
            </div>
          )}
        </div>
      </div>
    )
  },
)

CommandSearch.displayName = 'CommandSearch'
