import Phaser from 'phaser';
import { ENEMIES, type EnemyType } from '../config/enemies';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  typeId: EnemyType;
  hp: number;
  lastAttack = 0;
  patrolDir = 1;

  constructor(scene: Phaser.Scene, x: number, y: number, type: EnemyType) {
    super(scene, x, y, `enemy-${type}`);
    this.typeId = type;
    this.hp = ENEMIES[type].hp;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
  }

  takeDamage(amount: number): void {
    this.hp -= amount;
    this.setTintFill(0xffffff);
    this.scene.time.delayedCall(50, () => this.clearTint());
    if (this.hp <= 0) {
      this.setVelocity(0, -80);
      this.body.enable = false;
      this.scene.time.delayedCall(200, () => this.destroy());
    }
  }

  behave(playerX: number, now: number): void {
    const cfg = ENEMIES[this.typeId];
    const distance = playerX - this.x;
    const dir = Math.sign(distance) || 1;
    if (Math.abs(distance) < 140) {
      this.setVelocityX(dir * cfg.speed);
      this.flipX = dir < 0;
      if (Math.abs(distance) < 44 && now - this.lastAttack > cfg.attackCooldown) {
        this.lastAttack = now;
      }
    } else {
      this.setVelocityX(this.patrolDir * cfg.speed * 0.5);
      if (Math.random() < 0.005) this.patrolDir *= -1;
    }
  }
}
