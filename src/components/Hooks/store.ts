import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const SESSION_LIFETIME_MS = 120 * 60 * 1000

type GameSessionTypes = {
    equipped_item_slug: string,
    credits: number,
    expires_at: string
}

export const newGameSession = (): GameSessionTypes => ({
    equipped_item_slug: 'player_atlas.json',
    credits: 0,
    expires_at: new Date(Date.now() + SESSION_LIFETIME_MS).toISOString(),
})

// export const isGameSessionExpired = (session: GameSessionTypes) =>
//     new Date(session.expires_at).getTime() <= Date.now()

export const useGameSession = create<GameSessionTypes>()(
    persist(
        () => newGameSession(),
        { name: 'game-session' }
    )
)
