import Phaser from 'phaser';
import { SCENES } from './sceneKeys';

export class BootScene extends Phaser.Scene {
  constructor() { super(SCENES.Boot); }

  create(): void {
    this.scene.start(SCENES.Preload);
  }
}
