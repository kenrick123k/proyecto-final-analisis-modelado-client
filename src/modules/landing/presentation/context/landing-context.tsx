'use client';

import { createContext, use, type ReactNode } from 'react';
import type { GetLandingDataUseCase } from '../../application/use-cases/get-landing-data.use-case';

export interface LandingUseCases {
  readonly getData: GetLandingDataUseCase;
}

const LandingContext = createContext<LandingUseCases | null>(null);

export function LandingProvider({ useCases, children }: { useCases: LandingUseCases; children: ReactNode }) {
  return <LandingContext value={useCases}>{children}</LandingContext>;
}

export function useLanding(): LandingUseCases {
  const useCases = use(LandingContext);
  if (!useCases) {
    throw new Error('useLanding must be used inside LandingProvider');
  }
  return useCases;
}
