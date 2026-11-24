import type { Publicacion, UpdatePublicacionContentInput } from '../../domain/entities/publicacion';
import type { PublicacionesGatewayPort } from '../../domain/ports/publicaciones-gateway.port';

export class UpdatePublicacionContentUseCase {
  constructor(private readonly gateway: PublicacionesGatewayPort) {}

  execute(id: string, input: UpdatePublicacionContentInput): Promise<Publicacion> {
    return this.gateway.updateContent(id, input);
  }
}
