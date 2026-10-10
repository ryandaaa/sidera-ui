import * as React from 'react'
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
      className={cn('flex flex-col gap-1 w-full text-left', className)}
      {...props}
    >
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={fieldId}
            className="text-xs font-medium text-[var(--text)] tracking-tight"
          >
            {label}
            {required && (
              <span className="text-[var(--danger)] ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
          {optional && (
            <span className="text-[11px] text-[var(--text-muted)] font-normal">
              Optional
            </span>
          )}
        </div>
      )}

      <div>
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
          className="text-[11px] text-[var(--danger)] leading-tight flex items-center gap-1 font-normal"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={hintId}
          className="text-[11px] text-[var(--text-secondary)] leading-tight font-normal"
        >
          {hint}
        </p>
      ) : null}
    </div>
  )
}
