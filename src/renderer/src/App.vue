<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { catalogService, type CatalogItem, type CategoryNode } from './service/CatalogService'
import SideMenu from '@renderer/components/ui/SideMenu.vue'
import SearchProducts from '@renderer/components/ui/SearchProducts.vue'
import SearchContent from '@renderer/components/ui/SearchContent.vue'
import LoadingState from '@renderer/components/ui/LoadingState.vue'
import ErrorState from '@renderer/components/ui/ErrorState.vue'

type ViewState = 'loading' | 'error' | 'ready'

const viewState = ref<ViewState>('loading')
const loadErrorMessage = ref('')
const tree = ref<CategoryNode[]>([])
const selectedNode = ref<CategoryNode | null>(null)
const searchQuery = ref('')

const initCatalog = async (): Promise<void> => {
  viewState.value = 'loading'

  try {
    await catalogService.loadData()
    tree.value = catalogService.getTree()

    if (tree.value.length > 0 && !selectedNode.value) {
      selectedNode.value = tree.value[0]
    }
    viewState.value = 'ready'
  } catch (error) {
    loadErrorMessage.value = error
      ? 'Что-то пошло не так'
      : 'Не удалось загрузить справочник каталога'
    viewState.value = 'error'
  }
}

onMounted(initCatalog)

const displayedItems = computed<CatalogItem[]>(() => {
  if (searchQuery.value.trim().length > 0) {
    return catalogService.searchProducts(searchQuery.value)
  }
  return selectedNode.value?.getAllProductsForCurrentNode() || []
})

const handleCategorySelect = (node: CategoryNode): void => {
  selectedNode.value = node
  searchQuery.value = ''
}
</script>

<template>
  <div class="flex w-full h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
    <LoadingState v-if="viewState === 'loading'" />

    <ErrorState
      v-else-if="viewState === 'error'"
      :message="loadErrorMessage"
      @retry="initCatalog"
    />

    <template v-else>
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
    </template>
  </div>
</template>

<style>
[v-auto-animate] {
  transition: all 0.25s ease-out;
}
</style>
