import { defineStore } from 'pinia'

import type { IChainOutstandingModel } from '@/features/chains/types/chainsTypes'
import { storage } from '@/shared/lib/storage'
import type { TChainCompletionStatus } from '@/features/chains/types/chainsTypes.d.ts'
import { chainsOutstandingService } from '@/features/chains/services/chainsOutstandingService'

export const useChainsOutstandingStore = defineStore('chainsOutstanding', {
  state: () => ({
    outstandingChains: [] as IChainOutstandingModel[],
  }),

  persist: true,

  getters: {
    currentOutstandingChain: (state) => state.outstandingChains[0] ?? null,
  },

  actions: {
    async fetchOutstandingChains(): Promise<void> {
      this.outstandingChains =
        await chainsOutstandingService.getChainsOutstanding()
    },
    async markComplete(
      chainId: number,
      status: TChainCompletionStatus,
    ): Promise<void> {
      this.outstandingChains = this.outstandingChains.filter(
        (chain) => chain.chainId !== chainId,
      )

      console.log(`MARK ${status}`)
      await chainsOutstandingService.getChainsOutstanding()
    },
    reset() {
      this.outstandingChains = []
      storage.clear()
    },
  },
})
