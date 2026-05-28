<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useToast } from 'primevue/usetoast'
import { LogOut as LogOutIcon } from '@lucide/vue'

import DropDownMenu from '@/shared/ui/components/base/DropDownMenu.vue'
import { useAuth } from '@/composables/authentication/useAuth.ts'
import { useUserStore } from '@/stores/UserStore.ts'

const userStore = useUserStore()
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
    <DropDownMenu v-if="userStore.user" :items="items">
      <img
        :src="userStore.user.image"
        alt="user image"
        class="w-10 h-10 rounded-full object-cover"
      />
    </DropDownMenu>
  </div>
</template>
