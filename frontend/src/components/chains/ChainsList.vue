<script setup lang="ts">
import { useChainsStore } from '@/stores/ChainsStore.ts'
import type { ChainModel } from '@/models/ChainModel.ts'
const chainsStore = useChainsStore()

const successCss = (prefix: string, chain: ChainModel): string =>
  chain.currentStreak >= 14 ? `${prefix}-green-500` : `${prefix}-amber-500`

const selectChain = (chain: ChainModel): void => {
  chainsStore.chains.forEach((c) => (c.active = false))
  chain.active = true
}
</script>
<template>
  <div class="flex justify-center items-start pt-10">
    <div class="w-full max-w-sm bg-white rounded-3xl">
      <div>
        <div
          v-for="chain in chainsStore.chains"
          :key="chain.id"
          :class="[
            'flex items-center gap-4 px-4 py-4 rounded-2xl mb-2',
            'transition-all duration-200 cursor-pointer hover:scale-[1.01]',
            chain.active
              ? 'bg-green-50 border border-green-200'
              : 'bg-white border border-transparent hover:border-gray-100',
          ]"
          @click="selectChain(chain)"
        >
          <div
            :class="[
              'w-12 h-12 rounded-2xl flex items-center justify-center',
              'text-2xl flex-shrink-0',
              chain.active ? 'bg-green-100' : 'bg-gray-100',
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
                <p :class="['text-xs font-bold', successCss('text', chain)]">
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
              successCss('bg', chain),
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
