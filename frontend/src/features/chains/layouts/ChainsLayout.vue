<script setup lang="ts">
import DefaultLayout from '@/shared/ui/layouts/DefaultLayout.vue'
import AddEditChainButton from '@/components/chains/AddEditChainButton.vue'
import ConfirmOutstandingChainsButton from '@/components/chains/ConfirmOutstandingChainsButton.vue'
import ChainsList from '@/features/chains/components/ChainsList.vue'
</script>
<template>
  <DefaultLayout>
    <template #sidebar>
      <ChainsList />
      <ConfirmOutstandingChainsButton />
      <AddEditChainButton />
    </template>
    <template #main>
      <router-view />
    </template>
  </DefaultLayout>
</template>
