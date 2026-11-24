import styles from './landing.module.css';
import { AltitudeProfile } from './altitude-profile';
import { BRANCH_PROFILES } from '../landing-content';

export function LandingHero({ publishedCount }: { publishedCount: number | null }) {
  return (
    <section className="relative overflow-hidden bg-brand-field text-brand-ink">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 pb-14 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-10 lg:pb-20 lg:pt-24">
        <div className={styles.heroReveal}>
          <h1 className="max-w-[16ch] font-display text-[clamp(3rem,5.6vw,5rem)] font-light leading-[0.98] tracking-[-0.045em]">
            <span className="block">Tres ciudades.</span>{" "}
            <span className="block">Tu próxima casa.</span>
          </h1>
          <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-brand-ink-soft">
            Casas, departamentos, oficinas y locales en Santa Cruz, La Paz y Tarija. Mira el precio,
            lee la ficha y pide que la sucursal de esa ciudad te contacte.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#vitrina"
              className="inline-flex min-h-12 items-center rounded-field bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-field transition-colors hover:bg-brand-ink"
            >
              Ver propiedades disponibles
            </a>
            <a
              href="#como-funciona"
              className="inline-flex min-h-12 items-center rounded-field border border-brand-line px-6 py-3.5 text-sm font-medium text-brand-ink transition-colors hover:border-brand-ink"
            >
              Cómo pedir información
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-brand-line pt-6 text-sm">
            <div>
              <dt className="text-brand-ink-soft">En vitrina</dt>
              <dd className="mt-1 font-medium text-brand-ink">
                {publishedCount === null
                  ? '—'
                  : `${publishedCount} ${publishedCount === 1 ? 'propiedad' : 'propiedades'}`}
              </dd>
            </div>
            <div>
              <dt className="text-brand-ink-soft">Ciudades</dt>
              <dd className="mt-1 font-medium text-brand-ink">Santa Cruz, La Paz y Tarija</dd>
            </div>
            <div>
              <dt className="text-brand-ink-soft">Contacto</dt>
              <dd className="mt-1 font-medium text-brand-ink">Directo con la sucursal</dd>
            </div>
          </dl>
        </div>

        <div className={styles.heroRevealDelayed}>
          <span className="sr-only">
            Perfil de alturas: Santa Cruz a 416 metros, Tarija a 1.854 metros y La Paz a 3.640
            metros sobre el nivel del mar.
          </span>
          <div className="hidden md:block">
            <AltitudeProfile className="h-auto w-full" />
          </div>
          <div className="md:hidden">
            <p className="text-sm text-brand-ink-soft">Perfil de alturas</p>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-brand-line pt-4">
              {BRANCH_PROFILES.map((profile) => (
                <div key={profile.nombre}>
                  <p className="text-sm font-medium text-brand-accent">{profile.altitud}</p>
                  <p className="mt-1 font-display text-base leading-tight">{profile.nombre}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 border-t border-brand-line pt-4 text-sm leading-relaxed text-brand-ink-soft">
            De la llanura al altiplano, cada sucursal conoce el terreno que trabaja.
          </p>
        </div>
      </div>
    </section>
  );
}
