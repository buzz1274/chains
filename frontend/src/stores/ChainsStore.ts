import { defineStore } from 'pinia'

import type { ChainModel } from '@/models/ChainModel'
import { storage } from '@/lib/Storage'

export const useChainsStore = defineStore('chains', {
  state: () => ({
    chains: null as null | ChainModel[],
    activeChain: null as null | ChainModel,
  }),

  persist: true,

  actions: {
    setChains(chains: ChainModel[]): void {
      this.chains = chains
    },
    setActiveChain(chain: ChainModel): void {
      this.activeChain = chain
    },
    reset() {
      this.chains = null
      storage.clear()
    },
  },
})
