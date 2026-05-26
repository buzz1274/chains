<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { LogOut as LogOutIcon } from '@lucide/vue'

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
  <button class="cursor-pointer" @click="processLogout">
    <LogOutIcon class="w-5 h-5" />
  </button>
</template>
