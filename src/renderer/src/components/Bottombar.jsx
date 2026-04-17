import { Play, SkipBack, SkipForward, Shuffle, Repeat, Heart, Volume2, Pause } from 'lucide-react'
import { useState } from 'react'

function Bottombar() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(42)
  const [volume, setVolume] = useState(70)

  const controlClass =
    'rounded-full p-2 text-on-surface-variant transition-all duration-200 hover:text-white hover:bg-white/10 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.85)]'

  return (
    <div className="w-full border-t border-outline-variant bg-surface-container px-4 py-3 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-3 md:grid-cols-[1fr_2fr_1fr]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-md bg-surface-container-high border border-outline-variant" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-on-surface">bad guy</p>
            <p className="truncate text-xs text-on-surface-variant">Billie Eilish</p>
          </div>
          <button className={controlClass} aria-label="Agregar a favoritos">
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            <button className={controlClass} aria-label="Modo aleatorio">
              <Shuffle className="h-4 w-4" />
            </button>
            <button className={controlClass} aria-label="Anterior">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPlaying(!playing)}
              className="rounded-full p-2 text-on-surface transition-all duration-200 hover:text-white hover:bg-white/10 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]"
              aria-label={playing ? 'Pausar' : 'Reproducir'}
            >
              {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            <button className={controlClass} aria-label="Siguiente">
              <SkipForward className="h-5 w-5" />
            </button>
            <button className={controlClass} aria-label="Repetir">
              <Repeat className="h-4 w-4" />
            </button>
          </div>

          <div className="flex w-full items-center gap-2 px-2">
            <span className="w-10 text-right text-xs text-on-surface-variant">1:24</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(event) => setProgress(Number(event.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-high accent-white"
              aria-label="Progreso de reproduccion"
            />
            <span className="w-10 text-xs text-on-surface-variant">{progress}</span>
          </div>
        </div>

        <div className="flex items-center justify-start gap-2 md:justify-end">
          <Volume2 className="h-4 w-4 text-on-surface-variant" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="h-1 w-28 cursor-pointer appearance-none rounded-lg bg-surface-container-high accent-white"
            aria-label="Volumen"
          />
          <span className="w-9 text-xs text-on-surface-variant">{volume}%</span>
        </div>
      </div>
    </div>
  )
}

export default Bottombar
