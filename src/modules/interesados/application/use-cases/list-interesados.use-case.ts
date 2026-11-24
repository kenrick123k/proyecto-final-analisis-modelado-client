import type { InteresadosPublicacion } from '../../domain/entities/interesado';
import type { InteresadosGatewayPort } from '../../domain/ports/interesados-gateway.port';

export class ListInteresadosUseCase {
  constructor(private readonly gateway: InteresadosGatewayPort) {}

  execute(publicacionId: string): Promise<InteresadosPublicacion> {
    return this.gateway.listByPublicacion(publicacionId);
  }
}
