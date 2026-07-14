<script setup lang="ts">
const searchQuery = defineModel<string>()
</script>
<template>
  <div class="p-4 md:p-6 bg-white border-b border-gray-200 shrink-0">
    <div class="relative max-w-2xl mx-auto md:mx-0">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск напитков и десертов..."
        class="w-full pl-11 pr-4 py-3 bg-gray-100 border-none rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  </div>
</template>
