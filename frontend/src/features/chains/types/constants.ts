export const chainCompletionStatus = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  HOLIDAY: 'HOLIDAY',
} as const

export const chainFrequency = {
  DAILY: 'Day',
  WEEKLY: 'Week',
} as const

export type TChainFrequency = keyof typeof chainFrequency
export type TChainCompletionStatus = keyof typeof chainCompletionStatus
