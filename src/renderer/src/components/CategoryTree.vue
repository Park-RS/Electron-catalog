<script setup lang="ts">
import { ref } from 'vue'
import type { CategoryNode } from '../services/CatalogService'
import { ChevronRight } from '@lucide/vue';

const props = defineProps<{
  nodes: CategoryNode[]
  level?: number
}>()

const emit = defineEmits<{
  select: [node: CategoryNode]
}>()

const expandedIds = ref<Set<number>>(new Set())

const toggle = (id: number) => {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
  }
}

const handleSelect = (node: CategoryNode) => {
  emit('select', node)
}
</script>

<template>
  <ul class="space-y-1" :class="{ 'ml-4 border-l border-gray-200 pl-2': level && level > 0 }">
    <li v-for="node in nodes" :key="node.id">
      <div
        class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
        @click="handleSelect(node)"
      >
        <div class="flex items-center gap-2">
          <button
            v-if="node.children.length > 0"
            class="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-700"
            @click.stop="toggle(node.id)"
          >

          <component :is="ChevronRight" :class="expandedIds.has(node.id) ? 'rotate-90 duration-200 ease-linear' :'duration-200 ease-linear' " />
          </button>
          <span v-else class="w-5"></span>

          <span class="text-sm font-medium text-gray-700">{{ node.name }}</span>
        </div>

        <span
          v-if="node.products.length > 0"
          class="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
        >
          {{ node.products.length }}
        </span>
      </div>

      <div v-if="expandedIds.has(node.id) && node.children.length > 0">
        <CategoryTree :nodes="node.children" :level="(level || 0) + 1" @select="handleSelect" />
      </div>
    </li>
  </ul>
</template>
