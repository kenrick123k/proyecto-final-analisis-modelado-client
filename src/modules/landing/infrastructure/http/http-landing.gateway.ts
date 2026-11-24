import type { HttpClientPort } from '../../../../shared/application/ports/http-client.port';
import { HttpError } from '../../../../shared/application/ports/http-client.port';
import type { LandingData, LandingFilters } from '../../domain/entities/landing-publicacion';
import { LandingError } from '../../domain/errors/landing.errors';
import type { LandingGatewayPort } from '../../domain/ports/landing-gateway.port';

export class HttpLandingGateway implements LandingGatewayPort {
  constructor(private readonly httpClient: HttpClientPort) {}

  async getData(filters: LandingFilters): Promise<LandingData> {
    const params = new URLSearchParams();
    if (filters.sucursalId) {
      params.set('sucursalId', filters.sucursalId);
    }
    if (filters.tipoOperacionId) {
      params.set('tipoOperacionId', filters.tipoOperacionId);
    }
    const query = params.size > 0 ? `?${params.toString()}` : '';

    try {
      return await this.httpClient.request<LandingData>(`/landing/publicaciones${query}`);
    } catch (error) {
      if (error instanceof HttpError) {
        throw new LandingError('La vitrina pública no está disponible en este momento.');
      }
      throw new LandingError();
    }
  }
}
