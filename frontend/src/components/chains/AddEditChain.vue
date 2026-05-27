<script setup lang="ts">
import { Plus as PlusIcon } from '@lucide/vue'

const addEditChain = () => {
  console.log('Add Edit Chain')
}
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
    @click="addEditChain"
  >
    <PlusIcon class="w-5 h-5" />
    Add New Chain
  </button>
</template>
