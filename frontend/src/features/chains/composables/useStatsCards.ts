import { computed } from 'vue'
import type { Temporal } from '@js-temporal/polyfill'
import { format } from 'date-fns'

import { useChainsStore } from '@/features/chains/store/useChainsStore'

export function useStatsCards() {
  const noStreakMessage = 'No streak yet!'
  const chainsStore = useChainsStore()
  const activeChain = computed(() => chainsStore.activeChain)

  const calculateCompletionPercentage = (completed: number, required: number) =>
    Math.round((completed / required) * 100)

  const formatDates = (
    startDate: Temporal.PlainDate | null,
    endDate: Temporal.PlainDate | null,
  ): string | null => {
    if (!startDate) return null

    const formattedStartDate = format(startDate.toString(), 'd MMM yy')
    const formattedEndDate = endDate
      ? format(endDate.toString(), 'd MMM yy')
      : 'Today'

    return `${formattedStartDate} - ${formattedEndDate}`
  }

  const statsCards = computed(() => {
    const chain = activeChain.value

    if (!chain) return []

    return [
      {
        label: 'Current Streak',
        value: `${chain.currentStreak.streak}
           ${chain.frequency}`,
        sub: `${
          formatDates(
            chain.currentStreak.startDate,
            chain.currentStreak.endDate,
          ) ?? noStreakMessage
        }`,
        icon: '🔥',
        iconBg: 'bg-green-50',
      },
      {
        label: 'Max Streak',
        value: `${chain.maxStreak.streak}
           ${chain.frequency}`,
        sub: `${
          formatDates(chain.maxStreak.startDate, chain.maxStreak.endDate) ??
          noStreakMessage
        }`,
        icon: '🏆',
        iconBg: 'bg-amber-50',
      },
      {
        label: 'This Week',
        value: `${chain.completedThisWeek} /
           ${chain.requiredThisWeek}`,
        sub: `${calculateCompletionPercentage(
          chain.completedThisWeek,
          chain.requiredThisWeek,
        )}% completed`,
        icon: '🎯',
        iconBg: 'bg-blue-50',
      },
      {
        label: 'Consistency',
        value: `${chain.consistency}%`,
        sub: 'Keep it up!',
        icon: '📈',
        iconBg: 'bg-purple-50',
      },
    ]
  })

  return { statsCards }
}
