<script setup lang="ts">
import Profile from '@/components/authentication/Profile.vue'
import ChainsHeaderDetail from '@/features/chains/components/ChainsHeaderDetail.vue'
import HeaderTitle from '@/shared/ui/base/HeaderTitle.vue'
withDefaults(defineProps<{
  title?: string,
  displayChainDetails?: boolean
}>(), {
  title: 'Chains',
  displayChainDetails: false,
})
</script>
<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <ChainsHeaderDetail v-if="displayChainDetails" />
      <HeaderTitle
        v-else
        class="text-2xl font-extrabold text-gray-900 tracking-tight"
      >
        {{ title }}
      </HeaderTitle>
    </div>
    <Profile />
  </div>
</template>
