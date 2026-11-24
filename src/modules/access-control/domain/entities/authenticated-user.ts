export interface Role {
  readonly id: string;
  readonly nombre: string;
  readonly estado: boolean;
}

export interface AuthenticatedUser {
  readonly id: string;
  readonly nombreCompleto: string;
  readonly correo: string;
  readonly identificacion: string;
  readonly numeroTelefono: string | null;
  readonly sucursalId: string;
  readonly estado: boolean;
  readonly rol: {
    readonly id: string;
    readonly nombre: string;
  };
}
