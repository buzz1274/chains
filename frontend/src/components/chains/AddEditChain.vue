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
      'text-gray-500 font-medium text-sm hover:border-green-300',
      'hover:text-green-600 hover:bg-green-50',
      'transition-all duration-200',
    ]"
    @click="addEditChain"
  >
    <PlusIcon class="w-5 h-5" />
    Add New Chain
  </button>
</template>
