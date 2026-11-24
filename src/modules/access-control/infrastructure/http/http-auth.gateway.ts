import {
  ForbiddenError,
  InvalidCredentialsError,
  UnauthorizedError,
} from '../../domain/errors/auth.errors';
import type { AuthenticatedUser, Role } from '../../domain/entities/authenticated-user';
import type {
  AuthGatewayPort,
  LoginCredentials,
} from '../../domain/ports/auth-gateway.port';
import { HttpError, type HttpClientPort } from '../../../../shared/application/ports/http-client.port';

interface ErrorPayload {
  readonly message?: string | string[];
  readonly error?: string;
}

function messageFrom(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== 'object' || !('message' in payload)) {
    return fallback;
  }
  const message = (payload as ErrorPayload).message;
  if (Array.isArray(message)) {
    return message.join('. ');
  }
  return message ?? fallback;
}

export class HttpAuthGateway implements AuthGatewayPort {
  constructor(private readonly httpClient: HttpClientPort) {}

  async login(credentials: LoginCredentials): Promise<AuthenticatedUser> {
    try {
      const response = await this.httpClient.request<{ user: AuthenticatedUser }>('/auth/login', {
        method: 'POST',
        body: credentials,
      });
      return response.user;
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        throw new InvalidCredentialsError(messageFrom(error.payload, 'Correo o contraseña inválidos'));
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.request<null>('/auth/logout', { method: 'POST' });
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        throw new UnauthorizedError();
      }
      throw error;
    }
  }

  async getCurrentUser(): Promise<AuthenticatedUser> {
    try {
      const response = await this.httpClient.request<{ user: AuthenticatedUser }>('/auth/me');
      return response.user;
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        throw new UnauthorizedError();
      }
      throw error;
    }
  }
}

export class HttpRoleGateway {
  constructor(private readonly httpClient: HttpClientPort) {}

  async listRoles() {
    try {
      const response = await this.httpClient.request<{ roles: Role[] }>('/roles');
      return response.roles;
    } catch (error) {
      if (error instanceof HttpError && error.status === 403) {
        throw new ForbiddenError();
      }
      if (error instanceof HttpError && error.status === 401) {
        throw new UnauthorizedError();
      }
      throw error;
    }
  }
}
