import { mapUserFromAPI } from '@/features/users/mappers/userMapper'
import type { IUserDTO, IUserModel } from '@/features/users/types/userTypes'
import { httpClient } from '@/shared/lib/httpClient'

export const userService = {
  async get(): Promise<IUserModel> {
    const userResponse = await httpClient.get<IUserDTO>('api/users/me')

    return mapUserFromAPI(userResponse)
  },
}
