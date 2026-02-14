import type { WeaponId } from '../config/weapons';

export interface GameRunState {
  score: number;
  lives: number;
  grenades: number;
  rescues: number;
  deaths: number;
  checkpoints: Record<string, { x: number; y: number }>;
  selectedCharacter: 0 | 1;
  weapon: WeaponId;
  weaponAmmo: number;
  levelStartTime: number;
}
