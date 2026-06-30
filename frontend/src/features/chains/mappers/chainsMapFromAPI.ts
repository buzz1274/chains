import { Temporal } from '@js-temporal/polyfill'

import type {
  IChainModel,
  IChainDTO,
  IStreakHistoryDTO,
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

const mapStreakHistory = (
  streakHistory: IStreakHistoryDTO,
): IStreakHistoryModel => ({
  date: Temporal.PlainDate.from(streakHistory.date),
  success: streakHistory.success,
})

export const chainsMapFromAPI = (dto: IChainDTO): IChainModel => ({
  id: dto.id,
  name: dto.name,
  icon: dto.icon,

  currentStreak: mapStreak(dto.current_streak),
  maxStreak: mapStreak(dto.max_streak),

  description: dto.description,
  frequency: dto.frequency,
  consistency: dto.consistency,
  requiredThisWeek: dto.required_this_week,
  completedThisWeek: dto.completed_this_week,

  streakHistory: dto.streak_history.map(mapStreakHistory),
})
