import Phaser from 'phaser';

export class ParticleFX {
  constructor(private scene: Phaser.Scene) {}

  dust(x: number, y: number): void {
    const p = this.scene.add.particles(x, y, 'pixel', {
      speed: { min: 10, max: 40 },
      angle: { min: 200, max: 340 },
      lifespan: 220,
      quantity: 6,
      scale: { start: 1, end: 0 },
      tint: [0xc29f75, 0xb58c5a]
    });
    this.scene.time.delayedCall(250, () => p.destroy());
  }

  impact(x: number, y: number): void {
    const flash = this.scene.add.rectangle(x, y, 10, 10, 0xffffff).setDepth(30);
    this.scene.tweens.add({ targets: flash, alpha: 0, duration: 70, onComplete: () => flash.destroy() });
  }
}
