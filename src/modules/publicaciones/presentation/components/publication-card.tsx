import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Publicacion } from '../../domain/entities/publicacion';
import { formatBolivianos, formatDate } from '../../../../shared/presentation/utils/format';
import { Surface } from '../../../../shared/presentation/ui/surface';
import { PublicationStatusBadge } from './publication-status-badge';

export function PublicationCard({
  publicacion,
  showBranch = true,
  actions,
}: {
  publicacion: Publicacion;
  showBranch?: boolean;
  actions?: ReactNode;
}) {
  return (
    <article className="h-full">
      <Surface className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
            {publicacion.tipoOperacion.nombre}
            {showBranch ? ` · ${publicacion.sucursalNombre}` : ''}
          </p>
          <h3 className="mt-2 break-words font-display text-xl leading-tight tracking-[-0.02em]">
            {publicacion.titulo}
          </h3>
        </div>
        <PublicationStatusBadge estado={publicacion.estado} />
      </div>

      <p className="line-clamp-3 break-words text-sm leading-relaxed text-ink-soft">{publicacion.descripcion}</p>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-line pt-4">
        <div>
          <p className="text-lg font-semibold">{formatBolivianos(publicacion.precio)}</p>
          <p className="mt-1 text-xs text-ink-faint">
            {publicacion.usuarioNombre} · {formatDate(publicacion.fechaRegistro)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/interesados/${publicacion.id}`}
            className="inline-flex min-h-11 items-center rounded-field px-3 text-sm font-medium text-ink-soft transition-colors hover:text-primary"
          >
            Interesados
          </Link>
          {actions}
        </div>
      </div>
      </Surface>
    </article>
  );
}
