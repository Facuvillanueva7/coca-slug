import Phaser from 'phaser';
import { BaseLevelScene } from './BaseLevelScene';
import { runState } from '../systems/RunState';

class Boss extends Phaser.Physics.Arcade.Sprite {
  hp = 420;
  phase = 1;
  lastAttack = 0;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'enemy-turret');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(2);
    this.setImmovable(true);
  }
  takeDamage(amount: number): void {
    this.hp -= amount;
    if (this.hp < 220) this.phase = 2;
    this.setTintFill(0xffffff);
    this.scene.time.delayedCall(70, () => this.clearTint());
  }
}

export class BossScene extends BaseLevelScene {
  private boss!: Boss;
  private hpBar!: Phaser.GameObjects.Rectangle;

  constructor() { super('BossScene'); }

  create(): void {
    this.createBase('char-0');
    this.player.setX(80);
    this.boss = new Boss(this, 1810, 144);
    this.enemies.add(this.boss);
    this.hpBar = this.add.rectangle(190, 10, 180, 8, 0xb1382a).setScrollFactor(0).setOrigin(0.5, 0);
    this.add.text(130, 10, 'Doña Vagoneta Mk.II', { fontFamily: 'monospace', fontSize: '9px' }).setScrollFactor(0);

    this.physics.add.collider(this.boss, this.platforms);
  }

  update(time: number): void {
    this.commonUpdate(time);
    const dist = this.player.x - this.boss.x;
    this.boss.setVelocityX(Math.sign(dist) * (this.boss.phase === 1 ? 25 : 45));

    if (time - this.boss.lastAttack > (this.boss.phase === 1 ? 1300 : 800)) {
      this.boss.lastAttack = time;
      this.cameraCtrl.shake(1.2);
      this.player.takeDamage(this.boss.phase === 1 ? 10 : 14);
    }

    this.hpBar.width = Phaser.Math.Clamp((this.boss.hp / 420) * 180, 0, 180);
    if (this.boss.hp <= 0) {
      runState.score += 5000;
      this.scene.start('ResultsScene');
    }
  }
}
