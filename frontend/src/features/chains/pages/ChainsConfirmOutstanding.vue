<script setup lang="ts">
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckIcon,
  XIcon,
  FlameIcon,
  TrendingUpIcon,
} from '@lucide/vue'

import ChainsHeader from '@/features/chains/components/ChainsHeader.vue'
import ChainsLayout from '@/features/chains/layouts/ChainsLayout.vue'

interface ActivityDay {
  id: number
  day: string
  date: string
  completed: boolean | null
  today?: boolean
}

const activity: ActivityDay[] = [
  {
    id: 1,
    day: 'Sat',
    date: 'May 11',
    completed: true,
  },
  {
    id: 2,
    day: 'Sun',
    date: 'May 12',
    completed: true,
  },
  {
    id: 3,
    day: 'Mon',
    date: 'May 13',
    completed: true,
  },
  {
    id: 4,
    day: 'Tue',
    date: 'May 14',
    completed: true,
  },
  {
    id: 5,
    day: 'Today',
    date: 'May 15',
    completed: null,
    today: true,
  },
  {
    id: 6,
    day: 'Thu',
    date: 'May 16',
    completed: null,
  },
  {
    id: 7,
    day: 'Fri',
    date: 'May 17',
    completed: null,
  },
]

const confirmCompletion = (): void => {
  console.log('completed')
}

const denyCompletion = (): void => {
  console.log('missed')
}
</script>

<template>
    <ChainsHeader :display-chain-details="true" />

      <!-- Hero -->
      <div class="flex flex-col items-center text-center">
        <!-- Icon -->
        <div
          class="w-32 h-32 rounded-full bg-green-50 flex items-center justify-center mb-8"
        >
          <span class="text-6xl">
            💧
          </span>
        </div>

        <!-- Title -->
        <h2 class="text-5xl font-bold text-gray-900 mb-4">
          Did you complete your habit today?
        </h2>

        <p class="text-2xl text-gray-500 mb-10">
          Drink 8 glasses of water every day to stay hydrated.
        </p>

        <!-- Actions -->
        <div class="grid grid-cols-2 gap-8 w-full max-w-3xl mb-12">
          <!-- Complete -->
          <button
            class="rounded-3xl border border-green-300 bg-green-50 hover:bg-green-100 transition-all duration-200 p-10 flex flex-col items-center"
            @click="confirmCompletion"
          >
            <div
              class="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-sm"
            >
              <CheckIcon class="w-10 h-10 text-white" />
            </div>

            <h3 class="text-3xl font-bold text-gray-900 mb-2">
              Yes, I did!
            </h3>

            <p class="text-lg text-gray-500">
              Keep your streak alive
            </p>
          </button>

          <!-- Missed -->
          <button
            class="rounded-3xl border border-red-200 bg-red-50 hover:bg-red-100 transition-all duration-200 p-10 flex flex-col items-center"
            @click="denyCompletion"
          >
            <div
              class="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mb-6 shadow-sm"
            >
              <XIcon class="w-10 h-10 text-white" />
            </div>

            <h3 class="text-3xl font-bold text-gray-900 mb-2">
              Not today
            </h3>

            <p class="text-lg text-gray-500">
              I'll try again tomorrow
            </p>
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div
        class="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 mb-8"
      >
        <div class="grid grid-cols-3 divide-x divide-gray-100">
          <!-- Current -->
          <div class="flex items-center gap-6 px-4">
            <div class="relative">
              <div
                class="w-24 h-24 rounded-full border-[8px] border-green-500 border-r-green-100 border-b-green-100 rotate-45"
              />

              <div
                class="absolute inset-0 flex items-center justify-center"
              >
                <FlameIcon class="w-10 h-10 text-orange-500" />
              </div>
            </div>

            <div>
              <p class="text-lg text-gray-500 mb-1">
                Current Streak
              </p>

              <h4 class="text-5xl font-bold text-gray-900">
                4 days
              </h4>

              <p class="text-lg text-gray-500 mt-2">
                Keep going strong!
              </p>
            </div>
          </div>

          <!-- Max -->
          <div class="px-10 flex flex-col justify-center">
            <p class="text-lg text-gray-500 mb-2">
              Max Streak
            </p>

            <h4 class="text-5xl font-bold text-gray-900">
              15 days
            </h4>
          </div>

          <!-- Total -->
          <div class="px-10 flex flex-col justify-center">
            <p class="text-lg text-gray-500 mb-2">
              Total Completed
            </p>

            <h4 class="text-5xl font-bold text-gray-900">
              28 days
            </h4>
          </div>
        </div>
      </div>



      <!-- Footer CTA -->
      <div
        class="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 flex items-center justify-between"
      >
        <div class="flex items-center gap-5">
          <div
            class="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center"
          >
            <span class="text-3xl">🌱</span>
          </div>

          <div>
            <h4 class="text-3xl font-bold text-gray-900 mb-1">
              Consistency is key!
            </h4>

            <p class="text-lg text-gray-500">
              You're building a great habit. Every drop counts.
            </p>
          </div>
        </div>

        <button
          class="h-14 px-8 rounded-2xl border border-green-500 text-green-600 font-semibold hover:bg-green-50 transition flex items-center gap-3"
        >
          <TrendingUpIcon class="w-5 h-5" />

          View Insights
        </button>
      </div>
</template>