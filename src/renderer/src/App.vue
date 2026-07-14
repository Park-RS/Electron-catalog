<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { catalogService, type CatalogItem, type CategoryNode } from './service/CatalogService'
import SideMenu from '@renderer/components/ui/SideMenu.vue'
import SearchProducts from '@renderer/components/ui/SearchProducts.vue'
import SearchContent from '@renderer/components/ui/SearchContent.vue'

const tree = ref<CategoryNode[]>([])
const selectedNode = ref<CategoryNode | null>(null)
const searchQuery = ref('')

onMounted(async () => {
  await catalogService.loadData()
  tree.value = catalogService.getTree()

  if (tree.value.length > 0) {
    selectedNode.value = tree.value[0]
  }
})

const displayedItems = computed<CatalogItem[]>(() => {
  if (searchQuery.value.trim().length > 0) {
    return catalogService.searchProducts(searchQuery.value)
  }
  return selectedNode.value?.getAllProductsForCurrentNode() || []
})

const handleCategorySelect = (node: CategoryNode) => {
  // был бы это запрос на бэк было бы плохо) дебаунс в 300 мс тут хорошо зайдет
  selectedNode.value = node
  searchQuery.value = ''
}
</script>

<template>
  <div class="flex w-full h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
    <!-- По хорошему тут нужна обёртка в router либо в Layout для приличия, но недостаточно страниц для того чтобы был смысл от этого всего -->
    <SideMenu :tree="tree" @on-select="handleCategorySelect" />
    <main class="flex-1 flex flex-col min-w-0 h-full 2xl:min-w-2xl w-full">
      <SearchProducts v-model="searchQuery" />
      <SearchContent
        class="min-w-full"
        :displayed-items="displayedItems"
        :selected-node="selectedNode"
        :search-query="searchQuery"
      />
    </main>
  </div>
</template>

<style>
[v-auto-animate] {
  transition: all 0.25s ease-out;
}
</style>
