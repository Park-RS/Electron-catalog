<script setup lang="ts">
import { Loader2 } from '@lucide/vue'
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-3">
    <Loader2 :size="40" class="animate-spin text-blue-500" />
    <p class="text-sm text-gray-500">Загружаем каталог...</p>
  </div>
</template>
