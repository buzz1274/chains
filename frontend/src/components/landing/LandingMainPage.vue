<script setup lang="ts">
import MainPage from '@/shared/ui/components/base/MainPage.vue'
import GreenRoadToFlag from '@/assets/images/green_road_to_flag.png'
import GoogleAuthenticationButton from '@/components/authentication/GoogleAuthenticationButton.vue'

const infoHowItWorks: {
  title: string
  description: string
}[] = [
  {
    title: 'Create a Chain',
    description: 'Track daily progress and build unbreakable habits.',
  },
  {
    title: 'Track Daily',
    description: 'Mark your progress every day.',
  },
  {
    title: 'Build Momentum',
    description: 'Watch your streak grow and achieve greatness.',
  },
]
</script>

<template>
  <MainPage>
    <div class="flex flex-col items-center pt-8">
      <img :src="GreenRoadToFlag" alt="icon" class="w-auto h-80" />

      <h1 class="text-4xl font-bold text-center mt-8">Welcome to Chains</h1>
      <p class="text-lg text-center mt-4">
        Create a new chain and start building consistency
      </p>

      <GoogleAuthenticationButton label="Create Your First Chain" />

      <div class="flex items-center justify-center w-4/5 mx-auto my-8">
        <div class="flex-1 h-px bg-gray-300"></div>
        <span class="px-4 text-sm text-gray-500 whitespace-nowrap">
          HOW IT WORKS
        </span>
        <div class="flex-1 h-px bg-gray-300"></div>
      </div>

      <div class="flex items-center justify-center gap-4 w-4/5 mx-auto">
        <div v-for="(value, key) in infoHowItWorks" :key="key">
          <div class="flex items-center gap-3">
            <div
              :class="[
                'w-15 h-15 rounded-full bg-green-600 text-white',
                'flex items-center justify-center font-semibold',
              ]"
            >
              {{ key + 1 }}
            </div>

            <div class="leading-snug min-w-0">
              <strong class="text-m block text-gray-700">
                {{ value.title }}
              </strong>

              <p class="text-xs text-gray-500 max-w-36">
                {{ value.description }}
              </p>
            </div>

            <div
              v-if="key !== infoHowItWorks.length - 1"
              class="w-8 border-t-2 border-dashed border-gray-300"
            />
          </div>
        </div>
      </div>

      <div
        :class="[
          'w-3/5 mx-auto bg-green-50 border-l-4 border-green-500',
          'rounded-md p-4 my-6 mt-15',
        ]"
      >
        <p class="text-black italic text-sm leading-relaxed">
          <span class="text-lg leading-none">“</span>
          The chains of habit are to light to be felt until they are to heavy to
          be broken.
          <span class="text-lg leading-none">”</span>
        </p>
        <p class="text-black text-xs mt-3 font-medium text-right">
          — Samuel Johnson
        </p>
      </div>
    </div>
  </MainPage>
</template>
