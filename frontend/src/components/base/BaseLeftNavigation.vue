<script setup lang="ts"></script>

<template>
  <div class="w-86 p-4 bg-white border-r-2 border-gray-100">
    <div class="flex items-center gap-3 mb-4">
      <img src="@/assets/images/logo.png" alt="logo" class="w-8 h-8 mb-4" />
      <h1 class="text-2xl font-bold pb-5">Chains</h1>
    </div>
    <slot name="lhs_content"> </slot>
  </div>
</template>
