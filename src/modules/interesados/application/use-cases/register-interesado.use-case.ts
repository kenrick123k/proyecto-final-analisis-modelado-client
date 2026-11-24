import type { Interesado, RegisterInteresadoInput } from '../../domain/entities/interesado';
import type { InteresadosGatewayPort } from '../../domain/ports/interesados-gateway.port';

export class RegisterInteresadoUseCase {
  constructor(private readonly gateway: InteresadosGatewayPort) {}

  execute(input: RegisterInteresadoInput): Promise<Interesado> {
    return this.gateway.register(input);
  }
}
