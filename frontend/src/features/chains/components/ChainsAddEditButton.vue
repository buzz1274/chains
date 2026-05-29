<script setup lang="ts">
import { Plus as PlusIcon } from '@lucide/vue'

import router from '@/router/router.ts'
import BaseTransparentButton from '@/shared/ui/components/base/BaseTransparentButton.vue'
</script>

<template>
  <BaseTransparentButton
    label="Add New Chain"
    @click="router.push('/chains/add/')"
  >
    <template #icon-left>
      <PlusIcon class="w-5 h-5" />
    </template>
  </BaseTransparentButton>
</template>
