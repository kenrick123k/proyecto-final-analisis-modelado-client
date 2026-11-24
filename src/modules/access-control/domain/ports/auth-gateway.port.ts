import type { AuthenticatedUser } from '../entities/authenticated-user';

export interface LoginCredentials {
  readonly correo: string;
  readonly contrasena: string;
}

export interface AuthGatewayPort {
  login(credentials: LoginCredentials): Promise<AuthenticatedUser>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthenticatedUser>;
}
