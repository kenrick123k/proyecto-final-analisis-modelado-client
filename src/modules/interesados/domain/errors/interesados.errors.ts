export type InteresadosErrorCode = 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'CONFLICT' | 'VALIDATION' | 'UNKNOWN';

export class InteresadosError extends Error {
  constructor(
    readonly code: InteresadosErrorCode,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
  }
}
