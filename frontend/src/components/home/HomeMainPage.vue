<script setup lang="ts">
/* eslint-disable */
// @ts-nocheck

import { ref, computed } from 'vue'

import HomeHeader from '@/components/home/HomeHeader.vue'

// ── Config ──────────────────────────────────────────────────
const cellSize = 18 // px per heatmap cell including gap

const currentStreak = ref(12)
const streakProgress = computed(() => currentStreak.value / 30)
const timeLeft = ref('8h 45m')

// ── Header ──────────────────────────────────────────────────
const viewYear = ref(2024)
const viewMonth = ref(4) // 0-indexed; 4 = May

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// ── Stat Cards ───────────────────────────────────────────────
const statCards = [
  {
    label: 'Current Streak',
    value: '12 days',
    sub: 'Keep it going!',
    icon: '🔥',
    iconBg: 'bg-green-50',
  },
  {
    label: 'Max Streak',
    value: '45 days',
    sub: 'Feb 10 – Mar 26',
    icon: '🏆',
    iconBg: 'bg-amber-50',
  },
  {
    label: 'This Week',
    value: '5 / 7',
    sub: '71% completed',
    icon: '🎯',
    iconBg: 'bg-blue-50',
  },
  {
    label: 'Consistency',
    value: '87%',
    sub: 'Keep it up!',
    icon: '📈',
    iconBg: 'bg-purple-50',
  },
]

// ── Heatmap ──────────────────────────────────────────────────
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Build ~26 weeks of random activity data ending today (May 26 2024)
const today = new Date(2024, 4, 26) // May 26 2024

function buildHeatmap() {
  // Start from the Monday of the week 26 weeks before today
  const start = new Date(today)
  start.setDate(start.getDate() - 26 * 7)
  // Snap to Monday
  const dow = start.getDay() === 0 ? 6 : start.getDay() - 1
  start.setDate(start.getDate() - dow)

  const weeks = []
  const cursor = new Date(start)

  while (cursor <= today || weeks.length < 26) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const isToday = cursor.toDateString() === today.toDateString()
      const isFuture = cursor > today
      const rand = Math.random()
      week.push({
        date: cursor.toDateString(),
        level: isFuture
          ? 0
          : rand < 0.15
            ? 0
            : rand < 0.4
              ? 1
              : rand < 0.65
                ? 2
                : rand < 0.85
                  ? 3
                  : 4,
        isToday,
        isFuture,
      })
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(week)
    if (cursor > today && weeks.length >= 26) break
  }
  return weeks
}

const heatmapWeeks = ref(buildHeatmap())

// Derive month labels from heatmap
const heatmapMonths = computed(() => {
  const months = []
  let current = null
  heatmapWeeks.value.forEach((week) => {
    const firstDay = new Date(week[0].date)
    const label = shortMonths[firstDay.getMonth()]
    if (label !== current) {
      if (current)
        months[months.length - 1].weeks = months[months.length - 1].count
      months.push({ label, count: 1 })
      current = label
    } else {
      months[months.length - 1].count =
        (months[months.length - 1].count || 1) + 1
    }
  })
  if (months.length)
    months[months.length - 1].weeks = months[months.length - 1].count || 1
  return months.map((m) => ({ label: m.label, weeks: m.weeks || 1 }))
})

function cellColor(cell) {
  if (cell.isToday) return 'border-2 border-gray-700 bg-white'
  if (cell.isFuture || cell.level === 0) return 'bg-gray-100'
  if (cell.level === 1) return 'bg-green-100'
  if (cell.level === 2) return 'bg-green-300'
  if (cell.level === 3) return 'bg-green-500'
  return 'bg-green-700'
}

// ── Recent Activity ──────────────────────────────────────────
const recentActivity = [
  { label: 'Today', completed: true },
  { label: 'Yesterday', completed: true },
  { label: 'May 13, 2024', completed: true },
  { label: 'May 12, 2024', completed: false },
  { label: 'May 11, 2024', completed: true },
]

// ── Milestones ───────────────────────────────────────────────
const milestones = [
  {
    title: '7 Day Streak',
    sub: 'Achieved on Apr 28, 2024',
    icon: '⭐',
    iconBg: 'bg-amber-50',
    achieved: true,
  },
  {
    title: '14 Day Streak',
    sub: 'Achieved on May 5, 2024',
    icon: '🛡️',
    iconBg: 'bg-blue-50',
    achieved: true,
  },
  {
    title: '30 Day Streak',
    sub: 'Keep it up!',
    icon: '🔒',
    iconBg: 'bg-gray-100',
    achieved: false,
  },
]
</script>

