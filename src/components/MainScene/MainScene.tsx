import Player from "../Player/Player";

export default class MainScene extends Phaser.Scene {
    player!: Player;
    inputKeys!: Record<string, Phaser.Input.Keyboard.Key>;

    constructor() {
        super("MainScene")
    }

    preload() {
      Player.preload(this)
    }

    create() {
        this.player = new Player({ scene: this, x: 0, y: 0, texture: 'male', frame: 'bandit_idle_1' });
        this.player.inputKeys = this.input.keyboard!.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }) as Record<string, Phaser.Input.Keyboard.Key>;
    }

    update(){
        this.player.update()
    }
    
}