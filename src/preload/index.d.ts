import { CatalogResponse } from '../shared/catalogTypes'

declare global {
  interface Window {
    api: {
      getCatalog: () => Promise<CatalogResponse>
    }
  }
}
