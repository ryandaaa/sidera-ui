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
          'group relative flex items-center w-full',
          disabled && 'opacity-40 pointer-events-none',
          className,
        )}
      >
        <Search className="absolute left-0 h-3.5 w-3.5 pointer-events-none text-[var(--text-muted)] group-focus-within:text-[var(--text)] transition-colors duration-150" />
        <input
          ref={ref}
          type="text"
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          style={{ outline: 'none', ...props.style }}
          className={cn(
            'flex w-full select-text text-[var(--text)] bg-transparent',
            'border-0 border-b border-[var(--border)] rounded-none',
            'pl-6 pr-14 placeholder:text-[var(--text-muted)]',
            'transition-colors duration-150',
            'hover:border-[var(--text-secondary)]',
            'outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0',
            size === 'sm'
              ? 'h-[var(--control-h-sm)] text-[11px] pb-1 pt-1'
              : 'h-[var(--control-h-md)] text-xs pb-1.5 pt-1.5',
          )}
          {...props}
        />

        <div className="absolute right-0 flex items-center gap-1.5">
          {currentValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
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

        {/* Smooth animated active bottom line */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--primary)] pointer-events-none origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)]"
        />
      </div>
    )
  },
)

CommandSearch.displayName = 'CommandSearch'
