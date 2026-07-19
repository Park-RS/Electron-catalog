import { contextBridge, ipcRenderer } from 'electron'

const api = {
  getCatalog: () => ipcRenderer.invoke('get-catalog')
}

contextBridge.exposeInMainWorld('api', api)
