<script setup lang="ts">
import { ref } from 'vue'
import type { CatalogItem } from '../service/CatalogService'
import { catalogService } from '../service/CatalogService'
import { ImageOff } from '@lucide/vue'

defineProps<{
  item: CatalogItem
}>()

const isCurrentImageNotFound = ref<boolean>(false)
</script>

<template>
  <div
    class="bg-white rounded-xl max-w-xs flex flex-col gap-3 p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
  >
    <div
      class="w-full h-48 bg-gray-100 flex items-center rounded-xl justify-center overflow-hidden"
    >
      <img
        v-if="!isCurrentImageNotFound"
        :src="item.product.logo"
        :alt="item.product.name"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        @error="isCurrentImageNotFound = true"
      />
      <ImageOff v-else class="w-[70%] h-[70%] opacity-80" color="gray"></ImageOff>
    </div>
    <div class="flex justify-between items-start mb-3">
      <h3 class="text-lg font-semibold text-gray-800 leading-tight pr-4">
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
        <!-- Иконок получше на Lucide не нашел -->
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
