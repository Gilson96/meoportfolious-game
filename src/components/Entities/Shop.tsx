import type { ShopTypes } from "../dataTypes";

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
        this.setStatic(isStatic)
    }

    static preload(scene: Phaser.Scene) {
        const shops: ShopTypes[] = scene.registry.get('shops')
        shops.forEach((shop) => scene.load.atlas(shop.sprite_key, shop.textureURL, shop.atlasURL))
    }
}
