import type { Role } from '../entities/authenticated-user';

export interface RoleGatewayPort {
  listRoles(): Promise<Role[]>;
}
