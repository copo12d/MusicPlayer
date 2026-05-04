import { useState, useContext } from 'react'
import { SongsContext } from '../context/songsContext'

function Sidebar() {
  const { songs, loading, selectSong, OpenDirectory } = useContext(SongsContext)

  const visibleSongs = songs.map((song) => ({
    id: song.filepath,
    name: song.title,
    creditName: song.artist,
    imageUrl: song.picture || ''
  }))

  const [selected, setSelected] = useState(visibleSongs[0]?.id)

  const activeSelected = visibleSongs.some((song) => song.id === selected)
    ? selected
    : visibleSongs[0]?.id

  return (
    <div className="h-full w-72 shrink-0 flex flex-col bg-surface-container-low text-white p-4 border-r border-outline-variant">
      <h2 className="text-2xl font-bold mb-4 select-none">PlayList</h2>
      <p className="text-sm mr-4 text-on-surface-variant select-none">My Playlists</p>
      <ul className="mt-4 space-y-2 overflow-y-auto pr-1 no-scrollbar select-none">
        {loading && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className="flex items-center gap-3 px-2 py-2 rounded-md animate-pulse"
                aria-busy="true"
              >
                <div className="h-11 w-11 rounded-md bg-surface-container border border-outline-variant/50" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-surface-container" />
                  <div className="h-2 w-1/2 rounded bg-surface-container" />
                </div>
              </li>
            ))}
          </>
        )}
        {!loading && visibleSongs.length === 0 && (
          <li className="rounded-md border border-outline-variant/70 bg-surface-container-lowest p-4 text-center">
            <p className="text-sm text-on-surface-variant">Carpeta no seleccionada</p>
            <button
              onClick={OpenDirectory}
              className="mt-3 inline-flex items-center justify-center rounded-md bg-surface-container-high px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors"
            >
              Seleccionar carpeta
            </button>
          </li>
        )}

        {!loading && visibleSongs.length > 0 && (
          <>
            {visibleSongs.map((song) => (
              <li
                key={song.id}
                onClick={() => {
                  setSelected(song.id)
                  selectSong(song.id)
                }}
                className={
                  'flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors ' +
                  (activeSelected === song.id
                    ? 'bg-surface-container-high text-white'
                    : 'text-gray-300 hover:bg-surface-container hover:text-white')
                }
              >
                {song.imageUrl ? (
                  <img
                    src={song.imageUrl}
                    alt={`Cover de ${song.name}`}
                    className="h-11 w-11 rounded-md object-cover border border-outline-variant/50"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-11 w-11 rounded-md border border-outline-variant/50 bg-surface-container flex items-center justify-center text-[10px] font-semibold text-on-surface-variant">
                    MP3
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate">{song.name}</p>
                  <p className="text-xs text-on-surface-variant truncate">{song.creditName}</p>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
