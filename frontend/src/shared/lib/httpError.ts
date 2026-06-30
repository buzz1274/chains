import { StatusCodes } from 'http-status-codes'

import type { IAppResponseError } from '@/shared/types/apiTypes'

export class httpError extends Error {
  public statusCode: number
  public static defaultMessage = 'An error occurred.'
  public static networkErrorMessage = 'Network error - backend unreachable'

  constructor(statusCode: number, message: IAppResponseError | string) {
    if (typeof message === 'string' || message['detail'] === undefined) {
      super(httpError.defaultMessage)
    } else {
      super(message['detail'])
    }
    this.statusCode = statusCode
  }

  public static fromError(
    error: unknown,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = this.defaultMessage,
  ): httpError {
    if (error instanceof httpError) {
      return error
    }

    if (error instanceof TypeError) {
      return new httpError(StatusCodes.SERVICE_UNAVAILABLE, {
        detail: httpError.networkErrorMessage,
      })
    }

    return new httpError(statusCode, message)
  }
}
