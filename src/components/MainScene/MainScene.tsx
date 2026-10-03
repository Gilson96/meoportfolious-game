import Player from "../Player/Player";

export default class MainScene extends Phaser.Scene {
    player!: Player;
    player2!: Player;
    inputKeys!: Record<string, Phaser.Input.Keyboard.Key>;

    constructor() {
        super("MainScene")
    }

    preload() {
      Player.preload(this)
      this.load.image('tiles', '/assets/tileset.png')
      this.load.tilemapTiledJSON('map', '/assets/map.tmj')
    }

    create() {
        const map = this.make.tilemap({key: 'map'})
        const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0)
        const layer1 = map.createLayer('Base', tileset!, 0, 0)
        const layer2 = map.createLayer('Road', tileset!, 0, 0)
        layer1?.setCollisionByProperty({collides:true})
        this.matter.world.convertTilemapLayer(layer1!)
        this.player = new Player({ scene: this, x: 100, y: 100, texture: 'male', frame: 'bandit_idle_1' });
        this.player.inputKeys = this.input.keyboard!.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }) as Record<string, Phaser.Input.Keyboard.Key>;

    }

    update(){
        this.player.update();
    }
    
}