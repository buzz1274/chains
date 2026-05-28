<script setup lang="ts">
import HeaderTitle from '@/shared/ui/components/base/HeaderTitle.vue'
</script>
<template>
  <div class="flex">
    <aside class="w-80 p-4 mt-2 bg-white">
      <div class="flex items-center gap-3 mb-4">
        <img src="../../../assets/images/logo.png" alt="logo" class="w-8 h-8 mb-4" />

        <HeaderTitle class="pb-4 -ml-2">
          Chains
        </HeaderTitle>
      </div>

      <slot name="sidebar" />
    </aside>

    <main class="flex-1 p-4 bg-[#fcfcfd] border-2 border-gray-100 rounded-2xl">
      <div class="bg-gray-50">
        <div class="max-w-5xl mx-auto space-y-5 pb-2">
          <slot name="main" />
        </div>
      </div>
    </main>
  </div>
</template>
