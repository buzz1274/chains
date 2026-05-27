<script setup lang="ts">
import { getStreakStyles } from '@/lib/design/StreakStyle.ts'
import { useChainsStore } from '@/stores/ChainsStore.ts'
import HeaderTitle from '@/shared/ui/base/HeaderTitle.vue'

const chainsStore = useChainsStore()

</script>

<template>
  <div v-if="chainsStore.activeChain" class="flex items-center gap-3">
    <HeaderTitle>
      {{ chainsStore.activeChain?.name }}
    </HeaderTitle>
    <span
      :class="[
        'w-2.5 h-2.5 rounded-full inline-block mt-1',
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