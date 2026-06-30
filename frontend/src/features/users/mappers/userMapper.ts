import type { IUserModel, IUserDTO } from '@/features/users/types/userTypes'

export const mapUserFromAPI = (dto: IUserDTO): IUserModel => ({
  name: dto.name,
  image: dto.image,
  registeredDate: dto.registered_date,
})
