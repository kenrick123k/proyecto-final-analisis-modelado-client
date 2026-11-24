import type { Publicacion } from '../../domain/entities/publicacion';
import type { PublicacionesGatewayPort } from '../../domain/ports/publicaciones-gateway.port';

export class ListMyPublicacionesUseCase {
  constructor(private readonly gateway: PublicacionesGatewayPort) {}

  execute(): Promise<Publicacion[]> {
    return this.gateway.listMine();
  }
}
