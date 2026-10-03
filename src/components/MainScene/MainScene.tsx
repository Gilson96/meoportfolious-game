import Player from "../Entities/Player";

export default class MainScene extends Phaser.Scene {
    player!: Player;
    player2!: Player;
    map!: Phaser.Tilemaps.Tilemap;
    inputKeys!: Record<string, Phaser.Input.Keyboard.Key>;

    constructor() {
        super("MainScene")
    }

    preload() {
        Player.preload(this)
        this.load.image('tiles', '/assets/tileset.png')
        this.load.tilemapTiledJSON('map', '/assets/map.tmj')
        this.load.atlas('tree_and_bush', '/assets/tree_and_bush.png', '/assets/tree_and_bush_atlas.json')
    }

    create() {
        const map = this.make.tilemap({ key: 'map' })
        this.map = map
        const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0)
        const layer1 = map.createLayer('Base', tileset!, 0, 0)
        const layer2 = map.createLayer('Road', tileset!, 0, 0)
        layer1?.setCollisionByProperty({ collides: true })
        this.matter.world.convertTilemapLayer(layer1!)

        this.addResources()

        this.player = new Player({ scene: this, x: 100, y: 100, texture: 'male', frame: 'bandit_idle_1' });
        this.player.inputKeys = this.input.keyboard!.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }) as Record<string, Phaser.Input.Keyboard.Key>;

    }

    addResources() {
        const resources = this.map.getObjectLayer('Resources')
        resources?.objects.forEach((resource: Phaser.Types.Tilemaps.TiledObject) => {
            // Tiled stores the Class on the tileset tile, not on each placed object
            const tileset = this.map.tilesets.find(ts => ts.containsTileIndex(resource.gid ?? 0))
            const tileData = tileset?.getTileData(resource.gid ?? 0) as { type?: string } | null
            const frame = resource.type || tileData?.type
            const resourceItem = new Phaser.Physics.Matter.Sprite(this.matter.world, resource.x ?? 0, resource.y ?? 0, 'tree_and_bush', frame)
            const yOriginProp = resource.properties?.find((p: any) => p.name === 'yOrigin')
            const yOrigin = yOriginProp?.value ?? 0.5
            resourceItem.x = (resource.x ?? 0) + resourceItem.width/2
            resourceItem.y = (resource.y ?? 0) + resourceItem.height/2
            resourceItem.y = resourceItem.y + resourceItem.height * (yOrigin - 0.5)
            // @ts-ignore
            const { Body, Bodies } = Phaser.Physics.Matter.Matter
            let circleCollider = Bodies.circle(resourceItem.x, resourceItem.y, 12, { isSensor: false, label: 'collider' })
            resourceItem.setExistingBody(circleCollider)
            resourceItem.setStatic(true)
            resourceItem.setOrigin(0.5,yOrigin)
            this.add.existing(resourceItem)

        })
    }

    update() {
        this.player.update();
    }

}