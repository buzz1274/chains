<script setup lang="ts">
import HomeLeftNavigation from '@/components/home/HomeLeftNavigation.vue'
import MainPage from '@/shared/ui/components/base/MainPage.vue'
</script>
<template>
  <HomeLeftNavigation />
  <MainPage>
    <RouterView />
  </MainPage>
</template>
