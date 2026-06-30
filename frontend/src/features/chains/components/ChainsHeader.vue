<script setup lang="ts">
import UserProfileButton from '@/features/users/components/UserProfileButton.vue'
import ChainsHeaderDetail from '@/features/chains/components/ChainsHeaderDetail.vue'
import BaseHeaderTitle from '@/shared/components/base/BaseHeaderTitle.vue'
withDefaults(
  defineProps<{
    title?: string
    displayChainDetails?: boolean
  }>(),
  {
    title: 'Chains',
    displayChainDetails: false,
  },
)
</script>
<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <ChainsHeaderDetail v-if="displayChainDetails" />
      <BaseHeaderTitle
        v-else
        class="text-2xl font-extrabold text-gray-900 tracking-tight"
      >
        {{ title }}
      </BaseHeaderTitle>
    </div>
    <UserProfileButton />
  </div>
</template>
