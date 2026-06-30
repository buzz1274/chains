import type {
  IChainModel,
  IChainDTO,
} from '@/features/chains/types/chainsTypes'
import { chainsMapFromAPI } from '@/features/chains/mappers/chainsMapFromAPI'

export const chainsService = {
  async get() {
    const chains: IChainModel[] = [] as IChainModel[]
    const errors: string[] = []
    const chainApiResponse: IChainDTO[] = [
      {
        id: 1,
        name: 'Run',
        icon: '🏃',
        description: 'fkfkfkfkkf',
        current_streak: {
          streak: 12,
          start_date: '2024-03-04',
          end_date: '2024-05-26',
        },
        max_streak: {
          streak: 45,
          start_date: '2023-01-02',
          end_date: '2023-11-13',
        },
        frequency: 'weeks',
        consistency: 87,
        required_this_week: 7,
        completed_this_week: 5,
        streak_history: [
          { date: '2024-05-20', success: true },
          { date: '2024-05-21', success: true },
          { date: '2024-05-22', success: false },
          { date: '2024-05-23', success: true },
          { date: '2024-05-24', success: true },
          { date: '2024-05-25', success: true },
          { date: '2024-05-26', success: false },
        ],
      },

      {
        id: 2,
        name: 'Gym',
        icon: '🏋️',
        description: 'fkfkfkfkkfdfkjkdjf',
        current_streak: {
          streak: 3,
          start_date: '2024-05-06',
          end_date: '2024-05-26',
        },
        max_streak: {
          streak: 18,
          start_date: '2023-06-05',
          end_date: '2023-10-09',
        },
        frequency: 'weeks',
        consistency: 71,
        required_this_week: 5,
        completed_this_week: 4,
        streak_history: [
          { date: '2024-05-20', success: true },
          { date: '2024-05-21', success: false },
          { date: '2024-05-22', success: true },
          { date: '2024-05-23', success: true },
          { date: '2024-05-24', success: false },
          { date: '2024-05-25', success: true },
          { date: '2024-05-26', success: true },
        ],
      },

      {
        id: 3,
        name: 'Read',
        icon: '📖',
        description: 'fkfkfkfkkfsdlkjhksdjhfjkhf',
        current_streak: {
          streak: 21,
          start_date: '2024-05-01',
          end_date: '2024-05-26',
        },
        max_streak: {
          streak: 60,
          start_date: '2023-08-01',
          end_date: '2023-10-01',
        },
        frequency: 'days',
        consistency: 93,
        required_this_week: 7,
        completed_this_week: 7,
        streak_history: [
          { date: '2024-05-20', success: true },
          { date: '2024-05-21', success: true },
          { date: '2024-05-22', success: true },
          { date: '2024-05-23', success: true },
          { date: '2024-05-24', success: true },
          { date: '2024-05-25', success: true },
          { date: '2024-05-26', success: true },
        ],
      },

      {
        id: 4,
        name: 'Meditate',
        icon: '🧘',
        description: 'fkfkfkfkkfdflkjdkjhfkdjhfjkhdf',
        current_streak: {
          streak: 0,
          start_date: '',
          end_date: '',
        },
        max_streak: {
          streak: 30,
          start_date: '2023-11-01',
          end_date: '2023-12-01',
        },
        frequency: 'days',
        consistency: 42,
        required_this_week: 7,
        completed_this_week: 1,
        streak_history: [
          { date: '2024-05-20', success: false },
          { date: '2024-05-21', success: false },
          { date: '2024-05-22', success: false },
          { date: '2024-05-23', success: true },
          { date: '2024-05-24', success: false },
          { date: '2024-05-25', success: false },
          { date: '2024-05-26', success: false },
        ],
      },

      {
        id: 5,
        name: 'Drink Water',
        icon: '💧',
        description: 'fkfkfkfkkfdsfdkfkjdhfkdhjfjkdf',
        current_streak: {
          streak: 4,
          start_date: '2024-05-22',
          end_date: '2024-05-26',
        },
        max_streak: {
          streak: 15,
          start_date: '2024-01-01',
          end_date: '2024-01-16',
        },
        frequency: 'days',
        consistency: 76,
        required_this_week: 7,
        completed_this_week: 6,
        streak_history: [
          { date: '2024-05-20', success: true },
          { date: '2024-05-21', success: false },
          { date: '2024-05-22', success: true },
          { date: '2024-05-23', success: true },
          { date: '2024-05-24', success: true },
          { date: '2024-05-25', success: true },
          { date: '2024-05-26', success: true },
        ],
      },

      {
        id: 6,
        name: 'Journal',
        icon: '✍️',
        description: 'fkfkfkfkkfdjdjdjdjdjdjjddj',
        current_streak: {
          streak: 9,
          start_date: '2024-05-10',
          end_date: '2024-05-26',
        },
        max_streak: {
          streak: 22,
          start_date: '2024-02-01',
          end_date: '2024-02-23',
        },
        frequency: 'days',
        consistency: 81,
        required_this_week: 7,
        completed_this_week: 5,
        streak_history: [
          { date: '2024-05-20', success: true },
          { date: '2024-05-21', success: true },
          { date: '2024-05-22', success: false },
          { date: '2024-05-23', success: true },
          { date: '2024-05-24', success: true },
          { date: '2024-05-25', success: true },
          { date: '2024-05-26', success: false },
        ],
      },

      {
        id: 7,
        name: 'Cold Shower',
        icon: '🥶',
        description: 'fkfkfkfkkf2723872873827382738273',
        current_streak: {
          streak: 14,
          start_date: '2024-04-30',
          end_date: '2024-05-26',
        },
        max_streak: {
          streak: 40,
          start_date: '2023-12-01',
          end_date: '2024-01-10',
        },
        frequency: 'days',
        consistency: 89,
        required_this_week: 7,
        completed_this_week: 7,
        streak_history: [
          { date: '2024-05-20', success: true },
          { date: '2024-05-21', success: true },
          { date: '2024-05-22', success: true },
          { date: '2024-05-23', success: true },
          { date: '2024-05-24', success: true },
          { date: '2024-05-25', success: true },
          { date: '2024-05-26', success: true },
        ],
      },

      {
        id: 8,
        name: 'Code',
        icon: '💻',
        description: 'fkfkfkfkkf12121212121212121212121212',
        current_streak: {
          streak: 28,
          start_date: '2024-04-01',
          end_date: '2024-05-26',
        },
        max_streak: {
          streak: 120,
          start_date: '2023-01-01',
          end_date: '2023-05-01',
        },
        frequency: 'days',
        consistency: 96,
        required_this_week: 7,
        completed_this_week: 7,
        streak_history: [
          { date: '2024-05-20', success: true },
          { date: '2024-05-21', success: true },
          { date: '2024-05-22', success: true },
          { date: '2024-05-23', success: true },
          { date: '2024-05-24', success: true },
          { date: '2024-05-25', success: true },
          { date: '2024-05-26', success: true },
        ],
      },
    ]

    //replace with actual call to API
    await new Promise((resolve) => setTimeout(resolve, 100))

    chainApiResponse.forEach((chain) => {
      try {
        chains.push(chainsMapFromAPI(chain))
      } catch (error) {
        errors.push(`Error mapping chain: ${chain.name}\n${String(error)}`)
      }
    })

    return [chains, errors]
  },
}
