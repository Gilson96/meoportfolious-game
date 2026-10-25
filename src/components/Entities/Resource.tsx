type ResourceData = {
    scene: Phaser.Scene & { map: Phaser.Tilemaps.Tilemap };
    resource: Phaser.Types.Tilemaps.TiledObject;
    isStatic: boolean
};

export default class Resource extends Phaser.Physics.Matter.Sprite {
    inputKeys!: Record<string, Phaser.Input.Keyboard.Key>;

    constructor(data: ResourceData) {
        const { scene, resource, isStatic }: ResourceData = data
        // Tiled stores the Class on the tileset tile, not on each placed object
        const tileset = scene.map.tilesets.find(ts => ts.containsTileIndex(resource.gid ?? 0))
        const tileData = tileset?.getTileData(resource.gid ?? 0) as { type?: string } | null
        const frame = resource.type || tileData?.type
        super(scene.matter.world, resource.x!, resource.y!, 'tree_and_bush', frame)
        this.scene.add.existing(this)

        const yOriginProp = resource?.properties?.find((p: any) => p.name === 'yOrigin')
        const yOrigin = yOriginProp?.value ?? 0.5
        this.x = (resource.x ?? 0) + this.width / 2
        this.y = (resource.y ?? 0) + this.height / 2
        this.y = this.y + this.height * (yOrigin - 0.5)
        // @ts-ignore
        const { Body, Bodies } = Phaser.Physics.Matter.Matter
        let circleCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'resourceCollider' })
        this.setExistingBody(circleCollider)
        this.setStatic(isStatic)
        this.setOrigin(0.5, yOrigin)
    }

    static preload(scene: Phaser.Scene) {
        scene.load.atlas('tree_and_bush', '/assets/tree_and_bush.png', '/assets/tree_and_bush_atlas.json')
    }

    update() {

        const speed = 2.5
        let playerVelocity = new Phaser.Math.Vector2();

        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1
        }
        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1
        }

        playerVelocity.normalize();
        playerVelocity.scale(speed)
        this.setVelocity(playerVelocity.x, playerVelocity.y)

        //Choose between walking animation or idle 
        if (Math.abs(this.getVelocity().x) > 0.1 || Math.abs(this.getVelocity().y) > 0.1) {
            this.anims.play('male_walk', true);
        } else {
            this.anims.play('male_idle', true);
        }
    }
}