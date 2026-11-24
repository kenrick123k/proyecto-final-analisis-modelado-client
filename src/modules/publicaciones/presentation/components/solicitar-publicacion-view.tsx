'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ROLES } from '../../../../shared/application/constants/roles';
import { Button } from '../../../../shared/presentation/ui/button';
import { Field } from '../../../../shared/presentation/ui/field';
import { Select } from '../../../../shared/presentation/ui/select';
import { Surface } from '../../../../shared/presentation/ui/surface';
import { Textarea } from '../../../../shared/presentation/ui/textarea';
import type { Publicacion, PublicacionCatalogs } from '../../domain/entities/publicacion';
import { PublicacionesError } from '../../domain/errors/publicaciones.errors';
import { usePublicaciones } from '../context/publicaciones-context';
import { useCurrentUser } from '../hooks/use-current-user';
import { publicacionSchema } from '../validation/publicacion.schema';
import { AccessDenied } from './access-denied';
import { PublicationCard } from './publication-card';
import { PublicacionesShell } from './publicaciones-shell';

const EMPTY_CATALOGS: PublicacionCatalogs = { estados: [], tiposOperacion: [] };

export function SolicitarPublicacionView() {
  const { user, isLoading: isUserLoading, error: userError } = useCurrentUser();
  const { create, listMine, catalogs } = usePublicaciones();
  const formRef = useRef<HTMLFormElement>(null);

  const [catalogData, setCatalogData] = useState<PublicacionCatalogs>(EMPTY_CATALOGS);
  const [publicaciones, setPublicaciones] = useState<Publicacion[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.rol.nombre !== ROLES.AGENTE_CAPTACION) {
      return;
    }

    let active = true;

    Promise.all([catalogs.execute(), listMine.execute()])
      .then(([catalogResult, myPublications]) => {
        if (active) {
          setCatalogData(catalogResult);
          setPublicaciones(myPublications);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setFormError(error instanceof PublicacionesError ? error.message : 'No se pudieron cargar tus datos.');
          setPublicaciones([]);
        }
      });

    return () => {
      active = false;
    };
  }, [catalogs, listMine, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = publicacionSchema.safeParse({
      titulo: String(formData.get('titulo') ?? ''),
      descripcion: String(formData.get('descripcion') ?? ''),
      precio: String(formData.get('precio') ?? ''),
      tipoOperacionId: String(formData.get('tipoOperacionId') ?? ''),
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? 'form');
        errors[field] ??= issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const publicacion = await create.execute(parsed.data);
      setPublicaciones((current) => [publicacion, ...(current ?? [])]);
      setSuccessMessage('Solicitud enviada. El gerente de tu sucursal debe aprobarla antes de publicarla.');
      formRef.current?.reset();
    } catch (error) {
      setFormError(error instanceof PublicacionesError ? error.message : 'No se pudo enviar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isUserLoading) {
    return (
      <PublicacionesShell title="Solicitar publicación" description="Cargando tu sesión…">
        <div className="h-64 animate-pulse rounded-surface border border-line bg-surface" />
      </PublicacionesShell>
    );
  }

  if (userError) {
    return (
      <PublicacionesShell title="Solicitar publicación" description="No se pudo cargar tu sesión.">
        <p role="alert" className="text-sm text-danger">{userError}</p>
      </PublicacionesShell>
    );
  }

  if (user && user.rol.nombre !== ROLES.AGENTE_CAPTACION) {
    return (
      <AccessDenied message="Solo el agente de captación puede registrar nuevas solicitudes de publicación." />
    );
  }

  return (
    <PublicacionesShell
      title="Solicitar publicación"
      description="Registra una propiedad para tu sucursal. Quedará pendiente hasta que el gerente de sucursal la apruebe."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Surface className="min-w-0">
          <h2 className="font-display text-2xl tracking-[-0.02em]">Nueva solicitud</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            La sucursal se asigna automáticamente según el usuario que inició sesión.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
            <Field
              label="Título"
              name="titulo"
              placeholder="Casa familiar en Equipetrol"
              error={fieldErrors.titulo}
              disabled={isSubmitting}
            />
            <Textarea
              label="Descripción"
              name="descripcion"
              placeholder="Describe ambientes, superficie, ubicación y condiciones relevantes."
              error={fieldErrors.descripcion}
              disabled={isSubmitting}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Precio (Bs)"
                name="precio"
                type="number"
                inputMode="decimal"
                min="1"
                step="0.01"
                placeholder="650000"
                error={fieldErrors.precio}
                disabled={isSubmitting}
              />
              <Select
                label="Tipo de operación"
                name="tipoOperacionId"
                defaultValue=""
                error={fieldErrors.tipoOperacionId}
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {catalogData.tiposOperacion.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </Select>
            </div>

            {formError ? (
              <p role="alert" className="border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
                {formError}
              </p>
            ) : null}
            {successMessage ? (
              <p role="status" className="border-l-2 border-primary bg-primary-soft px-4 py-3 text-sm text-primary">
                {successMessage}
              </p>
            ) : null}

            <Button type="submit" disabled={isSubmitting} className="mt-1 w-full py-3.5">
              {isSubmitting ? 'Enviando solicitud…' : 'Enviar a aprobación'}
            </Button>
          </form>
        </Surface>

        <section aria-labelledby="mis-publicaciones" className="min-w-0">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="mis-publicaciones" className="font-display text-2xl tracking-[-0.02em]">
                Mis publicaciones
              </h2>
              <p className="mt-2 text-sm text-ink-soft">Solicitudes registradas por tu usuario.</p>
            </div>
            <span className="text-sm text-ink-faint">{publicaciones?.length ?? 0} en total</span>
          </div>

          <div className="mt-5 grid gap-4">
            {publicaciones === null ? (
              <div className="h-48 animate-pulse rounded-surface border border-line bg-surface" />
            ) : null}
            {publicaciones?.length === 0 ? (
              <Surface>
                <p className="text-sm text-ink-soft">Aún no registraste publicaciones.</p>
              </Surface>
            ) : null}
            {publicaciones?.map((publicacion) => (
              <PublicationCard key={publicacion.id} publicacion={publicacion} showBranch={false} />
            ))}
          </div>
        </section>
      </div>
    </PublicacionesShell>
  );
}
