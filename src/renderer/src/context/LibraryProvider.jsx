/* eslint-disable react/prop-types */
import { SongsContext } from './songsContext'
import { useState, useRef } from 'react'
import { Howl, Howler } from 'howler'
function LibraryProvider({ children }) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSongPath, setSelectedSongPath] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const soundRef = useRef(null)

  async function OpenDirectory() {
    setLoading(true)
    try {
      const dirpath = await window.musicAPI.openDirectory()

      if (dirpath.canceled) {
        setSongs([])
        return
      }

      console.log('Directorio seleccionado:', dirpath.filePaths[0])

      const songs = await window.musicAPI.scanDirectory(dirpath.filePaths[0])
      setSongs(songs)
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
    } catch (error) {
      console.error('Error al abrir la carpeta:', error)
      setSongs([])
    } finally {
      setLoading(false)
    }
  }
  function selectSong(filepath) {
    setSelectedSongPath(filepath)
  }

  function playSong(filepath, volume = 1.0) {
    if (soundRef.current) {
      soundRef.current.stop()
      soundRef.current.unload()
      soundRef.current = null
    }
    soundRef.current = new Howl({
      src: [filepath],
      html5: true,
      volume: volume,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false)
    })

    soundRef.current.play()
    Howler.volume(volume)
  }
  return (
    <SongsContext.Provider
      value={{
        OpenDirectory,
        songs,
        loading,
        selectedSongPath,
        selectSong,
        isPlaying,
        setIsPlaying
      }}
    >
      {children}
    </SongsContext.Provider>
  )
}

export default LibraryProvider
