import { StatusCodes } from 'http-status-codes'

import { keys, storage } from '@/lib/Storage'

export class HttpError extends Error {
  public status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }

  public static fromError(
    error: unknown,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message = 'An error occurred.',
  ): HttpError {
    if (error instanceof HttpError) {
      return error
    }

    return new HttpError(statusCode, message)
  }
}

export class HttpClient {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public async get<T>(url: string): Promise<T> {
    const response: Response = await fetch(this.url(url), {
      method: 'GET',
      headers: this.setHeaders(),
    })

    return this.handleResponse<T>(response)
  }

  public async post<T>(url: string, body?: unknown): Promise<T> {
    const response: Response = await fetch(this.url(url), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.setHeaders(),
    })

    return this.handleResponse<T>(response)
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new HttpError(response.status, await response.text())
    }

    return (await response.json()) as T
  }

  private url(url: string): string {
    return `${this.baseUrl}${url}`
  }

  private setHeaders(): HeadersInit {
    const token: string | null = storage.get(keys.BearerToken)

    return {
      'Access-Control-Allow-Origin': '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }
}

export const httpClient: HttpClient = new HttpClient(
  `https://${window.location.hostname}/`,
)
