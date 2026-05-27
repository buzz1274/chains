<script setup lang="ts">
import BaseLeftNavigation from '@/components/base/BaseLeftNavigation.vue'
import AddEditChainButton from '@/components/chains/AddEditChainButton.vue'
import ChainsList from '@/components/chains/ChainsList.vue'
import ConfirmOutstandingChainsButton from '@/components/chains/ConfirmOutstandingChainsButton.vue'
</script>

<template>
  <BaseLeftNavigation>
    <template #lhs_content>
      <ChainsList />
      <ConfirmOutstandingChainsButton />
      <AddEditChainButton />
    </template>
  </BaseLeftNavigation>
</template>
