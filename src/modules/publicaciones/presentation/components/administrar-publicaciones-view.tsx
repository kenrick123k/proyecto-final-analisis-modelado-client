'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ROLES } from '../../../../shared/application/constants/roles';
import { Button } from '../../../../shared/presentation/ui/button';
import { Surface } from '../../../../shared/presentation/ui/surface';
import type { EstadoPublicacionCodigo, Publicacion } from '../../domain/entities/publicacion';
import { PublicacionesError } from '../../domain/errors/publicaciones.errors';
import { usePublicaciones } from '../context/publicaciones-context';
import { useCurrentUser } from '../hooks/use-current-user';
import { AccessDenied } from './access-denied';
import { PublicationCard } from './publication-card';
import { PublicacionesShell } from './publicaciones-shell';

type Filter = 'TODOS' | EstadoPublicacionCodigo;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'TODOS', label: 'Todas' },
  { value: 'PENDIENTE_APROBACION', label: 'Pendientes' },
  { value: 'APROBADA', label: 'Aprobadas' },
  { value: 'PUBLICADA', label: 'Publicadas' },
];

export function AdministrarPublicacionesView() {
  const { user, isLoading: isUserLoading, error: userError } = useCurrentUser();
  const { listManaged, approve } = usePublicaciones();
  const [filter, setFilter] = useState<Filter>('TODOS');
  const [publicaciones, setPublicaciones] = useState<Publicacion[] | null>(null);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user?.rol.nombre !== ROLES.GERENTE_SUCURSAL) {
      return;
    }

    let active = true;

    listManaged
      .execute(filter === 'TODOS' ? undefined : filter)
      .then((result) => {
        if (active) {
          setPublicaciones(result);
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(loadError instanceof PublicacionesError ? loadError.message : 'No se pudieron cargar las publicaciones.');
          setPublicaciones([]);
        }
      });

    return () => {
      active = false;
    };
  }, [filter, listManaged, user]);

  function changeFilter(next: Filter) {
    if (next === filter) {
      return;
    }
    setPublicaciones(null);
    setFilter(next);
  }

  async function runApprove(publicacion: Publicacion) {
    setWorkingId(publicacion.id);
    setError(null);
    setSuccess(null);

    try {
      const updated = await approve.execute(publicacion.id);
      setPublicaciones((current) => {
        const next = (current ?? []).map((item) => (item.id === updated.id ? updated : item));
        return filter === 'TODOS' ? next : next.filter((item) => item.estado.codigo === filter);
      });
      setSuccess(`"${publicacion.titulo}" fue aprobada. El publicador o marketing la abrirá en la landing.`);
    } catch (actionError) {
      setError(actionError instanceof PublicacionesError ? actionError.message : 'No se pudo aprobar la publicación.');
    } finally {
      setWorkingId(null);
    }
  }

  if (isUserLoading) {
    return (
      <PublicacionesShell title="Administrar publicaciones" description="Cargando tu sesión…">
        <div className="h-64 animate-pulse rounded-surface border border-line bg-surface" />
      </PublicacionesShell>
    );
  }

  if (userError) {
    return (
      <PublicacionesShell title="Administrar publicaciones" description="No se pudo cargar tu sesión.">
        <p role="alert" className="text-sm text-danger">{userError}</p>
      </PublicacionesShell>
    );
  }

  if (user && user.rol.nombre !== ROLES.GERENTE_SUCURSAL) {
    return <AccessDenied message="Solo el gerente de sucursal puede administrar las publicaciones de su sucursal." />;
  }

  return (
    <PublicacionesShell
      title="Administrar publicaciones"
      description="Gestiona el ciclo completo de las propiedades de tu sucursal: pendientes, aprobadas y publicadas."
      actions={
        <Link
          href="/publicaciones/por-aprobar"
          className="inline-flex rounded-field border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
        >
          Ver por aprobar
        </Link>
      }
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
        {FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => changeFilter(option.value)}
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

      {error ? (
        <p role="alert" className="mt-5 border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}
      {success ? (
        <p role="status" className="mt-5 border-l-2 border-primary bg-primary-soft px-4 py-3 text-sm text-primary">
          {success}
        </p>
      ) : null}

      <div className="mt-6">
        {publicaciones === null ? (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="h-64 animate-pulse rounded-surface border border-line bg-surface" />
            <div className="h-64 animate-pulse rounded-surface border border-line bg-surface" />
          </div>
        ) : null}

        {publicaciones?.length === 0 ? (
          <Surface>
            <h2 className="font-display text-2xl tracking-[-0.02em]">No hay publicaciones en esta vista</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Cambia el filtro o espera nuevas solicitudes de tu sucursal.
            </p>
          </Surface>
        ) : null}

        {publicaciones && publicaciones.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {publicaciones.map((publicacion) => (
              <PublicationCard
                key={publicacion.id}
                publicacion={publicacion}
                actions={
                  <>
                    {publicacion.estado.codigo === 'PENDIENTE_APROBACION' ? (
                      <Button
                        onClick={() => runApprove(publicacion)}
                        disabled={workingId === publicacion.id}
                        className="px-4 py-2.5"
                      >
                        {workingId === publicacion.id ? 'Aprobando…' : 'Aprobar'}
                      </Button>
                    ) : null}
                    {publicacion.estado.codigo === 'APROBADA' ? (
                      <span className="text-xs text-ink-faint">Aprobada · esperando publicación de marketing</span>
                    ) : null}
                    {publicacion.estado.codigo === 'PUBLICADA' ? (
                      <span className="text-xs text-ink-faint">Visible en la landing</span>
                    ) : null}
                  </>
                }
              />
            ))}
          </div>
        ) : null}
      </div>
    </PublicacionesShell>
  );
}
