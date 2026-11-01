import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { GameActionsTypes, GameSessionTypes, SessionIdActionsTypes, SessionIdTypes } from '../dataTypes'

export const useSessionId = create<SessionIdTypes & SessionIdActionsTypes>()(
    persist(
        (set) => ({
            gameSessionId: null,
            shopSessionId: null,
            updateGameSessionId: (gameSessionId) => set({ gameSessionId }),
            updateShopSessionId: (shopSessionId) => set({ shopSessionId }),
        }),
        {
            name: 'session-id',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ gameSessionId: state.gameSessionId }),
        }
    )
)

export const useGameSession = create<GameSessionTypes & GameActionsTypes>()(
    persist(
        (set) => ({
            equipped_item_slug: '',
            amountSpend: 0,
            updateCredits:(amountSpend) => set({amountSpend}),
            updateEquipped_item_slug:(equipped_item_slug) => set({equipped_item_slug}),
        }),
        { name: 'game-session', storage: createJSONStorage(() => sessionStorage) }
    )
)

// export const useItem = create<ItemTypes & ItemActionsTypes>()(
//     persist(
//         (set) => ({
//             shop_id: null,
//             external_variant_id: null,
//             sprite_key: '',
//             textureURL: '',
//             atlasURL: '',
//             active: true,
//             updateShop_id: (shop_id) => set({ shop_id }),
//             updateExternal_variant_id: (external_variant_id) => set({ external_variant_id }),
//             updateSprite_key: (sprite_key) => set({ sprite_key }),
//             updateTextureURL: (textureURL) => set({ textureURL }),
//             updateAtlasURL: (atlasURL) => set({ atlasURL }),
//             updateActive: (active) => set({ active }),
//         }),
//         { name: 'item', storage: createJSONStorage(() => sessionStorage) }
//     )
// )
