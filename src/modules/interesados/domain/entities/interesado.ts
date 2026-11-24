export interface Interesado {
  readonly id: string;
  readonly nombreCompleto: string;
  readonly correo: string | null;
  readonly identificacion: string | null;
  readonly numeroTelefono: string | null;
  readonly favorito: boolean;
  readonly fechaRegistro: string;
}

export interface InteresadosPublicacion {
  readonly publicacion: {
    readonly id: string;
    readonly titulo: string;
    readonly sucursalId: string;
  };
  readonly interesados: Interesado[];
}

export interface RegisterInteresadoInput {
  readonly publicacionId: string;
  readonly nombreCompleto: string;
  readonly correo: string;
  readonly identificacion?: string;
  readonly numeroTelefono?: string;
}
