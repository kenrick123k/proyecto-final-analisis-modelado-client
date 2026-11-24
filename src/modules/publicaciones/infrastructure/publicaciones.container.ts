import { FetchHttpClient } from '../../../shared/infrastructure/http/fetch-http-client';
import { ApprovePublicacionUseCase } from '../application/use-cases/approve-publicacion.use-case';
import { CreatePublicacionUseCase } from '../application/use-cases/create-publicacion.use-case';
import { GetPublicacionCatalogsUseCase } from '../application/use-cases/get-publicacion-catalogs.use-case';
import { ListForApprovalUseCase } from '../application/use-cases/list-for-approval.use-case';
import { ListManagedPublicacionesUseCase } from '../application/use-cases/list-managed-publicaciones.use-case';
import { ListAllPublicacionesWithInteresadosUseCase } from '../application/use-cases/list-all-with-interesados.use-case';
import { ListForPublicationUseCase } from '../application/use-cases/list-for-publication.use-case';
import { ListMyPublicacionesUseCase } from '../application/use-cases/list-my-publicaciones.use-case';
import { PublishPublicacionUseCase } from '../application/use-cases/publish-publicacion.use-case';
import { UpdatePublicacionContentUseCase } from '../application/use-cases/update-publicacion-content.use-case';
import { HttpPublicacionesGateway } from './http/http-publicaciones.gateway';

const httpClient = new FetchHttpClient();
const gateway = new HttpPublicacionesGateway(httpClient);

export const publicacionesContainer = {
  create: new CreatePublicacionUseCase(gateway),
  listMine: new ListMyPublicacionesUseCase(gateway),
  listForApproval: new ListForApprovalUseCase(gateway),
  listManaged: new ListManagedPublicacionesUseCase(gateway),
  approve: new ApprovePublicacionUseCase(gateway),
  listForPublication: new ListForPublicationUseCase(gateway),
  listAllWithInteresados: new ListAllPublicacionesWithInteresadosUseCase(gateway),
  updateContent: new UpdatePublicacionContentUseCase(gateway),
  publish: new PublishPublicacionUseCase(gateway),
  catalogs: new GetPublicacionCatalogsUseCase(gateway),
};
