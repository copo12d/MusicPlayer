import { useState, useContext } from 'react'
import { SongsContext } from '../context/songsContext'

function Sidebar() {
  const { songs, loading } = useContext(SongsContext)
  const songs_mock = [
    {
      uuid: '7d534228-5165-11e9-9375-549f35161576',
      name: 'bad guy',
      creditName: 'Billie Eilish',
      imageUrl: 'https://assets.soundcharts.com/song/5/6/1/7d534228-5165-11e9-9375-549f35161576.jpg'
    },
    {
      uuid: '11e82745-80a4-7a6e-a9be-a0369fe50396',
      name: 'Bellyache',
      creditName: 'Billie Eilish',
      imageUrl: 'https://assets.soundcharts.com/song/4/a/0/11e82745-80a4-7a6e-a9be-a0369fe50396.jpg'
    },
    {
      uuid: 'd5ec3afb-4002-472a-8f8f-89d836465f38',
      name: 'BIRDS OF A FEATHER',
      creditName: 'Billie Eilish',
      imageUrl: 'https://assets.soundcharts.com/song/2/0/0/d5ec3afb-4002-472a-8f8f-89d836465f38.jpg'
    },
    {
      uuid: '06678aaf-7569-4657-93cf-5b14cae6575d',
      name: 'CHIHIRO',
      creditName: 'Billie Eilish',
      imageUrl: 'https://assets.soundcharts.com/song/9/6/5/06678aaf-7569-4657-93cf-5b14cae6575d.jpg'
    },
    {
      uuid: '7ff4ae0a-058c-11ea-bdbb-549f35141000',
      name: 'everything i wanted',
      creditName: 'Billie Eilish',
      imageUrl: 'https://assets.soundcharts.com/song/c/8/5/7ff4ae0a-058c-11ea-bdbb-549f35141000.jpg'
    }
  ]

  const hasRealSongs = songs.length > 0
  const visibleSongs = hasRealSongs
    ? songs.map((song) => ({
        id: song.filepath,
        name: song.title,
        creditName: song.artist,
        imageUrl: song.picture || ''
      }))
    : songs_mock

  const [selected, setSelected] = useState(visibleSongs[0]?.id)
  const activeSelected = visibleSongs.some((song) => song.id === selected)
    ? selected
    : visibleSongs[0]?.id

  return (
    <div className="h-full w-72 shrink-0 flex flex-col bg-surface-container-low text-white p-4 border-r border-outline-variant">
      <h2 className="text-2xl font-bold mb-4">PlayList</h2>
      <p className="text-sm mr-4 text-on-surface-variant">My Playlists</p>
      <ul className="mt-4 space-y-2 overflow-y-auto pr-1 no-scrollbar">
        {loading
          ? songs_mock.map((song) => (
              <li
                key={song.uuid}
                className="flex items-center gap-3 px-2 py-2 rounded-md animate-pulse"
                aria-busy="true"
              >
                <div className="h-11 w-11 rounded-md bg-surface-container border border-outline-variant/50" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-surface-container" />
                  <div className="h-2 w-1/2 rounded bg-surface-container" />
                </div>
              </li>
            ))
          : visibleSongs.map((song) => (
              <li
                key={song.id}
                onClick={() => setSelected(song.id)}
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
      </ul>
    </div>
  )
}

export default Sidebar
