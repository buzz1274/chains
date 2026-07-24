import type { Temporal } from '@js-temporal/polyfill'

import type {
  TChainCompletionStatus,
  TChainFrequency,
} from '@/features/chains/types/constants.ts'

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

export interface IStatsDTO {
  current_streak: IStreakDTO
  max_streak: IStreakDTO
  consistency: number
  completed_this_week: number
}

export interface IChainDTO {
  id: number
  name: string
  icon: string
  frequency: TChainFrequency
  description: string
  frequency_per_week: number
  stats: IStatsDTO
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
  status: TChainCompletionStatus
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
