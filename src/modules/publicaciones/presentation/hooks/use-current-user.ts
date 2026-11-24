'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthenticatedUser } from '../../../access-control/domain/entities/authenticated-user';
import { AuthError } from '../../../access-control/domain/errors/auth.errors';
import { useAccessControl } from '../../../access-control/presentation/context/access-control-context';

export function useCurrentUser() {
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
        setError('No se pudo cargar tu sesión.');
      });

    return () => {
      active = false;
    };
  }, [currentUser, router]);

  return { user, error, isLoading: !user && !error };
}
