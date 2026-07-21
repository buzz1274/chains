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

export interface IChainDTO {
  id: number
  name: string
  icon: string
  current_streak: IStreakDTO
  max_streak: IStreakDTO
  frequency: TChainFrequency
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
