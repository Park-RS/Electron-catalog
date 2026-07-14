<script setup lang="ts">
import type { RawItem } from '../service/CatalogService'
import { catalogService } from '../service/CatalogService'

defineProps<{
  item: RawItem
}>()
</script>

<template>
  <div
    class="bg-white rounded-xl max-w-xs flex flex-col gap-3 p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
  >
    <div class="w-full h-48 bg-gray-100 overflow-hidden">
      <img
        :src="item.product.logo"
        :alt="item.product.name"
        class="w-full h-full object-cover hover:scale-105 rounded-xl transition-transform duration-300"
      />
    </div>
    <div class="flex justify-between items-start mb-3">
      <h3 class="text-lg font-bold text-gray-800 leading-tight pr-4">
        {{ item.product.name }}
      </h3>
      <span class="text-xl font-extrabold text-blue-600 whitespace-nowrap">
        {{ catalogService.formatPrice(item.product.price) }}
      </span>
    </div>

    <p v-if="item.product.description" class="text-sm text-gray-600 mb-4 leading-relaxed">
      {{ item.product.description }}
    </p>

    <div class="flex flex-wrap gap-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
      <div v-if="item.product.weight && item.product.unitType" class="flex items-center gap-1">
        <span class="text-gray-400">⚖️</span>
        <span>{{ item.product.weight }} {{ item.product.unitType }}</span>
      </div>

      <div v-if="item.product.brand" class="flex items-center gap-1">
        <span class="text-gray-400">🏷️</span>
        <span>{{ item.product.brand }}</span>
      </div>

      <div v-if="item.product.calories" class="flex items-center gap-1">
        <span class="text-gray-400">🔥</span>
        <span>{{ item.product.calories }} ккал</span>
      </div>

      <div v-if="item.product.inStock" class="flex items-center gap-1 text-green-600">
        <span class="w-2 h-2 rounded-full bg-green-500"></span>
        <span>{{ item.product.inStock ? 'В наличии' : 'Товар отсутствует' }}</span>
      </div>
    </div>
  </div>
</template>
