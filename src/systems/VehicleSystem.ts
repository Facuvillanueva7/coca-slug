import Phaser from 'phaser';
import { WeaponSystem } from './WeaponSystem';

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
      this.body.enable = false;
      this.scene.time.delayedCall(400, () => this.destroy());
    }
  }
}

export class VehicleSystem {
  vehicle?: Vehicle;
  mounted = false;

  constructor(private scene: Phaser.Scene, private weapon: WeaponSystem) {}

  spawn(x: number, y: number): Vehicle {
    this.vehicle = new Vehicle(this.scene, x, y);
    return this.vehicle;
  }

  mount(): void {
    if (!this.vehicle) return;
    this.mounted = true;
    this.vehicle.activePilot = true;
    this.weapon.setWeapon('smg', Infinity);
  }

  dismount(): void {
    this.mounted = false;
    if (this.vehicle) this.vehicle.activePilot = false;
    this.weapon.setWeapon('base', Infinity);
  }
}
