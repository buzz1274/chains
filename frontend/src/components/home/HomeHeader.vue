<script setup lang="ts">
import LogOut from '@/components/authentication/LogOut.vue'
import { useChainsStore } from '@/stores/ChainsStore'
import { getStreakStyles } from '@/lib/design/StreakStyle'

const chainsStore = useChainsStore()
</script>
<template>
  <div class="flex items-center justify-between">
    <div v-if="chainsStore.activeChain" class="flex items-center gap-3">
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
    <LogOut />
  </div>
</template>
