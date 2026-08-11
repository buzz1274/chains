import { Temporal } from '@js-temporal/polyfill'

import type {
  IChainOutstandingDTO,
  IChainOutstandingModel,
} from '@/features/chains/types/chainsTypes'

export const chainsOutstandingMap = (
  dto: IChainOutstandingDTO,
): IChainOutstandingModel => ({
  id: dto.id,
  chainId: dto.chain_id,
  date: Temporal.PlainDate.from(dto.completion_date),
  status: dto.status,
})

export const chainsOutstandingMapToAPI = (
  object: IChainOutstandingModel,
): IChainOutstandingDTO => ({
  id: object.id,
  chain_id: object.chainId,
  status: object.status,
  completion_date: object.date.toString(),
})
