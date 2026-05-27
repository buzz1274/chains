<script setup lang="ts">
import { Pencil as PencilIcon } from '@lucide/vue'

import LogOut from '@/components/authentication/LogOut.vue'
import { useChainsStore } from '@/stores/chainsStore'
import { useUserStore } from '@/stores/userStore'
import { getStreakStyles } from '@/lib/design/StreakStyle'

const chainsStore = useChainsStore()

const addEditChain = () => {
  console.log('Add Edit Chain')
}

</script>
<template>
  <div class="flex items-center justify-between">
    <div v-if="chainsStore.activeChain" class="flex items-center gap-3">
      <PencilIcon class="w-5 h-5 hover:cursor-pointer" @click="addEditChain"/>
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
