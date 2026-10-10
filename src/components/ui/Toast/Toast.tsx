import * as React from 'react'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface ToastData {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: 'default' | 'success' | 'danger' | 'warning'
  duration?: number
}

interface ToastContextValue {
  toasts: ToastData[]
  toast: (toast: Omit<ToastData, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = React.useCallback(
    ({ title, description, variant = 'default', duration = 4000 }: Omit<ToastData, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, title, description, variant, duration }])

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id)
        }, duration)
      }
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}

const toastIcons = {
  default: Info,
  success: CheckCircle2,
  danger: AlertCircle,
  warning: AlertCircle,
}

export function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastData[]
  onDismiss: (id: string) => void
}) {
  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((t) => {
        const IconComponent = toastIcons[t.variant || 'default']

        return (
          <div
            key={t.id}
            role="status"
            className={cn(
              'pointer-events-auto flex items-start gap-2.5 p-3 rounded-[var(--radius-sm)] border shadow-lg bg-[var(--surface-raised)] text-[var(--text)] transition-all animate-in slide-in-from-bottom-2 duration-150',
              t.variant === 'success' && 'border-[var(--success)]',
              t.variant === 'danger' && 'border-[var(--danger)]',
              t.variant === 'warning' && 'border-[var(--warning)]',
              t.variant === 'default' && 'border-[var(--border-strong)]',
            )}
          >
            <IconComponent
              className={cn(
                'h-4 w-4 shrink-0 mt-0.5',
                t.variant === 'success' && 'text-[var(--success)]',
                t.variant === 'danger' && 'text-[var(--danger)]',
                t.variant === 'warning' && 'text-[var(--warning)]',
                t.variant === 'default' && 'text-[var(--text-muted)]',
              )}
            />
            <div className="flex-1 min-w-0 leading-tight">
              {t.title && (
                <div className="text-xs font-semibold text-[var(--text)] tracking-tight">
                  {t.title}
                </div>
              )}
              {t.description && (
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-normal">
                  {t.description}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(t.id)}
              className="p-1 -mr-1 -mt-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus-visible:outline-none"
              aria-label="Close notification"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
