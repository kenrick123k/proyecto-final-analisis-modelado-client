import type { PublicacionConInteresados } from '../../domain/entities/publicacion';
import type { PublicacionesGatewayPort } from '../../domain/ports/publicaciones-gateway.port';

export class ListAllPublicacionesWithInteresadosUseCase {
  constructor(private readonly gateway: PublicacionesGatewayPort) {}

  execute(): Promise<PublicacionConInteresados[]> {
    return this.gateway.listAllWithInteresados();
  }
}
