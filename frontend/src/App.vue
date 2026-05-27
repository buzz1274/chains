<script setup lang="ts">
import Toast from 'primevue/toast'

import { useUserStore } from '@/stores/UserStore'
import LandingPage from '@/views/LandingPage.vue'
import MainPage from '@/views/MainPage.vue'

const userStore = useUserStore()
</script>

<template>
  <div class="min-h-[55vh] min-w-[900px] p-2 bg-white">
    <div class="flex min-h-[55vh]">
      <Toast />
      <MainPage v-if="userStore.isAuthenticated" />
      <LandingPage v-else />
    </div>
  </div>
</template>
