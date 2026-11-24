'use client';

import { useState, type FormEvent } from 'react';
import { loginSchema } from '../validation/login.schema';
import { Button } from '@/shared/presentation/ui/button';
import { Field } from '@/shared/presentation/ui/field';
import { useLogin } from '../hooks/use-login';

export function LoginForm() {
  const { login, isSubmitting, error } = useLogin();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = loginSchema.safeParse({
      correo: String(formData.get('correo') ?? ''),
      contrasena: String(formData.get('contrasena') ?? ''),
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
    await login(parsed.data);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Field
        label="Correo electrónico"
        name="correo"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="nombre@agencia.com"
        error={fieldErrors.correo}
        disabled={isSubmitting}
      />

      <Field
        label="Contraseña"
        name="contrasena"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="Tu contraseña"
        error={fieldErrors.contrasena}
        disabled={isSubmitting}
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-pressed={showPassword}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="rounded px-2 py-1 text-xs font-medium text-ink-soft transition-colors hover:text-primary"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        }
      />

      {error ? (
        <p
          role="alert"
          className="border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm leading-relaxed text-danger"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="mt-1 w-full py-3.5 text-base">
        {isSubmitting ? 'Ingresando…' : 'Entrar al panel'}
      </Button>
    </form>
  );
}
