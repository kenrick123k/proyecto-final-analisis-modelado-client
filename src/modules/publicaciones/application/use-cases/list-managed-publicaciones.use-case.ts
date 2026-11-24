import type { EstadoPublicacionCodigo, Publicacion } from '../../domain/entities/publicacion';
import type { PublicacionesGatewayPort } from '../../domain/ports/publicaciones-gateway.port';

export class ListManagedPublicacionesUseCase {
  constructor(private readonly gateway: PublicacionesGatewayPort) {}

  execute(estado?: EstadoPublicacionCodigo): Promise<Publicacion[]> {
    return this.gateway.listManaged(estado);
  }
}
