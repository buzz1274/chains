<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

import BaseButton from '@/components/base/BaseButton.vue'
import { useAuth } from '@/composables/authentication/UseAuth'

const { logout } = useAuth()
const toast = useToast()

const processLogout = () => {
  logout()
  toast.add({
    severity: 'success',
    summary: 'Signed Out',
    detail: 'You have been signed out.',
    life: 3000,
  })
}
</script>

<template>
  <BaseButton label="Sign Out" @click="processLogout" />
</template>
