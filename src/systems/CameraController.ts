import Phaser from 'phaser';
import { FEEL } from '../config/gameConfig';

export class CameraController {
  constructor(private scene: Phaser.Scene) {}

  bind(target: Phaser.Physics.Arcade.Sprite): void {
    const cam = this.scene.cameras.main;
    cam.startFollow(target, true, 0.08, 0.08, 0, 0);
    this.scene.events.on('update', () => {
      cam.followOffset.x = target.flipX ? -FEEL.lookAhead : FEEL.lookAhead;
    });
  }

  shake(mult = 1): void {
    this.scene.cameras.main.shake(90, FEEL.shakeIntensity * mult, true);
  }
}
