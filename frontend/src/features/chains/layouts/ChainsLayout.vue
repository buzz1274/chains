<script setup lang="ts">
import DefaultLayout from '@/shared/layouts/DefaultLayout.vue'
import ChainsList from '@/features/chains/components/ChainsList.vue'
import ChainsConfirmOutstandingButton from '@/features/chains/components/ChainsConfirmOutstandingButton.vue'
import ChainsAddEditButton from '@/features/chains/components/ChainsAddEditButton.vue'
</script>
<template>
  <DefaultLayout>
    <template #sidebar>
      <ChainsList />
      <ChainsConfirmOutstandingButton />
      <ChainsAddEditButton />
    </template>
    <template #main>
      <router-view />
    </template>
  </DefaultLayout>
</template>
