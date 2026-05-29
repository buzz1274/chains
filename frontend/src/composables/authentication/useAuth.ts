import { StatusCodes } from 'http-status-codes'

import { httpClient, HttpError } from '@/lib/HttpClient'
import { useUserStore } from '@/stores/UserStore'
import { useSession } from '@/shared/composables/useSession.ts'
import type { IAccessTokenResponse } from '@/types/ApiTypes'
import router from '@/router/router.ts'

export function useAuth() {
  const loginFailure =
    'An error occurred while logging in. Please try again later.'

  const session = useSession()
  const userStore = useUserStore()

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
      void session.create()
    } catch (error: unknown) {
      console.error('Login error:', error)
      session.destroy()
      throw HttpError.fromError(error, StatusCodes.FORBIDDEN, loginFailure)
    }
  }

  function logout() {
    session.destroy()
  }

  function redirectTo(path: string) {
    router.push(path).catch(() => {
      session.destroy()
    })
  }

  return {
    login,
    logout,
    redirectTo,
  }
}
