import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'neutral' | 'success' | 'warning' | 'error' | 'outline'
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const base =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors'

  const variants = {
    default: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700/60',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    outline: 'border border-slate-700 text-slate-300',
  }

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  )
}
