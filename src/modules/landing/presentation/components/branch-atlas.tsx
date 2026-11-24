import type { LandingFiltro } from '../../domain/entities/landing-publicacion';
import { PREFERRED_BRANCH_ORDER, profileForBranch } from '../landing-content';

export function BranchAtlas({
  sucursales,
  onSelectBranch,
}: {
  sucursales?: LandingFiltro[];
  onSelectBranch: (sucursalId: string) => void;
}) {
  return (
    <section id="ciudades" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(2.1rem,4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.03em]">
            Elige tu ciudad
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            La altura cambia el clima, la luz y la forma de construir. También cambia la manera de
            buscar casa. Mira lo que hay disponible en cada ciudad.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {PREFERRED_BRANCH_ORDER.map((nombre) => {
            const profile = profileForBranch(nombre);
            if (!profile) {
              return null;
            }
            const sucursalId = sucursales?.find((sucursal) => sucursal.nombre === nombre)?.id;

            return (
              <article key={nombre} className="flex flex-col border-t border-line pt-5">
                <h3 className="font-display text-3xl leading-tight tracking-[-0.025em]">{nombre}</h3>
                <p className="mt-1 text-sm text-accent-strong">{profile.altitud}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{profile.descripcion}</p>
                {sucursalId ? (
                  <button
                    type="button"
                    onClick={() => onSelectBranch(sucursalId)}
                    className="mt-6 inline-flex min-h-11 self-start border-b border-line-strong text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
                  >
                    Ver propiedades en {nombre}
                  </button>
                ) : (
                  <a
                    href="#vitrina"
                    className="mt-6 inline-flex min-h-11 self-start border-b border-line-strong text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
                  >
                    Ver propiedades
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
