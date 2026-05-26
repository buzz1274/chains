import { StatusCodes } from 'http-status-codes'

import { httpClient, HttpError } from '@/lib/HttpClient'
import { useUserStore } from '@/stores/UserStore'
import { useChainsStore } from '@/stores/ChainsStore'
import { chainService } from '@/services/ChainService'
import type { IAccessTokenResponse, IUserDataResponse } from '@/types/ApiTypes'
import { UserModel } from '@/models/UserModel.ts'

export function useAuth() {
  const loginFailure =
    'An error occurred while logging in. Please try again later.'

  const getProfileFailure =
    'An error occurred while retrieving user profile. Please try again later.'

  const getChainsFailure =
    'An error occurred while retrieving user chains. Please try again later.'

  const UserStore = useUserStore()
  const ChainsStore = useChainsStore()

  async function login(code: string, provider: string): Promise<void> {
    try {
      const loginResponse = await httpClient.post<IAccessTokenResponse>(
        'api/auth/login',
        {
          code,
          provider,
        },
      )

      UserStore.setToken(loginResponse.token)
    } catch (error: unknown) {
      UserStore.reset()
      ChainsStore.reset()
      throw HttpError.fromError(error, StatusCodes.FORBIDDEN, loginFailure)
    }

    try {
      const userResponse =
        await httpClient.get<IUserDataResponse>('api/users/me')

      UserStore.setUser(UserModel.fromAPI(userResponse))
    } catch (error: unknown) {
      UserStore.reset()
      ChainsStore.reset()
      throw HttpError.fromError(error, StatusCodes.FORBIDDEN, getProfileFailure)
    }

    try {
      ChainsStore.setChains(await chainService.get())
    } catch (error: unknown) {
      console.error(error)
      UserStore.reset()
      ChainsStore.reset()
      throw HttpError.fromError(error, StatusCodes.FORBIDDEN, getChainsFailure)
    }
  }

  function logout() {
    UserStore.reset()
    ChainsStore.reset()
  }

  return {
    login,
    logout,
  }
}
