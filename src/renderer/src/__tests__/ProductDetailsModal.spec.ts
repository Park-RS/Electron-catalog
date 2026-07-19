import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import ProductDetailsModal from '@renderer/components/ProductDetailsModal.vue'
import type { CatalogItem } from '@renderer/service/CatalogService'

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
    proteins: 0.5,
    fats: 0.2,
    carbs: 0,
    inStock: true,
    logo: 'espresso.jpg'
  }
}

describe('ProductDetailsModal', () => {
  it('отображает полную информацию о товаре, включая КБЖУ', () => {
    render(ProductDetailsModal, { props: { item: mockItem } })

    expect(screen.getByText('Эспрессо Классик')).toBeInTheDocument()
    expect(screen.getByText('120.00 ₽')).toBeInTheDocument()
    expect(screen.getByText('Крепкий черный кофе')).toBeInTheDocument()
    expect(screen.getByText('КБЖУ')).toBeInTheDocument()
    expect(screen.getByText('белки')).toBeInTheDocument()
    expect(screen.getByText('жиры')).toBeInTheDocument()
    expect(screen.getByText('углеводы')).toBeInTheDocument()
  })
})
