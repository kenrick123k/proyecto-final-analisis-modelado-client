import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-strong active:translate-y-px disabled:hover:bg-primary',
  outline:
    'border border-line-strong bg-transparent text-ink hover:border-primary hover:text-primary disabled:hover:border-line-strong disabled:hover:text-ink',
  ghost: 'bg-transparent text-ink-soft hover:text-ink',
};

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-field px-5 py-3 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
