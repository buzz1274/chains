import { StatusCodes } from 'http-status-codes'

import { keys, storage } from '@/shared/lib/storage'
import { httpError } from '@/shared/lib/httpError'

class client {
  private readonly baseUrl: string
  private onUnauthorizedHandler: (() => void) | null = null
  private isLoggingOut = false

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public setIsLoggingOut(isLoggingOut: boolean): void {
    this.isLoggingOut = isLoggingOut
  }

  public setUnauthorizedHandler(handler: () => void): void {
    this.onUnauthorizedHandler = handler
  }

  public async get<T>(url: string, ignore_not_found = false): Promise<T> {
    try {
      const response: Response = await fetch(this.url(url), {
        method: 'GET',
        headers: this.setHeaders(),
      })
      return this.handleResponse<T>(response, ignore_not_found)
    } catch (error) {
      this.handleUnauthorized()
    }
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
    ignore_not_found = false,
  ): Promise<T> {
    if (response.status === StatusCodes.UNAUTHORIZED) {
      this.handleUnauthorized()
      throw new httpError(response.status, 'You have been logged out.')
    } else if (
      (!response.ok && response.status !== StatusCodes.NOT_FOUND) ||
      (response.status === StatusCodes.NOT_FOUND && !ignore_not_found)
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

  private handleUnauthorized(): void {
    if (this.isLoggingOut) {
      return
    }

    this.setIsLoggingOut(true)
    this.onUnauthorizedHandler?.()
  }
}

export const httpClient: client = new client(
  `https://${window.location.hostname}/`,
)
