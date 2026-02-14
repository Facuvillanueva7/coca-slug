import Phaser from 'phaser';
import { SaveManager } from './SaveManager';

export class AudioManager {
  private scene: Phaser.Scene;
  private volumes = SaveManager.load().audio;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  private beep(freq: number, duration = 0.08, type: OscillatorType = 'square', volume = 0.08): void {
    const soundAny = this.scene.sound as any;
    const ctx: AudioContext | undefined = soundAny?.context;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume * this.volumes.master * this.volumes.sfx;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  }

  shoot(): void { this.beep(420, 0.05, 'square', 0.07); }
  hit(): void { this.beep(180, 0.05, 'sawtooth', 0.08); }
  hurt(): void { this.beep(120, 0.12, 'triangle', 0.1); }
  pickup(): void { this.beep(660, 0.08, 'square', 0.08); }
  rescue(): void { this.beep(780, 0.12, 'triangle', 0.1); }
  explosion(): void { this.beep(80, 0.2, 'sawtooth', 0.2); }

  setVolume(channel: 'master'|'sfx'|'music', value: number): void {
    this.volumes[channel] = Phaser.Math.Clamp(value, 0, 1);
    const save = SaveManager.load();
    save.audio = this.volumes;
    SaveManager.save(save);
  }

  getVolumes(): typeof this.volumes { return this.volumes; }
}
