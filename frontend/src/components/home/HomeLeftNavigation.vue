<script setup lang="ts">
import BaseLeftNavigation from '@/components/base/BaseLeftNavigation.vue'
import AddEditChainButton from '@/components/chains/AddEditChainButton.vue'
import ChainsList from '@/components/chains/ChainsList.vue'
import ConfirmOutstandingChains from '@/components/chains/ConfirmOutstandingChains.vue'
</script>

<template>
  <BaseLeftNavigation>
    <template #lhs_content>
      <span class="text-s block text-gray-500">YOUR CHAINS</span>
      <ChainsList />
      <ConfirmOutstandingChains />
      <AddEditChainButton />
    </template>
  </BaseLeftNavigation>
</template>
