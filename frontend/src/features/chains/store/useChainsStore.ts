import { defineStore } from 'pinia'

import type { IChainModel } from '@/features/chains/types/chainsTypes'
import { storage } from '@/shared/lib/storage'

export const useChainsStore = defineStore('chains', {
  state: () => ({
    chains: [] as IChainModel[],
    activeChainId: null as number | null,
  }),

  persist: true,

  getters: {
    activeChain(state): IChainModel | undefined {
      return state.chains.find((chain) => chain.id === state.activeChainId)
    },
  },

  actions: {
    setChains(chains: IChainModel[]): void {
      this.chains = chains
    },
    setActiveChainId(id: number): void {
      this.activeChainId = id
    },
    findChainById(id: number | null): IChainModel | undefined {
      if (id === null) return undefined

      return this.chains.find((chain) => chain.id === id)
    },
    reset() {
      this.chains = []
      storage.clear()
    },
  },
})
