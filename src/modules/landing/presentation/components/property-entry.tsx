import { formatBolivianos, formatDate } from '../../../../shared/presentation/utils/format';
import type { LandingPublicacion } from '../../domain/entities/landing-publicacion';
import { InterestButton } from '../../../interesados/presentation/components/interest-button';
import { PropertyGlyph } from './property-glyph';

export function PropertyEntry({ publicacion }: { publicacion: LandingPublicacion }) {
  return (
    <article className="grid grid-cols-[48px_1fr] gap-5 border-t border-line py-7 md:grid-cols-[64px_1fr_auto] md:gap-7">
      <PropertyGlyph title={publicacion.titulo} className="h-12 w-12 md:h-14 md:w-14" />

      <div className="min-w-0">
        <h3 className="break-words font-display text-[1.45rem] leading-tight tracking-[-0.02em] md:text-[1.65rem]">
          {publicacion.titulo}
        </h3>
        <p className="mt-2 line-clamp-2 max-w-[46rem] break-words text-sm leading-relaxed text-ink-soft">
          {publicacion.descripcion}
        </p>
        <p className="mt-3 text-xs text-accent-strong">
          {publicacion.tipoOperacion.nombre} en {publicacion.sucursal.nombre}
        </p>
        <p className="mt-1 text-xs text-ink-faint">
          En vitrina desde el {formatDate(publicacion.fechaRegistro)}
        </p>
      </div>

      <div className="col-start-2 md:col-start-auto md:text-right">
        <p className="whitespace-nowrap text-xl font-semibold md:text-2xl">
          {formatBolivianos(publicacion.precio)}
        </p>
        <p className="mt-1 text-xs text-ink-faint">Precio en bolivianos</p>
        <div className="mt-3">
          <InterestButton
            publicacionId={publicacion.id}
            titulo={publicacion.titulo}
            label="Solicitar información"
          />
        </div>
      </div>
    </article>
  );
}
