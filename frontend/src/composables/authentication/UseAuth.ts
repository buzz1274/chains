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

  const userStore = useUserStore()
  const chainsStore = useChainsStore()

  async function login(code: string, provider: string): Promise<void> {
    try {
      const loginResponse = await httpClient.post<IAccessTokenResponse>(
        'api/auth/login',
        {
          code,
          provider,
        },
      )

      userStore.setToken(loginResponse.token)
    } catch (error: unknown) {
      userStore.reset()
      chainsStore.reset()
      throw HttpError.fromError(error, StatusCodes.FORBIDDEN, loginFailure)
    }

    try {
      const userResponse =
        await httpClient.get<IUserDataResponse>('api/users/me')

      userStore.setUser(UserModel.fromAPI(userResponse))
    } catch (error: unknown) {
      userStore.reset()
      chainsStore.reset()
      throw HttpError.fromError(error, StatusCodes.FORBIDDEN, getProfileFailure)
    }

    try {
      chainsStore.setChains(chainService.get())
    } catch (error: unknown) {
      userStore.reset()
      chainsStore.reset()
      throw HttpError.fromError(error, StatusCodes.FORBIDDEN, getChainsFailure)
    }
  }

  function logout() {
    userStore.reset()
    chainsStore.reset()
  }

  return {
    login,
    logout,
  }
}
