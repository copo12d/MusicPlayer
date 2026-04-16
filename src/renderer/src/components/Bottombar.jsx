function Bottombar() {
  return (
    <div className="h-16 w-full border-t border-outline-variant bg-surface-container px-4 md:px-6 flex items-center justify-between">
      <p className="font-headline text-sm uppercase tracking-wider text-on-surface-variant">
        Now Playing
      </p>
      <p className="text-sm text-on-surface">Sin cancion seleccionada</p>
    </div>
  )
}

export default Bottombar
