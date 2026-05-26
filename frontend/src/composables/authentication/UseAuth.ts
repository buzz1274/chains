import { StatusCodes } from 'http-status-codes'

import { httpClient, HttpError } from '@/lib/HttpClient'
import { useUserStore } from '@/stores/UserStore'
import type { IAccessTokenResponse, IUserDataResponse } from '@/types/ApiTypes'
import { UserModel } from '@/models/UserModel.ts'

export function useAuth() {
  const loginFailure =
    'An error occurred while logging in. Please try again later.'

  const getProfileFailure =
    'An error occurred while retrieving user profile. Please try again later.'

  const store = useUserStore()

  async function login(code: string, provider: string): Promise<void> {
    try {
      const loginResponse = await httpClient.post<IAccessTokenResponse>(
        'api/auth/login',
        {
          code,
          provider,
        },
      )

      store.setToken(loginResponse.token)
    } catch (error: unknown) {
      store.reset()
      throw HttpError.fromError(error, StatusCodes.FORBIDDEN, loginFailure)
    }

    try {
      const userResponse =
        await httpClient.get<IUserDataResponse>('api/users/me')

      store.setUser(UserModel.fromAPI(userResponse))
    } catch (error: unknown) {
      store.reset()
      throw HttpError.fromError(error, StatusCodes.FORBIDDEN, getProfileFailure)
    }
  }

  function logout() {
    store.reset()
  }

  return {
    login,
    logout,
  }
}
