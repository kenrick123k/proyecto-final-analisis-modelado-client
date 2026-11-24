'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthError } from '../../domain/errors/auth.errors';
import type { LoginCredentials } from '../../domain/ports/auth-gateway.port';
import { useAccessControl } from '../context/access-control-context';

export function useLogin() {
  const router = useRouter();
  const { login: loginUseCase } = useAccessControl();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(credentials: LoginCredentials): Promise<boolean> {
    setError(null);
    setIsSubmitting(true);
    try {
      await loginUseCase.execute(credentials);
      router.replace('/dashboard');
      return true;
    } catch (loginError) {
      setError(
        loginError instanceof AuthError
          ? loginError.message
          : 'No se pudo iniciar sesión. Intenta de nuevo.',
      );
      setIsSubmitting(false);
      return false;
    }
  }

  return { login, isSubmitting, error };
}
