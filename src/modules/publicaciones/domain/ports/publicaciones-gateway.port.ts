import type {
  CreatePublicacionInput,
  EstadoPublicacionCodigo,
  Publicacion,
  PublicacionCatalogs,
  PublicacionConInteresados,
  UpdatePublicacionContentInput,
} from '../entities/publicacion';

export interface PublicacionesGatewayPort {
  create(input: CreatePublicacionInput): Promise<Publicacion>;
  listMine(): Promise<Publicacion[]>;
  listForApproval(): Promise<Publicacion[]>;
  listManaged(estado?: EstadoPublicacionCodigo): Promise<Publicacion[]>;
  approve(id: string): Promise<Publicacion>;
  listForPublication(): Promise<Publicacion[]>;
  listAllWithInteresados(): Promise<PublicacionConInteresados[]>;
  updateContent(id: string, input: UpdatePublicacionContentInput): Promise<Publicacion>;
  publish(id: string): Promise<Publicacion>;
  getCatalogs(): Promise<PublicacionCatalogs>;
}
