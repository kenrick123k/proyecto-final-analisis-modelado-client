const BENEFITS = [
  {
    title: 'Precio a la vista',
    text: 'Cada ficha muestra el precio en bolivianos y el tipo de operación. Sabes cuánto cuesta antes de pedir información.',
  },
  {
    title: 'Ficha revisada',
    text: 'Cada propiedad se revisa antes de entrar a la vitrina, para que lo que lees coincida con lo que encontrarás en la visita.',
  },
  {
    title: 'Respuesta local',
    text: 'Deja tus datos en una propiedad y te contacta la sucursal de esa ciudad, la que conoce la zona.',
  },
];

export function BuyerBenefits() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-12">
        <h2 className="sr-only">Qué encuentras en Tu Casa</h2>
        <dl className="grid gap-8 md:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="border-t border-line pt-5">
              <dt className="font-display text-xl leading-tight tracking-[-0.02em]">
                {benefit.title}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{benefit.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
