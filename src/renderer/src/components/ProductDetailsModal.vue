<script setup lang="ts">
import { computed, ref } from 'vue'
import { Beef, CheckCircle2, Droplet, Flame, ImageOff, Scale, Tag, Wheat, X } from '@lucide/vue'
import { catalogService, type CatalogItem } from '@renderer/service/CatalogService'
import NutritionFact from '@renderer/components/ui/NutritionFact.vue'

const props = defineProps<{
  item: CatalogItem
}>()

const emit = defineEmits<{
  close: []
}>()

const isCurrentImageNotFound = ref(false)

const nutritionFacts = computed(() => {
  const { calories, proteins, fats, carbs } = props.item.product

  return [
    { label: 'ккал', value: calories, icon: Flame, iconClass: 'text-amber-500' },
    { label: 'белки', value: proteins, unit: 'г', icon: Beef, iconClass: 'text-rose-500' },
    { label: 'жиры', value: fats, unit: 'г', icon: Droplet, iconClass: 'text-yellow-500' },
    { label: 'углеводы', value: carbs, unit: 'г', icon: Wheat, iconClass: 'text-orange-500' }
  ].filter((fact) => fact.value != null)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop" appear>
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        :aria-label="item.product.name"
        @click.self="emit('close')"
      >
        <Transition name="panel" appear>
          <div
            class="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div class="relative w-full h-64 bg-gray-100 shrink-0">
              <img
                v-if="!isCurrentImageNotFound"
                :src="item.product.logo"
                :alt="item.product.name"
                class="w-full h-full object-cover"
                @error="isCurrentImageNotFound = true"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <ImageOff :size="72" color="gray" />
              </div>
              <button
                ref="closeButtonRef"
                type="button"
                class="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-900/60 text-white flex items-center justify-center shadow hover:bg-gray-900/80 transition-colors cursor-pointer"
                aria-label="Закрыть"
                @click="emit('close')"
              >
                <X :size="18" />
              </button>
            </div>

            <div class="p-7 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
              <div class="flex justify-between items-start gap-4">
                <h2 class="text-2xl font-bold text-gray-800">{{ item.product.name }}</h2>
                <span class="text-2xl font-extrabold text-blue-600 whitespace-nowrap">
                  {{ catalogService.formatPrice(item.product.price) }}
                </span>
              </div>

              <div class="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
                <span v-if="item.product.brand" class="flex items-center gap-1">
                  <Tag class="w-3.5 h-3.5" /> {{ item.product.brand }}
                </span>
                <span
                  v-if="item.product.weight && item.product.unitType"
                  class="flex items-center gap-1"
                >
                  <Scale class="w-3.5 h-3.5" /> {{ item.product.weight }}
                  {{ item.product.unitType }}
                </span>
                <span v-if="item.product.inStock" class="flex items-center gap-1 text-green-600">
                  <CheckCircle2 class="w-3.5 h-3.5" /> В наличии
                </span>
              </div>

              <p v-if="item.product.description" class="text-sm text-gray-600 leading-snug">
                {{ item.product.description }}
              </p>

              <div v-if="nutritionFacts.length > 0" class="border-t border-gray-100 pt-5 mt-1">
                <h3 class="text-sm font-semibold text-gray-700 mb-4">КБЖУ</h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <NutritionFact
                    v-for="fact in nutritionFacts"
                    :key="fact.label"
                    :icon="fact.icon"
                    :icon-class="fact.iconClass"
                    :value="fact.value!"
                    :unit="fact.unit"
                    :label="fact.label"
                  />
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.2s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.panel-enter-active {
  transition:
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.25s ease;
}
.panel-leave-active {
  transition:
    transform 0.15s ease-in,
    opacity 0.15s ease-in;
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(12px);
}
</style>
