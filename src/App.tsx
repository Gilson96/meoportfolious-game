import * as Phaser from 'phaser'
import { PhaserMatterCollisionPlugin } from 'phaser-matter-collision-plugin'
import { useEffect, useRef, useState } from 'react'
import MainScene from './components/MainScene/MainScene'
import { usePostGameSession } from './components/Hooks/usePostQueries'
import { useGetItem } from './components/Hooks/useGetQueries'
import Loading from './components/Loading/Loading'

export function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const [frame, setFrame] = useState<{ name: string } | null>(null)
  const [sceneProgress, setSceneProgress] = useState(0)
  const [sceneReady, setSceneReady] = useState(false)
  const { isError: postGameSessionIsError, isPending: postGameSessionIsPending, error: postGameSessionError, mutate: postGameSession } = usePostGameSession()
  const { item, isFetching: itemIsFetching, isLoading: itemIsLoading, isError: itemIsError, } = useGetItem(1);

  useEffect(() => {
    if (!containerRef.current || !item) return

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

    postGameSession()

    gameRef.current = game
    game.events.on('open-frame', (data: { name: string }) => setFrame(data))
    game.events.on('close-frame', () => setFrame(null))
    game.events.on('load-progress', (value: number) => setSceneProgress(value))
    game.events.once('scene-ready', () => setSceneReady(true))

    return () => {
      game.events.off('open-frame')
      game.events.off('close-frame')
      game.events.off('load-progress')
      game.events.off('scene-ready')
      game.destroy(true)
      gameRef.current = null
      setSceneProgress(0)
      setSceneReady(false)
    }
  }, [item, postGameSession])

  const isLoading = itemIsLoading || itemIsFetching || postGameSessionIsPending || !sceneReady
  const isError = itemIsError || postGameSessionIsError
  // Fetching the item is the first 20%, Phaser loading the assets is the rest
  const loadingProgress = item ? 0.2 + sceneProgress * 0.8 : 0

  return (
    <div ref={containerRef} className="relative h-svh w-full overflow-hidden">
      {isLoading && !isError && <Loading progress={loadingProgress} />}
      {isError && (
        <div role="alert" className="absolute inset-0 z-30 flex items-center justify-center bg-[#18171c] px-4 text-center text-xl font-bold text-white">
          {postGameSessionError?.message ?? 'Something went wrong loading the game.'}
        </div>
      )}
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
