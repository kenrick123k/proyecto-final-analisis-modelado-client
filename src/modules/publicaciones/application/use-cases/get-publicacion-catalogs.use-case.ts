import type { PublicacionCatalogs } from '../../domain/entities/publicacion';
import type { PublicacionesGatewayPort } from '../../domain/ports/publicaciones-gateway.port';

export class GetPublicacionCatalogsUseCase {
  constructor(private readonly gateway: PublicacionesGatewayPort) {}

  execute(): Promise<PublicacionCatalogs> {
    return this.gateway.getCatalogs();
  }
}
