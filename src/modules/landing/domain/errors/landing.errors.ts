export class LandingError extends Error {
  constructor(message = 'No se pudieron cargar las propiedades publicadas') {
    super(message);
    this.name = 'LandingError';
  }
}
