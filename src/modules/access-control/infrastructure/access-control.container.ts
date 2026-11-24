import { FetchHttpClient } from '../../../shared/infrastructure/http/fetch-http-client';
import { GetCurrentUserUseCase } from '../application/use-cases/get-current-user.use-case';
import { ListRolesUseCase } from '../application/use-cases/list-roles.use-case';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { LogoutUseCase } from '../application/use-cases/logout.use-case';
import { HttpAuthGateway, HttpRoleGateway } from './http/http-auth.gateway';

const httpClient = new FetchHttpClient();
const authGateway = new HttpAuthGateway(httpClient);
const roleGateway = new HttpRoleGateway(httpClient);

export const accessControlContainer = {
  login: new LoginUseCase(authGateway),
  logout: new LogoutUseCase(authGateway),
  currentUser: new GetCurrentUserUseCase(authGateway),
  listRoles: new ListRolesUseCase(roleGateway),
};
