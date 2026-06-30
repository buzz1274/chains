import { defineStore } from 'pinia'

import { keys, storage } from '@/shared/lib/storage'
import type { IUserModel } from '@/features/users/types/userTypes'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null,
    request_id: null as string | null,
    user: null as null | IUserModel,
  }),

  persist: true,

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token
      storage.set(keys.BearerToken, this.token)
    },

    setRequestId(request_id: string) {
      this.request_id = request_id
      storage.set(keys.RequestId, this.request_id)
    },

    setUser(user: IUserModel) {
      this.user = user
    },

    reset() {
      this.token = null
      this.user = null
      storage.clear()
    },
  },
})
