<script setup lang="ts">
import { ref } from 'vue'
import type { CatalogItem } from '../service/CatalogService'
import { catalogService } from '../service/CatalogService'
import { CheckCircle2, ImageOff, Scale } from '@lucide/vue'

defineProps<{
  item: CatalogItem
}>()

const emit = defineEmits<{
  open: [item: CatalogItem]
}>()

const isCurrentImageNotFound = ref<boolean>(false)

const handleActivate = (item: CatalogItem): void => {
  emit('open', item)
}
</script>

<template>
  <div
    class="bg-white rounded-xl max-w-xs flex flex-col gap-3 p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
    role="button"
    tabindex="0"
    :aria-label="`Подробнее о товаре ${item.product.name}`"
    @click.prevent="handleActivate(item)"
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
    <div class="flex justify-between items-start">
      <h3 class="text-lg font-semibold text-gray-800 leading-tight pr-4">
        {{ item.product.name }}
      </h3>
      <span class="text-xl font-extrabold text-blue-600 whitespace-nowrap">
        {{ catalogService.formatPrice(item.product.price) }}
      </span>
    </div>

    <div class="flex flex-wrap gap-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
      <div v-if="item.product.weight && item.product.unitType" class="flex items-center gap-1">
        <Scale class="w-3 h-3 text-gray-400" />
        <span>{{ item.product.weight }} {{ item.product.unitType }}</span>
      </div>

      <div v-if="item.product.inStock" class="flex items-center gap-1 text-green-600">
        <CheckCircle2 class="w-3 h-3" />
        <span>В наличии</span>
      </div>
    </div>
  </div>
</template>
