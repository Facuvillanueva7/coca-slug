import Phaser from 'phaser';
import { EnemyBase } from '../entities/EnemyBase';
import type { EnemyType } from '../config/enemies';

export class SpawnerDirector {
  zoneLevel = 1;

  constructor(private scene: Phaser.Scene, private enemies: Phaser.Physics.Arcade.Group) {}

  spawn(x: number, y: number, type: EnemyType): EnemyBase {
    const enemy = new EnemyBase(this.scene, x, y, type);
    this.enemies.add(enemy);
    return enemy;
  }

  wave(x: number, y: number, entries: EnemyType[]): void {
    entries.forEach((type, i) => {
      this.scene.time.delayedCall(i * 260, () => this.spawn(x + i * 18, y, type));
    });
  }
}
