export function BuyerCallToAction() {
  return (
    <section className="bg-brand-field text-brand-ink">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(2.1rem,4vw,3.4rem)] font-light leading-[1.03] tracking-[-0.035em]">
            Tu próxima casa puede estar en la vitrina
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-ink-soft">
            Revisa las propiedades disponibles en Santa Cruz, La Paz y Tarija. Si alguna te interesa,
            deja tus datos en la ficha y la sucursal te contacta para coordinar una visita.
          </p>
          <p className="mt-3 text-sm text-brand-ink-soft">
            Pedir información no tiene costo y no necesitas crear una cuenta.
          </p>
        </div>

        <a
          href="#vitrina"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-field bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-field transition-colors hover:bg-brand-ink sm:w-auto"
        >
          Ver propiedades disponibles
        </a>
      </div>
    </section>
  );
}
