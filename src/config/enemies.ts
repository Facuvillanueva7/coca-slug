export type EnemyType = 'shooter' | 'melee' | 'lobber' | 'turret' | 'llamaCharge' | 'llamaSpit';

export interface EnemyDef {
  hp: number;
  speed: number;
  attackCooldown: number;
  damage: number;
  score: number;
}

export const ENEMIES: Record<EnemyType, EnemyDef> = {
  shooter: { hp: 25, speed: 35, attackCooldown: 1200, damage: 8, score: 120 },
  melee: { hp: 30, speed: 55, attackCooldown: 800, damage: 12, score: 140 },
  lobber: { hp: 20, speed: 30, attackCooldown: 1600, damage: 10, score: 150 },
  turret: { hp: 45, speed: 25, attackCooldown: 1500, damage: 13, score: 210 },
  llamaCharge: { hp: 28, speed: 95, attackCooldown: 1400, damage: 14, score: 190 },
  llamaSpit: { hp: 22, speed: 45, attackCooldown: 1000, damage: 9, score: 170 }
};
