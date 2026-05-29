import type { Temporal } from '@js-temporal/polyfill'

type TFrequency = 'days' | 'weeks'
type TStreakLevel = 'critical' | 'warning' | 'success'

export interface IStreakDTO {
  streak: number
  start_date: string | null
  end_date: string | null
}

export interface IStreakHistoryDTO {
  date: string
  success: boolean
}

export interface IChainDTO {
  id: number
  name: string
  icon: string
  current_streak: IStreakDTO
  max_streak: IStreakDTO
  frequency: TFrequency
  consistency: number
  required_this_week: number
  completed_this_week: number
  streak_history: IStreakHistoryDTO[]
}

export interface IStreakModel {
  streak: number
  startDate: Temporal.PlainDate | null
  endDate: Temporal.PlainDate | null
}

export interface IStreakHistoryModel {
  date: Temporal.PlainDate
  success: boolean
}

export interface IChainModel {
  id: number
  name: string
  icon: string
  currentStreak: IStreakModel
  maxStreak: IStreakModel
  frequency: string
  consistency: number
  requiredThisWeek: number
  completedThisWeek: number
  streakHistory: IStreakHistoryModel[]
}
