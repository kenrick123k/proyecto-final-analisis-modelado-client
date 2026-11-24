import type { LandingData, LandingFilters } from '../entities/landing-publicacion';

export interface LandingGatewayPort {
  getData(filters: LandingFilters): Promise<LandingData>;
}
