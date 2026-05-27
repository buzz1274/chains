import type { ChainModel } from '@/models/ChainModel.ts'

type StreakLevel = 'critical' | 'warning' | 'success'

function getStreakLevel(streak: number): StreakLevel {
  if (streak === 0) return 'critical'
  if (streak <= 14) return 'warning'
  return 'success'
}

const streakStyles: Record<
  StreakLevel,
  { text: string; bg: string }
> = {
  critical: {
    text: 'text-red-400',
    bg: 'bg-red-600',
  },
  warning: {
    text: 'text-amber-500',
    bg: 'bg-amber-500',
  },
  success: {
    text: 'text-green-500',
    bg: 'bg-green-500',
  },
}

export const getStreakStyles = (chain: ChainModel) => streakStyles[getStreakLevel(chain.currentStreak)]