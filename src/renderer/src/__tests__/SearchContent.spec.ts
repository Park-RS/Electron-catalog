import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import SearchContent from '@renderer/components/ui/SearchContent.vue'

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
        selectedNode: {
          id: 1,
          name: 'Горячие напитки',
          children: [],
          products: []
        } as any
      }
    })

    expect(screen.getByText('Горячие напитки')).toBeInTheDocument()
    expect(screen.getByText('В этой категории пока нет товаров')).toBeInTheDocument()
  })
})
