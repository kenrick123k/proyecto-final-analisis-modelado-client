'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Surface } from '../../../../shared/presentation/ui/surface';
import { formatDate } from '../../../../shared/presentation/utils/format';
import type { InteresadosPublicacion } from '../../domain/entities/interesado';
import { InteresadosError } from '../../domain/errors/interesados.errors';
import { useInteresados } from '../context/interesados-context';

export function InteresadosListView({ publicacionId }: { publicacionId: string }) {
  const { list } = useInteresados();
  const [data, setData] = useState<InteresadosPublicacion | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    list
      .execute(publicacionId)
      .then((result) => {
        if (active) {
          setData(result);
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(loadError instanceof InteresadosError ? loadError.message : 'No se pudieron cargar los interesados.');
        }
      });

    return () => {
      active = false;
    };
  }, [list, publicacionId]);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-14">
      <Link href="/publicaciones" className="text-sm text-ink-soft transition-colors hover:text-primary">
        ← Volver a publicaciones
      </Link>

      <header className="mt-6 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">Interesados</p>
        <h1 className="mt-2 font-display text-[clamp(2.1rem,4.4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.03em]">
          {data?.publicacion.titulo ?? 'Personas interesadas'}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Personas que dejaron sus datos para esta publicación. El equipo de la sucursal puede
          contactarlas directamente.
        </p>
      </header>

      {error ? (
        <p role="alert" className="mt-8 border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      {!data && !error ? (
        <div className="mt-8 space-y-3">
          <div className="h-20 animate-pulse rounded-surface border border-line bg-surface" />
          <div className="h-20 animate-pulse rounded-surface border border-line bg-surface" />
        </div>
      ) : null}

      {data ? (
        <>
          <p className="mt-8 text-sm text-ink-faint" aria-live="polite">
            {data.interesados.length === 1 ? '1 interesado' : `${data.interesados.length} interesados`}
          </p>

          {data.interesados.length === 0 ? (
            <Surface className="mt-3">
              <p className="text-sm text-ink-soft">Todavía no hay personas interesadas en esta publicación.</p>
            </Surface>
          ) : (
            <ul className="mt-3 divide-y divide-line rounded-surface border border-line bg-surface">
              {data.interesados.map((interesado) => (
                <li key={interesado.id} className="flex flex-wrap items-start justify-between gap-4 px-6 py-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-ink">{interesado.nombreCompleto}</h2>
                      {interesado.favorito ? (
                        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-medium text-accent-strong">
                          Favorito
                        </span>
                      ) : null}
                    </div>
                    <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-soft">
                      {interesado.correo ? (
                        <div>
                          <dt className="sr-only">Correo</dt>
                          <dd>
                            <a href={`mailto:${interesado.correo}`} className="hover:text-primary">
                              {interesado.correo}
                            </a>
                          </dd>
                        </div>
                      ) : null}
                      {interesado.numeroTelefono ? (
                        <div>
                          <dt className="sr-only">Teléfono</dt>
                          <dd>
                            <a href={`tel:${interesado.numeroTelefono}`} className="hover:text-primary">
                              {interesado.numeroTelefono}
                            </a>
                          </dd>
                        </div>
                      ) : null}
                      {interesado.identificacion ? (
                        <div>
                          <dt className="sr-only">Identificación</dt>
                          <dd>{interesado.identificacion}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                  <p className="text-xs text-ink-faint">{formatDate(interesado.fechaRegistro)}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : null}
    </div>
  );
}
