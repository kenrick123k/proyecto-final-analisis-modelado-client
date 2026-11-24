import { Button } from '../../../../shared/presentation/ui/button';
import type { LandingData } from '../../domain/entities/landing-publicacion';
import { PropertyEntry } from './property-entry';

interface PropertiesCatalogueProps {
  readonly data: LandingData | null;
  readonly branch: string;
  readonly operationType: string;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly onBranchChange: (branch: string) => void;
  readonly onOperationTypeChange: (tipoOperacionId: string) => void;
  readonly onReset: () => void;
}

export function PropertiesCatalogue({
  data,
  branch,
  operationType,
  isLoading,
  error,
  onBranchChange,
  onOperationTypeChange,
  onReset,
}: PropertiesCatalogueProps) {
  const publicaciones = data?.publicaciones ?? [];
  const branchName = data?.sucursales.find((sucursal) => sucursal.id === branch)?.nombre;
  const countLabel =
    publicaciones.length === 1 ? '1 propiedad' : `${publicaciones.length} propiedades`;
  const branchLabel = branchName ? ` en ${branchName}` : '';

  return (
    <section id="vitrina" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-light leading-[1.02] tracking-[-0.035em]">
              Propiedades disponibles
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
              Filtra por ciudad o por tipo de operación. Cada ficha trae el precio, la sucursal que
              la atiende y un botón para pedir información.
            </p>
          </div>
          <p className="text-sm text-ink-faint" aria-live="polite">
            {countLabel}
            {branchLabel}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-y border-line py-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-xs text-ink-faint">Ciudad</span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1" role="group" aria-label="Filtrar por ciudad">
              <button
                type="button"
                aria-pressed={branch === 'TODAS'}
                onClick={() => onBranchChange('TODAS')}
                className={
                  branch === 'TODAS'
                    ? 'min-h-11 border-b-2 border-accent px-1 text-sm font-medium text-ink'
                    : 'min-h-11 border-b-2 border-transparent px-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink'
                }
              >
                Todas
              </button>
              {data?.sucursales.map((sucursal) => (
                <button
                  key={sucursal.id}
                  type="button"
                  aria-pressed={branch === sucursal.id}
                  onClick={() => onBranchChange(sucursal.id)}
                  className={
                    branch === sucursal.id
                      ? 'min-h-11 border-b-2 border-accent px-1 text-sm font-medium text-ink'
                      : 'min-h-11 border-b-2 border-transparent px-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink'
                  }
                >
                  {sucursal.nombre}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="operacion" className="text-xs text-ink-faint">
              Operación
            </label>
            <select
              id="operacion"
              value={operationType}
              onChange={(event) => onOperationTypeChange(event.target.value)}
              className="min-h-11 rounded-field border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
            >
              <option value="">Todas</option>
              {data?.tiposOperacion.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error ? (
          <p role="alert" className="mt-6 border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
            {error}
          </p>
        ) : null}

        <div
          className={isLoading && data ? 'mt-2 opacity-60 transition-opacity' : 'mt-2'}
          aria-busy={isLoading}
        >
          {isLoading && !data
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="grid grid-cols-[48px_1fr] gap-5 border-t border-line py-7 md:grid-cols-[64px_1fr_auto]">
                  <div className="h-12 w-12 animate-pulse rounded bg-line/60 md:h-14 md:w-14" />
                  <div className="space-y-3">
                    <div className="h-6 w-2/3 animate-pulse rounded bg-line/60" />
                    <div className="h-4 w-full max-w-lg animate-pulse rounded bg-line/40" />
                    <div className="h-3 w-40 animate-pulse rounded bg-line/40" />
                  </div>
                </div>
              ))
            : publicaciones.map((publicacion) => (
                <PropertyEntry key={publicacion.id} publicacion={publicacion} />
              ))}
        </div>

        {!isLoading && data && publicaciones.length === 0 ? (
          <div className="mt-6 rounded-surface border border-line bg-surface p-6">
            <h3 className="font-display text-2xl tracking-[-0.02em]">
              No hay propiedades con este filtro
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
              Prueba con otra ciudad u otro tipo de operación. También puedes volver a la vitrina
              completa.
            </p>
            <Button variant="outline" onClick={onReset} className="mt-5">
              Ver todas las propiedades
            </Button>
          </div>
        ) : null}

        {data && publicaciones.length > 0 ? (
          <p className="mt-5 text-xs leading-relaxed text-ink-faint">
            Los precios están en bolivianos. Puedes pedir información en todas las propiedades que
            quieras; la respuesta llega desde la sucursal de esa ciudad.
          </p>
        ) : null}
      </div>
    </section>
  );
}
