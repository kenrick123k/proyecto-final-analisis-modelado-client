import type { ReactNode } from 'react';

export function PublicacionesShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">Publicaciones</p>
          <h1 className="mt-2 font-display text-[clamp(2.1rem,4.4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      <div className="mt-10">{children}</div>
    </div>
  );
}
