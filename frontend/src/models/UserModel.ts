import { Temporal } from '@js-temporal/polyfill'

import type { IUserDataResponse } from '@/types/ApiTypes'

export class UserModel {
  public name: string | null = null
  public registeredDate: Temporal.PlainDate | null = null

  public static fromAPI(data: IUserDataResponse): UserModel {
    const user: UserModel = new UserModel()

    user.registeredDate = Temporal.PlainDate.from(data.registered_date)
    user.name = data.name

    return user
  }
}
