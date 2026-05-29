<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import type { Component } from 'vue'
defineProps<{
  items: { label: string; command: () => void; icon: Component }[]
}>()
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton class="cursor-pointer">
      <slot />
    </MenuButton>
    <Transition
      enter="transition ease-out duration-100"
      enter-from="transform opacity-0 scale-95"
      enter-to="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leave-from="transform opacity-100 scale-100"
      leave-to="transform opacity-0 scale-95"
    >
      <MenuItems
        :class="[
          'absolute right-0 mt-0.5 -translate-y-5 w-48 origin-top-right',
          'bg-white shadow-lg ring-1 ring-black/5 ',
          'focus:outline-none p-1 z-50',
        ]"
      >
        <MenuItem v-for="item in items" :key="item.label" v-slot="{ active }">
          <button
            :class="[
              'flex w-full items-center rounded-lg px-2 py-1 text-xs',
              'transition',
              active
                ? 'bg-gray-100 text-gray-900 cursor-pointer'
                : 'text-gray-700',
            ]"
            @click="item.command"
          >
            <component :is="item.icon" class="mr-2 h-4 w-4" />
            <span>{{ item.label }}</span>
          </button>
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
</template>
