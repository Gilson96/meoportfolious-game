import type { ShopTypes } from "../dataTypes";

const SHOP_SCALE = 0.9

type ShopData = {
    scene: Phaser.Scene;
    x: number;
    y: number;
    shop: ShopTypes;
    isStatic?: boolean;
};

export default class Shop extends Phaser.Physics.Matter.Sprite {
    constructor(data: ShopData) {
        const { scene, x, y, shop, isStatic = true } = data
        super(scene.matter.world, x, y, shop.sprite_key, shop.sprite_key)
        this.scene.add.existing(this)
        // scales the matter body too, so the collider still matches the sprite
        this.setScale(SHOP_SCALE)
        this.setStatic(isStatic)
        // sort by the bottom edge so anything standing below the shop is drawn in front
        this.setDepth(this.getBottomCenter().y!)
    }

    static preload(scene: Phaser.Scene) {
        const shops: ShopTypes[] = scene.registry.get('shops')
        shops.forEach((shop) => scene.load.atlas(shop.sprite_key, shop.textureURL, shop.atlasURL))
    }
}
