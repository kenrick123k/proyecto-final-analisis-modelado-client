import { cn } from '../../../../shared/presentation/utils/cn';

type GlyphVariant = 'casa' | 'departamento' | 'oficina' | 'local' | 'terreno';

function variantForTitle(title: string): GlyphVariant {
  const normalized = title.toLowerCase();
  if (normalized.includes('terreno')) return 'terreno';
  if (normalized.includes('local')) return 'local';
  if (normalized.includes('oficina')) return 'oficina';
  if (normalized.includes('departamento')) return 'departamento';
  return 'casa';
}

export function PropertyGlyph({ title, className }: { title: string; className?: string }) {
  const variant = variantForTitle(title);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 64 64"
      className={cn('h-12 w-12 shrink-0 text-line-strong', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {variant === 'casa' ? (
        <>
          <path d="M8 30 32 10l24 20" />
          <path d="M14 30v24h36V30" />
          <path d="M28 54V40h8v14" stroke="var(--accent)" />
          <path d="M18 36h7v7h-7z" />
          <path d="M44 20v-7h5v11" />
          <path d="M6 54h52" />
        </>
      ) : null}

      {variant === 'departamento' ? (
        <>
          <path d="M16 8h32v46H16z" />
          <path d="M16 18h32M16 28h32M16 38h32M16 48h32" />
          <path d="M22 12h6v3h-6zM36 22h6v3h-6zM22 32h6v3h-6zM36 42h6v3h-6z" />
          <path d="M28 54V44h8v10" stroke="var(--accent)" />
          <path d="M6 54h52" />
        </>
      ) : null}

      {variant === 'oficina' ? (
        <>
          <path d="M13 14h38v40H13z" />
          <path d="M13 24h38M13 34h38M13 44h38" />
          <path d="M20 18h8v3h-8zM36 18h8v3h-8zM20 28h8v3h-8zM36 28h8v3h-8zM20 38h8v3h-8zM36 38h8v3h-8z" />
          <path d="M28 54V48h8v6" stroke="var(--accent)" />
          <path d="M6 54h52" />
        </>
      ) : null}

      {variant === 'local' ? (
        <>
          <path d="M12 24h40v30H12z" />
          <path d="M12 24l5-9h30l5 9" />
          <path d="M20 24v10h24V24" stroke="var(--accent)" />
          <path d="M20 40h24M20 46h24" />
          <path d="M6 54h52" />
        </>
      ) : null}

      {variant === 'terreno' ? (
        <>
          <path d="M10 40 18 18l28-6 8 24-10 20H20z" />
          <path d="M18 18v-6M18 18H12M46 12v-5M54 36h6M46 56v5M20 56v5" />
          <path d="M24 44h14M24 38h18M24 32h20" stroke="var(--accent)" opacity="0.8" />
          <path d="M6 56h52" />
        </>
      ) : null}
    </svg>
  );
}
