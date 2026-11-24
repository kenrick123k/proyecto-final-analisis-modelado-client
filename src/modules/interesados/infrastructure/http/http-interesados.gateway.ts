import { HttpError, type HttpClientPort } from '../../../../shared/application/ports/http-client.port';
import type { Interesado, InteresadosPublicacion, RegisterInteresadoInput } from '../../domain/entities/interesado';
import { InteresadosError, type InteresadosErrorCode } from '../../domain/errors/interesados.errors';
import type { InteresadosGatewayPort } from '../../domain/ports/interesados-gateway.port';

interface ErrorPayload {
  readonly message?: string | string[];
}

function messageFrom(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== 'object' || !('message' in payload)) {
    return fallback;
  }
  const message = (payload as ErrorPayload).message;
  return Array.isArray(message) ? message.join('. ') : (message ?? fallback);
}

function toInteresadosError(error: unknown, fallback: string): InteresadosError {
  if (!(error instanceof HttpError)) {
    return new InteresadosError('UNKNOWN', fallback);
  }
  const codes: Partial<Record<number, InteresadosErrorCode>> = {
    400: 'VALIDATION',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    409: 'CONFLICT',
  };
  return new InteresadosError(codes[error.status] ?? 'UNKNOWN', messageFrom(error.payload, fallback));
}

export class HttpInteresadosGateway implements InteresadosGatewayPort {
  constructor(private readonly httpClient: HttpClientPort) {}

  async register(input: RegisterInteresadoInput): Promise<Interesado> {
    try {
      const response = await this.httpClient.request<{ interesado: Interesado }>('/interesados', {
        method: 'POST',
        body: input,
      });
      return response.interesado;
    } catch (error) {
      throw toInteresadosError(error, 'No se pudo registrar tu interés');
    }
  }

  async listByPublicacion(publicacionId: string): Promise<InteresadosPublicacion> {
    try {
      return await this.httpClient.request<InteresadosPublicacion>(
        `/interesados/publicacion/${publicacionId}`,
      );
    } catch (error) {
      throw toInteresadosError(error, 'No se pudieron cargar los interesados');
    }
  }
}
