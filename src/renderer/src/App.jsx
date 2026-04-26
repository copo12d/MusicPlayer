import Sidebar from './components/Sidebar'
import Bottombar from './components/Bottombar'
import Mainview from './components/Mainview'
import SettingsButton from './components/settings'

function App() {
  return (
    <div className="h-screen overflow-hidden bg-background text-on-background flex flex-col">
      <SettingsButton />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-h-0 overflow-auto flex items-center justify-center p-6">
          <Mainview />
        </main>
      </div>
      <footer>
        <Bottombar />
      </footer>
    </div>
  )
}

export default App
