<script setup lang="ts">
import { useChainsStore } from '@/stores/ChainsStore'
import ChainListItem from './ChainListItem.vue'

const chainsStore = useChainsStore()
</script>
<template>
  <div class="flex justify-center items-start pt-10">
    <div class="w-full max-w-sm bg-white rounded-3xl">
      <ChainListItem
        v-for="chain in chainsStore.chains"
        :key="chain.id"
        :chain="chain"
        :active="chain.id === chainsStore.activeChainId"
        @click="chainsStore.setActiveChainId(chain.id)"
      />
    </div>
  </div>
</template>
