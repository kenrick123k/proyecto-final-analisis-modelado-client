'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ROLES } from '../../../../shared/application/constants/roles';
import { Button } from '../../../../shared/presentation/ui/button';
import { Surface } from '../../../../shared/presentation/ui/surface';
import type { Publicacion, PublicacionCatalogs } from '../../domain/entities/publicacion';
import { PublicacionesError } from '../../domain/errors/publicaciones.errors';
import { usePublicaciones } from '../context/publicaciones-context';
import { useCurrentUser } from '../hooks/use-current-user';
import { AccessDenied } from './access-denied';
import { PublicationCard } from './publication-card';
import { PublicationEditorDialog } from './publication-editor-dialog';
import { PublicacionesShell } from './publicaciones-shell';

const EMPTY_CATALOGS: PublicacionCatalogs = { estados: [], tiposOperacion: [] };

export function PublicarEnLandingView() {
  const { user, isLoading: isUserLoading, error: userError } = useCurrentUser();
  const { listForPublication, catalogs } = usePublicaciones();
  const [publicaciones, setPublicaciones] = useState<Publicacion[] | null>(null);
  const [catalogData, setCatalogData] = useState<PublicacionCatalogs>(EMPTY_CATALOGS);
  const [selected, setSelected] = useState<Publicacion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user?.rol.nombre !== ROLES.PUBLICADOR_MARKETING) {
      return;
    }

    let active = true;

    Promise.all([listForPublication.execute(), catalogs.execute()])
      .then(([approved, catalogResult]) => {
        if (active) {
          setPublicaciones(approved);
          setCatalogData(catalogResult);
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof PublicacionesError
              ? loadError.message
              : 'No se pudieron cargar las publicaciones aprobadas.',
          );
          setPublicaciones([]);
        }
      });

    return () => {
      active = false;
    };
  }, [catalogs, listForPublication, user]);

  function handleSaved(updated: Publicacion) {
    setPublicaciones((current) =>
      (current ?? []).map((publicacion) => (publicacion.id === updated.id ? updated : publicacion)),
    );
    setSelected(updated);
  }

  function handlePublished(updated: Publicacion) {
    setPublicaciones((current) => (current ?? []).filter((publicacion) => publicacion.id !== updated.id));
    setSelected(null);
    setSuccess(`"${updated.titulo}" ya está visible en la landing pública.`);
  }

  if (isUserLoading) {
    return (
      <PublicacionesShell title="Publicar en landing" description="Cargando tu sesión…">
        <div className="h-64 animate-pulse rounded-surface border border-line bg-surface" />
      </PublicacionesShell>
    );
  }

  if (userError) {
    return (
      <PublicacionesShell title="Publicar en landing" description="No se pudo cargar tu sesión.">
        <p role="alert" className="text-sm text-danger">{userError}</p>
      </PublicacionesShell>
    );
  }

  if (user && user.rol.nombre !== ROLES.PUBLICADOR_MARKETING) {
    return <AccessDenied message="Solo el publicador o marketing puede pulir y publicar propiedades aprobadas." />;
  }

  return (
    <PublicacionesShell
      title="Publicar en landing"
      description="Propiedades aprobadas por el gerente de sucursal. Pule el texto, ajusta el precio y ábrela al público cuando esté lista."
      actions={
        <>
          <Link
            href="/publicaciones/todas"
            className="inline-flex rounded-field border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
          >
            Todas las publicaciones
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-field border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
          >
            Ver landing
          </Link>
        </>
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
          <h2 className="font-display text-2xl tracking-[-0.02em]">No hay publicaciones aprobadas</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Cuando el gerente de sucursal apruebe una solicitud, aparecerá aquí para pulirla y
            publicarla en la landing.
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
                <Button onClick={() => setSelected(publicacion)} className="px-4 py-2.5">
                  Pulir y publicar
                </Button>
              }
            />
          ))}
        </div>
      ) : null}

      {selected ? (
        <PublicationEditorDialog
          publicacion={selected}
          tiposOperacion={catalogData.tiposOperacion}
          onClose={() => setSelected(null)}
          onSaved={handleSaved}
          onPublished={handlePublished}
        />
      ) : null}
    </PublicacionesShell>
  );
}
