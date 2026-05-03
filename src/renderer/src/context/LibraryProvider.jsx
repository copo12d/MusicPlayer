import { SongsContext } from './songsContext'
import { useState } from 'react'
function LibraryProvider({ children }) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)

  async function OpenDirectory() {
    setLoading(true)
    const dirpath = await window.musicAPI.openDirectory()

    if (dirpath.canceled) return

    console.log('Directorio seleccionado:', dirpath.filePaths[0])

    const songs = await window.musicAPI.scanDirectory(dirpath.filePaths[0])
    setSongs(songs)
    setLoading(false)
    console.table(
      songs.map(({ title, artist, album, duration, year, path }) => ({
        title,
        artist,
        album,
        duration: Math.round(duration),
        year,
        path
      }))
    )
  }
  return (
    <SongsContext.Provider value={{ OpenDirectory, songs, loading }}>
      {children}
    </SongsContext.Provider>
  )
}

export default LibraryProvider
