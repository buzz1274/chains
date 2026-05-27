import type { IChainModel } from '@/types/ChainTypes'
import { mapChainFromAPI } from '@/mappers/ChainMapper'

export const chainService = {
  get() {
    const chains: IChainModel[] = [] as IChainModel[]
    const chainApiResponse = [
      {
        id: 1,
        name: 'Run',
        icon: '🏃',
        current_streak: 12,
        max_streak: 45,
        active: false,
        frequency: 'weeks',
      },
      {
        id: 2,
        name: 'Gym',
        icon: '🏋️',
        current_streak: 3,
        max_streak: 18,
        active: false,
        frequency: 'weeks',
      },
      {
        id: 3,
        name: 'Read',
        icon: '📖',
        current_streak: 21,
        max_streak: 60,
        active: false,
        frequency: 'days',
      },
      {
        id: 4,
        name: 'Meditate',
        icon: '🧘',
        current_streak: 0,
        max_streak: 30,
        active: false,
        frequency: 'days',
      },
      {
        id: 5,
        name: 'Drink Water',
        icon: '💧',
        current_streak: 4,
        max_streak: 15,
        active: false,
        frequency: 'days',
      },
    ]

    chainApiResponse.forEach((chain) => {
      chains.push(mapChainFromAPI(chain))
    })

    return chains
  },
}
