import Phaser from 'phaser';

export class Vehicle extends Phaser.Physics.Arcade.Sprite {
  hp = 120;
  cannonAmmo = 12;
  activePilot = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'vehicle');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
  }

  takeDamage(amount: number): void {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.setTexture('vehicleExplode');
      const body = this.body as Phaser.Physics.Arcade.Body | null;
      if (body) body.enable = false;
      this.scene.time.delayedCall(400, () => this.destroy());
    }
  }
}
