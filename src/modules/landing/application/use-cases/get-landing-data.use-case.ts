import type { LandingData, LandingFilters } from '../../domain/entities/landing-publicacion';
import type { LandingGatewayPort } from '../../domain/ports/landing-gateway.port';

export class GetLandingDataUseCase {
  constructor(private readonly gateway: LandingGatewayPort) {}

  execute(filters: LandingFilters = {}): Promise<LandingData> {
    return this.gateway.getData(filters);
  }
}
