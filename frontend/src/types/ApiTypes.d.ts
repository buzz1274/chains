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
