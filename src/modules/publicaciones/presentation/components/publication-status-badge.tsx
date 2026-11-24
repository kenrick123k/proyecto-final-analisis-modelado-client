import type { PublicacionEstado } from '../../domain/entities/publicacion';

export function PublicationStatusBadge({ estado }: { estado: PublicacionEstado }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: estado.color }}
      />
      {estado.nombre}
    </span>
  );
}
