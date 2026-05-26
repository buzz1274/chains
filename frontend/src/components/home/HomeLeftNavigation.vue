<script setup lang="ts">
import { ref } from 'vue'

import BaseLeftNavigation from '@/components/base/BaseLeftNavigation.vue'
import LogOut from '@/components/authentication/LogOut.vue'
import BaseButton from '@/components/base/BaseButton.vue'


const activeTab = ref('stats')

const chains = ref([
  {
    id: 1,
    name: 'Run',
    icon: '🏃',
    currentStreak: 12,
    maxStreak: 45,
    active: true,
  },
  {
    id: 2,
    name: 'Gym',
    icon: '🏋️',
    currentStreak: 3,
    maxStreak: 18,
    active: false,
  },
  {
    id: 3,
    name: 'Read',
    icon: '📖',
    currentStreak: 21,
    maxStreak: 60,
    active: true,
  },
  {
    id: 4,
    name: 'Meditate',
    icon: '🧘',
    currentStreak: 7,
    maxStreak: 30,
    active: false,
  },
  {
    id: 5,
    name: 'Drink Water',
    icon: '💧',
    currentStreak: 4,
    maxStreak: 15,
    active: false,
  },
])

function selectChain(chain) {
  console.log('Selected chain:', chain.name)
}

function addChain() {
  console.log('Add new chain')
}
</script>

<template>
  <BaseLeftNavigation>
    <template #lhs_content>
      <span class="text-s block text-gray-500"> YOUR CHAINS </span>
      <div class="flex justify-center items-start pt-10">
        <div class="w-full max-w-sm bg-white rounded-3xl">
          <div>
            <div
              v-for="(chain, index) in chains"
              :key="chain.id"
              :class="[
                'flex items-center gap-4 px-4 py-4 rounded-2xl mb-2 transition-all duration-200 cursor-pointer hover:scale-[1.01]',
                index === 0
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-white border border-transparent hover:border-gray-100',
              ]"
              @click="selectChain(chain)"
            >
              <!-- Icon -->
              <div
                :class="[
                  'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0',
                  index === 0 ? 'bg-green-100' : 'bg-gray-100',
                ]"
              >
                {{ chain.icon }}
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-gray-900 text-base leading-tight">
                  {{ chain.name }}
                </p>
                <div class="flex gap-6 mt-1">
                  <div>
                    <p class="text-xs text-gray-400">Current streak</p>
                    <p
                      :class="[
                        'text-sm font-bold',
                        chain.currentStreak >= 14
                          ? 'text-green-500'
                          : 'text-amber-500',
                      ]"
                    >
                      {{ chain.currentStreak }} days
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400">Max streak</p>
                    <p class="text-sm font-bold text-gray-800">
                      {{ chain.maxStreak }} days
                    </p>
                  </div>
                </div>
              </div>

              <!-- Status dot -->
              <div
                :class="[
                  'w-2.5 h-2.5 rounded-full flex-shrink-0',
                  chain.active ? 'bg-green-500' : 'bg-amber-400',
                ]"
              />
            </div>

            <!-- Add New Chain Button -->
            <button
              class="w-full mt-2 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 border-dashed border-gray-200 text-gray-500 font-medium text-sm hover:border-green-300 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
              @click="addChain"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Chain
            </button>
          </div>
        </div>
      </div>
    </template>
  </BaseLeftNavigation>
</template>
