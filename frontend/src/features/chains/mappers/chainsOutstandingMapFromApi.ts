import { Temporal } from '@js-temporal/polyfill'

import type {
  IChainOutstandingDTO,
  IChainOutstandingModel,
} from '@/features/chains/types/chainsTypes'

export const chainsOutstandingMapFromAPI = (
  dto: IChainOutstandingDTO,
): IChainOutstandingModel => ({
  id: dto.id,
  chainId: dto.chain_id,
  date: Temporal.PlainDate.from(dto.completion_date),
})
