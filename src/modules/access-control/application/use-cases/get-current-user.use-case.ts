import type { AuthenticatedUser } from '../../domain/entities/authenticated-user';
import type { AuthGatewayPort } from '../../domain/ports/auth-gateway.port';

export class GetCurrentUserUseCase {
  constructor(private readonly authGateway: AuthGatewayPort) {}

  execute(): Promise<AuthenticatedUser> {
    return this.authGateway.getCurrentUser();
  }
}
