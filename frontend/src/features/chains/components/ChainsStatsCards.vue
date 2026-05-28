<script setup lang="ts">
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
</script>
<template>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="card in statCards"
      :key="card.label"
      :class="[
        'bg-white rounded-2xl border border-gray-100 p-5',
        'flex items-start gap-4 shadow-sm',
      ]"
    >
      <div
        :class="[
          'w-12 h-12 rounded-2xl flex items-center justify-center',
          'flex-shrink-0',
          card.iconBg,
        ]"
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
</template>
