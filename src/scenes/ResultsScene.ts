import Phaser from 'phaser';
import { runState } from '../systems/RunState';
import { SaveManager } from '../systems/SaveManager';

export class ResultsScene extends Phaser.Scene {
  constructor() { super('ResultsScene'); }

  create(): void {
    const elapsed = Math.floor((this.time.now - runState.levelStartTime) / 1000);
    const save = SaveManager.load();
    save.highScore = Math.max(save.highScore, runState.score);
    SaveManager.save(save);

    this.add.text(80, 30, 'RESULTADOS', { fontFamily: 'monospace', fontSize: '20px', color: '#ffde59' });
    this.add.text(58, 70,
      `Score: ${runState.score}\nRescates: ${runState.rescues}\nMuertes: ${runState.deaths}\nTiempo: ${elapsed}s\nHigh Score: ${save.highScore}`,
      { fontFamily: 'monospace', fontSize: '12px', color: '#fff' }
    );
    this.add.text(55, 160, 'ENTER: volver al menu', { fontFamily: 'monospace', fontSize: '10px', color: '#b8d0ff' });
    this.input.keyboard!.once('keydown-ENTER', () => this.scene.start('MenuScene'));
  }
}
