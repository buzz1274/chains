<script setup lang="ts">
import { ClipboardCheck as ClipboardCheckIcon } from '@lucide/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import { useChainsStore } from '@/features/chains/store/useChainsStore'
import BaseTransparentButton from '@/shared/components/base/BaseTransparentButton.vue'
import router from '@/shared/routes/router.ts'

const route = useRoute()
const chainsStore = useChainsStore()
const path = '/chains/confirm-outstanding'

const active = computed(() => route.path === path)
</script>

<template>
  <BaseTransparentButton
    :label="'Confirm Outstanding Chains'"
    :class="[
      active ? 'bg-green-50 border border-green-200 hover:bg-green-100' : ''
    ]"
    @click="chainsStore.setActiveChainId(null); router.push(path);"
    v-if="chainsStore.chains.length > 0"
  >
    <template #icon-left>
      <ClipboardCheckIcon class="w-5 h-5" />
    </template>
  </BaseTransparentButton>
</template>
