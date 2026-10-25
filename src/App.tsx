import * as Phaser from 'phaser'
import { PhaserMatterCollisionPlugin } from 'phaser-matter-collision-plugin'
import { useEffect, useRef, useState } from 'react'
import MainScene from './components/MainScene/MainScene'
import { usePostGameSession } from './components/Hooks/usePostQueries'

export function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const [frame, setFrame] = useState<{ name: string } | null>(null)
  const {isError, isPending, error, isSuccess, mutate} = usePostGameSession()

  useEffect(() => {
    if (!containerRef.current) return

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      backgroundColor: '#333333',
      pixelArt: true,
      scene: [MainScene],
      scale: {
        mode: Phaser.Scale.RESIZE
      },
      parent: containerRef.current,
      physics: {
        default: 'matter',
        matter: {
          debug: true,
          gravity: { x: 0, y: 0 }
        }
      },
      plugins: {
        scene: [
          {
            plugin: PhaserMatterCollisionPlugin,
            key: 'matterCollision',
            mapping: 'matterCollision'
          }
        ]
      },
    })
    
    mutate();
    
    gameRef.current = game
    game.events.on('open-frame', (data: { name: string }) => setFrame(data))
    game.events.on('close-frame', () => setFrame(null))

    return () => {
      game.destroy(true)
    }
  }, [])

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
