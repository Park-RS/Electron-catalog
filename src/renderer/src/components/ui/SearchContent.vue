<script setup lang="ts">
import { Utensils } from '@lucide/vue'
import ProductCard from '@renderer/components/ProductCard.vue'
import type { CatalogItem, CategoryNode } from '@renderer/service/CatalogService'

defineProps<{
  searchQuery?: string
  displayedItems: CatalogItem[]
  selectedNode?: CategoryNode | null
}>()
</script>

<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar min-w-0 w-full">
    <div class="mb-6 w-full">
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
      class="grid grid-cols-1 sm:grid-cols-2 min-w-full lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full min-w-0"
    >
      <ProductCard v-for="item in displayedItems" :key="item.id" class="w-full" :item="item" />
    </div>

    <div
      v-else
      class="w-full min-h-[400px] gap-3 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200 shadow-sm"
    >
      <Utensils :size="72" color="gray" />
      <p class="text-xl font-semibold text-gray-600 mb-2">Ничего не найдено :(</p>
      <p v-if="searchQuery" class="text-sm text-gray-500">Попробуйте изменить поисковый запрос</p>
      <p v-else class="text-sm text-gray-500">В этой категории пока нет товаров</p>
    </div>
  </div>
</template>
