'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '../../../../shared/presentation/ui/button';
import { Field } from '../../../../shared/presentation/ui/field';
import { Select } from '../../../../shared/presentation/ui/select';
import { Surface } from '../../../../shared/presentation/ui/surface';
import { Textarea } from '../../../../shared/presentation/ui/textarea';
import type { Publicacion, TipoOperacion } from '../../domain/entities/publicacion';
import { PublicacionesError } from '../../domain/errors/publicaciones.errors';
import { usePublicaciones } from '../context/publicaciones-context';
import { publicacionSchema } from '../validation/publicacion.schema';

export function PublicationEditorDialog({
  publicacion,
  tiposOperacion,
  onClose,
  onSaved,
  onPublished,
}: {
  publicacion: Publicacion;
  tiposOperacion: TipoOperacion[];
  onClose: () => void;
  onSaved: (publicacion: Publicacion) => void;
  onPublished: (publicacion: Publicacion) => void;
}) {
  const { updateContent, publish } = usePublicaciones();
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const [titulo, setTitulo] = useState(publicacion.titulo);
  const [descripcion, setDescripcion] = useState(publicacion.descripcion);
  const [precio, setPrecio] = useState(String(publicacion.precio));
  const [tipoOperacionId, setTipoOperacionId] = useState(publicacion.tipoOperacion.id);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<'save' | 'publish' | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !pendingAction) {
        onCloseRef.current();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pendingAction]);

  async function handleSubmit(action: 'save' | 'publish') {
    const parsed = publicacionSchema.safeParse({ titulo, descripcion, precio, tipoOperacionId });

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
    setError(null);
    setSuccess(null);
    setPendingAction(action);

    try {
      const updated = await updateContent.execute(publicacion.id, parsed.data);
      onSaved(updated);

      if (action === 'publish') {
        const published = await publish.execute(publicacion.id);
        onPublished(published);
        return;
      }

      setSuccess('Cambios guardados. Puedes publicarla cuando el texto y el precio estén listos.');
    } catch (submitError) {
      setError(submitError instanceof PublicacionesError ? submitError.message : 'No se pudo completar la acción.');
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => (pendingAction ? undefined : onClose())}
        className="absolute inset-0 bg-ink/45"
      />
      <Surface
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-surface"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">
              Publicador o marketing
            </p>
            <h2 id={titleId} className="mt-2 font-display text-2xl tracking-[-0.02em]">
              Pulir publicación
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Ajusta el texto, el precio y la operación antes de abrirla al público.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            disabled={pendingAction !== null}
            aria-label="Cerrar editor"
            className="inline-flex h-11 w-11 items-center justify-center rounded-field text-ink-soft hover:text-ink disabled:opacity-50"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form
          className="mt-6 flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
            void handleSubmit(submitter?.value === 'publish' ? 'publish' : 'save');
          }}
        >
          <Field
            label="Título"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            error={fieldErrors.titulo}
            disabled={pendingAction !== null}
          />
          <Textarea
            label="Descripción"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            error={fieldErrors.descripcion}
            disabled={pendingAction !== null}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Precio (Bs)"
              type="number"
              inputMode="decimal"
              min="1"
              step="0.01"
              value={precio}
              onChange={(event) => setPrecio(event.target.value)}
              error={fieldErrors.precio}
              disabled={pendingAction !== null}
            />
            <Select
              label="Tipo de operación"
              value={tipoOperacionId}
              onChange={(event) => setTipoOperacionId(event.target.value)}
              error={fieldErrors.tipoOperacionId}
              disabled={pendingAction !== null}
            >
              {tiposOperacion.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </Select>
          </div>

          {error ? (
            <p role="alert" className="border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
              {error}
            </p>
          ) : null}
          {success ? (
            <p role="status" className="border-l-2 border-primary bg-primary-soft px-4 py-3 text-sm text-primary">
              {success}
            </p>
          ) : null}

          <div className="flex flex-wrap justify-end gap-3 border-t border-line pt-5">
            <Button variant="ghost" onClick={onClose} disabled={pendingAction !== null}>
              Cancelar
            </Button>
            <Button type="submit" variant="outline" value="save" disabled={pendingAction !== null}>
              {pendingAction === 'save' ? 'Guardando…' : 'Guardar cambios'}
            </Button>
            <Button type="submit" value="publish" disabled={pendingAction !== null}>
              {pendingAction === 'publish' ? 'Publicando…' : 'Publicar en landing'}
            </Button>
          </div>
        </form>
      </Surface>
    </div>
  );
}
