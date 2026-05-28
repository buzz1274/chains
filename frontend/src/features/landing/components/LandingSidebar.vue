<script setup lang="ts">
import BaseLeftNavigation from '@/components/base/BaseLeftNavigation.vue'
import GreenFire from '@/assets/images/green_fire.png'
import GreenGraphArrow from '@/assets/images/green_graph_arrow.png'
import YellowCup from '@/assets/images/yellow_cup.png'
import BlueTarget from '@/assets/images/blue_target.png'
import GoogleAuthenticationButton from '@/components/authentication/GoogleAuthenticationButton.vue'

const infoCallout: {
  title: string
  description: string
  image: string
}[] = [
  {
    title: 'Build Consistency',
    description: 'Track daily progress and build unbreakable habits.',
    image: GreenFire,
  },
  {
    title: 'See Your Progress',
    description: 'Visualize your consistency with beautiful heatmaps.',
    image: GreenGraphArrow,
  },
  {
    title: 'Reach Milestones',
    description: 'Unlock achievements and beat your personal bests.',
    image: YellowCup,
  },
  {
    title: 'Stay Motivated',
    description: 'Stay on track and never lose your streak again.',
    image: BlueTarget,
  },
]
</script>

<template>
  <div class="pt-23" />
  <div
    v-for="(value, key) in infoCallout"
    :key="key"
    class="info-callout mt-10 flex items-start gap-5"
  >
    <img :src="value.image" alt="icon" class="w-16 h-16" />
    <div class="leading-snug">
      <strong class="text-m block text-gray-700">
        {{ value.title }}
      </strong>

      <span class="text-sm text-gray-500">
        {{ value.description }}
      </span>
    </div>
  </div>
  <div class="flex justify-center pt-5">
    <GoogleAuthenticationButton label="Sign In" />
  </div>
</template>
