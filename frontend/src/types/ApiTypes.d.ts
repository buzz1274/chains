export interface IApiResponse<T> {
  status: number
  data: T
}

export interface IAccessTokenResponse {
  token: string
}

export interface IUserDataResponse {
  name: string
  registered_date: string
}

export interface IChainDataResponse {
  id: number
  name: string
  icon: string
  current_streak: number
  max_streak: number
  active: boolean
  frequency: string
}
