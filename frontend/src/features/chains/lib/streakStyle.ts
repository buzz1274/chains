import type {
  IChainModel,
  TStreakLevel,
} from '@/features/chains/types/chainsTypes'

function getStreakLevel(streak: number): TStreakLevel {
  if (streak === 0) return 'critical'
  if (streak <= 14) return 'warning'
  return 'success'
}

const getStreakStyle: Record<TStreakLevel, { text: string; bg: string }> = {
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

export const streakStyle = (chain: IChainModel) => {
  const streakLevel: TStreakLevel = getStreakLevel(chain.currentStreak.streak)
  return getStreakStyle[streakLevel]
}
