<script setup lang="ts">
import HomeLeftNavigation from '@/components/home/HomeLeftNavigation.vue'
</script>
<template>
  <HomeLeftNavigation />
  <div class="bg-gray-50 p-4 font-sans">
    <div class="max-w-5xl mx-auto space-y-5">
      <RouterView />
    </div>
  </div>
</template>
