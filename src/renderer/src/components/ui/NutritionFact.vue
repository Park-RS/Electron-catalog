<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  iconClass?: string
  value: number
  unit?: string
  label: string
}>()
</script>

<template>
  <div class="bg-gray-50 rounded-xl p-3 text-center">
    <component :is="icon" class="w-4 h-4 mx-auto mb-1" :class="iconClass" />
    <div class="text-sm font-bold text-gray-800">{{ value }}{{ unit ? ` ${unit}` : '' }}</div>
    <div class="text-[11px] text-gray-500">{{ label }}</div>
  </div>
</template>
