import type { Metadata } from 'next';
import { HousePlan } from '@/shared/presentation/brand/house-plan';
import { Logo } from '@/shared/presentation/brand/logo';
import { LoginForm } from '@/modules/access-control/presentation/components/login-form';

export const metadata: Metadata = {
  title: 'Iniciar sesión · Tu Casa',
  description: 'Accede al panel de gestión inmobiliaria de Tu Casa.',
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col lg:grid lg:min-h-svh lg:grid-cols-[1.12fr_0.88fr]">
      <section className="relative flex min-h-[36svh] flex-col overflow-hidden bg-brand-field px-6 py-9 text-brand-ink sm:px-10 lg:min-h-svh lg:px-14 lg:py-12 xl:px-20">
        <header className="relative z-10 mx-auto flex w-full max-w-[27rem] items-center justify-between gap-6 lg:mx-0 lg:max-w-none">
          <Logo tone="brand" />
          <span className="hidden text-sm text-brand-ink-soft sm:block">Gestión inmobiliaria</span>
        </header>

        <div className="relative z-10 mx-auto mt-14 w-full max-w-[27rem] lg:mx-0 lg:mt-24 lg:max-w-[37rem] xl:mt-32">
          <h1 className="login-reveal font-display text-[clamp(2.35rem,4.4vw,4.5rem)] font-light leading-[1.02] tracking-[-0.035em]">
            Cada puerta abre un negocio.
          </h1>
          <p className="login-reveal-delayed mt-6 max-w-[30rem] text-base leading-relaxed text-brand-ink-soft lg:text-lg">
            Propiedades, clientes y comisiones en un solo panel. Hecho para agencias que conocen su
            ciudad.
          </p>
        </div>

        <div className="relative z-10 mt-auto hidden pt-12 lg:block">
          <div className="ml-auto w-full max-w-[530px]">
            <HousePlan className="w-full" />
          </div>
          <p className="mt-8 border-t border-brand-line pt-5 text-sm text-brand-ink-soft">
            Gestión inmobiliaria en Bolivia.
          </p>
        </div>
      </section>

      <section className="flex flex-1 flex-col bg-canvas px-6 py-12 sm:px-10 lg:justify-between lg:px-14 lg:py-12 xl:px-20">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-[27rem]">
            <div className="login-reveal">
              <h2 className="font-display text-[2.1rem] font-light leading-tight tracking-[-0.025em] sm:text-[2.5rem]">
                Entra a tu panel
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Usa las credenciales que te entregó tu agencia.
              </p>
            </div>

            <div className="login-reveal-delayed mt-9">
              <LoginForm />
            </div>

            <p className="mt-8 text-sm leading-relaxed text-ink-soft">
              ¿No puedes entrar? Contacta al administrador de tu agencia.
            </p>
          </div>
        </div>

        <footer className="mx-auto mt-12 w-full max-w-[27rem] border-t border-line pt-5 text-xs leading-relaxed text-ink-faint">
          © 2026 Tu Casa. Acceso reservado para el personal autorizado de la agencia.
        </footer>
      </section>
    </main>
  );
}
