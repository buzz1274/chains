<script setup lang="ts">
import { useChainsStore } from '@/features/chains/store/useChainsStore'
import ChainListItem from '@/features/chains/components/ChainsListItem.vue'
import router from '@/shared/routes/router.ts'

const chainsStore = useChainsStore()

const handleSelectChain = (id: number) => {
  chainsStore.setActiveChainId(id)
  void router.push('/chains')
}
</script>
<template>
  <div class="flex justify-center items-start">
    <div class="w-full max-w-sm bg-white rounded-3xl">
      <ChainListItem
        v-for="chain in chainsStore.chains"
        :key="chain.id"
        :chain="chain"
        :active="chain.id === chainsStore.activeChainId"
        @click="handleSelectChain(chain.id)"
      />
    </div>
  </div>
</template>
