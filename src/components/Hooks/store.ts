import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameSessionTypes, ItemActionsTypes, ItemTypes } from '../dataTypes'

const SESSION_LIFETIME_MS = 120 * 60 * 1000

export const newGameSession = (): GameSessionTypes => ({
    equipped_item_slug: 'player_atlas.json',
    credits: 0,
    expires_at: new Date(Date.now() + SESSION_LIFETIME_MS).toISOString(),
})

export const useGameSession = create<GameSessionTypes>()(
    persist(
        () => newGameSession(),
        { name: 'game-session' }
    )
)

export const useItem = create<ItemTypes & ItemActionsTypes>()((set) => ({
    shop_id: null,
    external_variant_id: null,
    sprite_key: '',
    textureURL: '',
    atlasURL: '',
    active: true,
    updateShop_id: (shop_id) => set({ shop_id }),
    updateExternal_variant_id: (external_variant_id) => set({ external_variant_id }),
    updateSprite_key: (sprite_key) => set({ sprite_key }),
    updateTextureURL: (textureURL) => set({ textureURL }),
    updateAtlasURL: (atlasURL) => set({ atlasURL }),
    updateActive: (active) => set({ active }),
}))
