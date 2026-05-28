import type { IUserModel, IUserDTO } from '@/types/userTypes'

export const mapUserFromAPI = (dto: IUserDTO): IUserModel => ({
  name: dto.name,
  image: dto.image,
  registeredDate: dto.registered_date,
})
