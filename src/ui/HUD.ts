import Phaser from 'phaser';
import type { Player } from '../entities/Player';
import { WeaponSystem } from '../systems/WeaponSystem';
import { runState } from '../main';
import { VehicleSystem } from '../systems/VehicleSystem';

export class HUD {
  private text: Phaser.GameObjects.Text;

  constructor(private scene: Phaser.Scene, private player: Player, private weapons: WeaponSystem, private vehicle: VehicleSystem) {
    this.text = scene.add.text(4, 4, '', { fontFamily: 'monospace', fontSize: '10px', color: '#fff' }).setScrollFactor(0).setDepth(100);
  }

  update(): void {
    this.text.setText([
      `VIDAS ${runState.lives}  HP ${Math.max(0, this.player.hp)}`,
      `ARMA ${this.weapons.weapon.toUpperCase()} ${this.weapons.ammo === Infinity ? '∞' : this.weapons.ammo}`,
      `GRANADAS ${runState.grenades}  SCORE ${runState.score}`,
      `RESCATES ${runState.rescues}`,
      this.vehicle.mounted && this.vehicle.vehicle ? `VEHÍCULO HP ${this.vehicle.vehicle.hp} CÑN ${this.vehicle.vehicle.cannonAmmo}` : ''
    ]);
  }
}
