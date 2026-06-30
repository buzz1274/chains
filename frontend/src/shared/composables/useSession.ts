import { useToast } from 'primevue/usetoast'
import { StatusCodes } from 'http-status-codes'

import { useUserStore } from '@/features/users/stores/useUserStore'
import { useChainsStore } from '@/features/chains/store/useChainsStore'
import { userService } from '@/features/users/services/userService'
import { httpError } from '@/shared/lib/httpError'
import { chainsService } from '@/features/chains/services/chainsService'
import type { IChainModel } from '@/features/chains/types/chainsTypes'

export function useSession() {
  const getProfileFailure =
    'An error occurred while retrieving user profile. Please try again later.'

  const getChainsFailure =
    'An error occurred while retrieving user chains. Please try again later.'

  const userStore = useUserStore()
  const chainsStore = useChainsStore()
  const toast = useToast()

  const destroy = () => {
    userStore.reset()
    chainsStore.reset()
  }

  const user = async () => {
    try {
      userStore.setUser(await userService.get())
    } catch (error: unknown) {
      destroy()
      throw httpError.fromError(error, StatusCodes.FORBIDDEN, getProfileFailure)
    }
  }

  const chains = async () => {
    try {
      const [chains, errors] = await chainsService.get()

      if (errors) {
        for (const message of errors) {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000,
          })
        }
      }

      chainsStore.setChains(chains as IChainModel[])
    } catch (error: unknown) {
      destroy()
      throw httpError.fromError(error, StatusCodes.FORBIDDEN, getChainsFailure)
    }
  }

  const create = async () => {
    await user()
    await chains()
  }

  return { create, destroy }
}
