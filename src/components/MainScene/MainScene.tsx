import type PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import Player from "../Entities/Player";
import Resource from "../Entities/Resource";
import {data,errors} from '../Hooks/ShopifyStorefrontApiClient'
export default class MainScene extends Phaser.Scene {
    matterCollision!: PhaserMatterCollisionPlugin;
    resources: Resource[] = [];
    player!: Player;
    player2!: Player;
    shop!: Phaser.Physics.Matter.Sprite;
    map!: Phaser.Tilemaps.Tilemap;
    inputKeys!: Record<string, Phaser.Input.Keyboard.Key>;

    constructor() {
        super("MainScene")
    }

    preload() {
        Player.preload(this)
        // Resource.preload(this)
        this.load.image('concrete_grass', '/assets/tiles/concrete_grass.png')
        this.load.tilemapTiledJSON('map', '/assets/map.tmj')
        this.load.atlas('clothes_shop', '/assets/shops/clothes_shop.png', '/assets/shops/clothes_shop_atlas.json')
    }
    
    create() {
        const map = this.make.tilemap({ key: 'map' })
        this.map = map
        const concrete = map.addTilesetImage('concrete_grass', 'concrete_grass')
        map.createLayer('Base', concrete!, 0, 0)
        // map.createLayer('Road', tileset!, 0, 0)
        // layer1?.setCollisionByProperty({ collides: true })
        // this.matter.world.convertTilemapLayer(layer1!)
        
        this.player = new Player({ scene: this, x: 100, y: 100, texture: 'player', frame: 'south_frame_000' });
        console.log(this.player)
        this.player.inputKeys = this.input.keyboard!.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }) as Record<string, Phaser.Input.Keyboard.Key>;

        this.shop = new Phaser.Physics.Matter.Sprite(this.matter.world, 250, 0, 'clothes_shop', 'clothes_shop')
        this.shop.setStatic(true)
        this.add.existing(this.shop)

        // set bounds to camera and follows the sprite
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true)
        this.fitCameraToScreen()
        this.scale.on('resize', this.fitCameraToScreen, this)
        this.events.once('shutdown', () => this.scale.off('resize', this.fitCameraToScreen, this))

        this.matterCollision?.addOnCollideStart({
            objectA: this.player.playerCollider,
            objectB: this.shop,
            callback: () => this.game.events.emit('open-frame', { name: 'Clothes Shop' })
        })

        this.matterCollision?.addOnCollideEnd({
            objectA: this.player.playerCollider,
            objectB: this.shop,
            callback: () => this.game.events.emit('close-frame')
        })

        // freeze the player while the frame is open
        this.game.events.on('open-frame', this.freezePlayer, this)
        this.game.events.on('close-frame', this.unfreezePlayer, this)
        this.events.once('shutdown', () => {
            this.game.events.off('open-frame', this.freezePlayer, this)
            this.game.events.off('close-frame', this.unfreezePlayer, this)
        })

        // start a fresh session if the persisted one has expired
        // if (isGameSessionExpired(useGameSession.getState())) {
        //     useGameSession.setState(newGameSession())
        // }
        
    }

    freezePlayer() {
        // reset keys so none stay stuck "down" while focus is inside the iframe
        this.input.keyboard!.resetKeys()
        this.input.keyboard!.enabled = false
        this.player.setVelocity(0, 0)
    }

    unfreezePlayer() {
        this.input.keyboard!.enabled = true

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
        // this.player2.update();
    }

}