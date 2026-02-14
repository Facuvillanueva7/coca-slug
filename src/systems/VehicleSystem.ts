import Phaser from 'phaser';
import { Vehicle } from '../entities/Vehicle';
import { WeaponSystem } from './WeaponSystem';

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
