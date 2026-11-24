import { Logo } from '../../../../shared/presentation/brand/logo';

export function LandingFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Inmobiliaria boliviana. Santa Cruz, La Paz y Tarija.
          </p>
        </div>

        <nav aria-label="Navegación del pie" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="#vitrina" className="text-ink-soft transition-colors hover:text-primary">
            Propiedades
          </a>
          <a href="#como-funciona" className="text-ink-soft transition-colors hover:text-primary">
            Cómo funciona
          </a>
          <a href="#ciudades" className="text-ink-soft transition-colors hover:text-primary">
            Ciudades
          </a>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-7xl border-t border-line px-6 py-5 text-xs leading-relaxed text-ink-faint">
        © 2026 Tu Casa. Inmuebles en Santa Cruz, La Paz y Tarija. Precios en bolivianos.
      </div>
    </footer>
  );
}
