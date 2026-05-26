import { defineStore } from 'pinia'

import type { UserModel } from '@/models/UserModel'
import { keys, storage } from '@/lib/Storage'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null,
    user: null as null | UserModel,
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

    setUser(user: UserModel) {
      this.user = user
    },

    reset() {
      this.token = null
      this.user = null
      storage.clear()
    },
  },
})
