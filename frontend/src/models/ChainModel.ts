import type { IChainDataResponse } from '@/types/ApiTypes'

export class ChainModel {
  public id: number | null = null
  public name: string | null = null
  public icon: string | null = null
  public currentStreak: number | null = null
  public maxStreak: number | null = null
  public frequency: string | null = null

  public static fromAPI(data: IChainDataResponse): ChainModel {
    const chain: ChainModel = new ChainModel()

    chain.id = data.id
    chain.name = data.name
    chain.icon = data.icon
    chain.currentStreak = data.current_streak
    chain.maxStreak = data.max_streak
    chain.frequency = data.frequency

    return chain
  }
}
