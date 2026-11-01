import * as Phaser from 'phaser'
import { useRef } from 'react'
import { usePhaserGameConfig, useSaveGameSession, useShopSession } from './components/Hooks/useGameInitializationConfig'

export function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const frame = usePhaserGameConfig(containerRef, gameRef);
  useSaveGameSession();
  useShopSession(frame);

  return <div ref={containerRef} className="relative h-svh w-full overflow-hidden" />
}

export default App
