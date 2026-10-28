import type * as Phaser from 'phaser'
import { useRef } from 'react'
import { useGetInventory, usePhaserGameConfig, useSaveGameSession } from './components/Hooks/useGameInitializationConfig'


export function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useSaveGameSession();
  const frame = usePhaserGameConfig(containerRef, gameRef);
  useGetInventory()
  
  return (
    <div ref={containerRef} className="relative h-svh w-full overflow-hidden">
      {frame && (
        <div className="absolute inset-0 z-10 bg-white">
          <iframe
            title={frame.name}
            className="h-full w-full border-0"
            src="https://mernfoods.netlify.app/"
          />
          <button
            onClick={() => gameRef.current?.events.emit('close-frame')}
            className="absolute right-4 top-4 rounded-md bg-black/80 px-4 py-2 font-bold text-white shadow-lg hover:bg-black"
          >
            Leave
          </button>
        </div>
      )}
    </div>
  )
}

export default App
