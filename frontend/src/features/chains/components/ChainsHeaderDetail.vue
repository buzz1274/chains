<script setup lang="ts">
import { getStreakStyles } from '@/lib/design/StreakStyle.ts'
import { useChainsStore } from '@/stores/ChainsStore.ts'
import BaseHeaderTitle from '@/shared/ui/components/base/BaseHeaderTitle.vue'

const chainsStore = useChainsStore()
</script>

<template>
  <div v-if="chainsStore.activeChain" class="flex items-center gap-3">
    <BaseHeaderTitle>
      {{ chainsStore.activeChain?.name }}
    </BaseHeaderTitle>
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
        {{ chainsStore.activeChain.currentStreak.streak }}
        {{ chainsStore.activeChain.frequency }} streak!
      </span>
    </span>
  </div>
</template>
>
