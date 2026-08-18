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
  const blobUrlRef = useRef(null)
  const currentSongPathRef = useRef(null)

  async function readAudioFile(filePath) {
    try {
      const bytes = await window.musicAPI.readAudioFile(filePath)
      const arrayBuffer = bytes instanceof ArrayBuffer ? bytes : bytes.buffer
      const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' })
      const url = URL.createObjectURL(blob)

      return url
    } catch (error) {
      console.error(`Error al leer el archivo ${filePath}:`, error)
      throw error
    }
  }

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

  function playSongFromUrl(url, volume = 1.0) {
    if (soundRef.current) {
      soundRef.current.stop()
      soundRef.current.unload()
      soundRef.current = null
    }

    soundRef.current = new Howl({
      src: [url],
      html5: true,
      volume,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => setIsPlaying(false),
      onloaderror: (_id, err) => console.error('Howler load error:', err),
      onplayerror: (_id, err) => console.error('Howler play error:', err)
    })
    console.log('URL a reproducir:', url, typeof url)

    soundRef.current.play()
    Howler.volume(volume)
  }

  async function playSong(filepath, volume = 1.0) {
    currentSongPathRef.current = filepath
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = null
    }

    const url = await readAudioFile(filepath)
    blobUrlRef.current = url

    playSongFromUrl(url, volume)
  }

  function pauseSong() {
    if (!soundRef.current) return
    soundRef.current.pause()
    // setIsPlaying(false) lo disparará onpause, pero si quieres puedes forzarlo aquí también
  }

  function resumeSong() {
    if (!soundRef.current) return
    soundRef.current.play()
    // setIsPlaying(true) lo disparará onplay
  }

  function stopSong() {
    if (!soundRef.current) return
    soundRef.current.stop()
    soundRef.current.unload()
    soundRef.current = null
    setIsPlaying(false)
  }

  function togglePlayPause() {
    if (!soundRef.current) return
    if (soundRef.current.playing()) {
      soundRef.current.pause()
    } else {
      soundRef.current.play()
    }
  }
  async function togglePlayPauseOrPlaySelected(volume = 1.0) {
    if (!selectedSongPath) return
    const current = currentSongPathRef.current

    if (soundRef.current) {
      if (soundRef.current.playing()) soundRef.current.pause()
      else soundRef.current.play()
      return
    }

    // Si no hay Howl, pero hay canción seleccionada, la reproduce
    if (selectedSongPath) {
      await playSong(selectedSongPath, volume)
    }
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
        setIsPlaying,
        playSong,
        pauseSong,
        resumeSong,
        stopSong,
        togglePlayPause,
        togglePlayPauseOrPlaySelected
      }}
    >
      {children}
    </SongsContext.Provider>
  )
}

export default LibraryProvider
