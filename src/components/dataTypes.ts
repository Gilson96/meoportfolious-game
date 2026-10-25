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
    credits: number,
    expires_at: string
}