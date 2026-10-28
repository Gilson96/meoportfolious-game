import * as Phaser from 'phaser'
import { useEffect, useRef, useState, type RefObject } from "react"
import { usePostGameSession } from "./usePostQueries"
import MainScene from "../MainScene/MainScene"
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin"
import { useGetGameSession } from './useGetQueries'
import { useSessionId } from './store'

export const useSaveGameSession = () => {
  const { mutate } = usePostGameSession()
  const savedRef = useRef(false)

  useEffect(() => {
    if (savedRef.current) return
    savedRef.current = true
    mutate()
  }, [])
}

export const useGetInventory = () => {
  const gameSessionId = useSessionId.getState().sessionId ?? ''
  const {error, gameSession, isError, isFetching, isLoading} = useGetGameSession(gameSessionId)

  console.log(gameSession);
}


export const usePhaserGameConfig = (containerRef: RefObject<HTMLDivElement | null>, gameRef: RefObject<Phaser.Game | null>) => {
  const [frame, setFrame] = useState<{ name: string } | null>(null)

  useEffect(() => {
    if (gameRef.current || !containerRef.current) return

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

    gameRef.current = game
    game.events.on('open-frame', (data: { name: string }) => setFrame(data))
    game.events.on('close-frame', () => setFrame(null))

    return () => {
      game.events.off('open-frame')
      game.events.off('close-frame')
      game.destroy(true)
      gameRef.current = null
    }
  }, [])

  return frame
}