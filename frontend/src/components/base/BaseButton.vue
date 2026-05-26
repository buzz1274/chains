<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <button
    :class="[
      'flex items-center gap-2 bg-green-600 hover:bg-green-700',
      'active:bg-green-800 text-white font-medium py-2 px-4',
      'rounded-md shadow-sm transition-colors',
      'hover:cursor-pointer',
    ]"
  >
    <slot name="icon-left" />
    {{ props.label }}
  </button>
</template>
