export interface HttpRequestOptions {
  readonly method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  readonly body?: unknown;
  readonly headers?: Record<string, string>;
  readonly signal?: AbortSignal;
}

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly payload: unknown,
  ) {
    super(`HTTP request failed with status ${status}`);
    this.name = 'HttpError';
  }
}

export interface HttpClientPort {
  request<T>(path: string, options?: HttpRequestOptions): Promise<T>;
}
