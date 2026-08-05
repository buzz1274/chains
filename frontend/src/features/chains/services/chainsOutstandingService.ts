import type {
  IChainOutstandingModel,
  IChainOutstandingDTO, IChainDTO
} from '@/features/chains/types/chainsTypes'
import { chainsOutstandingMapFromAPI } from '@/features/chains/mappers/chainsOutstandingMapFromApi'
import { httpError } from '@/shared/lib/httpError'
import { httpClient } from '@/shared/lib/httpClient.ts'
import { StatusCodes } from 'http-status-codes'

export const chainsOutstandingService = {
  async getChainsOutstanding() {
    const chainsOutstanding: IChainOutstandingModel[] =
      [] as IChainOutstandingModel[]
    const errors: string[] = []

    const chainsOutstandingApiResponse = await httpClient
      .get<IChainOutstandingDTO[]>('api/chains/history/', true)
      .catch((error) => {
        errors.push(error)
      })

    if (chainsOutstandingApiResponse) {
      chainsOutstandingApiResponse['data'].forEach((outstandingChain) => {
        try {
          chainsOutstanding.push(chainsOutstandingMapFromAPI(outstandingChain))
        } catch (error) {
          errors.push(
            `Error mapping chain history: ${outstandingChain.chain_id}\n${String(error)}`,
          )
        }
      })
    }

    if (errors.length > 0) {
      throw new httpError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        {'detail': errors.join("\n")}
      )
    }

    return chainsOutstanding
  },
  async markComplete(chainOutstanding: IChainOutstandingModel) {
    console.log("mark complete")
    console.log(chainOutstanding)
  }
}
