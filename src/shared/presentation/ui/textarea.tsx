'use client';

import { useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
}

export function Textarea({ label, hint, error, className, id, ...props }: TextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={cn(
          'min-h-32 w-full resize-y rounded-field border bg-surface px-4 py-3.5 text-base text-ink shadow-[inset_0_1px_0_rgba(24,35,29,0.03)] transition-colors duration-150 placeholder:text-ink-faint focus:border-primary focus:ring-2 focus:ring-focus/70 focus:ring-offset-2 focus:ring-offset-canvas focus-visible:outline-none',
          error ? 'border-danger' : 'border-line',
        )}
        {...props}
      />
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
