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

export class CategoryNode {
  public id: number
  public name: string
  public logo?: string
  public children: CategoryNode[]
  public products: CatalogItem[]

  constructor(group: CatalogGroup) {
    this.id = group.id
    this.name = group.name
    this.logo = group.logo
    this.children = []
    this.products = []
  }

  public addChild(child: CategoryNode): void {
    this.children.push(child)
  }

  public addProduct(item: CatalogItem): void {
    this.products.push(item)
  }

  public getAllProductsForCurrentNode(): CatalogItem[] {
    let allProducts: CatalogItem[] = [...this.products]

    this.children.forEach((child) => {
      allProducts = allProducts.concat(child.getAllProductsForCurrentNode())
    })

    return allProducts
  }
}

export class CatalogService {
  private tree: CategoryNode[] = []
  private allProducts: CatalogItem[] = []
  private isLoaded = false

  public async loadData(): Promise<void> {
    if (this.isLoaded) {
      return
    }

    try {
      const data: Catalog = await window.api.getCatalog()
      this.allProducts = data.items
      this.tree = this.buildTree(data.groups, data.items)
      this.isLoaded = true
    } catch (error) {
      console.error('Ошибка загрузки каталога:', error)
    }
  }

  public getTree(): CategoryNode[] {
    return this.tree
  }

  public getAllProducts(): CatalogItem[] {
    return this.allProducts
  }

  private buildTree(groups: CatalogGroup[], items: CatalogItem[]): CategoryNode[] {
    const nodeMap = new Map<number, CategoryNode>()

    groups.forEach((group) => {
      const node = new CategoryNode(group)

      const groupItems = items.filter((item) => item.idGroup === group.id)
      groupItems.forEach((item) => node.addProduct(item))

      nodeMap.set(group.id, node)
    })

    const rootNodes: CategoryNode[] = []

    nodeMap.forEach((node) => {
      const originalGroup = groups.find((groupItem) => groupItem.id === node.id)

      if (!originalGroup?.idParent) {
        rootNodes.push(node)
      } else {
        const parentNode = nodeMap.get(originalGroup.idParent)
        if (parentNode) {
          parentNode.addChild(node)
        }
      }
    })

    return rootNodes
  }

  public searchProducts(query: string): CatalogItem[] {
    const lowerQuery = query.toLowerCase()
    return this.allProducts.filter((item) => item.product.name.toLowerCase().includes(lowerQuery))
  }

  public formatPrice(cent: number): string { // флешбеки по C# 
    return `${(cent / 100).toFixed(2)} ₽`
  }
}

export const catalogService = new CatalogService()
