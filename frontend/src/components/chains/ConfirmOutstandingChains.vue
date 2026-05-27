<script setup lang="ts">
import { ClipboardCheck as ClipboardCheckIcon } from '@lucide/vue'

import BaseTransparentButton from '@/components/base/BaseTransparentButton.vue'

const confirmOutstandingChains = () => {
  console.log('Confirm Outstanding Chains')
}
</script>

<template>
  <BaseTransparentButton
    :label="'Confirm Outstanding Chains'"
    @click="confirmOutstandingChains"
  >
    <template #icon-left>
      <ClipboardCheckIcon class="w-5 h-5" />
    </template>
  </BaseTransparentButton>
</template>