<template>
      <HomeHeader />

      <!-- Stat Cards -->
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="card in statCards"
          :key="card.label"
          class="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm"
        >
          <div
            :class="`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`"
          >
            <span class="text-xl">{{ card.icon }}</span>
          </div>
          <div>
            <p class="text-xs text-gray-400 font-medium mb-0.5">
              {{ card.label }}
            </p>
            <p class="text-2xl font-extrabold text-gray-900 leading-tight">
              {{ card.value }}
            </p>
            <p class="text-xs text-gray-400 mt-0.5">{{ card.sub }}</p>
          </div>
        </div>
      </div>

      <!-- Activity Heatmap -->
      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div class="overflow-x-auto">
          <div class="min-w-[640px]">
            <!-- Month labels -->
            <div class="flex mb-2 pl-10">
              <div
                v-for="month in heatmapMonths"
                :key="month.label"
                :style="{ width: month.weeks * cellSize + 'px' }"
                class="text-xs font-semibold text-gray-500 flex-shrink-0"
              >
                {{ month.label }}
              </div>
            </div>

            <!-- Grid -->
            <div class="flex gap-0">
              <!-- Day labels -->
              <div class="flex flex-col gap-0.5 mr-2 pt-0.5">
                <div
                  v-for="day in dayLabels"
                  :key="day"
                  class="text-xs text-gray-400 flex items-center"
                  :style="{ height: cellSize + 'px', width: '32px' }"
                >
                  {{ day }}
                </div>
              </div>

              <!-- Cells -->
              <div class="flex gap-0.5">
                <div
                  v-for="(week, wi) in heatmapWeeks"
                  :key="wi"
                  class="flex flex-col gap-0.5"
                >
                  <div
                    v-for="(cell, di) in week"
                    :key="di"
                    :class="[
                      'rounded-sm transition-transform hover:scale-110 cursor-pointer',
                      cellColor(cell),
                    ]"
                    :style="{
                      width: cellSize - 2 + 'px',
                      height: cellSize - 2 + 'px',
                    }"
                    :title="cell.date"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Legend -->
            <div
              class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100"
            >
              <div class="flex items-center gap-2">
                <div
                  class="w-4 h-4 rounded-sm bg-gray-100 border border-gray-200"
                ></div>
                <span class="text-xs text-gray-400">No activity</span>
                <span class="text-xs text-gray-400 ml-2">Less</span>
                <div class="w-4 h-4 rounded-sm bg-green-100"></div>
                <div class="w-4 h-4 rounded-sm bg-green-300"></div>
                <div class="w-4 h-4 rounded-sm bg-green-500"></div>
                <div class="w-4 h-4 rounded-sm bg-green-700"></div>
                <span class="text-xs text-gray-400">More</span>
              </div>
              <div class="flex items-center gap-2">
                <div
                  class="w-4 h-4 rounded-sm border-2 border-gray-700 bg-white"
                ></div>
                <span class="text-xs text-gray-400">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row -->
      <div class="grid grid-cols-3 gap-4">
        <!-- Streak Status -->
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 class="text-base font-bold text-gray-900 mb-4">Streak Status</h2>
          <div class="flex items-center gap-4 mb-4">
            <!-- Circular progress -->
            <div class="relative w-20 h-20 flex-shrink-0">
              <svg class="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="#f0fdf4"
                  stroke-width="8"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="#22c55e"
                  stroke-width="8"
                  stroke-linecap="round"
                  :stroke-dasharray="`${2 * Math.PI * 34}`"
                  :stroke-dashoffset="`${
                    2 * Math.PI * 34 * (1 - streakProgress)
                  }`"
                  style="transition: stroke-dashoffset 0.6s ease"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-green-500 text-2xl">🔥</span>
              </div>
            </div>
            <p class="text-sm text-gray-500 leading-relaxed">
              Great job! You're
              <span class="text-green-600 font-semibold"
                >{{ currentStreak }} days</span
              >
              strong. Complete today to keep your streak alive.
            </p>
          </div>
          <div class="bg-green-50 rounded-xl px-4 py-2.5 text-sm text-gray-600">
            You have
            <span class="text-green-600 font-bold">{{ timeLeft }}</span> left
            today
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 class="text-base font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div class="space-y-3">
            <div
              v-for="act in recentActivity"
              :key="act.date"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-2.5">
                <span v-if="act.completed" class="text-green-500">
                  <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span v-else class="text-red-500">
                  <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span class="text-sm font-semibold text-gray-800">{{
                  act.label
                }}</span>
              </div>
              <span
                :class="act.completed ? 'text-gray-500' : 'text-red-500'"
                class="text-sm font-medium"
              >
                {{ act.completed ? 'Completed' : 'Missed' }}
              </span>
            </div>
          </div>
          <button
            class="mt-4 flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700 transition"
          >
            View all activity
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <!-- Milestones -->
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 class="text-base font-bold text-gray-900 mb-4">Milestones</h2>
          <div class="space-y-3">
            <div
              v-for="m in milestones"
              :key="m.title"
              class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div
                :class="`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.iconBg}`"
              >
                <span class="text-lg">{{ m.icon }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-gray-900">{{ m.title }}</p>
                <p class="text-xs text-gray-400">{{ m.sub }}</p>
              </div>
              <span v-if="m.achieved" class="text-green-500 flex-shrink-0">
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                >
                  <circle cx="10" cy="10" r="8" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 10l2 2 4-4"
                  />
                </svg>
              </span>
              <span v-else class="text-gray-300 flex-shrink-0">
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                >
                  <rect x="5" y="3" width="10" height="14" rx="2" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 10v3M10 7v.01"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
</template>
