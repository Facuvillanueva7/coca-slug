import Phaser from 'phaser';
import { BASE_HEIGHT, BASE_WIDTH, FEEL } from './config/gameConfig';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MenuScene } from './scenes/MenuScene';
import { Level1Scene } from './scenes/Level1Scene';
import { Level2Scene } from './scenes/Level2Scene';
import { BossScene } from './scenes/BossScene';
import { ResultsScene } from './scenes/ResultsScene';

export const runState = {
  score: 0,
  lives: 3,
  grenades: 6,
  rescues: 0,
  deaths: 0,
  checkpoints: {},
  selectedCharacter: 0 as 0 | 1,
  weapon: 'base' as const,
  weaponAmmo: Number.POSITIVE_INFINITY,
  levelStartTime: 0
};

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'app',
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  pixelArt: true,
  zoom: Math.floor(Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT)) || 1,
  backgroundColor: '#1f1a1d',
  fps: { target: 60, forceSetTimeOut: false },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: FEEL.gravity, x: 0 }, debug: false }
  },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [BootScene, PreloadScene, MenuScene, Level1Scene, Level2Scene, BossScene, ResultsScene]
});
