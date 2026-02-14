import Phaser from 'phaser';
import { GAME, FEEL } from './config/gameConfig';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MenuScene } from './scenes/MenuScene';
import { Level1Scene } from './scenes/Level1Scene';
import { Level2Scene } from './scenes/Level2Scene';
import { BossScene } from './scenes/BossScene';
import { ResultsScene } from './scenes/ResultsScene';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'app',
  width: GAME.width,
  height: GAME.height,
  pixelArt: true,
  zoom: Math.floor(Math.min(window.innerWidth / GAME.width, window.innerHeight / GAME.height)) || 1,
  backgroundColor: '#1f1a1d',
  fps: { target: 60, forceSetTimeOut: false },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: FEEL.gravity, x: 0 }, debug: false }
  },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [
    BootScene,
    PreloadScene,
    MenuScene,
    Level1Scene,
    Level2Scene,
    BossScene,
    ResultsScene
  ]
});
