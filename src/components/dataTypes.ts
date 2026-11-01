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

export type ShopTypes = {
  id: number,
  sprite_key: string
  textureURL: string
  atlasURL: string
  provider: string
  shop_link: string
  config: null
}


export type ShopFrameTypes = {
  name: string
  shopId: ShopTypes['id']
  shopLink: string
}
