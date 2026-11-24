'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ROLES } from '../../../../shared/application/constants/roles';
import { Surface } from '../../../../shared/presentation/ui/surface';
import { formatBolivianos, formatDate } from '../../../../shared/presentation/utils/format';
import type {
  EstadoPublicacionCodigo,
  PublicacionConInteresados,
  PublicacionInteresadoResumen,
} from '../../domain/entities/publicacion';
import { PublicacionesError } from '../../domain/errors/publicaciones.errors';
import { usePublicaciones } from '../context/publicaciones-context';
import { useCurrentUser } from '../hooks/use-current-user';
import { AccessDenied } from './access-denied';
import { PublicationStatusBadge } from './publication-status-badge';
import { PublicacionesShell } from './publicaciones-shell';

type Filter = 'TODOS' | EstadoPublicacionCodigo;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'TODOS', label: 'Todas' },
  { value: 'PENDIENTE_APROBACION', label: 'Pendientes' },
  { value: 'APROBADA', label: 'Aprobadas' },
  { value: 'PUBLICADA', label: 'Publicadas' },
];

function InterestedList({ interesados }: { interesados: PublicacionInteresadoResumen[] }) {
  if (interesados.length === 0) {
    return (
      <p className="mt-3 text-sm text-ink-faint">Sin interesados registrados todavía.</p>
    );
  }

  return (
    <ul className="mt-3 divide-y divide-line rounded-field border border-line">
      {interesados.map((interesado) => (
        <li key={interesado.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-ink">{interesado.nombreCompleto}</p>
              {interesado.favorito ? (
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent-strong">
                  Favorito
                </span>
              ) : null}
            </div>
            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
              {interesado.correo ? (
                <a href={`mailto:${interesado.correo}`} className="hover:text-primary">
                  {interesado.correo}
                </a>
              ) : null}
              {interesado.numeroTelefono ? (
                <a href={`tel:${interesado.numeroTelefono}`} className="hover:text-primary">
                  {interesado.numeroTelefono}
                </a>
              ) : null}
              {interesado.identificacion ? <span>{interesado.identificacion}</span> : null}
            </p>
          </div>
          <p className="text-[11px] text-ink-faint">{formatDate(interesado.fechaRegistro)}</p>
        </li>
      ))}
    </ul>
  );
}

export function TodasLasPublicacionesView() {
  const { user, isLoading: isUserLoading, error: userError } = useCurrentUser();
  const { listAllWithInteresados } = usePublicaciones();
  const [publicaciones, setPublicaciones] = useState<PublicacionConInteresados[] | null>(null);
  const [filter, setFilter] = useState<Filter>('TODOS');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.rol.nombre !== ROLES.PUBLICADOR_MARKETING) {
      return;
    }

    let active = true;

    listAllWithInteresados
      .execute()
      .then((result) => {
        if (active) {
          setPublicaciones(result);
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof PublicacionesError
              ? loadError.message
              : 'No se pudieron cargar las publicaciones.',
          );
          setPublicaciones([]);
        }
      });

    return () => {
      active = false;
    };
  }, [listAllWithInteresados, user]);

  if (isUserLoading) {
    return (
      <PublicacionesShell title="Todas las publicaciones" description="Cargando tu sesión…">
        <div className="h-64 animate-pulse rounded-surface border border-line bg-surface" />
      </PublicacionesShell>
    );
  }

  if (userError) {
    return (
      <PublicacionesShell title="Todas las publicaciones" description="No se pudo cargar tu sesión.">
        <p role="alert" className="text-sm text-danger">{userError}</p>
      </PublicacionesShell>
    );
  }

  if (user && user.rol.nombre !== ROLES.PUBLICADOR_MARKETING) {
    return <AccessDenied message="Solo el publicador o marketing puede consultar todas las publicaciones y sus interesados." />;
  }

  const visible = (publicaciones ?? []).filter(
    (publicacion) => filter === 'TODOS' || publicacion.estado.codigo === filter,
  );
  const totalInteresados = (publicaciones ?? []).reduce(
    (total, publicacion) => total + publicacion.interesados.length,
    0,
  );

  return (
    <PublicacionesShell
      title="Todas las publicaciones"
      description="Todas las sucursales y todos los estados, con la lista completa de personas interesadas en cada propiedad."
      actions={
        <Link
          href="/publicaciones/publicar"
          className="inline-flex rounded-field border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
        >
          Ir a publicar
        </Link>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar publicaciones por estado">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
              className={
                filter === option.value
                  ? 'rounded-full bg-primary px-4 py-2 text-sm font-medium text-on-primary'
                  : 'rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-primary'
              }
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-ink-faint">
          {publicaciones?.length ?? 0} publicaciones · {totalInteresados} interesados
        </p>
      </div>

      {error ? (
        <p role="alert" className="mt-6 border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      {publicaciones === null ? (
        <div className="mt-6 space-y-4">
          <div className="h-56 animate-pulse rounded-surface border border-line bg-surface" />
          <div className="h-56 animate-pulse rounded-surface border border-line bg-surface" />
        </div>
      ) : null}

      {publicaciones && visible.length === 0 ? (
        <Surface className="mt-6">
          <p className="text-sm text-ink-soft">No hay publicaciones con este filtro.</p>
        </Surface>
      ) : null}

      <div className="mt-6 space-y-5">
        {visible.map((publicacion) => (
          <article key={publicacion.id} className="rounded-surface border border-line bg-surface">
            <div className="border-b border-line px-6 py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
                    {publicacion.tipoOperacion.nombre} · {publicacion.sucursalNombre}
                  </p>
                  <h2 className="mt-2 break-words font-display text-2xl leading-tight tracking-[-0.02em]">
                    {publicacion.titulo}
                  </h2>
                </div>
                <PublicationStatusBadge estado={publicacion.estado} />
              </div>

              <p className="mt-3 line-clamp-3 max-w-3xl break-words text-sm leading-relaxed text-ink-soft">
                {publicacion.descripcion}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-ink-faint">
                  <span className="font-semibold text-ink">{formatBolivianos(publicacion.precio)}</span>
                  <span>{publicacion.usuarioNombre}</span>
                  <span>{formatDate(publicacion.fechaRegistro)}</span>
                </div>
                <Link
                  href={`/interesados/${publicacion.id}`}
                  className="text-sm font-medium text-ink-soft transition-colors hover:text-primary"
                >
                  Abrir interesados
                </Link>
              </div>
            </div>

            <div className="px-6 py-5">
              <h3 className="text-sm font-semibold text-ink">
                Interesados ({publicacion.interesados.length})
              </h3>
              <InterestedList interesados={publicacion.interesados} />
            </div>
          </article>
        ))}
      </div>
    </PublicacionesShell>
  );
}
