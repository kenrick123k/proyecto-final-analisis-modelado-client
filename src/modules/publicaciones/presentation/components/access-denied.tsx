import Link from 'next/link';
import { PublicacionesShell } from './publicaciones-shell';
import { Surface } from '../../../../shared/presentation/ui/surface';

export function AccessDenied({ message }: { message: string }) {
  return (
    <PublicacionesShell title="Acceso restringido" description="Esta sección pertenece a otro rol de la agencia.">
      <Surface className="max-w-xl">
        <p className="text-sm leading-relaxed text-ink-soft">{message}</p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-field border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
        >
          Volver al panel
        </Link>
      </Surface>
    </PublicacionesShell>
  );
}
