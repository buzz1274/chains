<script setup lang="ts">
import BaseHeaderTitle from '@/shared/components/base/BaseHeaderTitle.vue'
</script>
<template>
  <aside class="w-80 p-4 mt-2 bg-white">
    <div
      class="flex items-center gap-3 mb-4 hover:cursor-pointer"
      @click="$router.push('/')"
    >
      <img src="../../assets/images/logo.png" alt="logo" class="w-8 h-8 mb-4" />

      <BaseHeaderTitle class="pb-4 -ml-2"> Chains </BaseHeaderTitle>
    </div>

    <slot name="sidebar" />
  </aside>

  <main :class="['flex-1']">
    <div
      :class="[
        'max-w-5xl mx-auto space-y-5 pb-4 p-3 bg-[#fcfcfd] border-2 bg-gray-50',
        'border-gray-100 rounded-2xl min-h-200',
      ]"
    >
      <slot name="main" />
    </div>
  </main>
</template>
