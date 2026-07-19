import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import SearchContent from '@renderer/components/ui/SearchContent.vue'
import { CategoryNode } from '@renderer/service/CatalogService'

describe('SearchContent', () => {
  it('должен показывать заглушку, когда массив товаров пустой', () => {
    render(SearchContent, {
      props: {
        displayedItems: [],
        searchQuery: 'несуществующий товар'
      }
    })

    expect(screen.getByText('Ничего не найдено :(')).toBeInTheDocument()
    expect(screen.getByText('Попробуйте изменить поисковый запрос')).toBeInTheDocument()
  })

  it('Должна быть заглушка, если поиск ничего не нашел', () => {
    render(SearchContent, {
      props: {
        displayedItems: [],
        searchQuery: '',
        selectedNode: new CategoryNode({ id: 1, idParent: null, name: 'Горячие напитки' })
      }
    })

    expect(screen.getByText('Горячие напитки')).toBeInTheDocument()
    expect(screen.getByText('В этой категории пока нет товаров')).toBeInTheDocument()
  })
})
