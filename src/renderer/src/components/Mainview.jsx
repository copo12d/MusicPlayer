function Mainview() {
  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center text-center">
      <div className="relative flex items-center justify-center">
        <div className="blur-[60px] rounded-full opacity-50 absolute -inset-8 bg-primary/30" />
        {/* <img src="" alt="" className="rounded-xl shadow-2xl" /> */}
        <div className="h-40 w-40 md:h-52 md:w-52 bg-surface-container-high rounded-xl border border-outline-variant"></div>
      </div>
      <h2 className="font-headline text-2xl md:text-3xl font-bold mt-8">Titulo</h2>
      <p className="text-primary mt-1">Artista</p>
      <div className="flex gap-3 justify-center mt-3 items-center flex-wrap">
        <span className="bg-surface-container-highest text-sm rounded-full uppercase tracking-widest px-3 py-1">
          album
        </span>
        <span className="bg-surface-container-highest text-sm rounded-full uppercase tracking-widest px-3 py-1">
          03:21
        </span>
      </div>
    </div>
  )
}
export default Mainview
