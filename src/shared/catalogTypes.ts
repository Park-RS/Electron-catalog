export interface CatalogGroup {
  id: number
  idParent: number | null
  name: string
  logo?: string
}

export interface CatalogProduct {
  id: number
  name: string
  price: number
  description?: string
  weight?: number
  unitType?: string
  brand?: string
  calories?: number
  proteins?: number
  fats?: number
  carbs?: number
  inStock?: boolean
  logo?: string
}

export interface CatalogItem {
  id: number
  idGroup: number | null
  product: CatalogProduct
}

export interface Catalog {
  groups: CatalogGroup[]
  items: CatalogItem[]
}

export type CatalogResponse = { ok: true; data: Catalog } | { ok: false; error: string }
