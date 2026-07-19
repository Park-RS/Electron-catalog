// src/renderer/src/__tests__/ProductCard.spec.ts
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import ProductCard from '@renderer/components/ProductCard.vue'
import type { CatalogItem } from '@renderer/service/CatalogService'

describe('ProductCard', () => {
  const mockItem: CatalogItem = {
    id: 101,
    idGroup: 3,
    product: {
      id: 1,
      name: 'Эспрессо Классик',
      price: 12000,
      description: 'Крепкий черный кофе',
      weight: 30,
      unitType: 'мл',
      brand: 'Arabica Premium',
      calories: 5,
      inStock: true,
      logo: 'espresso.jpg'
    }
  }

  it('должен корректно отображать название и цену товара', () => {
    render(ProductCard, {
      props: {
        item: mockItem
      }
    })

    expect(screen.getByText('Эспрессо Классик')).toBeInTheDocument()
    expect(screen.getByText('120.00 ₽')).toBeInTheDocument()
  })

  it('должен отображать бейдж "В наличии", если inStock: true', () => {
    render(ProductCard, {
      props: {
        item: mockItem
      }
    })

    expect(screen.getByText('В наличии')).toBeInTheDocument()
  })
})
