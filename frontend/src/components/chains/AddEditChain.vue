<script setup lang="ts">
import { ref } from 'vue'
import {
  CalendarIcon,
  ChevronDownIcon,
  PlusIcon,
  XIcon,
} from '@lucide/vue'

import HomeHeader from '@/components/home/HomeHeader.vue'

interface Milestone {
  id: number
  days: number
  label: string
  icon: string
}

const chainName = ref('')
const description = ref('')
const frequency = ref('Daily')
const reminder = ref('09:00')
const startDate = ref('May 15, 2024')

const selectedIcon = ref('💧')
const selectedColor = ref('bg-green-500')

const icons = [
  '💧',
  '🏃',
  '🏋️',
  '📖',
  '🧘',
  '🎯',
  '🌱',
  '🎸',
  '🧠',
  '❤️',
  '⭐',
  '📷',
  '🎨',
  '🔥',
  '🏆',
]

const colors = [
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-red-500',
]

const milestones = ref<Milestone[]>([
  {
    id: 1,
    days: 7,
    label: '7 Day Streak',
    icon: '⭐',
  },
  {
    id: 2,
    days: 14,
    label: '14 Day Streak',
    icon: '🛡️',
  },
  {
    id: 3,
    days: 30,
    label: '30 Day Streak',
    icon: '🔒',
  },
])

const addMilestone = (): void => {
  milestones.value.push({
    id: Date.now(),
    days: 0,
    label: '',
    icon: '⭐',
  })
}

const removeMilestone = (id: number): void => {
  milestones.value = milestones.value.filter((m) => m.id !== id)
}

const saveChain = (): void => {
  console.log('save')
}
</script>

<template>
  <HomeHeader />
  <div class="flex-1 p-6">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <button
          class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
        >
          ←
        </button>

        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            Add New Chain
          </h1>

          <p class="text-gray-500 mt-1">
            Create a new habit chain to track your progress.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-2 gap-6">
      <!-- LEFT COLUMN -->
      <div class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
          <h2 class="text-xl font-bold text-gray-900 mb-6">
            Basic Information
          </h2>

          <div class="space-y-5">
            <!-- Chain Name -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Chain Name
              </label>

              <input
                v-model="chainName"
                type="text"
                placeholder="e.g. Drink Water"
                class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />

              <p class="text-xs text-gray-400 mt-2">
                Choose a clear, specific name for your habit chain.
              </p>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Description
                <span class="text-gray-400 font-normal">(Optional)</span>
              </label>

              <textarea
                v-model="description"
                rows="4"
                placeholder="e.g. Drink 8 glasses of water every day to stay hydrated."
                class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />

              <p class="text-xs text-gray-400 mt-2">
                Add a description to remind yourself what this chain is about.
              </p>
            </div>

            <!-- Frequency -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Frequency
              </label>

              <div class="relative">
                <select
                  v-model="frequency"
                  class="w-full appearance-none rounded-2xl border border-gray-200 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>

                <ChevronDownIcon
                  class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                />
              </div>

              <p class="text-xs text-gray-400 mt-2">
                How often do you want to complete this habit?
              </p>
            </div>

            <!-- Start Date -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Start Date
              </label>

              <div class="relative">
                <input
                  v-model="startDate"
                  type="text"
                  class="w-full rounded-2xl border border-gray-200 px-4 py-3 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <CalendarIcon
                  class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                />
              </div>
            </div>

            <!-- Reminder -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Reminder
                <span class="text-gray-400 font-normal">(Optional)</span>
              </label>

              <div class="relative">
                <select
                  v-model="reminder"
                  class="w-full appearance-none rounded-2xl border border-gray-200 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>09:00</option>
                  <option>12:00</option>
                  <option>18:00</option>
                </select>

                <ChevronDownIcon
                  class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                />
              </div>

              <p class="text-xs text-gray-400 mt-2">
                Set a daily reminder to stay consistent.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="space-y-6">
        <!-- Icon & Color -->
        <div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
          <h2 class="text-xl font-bold text-gray-900 mb-2">
            Icon & Color
          </h2>

          <p class="text-sm text-gray-500 mb-6">
            Choose an icon and color to represent your chain.
          </p>

          <!-- Icon Picker -->
          <div class="grid grid-cols-5 gap-4 mb-6">
            <button
              v-for="icon in icons"
              :key="icon"
              :class="[
                'h-16 rounded-2xl border flex items-center justify-center text-2xl transition',
                selectedIcon === icon
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white',
              ]"
              @click="selectedIcon = icon"
            >
              {{ icon }}
            </button>
          </div>

          <!-- Color Picker -->
          <div class="flex gap-3">
            <button
              v-for="color in colors"
              :key="color"
              :class="[
                'w-8 h-8 rounded-xl transition ring-2 ring-offset-2',
                color,
                selectedColor === color
                  ? 'ring-gray-300'
                  : 'ring-transparent',
              ]"
              @click="selectedColor = color"
            />
          </div>
        </div>

        <!-- Milestones -->
        <div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
          <h2 class="text-xl font-bold text-gray-900 mb-2">
            Milestone Settings
          </h2>

          <p class="text-sm text-gray-500 mb-6">
            Set custom milestones to celebrate your progress.
          </p>

          <div class="space-y-4">
            <div
              v-for="milestone in milestones"
              :key="milestone.id"
              class="flex items-center gap-3"
            >
              <div
                class="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl"
              >
                {{ milestone.icon }}
              </div>

              <input
                v-model="milestone.days"
                type="number"
                class="w-20 rounded-xl border border-gray-200 px-3 py-2 text-sm"
              />

              <span class="text-sm text-gray-500">
                days
              </span>

              <input
                v-model="milestone.label"
                type="text"
                class="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm"
              />

              <button
                class="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
                @click="removeMilestone(milestone.id)"
              >
                <XIcon class="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          <!-- Add Milestone -->
          <button
            class="w-full mt-6 border border-dashed border-gray-300 rounded-2xl py-4 text-sm font-medium text-gray-500 hover:bg-gray-50 transition flex items-center justify-center gap-2"
            @click="addMilestone"
          >
            <PlusIcon class="w-4 h-4" />
            Add Milestone
          </button>
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div
      class="mt-6 bg-white border border-gray-100 rounded-3xl p-6 flex justify-end gap-4"
    >
      <button
        class="px-6 py-3 rounded-2xl border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition"
      >
        Cancel
      </button>

      <button
        class="px-6 py-3 rounded-2xl bg-green-500 text-white font-medium hover:bg-green-600 transition shadow-sm"
        @click="saveChain"
      >
        Create Chain
      </button>
    </div>
  </div>
</template>