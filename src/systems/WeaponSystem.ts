import Phaser from 'phaser';
import { WEAPONS, type WeaponId } from '../config/weapons';
import { FEEL } from '../config/gameConfig';
import { AudioManager } from './AudioManager';
import { ParticleFX } from './ParticleFX';

export interface Damageable extends Phaser.Types.Physics.Arcade.GameObjectWithBody {
  hp?: number;
  takeDamage?: (amount: number) => void;
}

export class WeaponSystem {
  weapon: WeaponId = 'base';
  ammo = Number.POSITIVE_INFINITY;
  private bullets: Phaser.Physics.Arcade.Group;
  private lastShot = 0;
  private bufferedShootUntil = 0;

  constructor(
    private scene: Phaser.Scene,
    private audio: AudioManager,
    private fx: ParticleFX,
    private hitGroup: Phaser.Physics.Arcade.Group
  ) {
    this.bullets = this.scene.physics.add.group({ classType: Phaser.Physics.Arcade.Image, maxSize: 200 });
    this.scene.physics.add.overlap(this.bullets, this.hitGroup, (a, b) => {
      const bullet = a as Phaser.Physics.Arcade.Image;
      const target = b as Damageable;
      const dmg = bullet.getData('damage') as number;
      target.takeDamage?.(dmg);
      this.scene.time.timeScale = 0;
      this.scene.time.delayedCall(FEEL.hitstopMs, () => (this.scene.time.timeScale = 1));
      this.fx.impact(bullet.x, bullet.y);
      if (!bullet.getData('piercing')) bullet.destroy();
    });
  }

  setWeapon(id: WeaponId, ammo = WEAPONS[id].ammo): void {
    this.weapon = id;
    this.ammo = ammo;
  }

  requestShoot(now: number): void {
    this.bufferedShootUntil = now + FEEL.shootBufferMs;
  }

  tryShoot(x: number, y: number, dir: number, now: number): boolean {
    const cfg = WEAPONS[this.weapon];
    if (this.bufferedShootUntil < now && now - this.lastShot < cfg.fireRateMs) return false;
    if (this.ammo <= 0) return false;
    this.lastShot = now;
    this.bufferedShootUntil = 0;

    for (let i = 0; i < cfg.pellets; i += 1) {
      const spread = Phaser.Math.DegToRad((Math.random() - 0.5) * cfg.spreadDeg);
      const vx = Math.cos(spread) * cfg.speed * dir;
      const vy = Math.sin(spread) * cfg.speed;
      const bullet = this.bullets.get(x + dir * 8, y, 'pixel') as Phaser.Physics.Arcade.Image;
      if (!bullet) continue;
      bullet.setActive(true).setVisible(true).setTint(this.weapon === 'rocket' ? 0xff7f27 : 0xffffff);
      bullet.body.enable = true;
      bullet.setVelocity(vx, vy);
      bullet.setData('damage', cfg.damage);
      bullet.setData('piercing', Boolean(cfg.piercing));
      this.scene.time.delayedCall(cfg.projectileLifeMs, () => bullet?.active && bullet.destroy());
    }

    if (cfg.ammo !== Infinity) this.ammo -= 1;
    if (this.ammo <= 0) this.setWeapon('base', Infinity);
    this.audio.shoot();
    return true;
  }
}
