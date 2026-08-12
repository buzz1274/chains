<script setup lang="ts">
import { Plus as PlusIcon } from '@lucide/vue'

import router from '@/shared/routes/router.ts'
import BaseTransparentButton from '@/shared/components/base/BaseTransparentButton.vue'
import { useChainsStore } from '@/features/chains/store/useChainsStore'

const chainsStore = useChainsStore()
</script>

<template>
  <BaseTransparentButton
    v-if="chainsStore.chains.length > 0"
    label="Add New Chain"
    @click="router.push('/chains/add/')"
  >
    <template #icon-left>
      <PlusIcon class="w-5 h-5" />
    </template>
  </BaseTransparentButton>
</template>
