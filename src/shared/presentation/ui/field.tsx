'use client';

import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  hint?: string;
  error?: string;
  trailing?: ReactNode;
  className?: string;
}

export function Field({ label, hint, error, trailing, className, id, ...props }: FieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full rounded-field border bg-surface px-4 py-3.5 text-base text-ink shadow-[inset_0_1px_0_rgba(24,35,29,0.03)] transition-colors duration-150 placeholder:text-ink-faint focus-visible:outline-none',
            'focus:border-primary focus:ring-2 focus:ring-focus/70 focus:ring-offset-2 focus:ring-offset-canvas',
            error ? 'border-danger' : 'border-line',
            trailing ? 'pr-20' : undefined,
          )}
          {...props}
        />
        {trailing ? (
          <div className="absolute inset-y-0 right-2 flex items-center">{trailing}</div>
        ) : null}
      </div>
      {hint ? (
        <p id={hintId} className="text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
