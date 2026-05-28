import { defineStore } from 'pinia'

import { keys, storage } from '@/lib/Storage'
import type { IUserModel } from '@/types/userTypes.ts'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null,
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
