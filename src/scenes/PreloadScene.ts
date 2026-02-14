import Phaser from 'phaser';

function makeTex(scene: Phaser.Scene, key: string, w: number, h: number, draw: (g: Phaser.GameObjects.Graphics) => void): void {
  const g = scene.add.graphics({ x: 0, y: 0 });
  g.clear();
  draw(g);
  g.generateTexture(key, w, h);
  g.destroy();
}

export class PreloadScene extends Phaser.Scene {
  constructor() { super('PreloadScene'); }

  create(): void {
    makeTex(this, 'pixel', 2, 2, (g) => g.fillStyle(0xffffff).fillRect(0, 0, 2, 2));
    makeTex(this, 'ground', 64, 20, (g) => { g.fillStyle(0x6e5238).fillRect(0, 0, 64, 20); g.fillStyle(0xb58c5a).fillRect(0, 0, 64, 4); });
    makeTex(this, 'platform-thin', 48, 8, (g) => { g.fillStyle(0x89704e).fillRect(0, 0, 48, 8); g.fillStyle(0xe7c590).fillRect(0, 0, 48, 2); });
    makeTex(this, 'bg-sky', 64, 64, (g) => { g.fillStyle(0x374b6e).fillRect(0, 0, 64, 64); g.fillStyle(0x536e98).fillRect(0, 44, 64, 20); });
    makeTex(this, 'bg-hills', 64, 64, (g) => { g.fillStyle(0x8c6947).fillRect(0, 26, 64, 38); g.fillStyle(0x9f7b55).fillTriangle(0, 40, 16, 18, 40, 40); });

    makeTex(this, 'char-0', 16, 16, (g) => { g.fillStyle(0xf2c48d).fillRect(6, 2, 4, 4); g.fillStyle(0x27435c).fillRect(4, 6, 8, 7); g.fillStyle(0xd4af37).fillRect(3, 6, 1, 6); });
    makeTex(this, 'char-1', 16, 16, (g) => { g.fillStyle(0xf2c48d).fillRect(6, 2, 4, 4); g.fillStyle(0x5d2d79).fillRect(4, 6, 8, 7); g.fillStyle(0xd95f39).fillRect(10, 5, 3, 2); });
    ['shooter','melee','lobber','turret','llamaCharge','llamaSpit'].forEach((k, i) => makeTex(this, `enemy-${k}`, 16, 16, (g) => {
      const colors = [0xb1382a,0x8e2f26,0x6e247a,0x5e5e5e,0xd1d1c3,0xc7a184];
      g.fillStyle(colors[i]).fillRect(3, 4, 10, 10);
      g.fillStyle(0x111111).fillRect(10, 6, 2, 2);
    }));
    makeTex(this, 'vehicle', 24, 14, (g) => { g.fillStyle(0x6f7a2f).fillRect(2, 4, 20, 8); g.fillStyle(0x333).fillRect(3, 11, 6, 3); g.fillRect(15, 11, 6, 3); });
    makeTex(this, 'vehicleExplode', 24, 14, (g) => { g.fillStyle(0xff7f27).fillRect(2, 2, 20, 10); g.fillStyle(0xfff200).fillRect(7, 1, 8, 12); });
    makeTex(this, 'cage', 16, 20, (g) => { g.fillStyle(0x4d3b2a).fillRect(0, 0, 16, 20); g.fillStyle(0xbcbcbc).fillRect(2, 2, 2, 16); g.fillRect(7, 2, 2, 16); g.fillRect(12, 2, 2, 16); });
    makeTex(this, 'pickup', 8, 8, (g) => { g.fillStyle(0xfff200).fillRect(0, 0, 8, 8); });

    this.scene.start('MenuScene');
  }
}
