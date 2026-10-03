import * as Phaser from 'phaser'
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin'
import { useEffect, useRef } from 'react'
import MainScene from './components/MainScene/MainScene'

export function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 512,
      height: 512,
      backgroundColor: '#333333',
      scene: [MainScene],
      scale:{
        zoom: 2
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

    return () => {
      game.destroy(true)
    }
  }, [])

  return (
    <div ref={containerRef} className="flex min-h-svh p-6">
    </div>
  )
}

export default App
