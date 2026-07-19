import type { CatalogGroup, CatalogItem } from '../../../shared/catalogTypes'

export type {
  Catalog,
  CatalogGroup,
  CatalogItem,
  CatalogProduct
} from '../../../shared/catalogTypes'

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

    const response = await window.api.getCatalog()

    if (!response.ok) {
      throw new Error(response.error)
    }

    this.allProducts = response.data.items
    this.tree = this.buildTree(response.data.groups, response.data.items)
    this.isLoaded = true
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

  public formatPrice(cent: number): string {
    return `${(cent / 100).toFixed(2)} ₽`
  }
}

export const catalogService = new CatalogService()
