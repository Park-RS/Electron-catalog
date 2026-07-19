import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join, extname } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { existsSync, readFileSync } from 'fs'
import { Catalog } from '../shared/catalogTypes'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js')
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

const IMAGE_MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp'
}

const getResourcesBasePath = (): string => (is.dev ? process.cwd() : app.getAppPath())

// Изначально все пути картинок лежали в unsplash, но почему то прямыми ссылками в свойтве в JSON не хотело подгружать, в итоге пришлось скачать все локально

const resolveImage = (filename: string): string => {
  const imagePath = join(getResourcesBasePath(), 'resources', 'images', filename)
  if (!existsSync(imagePath)) {
    return filename
  }

  const mimeType = IMAGE_MIME_TYPES[extname(filename)] ?? 'image/jpeg'
  const buffer = readFileSync(imagePath)
  return `data:${mimeType};base64,${buffer.toString('base64')}`
}

const loadCatalog = (): Catalog => {
  const catalogPath = join(getResourcesBasePath(), 'catalog', 'catalog.json')
  const fileContent = readFileSync(catalogPath, 'utf-8')
  const catalog: Catalog = JSON.parse(fileContent)

  // TODO: Переделать на вариант получше,
  catalog.groups.forEach((group) => {
    if (group.logo) {
      group.logo = resolveImage(group.logo)
    }
  })

  catalog.items.forEach((item) => {
    if (item.product.logo) {
      item.product.logo = resolveImage(item.product.logo)
    }
  })

  return catalog
}

ipcMain.handle('get-catalog', () => {
  try {
    return { ok: true, data: loadCatalog() }
  } catch (error) {
    return console.error('Ошибка чтения справочника каталога:', error)
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
