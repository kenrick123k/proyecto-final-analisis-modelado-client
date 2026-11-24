export type PublicacionesErrorCode = 'UNAUTHORIZED' | 'FORBIDDEN' | 'CONFLICT' | 'VALIDATION' | 'UNKNOWN';

export class PublicacionesError extends Error {
  constructor(
    readonly code: PublicacionesErrorCode,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
  }
}
