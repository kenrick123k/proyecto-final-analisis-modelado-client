const STEPS = [
  {
    number: '01',
    title: 'Explora la vitrina',
    text: 'Filtra por ciudad y tipo de operación. Cada ficha muestra el precio, la descripción y la sucursal que atiende la propiedad.',
  },
  {
    number: '02',
    title: 'Pide información',
    text: 'En la propiedad que te interese, pulsa Solicitar información. Necesitas tu nombre y correo; la identificación y el teléfono son opcionales.',
  },
  {
    number: '03',
    title: 'Coordina la visita',
    text: 'La sucursal te contacta para responder tus dudas y acordar una visita si la propiedad te convence.',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-24 border-b border-line bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(2.1rem,4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.03em]">
            Cómo pedir información
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            No necesitas crear una cuenta. Eliges una propiedad, dejas tus datos y la sucursal de esa
            ciudad te contacta.
          </p>
        </div>

        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.number} className="border-t border-line pt-5">
              <p className="text-xs font-medium text-accent-strong">{step.number}</p>
              <h3 className="mt-3 font-display text-2xl leading-tight tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
