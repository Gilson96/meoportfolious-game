import * as Phaser from 'phaser'
import { useEffect, useRef, useState, type RefObject } from "react"
import { useDeleteShopSession, usePostGameSession, usePostShopSession } from "./usePostQueries"
import MainScene from "../MainScene/MainScene"
import { PhaserMatterCollisionPlugin } from "phaser-matter-collision-plugin"
import { useGetGameSession, useGetShop } from './useGetQueries'
import { useSessionId } from './store'
import type { ShopFrameTypes } from '../dataTypes'

export const useSaveGameSession = () => {
  const { mutate } = usePostGameSession()
  const savedRef = useRef(false)

  useEffect(() => {
    if (savedRef.current || useSessionId.getState().gameSessionId) return
    savedRef.current = true
    mutate()
  }, [])
}

export const useShopSession = (frame: ShopFrameTypes | null) => {
  const { mutate: openShopSession } = usePostShopSession()
  const { mutate: closeShopSession } = useDeleteShopSession()
  const shopId = frame?.shopId

  useEffect(() => {
    if (shopId === undefined) return
    openShopSession(shopId)

    return () => {
      if (useSessionId.getState().shopSessionId) closeShopSession()
    }
  }, [shopId])
}

export const usePhaserGameConfig = (containerRef: RefObject<HTMLDivElement | null>, gameRef: RefObject<Phaser.Game | null>) => {
  const {error, gameSession, isError, isFetching, isLoading} = useGetGameSession()
  const { shops } = useGetShop()
  const [frame, setFrame] = useState<ShopFrameTypes | null>(null)
  const hasSession = !!gameSession

  useEffect(() => {
    if (gameRef.current || !containerRef.current || !gameSession || !shops) return
  
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
      callbacks: {
        preBoot: (game) => {
          game.registry.set('equippedItem', gameSession.inventory[0])
          game.registry.set('shops', shops)
        }
      }
    })

    gameRef.current = game
    game.events.on('open-frame', (data: ShopFrameTypes) => setFrame(data))
    game.events.on('close-frame', () => setFrame(null))

    return () => {
      game.events.off('open-frame')
      game.events.off('close-frame')
      game.destroy(true)
      gameRef.current = null
    }
  }, [hasSession])

  return frame
}