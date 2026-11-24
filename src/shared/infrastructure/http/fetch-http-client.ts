import { apiBaseUrl } from '../../config/environment';
import {
  HttpError,
  type HttpClientPort,
  type HttpRequestOptions,
} from '../../application/ports/http-client.port';

export class FetchHttpClient implements HttpClientPort {
  constructor(private readonly baseUrl: string = apiBaseUrl) {}

  async request<T>(path: string, options: HttpRequestOptions = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method ?? 'GET',
      headers: {
        Accept: 'application/json',
        ...(options.body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      credentials: 'include',
      signal: options.signal,
      cache: 'no-store',
    });

    const payload = response.status === 204 ? null : await this.parseBody(response);

    if (!response.ok) {
      throw new HttpError(response.status, payload);
    }

    return payload as T;
  }

  private async parseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return null;
    }
    return response.json();
  }
}
