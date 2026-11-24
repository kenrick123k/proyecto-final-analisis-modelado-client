'use client';

import { createContext, use, type ReactNode } from 'react';
import type { GetCurrentUserUseCase } from '../../application/use-cases/get-current-user.use-case';
import type { ListRolesUseCase } from '../../application/use-cases/list-roles.use-case';
import type { LoginUseCase } from '../../application/use-cases/login.use-case';
import type { LogoutUseCase } from '../../application/use-cases/logout.use-case';

export interface AccessControlUseCases {
  readonly login: LoginUseCase;
  readonly logout: LogoutUseCase;
  readonly currentUser: GetCurrentUserUseCase;
  readonly listRoles: ListRolesUseCase;
}

const AccessControlContext = createContext<AccessControlUseCases | null>(null);

export function AccessControlProvider({
  useCases,
  children,
}: {
  useCases: AccessControlUseCases;
  children: ReactNode;
}) {
  return <AccessControlContext value={useCases}>{children}</AccessControlContext>;
}

export function useAccessControl(): AccessControlUseCases {
  const useCases = use(AccessControlContext);
  if (!useCases) {
    throw new Error('useAccessControl must be used inside AccessControlProvider');
  }
  return useCases;
}
