import { defineStore } from 'pinia'

import type { IChainModel } from '@/features/chains/types/chainsTypes'
import { storage } from '@/lib/Storage'

export const useChainsStore = defineStore('chains', {
  state: () => ({
    chains: [] as IChainModel[],
    activeChainId: null as number | null,
  }),

  persist: true,

  getters: {
    activeChain: (state) =>
      state.chains.find((c) => c.id === state.activeChainId),
  },

  actions: {
    setChains(chains: IChainModel[]): void {
      this.chains = chains
    },
    setActiveChainId(id: number): void {
      this.activeChainId = id
    },
    reset() {
      this.chains = []
      storage.clear()
    },
  },
})
