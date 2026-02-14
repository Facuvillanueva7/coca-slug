import Phaser from 'phaser';
import { FEEL } from '../config/gameConfig';
import { WeaponSystem } from '../systems/WeaponSystem';
import { AudioManager } from '../systems/AudioManager';
import { ParticleFX } from '../systems/ParticleFX';

export class Player extends Phaser.Physics.Arcade.Sprite {
  hp = 100;
  invulnerableUntil = 0;
  lastGrounded = 0;
  jumpBufferedUntil = 0;
  facing = 1;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    private weapon: WeaponSystem,
    private audio: AudioManager,
    private fx: ParticleFX
  ) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
  }

  update(
    keys: {
      left: Phaser.Input.Keyboard.Key;
      right: Phaser.Input.Keyboard.Key;
      up: Phaser.Input.Keyboard.Key;
      down: Phaser.Input.Keyboard.Key;
      shoot: Phaser.Input.Keyboard.Key;
      melee: Phaser.Input.Keyboard.Key;
    },
    now: number
  ): void {
    const body = this.body as Phaser.Physics.Arcade.Body | null;
    if (!body) return;

    if (body.blocked.down) this.lastGrounded = now;
    if (Phaser.Input.Keyboard.JustDown(keys.up)) this.jumpBufferedUntil = now + FEEL.jumpBufferMs;

    const dir = (keys.right.isDown ? 1 : 0) - (keys.left.isDown ? 1 : 0);
    this.setVelocityX(dir * 120);
    if (dir !== 0) {
      this.facing = dir;
      this.flipX = dir < 0;
    }

    const canJump = now - this.lastGrounded <= FEEL.coyoteMs;
    if (this.jumpBufferedUntil >= now && canJump) {
      this.setVelocityY(-300);
      this.jumpBufferedUntil = 0;
      this.fx.dust(this.x, this.y + 8);
    }

    if (keys.down.isDown) this.setVelocityX(body.velocity.x * 0.75);

    if (keys.shoot.isDown) {
      this.weapon.requestShoot(now);
      this.weapon.tryShoot(this.x, this.y - 4, this.facing, now);
    }

    if (Phaser.Input.Keyboard.JustDown(keys.melee)) {
      const hitbox = this.scene.add.zone(this.x + this.facing * 12, this.y, 16, 14);
      this.scene.physics.add.existing(hitbox);
      const meleeBody = hitbox.body as Phaser.Physics.Arcade.Body | null;
      if (meleeBody) meleeBody.allowGravity = false;
      this.scene.time.delayedCall(80, () => hitbox.destroy());
    }
  }

  takeDamage(amount: number): void {
    const now = this.scene.time.now;
    if (now < this.invulnerableUntil) return;
    this.hp -= amount;
    this.audio.hurt();
    this.setTint(0xff7777);
    this.invulnerableUntil = now + FEEL.invulnMs;
    this.scene.time.addEvent({ repeat: 6, delay: 120, callback: () => (this.visible = !this.visible) });
    this.scene.time.delayedCall(FEEL.invulnMs, () => {
      this.clearTint();
      this.visible = true;
    });
  }
}
