import type { ResourceTypes } from "../dataTypes";

type ResourceData = {
    scene: Phaser.Scene;
    resource: ResourceTypes;
};

export default class Resource extends Phaser.Physics.Matter.Sprite {
    constructor(data: ResourceData) {
        const { scene, resource } = data
        const { frame, x, y, radius = null, collider, ground = false, scale = 1 } = resource
        super(scene.matter.world, x, y, 'resources', frame)
        this.scene.add.existing(this)
        // scale before swapping in the collider: matter scales the current body along with the sprite,
        // so doing it now leaves the collider at the map-pixel size given in the data
        this.setScale(scale)

        // @ts-ignore
        const { Bodies } = Phaser.Physics.Matter.Matter
        const body = collider
            ? Bodies.rectangle(x, y, collider.width, collider.height, { label: 'resourceCollider' })
            : Bodies.circle(x, y, radius, { label: 'resourceCollider' })
        this.setExistingBody(body)
        this.setStatic(true)
        // a sensor body still exists for matter but never blocks the player
        this.setSensor(ground)

        // matter resets the origin when a body is set, so re-apply the pivot from the atlas
        const { customPivot, pivotX, pivotY } = this.frame
        this.setOrigin(customPivot ? pivotX : 0.5, customPivot ? pivotY : 0.5)
        // origin sits at the base, so whatever is lower on the map is drawn in front;
        // ground decorations share the tilemap's depth and draw just above it
        this.setDepth(ground ? 0 : this.y)
    }

    static preload(scene: Phaser.Scene) {
        scene.load.atlas('resources', '/assets/resources/resources_packed.png', '/assets/resources/resources_atlas.json')
    }
}
