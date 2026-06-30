<script setup lang="ts">
import { PencilIcon, Trash2Icon } from '@lucide/vue'

import type { IChainModel } from '@/features/chains/types/chainsTypes'
import { streakStyle } from '@/features/chains/lib/streakStyle'

defineProps<{
  chain: IChainModel
  active: boolean
}>()

const emit = defineEmits<{
  edit: []
  delete: []
}>()
</script>

<template>
  <div
    :class="[
      'group flex items-center gap-4 px-4 py-4 rounded-2xl mb-2 shadow-sm',
      'transition-all duration-200 cursor-pointer hover:scale-[1.01]',
      active
        ? 'bg-green-50 border border-green-200 hover:bg-green-100'
        : 'bg-white border border-gray-100 hover:bg-gray-100',
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
      <div class="flex items-center justify-between">
        <p class="font-semibold text-gray-900 text-base leading-tight">
          {{ chain.name }}
        </p>

        <div
          :class="[
            'flex items-center opacity-0 group-hover:opacity-100',
            'transition-opacity duration-200',
          ]"
        >
          <button
            class="p-1 rounded-lg hover:bg-gray-200 transition-colors"
            @click.stop="emit('edit')"
          >
            <PencilIcon class="w-4 h-4 text-gray-500" />
          </button>

          <button
            class="p-1 rounded-lg hover:bg-red-100 transition-colors"
            @click.stop="emit('delete')"
          >
            <Trash2Icon class="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      <div class="flex items-end justify-between mt-2">
        <div class="flex gap-6">
          <div>
            <p class="text-xs text-gray-400">Current streak</p>

            <p :class="['text-xs font-bold', streakStyle(chain).text]">
              {{ chain.currentStreak.streak }}
              {{ chain.frequency }}
            </p>
          </div>

          <div>
            <p class="text-xs text-gray-400">Max streak</p>

            <p class="text-xs font-bold text-gray-800">
              {{ chain.maxStreak.streak }}
              {{ chain.frequency }}
            </p>
          </div>
        </div>

        <div
          :class="[
            'w-2.5 h-2.5 rounded-full flex-shrink-0 mb-1',
            streakStyle(chain).bg,
          ]"
        />
      </div>
    </div>
  </div>
</template>
