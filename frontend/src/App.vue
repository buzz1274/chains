<script setup lang="ts">
import Toast from 'primevue/toast'

import { useUserStore } from '@/stores/UserStore'
import LandingPage from '@/views/LandingPage.vue'
import HomePage from '@/views/HomePage.vue'

const userStore = useUserStore()
</script>

<template>
  <div class="min-h-[55vh] min-w-[900px] p-2 bg-white">
    <div class="flex min-h-[55vh]">
      <Toast />
      <LandingPage v-if="!userStore.isAuthenticated" />
      <HomePage v-else />
    </div>
  </div>
</template>
