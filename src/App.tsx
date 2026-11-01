import * as Phaser from 'phaser'
import { useRef } from 'react'
import { X } from 'lucide-react'
import { usePhaserGameConfig, useSaveGameSession, useShopSession } from './components/Hooks/useGameInitializationConfig'
import { Button } from './components/ui/button'

export function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const frame = usePhaserGameConfig(containerRef, gameRef);
  useSaveGameSession();
  useShopSession(frame);

  const showFrame = frame && frame.provider !== 'shopify'

  return (
    <div className="relative h-svh w-full overflow-hidden">
      <div ref={containerRef} className="h-full w-full" />
      {showFrame && (
        <div className="fixed inset-0 z-50 bg-background">
          <iframe src={frame.shopLink} title={frame.name} className="h-full w-full border-0" />
          <Button
            variant="secondary"
            size="icon"
            aria-label="Close shop"
            className="absolute top-3 right-3"
            onClick={() => gameRef.current?.events.emit('close-frame')}
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  )
}

export default App
