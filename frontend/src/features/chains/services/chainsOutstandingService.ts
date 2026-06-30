import type {
  IChainOutstandingModel,
  IChainOutstandingDTO,
} from '@/features/chains/types/chainsTypes'
import { chainsOutstandingMapFromAPI } from '@/features/chains/mappers/chainsOutstandingMapFromApi'
import { httpError } from '@/shared/lib/httpError'

export const chainsOutstandingService = {
  async getChainsOutstanding() {
    const chainsOutstanding: IChainOutstandingModel[] =
      [] as IChainOutstandingModel[]
    const errors: string[] = []
    const chainsOutstandingApiResponse: IChainOutstandingDTO[] = [
      {
        id: 1,
        chain_id: 1,
        date: '2024-05-26',
      },
      {
        id: 2,
        chain_id: 1,
        date: '2024-05-27',
      },
      {
        id: 3,
        chain_id: 2,
        date: '2024-05-27',
      },
      {
        id: 4,
        chain_id: 3,
        date: '2026-06-08',
      },
    ]
    //replace with actual call to API
    await new Promise((resolve) => setTimeout(resolve, 100))

    chainsOutstandingApiResponse.forEach((outstandingChain) => {
      try {
        chainsOutstanding.push(chainsOutstandingMapFromAPI(outstandingChain))
      } catch (error) {
        errors.push(
          `Error mapping chain: ${outstandingChain.chain_id}\n${String(error)}`,
        )
      }
    })

    if (errors.length > 0) {
      throw new httpError(400, errors.join('\n'))
    }

    return chainsOutstanding
  },
}
