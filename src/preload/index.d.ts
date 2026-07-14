import { ElectronAPI } from '@electron-toolkit/preload'
import { Catalog } from '../main/models/CatalogTypes'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getCatalog: () => Catalog
    }
  }
}
