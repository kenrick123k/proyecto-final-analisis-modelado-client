export type AuthErrorCode = 'INVALID_CREDENTIALS' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'UNKNOWN';

export class AuthError extends Error {
  constructor(
    readonly code: AuthErrorCode,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message = 'Correo o contraseña inválidos') {
    super('INVALID_CREDENTIALS', message);
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message = 'Debes iniciar sesión') {
    super('UNAUTHORIZED', message);
  }
}

export class ForbiddenError extends AuthError {
  constructor(message = 'No tienes permisos para este recurso') {
    super('FORBIDDEN', message);
  }
}
