import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import * as mm from 'music-metadata'
import fg from 'fast-glob'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import store from 'electron-store'
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

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

ipcMain.handle('dialog:openDirectory', async () => {
  return dialog.showOpenDialog({
    properties: ['openDirectory']
  })
})

ipcMain.handle('library:scanDirectory', async (_event, dirPath) => {
  const patterns = ['**/*.mp3', '**/*.flac', '**/*.m4a', '**/*.aac', '**/*.ogg', '**/*.wav']
  const files = await fg(patterns, { cwd: dirPath, absolute: true, onlyFiles: true, unique: true })

  const songs = []
  for (const filepath of files) {
    try {
      const metadata = await mm.parseFile(filepath)
      const title = metadata.common.title || 'Desconocido'
      const artist = metadata.common.artist || 'Desconocido'
      const album = metadata.common.album || 'Desconocido'
      const duration = metadata.format.duration || 0
      const year = metadata.common.year || 'Desconocido'

      let pictureDataUrl = ''
      const pic = metadata.common.picture?.[0]
      if (pic?.data && pic?.format) {
        const base64 = Buffer.from(pic.data).toString('base64')
        pictureDataUrl = `data:${pic.format};base64,${base64}`
      }

      songs.push({ title, artist, album, duration, year, filepath, picture: pictureDataUrl })
    } catch (error) {
      console.error(`Error al leer el archivo ${filepath}:`, error)
    }
  }

  return songs
})

const storeinstance = new store()

ipcMain.handle('setMusicDirectory', async (_event, dirPath) => {
  storeinstance.set('musicDirectory', dirPath)
  return true
})

ipcMain.handle('getMusicDirectory', async () => {
  return storeinstance.get('musicDirectory', '')
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
