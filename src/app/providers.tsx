'use client';

import type { ReactNode } from 'react';
import { accessControlContainer } from '@/modules/access-control/infrastructure/access-control.container';
import { AccessControlProvider } from '@/modules/access-control/presentation/context/access-control-context';
import { publicacionesContainer } from '@/modules/publicaciones/infrastructure/publicaciones.container';
import { PublicacionesProvider } from '@/modules/publicaciones/presentation/context/publicaciones-context';
import { landingContainer } from '@/modules/landing/infrastructure/landing.container';
import { LandingProvider } from '@/modules/landing/presentation/context/landing-context';
import { interesadosContainer } from '@/modules/interesados/infrastructure/interesados.container';
import { InteresadosProvider } from '@/modules/interesados/presentation/context/interesados-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AccessControlProvider useCases={accessControlContainer}>
      <PublicacionesProvider useCases={publicacionesContainer}>
        <LandingProvider useCases={landingContainer}>
          <InteresadosProvider useCases={interesadosContainer}>{children}</InteresadosProvider>
        </LandingProvider>
      </PublicacionesProvider>
    </AccessControlProvider>
  );
}
