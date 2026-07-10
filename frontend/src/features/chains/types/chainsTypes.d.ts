import type { Temporal } from '@js-temporal/polyfill'

import type { chainCompletionStatus } from '@/features/chains/types/constants.ts'

export type TChainCompletionStatus =
  (typeof chainCompletionStatus)[keyof typeof chainCompletionStatus]

type TFrequency = 'days' | 'weeks'
type TStreakLevel = 'critical' | 'warning' | 'success'

export interface IStreakDTO {
  streak: number
  start_date: string | null
  end_date: string | null
}

export interface IChainCompletionHistoryDTO {
  completion_date: string
  status: boolean
}

export interface IChainDTO {
  id: number
  name: string
  icon: string
  current_streak: IStreakDTO
  max_streak: IStreakDTO
  frequency: TFrequency
  description: string
  consistency: number
  frequency_per_week: number
  completed_this_week: number
  chain_completion_history: IChainCompletionHistoryDTO[]
}

export interface IChainOutstandingDTO {
  id: number
  chain_id: number
  date: string
}

export interface IStreakModel {
  streak: number
  startDate: Temporal.PlainDate | null
  endDate: Temporal.PlainDate | null
}

export interface IStreakHistoryModel {
  completionDate: Temporal.PlainDate
  status: string
}

export interface IChainModel {
  id: number
  name: string
  icon: string
  currentStreak: IStreakModel
  maxStreak: IStreakModel
  frequency: string
  consistency: number
  description: string
  frequencyPerWeek: number
  completedThisWeek: number
  streakHistory: IStreakHistoryModel[]
}

export interface IChainOutstandingModel {
  id: number
  chainId: number
  date: Temporal.PlainDate
}
