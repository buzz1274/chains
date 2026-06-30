<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <button
    :class="[
      'w-full mt-2 flex items-center justify-center gap-2',
      'py-4 px-6 rounded-2xl border-2 border-dashed border-gray-200',
      'text-gray-500 font-medium text-sm hover:border-gray-300',
      'hover:text-gray-600 hover:bg-gray-100',
      'transition-all duration-200 hover:cursor-pointer',
    ]"
  >
    <slot name="icon-left" />
    {{ label }}
  </button>
</template>
