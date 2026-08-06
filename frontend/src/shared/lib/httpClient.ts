import { StatusCodes } from 'http-status-codes'

import { keys, storage } from '@/shared/lib/storage'
import { httpError } from '@/shared/lib/httpError'
import { type httpMethod } from '@/shared/types/constants.ts'

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

  public async get<T>(url: string, ignoreNotFound = false): Promise<T> {
    return this.request(url, 'GET', null, ignoreNotFound)
  }

  public async post<T>(url: string, body?: unknown): Promise<T> {
    return this.request(url, 'POST', body)
  }

  public async patch<T>(url: string, body?: unknown): Promise<T> {
    return this.request(url, 'PATCH', body)
  }

  private async request<T>(
    url: string,
    method: httpMethod,
    body?: unknown = null,
    ignoreNotFound = false,
  ): Promise<T> {
    try {
      const response: Response = await fetch(this.url(url), {
        method,
        body: body === null ? undefined : JSON.stringify(body),
        headers: this.setHeaders(),
      })

      return this.handleResponse<T>(response, ignoreNotFound)
    } catch (error) {
      throw httpError.fromError(error)
    }
  }

  private async handleResponse<T>(
    response: Response,
    ignoreNotFound = false,
  ): Promise<T> {
    if (response.status === StatusCodes.UNAUTHORIZED) {
      this.handleUnauthorized()
      throw new httpError(response.status, 'You have been logged out.')
    } else if (
      (!response.ok && response.status !== StatusCodes.NOT_FOUND) ||
      (response.status === StatusCodes.NOT_FOUND && !ignoreNotFound)
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
