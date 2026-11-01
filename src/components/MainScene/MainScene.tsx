import type PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import Player from "../Entities/Player";
import Resource from "../Entities/Resource";
import Shop from "../Entities/Shop";
import type { ShopTypes } from "../dataTypes";

type ShopEntry = {
    shop: Shop;
    data: ShopTypes;
    prompt: Phaser.GameObjects.Text;
    touched: boolean;
};

export default class MainScene extends Phaser.Scene {
    matterCollision!: PhaserMatterCollisionPlugin;
    resources: Resource[] = [];
    player!: Player;
    player2!: Player;
    shops: ShopEntry[] = [];
    shopPopup: Window | null = null;
    map!: Phaser.Tilemaps.Tilemap;
    inputKeys!: Record<string, Phaser.Input.Keyboard.Key>;

    constructor() {
        super("MainScene")
    }

    preload() {
        this.load.on('progress', (value: number) => this.game.events.emit('load-progress', value))

        Player.preload(this)
        // Resource.preload(this)
        this.load.image('concrete_grass', '/assets/tiles/concrete_grass.png')
        this.load.tilemapTiledJSON('map', '/assets/map.tmj')
        Shop.preload(this)
    }
    
    create() {
        // map
        const map = this.make.tilemap({ key: 'map' })
        this.map = map
        const concrete = map.addTilesetImage('concrete_grass', 'concrete_grass')
        map.createLayer('Base', concrete!, 0, 0)

        // player
        this.player = new Player({ scene: this, x: 100, y: 100, texture: this.registry.get('equippedItem').sprite_key, frame: 'south_frame_000' });
        this.player.setDepth(1)
        this.player.inputKeys = this.input.keyboard!.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }) as Record<string, Phaser.Input.Keyboard.Key>;

        // shops
        const shopsData: ShopTypes[] = this.registry.get('shops')
        this.shops = shopsData.map((shopData) => {
            const shop = new Shop({ scene: this, x: shopData.position.x, y: shopData.position.y, shop: shopData })
            const prompt = this.add.text(shop.x, shop.y + 20, 'Press E to enter shop', {
                fontSize: '12px',
                color: '#ffffff',
                backgroundColor: '#000000aa',
                padding: { x: 6, y: 4 }
            }).setOrigin(0.5).setDepth(10).setVisible(false)
            return { shop, data: shopData, prompt, touched: false }
        })

        // set bounds to camera and follows the sprite
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true)
        this.fitCameraToScreen()
        this.scale.on('resize', this.fitCameraToScreen, this)
        this.events.once('shutdown', () => this.scale.off('resize', this.fitCameraToScreen, this))

        // collisions
        this.shops.forEach((entry) => {
            this.matterCollision?.addOnCollideStart({
                objectA: this.player.playerCollider,
                objectB: entry.shop,
                callback: () => {
                    entry.touched = true
                    entry.prompt.setVisible(true)
                }
            })

            this.matterCollision?.addOnCollideEnd({
                objectA: this.player.playerCollider,
                objectB: entry.shop,
                callback: () => {
                    entry.touched = false
                    entry.prompt.setVisible(false)
                }
            })
        })

        const enterShop = () => {
            const entry = this.shops.find((s) => s.touched)
            if (!entry || this.shopPopup) return
            const { id, shop_link, provider } = entry.data
            if (provider === 'shopify') {
                const { availWidth, availHeight } = window.screen
                this.shopPopup = window.open(shop_link, 'clothes-shop', `popup,left=0,top=0,width=${availWidth},height=${availHeight}`)
                if (!this.shopPopup) return
            }
            this.game.events.emit('open-frame', { name: 'Clothes Shop', shopId: id, shopLink: shop_link, provider })
        }
        this.input.keyboard!.on('keydown-E', enterShop)

        // un/freeze on event
        this.game.events.on('open-frame', this.freezePlayer, this)
        this.game.events.on('close-frame', this.unfreezePlayer, this)
        this.events.once('shutdown', () => {
            this.game.events.off('open-frame', this.freezePlayer, this)
            this.game.events.off('close-frame', this.unfreezePlayer, this)
            this.input.keyboard!.off('keydown-E', enterShop)
            this.shopPopup?.close()
        })

        // this.game.events.emit('scene-ready')
    }

    freezePlayer() {
        this.input.keyboard!.resetKeys()
        this.input.keyboard!.enabled = false
        this.player.setVelocity(0, 0)
        this.shops.forEach((entry) => entry.prompt.setVisible(false))
    }

    unfreezePlayer() {
        this.input.keyboard!.enabled = true
        this.shops.forEach((entry) => entry.prompt.setVisible(entry.touched))
    }

    fitCameraToScreen() {
        const { width, height } = this.scale.gameSize
        const zoom = Math.max(
            width / this.map.widthInPixels,
            height / this.map.heightInPixels
        )
        this.cameras.main.setZoom(zoom)
    }

    update() {
        this.player.update();

        // the popup has no event back to the game, so watch for it being closed
        if (this.shopPopup?.closed) {
            this.shopPopup = null
            this.game.events.emit('close-frame')
        }
    }

}