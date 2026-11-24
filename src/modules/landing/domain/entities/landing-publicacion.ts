export interface LandingPublicacion {
  readonly id: string;
  readonly titulo: string;
  readonly descripcion: string;
  readonly precio: number;
  readonly moneda: 'BOB';
  readonly fechaRegistro: string;
  readonly sucursal: {
    readonly id: string;
    readonly nombre: string;
  };
  readonly tipoOperacion: {
    readonly id: string;
    readonly nombre: string;
  };
}

export interface LandingFiltro {
  readonly id: string;
  readonly nombre: string;
}

export interface LandingData {
  readonly publicaciones: LandingPublicacion[];
  readonly sucursales: LandingFiltro[];
  readonly tiposOperacion: LandingFiltro[];
}

export interface LandingFilters {
  readonly sucursalId?: string;
  readonly tipoOperacionId?: string;
}
