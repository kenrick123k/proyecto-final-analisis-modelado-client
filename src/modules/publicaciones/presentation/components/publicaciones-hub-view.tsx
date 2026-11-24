'use client';

import Link from 'next/link';
import { ROLES } from '../../../../shared/application/constants/roles';
import { Surface } from '../../../../shared/presentation/ui/surface';
import { useCurrentUser } from '../hooks/use-current-user';
import { PublicacionesShell } from './publicaciones-shell';

const primaryLink =
  'inline-flex rounded-field bg-primary px-5 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-strong';
const outlineLink =
  'inline-flex rounded-field border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary';

export function PublicacionesHubView() {
  const { user, error, isLoading } = useCurrentUser();
  const isAgent = user?.rol.nombre === ROLES.AGENTE_CAPTACION;
  const isManager = user?.rol.nombre === ROLES.GERENTE_SUCURSAL;
  const isMarketing = user?.rol.nombre === ROLES.PUBLICADOR_MARKETING;

  return (
    <PublicacionesShell
      title="Publicaciones"
      description="El ciclo completo de una propiedad: la capta un agente, la revisa el gerente de sucursal y se publica en la vitrina."
    >
      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="h-56 animate-pulse rounded-surface border border-line bg-surface" />
          <div className="h-56 animate-pulse rounded-surface border border-line bg-surface" />
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      {user ? (
        <div className="grid gap-5 md:grid-cols-2">
          {isAgent ? (
            <Surface className="flex flex-col">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">Captación</p>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.02em]">Solicitar publicación</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                Registra una propiedad para tu sucursal. Queda pendiente hasta que el gerente la
                apruebe; luego pasa a la vitrina pública.
              </p>
              <Link href="/publicaciones/solicitar" className={`${primaryLink} mt-6 self-start`}>
                Nueva solicitud
              </Link>
            </Surface>
          ) : null}

          {isManager ? (
            <>
              <Surface className="flex flex-col">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">Revisión</p>
                <h2 className="mt-2 font-display text-2xl tracking-[-0.02em]">Por aprobar</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  Solicitudes de tu sucursal que esperan revisión antes de convertirse en fichas
                  administrables.
                </p>
                <Link href="/publicaciones/por-aprobar" className={`${primaryLink} mt-6 self-start`}>
                  Revisar solicitudes
                </Link>
              </Surface>

              <Surface className="flex flex-col">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">Gestión</p>
                <h2 className="mt-2 font-display text-2xl tracking-[-0.02em]">Administrar</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  Filtra por estado, aprueba solicitudes y publica propiedades aprobadas en la
                  vitrina de Tu Casa.
                </p>
                <Link href="/publicaciones/administrar" className={`${outlineLink} mt-6 self-start`}>
                  Abrir administración
                </Link>
              </Surface>
            </>
          ) : null}

          {isMarketing ? (
            <Surface className="flex flex-col">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">Marketing</p>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.02em]">Publicar en landing</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                Revisa las propiedades aprobadas por el gerente, pule el texto y el precio, y ábrelas
                al público en la vitrina.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/publicaciones/publicar" className={primaryLink}>
                  Abrir bandeja de publicación
                </Link>
                <Link href="/publicaciones/todas" className={outlineLink}>
                  Ver todas las publicaciones
                </Link>
              </div>
            </Surface>
          ) : null}

          {!isAgent && !isManager && !isMarketing ? (
            <Surface className="flex flex-col md:col-span-2">
              <h2 className="font-display text-2xl tracking-[-0.02em]">Tu rol no opera publicaciones</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                Las solicitudes las crea el agente de captación y las aprueba el gerente de sucursal.
                Puedes consultar las propiedades publicadas en la vitrina pública.
              </p>
              <Link href="/" className={`${outlineLink} mt-6 self-start`}>
                Ver vitrina pública
              </Link>
            </Surface>
          ) : null}

          <Surface className="md:col-span-2">
            <h2 className="font-display text-xl tracking-[-0.02em]">Flujo de una propiedad</h2>
            <ol className="mt-4 grid gap-4 text-sm leading-relaxed text-ink-soft sm:grid-cols-3">
              <li>
                <span className="font-semibold text-ink">01.</span> El agente de captación registra
                título, descripción, precio y tipo de operación.
              </li>
              <li>
                <span className="font-semibold text-ink">02.</span> El gerente de la sucursal revisa
                la solicitud y la aprueba.
              </li>
              <li>
                <span className="font-semibold text-ink">03.</span> El publicador o marketing pule
                la ficha, fija el precio final y la publica en la vitrina.
              </li>
            </ol>
          </Surface>
        </div>
      ) : null}
    </PublicacionesShell>
  );
}
