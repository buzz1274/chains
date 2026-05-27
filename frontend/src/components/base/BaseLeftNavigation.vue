<script setup lang="ts">
import HeaderTitle from '@/shared/ui/base/HeaderTitle.vue'
</script>

<template>
  <div class="w-86 p-4 mt-2 bg-white border-r-2 border-gray-100">
    <div class="flex items-center gap-3 mb-4">
      <img src="@/assets/images/logo.png" alt="logo" class="w-8 h-8 mb-4" />
      <HeaderTitle class="pb-4 -ml-2">
        Chains
      </HeaderTitle>
    </div>
    <slot name="lhs_content"> </slot>
  </div>
</template>
