import { ChainModel } from '@/models/ChainModel'

export const chainService = {
  async get() {
    const chains: ChainModel[] = [] as ChainModel[]
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

    await chainApiResponse.forEach((chain) => {
      chains.push(ChainModel.fromAPI(chain))
    })

    return chains
  },
}
