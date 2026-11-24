import type { Publicacion } from '../../domain/entities/publicacion';
import type { PublicacionesGatewayPort } from '../../domain/ports/publicaciones-gateway.port';

export class PublishPublicacionUseCase {
  constructor(private readonly gateway: PublicacionesGatewayPort) {}

  execute(id: string): Promise<Publicacion> {
    return this.gateway.publish(id);
  }
}
