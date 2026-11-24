'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ROLES } from '../../../../shared/application/constants/roles';
import { Button } from '../../../../shared/presentation/ui/button';
import { Surface } from '../../../../shared/presentation/ui/surface';
import type { Publicacion } from '../../domain/entities/publicacion';
import { PublicacionesError } from '../../domain/errors/publicaciones.errors';
import { usePublicaciones } from '../context/publicaciones-context';
import { useCurrentUser } from '../hooks/use-current-user';
import { AccessDenied } from './access-denied';
import { PublicationCard } from './publication-card';
import { PublicacionesShell } from './publicaciones-shell';

export function PorAprobarView() {
  const { user, isLoading: isUserLoading, error: userError } = useCurrentUser();
  const { listForApproval, approve } = usePublicaciones();
  const [publicaciones, setPublicaciones] = useState<Publicacion[] | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user?.rol.nombre !== ROLES.GERENTE_SUCURSAL) {
      return;
    }

    let active = true;

    listForApproval
      .execute()
      .then((result) => {
        if (active) {
          setPublicaciones(result);
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(loadError instanceof PublicacionesError ? loadError.message : 'No se pudieron cargar las solicitudes.');
          setPublicaciones([]);
        }
      });

    return () => {
      active = false;
    };
  }, [listForApproval, user]);

  async function handleApprove(publicacion: Publicacion) {
    setApprovingId(publicacion.id);
    setError(null);
    setSuccess(null);

    try {
      await approve.execute(publicacion.id);
      setPublicaciones((current) => (current ?? []).filter((item) => item.id !== publicacion.id));
      setSuccess(`"${publicacion.titulo}" fue aprobada. Ya puede publicarse desde Administrar.`);
    } catch (approveError) {
      setError(approveError instanceof PublicacionesError ? approveError.message : 'No se pudo aprobar la publicación.');
    } finally {
      setApprovingId(null);
    }
  }

  if (isUserLoading) {
    return (
      <PublicacionesShell title="Por aprobar" description="Cargando tu sesión…">
        <div className="h-64 animate-pulse rounded-surface border border-line bg-surface" />
      </PublicacionesShell>
    );
  }

  if (userError) {
    return (
      <PublicacionesShell title="Por aprobar" description="No se pudo cargar tu sesión.">
        <p role="alert" className="text-sm text-danger">{userError}</p>
      </PublicacionesShell>
    );
  }

  if (user && user.rol.nombre !== ROLES.GERENTE_SUCURSAL) {
    return <AccessDenied message="Solo el gerente de sucursal puede revisar las solicitudes pendientes." />;
  }

  return (
    <PublicacionesShell
      title="Por aprobar"
      description="Solicitudes de tu sucursal pendientes de revisión. Al aprobarlas pasan a la bandeja de administración."
      actions={
        <Link
          href="/publicaciones/administrar"
          className="inline-flex rounded-field border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
        >
          Ir a administrar
        </Link>
      }
    >
      {error ? (
        <p role="alert" className="mb-5 border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}
      {success ? (
        <p role="status" className="mb-5 border-l-2 border-primary bg-primary-soft px-4 py-3 text-sm text-primary">
          {success}
        </p>
      ) : null}

      {publicaciones === null ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="h-64 animate-pulse rounded-surface border border-line bg-surface" />
          <div className="h-64 animate-pulse rounded-surface border border-line bg-surface" />
        </div>
      ) : null}

      {publicaciones?.length === 0 ? (
        <Surface>
          <h2 className="font-display text-2xl tracking-[-0.02em]">Sin solicitudes pendientes</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Cuando un agente de captación registre una propiedad para tu sucursal, aparecerá aquí.
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
                <Button
                  onClick={() => handleApprove(publicacion)}
                  disabled={approvingId === publicacion.id}
                  className="px-4 py-2.5"
                >
                  {approvingId === publicacion.id ? 'Aprobando…' : 'Aprobar'}
                </Button>
              }
            />
          ))}
        </div>
      ) : null}
    </PublicacionesShell>
  );
}
