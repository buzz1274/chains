export interface IChainDTO {
  id: number
  name: string
  icon: string
  current_streak: number
  max_streak: number
  active: boolean
  frequency: string
}

export interface IChainModel {
  id: number
  name: string
  icon: string
  currentStreak: number
  maxStreak: number
  frequency: string
}
