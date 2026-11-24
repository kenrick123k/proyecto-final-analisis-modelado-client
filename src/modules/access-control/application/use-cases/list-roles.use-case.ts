import type { Role } from '../../domain/entities/authenticated-user';
import type { RoleGatewayPort } from '../../domain/ports/role-gateway.port';

export class ListRolesUseCase {
  constructor(private readonly roleGateway: RoleGatewayPort) {}

  execute(): Promise<Role[]> {
    return this.roleGateway.listRoles();
  }
}
