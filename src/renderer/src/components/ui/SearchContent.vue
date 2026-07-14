<script setup lang="ts">
import ProductCard from '@renderer/components/ProductCard.vue'
import type { CatalogItem, CategoryNode } from '@renderer/service/CatalogService'

defineProps<{
  searchQuery?: string
  displayedItems: CatalogItem[]
  selectedNode?: CategoryNode | null
}>()
</script>
<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar w-full">
    <div class="mb-6">
      <h2 v-if="searchQuery" class="text-2xl py-3 font-bold text-gray-800">
        Результаты поиска
        <span class="text-base font-normal text-gray-500 ml-2">({{ displayedItems.length }})</span>
      </h2>
      <h2 v-else class="text-2xl font-bold py-3 text-gray-800">
        {{ selectedNode?.name || 'Каталог' }}
        <span class="text-base font-normal text-gray-500 ml-2">({{ displayedItems.length }})</span>
      </h2>
    </div>

    <div
      v-if="displayedItems.length > 0"
      v-auto-animate
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
    >
      <ProductCard v-for="item in displayedItems" :key="item.id" class="w-full" :item="item" />
    </div>

    <div v-else class="flex flex-col items-center justify-center h-64 text-gray-400">
      <span class="text-6xl mb-4">🍽️</span>
      <p class="text-lg">Здесь пока пусто</p>
      <p v-if="searchQuery" class="text-sm mt-2">Попробуйте изменить запрос</p>
    </div>
  </div>
</template>
