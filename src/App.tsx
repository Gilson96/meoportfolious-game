import * as Phaser from 'phaser'
import { PhaserMatterCollisionPlugin } from 'phaser-matter-collision-plugin'
import { useEffect, useRef, useState } from 'react'
import MainScene from './components/MainScene/MainScene'

export function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState<{ name: string } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 512,
      height: 512,
      backgroundColor: '#333333',
      pixelArt: true,
      scene: [MainScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
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
    game.events.on('open-frame', (data: { name: string }) => setFrame(data))
    game.events.on('close-frame', () => setFrame(null))

    return () => {
      game.destroy(true)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-svh w-full overflow-hidden">
      {frame && (
        <div className="absolute z-10 text-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-xl">
          <h2 className="font-bold">{frame.name}</h2>
          <button onClick={() => setFrame(null)}>Close</button>
        </div>
      )}
    </div>
  )
}

export default App
