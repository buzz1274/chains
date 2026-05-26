<script setup lang="ts">
import BaseLeftNavigation from '@/components/base/BaseLeftNavigation.vue'
import LogOut from '@/components/authentication/LogOut.vue'
</script>

<template>
  <BaseLeftNavigation>
    <template #lhs_content>
      <LogOut />
    </template>
  </BaseLeftNavigation>
</template>
