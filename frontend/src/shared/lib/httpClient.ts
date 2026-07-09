import { keys, storage } from '@/shared/lib/storage'
import { httpError } from '@/shared/lib/httpError'

class client {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public async get<T>(
    url: string,
    ignore_not_found: boolean = false
  ): Promise<T> {
    const response: Response = await fetch(this.url(url), {
      method: 'GET',
      headers: this.setHeaders(),
    })

    return this.handleResponse<T>(response, ignore_not_found)
  }

  public async post<T>(url: string, body?: unknown): Promise<T> {
    try {
      const response: Response = await fetch(this.url(url), {
        method: 'POST',
        body: JSON.stringify(body),
        headers: this.setHeaders(),
      })

      return this.handleResponse<T>(response)
    } catch (error) {
      throw httpError.fromError(error)
    }
  }

  private async handleResponse<T>(
    response: Response,
    ignore_not_found: boolean = false,
  ): Promise<T> {
    if (
      (!response.ok && response.status !== 404) ||
      (response.status === 404 && !ignore_not_found)
    ) {
      throw new httpError(response.status, await response.json())
    }

    return (await response.json()) as T
  }

  private url(url: string): string {
    return `${this.baseUrl}${url}`
  }

  private setHeaders(): HeadersInit {
    const token: string | null = storage.get(keys.BearerToken)
    const requestId: string | null = storage.get(keys.RequestId)

    return {
      'Access-Control-Allow-Origin': '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(requestId ? { 'X-Request-Id': requestId } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }
}

export const httpClient: client = new client(
  `https://${window.location.hostname}/`,
)
