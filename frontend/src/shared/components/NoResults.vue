<script setup lang="ts">
import GreenRoadToFlag from '@/assets/images/green_road_to_flag.png'
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center pt-30">
    <img :src="GreenRoadToFlag" alt="icon" class="w-auto h-80" />
    <p class="text-lg text-center mt-4">
      <slot name="no-content-message"> </slot>
    </p>
  </div>
</template>
