<script setup lang="ts">
import type { IChainModel } from '@/types/ChainTypes'
import { getStreakStyles } from '@/lib/design/StreakStyle'

defineProps<{
  chain: IChainModel
  active: boolean
}>()
</script>
<template>
  <div
    :class="[
      'flex items-center gap-4 px-4 py-4 rounded-2xl mb-2',
      'transition-all duration-200 cursor-pointer hover:scale-[1.01]',
      active
        ? 'bg-green-50 border border-green-200 hover:bg-green-100'
        : 'bg-white border border-transparent hover:bg-gray-100',
    ]"
  >
    <div
      :class="[
        'w-12 h-12 rounded-2xl flex items-center justify-center',
        'text-2xl flex-shrink-0',
        active ? 'bg-green-100' : 'bg-gray-100',
      ]"
    >
      {{ chain.icon }}
    </div>

    <div class="flex-1 min-w-0">
      <p class="font-semibold text-gray-900 text-base leading-tight">
        {{ chain.name }}
      </p>
      <div class="flex gap-6 mt-1">
        <div>
          <p class="text-xs text-gray-400">Current streak</p>
          <p :class="['text-xs font-bold', getStreakStyles(chain).text]">
            {{ chain.currentStreak }} {{ chain.frequency }}
          </p>
        </div>
        <div>
          <p class="text-xs text-gray-400">Max streak</p>
          <p class="text-xs font-bold text-gray-800">
            {{ chain.maxStreak }} {{ chain.frequency }}
          </p>
        </div>
      </div>
    </div>

    <div
      :class="[
        'w-2.5 h-2.5 rounded-full flex-shrink-0',
        getStreakStyles(chain).bg,
      ]"
    />
  </div>
</template>
