import { FetchHttpClient } from '../../../shared/infrastructure/http/fetch-http-client';
import { GetLandingDataUseCase } from '../application/use-cases/get-landing-data.use-case';
import { HttpLandingGateway } from './http/http-landing.gateway';

const httpClient = new FetchHttpClient();
const gateway = new HttpLandingGateway(httpClient);

export const landingContainer = {
  getData: new GetLandingDataUseCase(gateway),
};
