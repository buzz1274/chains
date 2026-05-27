import { mapUserFromAPI } from '@/Mappers/UserMapper'
import type { IUserDTO, IUserModel } from '@/types/userTypes'
import { httpClient } from '@/lib/HttpClient.ts'

export const userService = {
  async get(): Promise<IUserModel> {
    const userResponse =
      await httpClient.get<IUserDTO>('api/users/me')

    return mapUserFromAPI(userResponse)
  },
}
