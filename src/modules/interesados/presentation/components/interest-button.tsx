'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Button } from '../../../../shared/presentation/ui/button';
import { Field } from '../../../../shared/presentation/ui/field';
import { Surface } from '../../../../shared/presentation/ui/surface';
import { InteresadosError } from '../../domain/errors/interesados.errors';
import { useInteresados } from '../context/interesados-context';
import { interesadoSchema } from '../validation/interesado.schema';

export function InterestButton({
  publicacionId,
  titulo,
  label = 'Me interesa',
}: {
  publicacionId: string;
  titulo: string;
  label?: string;
}) {
  const { register } = useInteresados();
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !isSubmitting) {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSubmitting]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = interesadoSchema.safeParse({
      nombreCompleto: String(formData.get('nombreCompleto') ?? ''),
      correo: String(formData.get('correo') ?? ''),
      identificacion: String(formData.get('identificacion') ?? '') || undefined,
      numeroTelefono: String(formData.get('numeroTelefono') ?? '') || undefined,
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
    setError(null);
    setIsSubmitting(true);

    try {
      await register.execute({ publicacionId, ...parsed.data });
      setSuccess(true);
      form.reset();
    } catch (submitError) {
      setError(submitError instanceof InteresadosError ? submitError.message : 'No se pudo registrar tu interés.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function close() {
    setIsOpen(false);
    setSuccess(false);
    setError(null);
    setFieldErrors({});
  }

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)} className="px-4 py-2.5">
        {label}
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => (isSubmitting ? undefined : close())}
            className="absolute inset-0 bg-ink/50"
          />
          <Surface
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto bg-surface"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-ink-faint">Consulta</p>
                <h2 id={titleId} className="mt-2 font-display text-2xl tracking-[-0.02em]">
                  {success ? 'Interés registrado' : 'Quiero que me contacten'}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{titulo}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                disabled={isSubmitting}
                aria-label="Cerrar formulario"
                className="inline-flex h-11 w-11 items-center justify-center rounded-field text-ink-soft hover:text-ink disabled:opacity-50"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {success ? (
              <div className="mt-6">
                <p role="status" className="border-l-2 border-primary bg-primary-soft px-4 py-3 text-sm text-primary">
                  Recibimos tus datos. La sucursal se pondrá en contacto contigo.
                </p>
                <Button onClick={close} className="mt-6 w-full py-3.5">
                  Cerrar
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
                <Field
                  label="Nombre completo"
                  name="nombreCompleto"
                  autoComplete="name"
                  placeholder="María Fernández"
                  error={fieldErrors.nombreCompleto}
                  disabled={isSubmitting}
                />
                <Field
                  label="Correo electrónico"
                  name="correo"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  error={fieldErrors.correo}
                  disabled={isSubmitting}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Identificación (opcional)"
                    name="identificacion"
                    placeholder="V-12345678"
                    error={fieldErrors.identificacion}
                    disabled={isSubmitting}
                  />
                  <Field
                    label="Teléfono (opcional)"
                    name="numeroTelefono"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+591 700 00000"
                    error={fieldErrors.numeroTelefono}
                    disabled={isSubmitting}
                  />
                </div>

                {error ? (
                  <p role="alert" className="border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
                    {error}
                  </p>
                ) : null}

                <p className="text-xs leading-relaxed text-ink-faint">
                  Usamos estos datos solo para responder tu consulta por esta propiedad.
                </p>

                <Button type="submit" disabled={isSubmitting} className="w-full py-3.5">
                  {isSubmitting ? 'Enviando…' : 'Enviar mis datos'}
                </Button>
              </form>
            )}
          </Surface>
        </div>
      ) : null}
    </>
  );
}
