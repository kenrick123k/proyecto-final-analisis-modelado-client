export type EstadoPublicacionCodigo = 'PENDIENTE_APROBACION' | 'APROBADA' | 'PUBLICADA';

export interface PublicacionEstado {
  readonly id: string;
  readonly codigo: EstadoPublicacionCodigo;
  readonly nombre: string;
  readonly color: string;
  readonly descripcion: string | null;
}

export interface TipoOperacion {
  readonly id: string;
  readonly nombre: string;
}

export interface Publicacion {
  readonly id: string;
  readonly sucursalId: string;
  readonly sucursalNombre: string;
  readonly usuarioId: string;
  readonly usuarioNombre: string;
  readonly titulo: string;
  readonly descripcion: string;
  readonly precio: number;
  readonly fechaRegistro: string;
  readonly estado: PublicacionEstado;
  readonly tipoOperacion: TipoOperacion;
}

export interface PublicacionCatalogs {
  readonly estados: PublicacionEstado[];
  readonly tiposOperacion: TipoOperacion[];
}

export interface CreatePublicacionInput {
  readonly titulo: string;
  readonly descripcion: string;
  readonly precio: number;
  readonly tipoOperacionId: string;
}

export type UpdatePublicacionContentInput = Partial<
  Pick<CreatePublicacionInput, 'titulo' | 'descripcion' | 'precio' | 'tipoOperacionId'>
>;

export interface PublicacionInteresadoResumen {
  readonly id: string;
  readonly nombreCompleto: string;
  readonly correo: string | null;
  readonly identificacion: string | null;
  readonly numeroTelefono: string | null;
  readonly favorito: boolean;
  readonly fechaRegistro: string;
}

export interface PublicacionConInteresados extends Publicacion {
  readonly interesados: PublicacionInteresadoResumen[];
}
