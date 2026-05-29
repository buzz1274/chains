import { Temporal } from '@js-temporal/polyfill'

import type {
  IChainModel,
  IChainDTO,
  IStreakHistoryDTO,
} from '@/features/chains/types/chainsTypes'

export const chainsMapFromAPI = (dto: IChainDTO): IChainModel => ({
  id: dto.id,
  name: dto.name,
  icon: dto.icon,
  currentStreak: {
    streak: dto.current_streak.streak,
    startDate: dto.current_streak.start_date
      ? Temporal.PlainDate.from(dto.current_streak.start_date)
      : null,
    endDate: dto.current_streak.end_date
      ? Temporal.PlainDate.from(dto.current_streak.end_date)
      : null,
  },
  maxStreak: {
    streak: dto.max_streak.streak,
    startDate: dto.max_streak.start_date
      ? Temporal.PlainDate.from(dto.max_streak.start_date)
      : null,
    endDate: dto.max_streak.end_date
      ? Temporal.PlainDate.from(dto.max_streak.end_date)
      : null,
  },
  frequency: dto.frequency,
  consistency: dto.consistency,
  requiredThisWeek: dto.required_this_week,
  completedThisWeek: dto.completed_this_week,
  streakHistory: dto.streak_history.map((streakHistory: IStreakHistoryDTO) => ({
    date: Temporal.PlainDate.from(streakHistory.date),
    success: streakHistory.success,
  })),
})
