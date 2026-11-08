export type ItemTypes = {
  shop_id: number | null;
  external_variant_id: number | null
  sprite_key: string
  textureURL: string
  atlasURL: string
  active: boolean
}

export type ItemActionsTypes = {
  updateShop_id: (shop_id: ItemTypes['shop_id']) => void
  updateExternal_variant_id: (external_variant_id: ItemTypes['external_variant_id']) => void
  updateSprite_key: (sprite_key: ItemTypes['sprite_key']) => void
  updateTextureURL: (textureURL: ItemTypes['textureURL']) => void
  updateAtlasURL: (atlasURL: ItemTypes['atlasURL']) => void
  updateActive: (active: ItemTypes['active']) => void
}

export type GameSessionTypes = {
  equipped_item_slug: string,
  amountSpend: number,
}

export type GameActionsTypes = {
  updateEquipped_item_slug: (equipped_item_slug: GameSessionTypes['equipped_item_slug']) => void
  updateCredits: (amountSpend: GameSessionTypes['amountSpend']) => void
}

export type GameSessionInventoryTypes = {
  inventory: ItemTypes[]
}

export type SessionIdTypes = {
  gameSessionId: string | null
  shopSessionId: string | null
}

export type SessionIdActionsTypes = {
  updateGameSessionId: (gameSessionId: SessionIdTypes['gameSessionId']) => void
  updateShopSessionId: (shopSessionId: SessionIdTypes['shopSessionId']) => void
}

export type PlayerTypes = {
  scene: { matter: { world: Phaser.Physics.Matter.World } }
  x: number
  y: number
  texture: string
  frame: string
  isStatic?: boolean
}

export type ResourceTypes = {
  frame: string
  x: number
  y: number
  radius?: number
  // rectangle collider centred on (x, y), used instead of the circle when set
  collider?: { width: number, height: number }
  // flat decoration the player walks over, drawn beneath everything else
  ground?: boolean
  // draw size multiplier; the collider and radius stay in map pixels
  scale?: number
}

export type ShopConfigTypes = {
  sprite_key: string
  textureURL: string
  atlasURL: string
  provider: string
  shop_link: string
  password: string | null
  position: { x: number, y: number }
}

export type ShopRowTypes = {
  id: number
  config: ShopConfigTypes
}

export type ShopTypes = ShopConfigTypes & {
  id: ShopRowTypes['id']
}


export type ShopFrameTypes = {
  name: string
  shopId: ShopTypes['id']
  shopLink: string
  provider: ShopTypes['provider']
}
