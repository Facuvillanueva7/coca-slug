import type { WeaponId } from '../config/weapons';

export interface RunState {
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

export const runState: RunState = {
  score: 0,
  lives: 3,
  grenades: 6,
  rescues: 0,
  deaths: 0,
  checkpoints: {},
  selectedCharacter: 0,
  weapon: 'base',
  weaponAmmo: Number.POSITIVE_INFINITY,
  levelStartTime: 0
};
