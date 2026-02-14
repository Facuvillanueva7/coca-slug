export const GAME = {
  width: 384,
  height: 216
} as const;

export const FEEL = {
  gravity: 900,
  coyoteMs: 100,
  jumpBufferMs: 120,
  shootBufferMs: 120,
  hitstopMs: 60,
  invulnMs: 1000,
  shakeIntensity: 0.002,
  lookAhead: 28
} as const;

export const AUDIO_DEFAULTS = {
  master: 0.8,
  sfx: 0.8,
  music: 0.5
} as const;
