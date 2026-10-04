import type PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import Player from "../Entities/Player";
import Resource from "../Entities/Resource";

export default class MainScene extends Phaser.Scene {
    matterCollision!: PhaserMatterCollisionPlugin;
    resources: Resource[] = [];
    player!: Player;
    player2!: Player;
    map!: Phaser.Tilemaps.Tilemap;
    inputKeys!: Record<string, Phaser.Input.Keyboard.Key>;

    constructor() {
        super("MainScene")
    }

    preload() {
        Player.preload(this)
        Resource.preload(this)
        this.load.image('tiles', '/assets/tileset.png')
        this.load.tilemapTiledJSON('map', '/assets/map.tmj')
    }

    create() {
        const map = this.make.tilemap({ key: 'map' })
        this.map = map
        const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0)
        const layer1 = map.createLayer('Base', tileset!, 0, 0)
        map.createLayer('Road', tileset!, 0, 0)
        layer1?.setCollisionByProperty({ collides: true })
        this.matter.world.convertTilemapLayer(layer1!)

        this.player = new Player({ scene: this, x: 100, y: 100, texture: 'male', frame: 'bandit_idle_1' });
        this.player.inputKeys = this.input.keyboard!.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }) as Record<string, Phaser.Input.Keyboard.Key>;
        this.player2 = new Player({ scene: this, x: 200, y: 200, texture: 'male', frame: 'bandit_idle_1' });
        this.player2.inputKeys = this.input.keyboard!.addKeys({
            up: 0,
            down: 0,
            left: 0,
            right: 0
        }) as Record<string, Phaser.Input.Keyboard.Key>;

        // set bounds to camera and follows the sprite
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true)
        this.fitCameraToScreen()
        this.scale.on('resize', this.fitCameraToScreen, this)
        this.events.once('shutdown', () => this.scale.off('resize', this.fitCameraToScreen, this))

        this.matterCollision?.addOnCollideStart({
            objectA: this.player.playerCollider,
            objectB: this.player2.playerCollider,
            callback: () => {
               console.log("Player touched door!")
               this.game.events.emit('open-frame', { name: 'Door' })
            }
        })

        this.matterCollision?.addOnCollideEnd({
            objectA: this.player.playerCollider,
            objectB: this.player2.playerCollider,
            callback: () => this.game.events.emit('close-frame')
        })


    }

    fitCameraToScreen() {
        const { width, height } = this.scale.gameSize
        const zoom = Math.max(width / this.map.widthInPixels, height / this.map.heightInPixels)
        this.cameras.main.setZoom(zoom)
    }

    update() {
        this.player.update();
        this.player2.update();
    }

}