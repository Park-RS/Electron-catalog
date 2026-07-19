<script setup lang="ts">
import { AlertTriangle, RefreshCw } from '@lucide/vue'

defineProps<{
  message?: string
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
    <AlertTriangle :size="40" class="text-red-500" />
    <p class="text-lg font-semibold text-gray-800">Не удалось загрузить каталог</p>
    <p v-if="message" class="text-sm text-gray-500 max-w-sm">{{ message }}</p>
    <button
      type="button"
      class="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
      @click="emit('retry')"
    >
      <RefreshCw :size="16" />
      Повторить попытку
    </button>
  </div>
</template>
