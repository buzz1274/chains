<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { LogOut as LogOutIcon } from '@lucide/vue'

import BaseDropDownMenu from '@/shared/components/base/BaseDropDownMenu.vue'
import { useAuth } from '@/shared/composables/useAuth'
import { useUserStore } from '@/features/users/stores/useUserStore'

const userStore = useUserStore()
const { logout, redirectTo } = useAuth()
const toast = useToast()
const processLogout = () => {
  logout()
  redirectTo('/')

  toast.add({
    severity: 'success',
    summary: 'Signed Out',
    detail: 'You have been signed out.',
    life: 3000,
  })
}
const items = [
  {
    label: 'Logout',
    icon: LogOutIcon,
    command: processLogout,
  },
]
</script>

<template>
  <div class="flex justify-end">
    <span class="mr-3 text-sm font-semibold text-gray-700">
      Welcome Back, {{ userStore.user?.name }}
    </span>
    <BaseDropDownMenu v-if="userStore.user" :items="items">
      <img
        :src="userStore.user.image"
        alt="user image"
        class="w-10 h-10 rounded-full object-cover"
      />
    </BaseDropDownMenu>
  </div>
</template>
