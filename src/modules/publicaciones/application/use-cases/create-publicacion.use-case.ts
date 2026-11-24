import type { CreatePublicacionInput, Publicacion } from '../../domain/entities/publicacion';
import type { PublicacionesGatewayPort } from '../../domain/ports/publicaciones-gateway.port';

export class CreatePublicacionUseCase {
  constructor(private readonly gateway: PublicacionesGatewayPort) {}

  execute(input: CreatePublicacionInput): Promise<Publicacion> {
    return this.gateway.create(input);
  }
}
