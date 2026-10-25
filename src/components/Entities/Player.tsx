export default class Player extends Phaser.Physics.Matter.Sprite {
    inputKeys!: Record<string, Phaser.Input.Keyboard.Key>;
    playerCollider!: MatterJS.BodyType;
    
    constructor(data: { scene: {matter: {world: Phaser.Physics.Matter.World}}, x: number, y: number, texture: string, frame: string, isStatic?: boolean }) {
        const { scene, x, y, texture, frame, isStatic = false } = data
        super(scene.matter.world, x, y, texture, frame)
        this.scene.add.existing(this)

        // @ts-ignore
        const {Body, Bodies} = Phaser.Physics.Matter.Matter
        this.playerCollider = Bodies.circle(x, y, 12, {isSensor:false, label:'playerCollider'})
        const compoundBody = Body.create({
            parts: [this.playerCollider],
            frictionAir: 0.35
        })
        this.setExistingBody(compoundBody)
        this.setFixedRotation()
        this.setStatic(isStatic)
    }

    static preload(scene: Phaser.Scene) {
        scene.load.atlas('player', '../../assets/player/player.png', '../../assets/player/player_atlas.json')
        // scene.load.animation('male_anim', '../../assets/player/male_anim.json')
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
        // if(Math.abs(this.getVelocity().x) > 0.1 || Math.abs(this.getVelocity().y) > 0.1) {
        //     this.anims.play('male_walk', true);
        // } else {
        //     this.anims.play('male_idle', true);
        // }
    }
}