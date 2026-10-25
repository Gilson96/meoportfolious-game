const LABEL = 'Loading...'

// progress: 0 to 1
export function Loading({ progress }: { progress: number }) {
  const percent = Math.round(Math.min(Math.max(progress, 0), 1) * 100)

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label="Loading the game"
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-[#18171c] px-4"
    >
      <div className="relative overflow-hidden rounded-full bg-[#3f3e45] px-8 py-2 text-4xl font-bold text-white sm:px-14 sm:py-3 sm:text-6xl">
        <span>{LABEL}</span>
        {/* White fill grows with real progress, flipping the text to dark where it covers it */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-white text-[#3f3e45] transition-[clip-path] duration-300 ease-out"
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        >
          {LABEL}
        </div>
      </div>
      <p className="mr-[-0.4em] text-xl font-bold tracking-[0.4em] text-white sm:text-2xl">
        The Game
      </p>
    </div>
  )
}

export default Loading
