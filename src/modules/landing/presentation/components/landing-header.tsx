import Link from 'next/link';
import { Logo } from '../../../../shared/presentation/brand/logo';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" aria-label="Tu Casa, inicio">
          <Logo />
        </Link>

        <nav aria-label="Navegación principal" className="flex items-center gap-7 text-sm">
          <a
            href="#vitrina"
            className="hidden text-ink-soft transition-colors hover:text-primary sm:block"
          >
            Propiedades
          </a>
          <a
            href="#como-funciona"
            className="hidden text-ink-soft transition-colors hover:text-primary sm:block"
          >
            Cómo funciona
          </a>
          <a
            href="#ciudades"
            className="hidden text-ink-soft transition-colors hover:text-primary md:block"
          >
            Ciudades
          </a>
          <a
            href="#vitrina"
            className="inline-flex min-h-11 items-center rounded-field bg-primary px-4 py-2.5 font-medium text-on-primary transition-colors hover:bg-primary-strong"
          >
            Ver propiedades
          </a>
        </nav>
      </div>
    </header>
  );
}
