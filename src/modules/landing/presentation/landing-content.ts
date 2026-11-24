export interface BranchProfile {
  readonly nombre: string;
  readonly altitud: string;
  readonly altitudMetros: number;
  readonly descripcion: string;
}

export const BRANCH_PROFILES: readonly BranchProfile[] = [
  {
    nombre: 'Santa Cruz',
    altitud: '416 m',
    altitudMetros: 416,
    descripcion: 'Calor, jardines y una ciudad que crece hacia los cuatro costados.',
  },
  {
    nombre: 'Tarija',
    altitud: '1.854 m',
    altitudMetros: 1854,
    descripcion: 'Valles, árboles y un centro que todavía se recorre a pie.',
  },
  {
    nombre: 'La Paz',
    altitud: '3.640 m',
    altitudMetros: 3640,
    descripcion: 'La hoyada, el altiplano y una vida que se organiza en pendiente.',
  },
];

export const PREFERRED_BRANCH_ORDER = ['Santa Cruz', 'La Paz', 'Tarija'] as const;

export function profileForBranch(nombre: string): BranchProfile | undefined {
  return BRANCH_PROFILES.find((profile) => profile.nombre === nombre);
}
