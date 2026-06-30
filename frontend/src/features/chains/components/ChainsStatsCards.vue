<script setup lang="ts">
import { useStatsCards } from '@/features/chains/composables/useStatsCards'

const { statsCards } = useStatsCards()
</script>
<template>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="statCard in statsCards"
      :key="statCard.label"
      :class="[
        'bg-white rounded-2xl border border-gray-100 p-5',
        'flex items-start gap-4 shadow-sm',
      ]"
    >
      <div
        :class="[
          'w-12 h-12 rounded-2xl flex items-center justify-center',
          'flex-shrink-0',
          statCard.iconBg,
        ]"
      >
        <span class="text-xl">{{ statCard.icon }}</span>
      </div>
      <div>
        <p class="text-xs text-gray-400 font-medium mb-0.5">
          {{ statCard.label }}
        </p>
        <p class="text-2xl font-extrabold text-gray-900 leading-tight">
          {{ statCard.value }}
        </p>
        <p class="text-xs text-gray-400 mt-0.5">{{ statCard.sub }}</p>
      </div>
    </div>
  </div>
</template>
