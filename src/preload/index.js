import { contextBridge, ipcRenderer } from 'electron'

console.log('[preload] cargado')
// Custom APIs for renderer
const musicAPI = {
  openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
  scanDirectory: (dirPath) => ipcRenderer.invoke('library:scanDirectory', dirPath),
  setMusicDirectory: (dirPath) => ipcRenderer.invoke('library:setMusicDirectory', dirPath),
  getMusicDirectory: () => ipcRenderer.invoke('library:getMusicDirectory')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('musicAPI', musicAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  window.musicAPI = musicAPI
}
