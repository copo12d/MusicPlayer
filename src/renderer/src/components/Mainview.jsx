import { useContext } from 'react'
import { SongsContext } from '../context/songsContext'

function Mainview() {
  const { selectedSongPath, songs } = useContext(SongsContext)
  const selectedSong = songs.find((song) => song.filepath === selectedSongPath)
  const selectedTime = selectedSong ? Math.round(selectedSong.duration) : 0

  function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }
  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center text-center">
      <div className="relative flex items-center justify-center">
        <div className="blur-[60px] rounded-full opacity-50 absolute -inset-8 bg-primary/30" />
        {selectedSong?.picture ? (
          <img
            src={selectedSong?.picture || null}
            alt={selectedSong ? selectedSong.title : 'Titulo'}
            className="rounded-xl shadow-2xl h-40 w-40 md:h-52 md:w-52"
          />
        ) : (
          <div className="h-40 w-40 md:h-52 md:w-52 bg-surface-container-high rounded-xl border border-outline-variant"></div>
        )}
      </div>
      <h2 className="font-headline text-2xl md:text-3xl font-bold mt-8">
        {selectedSong ? selectedSong.title : 'Artista Desconocido'}
      </h2>
      <p className="text-primary mt-1">{selectedSong ? selectedSong.artist : 'Artista'}</p>
      <div className="flex gap-3 justify-center mt-3 items-center flex-wrap">
        <span className="bg-surface-container-highest text-sm rounded-full uppercase tracking-widest px-3 py-1">
          {selectedSong ? selectedSong.album : 'No disponible'}
        </span>
        <span className="bg-surface-container-highest text-sm rounded-full uppercase tracking-widest px-3 py-1">
          {selectedSong ? formatDuration(selectedTime) : '0:00'}
        </span>
      </div>
    </div>
  )
}
export default Mainview
