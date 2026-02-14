import Phaser from 'phaser';
import { runState } from '../state/runState';
import { SaveManager } from '../systems/SaveManager';
import { SCENES } from './sceneKeys';

export class MenuScene extends Phaser.Scene {
  constructor() { super(SCENES.Menu); }

  create(): void {
    this.cameras.main.setBackgroundColor('#1f1a1d');
    this.add.text(50, 20, 'COCA SLUG', { fontFamily: 'monospace', fontSize: '24px', color: '#ffde59' });
    this.add.text(50, 56, 'Retro run-and-gun de la Quebrada', { fontFamily: 'monospace', fontSize: '10px', color: '#fff' });
    this.add.text(24, 88, '1) Start\n2) Options (volumen)\n3) Controles\n4) Creditos', { fontFamily: 'monospace', fontSize: '11px', color: '#fff' });
    this.add.text(24, 154, 'P1: A/D mover, W saltar, S agachar, J disparar, K melee, L granada', { fontFamily: 'monospace', fontSize: '9px', color: '#b8d0ff' });

    this.input.keyboard!.on('keydown-ONE', () => {
      runState.score = 0;
      runState.lives = 3;
      runState.grenades = 6;
      runState.rescues = 0;
      runState.deaths = 0;
      runState.selectedCharacter = 0;
      this.scene.start(SCENES.Level1);
    });

    this.input.keyboard!.on('keydown-TWO', () => {
      const save = SaveManager.load();
      save.audio.master = save.audio.master > 0.6 ? 0.4 : 0.8;
      SaveManager.save(save);
    });
  }
}
