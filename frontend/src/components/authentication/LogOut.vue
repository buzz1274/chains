<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useToast } from 'primevue/usetoast'
import { LogOut as LogOutIcon } from '@lucide/vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import { useAuth } from '@/composables/authentication/useAuth'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const { logout } = useAuth()
const toast = useToast()

const processLogout = () => {
  logout()
  toast.add({
    severity: 'success',
    summary: 'Signed Out',
    detail: 'You have been signed out.',
    life: 3000
  })
}
</script>

<template>
  <div class="flex justify-end">
    <span class="mt-2 mr-5 text-sm font-semibold text-gray-700">
      Welcome Back, {{ userStore.user?.name }}
    </span>
    <Menu as="div" class="relative inline-block text-left">
      <MenuButton v-if="userStore.user" class="cursor-pointer">
        <img :src="userStore.user.image" alt="user image" class="w-10 h-10 rounded-full object-cover" />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-100"
        enter-from="transform opacity-0 scale-95"
        enter-to="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leave-from="transform opacity-100 scale-100"
        leave-to="transform opacity-0 scale-95"
      >
        <MenuItems v-slot="{ active }" class="absolute right-0 mt-0.5 -translate-y-5 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none p-1 z-50">
          <MenuItem
as="button" :class="[
            'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition',
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
          ]"
                    @click="processLogout">
            <LogOutIcon class="h-4 w-4" />
            <span>Sign Out</span>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
</template>
