'use client';

import { createContext, use, type ReactNode } from 'react';
import type { ApprovePublicacionUseCase } from '../../application/use-cases/approve-publicacion.use-case';
import type { CreatePublicacionUseCase } from '../../application/use-cases/create-publicacion.use-case';
import type { GetPublicacionCatalogsUseCase } from '../../application/use-cases/get-publicacion-catalogs.use-case';
import type { ListForApprovalUseCase } from '../../application/use-cases/list-for-approval.use-case';
import type { ListManagedPublicacionesUseCase } from '../../application/use-cases/list-managed-publicaciones.use-case';
import type { ListAllPublicacionesWithInteresadosUseCase } from '../../application/use-cases/list-all-with-interesados.use-case';
import type { ListForPublicationUseCase } from '../../application/use-cases/list-for-publication.use-case';
import type { ListMyPublicacionesUseCase } from '../../application/use-cases/list-my-publicaciones.use-case';
import type { PublishPublicacionUseCase } from '../../application/use-cases/publish-publicacion.use-case';
import type { UpdatePublicacionContentUseCase } from '../../application/use-cases/update-publicacion-content.use-case';

export interface PublicacionesUseCases {
  readonly create: CreatePublicacionUseCase;
  readonly listMine: ListMyPublicacionesUseCase;
  readonly listForApproval: ListForApprovalUseCase;
  readonly listManaged: ListManagedPublicacionesUseCase;
  readonly approve: ApprovePublicacionUseCase;
  readonly listForPublication: ListForPublicationUseCase;
  readonly listAllWithInteresados: ListAllPublicacionesWithInteresadosUseCase;
  readonly updateContent: UpdatePublicacionContentUseCase;
  readonly publish: PublishPublicacionUseCase;
  readonly catalogs: GetPublicacionCatalogsUseCase;
}

const PublicacionesContext = createContext<PublicacionesUseCases | null>(null);

export function PublicacionesProvider({
  useCases,
  children,
}: {
  useCases: PublicacionesUseCases;
  children: ReactNode;
}) {
  return <PublicacionesContext value={useCases}>{children}</PublicacionesContext>;
}

export function usePublicaciones(): PublicacionesUseCases {
  const useCases = use(PublicacionesContext);
  if (!useCases) {
    throw new Error('usePublicaciones must be used inside PublicacionesProvider');
  }
  return useCases;
}
