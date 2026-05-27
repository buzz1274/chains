<script setup lang="ts">
import { Pencil as PencilIcon } from '@lucide/vue'
import { getStreakStyles } from '@/lib/design/StreakStyle.ts'
import router from '@/router/router.ts'
import { useChainsStore } from '@/stores/ChainsStore.ts'

const chainsStore = useChainsStore()

</script>

<template>
  <div v-if="chainsStore.activeChain" class="flex items-center gap-3">
    <PencilIcon
      class="w-5 h-5 hover:cursor-pointer"
      @click="router.push('/chains/edit/' + chainsStore.activeChain.id)"
    />
    <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">
      {{ chainsStore.activeChain?.name }}
    </h1>
    <span
      :class="[
        'w-2.5 h-2.5 rounded-full inline-block',
        getStreakStyles(chainsStore.activeChain).bg,
      ]"
    />
    <span class="text-gray-500 text-sm">
        You're on a
        <span
          :class="['font-bold', getStreakStyles(chainsStore.activeChain).text]"
        >
          {{ chainsStore.activeChain.currentStreak }}
          {{ chainsStore.activeChain.frequency }} streak!
        </span>
      </span>
  </div>
</template>>