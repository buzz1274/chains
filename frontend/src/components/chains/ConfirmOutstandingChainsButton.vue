<script setup lang="ts">
import { ClipboardCheck as ClipboardCheckIcon } from '@lucide/vue'
import BaseTransparentButton from '@/components/base/BaseTransparentButton.vue'
import router from '@/router/router.ts'
</script>

<template>
  <BaseTransparentButton
    :label="'Confirm Outstanding Chains'"
    @click="router.push('/chains/confirm-outstanding')"
  >
    <template #icon-left>
      <ClipboardCheckIcon class="w-5 h-5" />
    </template>
  </BaseTransparentButton>
</template>
