'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthenticatedUser } from '../../domain/entities/authenticated-user';
import { AuthError } from '../../domain/errors/auth.errors';
import { Surface } from '@/shared/presentation/ui/surface';
import { ROLES } from '@/shared/application/constants/roles';
import { useAccessControl } from '../context/access-control-context';
import { AdminRolesPanel } from './admin-roles-panel';

export function DashboardView() {
  const router = useRouter();
  const { currentUser } = useAccessControl();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    currentUser
      .execute()
      .then((result) => {
        if (active) {
          setUser(result);
        }
      })
      .catch((sessionError: unknown) => {
        if (!active) {
          return;
        }
        if (sessionError instanceof AuthError && sessionError.code === 'UNAUTHORIZED') {
          router.replace('/login');
          return;
        }
        setError('No se pudo cargar la sesión.');
      });

    return () => {
      active = false;
    };
  }, [currentUser, router]);

  if (error) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-16">
        <div className="max-w-lg">
          <p role="alert" className="border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
            {error}
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-field border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
          >
            Volver a iniciar sesión
          </Link>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
        <div className="h-10 w-64 animate-pulse rounded bg-line" />
        <div className="mt-4 h-5 w-96 max-w-full animate-pulse rounded bg-line/60" />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="h-80 animate-pulse rounded-surface border border-line bg-surface" />
          <div className="h-80 animate-pulse rounded-surface border border-line bg-surface" />
        </div>
      </main>
    );
  }

  const firstName = user.nombreCompleto.split(' ')[0];
  const isAdmin = user.rol.nombre === ROLES.SUPERADMIN;
  const canRequestPublication = user.rol.nombre === ROLES.AGENTE_CAPTACION;
  const canManagePublications = user.rol.nombre === ROLES.GERENTE_SUCURSAL;
  const canPublishMarketing = user.rol.nombre === ROLES.PUBLICADOR_MARKETING;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">Panel</p>
        <h1 className="mt-2 font-display text-[clamp(2.3rem,4.8vw,3.5rem)] font-light leading-[1.05] tracking-[-0.03em]">
          Hola, {firstName}.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          Este es tu espacio de trabajo en Tu Casa. Desde aquí administras tu cuenta y los accesos
          de tu agencia.
        </p>
      </header>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Surface className="overflow-hidden p-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-5">
            <h2 className="font-display text-xl tracking-[-0.02em]">Tu cuenta</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              Activa
            </span>
          </div>
          <dl className="divide-y divide-line px-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
              <dt className="text-sm text-ink-soft">Correo</dt>
              <dd className="text-sm font-medium">{user.correo}</dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
              <dt className="text-sm text-ink-soft">Identificación</dt>
              <dd className="text-sm font-medium">{user.identificacion}</dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
              <dt className="text-sm text-ink-soft">Teléfono</dt>
              <dd className="text-sm font-medium">{user.numeroTelefono ?? 'Sin registrar'}</dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
              <dt className="text-sm text-ink-soft">Rol asignado</dt>
              <dd className="text-sm font-medium">{user.rol.nombre}</dd>
            </div>
          </dl>
        </Surface>

        {isAdmin ? (
          <AdminRolesPanel />
        ) : (
          <Surface className="flex flex-col justify-between gap-8">
            <div>
              <h2 className="font-display text-xl tracking-[-0.02em]">Accesos de tu agencia</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Solo el SUPERADMIN puede gestionar los roles del sistema. Si necesitas un cambio de
                permisos, habla con tu gerente de sucursal.
              </p>
            </div>
            <p className="text-sm text-ink-faint">Rol actual: {user.rol.nombre}</p>
          </Surface>
        )}
      </section>

      <section className="mt-6">
        <Surface className="flex flex-wrap items-center justify-between gap-5">
          <div className="max-w-xl">
            <h2 className="font-display text-xl tracking-[-0.02em]">Publicaciones</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {canRequestPublication
                ? 'Registra propiedades para tu sucursal y sigue su estado de aprobación.'
                : canManagePublications
                  ? 'Revisa las solicitudes de tu sucursal y aprueba las propiedades que pasan a marketing.'
                  : canPublishMarketing
                    ? 'Pule las propiedades aprobadas y publica las mejores en la vitrina pública.'
                    : 'Las propiedades aprobadas se muestran en la landing pública de Tu Casa.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {canRequestPublication ? (
              <Link
                href="/publicaciones/solicitar"
                className="inline-flex rounded-field bg-primary px-5 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-strong"
              >
                Solicitar publicación
              </Link>
            ) : null}
            {canManagePublications ? (
              <>
                <Link
                  href="/publicaciones/por-aprobar"
                  className="inline-flex rounded-field border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  Por aprobar
                </Link>
                <Link
                  href="/publicaciones/administrar"
                  className="inline-flex rounded-field bg-primary px-5 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-strong"
                >
                  Administrar publicaciones
                </Link>
              </>
            ) : null}
            {canPublishMarketing ? (
              <>
                <Link
                  href="/publicaciones/todas"
                  className="inline-flex rounded-field border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  Todas las publicaciones
                </Link>
                <Link
                  href="/publicaciones/publicar"
                  className="inline-flex rounded-field bg-primary px-5 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-strong"
                >
                  Publicar en landing
                </Link>
              </>
            ) : null}
          </div>
        </Surface>
      </section>
    </main>
  );
}
