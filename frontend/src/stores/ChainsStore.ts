import { defineStore } from 'pinia'

import type { ChainModel } from '@/models/ChainModel'
import { storage } from '@/lib/Storage'

export const useChainsStore = defineStore('chains', {
  state: () => ({
    chains: null as null | ChainModel[],
  }),

  persist: true,

  actions: {
    setChains(chains: ChainModel[]) {
      this.chains = chains
    },

    reset() {
      this.chains = null
      storage.clear()
    },
  },
})
