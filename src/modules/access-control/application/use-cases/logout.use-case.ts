import type { AuthGatewayPort } from '../../domain/ports/auth-gateway.port';

export class LogoutUseCase {
  constructor(private readonly authGateway: AuthGatewayPort) {}

  execute(): Promise<void> {
    return this.authGateway.logout();
  }
}
