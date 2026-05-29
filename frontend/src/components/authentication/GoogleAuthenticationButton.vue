<script setup lang="ts">
import { onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'

import BaseButton from '@/shared/ui/components/base/BaseButton.vue'
import { useGoogleAuth } from '@/composables/authentication/UseGoogleAuth'
import { useAuth } from '@/composables/authentication/useAuth'

const toast = useToast()
const auth = useAuth()

const { initGoogleAuth, authenticateWithGoogle } = useGoogleAuth()

onMounted(() => {
  initGoogleAuth((code, provider) => {
    auth
      .login(code, provider)
      .then(() => {
        auth.redirectTo('/chains')
      })
      .catch((error) => {
        toast.add({
          severity: 'error',
          summary: `Authentication[${error.status}]`,
          detail: error.message,
          life: 3000,
        })
      })
  })
})
</script>

<template>
  <BaseButton
    label="Sign in with Google"
    class="mt-6"
    @click="authenticateWithGoogle()"
  />
</template>
