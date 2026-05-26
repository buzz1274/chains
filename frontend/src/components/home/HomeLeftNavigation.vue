<script setup lang="ts">
import BaseLeftNavigation from '@/components/base/BaseLeftNavigation.vue'
import AddEditChain from '@/components/chains/AddEditChain.vue'
import ChainsList from '@/components/chains/ChainsList.vue'
</script>

<template>
  <BaseLeftNavigation>
    <template #lhs_content>
      <span class="text-s block text-gray-500">YOUR CHAINS</span>
      <ChainsList />
      <AddEditChain />
    </template>
  </BaseLeftNavigation>
</template>
