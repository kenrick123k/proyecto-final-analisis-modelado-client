import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export function Surface({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-surface border border-line bg-surface p-6 shadow-[0_1px_0_rgba(24,35,29,0.04)]',
        className,
      )}
      {...props}
    />
  );
}
