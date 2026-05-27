import type { IChainModel, IChainDTO } from '@/types/ChainTypes'

export const mapChainFromAPI = (dto: IChainDTO): IChainModel => ({
  id: dto.id,
  name: dto.name,
  icon: dto.icon,
  currentStreak: dto.current_streak,
  maxStreak: dto.max_streak,
  frequency: dto.frequency,
})
