import type { Interesado, InteresadosPublicacion, RegisterInteresadoInput } from '../entities/interesado';

export interface InteresadosGatewayPort {
  register(input: RegisterInteresadoInput): Promise<Interesado>;
  listByPublicacion(publicacionId: string): Promise<InteresadosPublicacion>;
}
