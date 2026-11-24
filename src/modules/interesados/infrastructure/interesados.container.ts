import { FetchHttpClient } from '../../../shared/infrastructure/http/fetch-http-client';
import { ListInteresadosUseCase } from '../application/use-cases/list-interesados.use-case';
import { RegisterInteresadoUseCase } from '../application/use-cases/register-interesado.use-case';
import { HttpInteresadosGateway } from './http/http-interesados.gateway';

const httpClient = new FetchHttpClient();
const gateway = new HttpInteresadosGateway(httpClient);

export const interesadosContainer = {
  register: new RegisterInteresadoUseCase(gateway),
  list: new ListInteresadosUseCase(gateway),
};
