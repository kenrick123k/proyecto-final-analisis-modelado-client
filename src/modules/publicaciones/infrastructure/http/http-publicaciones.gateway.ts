import { HttpError, type HttpClientPort } from '../../../../shared/application/ports/http-client.port';
import type {
  CreatePublicacionInput,
  EstadoPublicacionCodigo,
  Publicacion,
  PublicacionCatalogs,
  PublicacionConInteresados,
  UpdatePublicacionContentInput,
} from '../../domain/entities/publicacion';
import { PublicacionesError, type PublicacionesErrorCode } from '../../domain/errors/publicaciones.errors';
import type { PublicacionesGatewayPort } from '../../domain/ports/publicaciones-gateway.port';

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

function toPublicacionesError(error: unknown, fallback: string): PublicacionesError {
  if (!(error instanceof HttpError)) {
    return new PublicacionesError('UNKNOWN', fallback);
  }
  const codes: Partial<Record<number, PublicacionesErrorCode>> = {
    400: 'VALIDATION',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    409: 'CONFLICT',
  };
  return new PublicacionesError(codes[error.status] ?? 'UNKNOWN', messageFrom(error.payload, fallback));
}

export class HttpPublicacionesGateway implements PublicacionesGatewayPort {
  constructor(private readonly httpClient: HttpClientPort) {}

  async create(input: CreatePublicacionInput): Promise<Publicacion> {
    try {
      const response = await this.httpClient.request<{ publicacion: Publicacion }>('/publicaciones', {
        method: 'POST',
        body: input,
      });
      return response.publicacion;
    } catch (error) {
      throw toPublicacionesError(error, 'No se pudo registrar la publicación');
    }
  }

  async listMine(): Promise<Publicacion[]> {
    try {
      const response = await this.httpClient.request<{ publicaciones: Publicacion[] }>('/publicaciones/mias');
      return response.publicaciones;
    } catch (error) {
      throw toPublicacionesError(error, 'No se pudieron cargar tus publicaciones');
    }
  }

  async listForApproval(): Promise<Publicacion[]> {
    try {
      const response = await this.httpClient.request<{ publicaciones: Publicacion[] }>(
        '/publicaciones/por-aprobar',
      );
      return response.publicaciones;
    } catch (error) {
      throw toPublicacionesError(error, 'No se pudieron cargar las solicitudes pendientes');
    }
  }

  async listManaged(estado?: EstadoPublicacionCodigo): Promise<Publicacion[]> {
    try {
      const query = estado ? `?estado=${encodeURIComponent(estado)}` : '';
      const response = await this.httpClient.request<{ publicaciones: Publicacion[] }>(
        `/publicaciones/administrar${query}`,
      );
      return response.publicaciones;
    } catch (error) {
      throw toPublicacionesError(error, 'No se pudieron cargar las publicaciones de la sucursal');
    }
  }

  async listForPublication(): Promise<Publicacion[]> {
    try {
      const response = await this.httpClient.request<{ publicaciones: Publicacion[] }>(
        '/publicaciones/por-publicar',
      );
      return response.publicaciones;
    } catch (error) {
      throw toPublicacionesError(error, 'No se pudieron cargar las publicaciones aprobadas');
    }
  }

  async listAllWithInteresados(): Promise<PublicacionConInteresados[]> {
    try {
      const response = await this.httpClient.request<{ publicaciones: PublicacionConInteresados[] }>(
        '/publicaciones/todas',
      );
      return response.publicaciones;
    } catch (error) {
      throw toPublicacionesError(error, 'No se pudieron cargar todas las publicaciones');
    }
  }

  async updateContent(id: string, input: UpdatePublicacionContentInput): Promise<Publicacion> {
    try {
      const response = await this.httpClient.request<{ publicacion: Publicacion }>(
        `/publicaciones/${id}`,
        { method: 'PATCH', body: input },
      );
      return response.publicacion;
    } catch (error) {
      throw toPublicacionesError(error, 'No se pudieron guardar los cambios');
    }
  }

  async approve(id: string): Promise<Publicacion> {
    try {
      const response = await this.httpClient.request<{ publicacion: Publicacion }>(
        `/publicaciones/${id}/aprobar`,
        { method: 'POST' },
      );
      return response.publicacion;
    } catch (error) {
      throw toPublicacionesError(error, 'No se pudo aprobar la publicación');
    }
  }

  async publish(id: string): Promise<Publicacion> {
    try {
      const response = await this.httpClient.request<{ publicacion: Publicacion }>(
        `/publicaciones/${id}/publicar`,
        { method: 'POST' },
      );
      return response.publicacion;
    } catch (error) {
      throw toPublicacionesError(error, 'No se pudo publicar la propiedad');
    }
  }

  async getCatalogs(): Promise<PublicacionCatalogs> {
    try {
      return await this.httpClient.request<PublicacionCatalogs>('/publicaciones/catalogos');
    } catch (error) {
      throw toPublicacionesError(error, 'No se pudieron cargar los catálogos');
    }
  }
}
