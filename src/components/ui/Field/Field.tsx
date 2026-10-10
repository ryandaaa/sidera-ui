import * as React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  hint?: React.ReactNode
  error?: React.ReactNode
  optional?: boolean
  required?: boolean
  htmlFor?: string
  id?: string
}

export function Field({
  className,
  label,
  hint,
  error,
  optional,
  required,
  htmlFor,
  id,
  children,
  ...props
}: FieldProps) {
  const generatedId = React.useId()
  const fieldId = id || htmlFor || generatedId
  const hintId = `${fieldId}-hint`
  const errorId = `${fieldId}-error`

  return (
    <div
      className={cn('group flex flex-col gap-1.5 w-full text-left transition-all duration-200', className)}
      {...props}
    >
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={fieldId}
            className="text-xs font-medium text-[var(--text)] tracking-tight transition-colors duration-200 group-focus-within:text-[var(--primary)] flex items-center"
          >
            <span>{label}</span>
            {required && (
              <span
                className="text-[var(--danger)] ml-1 inline-block transition-transform duration-200 group-focus-within:scale-125"
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>
          {optional && (
            <span className="text-[11px] text-[var(--text-muted)] font-normal transition-opacity duration-200 group-focus-within:opacity-80">
              Optional
            </span>
          )}
        </div>
      )}

      <div className="relative transition-transform duration-200">
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<{ id?: string; hasError?: boolean; 'aria-describedby'?: string }>, {
              id: fieldId,
              hasError: Boolean(error),
              'aria-describedby': error
                ? errorId
                : hint
                ? hintId
                : undefined,
            })
          : children}
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-[11px] text-[var(--danger)] leading-tight flex items-center gap-1.5 font-normal animate-in fade-in-0 slide-in-from-top-1 duration-200 ease-out"
        >
          <AlertCircle className="h-3 w-3 shrink-0 stroke-[2] animate-in zoom-in-75 duration-200" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p
          id={hintId}
          className="text-[11px] text-[var(--text-muted)] leading-tight font-normal transition-colors duration-200 group-focus-within:text-[var(--text-secondary)]"
        >
          {hint}
        </p>
      ) : null}
    </div>
  )
}
