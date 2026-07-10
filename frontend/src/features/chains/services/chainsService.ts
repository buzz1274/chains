import type {
  IChainModel,
  IChainDTO,
} from '@/features/chains/types/chainsTypes'
import { chainsMapFromAPI } from '@/features/chains/mappers/chainsMapFromAPI'
import { useChainsStore } from '@/features/chains/store/useChainsStore'
import { httpClient } from '@/shared/lib/httpClient.ts'

export const chainsService = {
  async get() {
    const chains: IChainModel[] = [] as IChainModel[]
    const errors: string[] = []
    const chainsStore = useChainsStore()

    const chainResponse =
      await httpClient.get<IChainDTO[]>('api/chains/', true)

    chainResponse['data'].forEach((chain) => {
      try {
        chains.push(chainsMapFromAPI(chain))
      } catch (error) {
        errors.push(`Error mapping chain: ${chain.name}\n${String(error)}`)
        console.log(
          `Error mapping chain: ${chain.name}\n${String(error)}`,)
      }
    })

    chainsStore.setChains(chains)

    return [chains, errors]
  },
}
