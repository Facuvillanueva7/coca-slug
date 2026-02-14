export type WeaponId = 'base' | 'smg' | 'shotgun' | 'rocket' | 'flame' | 'laser';

export interface WeaponDef {
  id: WeaponId;
  label: string;
  fireRateMs: number;
  damage: number;
  speed: number;
  spreadDeg: number;
  pellets: number;
  ammo: number;
  projectileLifeMs: number;
  aoeRadius?: number;
  tickDamage?: boolean;
  piercing?: boolean;
  cooldownMs?: number;
}

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  base: { id: 'base', label: 'Honda', fireRateMs: 220, damage: 10, speed: 240, spreadDeg: 0, pellets: 1, ammo: Infinity, projectileLifeMs: 1300 },
  smg: { id: 'smg', label: 'Tropa Rápida', fireRateMs: 75, damage: 7, speed: 290, spreadDeg: 4, pellets: 1, ammo: 180, projectileLifeMs: 1000 },
  shotgun: { id: 'shotgun', label: 'Trueno de Quebrada', fireRateMs: 460, damage: 8, speed: 230, spreadDeg: 22, pellets: 6, ammo: 45, projectileLifeMs: 420 },
  rocket: { id: 'rocket', label: 'Cohete Minero', fireRateMs: 680, damage: 26, speed: 180, spreadDeg: 0, pellets: 1, ammo: 18, projectileLifeMs: 1500, aoeRadius: 40 },
  flame: { id: 'flame', label: 'Soplete Andino', fireRateMs: 70, damage: 4, speed: 120, spreadDeg: 16, pellets: 2, ammo: 220, projectileLifeMs: 250, tickDamage: true },
  laser: { id: 'laser', label: 'Rayo de Altura', fireRateMs: 1000, damage: 20, speed: 500, spreadDeg: 0, pellets: 1, ammo: 30, projectileLifeMs: 160, piercing: true, cooldownMs: 850 }
};
