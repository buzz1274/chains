<script setup lang="ts">
import Toast from 'primevue/toast'
</script>

<template>
  <div class="min-h-[55vh] min-w-[900px] p-2 bg-white">
    <div class="flex min-h-[55vh]">
      <Toast />
      <RouterView />
    </div>
  </div>
</template>
