import Phaser from 'phaser';
import { BaseLevel } from '../core/BaseLevel';
import { SCENES } from './sceneKeys';

export class Level2Scene extends BaseLevel {
  private hazard!: Phaser.GameObjects.Zone;

  constructor() { super(SCENES.Level2); }

  create(): void {
    this.createBase('char-0');
    const vehicle = this.vehicle.spawn(340, 162);
    this.physics.add.collider(vehicle, this.platforms);

    this.director.wave(520, 160, ['llamaCharge', 'shooter', 'llamaSpit']);
    this.director.wave(1080, 160, ['melee', 'lobber', 'llamaCharge']);
    this.director.wave(1660, 160, ['turret', 'llamaSpit']);

    this.hazard = this.add.zone(1170, 184, 120, 20);
    this.physics.add.existing(this.hazard, true);
    this.physics.add.overlap(this.player, this.hazard, () => this.player.takeDamage(20));

    this.physics.add.overlap(this.player, vehicle, () => {
      if (Phaser.Input.Keyboard.JustDown(this.keys.interact)) {
        this.vehicle.mounted ? this.vehicle.dismount() : this.vehicle.mount();
      }
    });

    this.add.text(20, 16, 'Nivel 2: barrancos, vagonetas y llamas enojadas', { fontFamily: 'monospace', fontSize: '9px' }).setScrollFactor(0);
  }

  update(time: number): void {
    this.commonUpdate(time);
    if (this.vehicle.mounted && this.vehicle.vehicle) {
      const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
      this.vehicle.vehicle.setVelocityX(dir * 140);
      if (Phaser.Input.Keyboard.JustDown(this.keys.up)) this.vehicle.vehicle.setVelocityY(-290);
    }

    if (this.player.x > 2080) this.scene.start(SCENES.Boss);
  }
}
