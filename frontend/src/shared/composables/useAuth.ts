import { StatusCodes } from 'http-status-codes'

import { httpClient } from '@/shared/lib/httpClient'
import { httpError } from '@/shared/lib/httpError'
import { useUserStore } from '@/features/users/stores/useUserStore'
import { useSession } from '@/shared/composables/useSession'
import type { IAccessTokenResponse } from '@/shared/types/apiTypes'
import router from '@/shared/routes/router.ts'

export function useAuth() {
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

      userStore.setRequestId(loginResponse.request_id)
      userStore.setToken(loginResponse.token)

      await session.create()
    } catch (error: unknown) {
      session.destroy()
      throw httpError.fromError(error, StatusCodes.FORBIDDEN)
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
