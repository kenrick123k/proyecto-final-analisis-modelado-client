'use client';

import { useEffect, useState } from 'react';
import type { Role } from '../../domain/entities/authenticated-user';
import { Surface } from '@/shared/presentation/ui/surface';
import { useAccessControl } from '../context/access-control-context';

export function AdminRolesPanel() {
  const { listRoles } = useAccessControl();
  const [roles, setRoles] = useState<Role[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    listRoles
      .execute()
      .then((result) => {
        if (active) {
          setRoles(result);
        }
      })
      .catch(() => {
        if (active) {
          setError('No se pudieron cargar los roles.');
        }
      });

    return () => {
      active = false;
    };
  }, [listRoles]);

  return (
    <Surface className="flex flex-col overflow-hidden p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-5">
        <h2 className="font-display text-xl tracking-[-0.02em]">Roles del sistema</h2>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-strong">
          Solo SUPERADMIN
        </span>
      </div>

      <div className="flex-1 px-6">
        {error ? (
          <p role="alert" className="py-6 text-sm text-danger">
            {error}
          </p>
        ) : null}

        {!roles && !error ? (
          <div className="space-y-4 py-6" aria-label="Cargando roles">
            <div className="h-4 w-28 animate-pulse rounded bg-line" />
            <div className="h-4 w-24 animate-pulse rounded bg-line/70" />
            <div className="h-4 w-32 animate-pulse rounded bg-line/50" />
          </div>
        ) : null}

        {roles ? (
          <ul className="divide-y divide-line">
            {roles.map((role) => (
              <li key={role.id} className="flex items-center justify-between gap-4 py-4">
                <span className="flex items-center gap-3 text-sm font-medium">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${role.estado ? 'bg-primary' : 'bg-line-strong'}`}
                  />
                  {role.nombre}
                </span>
                <span className={`text-xs ${role.estado ? 'text-primary' : 'text-ink-faint'}`}>
                  {role.estado ? 'Activo' : 'Inactivo'}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <p className="border-t border-line px-6 py-4 text-xs leading-relaxed text-ink-faint">
        Los roles determinan qué módulos puede abrir cada usuario de la agencia.
      </p>
    </Surface>
  );
}
