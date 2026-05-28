<script setup lang="ts">
import DefaultLayout from '@/shared/ui/layouts/DefaultLayout.vue'
import AddEditChainButton from '@/components/chains/AddEditChainButton.vue'
import ConfirmOutstandingChainsButton from '@/components/chains/ConfirmOutstandingChainsButton.vue'
import ChainsList from '@/components/chains/ChainsList.vue'
</script>
<template>
  <DefaultLayout>
    <template #sidebar>
      <ChainsList />
      <ConfirmOutstandingChainsButton />
      <AddEditChainButton />
    </template>
    <template #main>
      <slot />
    </template>
  </DefaultLayout>
</template>
