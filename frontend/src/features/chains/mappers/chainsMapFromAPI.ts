import { Temporal } from '@js-temporal/polyfill'

import type {
  IChainModel,
  IChainDTO,
  IChainCompletionHistoryDTO,
  IStreakDTO,
  IStreakModel,
  IStreakHistoryModel,
} from '@/features/chains/types/chainsTypes'

const mapDate = (date?: string | null): Temporal.PlainDate | null =>
  date ? Temporal.PlainDate.from(date) : null

const mapStreak = (streak: IStreakDTO): IStreakModel => ({
  streak: streak.streak,
  startDate: mapDate(streak.start_date),
  endDate: mapDate(streak.end_date),
})

const mapChainCompletionHistory = (
  streakHistory: IChainCompletionHistoryDTO,
): IStreakHistoryModel => ({
  completionDate: Temporal.PlainDate.from(streakHistory.completion_date),
  status: streakHistory.status,
})

export const chainsMapFromAPI = (dto: IChainDTO): IChainModel => ({
  id: dto.id,
  name: dto.name,
  icon: dto.icon,

  description: dto.description,
  frequency: dto.frequency,
  frequencyPerWeek: dto.frequency_per_week,

  consistency: dto.stats.consistency,
  currentStreak: mapStreak(dto.stats.current_streak),
  maxStreak: mapStreak(dto.stats.max_streak),
  completedThisWeek: dto.stats.completed_this_week,

  chainCompletionHistory: dto.chain_history.map(mapChainCompletionHistory),
})
