<script setup lang="ts">
import { CheckIcon, XIcon } from '@lucide/vue'
import { onMounted, computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'

import LoadingSpinner from '@/shared/components/LoadingSpinner.vue'
import NoResults from '@/shared/components/NoResults.vue'
import ChainsHeader from '@/features/chains/components/ChainsHeader.vue'
import ChainsStatsCards from '@/features/chains/components/ChainsStatsCards.vue'
import { useChainsStore } from '@/features/chains/store/useChainsStore'
import type { IAppResponseError } from '@/shared/types/apiTypes.d.ts'
import type { TChainCompletionStatus } from '@/features/chains/types/chainsTypes.d.ts'
import { useChainsOutstandingStore } from '@/features/chains/store/chainsOutstandingStore'
import { chainCompletionStatus } from '@/features/chains/types/constants.ts'

const toast = useToast()
const chainsOutstandingStore = useChainsOutstandingStore()
const chainsStore = useChainsStore()
const loading = ref(true)

const outstandingChainDetail = computed(() => {
  const chainId = chainsOutstandingStore.currentOutstandingChain?.chainId

  if (!chainId) return null

  return chainsStore.findChainById(chainId)
})

const markComplete = async (status: TChainCompletionStatus) => {
  const chainId = chainsOutstandingStore.currentOutstandingChain?.chainId

  if (!chainId) return null

  try {
    await chainsOutstandingStore.markComplete(chainId, status)

    chainsStore.setActiveChainId(chainId)

    toast.add({
      severity: 'success',
      summary: 'Chain completed successfully',
      life: 3000,
    })
  } catch (error: unknown) {
    const e = error as IAppResponseError

    toast.add({
      severity: 'error',
      summary: 'Chain completion failed',
      detail: e.detail,
      life: 3000,
    })
  }
}

onMounted(async () => {
  try {
    await chainsOutstandingStore.fetchOutstandingChains()

    if (!chainsOutstandingStore.currentOutstandingChain) return

    chainsStore.setActiveChainId(
      chainsOutstandingStore.currentOutstandingChain?.chainId,
    )
  } catch (error: unknown) {
    const e = error as IAppResponseError

    toast.add({
      severity: 'error',
      summary: 'An error occurred while fetching chains',
      detail: e.detail,
      life: 3000,
    })
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <ChainsHeader
    title="Complete Chains"
    :display-chain-details="!loading && outstandingChainDetail != null"
  />

  <LoadingSpinner v-if="loading" />
  <NoResults v-else-if="!outstandingChainDetail">
    <template #no-content-message> No more chains to complete today. </template>
  </NoResults>

  <div
    v-else-if="outstandingChainDetail"
    class="flex flex-col items-center text-center"
  >
    <div
      :class="[
        'w-32 h-32 rounded-full bg-green-50 flex',
        'items-center justify-center mb-8',
      ]"
    >
      <span class="text-6xl">
        {{ outstandingChainDetail.icon }}
      </span>
    </div>

    <h2 class="text-5xl font-bold text-gray-900 mb-4">
      Did you complete your habit today?
    </h2>

    <p class="text-2xl text-gray-500 mb-10">
      {{ outstandingChainDetail.description }}
    </p>

    <div class="grid grid-cols-2 gap-8 w-full max-w-3xl mb-12">
      <button
        :class="[
          'rounded-3xl border border-green-300 bg-green-50 hover:bg-green-100',
          'transition-all duration-200 p-10 flex flex-col items-center',
        ]"
        @click="markComplete(chainCompletionStatus.SUCCESS)"
      >
        <div
          :class="[
            'w-20 h-20 rounded-full bg-green-500 flex items-center',
            'justify-center mb-6 shadow-sm',
          ]"
        >
          <CheckIcon class="w-10 h-10 text-white" />
        </div>

        <h3 class="text-3xl font-bold text-gray-900 mb-2">Yes, I did!</h3>

        <p class="text-lg text-gray-500">Keep your streak alive</p>
      </button>

      <button
        :class="[
          'rounded-3xl border border-red-200 bg-red-50 hover:bg-red-100',
          'transition-all duration-200 p-10 flex flex-col items-center',
        ]"
        @click="markComplete(chainCompletionStatus.FAILURE)"
      >
        <div
          :class="[
            'w-20 h-20 rounded-full bg-red-500 flex items-center',
            'justify-center mb-6 shadow-sm',
          ]"
        >
          <XIcon class="w-10 h-10 text-white" />
        </div>

        <h3 class="text-3xl font-bold text-gray-900 mb-2">Not today</h3>

        <p class="text-lg text-gray-500">I'll try again tomorrow</p>
      </button>
    </div>
    <ChainsStatsCards />
  </div>
</template>
