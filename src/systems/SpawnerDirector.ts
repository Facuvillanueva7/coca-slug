import Phaser from 'phaser';
import { Enemy } from '../entities/Enemy';
import type { EnemyType } from '../config/enemies';

export class SpawnerDirector {
  zoneLevel = 1;

  constructor(private scene: Phaser.Scene, private enemies: Phaser.Physics.Arcade.Group) {}

  spawn(x: number, y: number, type: EnemyType): Enemy {
    const e = new Enemy(this.scene, x, y, type);
    this.enemies.add(e);
    return e;
  }

  wave(x: number, y: number, entries: EnemyType[]): void {
    entries.forEach((type, i) => this.scene.time.delayedCall(i * 260, () => this.spawn(x + i * 18, y, type)));
  }
}
