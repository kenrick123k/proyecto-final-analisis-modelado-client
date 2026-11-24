'use client';

import { createContext, use, type ReactNode } from 'react';
import type { ListInteresadosUseCase } from '../../application/use-cases/list-interesados.use-case';
import type { RegisterInteresadoUseCase } from '../../application/use-cases/register-interesado.use-case';

export interface InteresadosUseCases {
  readonly register: RegisterInteresadoUseCase;
  readonly list: ListInteresadosUseCase;
}

const InteresadosContext = createContext<InteresadosUseCases | null>(null);

export function InteresadosProvider({ useCases, children }: { useCases: InteresadosUseCases; children: ReactNode }) {
  return <InteresadosContext value={useCases}>{children}</InteresadosContext>;
}

export function useInteresados(): InteresadosUseCases {
  const useCases = use(InteresadosContext);
  if (!useCases) {
    throw new Error('useInteresados must be used inside InteresadosProvider');
  }
  return useCases;
}
