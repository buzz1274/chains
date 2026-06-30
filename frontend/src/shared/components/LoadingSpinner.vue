<script setup lang="ts"></script>

<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col items-center justify-center py-24">
      <div
        :class="[
          'h-12 w-12 animate-spin rounded-full border-4 border-gray-200',
          'border-t-blue-500',
        ]"
      />

      <p class="mt-4 text-lg text-gray-500">Loading...</p>
    </div>
  </div>
</template>
