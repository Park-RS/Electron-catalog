<script setup lang="ts">
import CategoryTree from '@renderer/components/CategoryTree.vue'
import type { CategoryNode } from '@renderer/service/CatalogService'
defineProps<{
  tree: CategoryNode[] | null
}>()

const emit = defineEmits<{
  onSelect: [value: CategoryNode]
}>()
</script>
<template>
  <aside
    class="w-72 md:w-80 xl:w-96 bg-white border-r border-gray-200 flex flex-col h-full shrink-0"
  >
    <div class="p-4 border-b border-gray-200 shrink-0">
      <h1 class="text-xl font-bold text-gray-800">Меню</h1>
    </div>

    <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
      <CategoryTree v-if="tree" :nodes="tree" @select="emit('onSelect', $event)" />
    </div>
  </aside>
</template>
