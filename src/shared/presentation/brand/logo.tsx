import { cn } from '../utils/cn';

interface LogoProps {
  tone?: 'brand' | 'ink';
  compact?: boolean;
  className?: string;
}

export function Logo({ tone = 'ink', compact = false, className }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3',
        tone === 'brand' ? 'text-brand-ink' : 'text-ink',
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M3.5 15.5 16 4.8l12.5 10.7" />
        <path d="M6.8 14.4v12.3h18.4V14.4" />
        <path d="M12.8 26.7v-7.5h6.4v7.5" stroke="var(--brand-accent)" />
      </svg>
      {compact ? (
        <span className="sr-only">Tu Casa</span>
      ) : (
        <span className="font-display text-[1.35rem] leading-none tracking-[-0.02em]">tu casa</span>
      )}
    </span>
  );
}
