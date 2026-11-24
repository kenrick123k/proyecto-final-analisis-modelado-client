import type { AuthenticatedUser } from '../../domain/entities/authenticated-user';
import type { AuthGatewayPort, LoginCredentials } from '../../domain/ports/auth-gateway.port';

export class LoginUseCase {
  constructor(private readonly authGateway: AuthGatewayPort) {}

  execute(credentials: LoginCredentials): Promise<AuthenticatedUser> {
    return this.authGateway.login(credentials);
  }
}
