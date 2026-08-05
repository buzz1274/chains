<script setup lang="ts">
import { useChainsStore } from '@/features/chains/store/useChainsStore'
import ChainListItem from '@/features/chains/components/ChainsListItem.vue'
import router from '@/shared/routes/router.ts'
import { chainsService } from '@/features/chains/services/chainsService.ts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const path: string = '/chains'
const chainsStore = useChainsStore()

const handleSelectChain = (id: number) => {
  chainsService.get().then(() => {
    chainsStore.setActiveChainId(id)
  })

  void router.push(path)
}
const active = computed(() => {
  return route.path === path
})
</script>
<template>
  <div class="flex justify-center items-start">
    <div class="w-full max-w-sm bg-white rounded-3xl">
      <div v-if="chainsStore.chains.length">
        <ChainListItem
          v-for="chain in chainsStore.chains"
          v-if="chainsStore.chains"
          :key="chain.id"
          :chain="chain"
          :active="chain.id === chainsStore.activeChainId && active"
          @click="handleSelectChain(chain.id)"
        />
      </div>
      <div v-else class="flex justify-center items-center h-full pt-10 pb-20">
        <div class="text-gray-500">
          You have no chains yet.
          <a class="text-black underline" href="/chains/add">Create</a>
          one to get started.
        </div>
      </div>
    </div>
  </div>
</template>
