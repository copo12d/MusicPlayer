import { Settings } from 'lucide-react'
import { useContext } from 'react'
import { SongsContext } from '../context/songsContext'

function SettingsButton() {
  const { OpenDirectory } = useContext(SongsContext)
  return (
    <button
      type="button"
      className="fixed top-4 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant bg-surface-container-high text-on-surface shadow-sm transition-colors hover:bg-surface-container-highest"
      aria-label="Configuracion"
      onClick={OpenDirectory}
    >
      <Settings className="h-5 w-5" />
    </button>
  )
}

export default SettingsButton
